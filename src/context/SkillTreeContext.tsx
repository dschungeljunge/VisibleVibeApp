'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { dbClient, SkillNode, SkillEdge, ProjectPath, NodeVersion } from '../lib/dbClient';

type NodeState = 'locked' | 'unlocked' | 'in_progress' | 'completed';

interface SkillTreeContextType {
  nodes: SkillNode[];
  edges: SkillEdge[];
  projects: ProjectPath[];
  completionStates: Record<string, NodeState>;
  
  // Selection and Interaction
  selectedNodeId: string | null;
  selectedProjectId: string | null;
  hoveredNodeId: string | null;
  setSelectedNodeId: (id: string | null) => void;
  setSelectedProjectId: (id: string | null) => void;
  setHoveredNodeId: (id: string | null) => void;
  
  // Filters
  categoryFilter: string | null;
  levelFilter: number | null;
  searchQuery: string;
  setCategoryFilter: (category: string | null) => void;
  setLevelFilter: (level: number | null) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
  
  // Admin Mode
  adminMode: boolean;
  setAdminMode: (mode: boolean) => void;
  
  // Loading states
  loading: boolean;
  error: string | null;
  
  // Operations
  refreshData: () => Promise<void>;
  updateNodeState: (nodeId: string, state: NodeState) => Promise<void>;
  toggleNodeCompletion: (nodeId: string) => Promise<void>;
  
  // CRUD
  saveNode: (id: string, data: Partial<SkillNode>, changeNote: string) => Promise<void>;
  createNode: (data: Omit<SkillNode, 'id'>) => Promise<void>;
  deleteNode: (id: string) => Promise<void>;
  saveEdge: (data: Omit<SkillEdge, 'id'>) => Promise<void>;
  deleteEdge: (id: string) => Promise<void>;
  saveProject: (id: string, data: Partial<ProjectPath>) => Promise<void>;
  
  // Versions
  getNodeVersions: (nodeId: string) => Promise<NodeVersion[]>;
  restoreNodeVersion: (versionId: string) => Promise<void>;
}

const SkillTreeContext = createContext<SkillTreeContextType | undefined>(undefined);

