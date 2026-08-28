import type { Metadata } from "next";
import Link from "next/link";
import { PageKicker, PageMain } from "@/components/Page";

export const metadata: Metadata = {
  title: "Datenschutz",
};

export default function DatenschutzPage() {
  return (
    <PageMain>
      <PageKicker>Rechtliches</PageKicker>
      <h1 className="text-4xl font-semibold tracking-tight">Datenschutz</h1>
      <p className="mt-6 text-lg leading-relaxed text-ink/80">
        VisibleVibe speichert nur, was für die Nutzung der Plattform nötig ist. Es gibt keine
        Werbe- oder Analyse-Cookies.
      </p>

      <div className="mt-12 space-y-10 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold">Verantwortliche Stelle</h2>
          <p className="mt-3">
            Fachhochschule Nordwestschweiz FHNW, Pädagogische Hochschule, Institut Weiterbildung
            und Beratung, Beratungsstelle imedias, Bahnhofstrasse 6, 5210 Windisch.
          </p>
          <p className="mt-3">
            Fragen zu VisibleVibe:{" "}
            <a className="underline underline-offset-2" href="mailto:peter.rigert@fhnw.ch">
              peter.rigert@fhnw.ch
            </a>
            . Allgemeine Anfragen:{" "}
            <a className="underline underline-offset-2" href="mailto:imedias.iwb.ph@fhnw.ch">
              imedias.iwb.ph@fhnw.ch
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Welche Daten wir bearbeiten</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <strong>Konto:</strong> E-Mail-Adresse und Passwort (verschlüsselt), wenn du ein
              Konto erstellst. Damit speichern wir deine Boards geräteübergreifend.
            </li>
            <li>
              <strong>Boards:</strong> Skizzen, Texte und Versionen der VisibleVibe-Methode und
              der Projekte. Ohne Anmeldung bleiben sie nur lokal im Browser.
            </li>
            <li>
              <strong>Sitzung:</strong> Technische Cookies, damit du angemeldet bleibst. Sie sind
              für den Betrieb nötig.
            </li>
            <li>
              <strong>Weiterbildungsangebote:</strong> Auf Programm-Seiten (zum Beispiel
              Walchwil) können Name, Terminangaben und Fragen gespeichert werden. Diese Angaben
              sind für andere Teilnehmende derselben Seite sichtbar.
            </li>
            <li>
              <strong>KI-Coach:</strong> Wenn du die Anpassung einer Methodenanleitung nutzt,
              gehen ausgewählte Notizen vom Board an OpenAI, damit der Hinweis zu deinem Stand
              passt. Schreibe dort keine Namen oder Daten von Schüler:innen.
            </li>
            <li>
              <strong>Technischer Betrieb:</strong> Beim Aufruf können Zugriffsdaten wie
              IP-Adresse, Zeitpunkt und aufgerufene Seite in Serverprotokollen anfallen.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Auftragsbearbeiter und Dienste</h2>
          <p className="mt-3">
            Anmeldung, Boards und zugehörige Daten liegen bei{" "}
            <a
              className="underline underline-offset-2"
              href="https://supabase.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Supabase
            </a>
            . Die KI-Anpassung nutzt{" "}
            <a
              className="underline underline-offset-2"
              href="https://openai.com/policies/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              OpenAI
            </a>
            . Dabei kann eine Bearbeitung ausserhalb der Schweiz stattfinden.
          </p>
          <p className="mt-3">
            Einzelne Lerninhalte können Videos von Loom, YouTube oder Vimeo einbinden. Beim
            Abspielen gelten die Datenschutzhinweise dieser Anbieter. Links zur Discord-Community
            oder zum Blog von imedias führen auf deren Angebote.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Deine Rechte</h2>
          <p className="mt-3">
            Du kannst Auskunft, Berichtigung oder Löschung verlangen. Unter{" "}
            <Link href="/account" className="underline underline-offset-2">
              Mein Bereich
            </Link>{" "}
            kannst du deine Boards als Datei herunterladen und dein Konto samt Boards löschen.
            Ohne Anmeldung löschst du lokale Daten über die Speicherfunktion deines Browsers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Allgemeine Hinweise der FHNW</h2>
          <p className="mt-3">
            Ergänzend gilt die{" "}
            <a
              className="underline underline-offset-2"
              href="https://www.fhnw.ch/de/impressum/datenschutz"
              target="_blank"
              rel="noopener noreferrer"
            >
              Datenschutzerklärung der FHNW
            </a>
            . Angaben zur Anbieterin stehen im{" "}
            <Link href="/impressum" className="underline underline-offset-2">
              Impressum
            </Link>
            .
          </p>
          <p className="mt-3 text-sm text-muted">Stand: August 2026</p>
        </section>
      </div>
    </PageMain>
  );
}
