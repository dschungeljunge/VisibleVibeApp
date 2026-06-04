import { seedNodes, seedEdges, seedProjects, SkillNode, SkillEdge, ProjectPath } from '../data/seedData';
export type { SkillNode, SkillEdge, ProjectPath } from '../data/seedData';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

export interface NodeVersion {
  id: string;
  node_id: string;
  snapshot: Omit<SkillNode, 'id'>;
  change_note: string;
  created_at: string;
}

// Storage helpers that handle server-side rendering safely
const getStorageItem = (key: string, defaultValue: string): string => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    if (!item) {
      window.localStorage.setItem(key, defaultValue);
      return defaultValue;
    }
    return item;
  } catch (e) {
    console.error('LocalStorage error', e);
    return defaultValue;
  }
};

const setStorageItem = (key: string, value: string): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, value);
  } catch (e) {
    console.error('LocalStorage write error', e);
  }
};

// Initialize Mock Databases in LocalStorage if not present
const STORAGE_KEYS = {
  NODES: 'vibe_nodes',
  EDGES: 'vibe_edges',
  PROJECTS: 'vibe_projects',
  VERSIONS: 'vibe_node_versions',
  COMPLETION: 'vibe_completion_states'
};

const initMockData = () => {
  if (typeof window === 'undefined') return;
  
  if (!window.localStorage.getItem(STORAGE_KEYS.NODES)) {
    window.localStorage.setItem(STORAGE_KEYS.NODES, JSON.stringify(seedNodes));
  }
  if (!window.localStorage.getItem(STORAGE_KEYS.EDGES)) {
    window.localStorage.setItem(STORAGE_KEYS.EDGES, JSON.stringify(seedEdges));
  }
  if (!window.localStorage.getItem(STORAGE_KEYS.PROJECTS)) {
    window.localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(seedProjects));
  }
  if (!window.localStorage.getItem(STORAGE_KEYS.VERSIONS)) {
    window.localStorage.setItem(STORAGE_KEYS.VERSIONS, JSON.stringify([]));
  }
};

// Ensure init is run once on load in client environment
if (typeof window !== 'undefined') {
  initMockData();
}

