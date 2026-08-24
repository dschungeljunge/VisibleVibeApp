import type { Metadata } from "next";
import Link from "next/link";
import { PageKicker, PageMain, SketchBox } from "@/components/Page";
import { getVisibleDocuments } from "@/lib/content";

export const metadata: Metadata = {
  title: "Engineering",
};

export default function EngineeringPage() {
  const practices = getVisibleDocuments("engineering-practice");

  return (
    <PageMain wide>
      <PageKicker>Design · Engineering</PageKicker>
      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
        Best Practices für die Umsetzung
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/80">
        Für den Moment, in dem die App-Idee schon klar ist. Die Sammlung wächst mit neuen
        Markdown-Dateien.
      </p>
      <div className="mt-14 grid gap-5">
        {practices.map((practice) => (
          <Link key={practice.slug} href={`/design/engineering/${practice.slug}`} className="group">
            <SketchBox className="vv-lift-group p-6 sm:p-8">
              <h2 className="text-xl font-semibold">{practice.title}</h2>
              {practice.summary ? (
                <p className="mt-3 leading-relaxed">{practice.summary}</p>
              ) : null}
            </SketchBox>
          </Link>
        ))}
      </div>
    </PageMain>
  );
}
