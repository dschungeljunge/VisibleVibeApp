import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { MethodIntro } from "@/components/MethodIntro";
import { getMethodIntro, getMethodPhases } from "@/lib/content";

export const metadata: Metadata = {
  title: "VisibleVibe-Methode",
};

export default function VisibleVibeMethodPage() {
  const steps = getMethodPhases();
  const intro = getMethodIntro();
  const first = steps.find((step) => step.status === "published") ?? steps[0];

  if (!first) {
    redirect("/design");
  }

  if (!intro) {
    redirect(`/design/visiblevibe/${first.slug}`);
  }

  return <MethodIntro intro={intro} steps={steps} firstSlug={first.slug} />;
}
