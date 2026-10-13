import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { MethodStepPanel } from "@/components/MethodStepPanel";
import { getDocument, getMethodPhases } from "@/lib/content";

type Params = { slug: string };

export function generateStaticParams() {
  return getMethodPhases().map((step) => ({ slug: step.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const step = getDocument("visiblevibe-step", params.slug);
  if (step?.kind === "intro") {
    return { title: "VisibleVibe-Methode" };
  }
  return { title: step ? `${step.title} · Methode` : "Methode" };
}

export default function MethodStepPage({ params }: { params: Params }) {
  const step = getDocument("visiblevibe-step", params.slug);
  if (!step) notFound();
  if (step.kind === "intro") redirect("/design/visiblevibe");

  const steps = getMethodPhases();

  return <MethodStepPanel step={step} steps={steps} />;
}
