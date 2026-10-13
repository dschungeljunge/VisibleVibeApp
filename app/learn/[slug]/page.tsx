import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentArticle } from "@/components/ContentArticle";
import { LearnLab } from "@/components/learn-labs/LearnLab";
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

  const kicker = <Link href="/learn" className="underline-offset-4 hover:underline">← Alle Beiträge</Link>;

  if (document.format === "lab") {
    return <LearnLab document={document} kicker={kicker} />;
  }

  return <ContentArticle document={document} kicker={kicker} />;
}
