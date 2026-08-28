import type { Metadata } from "next";
import Link from "next/link";
import { PageKicker, PageMain } from "@/components/Page";

export const metadata: Metadata = {
  title: "Impressum",
};

export default function ImpressumPage() {
  return (
    <PageMain>
      <PageKicker>Rechtliches</PageKicker>
      <h1 className="text-4xl font-semibold tracking-tight">Impressum</h1>
      <p className="mt-6 text-lg leading-relaxed text-ink/80">
        VisibleVibe ist ein Projekt der Beratungsstelle imedias an der Pädagogischen Hochschule
        der Fachhochschule Nordwestschweiz FHNW.
      </p>

      <div className="mt-12 space-y-10 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold">Anbieterin</h2>
          <address className="mt-3 not-italic">
            Fachhochschule Nordwestschweiz FHNW
            <br />
            Pädagogische Hochschule
            <br />
            Institut Weiterbildung und Beratung
            <br />
            Beratungsstelle Digitale Medien in Schule und Unterricht – imedias
            <br />
            Bahnhofstrasse 6
            <br />
            5210 Windisch
          </address>
          <p className="mt-3">
            T{" "}
            <a className="underline underline-offset-2" href="tel:+41562027220">
              +41 56 202 72 20
            </a>
            <br />
            E-Mail{" "}
            <a className="underline underline-offset-2" href="mailto:imedias.iwb.ph@fhnw.ch">
              imedias.iwb.ph@fhnw.ch
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Kontakt zu VisibleVibe</h2>
          <p className="mt-3">
            Peter Rigert
            <br />
            E-Mail{" "}
            <a className="underline underline-offset-2" href="mailto:peter.rigert@fhnw.ch">
              peter.rigert@fhnw.ch
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Haftung für Inhalte und Links</h2>
          <p className="mt-3">
            Wir bemühen uns um richtige und aktuelle Angaben. Für Schäden aus der Nutzung oder
            Nichtnutzung der angebotenen Informationen, durch Missbrauch der Verbindungen oder
            durch technische Störungen übernimmt die FHNW keine Haftung.
          </p>
          <p className="mt-3">
            Externe Links (zum Beispiel zum Blog von imedias, zu Discord oder zu Videoplattformen)
            führen auf Angebote Dritter. Für deren Inhalte sind die jeweiligen Betreiber
            verantwortlich.
          </p>
        </section>

        <p>
          Weitere Angaben zur FHNW findest du im{" "}
          <a
            className="underline underline-offset-2"
            href="https://www.fhnw.ch/de/impressum"
            target="_blank"
            rel="noopener noreferrer"
          >
            Impressum der FHNW
          </a>
          . Hinweise zur Datenbearbeitung stehen unter{" "}
          <Link href="/datenschutz" className="underline underline-offset-2">
            Datenschutz
          </Link>
          .
        </p>
      </div>
    </PageMain>
  );
}
