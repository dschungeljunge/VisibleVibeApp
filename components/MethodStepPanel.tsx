import { MethodCoach } from "./MethodCoach";
import type { ContentDocument } from "@/lib/types";

export function MethodStepPanel({
  step,
  steps,
}: {
  step: ContentDocument;
  steps: ContentDocument[];
}) {
  return (
    <MethodCoach
      step={{
        slug: step.slug,
        title: step.title,
        heading: step.heading,
        goal: step.goal,
        summary: step.summary,
        body: step.body,
        status: step.status,
        video: step.video,
        tasks: step.tasks ?? [],
      }}
      steps={steps.map((item) => ({
        slug: item.slug,
        title: item.title,
        status: item.status,
      }))}
    />
  );
}
