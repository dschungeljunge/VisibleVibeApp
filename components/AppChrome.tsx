"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function AppChrome({
  children,
  userEmail,
}: {
  children: ReactNode;
  userEmail?: string | null;
}) {
  const pathname = usePathname();
  const methodWorkspace =
    pathname.startsWith("/design/visiblevibe") || pathname.startsWith("/projects/");

  return (
    <div className="flex min-h-screen flex-col">
      <Header userEmail={userEmail} />
      <div className="flex-1">{children}</div>
      {methodWorkspace ? null : <Footer />}
    </div>
  );
}
