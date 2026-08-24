"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "./LogoutButton";

const links = [
  { href: "/learn", label: "Learn" },
  { href: "/design", label: "Design" },
  { href: "/projects", label: "Projekte" },
  { href: "/connect", label: "Connect" },
];

export function Header({ userEmail }: { userEmail?: string | null }) {
  const pathname = usePathname();
  const compact =
    pathname.startsWith("/design/visiblevibe") || pathname.startsWith("/projects/");

  return (
    <header className={`border-b border-ink/20 bg-white ${compact ? "px-4 py-3" : "px-6 py-5"}`}>
      <div className="mx-auto flex max-w-6xl items-baseline justify-between gap-6">
        <Link href="/" className="font-hand text-xl">
          VisibleVibe
        </Link>
        <nav className="flex items-center gap-1 text-base sm:gap-2">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-2 py-1 sm:px-3 ${
                  active ? "bg-fhnw font-medium" : "hover:bg-fhnw-soft"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          {userEmail ? (
            <>
              <Link
                href="/dashboard"
                className={`rounded-md px-2 py-1 sm:px-3 ${
                  pathname.startsWith("/dashboard") ? "bg-fhnw font-medium" : "hover:bg-fhnw-soft"
                }`}
              >
                Meine Boards
              </Link>
              <Link
                href="/account"
                className={`rounded-md px-2 py-1 sm:px-3 ${
                  pathname.startsWith("/account") ? "bg-fhnw font-medium" : "hover:bg-fhnw-soft"
                }`}
              >
                Konto
              </Link>
              <LogoutButton />
            </>
          ) : (
            <Link
              href="/login"
              className={`rounded-md px-2 py-1 sm:px-3 ${
                pathname === "/login" ? "bg-fhnw font-medium" : "hover:bg-fhnw-soft"
              }`}
            >
              Anmelden
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
