import type { ReactNode } from "react";
import { MarkdownBody } from "@/components/MarkdownBody";
import { PageKicker, PageMain } from "@/components/Page";
import { CATEGORY_LABELS, type ContentDocument } from "@/lib/content";
import { DataZones } from "./DataZones";
import { ResponsibilityMap } from "./ResponsibilityMap";

function LabContent({ id }: { id?: string }) {
  if (id === "datenschutz") {
    return (
      <div className="space-y-24">
        <ResponsibilityMap />
        <DataZones />
      </div>
    );
  }
  return null;
}

export function LearnLab({
  document,
  kicker,
}: {
  document: ContentDocument;
  kicker: ReactNode;
}) {
  return (
    <PageMain wide>
      <PageKicker>{kicker}</PageKicker>
      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
        {document.title}
      </h1>
      {document.summary ? (
        <p className="mt-6 max-w-3xl text-xl leading-relaxed text-ink/80">{document.summary}</p>
      ) : null}
      {document.category ? (
        <p className="mt-4 text-sm text-muted">{CATEGORY_LABELS[document.category]}</p>
      ) : null}
      {document.body ? (
        <div className="mt-10 max-w-3xl">
          <MarkdownBody content={document.body} />
        </div>
      ) : null}
      <div className="mt-12">
        <LabContent id={document.lab} />
      </div>
    </PageMain>
  );
}
