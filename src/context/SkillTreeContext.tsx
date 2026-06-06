'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { dataClient, SkillNode, SkillEdge, ProjectPath } from '../lib/dataClient';

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
  
  // Loading states
  loading: boolean;
  error: string | null;
  
  // Operations
  refreshData: () => void;
  updateNodeState: (nodeId: string, state: NodeState) => void;
  toggleNodeCompletion: (nodeId: string) => void;
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
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  // Load all data (synchronous from seedData, only completion from LocalStorage)
  const refreshData = useCallback(() => {
    try {
      setLoading(true);
      const allNodes = dataClient.getNodes();
      const allEdges = dataClient.getEdges();
      const allProjects = dataClient.getProjects();
      const savedStates = dataClient.getCompletionStates();
      
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

  // Update a single node state, then propagate locking/unlocking downstream
  const updateNodeState = (nodeId: string, state: NodeState) => {
    const nextStates = { ...completionStates, [nodeId]: state };
    const propagated = propagateStates(nodes, edges, nextStates);
    setCompletionStates(propagated);
    dataClient.saveCompletionStates(propagated);
  };

  const toggleNodeCompletion = (nodeId: string) => {
    const currentState = completionStates[nodeId] || 'locked';
    if (currentState === 'locked') return; // Cannot toggle locked nodes
    
    let nextState: NodeState = 'unlocked';
    if (currentState === 'unlocked') nextState = 'in_progress';
    else if (currentState === 'in_progress') nextState = 'completed';
    else if (currentState === 'completed') nextState = 'unlocked';
    
    updateNodeState(nodeId, nextState);
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
        
        loading,
        error,
        
        refreshData,
        updateNodeState,
        toggleNodeCompletion,
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
