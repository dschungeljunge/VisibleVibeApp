import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getWalchwilProgram, getWalchwilSession } from "@/lib/walchwil";

type Params = { slug: string };

export function generateStaticParams() {
  return getWalchwilProgram().sessions.map((session) => ({ slug: session.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const session = getWalchwilSession(params.slug);
  return {
    title: session ? `${session.title} · Walchwil` : "Walchwil",
    robots: { index: false, follow: false },
  };
}

export default function WalchwilSessionPage({ params }: { params: Params }) {
  const session = getWalchwilSession(params.slug);
  if (!session) notFound();
  redirect(`/walchwil#${session.slug}`);
}
