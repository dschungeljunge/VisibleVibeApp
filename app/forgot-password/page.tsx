import type { Metadata } from "next";
import Link from "next/link";
import { ForgotPasswordForm } from "@/components/ForgotPasswordForm";
import { PageKicker, PageMain } from "@/components/Page";

export const metadata: Metadata = {
  title: "Passwort zurücksetzen",
};

export default function ForgotPasswordPage() {
  return (
    <PageMain>
      <PageKicker>Mein Bereich</PageKicker>
      <h1 className="text-4xl font-semibold tracking-tight">Passwort zurücksetzen</h1>
      <p className="mb-8 mt-5 text-lg leading-relaxed text-ink/80">
        Wir senden dir einen zeitlich begrenzten Link zum Festlegen eines neuen Passworts.
      </p>
      <ForgotPasswordForm />
      <Link href="/login" className="mt-6 inline-block text-sm underline">
        Zurück zur Anmeldung
      </Link>
    </PageMain>
  );
}
