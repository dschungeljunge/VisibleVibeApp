import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  CATEGORY_LABELS,
  CONTENT_STATUSES,
  CONTENT_TYPES,
  type ContentDocument,
  type ContentStatus,
  type ContentType,
  type LearnCategory,
  type MethodTask,
} from "./types";

export { CATEGORY_LABELS };
export type {
  ContentDocument,
  ContentStatus,
  ContentType,
  LearnCategory,
  MethodTask,
} from "./types";

const CONTENT_DIR = path.join(process.cwd(), "Content");

function isContentType(value: unknown): value is ContentType {
  return typeof value === "string" && CONTENT_TYPES.includes(value as ContentType);
}

function isStatus(value: unknown): value is ContentStatus {
  return typeof value === "string" && CONTENT_STATUSES.includes(value as ContentStatus);
}

function isCategory(value: unknown): value is LearnCategory {
  return value === "pedagogy" || value === "technology" || value === "usability";
}

function walkMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".") || entry.name.startsWith("_")) continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...walkMarkdownFiles(fullPath));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }

  return files;
}

function asTrimmedString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function parseTasks(value: unknown): MethodTask[] | undefined {
  if (!Array.isArray(value)) return undefined;

  const tasks: MethodTask[] = [];

  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const rec = item as Record<string, unknown>;
    const title = asTrimmedString(rec.title);
    if (!title) continue;

    const id =
      asTrimmedString(rec.id) ??
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") ??
      `task-${tasks.length + 1}`;

    tasks.push({
      id,
      title,
      why: asTrimmedString(rec.why),
      board: asTrimmedString(rec.board),
      coach: asTrimmedString(rec.coach),
      text: asTrimmedString(rec.text),
      done: asTrimmedString(rec.done),
    });
  }

  return tasks.length ? tasks : undefined;
}

function parseDocument(filePath: string): ContentDocument | null {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  if (!isContentType(data.type)) return null;

  const status: ContentStatus = isStatus(data.status) ? data.status : "draft";
  const slug =
    typeof data.slug === "string" && data.slug.trim()
      ? data.slug.trim()
      : path.basename(filePath, ".md");

  return {
    slug,
    title: typeof data.title === "string" ? data.title : slug,
    type: data.type,
    status,
    summary: typeof data.summary === "string" ? data.summary : "",
    order: typeof data.order === "number" ? data.order : 0,
    body: content.trim(),
    filePath,
    category: isCategory(data.category) ? data.category : undefined,
    parent: typeof data.parent === "string" && data.parent.trim() ? data.parent.trim() : undefined,
    project:
      typeof data.project === "string" && data.project.trim() ? data.project.trim() : undefined,
    video: typeof data.video === "string" && data.video.trim() ? data.video.trim() : undefined,
    goal: typeof data.goal === "string" && data.goal.trim() ? data.goal.trim() : undefined,
    tasks: parseTasks(data.tasks),
  };
}

let cache: ContentDocument[] | null = null;

export function getAllDocuments(): ContentDocument[] {
  if (cache && process.env.NODE_ENV === "production") return cache;

  const documents = walkMarkdownFiles(CONTENT_DIR)
    .map(parseDocument)
    .filter((doc): doc is ContentDocument => doc !== null)
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title, "de"));

  cache = documents;
  return documents;
}

export function getVisibleDocuments(type?: ContentType): ContentDocument[] {
  return getAllDocuments().filter((doc) => {
    if (doc.status === "draft") return false;
    if (type && doc.type !== type) return false;
    return true;
  });
}

export function getPublishedDocuments(type?: ContentType): ContentDocument[] {
  return getVisibleDocuments(type).filter((doc) => doc.status === "published");
}

export function getDocument(type: ContentType, slug: string): ContentDocument | undefined {
  return getVisibleDocuments(type).find((doc) => doc.slug === slug);
}

export function getLearnDocument(slug: string): ContentDocument | undefined {
  return getVisibleDocuments().find(
    (doc) =>
      doc.slug === slug && (doc.type === "learn-topic" || doc.type === "learn-project"),
  );
}

export function getConnectPage(): ContentDocument | undefined {
  return getPublishedDocuments("connect")[0];
}