export const SkillTreeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [nodes, setNodes] = useState<SkillNode[]>([]);
  const [edges, setEdges] = useState<SkillEdge[]>([]);
  const [projects, setProjects] = useState<ProjectPath[]>([]);
  const [completionStates, setCompletionStates] = useState<Record<string, NodeState>>({});
  
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [levelFilter, setLevelFilter] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [adminMode, setAdminMode] = useState<boolean>(false);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load all nodes, edges, projects, and states from DB
  const refreshData = useCallback(async () => {
    try {
      setLoading(true);
      const [allNodes, allEdges, allProjects, savedStates] = await Promise.all([
        dbClient.getNodes(),
        dbClient.getEdges(),
        dbClient.getProjects(),
        dbClient.getCompletionStates(),
      ]);
      
      setNodes(allNodes);
      setEdges(allEdges);
      setProjects(allProjects);
      
      // Auto propagate completion states to ensure lock/unlock consistency on load
      const propagatedStates = propagateStates(allNodes, allEdges, savedStates);
      setCompletionStates(propagatedStates);
      
      setError(null);
    } catch (err: any) {
      console.error('Failed to load skilltree data:', err);
      setError('Fehler beim Laden der Skilltree-Daten. Bitte lade die Seite neu.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Recalculates locked/unlocked states based on prerequisites
  const propagateStates = (
    allNodes: SkillNode[],
    allEdges: SkillEdge[],
    currentStates: Record<string, NodeState>
  ): Record<string, NodeState> => {
    const updatedStates = { ...currentStates };
    
    // Kickoff is always at least unlocked
    if (!updatedStates['kickoff'] || updatedStates['kickoff'] === 'locked') {
      updatedStates['kickoff'] = 'unlocked';
    }

    let changed = true;
    let iterations = 0;
    const maxIterations = 10; // Prevent infinite loops just in case of cycles

    while (changed && iterations < maxIterations) {
      changed = false;
      iterations++;

      for (const node of allNodes) {
        if (node.id === 'kickoff') continue;

        // Find all incoming dependencies (prerequisites, leads_to, required_for_project)
        const incomingEdges = allEdges.filter(
          e => e.target_node_id === node.id && 
          ['prerequisite', 'leads_to', 'required_for_project'].includes(e.relation_type)
        );

        if (incomingEdges.length === 0) {
          // No prerequisites, should be unlocked if not already unlocked/in_progress/completed
          if (!updatedStates[node.id] || updatedStates[node.id] === 'locked') {
            updatedStates[node.id] = 'unlocked';
            changed = true;
          }
          continue;
        }

        // Check if ALL prerequisites are completed
        const allPrereqsCompleted = incomingEdges.every(edge => {
          const sourceState = updatedStates[edge.source_node_id];
          return sourceState === 'completed';
        });

        const currentState = updatedStates[node.id] || 'locked';

        if (allPrereqsCompleted) {
          // If all completed, it should be unlocked (or in_progress or completed)
          if (currentState === 'locked') {
            updatedStates[node.id] = 'unlocked';
            changed = true;
          }
        } else {
          // If any prereq is not completed, this node is locked
          if (currentState !== 'locked') {
            updatedStates[node.id] = 'locked';
            changed = true;
          }
        }
      }
    }

    return updatedStates;
  };

  // Update a single node state, then propagate locking/unlocking downstream
  const updateNodeState = async (nodeId: string, state: NodeState) => {
    const nextStates = { ...completionStates, [nodeId]: state };
    const propagated = propagateStates(nodes, edges, nextStates);
    setCompletionStates(propagated);
    await dbClient.saveCompletionStates(propagated);
  };

  const toggleNodeCompletion = async (nodeId: string) => {
    const currentState = completionStates[nodeId] || 'locked';
    if (currentState === 'locked') return; // Cannot toggle locked nodes
    
    let nextState: NodeState = 'unlocked';
    if (currentState === 'unlocked') nextState = 'in_progress';
    else if (currentState === 'in_progress') nextState = 'completed';
    else if (currentState === 'completed') nextState = 'unlocked';
    
    await updateNodeState(nodeId, nextState);
  };

  // CRUD Wrapper Operations
  const saveNode = async (id: string, data: Partial<SkillNode>, changeNote: string) => {
    try {
      await dbClient.updateNode(id, data, changeNote);
      await refreshData();
    } catch (err) {
      console.error(err);
      throw new Error('Fehler beim Speichern des Knotens.');
    }
  };

  const createNode = async (data: Omit<SkillNode, 'id'>) => {
    try {
      await dbClient.createNode(data);
      await refreshData();
    } catch (err) {
      console.error(err);
      throw new Error('Fehler beim Erstellen des Knotens.');
    }
  };

  const deleteNode = async (id: string) => {
    try {
      await dbClient.deleteNode(id);
      if (selectedNodeId === id) setSelectedNodeId(null);
      await refreshData();
    } catch (err) {
      console.error(err);
      throw new Error('Fehler beim Löschen des Knotens.');
    }
  };

  const saveEdge = async (data: Omit<SkillEdge, 'id'>) => {
    try {
      await dbClient.createEdge(data);
      await refreshData();
    } catch (err) {
      console.error(err);
      throw new Error('Fehler beim Erstellen der Verbindung.');
    }
  };

  const deleteEdge = async (id: string) => {
    try {
      await dbClient.deleteEdge(id);
      await refreshData();
    } catch (err) {
      console.error(err);
      throw new Error('Fehler beim Löschen der Verbindung.');
    }
  };

  const saveProject = async (id: string, data: Partial<ProjectPath>) => {
    try {
      await dbClient.updateProject(id, data);
      await refreshData();
    } catch (err) {
      console.error(err);
      throw new Error('Fehler beim Speichern des Projekts.');
    }
  };

  const getNodeVersions = async (nodeId: string): Promise<NodeVersion[]> => {
    return await dbClient.getNodeVersions(nodeId);
  };

  const restoreNodeVersion = async (versionId: string) => {
    try {
      await dbClient.restoreNodeVersion(versionId);
      await refreshData();
    } catch (err) {
      console.error(err);
      throw new Error('Fehler beim Wiederherstellen der Version.');
    }
  };

  const resetFilters = () => {
    setCategoryFilter(null);
    setLevelFilter(null);
    setSearchQuery('');
  };

  return (
    <SkillTreeContext.Provider
      value={{
        nodes,
        edges,
        projects,
        completionStates,
        
        selectedNodeId,
        selectedProjectId,
        hoveredNodeId,
        setSelectedNodeId,
        setSelectedProjectId,
        setHoveredNodeId,
        
        categoryFilter,
        levelFilter,
        searchQuery,
        setCategoryFilter,
        setLevelFilter,
        setSearchQuery,
        resetFilters,
        
        adminMode,
        setAdminMode,
        
        loading,
        error,
        
        refreshData,
        updateNodeState,
        toggleNodeCompletion,
        
        saveNode,
        createNode,
        deleteNode,
        saveEdge,
        deleteEdge,
        saveProject,
        
        getNodeVersions,
        restoreNodeVersion
      }}
    >
      {children}
    </SkillTreeContext.Provider>
  );
};

export const useSkillTree = () => {
  const context = useContext(SkillTreeContext);
  if (context === undefined) {
    throw new Error('useSkillTree must be used within a SkillTreeProvider');
  }
  return context;
};
