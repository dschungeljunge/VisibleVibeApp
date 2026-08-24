import Link from "next/link";
import { CATEGORY_LABELS } from "@/lib/content";
import type { ContentDocument, LearnCategory } from "@/lib/types";
import type { ProjectSkillMap } from "@/lib/skilltree";

const CATEGORY_MARKER: Record<LearnCategory, string> = {
  pedagogy: "bg-cat-pedagogy",
  technology: "bg-cat-technology",
  usability: "bg-cat-usability",
};

function TopicCard({ topic }: { topic: ContentDocument }) {
  return (
    <Link href={`/learn/${topic.slug}`} className="vv-box vv-lift block h-full px-5 py-4">
      <span className="block font-medium leading-snug">{topic.title}</span>
      {topic.category ? (
        <span className="mt-3 flex items-center gap-2 text-xs text-muted">
          <span
            className={`h-1.5 w-6 rounded-full ${CATEGORY_MARKER[topic.category]}`}
            aria-hidden
          />
          {CATEGORY_LABELS[topic.category]}
        </span>
      ) : null}
    </Link>
  );
}

function ProjectAnchor({ project, index }: { project: ContentDocument; index: number }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="vv-box vv-lift block max-w-md bg-fhnw px-6 py-5 text-center"
    >
      <span className="block text-xs font-semibold uppercase tracking-widest text-ink/70">
        Projekt {index + 1}
      </span>
      <span className="mt-1 block text-lg font-semibold leading-snug">{project.title}</span>
    </Link>
  );
}

export function SkillTree({ map }: { map: ProjectSkillMap }) {
  if (map.groups.length === 0 && map.unassigned.length === 0) {
    return <p className="text-muted">Noch keine veröffentlichten Lerninhalte.</p>;
  }

  return (
    <div className="flex flex-col gap-20">
      {map.groups.map(({ project, topics }, index) => (
        <section key={project.slug} className="flex flex-col items-center">
          {topics.length > 0 ? (
            <>
              <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {topics.map((topic) => (
                  <TopicCard key={topic.slug} topic={topic} />
                ))}
              </div>
              <div className="h-10 w-0.5 bg-ink" aria-hidden />
            </>
          ) : null}
          <ProjectAnchor project={project} index={index} />
        </section>
      ))}

      {map.unassigned.length > 0 ? (
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
            Weitere Themen
          </h2>
          <div className="mt-4 grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {map.unassigned.map((topic) => (
              <TopicCard key={topic.slug} topic={topic} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
