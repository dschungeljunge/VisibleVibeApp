import type { Metadata } from "next";
import Link from "next/link";
import { PageKicker, PageMain, SketchBox } from "@/components/Page";

export const metadata: Metadata = {
  title: "Design",
};

export default function DesignPage() {
  return (
    <PageMain wide>
      <PageKicker>Design</PageKicker>
      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
        Von der Herausforderung zur Lernapp
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/80">
        Zwei Einstiege, derselbe Anspruch: pädagogisch sinnvoll bauen, nicht Tool-first.
      </p>

      <div className="mt-16 grid gap-6 lg:grid-cols-2">
        <Link href="/design/visiblevibe" className="group">
          <SketchBox className="vv-lift-group flex h-full flex-col p-8 sm:p-10">
            <h2 className="text-2xl font-semibold">VisibleVibe-Methode</h2>
            <p className="mt-4 leading-relaxed">
              Du lässt dich auf einen Unterrichtsentwicklungsprozess ein, der nicht mit einer
              fertigen Lösung, sondern mit den Herausforderungen deiner Schüler:innen beginnt.
            </p>
          </SketchBox>
        </Link>
        <Link href="/design/engineering" className="group">
          <SketchBox className="vv-lift-group flex h-full flex-col p-8 sm:p-10">
            <h2 className="text-2xl font-semibold">Engineering</h2>
            <p className="mt-4 leading-relaxed">
              Du hast bereits eine klare Vorstellung davon, was deine App können soll, und
              möchtest sie systematisch umsetzen.
            </p>
          </SketchBox>
        </Link>
      </div>
    </PageMain>
  );
}
