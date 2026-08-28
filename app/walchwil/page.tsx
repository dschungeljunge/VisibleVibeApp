import type { Metadata } from "next";
import { WalchwilProgramView } from "@/components/WalchwilProgram";
import { getWalchwilProgram } from "@/lib/walchwil";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Schule Walchwil",
  robots: { index: false, follow: false },
};

export default function WalchwilPage() {
  const program = getWalchwilProgram();
  return <WalchwilProgramView program={program} />;
}
