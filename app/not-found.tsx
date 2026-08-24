import Link from "next/link";
import { PageMain } from "@/components/Page";

export default function NotFound() {
  return (
    <PageMain>
      <h1 className="text-4xl font-semibold">Seite nicht gefunden</h1>
      <p className="mt-4 leading-relaxed">Dieser Inhalt ist noch nicht vorhanden oder noch ein Entwurf.</p>
      <p className="mt-8">
        <Link href="/" className="underline underline-offset-2">
          Zur Startseite
        </Link>
      </p>
    </PageMain>
  );
}
