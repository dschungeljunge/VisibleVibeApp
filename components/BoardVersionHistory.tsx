"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type StoredScene = {
  elements?: unknown[];
  appState?: Record<string, unknown>;
  files?: Record<string, unknown>;
};

type BoardVersion = {
  id: string;
  scene_data: StoredScene;
  reason: "autosave" | "manual" | "restore";
  created_at: string;
};

export function BoardVersionHistory({
  boardId,
  storageKey,
  currentScene,
  onClose,
}: {
  boardId: string;
  storageKey: string;
  currentScene: StoredScene | null;
  onClose: () => void;
}) {
  const [versions, setVersions] = useState<BoardVersion[]>([]);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  const loadVersions = useCallback(async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("board_versions")
      .select("id, scene_data, reason, created_at")
      .eq("board_id", boardId)
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      setMessage("Versionen konnten nicht geladen werden.");
      return;
    }

    setVersions((data ?? []) as BoardVersion[]);
  }, [boardId]);

  useEffect(() => {
    void loadVersions();
  }, [loadVersions]);

  async function createVersion() {
    if (!currentScene) return;
    setPending(true);
    setMessage("");

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = user
      ? await supabase.from("board_versions").insert({
          board_id: boardId,
          owner_id: user.id,
          scene_data: currentScene,
          reason: "manual",
        })
      : { error: new Error("Nicht angemeldet") };

    setPending(false);
    setMessage(error ? "Version konnte nicht erstellt werden." : "Version erstellt.");
    if (!error) await loadVersions();
  }

  async function restoreVersion(version: BoardVersion) {
    if (!window.confirm("Diese Version wiederherstellen? Der aktuelle Stand bleibt als Version erhalten.")) {
      return;
    }

    setPending(true);
    setMessage("");
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data: current } = await supabase
      .from("boards")
      .select("scene_data")
      .eq("id", boardId)
      .single();

    if (user && current) {
      await supabase.from("board_versions").insert({
        board_id: boardId,
        owner_id: user.id,
        scene_data: current.scene_data,
        reason: "restore",
      });
    }

    const { error } = await supabase
      .from("boards")
      .update({
        scene_data: version.scene_data,
        updated_at: new Date().toISOString(),
      })
      .eq("id", boardId);

    if (error) {
      setPending(false);
      setMessage("Wiederherstellung fehlgeschlagen.");
      return;
    }

    window.localStorage.setItem(storageKey, JSON.stringify(version.scene_data));
    window.location.reload();
  }

  return (
    <div className="absolute inset-y-3 right-3 z-20 flex w-[min(24rem,calc(100%-1.5rem))] flex-col rounded-xl border-2 border-ink bg-white p-4 shadow-xl">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold">Versionen</h2>
        <button type="button" onClick={onClose} className="rounded-md px-2 py-1 hover:bg-paper">
          Schließen
        </button>
      </div>

      <button
        type="button"
        disabled={pending || !currentScene}
        onClick={() => void createVersion()}
        className="mt-4 rounded-md border-2 border-ink bg-fhnw px-3 py-2 text-sm font-medium disabled:opacity-60"
      >
        Aktuellen Stand sichern
      </button>

      {message ? <p className="mt-3 text-sm text-muted">{message}</p> : null}

      <div className="mt-4 min-h-0 flex-1 space-y-2 overflow-y-auto">
        {versions.length ? (
          versions.map((version) => (
            <div key={version.id} className="rounded-md border border-ink/25 p-3">
              <p className="text-sm font-medium">
                {new Intl.DateTimeFormat("de-CH", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(new Date(version.created_at))}
              </p>
              <p className="mt-1 text-xs text-muted">
                {version.reason === "manual"
                  ? "Manuell gesichert"
                  : version.reason === "restore"
                    ? "Vor Wiederherstellung"
                    : "Automatische Sicherung"}
              </p>
              <button
                type="button"
                disabled={pending}
                onClick={() => void restoreVersion(version)}
                className="mt-2 text-sm underline disabled:opacity-60"
              >
                Wiederherstellen
              </button>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted">Noch keine früheren Versionen vorhanden.</p>
        )}
      </div>
    </div>
  );
}
