import type { Metadata } from "next";
import { PageKicker, PageMain } from "@/components/Page";
import { SkillTree } from "@/components/SkillTree";
import { getVisibleDocuments } from "@/lib/content";
import { buildProjectSkillMap } from "@/lib/skilltree";

export const metadata: Metadata = {
  title: "Learn",
};

export default function LearnPage() {
  const topics = getVisibleDocuments("learn-topic");
  const projects = getVisibleDocuments("learn-project");
  const map = buildProjectSkillMap(topics, projects);

  return (
    <PageMain wide>
      <PageKicker>Learn</PageKicker>
      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
        Kompetenzen für eigene Lernapps
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/80">
        Die Themen sind den Projekten zugeordnet, für die sie erstmals gebraucht werden.
        Spätere Projekte bauen auf den früheren auf. Öffne die Themen, die du noch nicht
        kennst oder die dich interessieren — es gibt keinen vorgeschriebenen Weg.
      </p>
      <div className="mt-16">
        <SkillTree map={map} />
      </div>
    </PageMain>
  );
}
