"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ComponentType } from "react";
import { METHOD_BOARD_KEY, textsFromElements } from "@/lib/board";
import { createClient } from "@/lib/supabase/client";
import { BoardVersionHistory } from "./BoardVersionHistory";
import { useBoardTexts } from "./BoardTextContext";

type StoredScene = {
  elements?: unknown[];
  appState?: Record<string, unknown>;
  files?: Record<string, unknown>;
};

type ExcalidrawProps = {
  langCode?: string;
  initialData?: unknown;
  UIOptions?: unknown;
  onChange?: (...args: never[]) => void;
};

type ExcalidrawBoardProps = {
  kind?: "method" | "project";
  contextSlug?: string;
  title?: string;
};

function getStorageKey(kind: "method" | "project", contextSlug: string) {
  return `visiblevibe.${kind}.${contextSlug}.board.v2`;
}

function readScene(storageKey: string): StoredScene | null {
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return null;
    return JSON.parse(raw) as StoredScene;
  } catch {
    return null;
  }
}

export function ExcalidrawBoard({
  kind = "method",
  contextSlug = "visiblevibe",
  title = "VisibleVibe-Methode",
}: ExcalidrawBoardProps) {
  const { setTexts } = useBoardTexts();
  const [Excalidraw, setExcalidraw] = useState<ComponentType<ExcalidrawProps> | null>(null);
  const [initialData, setInitialData] = useState<StoredScene | null>(null);
  const [ready, setReady] = useState(false);
  const [boardId, setBoardId] = useState<string | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [showVersions, setShowVersions] = useState(false);
  const [saveState, setSaveState] = useState<
    "idle" | "saving" | "saved" | "offline" | "error"
  >("idle");
  const saveTimer = useRef<number | null>(null);
  const currentScene = useRef<StoredScene | null>(null);
  const pendingScene = useRef<StoredScene | null>(null);
  const storageKey = getStorageKey(kind, contextSlug);

  useEffect(() => {
    let cancelled = false;
    window.EXCALIDRAW_ASSET_PATH = "/";

    void import("@excalidraw/excalidraw").then((mod) => {
      if (!cancelled) setExcalidraw(() => mod.Excalidraw as ComponentType<ExcalidrawProps>);
    });

    async function loadScene() {
      const localScene =
        readScene(storageKey) ?? (kind === "method" ? readScene(METHOD_BOARD_KEY) : null);
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        if (!cancelled) {
          currentScene.current = localScene;
          setInitialData(localScene);
          setTexts(textsFromElements(localScene?.elements));
          setReady(true);
        }
        return;
      }

      if (!cancelled) setAuthenticated(true);

      const { data: existing } = await supabase
        .from("boards")
        .select("id, scene_data")
        .eq("kind", kind)
        .eq("context_slug", contextSlug)
        .maybeSingle();

      if (cancelled) return;

      if (existing) {
        const scene = existing.scene_data as StoredScene;
        currentScene.current = scene;
        setBoardId(existing.id);
        setInitialData(scene);
        setTexts(textsFromElements(scene.elements));
        setReady(true);
        return;
      }

      const scene = localScene ?? { elements: [], appState: {}, files: {} };
      const { data: created, error } = await supabase
        .from("boards")
        .insert({
          owner_id: user.id,
          kind,
          context_slug: contextSlug,
          title,
          scene_data: scene,
        })
        .select("id, scene_data")
        .single();

      if (cancelled) return;

      if (error) {
        currentScene.current = localScene;
        setInitialData(localScene);
        setSaveState("error");
      } else {
        currentScene.current = created.scene_data as StoredScene;
        setBoardId(created.id);
        setInitialData(created.scene_data as StoredScene);
      }
      setTexts(textsFromElements(scene.elements));
      setReady(true);
    }

    void loadScene();

    return () => {
      cancelled = true;
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
    };
  }, [contextSlug, kind, setTexts, storageKey, title]);

  const persistScene = useCallback(
    async (scene: StoredScene) => {
      window.localStorage.setItem(storageKey, JSON.stringify(scene));

      if (!boardId) {
        setSaveState("saved");
        return;
      }

      if (!window.navigator.onLine) {
        pendingScene.current = scene;
        setSaveState("offline");
        return;
      }

      const supabase = createClient();
      const { error } = await supabase
        .from("boards")
        .update({
          scene_data: scene,
          updated_at: new Date().toISOString(),
        })
        .eq("id", boardId);

      if (error) {
        pendingScene.current = scene;
        setSaveState(window.navigator.onLine ? "error" : "offline");
        return;
      }

      pendingScene.current = null;
      setSaveState("saved");
    },
    [boardId, storageKey],
  );

  useEffect(() => {
    function handleOffline() {
      if (authenticated) setSaveState("offline");
    }

    function handleOnline() {
      const scene = pendingScene.current;
      if (!scene) return;
      setSaveState("saving");
      void persistScene(scene);
    }

    function flushLocalScene() {
      if (currentScene.current) {
        window.localStorage.setItem(storageKey, JSON.stringify(currentScene.current));
      }
    }

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);
    window.addEventListener("beforeunload", flushLocalScene);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("beforeunload", flushLocalScene);
    };
  }, [authenticated, persistScene, storageKey]);

  const handleChange = useCallback(
    (elements: unknown[], appState: Record<string, unknown>, files: Record<string, unknown>) => {
      const scene = {
        elements,
        appState: {
          ...appState,
          collaborators: undefined,
        },
        files,
      };

      currentScene.current = scene;
      pendingScene.current = scene;
      setSaveState(window.navigator.onLine ? "saving" : "offline");

      if (saveTimer.current) window.clearTimeout(saveTimer.current);
      saveTimer.current = window.setTimeout(() => {
        setTexts(textsFromElements(elements));
        void persistScene(scene);
      }, 700);
    },
    [persistScene, setTexts],
  );

  async function resetBoard() {
    window.localStorage.removeItem(storageKey);

    if (boardId) {
      const supabase = createClient();
      await supabase
        .from("boards")
        .update({
          scene_data: { elements: [], appState: {}, files: {} },
          updated_at: new Date().toISOString(),
        })
        .eq("id", boardId);
    }

    window.location.reload();
  }

  if (!Excalidraw || !ready) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-muted">
        Whiteboard wird geladen …
      </div>
    );
  }

  return (
    <div className="relative h-full min-h-[28rem] w-full">
      <Excalidraw
        langCode="de-DE"
        initialData={{
          elements: initialData?.elements ?? [],
          appState: {
            viewBackgroundColor: "#ffffff",
            ...(initialData?.appState ?? {}),
            collaborators: new Map(),
          },
          files: initialData?.files ?? {},
        }}
        UIOptions={{
          canvasActions: {
            toggleTheme: false,
          },
        }}
        onChange={handleChange as ExcalidrawProps["onChange"]}
      />
      <div className="absolute bottom-3 right-3 z-10 flex gap-2">
        {boardId ? (
          <button
            type="button"
            onClick={() => setShowVersions(true)}
            className="rounded-md border-2 border-ink bg-white px-2 py-1 text-xs text-muted hover:bg-fhnw-soft hover:text-ink"
          >
            Versionen
          </button>
        ) : null}
        <button
          type="button"
          onClick={() => void resetBoard()}
          className="rounded-md border-2 border-ink bg-white px-2 py-1 text-xs text-muted hover:bg-fhnw-soft hover:text-ink"
        >
          Board zurücksetzen
        </button>
      </div>
      <div className="absolute right-3 top-3 z-10 rounded-md border border-ink/20 bg-white/90 px-2 py-1 text-xs text-muted">
        {authenticated ? (
          saveState === "error" ? (
            "Speichern fehlgeschlagen – wird erneut versucht"
          ) : saveState === "offline" ? (
            "Offline – lokal gesichert"
          ) : saveState === "saving" ? (
            "Wird gespeichert …"
          ) : (
            "In deinem Konto gespeichert"
          )
        ) : (
          <Link href="/login" className="underline">
            Anmelden zum Speichern
          </Link>
        )}
      </div>
      {showVersions && boardId ? (
        <BoardVersionHistory
          boardId={boardId}
          storageKey={storageKey}
          currentScene={currentScene.current}
          onClose={() => setShowVersions(false)}
        />
      ) : null}
    </div>
  );
}
