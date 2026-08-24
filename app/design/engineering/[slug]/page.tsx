import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentArticle } from "@/components/ContentArticle";
import { getDocument, getVisibleDocuments } from "@/lib/content";

type Params = { slug: string };

export function generateStaticParams() {
  return getVisibleDocuments("engineering-practice").map((doc) => ({ slug: doc.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const document = getDocument("engineering-practice", params.slug);
  return { title: document?.title ?? "Engineering" };
}

export default function EngineeringPracticePage({ params }: { params: Params }) {
  const document = getDocument("engineering-practice", params.slug);
  if (!document) notFound();

  return <ContentArticle document={document} kicker="Design · Engineering" />;
}
