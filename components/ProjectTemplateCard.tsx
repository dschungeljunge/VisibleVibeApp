"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type ProjectTemplateCardProps = {
  slug: string;
  title: string;
  summary: string;
  userId?: string;
  started?: boolean;
  updatedAt?: string;
};

export function ProjectTemplateCard({
  slug,
  title,
  summary,
  userId,
  started = false,
  updatedAt,
}: ProjectTemplateCardProps) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const href = `/projects/${slug}`;

  async function startProject() {
    if (!userId) {
      router.push("/login");
      return;
    }

    setPending(true);
    const supabase = createClient();
    const { error } = await supabase.from("boards").insert({
      owner_id: userId,
      kind: "project",
      context_slug: slug,
      title,
      scene_data: { elements: [], appState: {}, files: {} },
    });

    if (!error || error.code === "23505") {
      router.push(href);
      router.refresh();
      return;
    }

    setPending(false);
  }

  return (
    <article className="vv-box flex h-full flex-col p-6">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-3 flex-1 leading-relaxed text-ink/75">{summary}</p>
      {updatedAt ? <p className="mt-4 text-xs text-muted">Zuletzt bearbeitet: {updatedAt}</p> : null}
      {started ? (
        <Link
          href={href}
          className="mt-5 self-start rounded-md border-2 border-ink bg-fhnw px-4 py-2 font-medium"
        >
          Weiterarbeiten
        </Link>
      ) : (
        <button
          type="button"
          onClick={() => void startProject()}
          disabled={pending}
          className="mt-5 self-start rounded-md border-2 border-ink bg-fhnw px-4 py-2 font-medium disabled:opacity-60"
        >
          {pending ? "Wird vorbereitet …" : userId ? "Projekt starten" : "Anmelden und starten"}
        </button>
      )}
    </article>
  );
}
