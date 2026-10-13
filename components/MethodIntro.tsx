import Link from "next/link";
import { MarkdownBody } from "./MarkdownBody";
import type { ContentDocument } from "@/lib/types";

export function MethodIntro({
  intro,
  steps,
  firstSlug,
}: {
  intro: ContentDocument;
  steps: ContentDocument[];
  firstSlug: string;
}) {
  return (
    <article className="flex flex-col gap-8 text-base leading-relaxed">
      <h1 className="text-[1.65rem] font-semibold tracking-tight leading-snug">
        {intro.heading ?? intro.title}
      </h1>

      <div className="[&_.prose]:max-w-none [&_.prose]:text-base [&_.prose]:leading-relaxed [&_.prose_p]:my-3 [&_.prose_p:first-child]:mt-0">
        <MarkdownBody content={intro.body} />
      </div>

      <div className="flex items-center justify-end pt-1">
        <Link
          href={`/design/visiblevibe/${firstSlug}`}
          className="rounded-md border-2 border-ink bg-fhnw px-4 py-2 text-sm font-medium hover:bg-fhnw-soft"
        >
          Loslegen
        </Link>
      </div>

      <nav className="flex flex-wrap gap-1 border-t border-ink/15 pt-4">
        <span className="rounded bg-fhnw px-2 py-1 text-xs font-medium">Start</span>
        {steps.map((item) => (
          <Link
            key={item.slug}
            href={`/design/visiblevibe/${item.slug}`}
            className="rounded px-2 py-1 text-xs text-muted hover:bg-fhnw-soft hover:text-ink"
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </article>
  );
}
