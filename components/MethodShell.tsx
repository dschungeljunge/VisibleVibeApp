"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { BoardErrorBoundary } from "./BoardErrorBoundary";
import { ExcalidrawBoard } from "./ExcalidrawBoard";

const STORAGE_KEY = "visiblevibe.method.sidebarPx";
const DEFAULT_WIDTH = 480;
const MIN_WIDTH = 320;
const MAX_WIDTH = 640;

function clampWidth(width: number, viewport: number) {
  const max = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, Math.floor(viewport * 0.5)));
  return Math.min(max, Math.max(MIN_WIDTH, width));
}

function readStoredWidth() {
  if (typeof window === "undefined") return DEFAULT_WIDTH;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  const parsed = raw ? Number.parseInt(raw, 10) : NaN;
  if (!Number.isFinite(parsed)) return DEFAULT_WIDTH;
  return clampWidth(parsed, window.innerWidth);
}

export function MethodShell({ children }: { children: ReactNode }) {
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const dragging = useRef(false);

  useEffect(() => {
    setWidth(readStoredWidth());
  }, []);

  const persist = useCallback((next: number) => {
    const clamped = clampWidth(next, window.innerWidth);
    setWidth(clamped);
    window.localStorage.setItem(STORAGE_KEY, String(clamped));
  }, []);

  useEffect(() => {
    function onMove(event: PointerEvent) {
      if (!dragging.current) return;
      persist(event.clientX);
    }

    function onUp() {
      if (!dragging.current) return;
      dragging.current = false;
      document.body.classList.remove("select-none", "cursor-col-resize");
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [persist]);

  function startDrag(event: React.PointerEvent<HTMLDivElement>) {
    event.preventDefault();
    dragging.current = true;
    document.body.classList.add("select-none", "cursor-col-resize");
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      persist(width - 24);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      persist(width + 24);
    }
  }

  return (
      <div className="flex h-[calc(100dvh-3.75rem)] flex-col lg:flex-row">
        <aside
          className="max-h-[42%] w-full overflow-y-auto border-b-2 border-ink bg-white lg:max-h-none lg:h-full lg:w-[var(--method-sidebar)] lg:shrink-0 lg:border-b-0"
          style={{ ["--method-sidebar" as string]: `${width}px` }}
        >
          <div className="px-6 py-6">{children}</div>
        </aside>
        <div
          role="separator"
          aria-orientation="vertical"
          aria-valuemin={MIN_WIDTH}
          aria-valuemax={MAX_WIDTH}
          aria-valuenow={width}
          aria-label="Breite der Anleitungsspalte"
          tabIndex={0}
          onPointerDown={startDrag}
          onKeyDown={onKeyDown}
          className="hidden w-3 shrink-0 cursor-col-resize touch-none items-stretch justify-center hover:bg-fhnw/40 focus-visible:bg-fhnw/40 lg:flex"
        >
          <span className="w-px bg-ink" aria-hidden />
        </div>
        <section className="min-h-0 flex-1 bg-paper">
          <BoardErrorBoundary>
            <ExcalidrawBoard />
          </BoardErrorBoundary>
        </section>
      </div>
  );
}
