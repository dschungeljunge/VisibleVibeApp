"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function AccountDataActions({ email }: { email: string }) {
  const router = useRouter();
  const [confirmation, setConfirmation] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  async function exportData() {
    setPending(true);
    setMessage("");
    const supabase = createClient();
    const [{ data: boards, error: boardsError }, { data: versions, error: versionsError }] =
      await Promise.all([
        supabase.from("boards").select("*").order("updated_at", { ascending: false }),
        supabase.from("board_versions").select("*").order("created_at", { ascending: false }),
      ]);

    if (boardsError || versionsError) {
      setPending(false);
      setMessage("Der Export konnte nicht erstellt werden.");
      return;
    }

    const payload = JSON.stringify(
      {
        format: "visiblevibe-export-v1",
        exportedAt: new Date().toISOString(),
        account: { email },
        boards,
        boardVersions: versions,
      },
      null,
      2,
    );
    const url = URL.createObjectURL(new Blob([payload], { type: "application/json" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `visiblevibe-export-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    setPending(false);
    setMessage("Export erstellt.");
  }

  async function deleteAccount() {
    if (confirmation !== "LÖSCHEN") return;
    if (!window.confirm("Konto und alle Boards unwiderruflich löschen?")) return;

    setPending(true);
    setMessage("");
    const supabase = createClient();
    const { error } = await supabase.functions.invoke("delete-account");

    if (error) {
      setPending(false);
      setMessage("Das Konto konnte nicht gelöscht werden.");
      return;
    }

    for (let index = window.localStorage.length - 1; index >= 0; index -= 1) {
      const key = window.localStorage.key(index);
      if (key?.startsWith("visiblevibe.")) window.localStorage.removeItem(key);
    }

    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <div className="space-y-8">
      <section className="vv-box p-6">
        <h2 className="text-xl font-semibold">Passwort</h2>
        <p className="mt-2 text-ink/75">Lege ein neues Passwort fest.</p>
        <Link
          href="/account/password"
          className="mt-5 inline-block rounded-md border-2 border-ink bg-white px-4 py-2 font-medium hover:bg-fhnw-soft"
        >
          Passwort ändern
        </Link>
      </section>

      <section className="vv-box p-6">
        <h2 className="text-xl font-semibold">Meine Daten exportieren</h2>
        <p className="mt-2 text-ink/75">
          Lade alle Boards und gespeicherten Versionen als JSON-Datei herunter.
        </p>
        <button
          type="button"
          disabled={pending}
          onClick={() => void exportData()}
          className="mt-5 rounded-md border-2 border-ink bg-white px-4 py-2 font-medium hover:bg-fhnw-soft disabled:opacity-60"
        >
          Daten herunterladen
        </button>
      </section>

      <section className="rounded-2xl border-2 border-red-700 bg-white p-6">
        <h2 className="text-xl font-semibold text-red-800">Konto löschen</h2>
        <p className="mt-2 text-ink/75">
          Dabei werden das Konto, alle Boards und alle Versionen unwiderruflich gelöscht.
          Exportiere deine Daten vorher, wenn du sie behalten möchtest.
        </p>
        <label className="mt-5 block">
          <span className="mb-1 block text-sm text-muted">
            Zur Bestätigung LÖSCHEN eingeben
          </span>
          <input
            value={confirmation}
            onChange={(event) => setConfirmation(event.target.value)}
            className="w-full max-w-sm rounded-md border-2 border-ink px-3 py-2"
          />
        </label>
        <button
          type="button"
          disabled={pending || confirmation !== "LÖSCHEN"}
          onClick={() => void deleteAccount()}
          className="mt-4 rounded-md border-2 border-red-800 bg-red-700 px-4 py-2 font-medium text-white disabled:opacity-40"
        >
          Konto endgültig löschen
        </button>
      </section>

      {message ? <p className="text-sm text-muted">{message}</p> : null}
    </div>
  );
}
