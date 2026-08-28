import fs from "fs";
import path from "path";
import matter from "gray-matter";

const WALCHWIL_DIR = path.join(process.cwd(), "Content", "walchwil");

export type WalchwilKind = "online" | "kickoff" | "presentation" | "prep";

export type WalchwilVideo = {
  url?: string;
  title?: string;
};

export type WalchwilDate = {
  id: string;
  label: string;
  group?: string;
};

export type WalchwilSession = {
  slug: string;
  title: string;
  when: string;
  format?: string;
  kind?: WalchwilKind;
  goal: string;
  summary: string;
  order: number;
  start: string;
  end: string;
  after?: string;
  videos: WalchwilVideo[];
  dates: WalchwilDate[];
  questions: boolean;
  body: string;
};

export type WalchwilProgram = {
  title: string;
  kicker: string;
  summary: string;
  body: string;
  participants: string[];
  sessions: WalchwilSession[];
};

export type WalchwilPhase = {
  session: WalchwilSession;
  kind: "session" | "after";
};

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function asStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

function asKind(value: unknown): WalchwilKind | undefined {
  if (value === "online" || value === "kickoff" || value === "presentation" || value === "prep") {
    return value;
  }
  return undefined;
}

function parseDates(value: unknown): WalchwilDate[] {
  if (!Array.isArray(value)) return [];
  const dates: WalchwilDate[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const rec = item as Record<string, unknown>;
    const id = asString(rec.id);
    const label = asString(rec.label);
    if (!id || !label) continue;
    dates.push({ id, label, group: asString(rec.group) });
  }
  return dates;
}

function parseVideos(value: unknown, single?: string): WalchwilVideo[] {
  const videos: WalchwilVideo[] = [];

  if (Array.isArray(value)) {
    for (const item of value) {
      if (typeof item === "string" && item.trim()) {
        videos.push({ url: item.trim() });
        continue;
      }
      if (!item || typeof item !== "object") continue;
      const rec = item as Record<string, unknown>;
      const url = asString(rec.url);
      const title = asString(rec.title);
      if (!url && !title) continue;
      videos.push({ url, title });
    }
  }

  if (single && !videos.some((video) => video.url === single)) {
    videos.unshift({ url: single });
  }

  return videos;
}

function readMarkdown(filePath: string) {
  const raw = fs.readFileSync(filePath, "utf8");
  return matter(raw);
}

function parseSession(filePath: string): WalchwilSession | null {
  const { data, content } = readMarkdown(filePath);
  const title = asString(data.title);
  const slug =
    asString(data.slug) ?? path.basename(filePath, ".md").replace(/^\d+-/, "");
  const start = asString(data.start);
  if (!title || !slug || !start) return null;

  const status = asString(data.status) ?? "published";
  if (status === "draft") return null;

  return {
    slug,
    title,
    when: asString(data.when) ?? start,
    format: asString(data.format),
    kind: asKind(data.kind),
    goal: asString(data.goal) ?? "",
    summary: asString(data.summary) ?? "",
    order: typeof data.order === "number" ? data.order : 0,
    start,
    end: asString(data.end) ?? start,
    after: asString(data.after),
    videos: parseVideos(data.videos, asString(data.video)),
    dates: parseDates(data.dates),
    questions: data.questions === true,
    body: content.trim(),
  };
}

function parseOverview(filePath: string) {
  const { data, content } = readMarkdown(filePath);
  return {
    title: asString(data.title) ?? "Schule Walchwil",
    kicker: asString(data.kicker) ?? "Schule Walchwil",
    summary: asString(data.summary) ?? "",
    body: content.trim(),
    participants: asStringList(data.participants),
  };
}

let cache: WalchwilProgram | null = null;

export function getWalchwilProgram(): WalchwilProgram {
  if (cache && process.env.NODE_ENV === "production") return cache;

  const overviewPath = path.join(WALCHWIL_DIR, "index.md");
  const overview = fs.existsSync(overviewPath)
    ? parseOverview(overviewPath)
    : { title: "Schule Walchwil", kicker: "Schule Walchwil", summary: "", body: "", participants: [] };

  const sessions = fs.existsSync(WALCHWIL_DIR)
    ? fs
        .readdirSync(WALCHWIL_DIR)
        .filter((name) => name.endsWith(".md") && name !== "index.md" && !name.startsWith("_"))
        .map((name) => parseSession(path.join(WALCHWIL_DIR, name)))
        .filter((session): session is WalchwilSession => session !== null)
        .sort((a, b) => a.order - b.order || a.start.localeCompare(b.start))
    : [];

  cache = { ...overview, sessions };
  return cache;
}

export function getWalchwilSession(slug: string): WalchwilSession | undefined {
  return getWalchwilProgram().sessions.find((session) => session.slug === slug);
}

export function playableVideos(session: WalchwilSession): { url: string; title?: string }[] {
  return session.videos.filter((video): video is { url: string; title?: string } => Boolean(video.url));
}

function atStartOfDay(isoDate: string): number {
  return new Date(`${isoDate}T00:00:00`).getTime();
}

function atEndOfDay(isoDate: string): number {
  return new Date(`${isoDate}T23:59:59`).getTime();
}

export function getWalchwilPhase(
  sessions: WalchwilSession[],
  now = new Date(),
): WalchwilPhase | null {
  if (sessions.length === 0) return null;

  const t = now.getTime();

  for (let i = 0; i < sessions.length; i += 1) {
    const session = sessions[i];
    const start = atStartOfDay(session.start);
    const end = atEndOfDay(session.end);
    const nextStart = sessions[i + 1] ? atStartOfDay(sessions[i + 1].start) : Number.POSITIVE_INFINITY;

    if (t >= start && t <= end) {
      return { session, kind: "session" };
    }

    if (t > end && t < nextStart) {
      return { session, kind: "after" };
    }
  }

  if (t < atStartOfDay(sessions[0].start)) {
    return { session: sessions[0], kind: "session" };
  }

  const last = sessions[sessions.length - 1];
  return { session: last, kind: t > atEndOfDay(last.end) ? "after" : "session" };
}
