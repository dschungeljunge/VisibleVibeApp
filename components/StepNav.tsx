import Link from "next/link";
import type { ContentDocument } from "@/lib/types";

export function StepNav({
  steps,
  currentSlug,
}: {
  steps: ContentDocument[];
  currentSlug: string;
}) {
  const index = steps.findIndex((step) => step.slug === currentSlug);
  const previous = index > 0 ? steps[index - 1] : null;
  const next = index >= 0 && index < steps.length - 1 ? steps[index + 1] : null;

  return (
    <div className="mt-8 space-y-4">
      <ol className="space-y-1 text-sm">
        {steps.map((step, stepIndex) => {
          const current = step.slug === currentSlug;
          return (
            <li key={step.slug}>
              <Link
                href={`/design/visiblevibe/${step.slug}`}
                className={`block rounded-md px-2 py-1 ${
                  current ? "bg-fhnw font-medium" : "hover:bg-fhnw-soft"
                }`}
              >
                {stepIndex + 1} {step.title}
                {step.status === "coming-soon" ? (
                  <span className="ml-1 text-muted">· bald</span>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ol>
      <div className="flex justify-between gap-3 text-sm">
        {previous ? (
          <Link href={`/design/visiblevibe/${previous.slug}`} className="underline underline-offset-2">
            ← {previous.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/design/visiblevibe/${next.slug}`} className="underline underline-offset-2">
            {next.title} →
          </Link>
        ) : null}
      </div>
    </div>
  );
}
