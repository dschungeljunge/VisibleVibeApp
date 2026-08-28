import type { Metadata } from "next";
import Image from "next/image";
import { MarkdownBody } from "@/components/MarkdownBody";
import { PageKicker, PageMain, SketchBox } from "@/components/Page";
import { getConnectPage } from "@/lib/content";

const BLOG_URL =
  "https://www.fhnw.ch/plattformen/imedias/2026/08/25/community-aufbau-im-zentrum/";
const DISCORD_URL = "https://discord.gg/SvW7Zd4TV";
const IMEDIAS_URL = "https://imedias.ch/visiblevibe/";

const linkClassName =
  "inline-block rounded-md border-2 border-ink bg-white px-4 py-2 font-medium hover:bg-fhnw-soft";
const primaryLinkClassName =
  "inline-block rounded-md border-2 border-ink bg-fhnw px-4 py-2 font-medium";

export const metadata: Metadata = {
  title: "Connect",
  description:
    "VisibleVibe als Entdeckungsreise: Community of Practice und begleitete Unterrichtsentwicklung mit Schulen.",
};

export default function ConnectPage() {
  const page = getConnectPage();

  return (
    <PageMain wide>
      <div className="max-w-3xl">
        <PageKicker>Connect</PageKicker>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {page?.title ?? "VisibleVibe Community"}
        </h1>
        {page?.summary ? (
          <p className="mt-6 text-xl leading-relaxed text-ink/80">{page.summary}</p>
        ) : null}
      </div>

      <Image
        src="/images/community-modell.png"
        alt="Modell der VisibleVibe Community: Verständnis, Praktiken, Werkzeuge und Haltungen, verbunden um das Zentrum «Lernen gestalten. Ideen bauen.»"
        width={1672}
        height={941}
        className="mt-10 w-full"
      />

      {page?.body ? (
        <div className="mt-10 max-w-3xl">
          <MarkdownBody content={page.body} />
        </div>
      ) : null}

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <SketchBox className="flex h-full flex-col p-8 sm:p-10">
          <h2 className="text-2xl font-semibold">Eine Community of Practice</h2>
          <p className="mt-4 flex-1 leading-relaxed">
            In der VisibleVibe-Community teilen Lehrpersonen ihre Projekte, Werkzeuge, Umwege
            und Erkenntnisse. Im Blog beschreiben wir, wie wir diese Community bewusst als
            lernende Gemeinschaft aufbauen.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={DISCORD_URL}
              className={primaryLinkClassName}
              target="_blank"
              rel="noopener noreferrer"
            >
              Discord beitreten
            </a>
            <a
              href={BLOG_URL}
              className={linkClassName}
              target="_blank"
              rel="noopener noreferrer"
            >
              Blogbeitrag lesen
            </a>
          </div>
        </SketchBox>

        <SketchBox className="flex h-full flex-col p-8 sm:p-10">
          <h2 className="text-2xl font-semibold">Begleitete Unterrichtsentwicklung</h2>
          <p className="mt-4 flex-1 leading-relaxed">
            Gemeinsam mit Kollegien bearbeiten wir Herausforderungen aus dem Unterricht und
            entwickeln daraus testbare Lernanwendungen. Am Ende steht ein konkreter Prototyp,
            der im eigenen Unterricht erprobt und weiterentwickelt werden kann.
          </p>
          <div className="mt-8">
            <a
              href={IMEDIAS_URL}
              className={primaryLinkClassName}
              target="_blank"
              rel="noopener noreferrer"
            >
              VisibleVibe für Schulen
            </a>
          </div>
        </SketchBox>
      </div>

      <p className="mt-12 max-w-3xl text-lg leading-relaxed text-ink/80">
        Wer diese Entdeckungsreise mitverfolgen, kritisch begleiten oder selbst mitmachen
        möchte, ist herzlich eingeladen.
      </p>
    </PageMain>
  );
}
