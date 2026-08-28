"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { WALCHWIL_PARTICIPANT_KEY, formatParticipantNames } from "@/lib/walchwil-participant";

type QuestionRow = {
  id: string;
  body: string;
  author: string;
  supporters: string[];
  created_at: string;
};

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9äöüß ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function namesOn(question: QuestionRow): string[] {
  return [question.author, ...question.supporters.filter((name) => name !== question.author)];
}

export function WalchwilQuestions({
  sessionSlug,
  participants,
}: {
  sessionSlug: string;
  participants: string[];
}) {
  const supabase = useMemo(() => createClient(), []);
  const [me, setMe] = useState<string | null>(null);
  const [questions, setQuestions] = useState<QuestionRow[]>([]);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<QuestionRow | null>(null);

  useEffect(() => {
    const stored =
      window.localStorage.getItem(WALCHWIL_PARTICIPANT_KEY) ??
      window.localStorage.getItem("walchwil-poll-name");
    if (stored && participants.includes(stored)) setMe(stored);
  }, [participants]);

  useEffect(() => {
    if (!pendingDelete) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setPendingDelete(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pendingDelete]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const { data, error: loadError } = await supabase
        .from("walchwil_questions")
        .select("id, body, author, supporters, created_at")
        .eq("session_slug", sessionSlug)
        .neq("body", "")
        .order("created_at", { ascending: true });

      if (cancelled) return;
      if (loadError) {
        setError("Die Fragen konnten gerade nicht geladen werden.");
        return;
      }
      setError(null);
      setQuestions(((data as QuestionRow[]) ?? []).filter((item) => item.body.trim()));
    }

    void load();

    const channel = supabase
      .channel(`walchwil-questions-${sessionSlug}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "walchwil_questions",
          filter: `session_slug=eq.${sessionSlug}`,
        },
        () => {
          void load();
        },
      )
      .subscribe();

    return () => {
      cancelled = true;
      void supabase.removeChannel(channel);
    };
  }, [sessionSlug, supabase]);

  const normalizedDraft = normalize(draft);
  const similar =
    normalizedDraft.length >= 8
      ? questions.filter((question) => {
          const existing = normalize(question.body);
          return existing.includes(normalizedDraft) || normalizedDraft.includes(existing);
        })
      : [];

  function chooseName(name: string) {
    setMe(name);
    window.localStorage.setItem(WALCHWIL_PARTICIPANT_KEY, name);
  }

  function alreadyOn(question: QuestionRow, name: string | null): boolean {
    if (!name) return false;
    return namesOn(question).includes(name);
  }

  async function joinQuestion(question: QuestionRow) {
    if (!me || saving || alreadyOn(question, me)) return;
    setSaving(true);
    setError(null);

    const supporters = question.supporters.includes(me)
      ? question.supporters
      : [...question.supporters, me];

    const { error: saveError } = await supabase
      .from("walchwil_questions")
      .update({ supporters })
      .eq("id", question.id);

    if (saveError) {
      setError("Das hat nicht gespeichert. Bitte noch einmal versuchen.");
    } else {
      setQuestions((prev) =>
        prev.map((item) => (item.id === question.id ? { ...item, supporters } : item)),
      );
    }
    setSaving(false);
  }

  async function submitQuestion() {
    const body = draft.trim();
    if (!me || saving || body.length < 3) return;

    const duplicate = questions.find((question) => normalize(question.body) === normalize(body));
    if (duplicate) {
      await joinQuestion(duplicate);
      setDraft("");
      return;
    }

    setSaving(true);
    setError(null);

    const { data, error: saveError } = await supabase
      .from("walchwil_questions")
      .insert({ session_slug: sessionSlug, body, author: me, supporters: [] })
      .select("id, body, author, supporters, created_at")
      .single();

    if (saveError || !data) {
      setError("Die Frage ist nicht angekommen. Bitte noch einmal versuchen.");
    } else {
      setQuestions((prev) => [...prev, data as QuestionRow]);
      setDraft("");
    }
    setSaving(false);
  }

  async function deleteQuestion(question: QuestionRow) {
    if (!me || saving || question.author !== me) return;
    setSaving(true);
    setError(null);

    const { error: saveError } = await supabase
      .from("walchwil_questions")
      .update({ body: "" })
      .eq("id", question.id)
      .eq("author", me);

    if (saveError) {
      setError("Die Frage konnte nicht gelöscht werden. Bitte noch einmal versuchen.");
    } else {
      setQuestions((prev) => prev.filter((item) => item.id !== question.id));
      setPendingDelete(null);
    }
    setSaving(false);
  }

  return (
    <section className="mt-10 border-t border-ink/20 pt-8">
      <h3 className="text-xl font-semibold tracking-tight">Fragen vorab</h3>
      <p className="mt-3 leading-relaxed text-ink/80">
        Was soll am Live-Termin geklärt werden? Alle sehen die Fragen. Steht deine schon da,
        reicht «ich auch». Eigene Fragen kannst du wieder löschen — sie sind dann für niemanden
        mehr sichtbar. Bitte die Fragen der anderen stehen lassen.
      </p>

      <div className="mt-6 flex flex-wrap gap-1">
        {participants.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => chooseName(name)}
            className={`rounded-md px-3 py-1 ${me === name ? "bg-fhnw font-medium" : "hover:bg-fhnw-soft"}`}
          >
            {name}
          </button>
        ))}
      </div>
      <p className="mt-3 text-sm text-muted">
        {me ? `Eingetragen als ${me}.` : "Namen wählen, dann eine Frage stellen oder «ich auch»."}
      </p>

      {error ? <p className="mt-4 text-sm text-ink">{error}</p> : null}

      {questions.length > 0 ? (
        <ul className="mt-8 divide-y divide-ink/20 overflow-hidden rounded-2xl border-2 border-ink">
          {questions.map((question) => {
            const names = namesOn(question);
            const mine = alreadyOn(question, me);
            const isAuthor = me === question.author;
            return (
              <li key={question.id} className="px-5 py-4">
                <p className="leading-relaxed">{question.body}</p>
                <p className="mt-2 text-sm text-ink/70">
                  {names.length === 1
                    ? names[0]
                    : `${names.length} · ${formatParticipantNames(names)}`}
                </p>
                <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  {me && !mine ? (
                    <button
                      type="button"
                      disabled={saving}
                      onClick={() => void joinQuestion(question)}
                      className="text-sm underline underline-offset-2 hover:bg-fhnw-soft"
                    >
                      ich auch
                    </button>
                  ) : mine ? (
                    <p className="font-hand text-sm">schon notiert</p>
                  ) : null}
                  {isAuthor ? (
                    <button
                      type="button"
                      disabled={saving}
                      onClick={() => setPendingDelete(question)}
                      className="text-sm text-ink/70 underline underline-offset-2 hover:bg-fhnw-soft"
                    >
                      löschen
                    </button>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="mt-8 text-sm text-muted">Noch keine Fragen — die erste darf ruhig klein sein.</p>
      )}

      <div className="mt-8">
        <label htmlFor={`question-${sessionSlug}`} className="block text-sm text-ink/70">
          Neue Frage
        </label>
        <textarea
          id={`question-${sessionSlug}`}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          rows={3}
          maxLength={400}
          disabled={!me || saving}
          placeholder={me ? "In einem Satz reicht." : "Zuerst den Namen wählen."}
          className="mt-2 w-full rounded-2xl border-2 border-ink bg-white px-4 py-3 leading-relaxed outline-none focus:bg-fhnw-soft"
        />
        {similar.length > 0 ? (
          <p className="mt-2 text-sm text-ink/70">
            Ähnlich schon da: {similar.map((question) => question.body).join(" · ")}
          </p>
        ) : null}
        <button
          type="button"
          disabled={!me || saving || draft.trim().length < 3}
          onClick={() => void submitQuestion()}
          className="mt-3 rounded-md bg-fhnw px-4 py-2 font-medium disabled:bg-paper disabled:text-muted"
        >
          Frage stellen
        </button>
      </div>

      {pendingDelete ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-6"
          role="presentation"
          onClick={() => setPendingDelete(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-question-title"
            className="vv-box max-w-md bg-white p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <h4 id="delete-question-title" className="text-xl font-semibold tracking-tight">
              Frage löschen?
            </h4>
            <p className="mt-4 leading-relaxed">
              Sie ist danach für niemanden mehr sichtbar — auch nicht für dich. Bitte nur die
              eigene Frage löschen, nicht die der anderen.
            </p>
            <p className="mt-3 text-sm text-ink/70">«{pendingDelete.body}»</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                disabled={saving}
                onClick={() => void deleteQuestion(pendingDelete)}
                className="rounded-md bg-fhnw px-4 py-2 font-medium"
              >
                Löschen
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={() => setPendingDelete(null)}
                className="rounded-md px-4 py-2 hover:bg-fhnw-soft"
              >
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
