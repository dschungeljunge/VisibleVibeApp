export const CONTENT_TYPES = [
  "learn-topic",
  "learn-project",
  "visiblevibe-step",
  "engineering-practice",
  "connect",
] as const;

export type ContentType = (typeof CONTENT_TYPES)[number];

export const CONTENT_STATUSES = ["draft", "published", "coming-soon"] as const;

export type ContentStatus = (typeof CONTENT_STATUSES)[number];

export const LEARN_CATEGORIES = ["pedagogy", "technology", "usability"] as const;

export type LearnCategory = (typeof LEARN_CATEGORIES)[number];

export const LEARN_FORMATS = ["article", "lab"] as const;

export type LearnFormat = (typeof LEARN_FORMATS)[number];

export type MethodTask = {
  id: string;
  title: string;
  /** Die eine Leitfrage in der Arbeitsansicht. */
  question?: string;
  why?: string;
  board?: string;
  coach?: string;
  text?: string;
  done?: string;
};

export type ContentDocument = {
  slug: string;
  title: string;
  /** Deutscher Arbeitstitel; `title` bleibt der kurze Phasenname (Sense, Frame, …). */
  heading?: string;
  type: ContentType;
  status: ContentStatus;
  summary: string;
  order: number;
  body: string;
  filePath: string;
  category?: LearnCategory;
  /** `lab` rendert eine Mini-Lernapp statt nur den Artikel. */
  format?: LearnFormat;
  /** Kennung der Mini-App, wenn `format` `lab` ist. */
  lab?: string;
  parent?: string;
  /** Slug des Projekts, für das dieses Thema erstmals gebraucht wird. */
  project?: string;
  video?: string;
  goal?: string;
  tasks?: MethodTask[];
  /** Orientierung vor den sechs Phasen; zählt nicht als Methodenschritt. */
  kind?: "intro";
};

export const CATEGORY_LABELS: Record<LearnCategory, string> = {
  pedagogy: "Pädagogik",
  technology: "Technologie",
  usability: "Usability / Design",
};
