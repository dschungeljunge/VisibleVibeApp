import { seedNodes, seedEdges, seedProjects, SkillNode, SkillEdge, ProjectPath } from '../data/seedData';
export type { SkillNode, SkillEdge, ProjectPath } from '../data/seedData';

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

const STORAGE_KEYS = {
  COMPLETION: 'vibe_completion_states'
};

/**
 * Read-only data client.
 * 
 * All content (nodes, edges, projects) is compiled from Obsidian Markdown
 * files at build time via compile-content.ts → seedData.ts.
 * 
 * Only user progress (completion states) is stored in LocalStorage.
 */
export const dataClient = {
  // --- NODES (read-only from seedData) ---
  getNodes(): SkillNode[] {
    return seedNodes;
  },

  getNodeBySlug(slug: string): SkillNode | null {
    return seedNodes.find(n => n.slug === slug) || null;
  },

  getNodeById(id: string): SkillNode | null {
    return seedNodes.find(n => n.id === id) || null;
  },

  // --- EDGES (read-only from seedData) ---
  getEdges(): SkillEdge[] {
    return seedEdges;
  },

  // --- PROJECTS (read-only from seedData) ---
  getProjects(): ProjectPath[] {
    return seedProjects;
  },

  getProjectBySlug(slug: string): ProjectPath | null {
    return seedProjects.find(p => p.slug === slug) || null;
  },

  // --- USER PROGRESS (LocalStorage) ---
  getCompletionStates(): Record<string, 'locked' | 'unlocked' | 'in_progress' | 'completed'> {
    const defaultStates: Record<string, 'locked' | 'unlocked' | 'in_progress' | 'completed'> = {
      'kickoff': 'unlocked'
    };
    
    const statesStr = getStorageItem(STORAGE_KEYS.COMPLETION, JSON.stringify(defaultStates));
    return JSON.parse(statesStr);
  },

  saveCompletionStates(states: Record<string, 'locked' | 'unlocked' | 'in_progress' | 'completed'>): void {
    setStorageItem(STORAGE_KEYS.COMPLETION, JSON.stringify(states));
  }
};
