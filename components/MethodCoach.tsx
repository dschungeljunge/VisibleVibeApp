"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MarkdownBody } from "./MarkdownBody";
import { VideoEmbed } from "./VideoEmbed";
import type { ContentStatus, MethodTask } from "@/lib/types";

export type MethodCoachStep = {
  slug: string;
  title: string;
  heading?: string;
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

export function MethodCoach({
  step,
  steps,
}: {
  step: MethodCoachStep;
  steps: MethodCoachPeer[];
}) {
  const router = useRouter();
  const [taskIndex, setTaskIndex] = useState(0);

  useEffect(() => {
    setTaskIndex(0);
  }, [step.slug]);

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
  const guided = Boolean(task.question);
  const prompt = task.question ?? task.title;
  const phaseIndex = steps.findIndex((item) => item.slug === step.slug);
  const previousPhase = phaseIndex > 0 ? steps[phaseIndex - 1] : null;
  const nextPhase = phaseIndex >= 0 && phaseIndex < steps.length - 1 ? steps[phaseIndex + 1] : null;
  const lastTask = taskIndex >= tasks.length - 1;
  const whyThisStep = [step.goal, step.body].filter(Boolean).join("\n\n");

  function goToTask(index: number) {
    setTaskIndex(index);
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
    if (previousPhase) {
      router.push(`/design/visiblevibe/${previousPhase.slug}`);
      return;
    }
    router.push("/design/visiblevibe");
  }

  const nextLabel = lastTask
    ? nextPhase
      ? `Weiter zu ${nextPhase.title}`
      : "Fertig"
    : "Weiter";

  return (
    <article className="flex flex-col gap-8 text-base leading-relaxed">
      <h1 className="text-[1.65rem] font-semibold tracking-tight leading-snug">{prompt}</h1>

      {!guided && task.why ? (
        <p className="border-l-4 border-fhnw pl-3 text-[0.95rem] leading-relaxed text-ink/85">{task.why}</p>
      ) : null}

      {!guided && task.text ? (
        <div className="[&_.prose]:max-w-none [&_.prose]:text-base [&_.prose]:leading-relaxed [&_.prose_li]:my-1 [&_.prose_p]:my-2 [&_.prose_strong]:font-semibold">
          <MarkdownBody content={task.text} />
        </div>
      ) : null}

      {task.board ? (
        <div className="rounded-md border-2 border-ink bg-fhnw px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-wide">Jetzt auf dem Board</p>
          <div className="mt-2 [&_.prose]:max-w-none [&_.prose]:text-[1.05rem] [&_.prose]:leading-relaxed [&_.prose_p]:my-2 [&_.prose_p:first-child]:mt-0 [&_.prose_p:last-child]:mb-0">
            <MarkdownBody content={task.board} />
          </div>
        </div>
      ) : null}

      {task.done ? (
        <p className="text-sm leading-relaxed text-ink/75">
          <span className="font-semibold text-ink">Fertig, wenn: </span>
          {task.done}
        </p>
      ) : null}

      {guided && task.text ? (
        <details className="text-sm">
          <summary className="cursor-pointer font-medium text-ink/80">Beispiel</summary>
          <div className="mt-3 [&_.prose]:max-w-none [&_.prose]:text-sm [&_.prose]:leading-relaxed [&_.prose_p]:my-2">
            <MarkdownBody content={task.text} />
          </div>
        </details>
      ) : null}

      {whyThisStep ? (
        <details className="text-sm">
          <summary className="cursor-pointer font-medium text-ink/80">Wozu dieser Schritt?</summary>
          <div className="mt-3 [&_.prose]:max-w-none [&_.prose]:text-sm [&_.prose]:leading-relaxed [&_.prose_p]:my-2">
            <MarkdownBody content={whyThisStep} />
          </div>
        </details>
      ) : null}

      {step.video ? (
        <details>
          <summary className="cursor-pointer text-sm font-medium">Video zu diesem Schritt</summary>
          <div className="mt-3">
            <VideoEmbed url={step.video} />
          </div>
        </details>
      ) : null}

      <div className="flex items-center justify-between gap-3 pt-1">
        <button type="button" onClick={goBack} className="text-sm underline underline-offset-2">
          Zurück
        </button>
        {tasks.length > 1 ? (
          <p className="text-sm text-muted">
            {taskIndex + 1} von {tasks.length}
          </p>
        ) : null}
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
        <Link
          href="/design/visiblevibe"
          className="rounded px-2 py-1 text-xs text-muted hover:bg-fhnw-soft hover:text-ink"
        >
          Start
        </Link>
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
