import type { Metadata } from "next";
import { PageKicker, PageMain } from "@/components/Page";
import Link from "next/link";
import { LearnArticleArtwork } from "@/components/LearnArticleArtwork";
import { getPublishedDocuments } from "@/lib/content";

export const metadata: Metadata = {
  title: "Learn · Ideen und Impulse",
  description: "Lesestoff für eigene Lernwerkzeuge: Unterrichtsideen schärfen, passende Tools finden und Neues ausprobieren.",
};

export default function LearnPage() {
  const articles = getPublishedDocuments("learn-topic");

  return (
    <PageMain wide>
      <header className="max-w-3xl">
        <PageKicker>Learn · Der VisibleVibe-Blog</PageKicker>
        <h1 className="text-4xl leading-tight tracking-tight sm:text-5xl sm:leading-tight">
          Lesestoff für deine nächste Idee.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/75">
          Wie wird aus einer Unterrichtsidee ein gutes Lernwerkzeug? Hier findest du
          Anregungen, praktische Hilfen und neue Perspektiven. Such dir einen Beitrag
          aus, der dich gerade neugierig macht.
        </p>
      </header>
      <section aria-labelledby="articles-heading" className="mt-14 sm:mt-16">
        <div className="mb-7 flex items-baseline justify-between gap-4 border-b border-ink/15 pb-4">
          <h2 id="articles-heading" className="text-xl font-semibold">Zum Stöbern und Weiterdenken</h2>
          <span className="shrink-0 text-sm text-ink/60">{articles.length} Beiträge</span>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {articles.map((article) => {
            const words = article.body.replace(/\([^)]*\)/g, "").split(/\s+/).filter(Boolean).length;
            const minutes = Math.max(1, Math.ceil(words / 200));
            return (
              <article key={article.slug} className="min-w-0">
                <Link href={`/learn/${article.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/15 bg-white transition duration-200 hover:-translate-y-1 hover:border-ink/35 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink motion-reduce:transform-none">
                  <LearnArticleArtwork slug={article.slug} />
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <p className="text-sm text-ink/60">
                      {article.format === "lab" ? "Zum Lesen und Ausprobieren" : "Artikel"}
                      <span aria-hidden="true" className="mx-2">·</span>
                      ca. {minutes} Min. Lesezeit
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold leading-snug tracking-tight decoration-fhnw decoration-4 underline-offset-4 group-hover:underline">{article.title}</h3>
                    <p className="mt-4 text-base leading-relaxed text-ink/75">{article.summary}</p>
                    <span className="mt-7 flex items-center gap-2 pt-2 text-sm font-semibold">
                      Beitrag lesen <span aria-hidden="true" className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none">↗</span>
                    </span>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
        {articles.length === 0 ? <p className="py-8 text-ink/70">Hier erscheinen bald die ersten Beiträge.</p> : null}
      </section>
      <p className="mt-12 max-w-xl font-hand text-lg leading-relaxed text-ink/65">Eine gute Idee beginnt oft mit einer guten Frage.</p>
    </PageMain>
  );
}
