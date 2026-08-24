import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentArticle } from "@/components/ContentArticle";
import { getLearnDocument, getVisibleDocuments } from "@/lib/content";

type Params = { slug: string };

export function generateStaticParams() {
  return getVisibleDocuments()
    .filter((doc) => doc.type === "learn-topic" || doc.type === "learn-project")
    .map((doc) => ({ slug: doc.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const document = getLearnDocument(params.slug);
  return { title: document?.title ?? "Learn" };
}

export default function LearnTopicPage({ params }: { params: Params }) {
  const document = getLearnDocument(params.slug);
  if (!document) notFound();

  return (
    <ContentArticle
      document={document}
      kicker={document.type === "learn-project" ? "Learn · Projekt" : "Learn"}
    />
  );
}
