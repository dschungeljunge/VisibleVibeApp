"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { MarkdownBody } from "./MarkdownBody";
import { VideoEmbed } from "./VideoEmbed";
import { useBoardTexts } from "./BoardTextContext";
import type { ContentStatus, MethodTask } from "@/lib/types";

export type MethodCoachStep = {
  slug: string;
  title: string;
  goal?: string;
  summary: string;
  body: string;
  status: ContentStatus;
  video?: string;
  tasks: MethodTask[];
};

export type MethodCoachPeer = {
  slug: string;
  title: string;
  status: ContentStatus;
};

function clip(text: string, max = 88) {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

function localAdapt(task: MethodTask, quotes: string[]) {
  const action = task.board ?? "Mach den nächsten sichtbaren Schritt auf dem Board.";
  return [
    "Ausgehend von dem, was du bereits notiert hast:",
    ...quotes.slice(0, 4).map((quote) => `• ${clip(quote, 92)}`),
    "",
    action,
  ].join("\n");
}

export function MethodCoach({
  step,
  steps,
}: {
  step: MethodCoachStep;
  steps: MethodCoachPeer[];
}) {
  const router = useRouter();
  const { texts } = useBoardTexts();
  const [taskIndex, setTaskIndex] = useState(0);
  const [adapted, setAdapted] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const tasks = useMemo<MethodTask[]>(() => {
    if (step.tasks.length) return step.tasks;
    return [
      {
        id: "start",
        title: "Auftrag",
        why: step.goal,
        text: step.body || step.summary,
        board: step.goal,
      },
    ];
  }, [step]);

  const task = tasks[Math.min(taskIndex, tasks.length - 1)];
  const phaseIndex = steps.findIndex((item) => item.slug === step.slug);
  const previousPhase = phaseIndex > 0 ? steps[phaseIndex - 1] : null;
  const nextPhase = phaseIndex >= 0 && phaseIndex < steps.length - 1 ? steps[phaseIndex + 1] : null;
  const quotes = texts.slice(0, 4);
  const lastTask = taskIndex >= tasks.length - 1;

  function goToTask(index: number) {
    setTaskIndex(index);
    setAdapted(null);
  }

  function goNext() {
    if (!lastTask) {
      goToTask(taskIndex + 1);
      return;
    }
    if (nextPhase) router.push(`/design/visiblevibe/${nextPhase.slug}`);
  }

  function goBack() {
    if (taskIndex > 0) {
      goToTask(taskIndex - 1);
      return;
    }
    if (previousPhase) router.push(`/design/visiblevibe/${previousPhase.slug}`);
  }

  async function adaptToBoard() {
    if (!quotes.length) return;
    setBusy(true);
    setAdapted(localAdapt(task, texts));

    try {
      const response = await fetch("/api/method/adapt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phase: step.title,
          task: task.title,
          why: task.why,
          board: task.board,
          text: task.text,
          coach: task.coach,
          notes: texts.slice(0, 8),
        }),
      });

      if (response.ok) {
        const data = (await response.json()) as { instruction?: string };
        if (data.instruction?.trim()) setAdapted(data.instruction.trim());
      }
    } catch {
      // lokale Fassung bleibt
    } finally {
      setBusy(false);
    }
  }

  const nextLabel = lastTask
    ? nextPhase
      ? `Weiter zu ${nextPhase.title}`
      : "Fertig"
    : "Nächste Aufgabe";

  return (
    <article className="flex flex-col gap-5 text-base leading-relaxed">
      <header>
        <p className="text-sm text-muted">
          Phase {phaseIndex + 1} von {steps.length}
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">{step.title}</h1>
        {step.goal ? <p className="mt-3 text-[1.05rem] leading-relaxed text-ink/85">{step.goal}</p> : null}
      </header>

      {step.body ? (
        <div className="text-[0.95rem] leading-relaxed text-ink/80 [&_.prose]:text-[0.95rem] [&_.prose]:max-w-none [&_.prose]:leading-relaxed">
          <MarkdownBody content={step.body} />
        </div>
      ) : null}

      <div>
        <p className="text-sm font-medium text-ink">
          Aufgabe {taskIndex + 1} von {tasks.length}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {tasks.map((item, index) => {
            const current = index === taskIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => goToTask(index)}
                className={`rounded-md border-2 px-2.5 py-1 text-sm ${
                  current
                    ? "border-ink bg-fhnw font-medium"
                    : index < taskIndex
                      ? "border-ink/40 bg-white"
                      : "border-ink/20 bg-white text-muted"
                }`}
              >
                {index + 1}. {item.title}
              </button>
            );
          })}
        </div>
      </div>

      {task.why ? (
        <p className="border-l-4 border-fhnw pl-3 text-[0.95rem] leading-relaxed text-ink/85">{task.why}</p>
      ) : null}

      {adapted ? (
        <p className="whitespace-pre-wrap leading-relaxed">{adapted}</p>
      ) : task.text ? (
        <div className="[&_.prose]:max-w-none [&_.prose]:text-base [&_.prose]:leading-relaxed [&_.prose_li]:my-1 [&_.prose_p]:my-2 [&_.prose_strong]:font-semibold">
          <MarkdownBody content={task.text} />
        </div>
      ) : null}

      {task.board ? (
        <div className="rounded-md border-2 border-ink bg-fhnw px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide">Jetzt auf dem Board</p>
          <p className="mt-1.5 leading-relaxed">{task.board}</p>
        </div>
      ) : null}

      {task.done ? (
        <p className="text-sm leading-relaxed text-ink/75">
          <span className="font-semibold text-ink">Fertig, wenn: </span>
          {task.done}
        </p>
      ) : null}

      {quotes.length ? (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Von deinem Board</p>
          <ul className="mt-2 space-y-1.5 text-sm text-ink/80">
            {quotes.map((quote) => (
              <li key={quote}>«{clip(quote, 110)}»</li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => (adapted ? setAdapted(null) : void adaptToBoard())}
            className="mt-2 text-sm underline underline-offset-2"
            disabled={busy}
          >
            {busy ? "Schärfe die Anleitung …" : adapted ? "Originalanleitung anzeigen" : "Anleitung an mein Board anpassen"}
          </button>
        </div>
      ) : (
        <p className="text-sm text-muted">
          Sobald Text auf dem Board steht, kannst du die nächste Anleitung daran anpassen.
        </p>
      )}

      {step.video ? (
        <details className="border-t border-ink/15 pt-3">
          <summary className="cursor-pointer text-sm font-medium">Video zu diesem Schritt</summary>
          <div className="mt-3">
            <VideoEmbed url={step.video} />
          </div>
        </details>
      ) : null}

      <div className="flex items-center justify-between gap-3 pt-1">
        <button
          type="button"
          onClick={goBack}
          disabled={taskIndex === 0 && !previousPhase}
          className="text-sm underline underline-offset-2 disabled:text-muted disabled:no-underline"
        >
          Zurück
        </button>
        <button
          type="button"
          onClick={goNext}
          disabled={lastTask && !nextPhase}
          className="rounded-md border-2 border-ink bg-fhnw px-4 py-2 text-sm font-medium hover:bg-fhnw-soft disabled:border-muted disabled:bg-white disabled:text-muted"
        >
          {nextLabel}
        </button>
      </div>

      <nav className="flex flex-wrap gap-1 border-t border-ink/15 pt-4">
        {steps.map((item) => {
          const current = item.slug === step.slug;
          return (
            <Link
              key={item.slug}
              href={`/design/visiblevibe/${item.slug}`}
              className={`rounded px-2 py-1 text-xs ${
                current ? "bg-fhnw font-medium" : "text-muted hover:bg-fhnw-soft hover:text-ink"
              }`}
            >
              {item.title}
            </Link>
          );
        })}
      </nav>
    </article>
  );
}
