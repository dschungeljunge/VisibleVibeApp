import Link from "next/link";
import { PageMain, SketchBox } from "@/components/Page";

const entries = [
  {
    href: "/learn",
    title: "Learn",
    text: "Lerne die Grundlagen, die du brauchst, um eigene Lernapps zu entwickeln.",
  },
  {
    href: "/design",
    title: "Design",
    text: "Entwickle aus einer Herausforderung oder einer bestehenden Idee eine konkrete Lernapp.",
  },
  {
    href: "/connect",
    title: "Connect",
    text: "Werde Teil der VisibleVibe Community, tausche Erfahrungen aus und lass dich inspirieren.",
  },
];

export default function HomePage() {
  return (
    <PageMain wide>
      <p className="text-sm text-muted">VisibleVibe</p>
      <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
        Lehrpersonen entwickeln Lernapps.
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/80">
        Eine Lern- und Entwicklungsumgebung für Pädagogik, Technologie und Gestaltung – nicht
        fürs Programmieren um des Programmierens willen.
      </p>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {entries.map((entry) => (
          <Link key={entry.href} href={entry.href} className="group">
            <SketchBox className="vv-lift-group flex h-full flex-col p-8">
              <h2 className="text-2xl font-semibold">{entry.title}</h2>
              <p className="mt-4 leading-relaxed">{entry.text}</p>
            </SketchBox>
          </Link>
        ))}
      </div>
    </PageMain>
  );
}