// Unified Database API
export const dbClient = {
  // --- NODES ---
  async getNodes(): Promise<SkillNode[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('nodes').select('*').order('level', { ascending: true });
      if (error) throw error;
      return data;
    } else {
      const dataStr = getStorageItem(STORAGE_KEYS.NODES, JSON.stringify(seedNodes));
      return JSON.parse(dataStr);
    }
  },

  async getNodeBySlug(slug: string): Promise<SkillNode | null> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('nodes').select('*').eq('slug', slug).single();
      if (error) {
        if (error.code === 'PGRST116') return null; // Not found
        throw error;
      }
      return data;
    } else {
      const nodes = await this.getNodes();
      return nodes.find(n => n.slug === slug) || null;
    }
  },

  async createNode(node: Omit<SkillNode, 'id'>): Promise<SkillNode> {
    const id = Math.random().toString(36).substring(2, 11);
    const newNode: SkillNode = { ...node, id };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('nodes').insert(newNode).select().single();
      if (error) throw error;
      return data;
    } else {
      const nodes = await this.getNodes();
      nodes.push(newNode);
      setStorageItem(STORAGE_KEYS.NODES, JSON.stringify(nodes));
      return newNode;
    }
  },

  async updateNode(id: string, data: Partial<SkillNode>, changeNote: string = 'Knoten aktualisiert'): Promise<SkillNode> {
    if (isSupabaseConfigured && supabase) {
      // 1. Get current node for snapshotting
      const { data: currentNode, error: getErr } = await supabase.from('nodes').select('*').eq('id', id).single();
      if (getErr) throw getErr;

      // 2. Create version history record
      const { error: verErr } = await supabase.from('node_versions').insert({
        node_id: id,
        snapshot: currentNode,
        change_note: changeNote
      });
      if (verErr) throw verErr;

      // 3. Update the node
      const { data: updatedNode, error: updErr } = await supabase.from('nodes').update(data).eq('id', id).select().single();
      if (updErr) throw updErr;
      return updatedNode;
    } else {
      const nodes = await this.getNodes();
      const nodeIndex = nodes.findIndex(n => n.id === id);
      if (nodeIndex === -1) throw new Error('Knoten nicht gefunden');

      const currentNode = nodes[nodeIndex];
      
      // Save snapshot version
      const versions = await this.getNodeVersions(id);
      const newVersion: NodeVersion = {
        id: Math.random().toString(36).substring(2, 11),
        node_id: id,
        snapshot: { ...currentNode },
        change_note: changeNote,
        created_at: new Date().toISOString()
      };
      versions.unshift(newVersion);
      setStorageItem(STORAGE_KEYS.VERSIONS, JSON.stringify(versions));

      // Update node
      const updatedNode: SkillNode = { ...currentNode, ...data, id };
      nodes[nodeIndex] = updatedNode;
      setStorageItem(STORAGE_KEYS.NODES, JSON.stringify(nodes));
      return updatedNode;
    }
  },

  async deleteNode(id: string): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('nodes').delete().eq('id', id);
      if (error) throw error;
    } else {
      let nodes = await this.getNodes();
      nodes = nodes.filter(n => n.id !== id);
      setStorageItem(STORAGE_KEYS.NODES, JSON.stringify(nodes));

      // Clean up connected edges
      let edges = await this.getEdges();
      edges = edges.filter(e => e.source_node_id !== id && e.target_node_id !== id);
      setStorageItem(STORAGE_KEYS.EDGES, JSON.stringify(edges));
    }
  },

  // --- EDGES ---
  async getEdges(): Promise<SkillEdge[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('edges').select('*');
      if (error) throw error;
      return data;
    } else {
      const dataStr = getStorageItem(STORAGE_KEYS.EDGES, JSON.stringify(seedEdges));
      return JSON.parse(dataStr);
    }
  },

  async createEdge(edge: Omit<SkillEdge, 'id'>): Promise<SkillEdge> {
    const id = Math.random().toString(36).substring(2, 11);
    const newEdge: SkillEdge = { ...edge, id };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('edges').insert(newEdge).select().single();
      if (error) throw error;
      return data;
    } else {
      const edges = await this.getEdges();
      // Avoid duplicates
      const exists = edges.some(e => e.source_node_id === edge.source_node_id && e.target_node_id === edge.target_node_id);
      if (exists) throw new Error('Diese Verbindung existiert bereits.');

      edges.push(newEdge);
      setStorageItem(STORAGE_KEYS.EDGES, JSON.stringify(edges));
      return newEdge;
    }
  },

  async deleteEdge(id: string): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('edges').delete().eq('id', id);
      if (error) throw error;
    } else {
      let edges = await this.getEdges();
      edges = edges.filter(e => e.id !== id);
      setStorageItem(STORAGE_KEYS.EDGES, JSON.stringify(edges));
    }
  },

  // --- PROJECTS ---
  async getProjects(): Promise<ProjectPath[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('projects').select('*');
      if (error) throw error;
      return data;
    } else {
      const dataStr = getStorageItem(STORAGE_KEYS.PROJECTS, JSON.stringify(seedProjects));
      return JSON.parse(dataStr);
    }
  },

  async getProjectBySlug(slug: string): Promise<ProjectPath | null> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('projects').select('*').eq('slug', slug).single();
      if (error) {
        if (error.code === 'PGRST116') return null;
        throw error;
      }
      return data;
    } else {
      const projects = await this.getProjects();
      return projects.find(p => p.slug === slug) || null;
    }
  },

  async updateProject(id: string, data: Partial<ProjectPath>, changeNote: string = 'Projekt aktualisiert'): Promise<ProjectPath> {
    if (isSupabaseConfigured && supabase) {
      // Versioning for live supabase would go here analogously
      const { data: updatedProject, error } = await supabase.from('projects').update(data).eq('id', id).select().single();
      if (error) throw error;
      return updatedProject;
    } else {
      const projects = await this.getProjects();
      const projectIndex = projects.findIndex(p => p.id === id);
      if (projectIndex === -1) throw new Error('Projekt nicht gefunden');

      const currentProject = projects[projectIndex];
      const updatedProject = { ...currentProject, ...data, id };
      projects[projectIndex] = updatedProject;
      setStorageItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
      return updatedProject;
    }
  },

  // --- VERSIONING ---
  async getNodeVersions(nodeId: string): Promise<NodeVersion[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('node_versions').select('*').eq('node_id', nodeId).order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    } else {
      const dataStr = getStorageItem(STORAGE_KEYS.VERSIONS, '[]');
      const allVersions: NodeVersion[] = JSON.parse(dataStr);
      return allVersions.filter(v => v.node_id === nodeId);
    }
  },

  async restoreNodeVersion(versionId: string): Promise<SkillNode> {
    if (isSupabaseConfigured && supabase) {
      // 1. Get snapshot from versions table
      const { data: versionData, error: verErr } = await supabase.from('node_versions').select('*').eq('id', versionId).single();
      if (verErr) throw verErr;

      const nodeId = versionData.node_id;
      const snapshot = versionData.snapshot;

      // 2. Perform regular update node (which creates a backup of current first)
      return await this.updateNode(nodeId, snapshot, `Wiederhergestellt von Version (${new Date(versionData.created_at).toLocaleDateString()})`);
    } else {
      const allVersionsStr = getStorageItem(STORAGE_KEYS.VERSIONS, '[]');
      const allVersions: NodeVersion[] = JSON.parse(allVersionsStr);
      const targetVersion = allVersions.find(v => v.id === versionId);
      if (!targetVersion) throw new Error('Version nicht gefunden');

      const nodeId = targetVersion.node_id;
      const snapshot = targetVersion.snapshot;

      // Update the node, passing a special restoration note
      return await this.updateNode(
        nodeId, 
        snapshot, 
        `Wiederhergestellt von Version vom ${new Date(targetVersion.created_at).toLocaleString('de-CH')}`
      );
    }
  },

  // --- USER PROGRESS ---
  async getCompletionStates(): Promise<Record<string, 'locked' | 'unlocked' | 'in_progress' | 'completed'>> {
    // Default starting point: kickoff is unlocked, others are locked
    const defaultStates: Record<string, 'locked' | 'unlocked' | 'in_progress' | 'completed'> = {
      'kickoff': 'unlocked'
    };
    
    const statesStr = getStorageItem(STORAGE_KEYS.COMPLETION, JSON.stringify(defaultStates));
    return JSON.parse(statesStr);
  },

  async saveCompletionStates(states: Record<string, 'locked' | 'unlocked' | 'in_progress' | 'completed'>): Promise<void> {
    setStorageItem(STORAGE_KEYS.COMPLETION, JSON.stringify(states));
  }
};
