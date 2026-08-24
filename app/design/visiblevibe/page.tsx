import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { MethodStepPanel } from "@/components/MethodStepPanel";
import { getVisibleDocuments } from "@/lib/content";

export const metadata: Metadata = {
  title: "VisibleVibe-Methode",
};

export default function VisibleVibeMethodPage() {
  const steps = getVisibleDocuments("visiblevibe-step");
  const first = steps.find((step) => step.status === "published") ?? steps[0];

  if (!first) {
    redirect("/design");
  }

  return <MethodStepPanel step={first} steps={steps} />;
}
