import type { ReactNode } from "react";
import { MarkdownBody } from "@/components/MarkdownBody";
import { PageKicker, PageMain } from "@/components/Page";
import { VideoEmbed } from "@/components/VideoEmbed";
import { CATEGORY_LABELS, type ContentDocument } from "@/lib/content";

export function ContentArticle({
  document,
  kicker,
}: {
  document: ContentDocument;
  kicker: ReactNode;
}) {
  return (
    <PageMain>
      <PageKicker>{kicker}</PageKicker>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{document.title}</h1>
      {document.summary ? (
        <p className="mt-6 text-xl leading-relaxed text-ink/80">{document.summary}</p>
      ) : null}
      {document.category ? (
        <p className="mt-4 text-sm text-muted">{CATEGORY_LABELS[document.category]}</p>
      ) : null}
      {document.video ? (
        <div className="mt-10">
          <VideoEmbed url={document.video} />
        </div>
      ) : null}
      <div className="mt-12">
        <MarkdownBody content={document.body} />
      </div>
    </PageMain>
  );
}
