"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header({ userEmail }: { userEmail?: string | null }) {
  const pathname = usePathname();
  const compact =
    pathname.startsWith("/design/visiblevibe") || pathname.startsWith("/projects/");
  const accountHref = userEmail ? "/account" : "/login";
  const accountLabel = userEmail ? "Mein Bereich" : "Anmelden";
  const accountActive = userEmail
    ? pathname.startsWith("/account") || pathname.startsWith("/dashboard")
    : pathname === "/login";

  return (
    <header className={`border-b border-ink/20 bg-white ${compact ? "px-4 py-3" : "px-6 py-5"}`}>
      <div className="mx-auto flex max-w-6xl items-baseline justify-between gap-6">
        <Link href="/" className="font-hand text-xl">
          VisibleVibe
        </Link>
        <nav className="flex items-center gap-1 text-base sm:gap-2">
          <Link
            href={accountHref}
            className={`rounded-md px-2 py-1 sm:px-3 ${
              accountActive ? "bg-fhnw font-medium" : "hover:bg-fhnw-soft"
            }`}
          >
            {accountLabel}
          </Link>
        </nav>
      </div>
    </header>
  );
}
