import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-ink/20 px-6 py-8 text-sm text-muted">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
        <p>Ein Projekt von imedias – Beratungsstelle der FHNW.</p>
        <nav className="flex gap-4">
          <Link href="/impressum" className="hover:text-ink">
            Impressum
          </Link>
          <Link href="/datenschutz" className="hover:text-ink">
            Datenschutz
          </Link>
        </nav>
      </div>
    </footer>
  );
}
