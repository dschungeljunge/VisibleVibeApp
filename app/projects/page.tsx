import type { Metadata } from "next";
import { PageKicker, PageMain } from "@/components/Page";
import { ProjectTemplateCard } from "@/components/ProjectTemplateCard";
import { getVisibleDocuments } from "@/lib/content";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Projekte",
};

export default async function ProjectsPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: boards } = user
    ? await supabase
        .from("boards")
        .select("context_slug")
        .eq("kind", "project")
    : { data: [] };

  const started = new Set(boards?.map((board) => board.context_slug));
  const projects = getVisibleDocuments("learn-project");

  return (
    <PageMain wide>
      <PageKicker>Projekte</PageKicker>
      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
        Lernapps Schritt für Schritt entwickeln
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/80">
        Jedes Projekt verbindet eine geführte Anleitung mit einem eigenen Excalidraw-Board.
        Dein Arbeitsstand bleibt gespeichert, bis du weiterarbeitest.
      </p>
      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectTemplateCard
            key={project.slug}
            slug={project.slug}
            title={project.title}
            summary={project.summary}
            userId={user?.id}
            started={started.has(project.slug)}
          />
        ))}
      </div>
    </PageMain>
  );
}
