import { LEARN_CATEGORIES, type ContentDocument, type LearnCategory } from "./types";

export type ProjectGroup = {
  project: ContentDocument;
  topics: ContentDocument[];
};

export type ProjectSkillMap = {
  groups: ProjectGroup[];
  /** Themen ohne (oder mit unbekanntem) Projektbezug. */
  unassigned: ContentDocument[];
};

const CATEGORY_RANK: Record<LearnCategory, number> = Object.fromEntries(
  LEARN_CATEGORIES.map((category, index) => [category, index]),
) as Record<LearnCategory, number>;

function byCategoryThenOrder(a: ContentDocument, b: ContentDocument): number {
  const rankA = a.category ? CATEGORY_RANK[a.category] : LEARN_CATEGORIES.length;
  const rankB = b.category ? CATEGORY_RANK[b.category] : LEARN_CATEGORIES.length;
  return rankA - rankB || a.order - b.order || a.title.localeCompare(b.title, "de");
}

/**
 * Ordnet jedes Thema dem Projekt zu, für das es erstmals gebraucht wird
 * (Frontmatter-Feld `project`). Jedes Thema erscheint genau einmal;
 * spätere Projekte setzen die Themen früherer Projekte voraus.
 */
export function buildProjectSkillMap(
  topics: ContentDocument[],
  projects: ContentDocument[],
): ProjectSkillMap {
  const sortedProjects = [...projects].sort(
    (a, b) => a.order - b.order || a.title.localeCompare(b.title, "de"),
  );

  const groups: ProjectGroup[] = sortedProjects.map((project) => ({
    project,
    topics: [],
  }));
  const bySlug = new Map(groups.map((group) => [group.project.slug, group]));
  const unassigned: ContentDocument[] = [];

  for (const topic of topics) {
    const group = topic.project ? bySlug.get(topic.project) : undefined;
    if (group) {
      group.topics.push(topic);
    } else {
      unassigned.push(topic);
    }
  }

  for (const group of groups) group.topics.sort(byCategoryThenOrder);
  unassigned.sort(byCategoryThenOrder);

  return { groups, unassigned };
}
