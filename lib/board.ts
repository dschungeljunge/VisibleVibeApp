export const METHOD_BOARD_KEY = "visiblevibe.method.board.v1";

type ExcalidrawLike = {
  type?: string;
  text?: string;
  originalText?: string;
  isDeleted?: boolean;
};

export function textsFromElements(elements: unknown): string[] {
  if (!Array.isArray(elements)) return [];

  const found: string[] = [];

  for (const el of elements) {
    if (!el || typeof el !== "object") continue;
    const item = el as ExcalidrawLike;
    if (item.isDeleted) continue;
    const raw = (item.originalText || item.text || "").trim();
    if (raw) found.push(raw.replace(/\s+/g, " "));
  }

  return Array.from(new Set(found)).reverse();
}

export function textsFromScene(scene: { elements?: unknown } | null | undefined): string[] {
  return textsFromElements(scene?.elements);
}

export function readStoredScene(): { elements?: unknown } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(METHOD_BOARD_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as { elements?: unknown };
  } catch {
    return null;
  }
}
