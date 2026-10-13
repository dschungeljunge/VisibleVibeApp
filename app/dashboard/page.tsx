import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PageKicker, PageMain } from "@/components/Page";
import { ProjectTemplateCard } from "@/components/ProjectTemplateCard";
import { getVisibleDocuments } from "@/lib/content";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Meine Boards",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("de-CH", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: boards } = await supabase
    .from("boards")
    .select("id, kind, context_slug, title, updated_at")
    .order("updated_at", { ascending: false });

  const methodBoard = boards?.find((board) => board.kind === "method");
  const projectBoards = boards?.filter((board) => board.kind === "project") ?? [];
  const projects = getVisibleDocuments("learn-project");
  const methodHref = "/design/visiblevibe";

  return (
    <PageMain wide>
      <PageKicker>Persönlicher Arbeitsbereich</PageKicker>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Meine Boards</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
        Hier findest du die fortlaufende VisibleVibe-Methode und deine eigenständigen
        Projektboards.
      </p>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">VisibleVibe-Methode</h2>
        <Link href={methodHref} className="vv-box vv-lift mt-5 block p-6">
          <p className="font-semibold">Fortlaufendes Methoden-Board</p>
          <p className="mt-2 text-sm text-muted">
            {methodBoard
              ? `Zuletzt bearbeitet: ${formatDate(methodBoard.updated_at)}`
              : "Noch nicht begonnen – starte mit dem ersten Methodenschritt."}
          </p>
        </Link>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Projekte</h2>
        <p className="mt-2 text-ink/75">
          Jedes Projekt besitzt ein eigenes Board und bleibt von der VisibleVibe-Methode getrennt.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {projects.map((project) => {
            const board = projectBoards.find(
              (candidate) => candidate.context_slug === project.slug,
            );

            return (
              <ProjectTemplateCard
                key={project.slug}
                slug={project.slug}
                title={project.title}
                summary={project.summary}
                userId={user.id}
                started={Boolean(board)}
                updatedAt={board ? formatDate(board.updated_at) : undefined}
              />
            );
          })}
        </div>
      </section>
    </PageMain>
  );
}
