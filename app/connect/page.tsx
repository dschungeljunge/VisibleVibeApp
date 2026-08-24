import type { Metadata } from "next";
import { MarkdownBody } from "@/components/MarkdownBody";
import { PageKicker, PageMain } from "@/components/Page";
import { getConnectPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Connect",
};

export default function ConnectPage() {
  const page = getConnectPage();

  return (
    <PageMain>
      <PageKicker>Connect</PageKicker>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        {page?.title ?? "VisibleVibe Community"}
      </h1>
      {page?.summary ? (
        <p className="mt-6 text-xl leading-relaxed text-ink/80">{page.summary}</p>
      ) : null}
      {page?.body ? (
        <div className="mt-10">
          <MarkdownBody content={page.body} />
        </div>
      ) : (
        <p className="mt-10 leading-relaxed">Die Community-Inhalte folgen in Kürze.</p>
      )}
    </PageMain>
  );
}
