import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MethodStepPanel } from "@/components/MethodStepPanel";
import { getDocument, getVisibleDocuments } from "@/lib/content";

type Params = { slug: string };

export function generateStaticParams() {
  return getVisibleDocuments("visiblevibe-step").map((step) => ({ slug: step.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const step = getDocument("visiblevibe-step", params.slug);
  return { title: step ? `${step.title} · Methode` : "Methode" };
}

export default function MethodStepPage({ params }: { params: Params }) {
  const steps = getVisibleDocuments("visiblevibe-step");
  const step = getDocument("visiblevibe-step", params.slug);
  if (!step) notFound();

  return <MethodStepPanel step={step} steps={steps} />;
}
