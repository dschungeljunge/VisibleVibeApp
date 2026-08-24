import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { BoardErrorBoundary } from "@/components/BoardErrorBoundary";
import { ExcalidrawBoard } from "@/components/ExcalidrawBoard";
import { MarkdownBody } from "@/components/MarkdownBody";
import { getDocument } from "@/lib/content";
import { createClient } from "@/lib/supabase/server";

type Params = { slug: string };

export default async function ProjectWorkspacePage({ params }: { params: Params }) {
  const project = getDocument("learn-project", params.slug);
  if (!project) notFound();

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: board } = await supabase
    .from("boards")
    .select("context_slug, title")
    .eq("kind", "project")
    .eq("context_slug", params.slug)
    .maybeSingle();

  if (!board) notFound();

  return (
    <main className="flex h-[calc(100dvh-3.75rem)] flex-col lg:flex-row">
      <aside className="max-h-[42%] overflow-y-auto border-b-2 border-ink bg-white px-5 py-6 lg:h-full lg:max-h-none lg:w-[25%] lg:min-w-[18rem] lg:border-b-0 lg:border-r-2">
        <Link href="/dashboard" className="text-sm text-muted hover:underline">
          ← Meine Boards
        </Link>
        <p className="mt-8 text-sm text-muted">Projektboard</p>
        <div className="mt-5">
          <MarkdownBody content={project.body} />
        </div>
      </aside>
      <section className="min-h-0 flex-1 bg-paper">
        <BoardErrorBoundary>
          <ExcalidrawBoard
            kind="project"
            contextSlug={board.context_slug}
            title={board.title}
          />
        </BoardErrorBoundary>
      </section>
    </main>
  );
}
