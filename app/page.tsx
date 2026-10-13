import Image from "next/image";
import Link from "next/link";
import { PageMain, SketchBox } from "@/components/Page";

const entries = [
  {
    href: "/learn",
    title: "Learn",
    text: "Entdecke Ideen, praktische Hilfen und neue Perspektiven für dein eigenes Lernwerkzeug.",
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
      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
        Lernen gestalten. Ideen bauen.
      </h1>
      <p className="mt-5 max-w-3xl text-xl text-ink/80 sm:text-2xl">
        Lehrpersonen entwickeln Lernapps.
      </p>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/80">
        Eine Lern- und Entwicklungsumgebung für Pädagogik, Technologie und Gestaltung.
      </p>

      <Image
        src="/images/arbeitstisch.png"
        alt="Illustration eines Arbeitstischs: mehrere Hände skizzieren Ideen, Abläufe und Oberflächen auf Papier, in der Mitte eine gelbe Notiz mit Glühbirne, rechts entsteht die Lernapp am Laptop."
        width={1024}
        height={400}
        priority
        className="mt-14 w-full"
      />

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
