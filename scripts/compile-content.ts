import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';

interface SkillNode {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: 'Learning Design' | 'UX Design' | 'AI Design' | 'Data Design' | 'Product Design';
  level: number;
  status: 'draft' | 'reviewed' | 'stable' | 'archived';
  content_markdown: string;
  practice_task: string;
  quality_criteria: string;
  resources_markdown: string;
  position_x: number;
  position_y: number;
  is_milestone?: boolean;
  video_url?: string;
}

interface SkillEdge {
  id: string;
  source_node_id: string;
  target_node_id: string;
  relation_type: 'prerequisite' | 'leads_to' | 'related' | 'required_for_project' | 'optional_extension';
  label?: string;
}

interface ProjectPath {
  id: string;
  slug: string;
  title: string;
  summary: string;
  artifact_description: string;
  learning_strategy: string;
  technology_principle: string;
  ux_principle: string;
  definition_of_done: string;
  content_markdown: string;
  status: 'draft' | 'reviewed' | 'stable' | 'archived';
  required_node_ids: string[];
}

const contentDir = path.join(process.cwd(), 'content');
const nodesDir = path.join(contentDir, 'nodes');
const projectsDir = path.join(contentDir, 'projects');
const targetFile = path.join(process.cwd(), 'src', 'data', 'seedData.ts');

console.log('Compiling Markdown files to seedData.ts...');

if (!fs.existsSync(nodesDir) || !fs.existsSync(projectsDir)) {
  console.error('Content directories not found! Make sure you ran the export script first.');
  process.exit(1);
}

const seedNodes: SkillNode[] = [];
const seedEdges: SkillEdge[] = [];
const seedProjects: ProjectPath[] = [];

// 1. Process Nodes
const nodeFiles = fs.readdirSync(nodesDir).filter(f => f.endsWith('.md'));
for (const file of nodeFiles) {
  const filePath = path.join(nodesDir, file);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const parsed = matter(fileContent);

  const data = parsed.data;
  const content = parsed.content.trim();

  const node: SkillNode = {
    id: data.id,
    slug: data.slug,
    title: data.title,
    summary: data.summary,
    category: data.category,
    level: Number(data.level),
    status: data.status,
    content_markdown: content,
    practice_task: data.practice_task || '',
    quality_criteria: data.quality_criteria || '',
    resources_markdown: data.resources_markdown || '',
    position_x: Number(data.position_x),
    position_y: Number(data.position_y),
    video_url: data.video_url || '',
  };

  if (data.is_milestone !== undefined) {
    node.is_milestone = Boolean(data.is_milestone);
  }

  seedNodes.push(node);

  // Collect connections
  if (Array.isArray(data.connections)) {
    for (const conn of data.connections) {
      if (conn && conn.target) {
        seedEdges.push({
          id: `e-${node.id}-${conn.target}`,
          source_node_id: node.id,
          target_node_id: conn.target,
          relation_type: conn.type || 'leads_to',
          ...(conn.label ? { label: conn.label } : {})
        });
      }
    }
  }
}

// 2. Process Projects
const projectFiles = fs.readdirSync(projectsDir).filter(f => f.endsWith('.md'));
for (const file of projectFiles) {
  const filePath = path.join(projectsDir, file);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const parsed = matter(fileContent);

  const data = parsed.data;
  const content = parsed.content.trim();

  const project: ProjectPath = {
    id: data.id,
    slug: data.slug,
    title: data.title,
    summary: data.summary,
    artifact_description: data.artifact_description || '',
    learning_strategy: data.learning_strategy || '',
    technology_principle: data.technology_principle || '',
    ux_principle: data.ux_principle || '',
    definition_of_done: data.definition_of_done || '',
    content_markdown: content,
    status: data.status,
    required_node_ids: Array.isArray(data.required_node_ids) ? data.required_node_ids : [],
  };

  seedProjects.push(project);
}

// Sort arrays to keep output deterministic and matches the visual layout order
seedNodes.sort((a, b) => {
  if (a.level !== b.level) return a.level - b.level;
  return a.id.localeCompare(b.id);
});

// Sort edges by source and target for deterministic output
seedEdges.sort((a, b) => {
  const sourceCompare = a.source_node_id.localeCompare(b.source_node_id);
  if (sourceCompare !== 0) return sourceCompare;
  return a.target_node_id.localeCompare(b.target_node_id);
});

// Sort projects by ID for deterministic output
seedProjects.sort((a, b) => a.id.localeCompare(b.id));

// Generate TypeScript Output File Content
const fileTemplate = `// Generated automatically by compile-content.ts. DO NOT EDIT DIRECTLY.
// Edit the Markdown files in the /content directory instead.

export interface SkillNode {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: 'Learning Design' | 'UX Design' | 'AI Design' | 'Data Design' | 'Product Design';
  level: number;
  status: 'draft' | 'reviewed' | 'stable' | 'archived';
  content_markdown: string;
  practice_task: string;
  quality_criteria: string;
  resources_markdown: string;
  position_x: number;
  position_y: number;
  is_milestone?: boolean;
  video_url?: string;
}

export interface SkillEdge {
  id: string;
  source_node_id: string;
  target_node_id: string;
  relation_type: 'prerequisite' | 'leads_to' | 'related' | 'required_for_project' | 'optional_extension';
  label?: string;
}

export interface ProjectPath {
  id: string;
  slug: string;
  title: string;
  summary: string;
  artifact_description: string;
  learning_strategy: string;
  technology_principle: string;
  ux_principle: string;
  definition_of_done: string;
  content_markdown: string;
  status: 'draft' | 'reviewed' | 'stable' | 'archived';
  required_node_ids: string[];
}

export const seedNodes: SkillNode[] = ${JSON.stringify(seedNodes, null, 2)};

export const seedEdges: SkillEdge[] = ${JSON.stringify(seedEdges, null, 2)};

export const seedProjects: ProjectPath[] = ${JSON.stringify(seedProjects, null, 2)};
`;

fs.writeFileSync(targetFile, fileTemplate, 'utf-8');
console.log('Successfully compiled seedData.ts from Markdown content!');
