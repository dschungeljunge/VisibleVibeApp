import Link from "next/link";
import { MarkdownBody } from "@/components/MarkdownBody";
import { PageKicker, PageMain, SketchBox } from "@/components/Page";
import { ImpulseVideos } from "@/components/VideoEmbed";
import { WalchwilPoll } from "@/components/WalchwilPoll";
import { WalchwilQuestions } from "@/components/WalchwilQuestions";
import {
  getWalchwilPhase,
  playableVideos,
  type WalchwilPhase,
  type WalchwilProgram,
  type WalchwilSession,
} from "@/lib/walchwil";

const doors = [
  {
    href: "/design/visiblevibe",
    title: "VisibleVibe-Methode",
    text: "Vom Haken im Unterricht zur Idee für eine Lernapp.",
  },
  {
    href: "/learn",
    title: "Learn",
    text: "Themen nachschlagen, wenn ihr sie beim Bauen braucht.",
  },
  {
    href: "/projects",
    title: "Projekte",
    text: "Geführte Übungsprojekte mit eigenem Board.",
  },
];

function isCurrent(session: WalchwilSession, phase: WalchwilPhase | null) {
  return phase?.kind === "session" && phase.session.slug === session.slug;
}

function SessionHeader({
  session,
  index,
  current,
}: {
  session: WalchwilSession;
  index: number;
  current: boolean;
}) {
  return (
    <>
      <p className="flex flex-wrap items-baseline gap-2 font-hand text-base text-ink/70">
        <span>{index + 1}</span>
        {current ? <span className="rounded-md bg-fhnw px-2 py-0.5 text-ink">jetzt</span> : null}
      </p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight">{session.title}</h2>
      <p className="mt-2 text-sm text-ink/70">{session.when}</p>
      {session.format ? <p className="mt-1 text-sm text-ink/70">{session.format}</p> : null}
      {session.goal ? (
        <p className="mt-4 leading-relaxed">{session.goal}</p>
      ) : session.summary ? (
        <p className="mt-4 leading-relaxed">{session.summary}</p>
      ) : null}
    </>
  );
}

function QuestionsSessionCard({
  session,
  index,
  participants,
}: {
  session: WalchwilSession;
  index: number;
  participants: string[];
}) {
  return (
    <SketchBox className="bg-white p-8 sm:p-10">
      <SessionHeader session={session} index={index} current={false} />
      {session.kind === "online" ? (
        <p className="mt-4 text-sm text-muted">Impulse folgen als Video</p>
      ) : null}
      <WalchwilQuestions sessionSlug={session.slug} participants={participants} />
    </SketchBox>
  );
}

function CompactSessionCard({
  session,
  index,
}: {
  session: WalchwilSession;
  index: number;
}) {
  return (
    <SketchBox className="bg-white p-8">
      <SessionHeader session={session} index={index} current={false} />
      {playableVideos(session).length > 0 ? (
        <p className="mt-4 text-sm text-muted">Impulse liegen bereit.</p>
      ) : session.kind === "online" ? (
        <p className="mt-4 text-sm text-muted">Impulse folgen als Video</p>
      ) : null}
    </SketchBox>
  );
}

function ExpandedSessionCard({
  session,
  index,
  participants,
}: {
  session: WalchwilSession;
  index: number;
  participants: string[];
}) {
  const showMedia = session.kind === "online" || session.kind === "prep";

  return (
    <SketchBox className="bg-white p-8 sm:p-10">
      <SessionHeader session={session} index={index} current />

      {showMedia ? (
        <section className="mt-10 border-t border-ink/20 pt-8">
          <h3 className="text-xl font-semibold tracking-tight">
            {session.kind === "online" ? "Impulse" : "Video"}
          </h3>
          <p className="mt-3 leading-relaxed text-ink/80">
            {session.kind === "online"
              ? "Kurze Videos, mindestens eine Woche vor dem Live-Termin. Den Referatsteil schaut ihr vorher — am Donnerstag ab 17.30 Uhr geht es um eure Apps."
              : "Kurzes Video zu dieser Seite und zum Weiterarbeiten. Wenn Fragen auftauchen, klären wir sie gemeinsam — auch mit Vorzeigen direkt hier."}
          </p>
          <ImpulseVideos videos={session.videos} embedded />
        </section>
      ) : null}

      {session.dates.length > 0 ? (
        <WalchwilPoll
          pollId={`walchwil-${session.slug}`}
          participants={participants}
          dates={session.dates}
          embedded
        />
      ) : null}

      {session.questions ? (
        <WalchwilQuestions sessionSlug={session.slug} participants={participants} />
      ) : null}

      {session.body ? (
        <div className="mt-10 border-t border-ink/20 pt-8">
          <MarkdownBody content={session.body} />
        </div>
      ) : null}
    </SketchBox>
  );
}

export function WalchwilProgramView({
  program,
  now,
}: {
  program: WalchwilProgram;
  now?: Date;
}) {
  const phase = getWalchwilPhase(program.sessions, now);

  return (
    <PageMain wide>
      <PageKicker>{program.kicker}</PageKicker>
      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
        {program.title}
      </h1>
      {program.summary ? (
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/80">{program.summary}</p>
      ) : null}

      {program.body ? (
        <div className="mt-10 max-w-2xl">
          <MarkdownBody content={program.body} />
        </div>
      ) : null}

      <h2 className="mt-20 text-2xl font-semibold tracking-tight">Programm</h2>
      <ol className="mt-8 flex list-none flex-col p-0">
        {program.sessions.map((session, index) => {
          const current = isCurrent(session, phase);
          return (
            <li key={session.slug} id={session.slug} className="flex scroll-mt-8 flex-col">
              {current ? (
                <ExpandedSessionCard
                  session={session}
                  index={index}
                  participants={program.participants}
                />
              ) : session.questions ? (
                <QuestionsSessionCard
                  session={session}
                  index={index}
                  participants={program.participants}
                />
              ) : (
                <CompactSessionCard session={session} index={index} />
              )}
              {index < program.sessions.length - 1 ? (
                <div className="flex flex-col items-center py-2">
                  <div className="h-6 w-0.5 bg-ink" aria-hidden />
                  {session.after ? (
                    <>
                      <p
                        className={`max-w-md py-3 text-center text-sm leading-relaxed ${
                          phase?.kind === "after" && phase.session.slug === session.slug
                            ? "bg-fhnw px-4"
                            : "text-muted"
                        }`}
                      >
                        {session.after}
                      </p>
                      <div className="h-6 w-0.5 bg-ink" aria-hidden />
                    </>
                  ) : (
                    <div className="h-4 w-0.5 bg-ink" aria-hidden />
                  )}
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>

      {program.participants.length > 0 ? (
        <section className="mt-20 max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight">Wer dabei ist</h2>
          <p className="mt-4 leading-relaxed text-ink/80">
            {program.participants.slice(0, -1).join(", ")}
            {program.participants.length > 1 ? " und " : ""}
            {program.participants.at(-1)}
            {" — acht Lehrpersonen der Schule Walchwil."}
          </p>
        </section>
      ) : null}

      <section className="mt-20">
        <h2 className="text-2xl font-semibold tracking-tight">Weiterarbeiten auf VisibleVibe</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {doors.map((door) => (
            <Link key={door.href} href={door.href} className="group">
              <SketchBox className="vv-lift-group flex h-full flex-col p-8">
                <h3 className="text-xl font-semibold">{door.title}</h3>
                <p className="mt-3 leading-relaxed">{door.text}</p>
              </SketchBox>
            </Link>
          ))}
        </div>
      </section>
    </PageMain>
  );
}
