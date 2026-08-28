# Changelog v0.3

Lebendes Dokument. Neue Sessions werden unten als eigene Abschnitte ergänzt, ohne die früheren zu überschreiben.

---

## Session vom 28.08.2026 — Schule Walchwil

Begleiteter Unterrichtsprozess mit acht Lehrpersonen der Schule Walchwil, August 2026 bis Januar 2027. Ziel der Session: eine eigene, unaufällige Übersichtsseite, auf der Programm, Impulse, Termine und Fragen liegen.

### Ausgangslage

Notizen in `Workspace/Walchwil.md`: Kickoff am 13.08.2026, drei Online-Impulse (Oktober–Dezember), Präsentation am 05.01.2027. Acht Teilnehmende. Die Seite sollte nicht in der Hauptnavigation stehen und keine E-Mail-Adressen veröffentlichen.

Während der Session hat sich das Online-Format geändert: Die Lehrpersonen haben donnerstags ab 17 Uhr Zeit, die Begleitung erst ab 17.30 Uhr. Der Referatsteil wird deshalb asynchron (kurze Loom-Videos, mindestens eine Woche vorab); live bleibt Beratung und Support.

### 1. Onepager `/walchwil`

- Route `/walchwil`, nicht in der Hauptnavigation. `/Walchwil` und `/walchwil/<slug>` führen auf die Übersichtsseite (Anker `#organisation` usw.).
- `robots: noindex, nofollow`. Auf der Seite stehen nur Vornamen, keine Mailadressen.
- Fahrplan als Zeitstrahl: Kickoff → Organisation → drei Online-Impulse → Präsentation.
- Der **aktuelle Schritt ist ausgeklappt**, die übrigen bleiben kompakt. Gelb nur als kleine Markierung «jetzt», nicht als Flächenhintergrund. Nach einem Impuls können ausgeklappte Schritte später wieder eingeklappt werden.
- Die frühere gelbe «Gerade»-Box oberhalb des Programms wurde entfernt — der Stand ist am Zeitstrahl ablesbar.

### 2. Programmstand (Walchwil)

1. **Einführung in Vibe Coding** — 13. August 2026 (Kickoff).
2. **Organisation und Vorbereitung** — aktuell: Seite kennenlernen, Terminfindung, erstes Video.
3. **Idee und Plan** — Oktober, Impulse asynchron, Live donnerstags ab 17.30 Uhr; Fragen vorab.
4. **Let’s build** — November.
5. **Skalieren und teilen** — Dezember.
6. **Präsentation** — Dienstag, 5. Januar 2027, 16.15–16.45 Uhr.

Online-Termine: Impulse als Videos · Live donnerstags ab 17.30 Uhr.

### 3. Impulse asynchron und Loom

- Mindestens eine Woche vor dem Live-Termin liegen kurze Videos auf der jeweiligen Kachel (ein, zwei oder drei Perspektiven, oft mit Bildschirmaufnahme).
- Loom-Share- oder Embed-URL im Frontmatter unter `videos:` reicht. Die Seite wandelt sie in den Player um. Ein Loom-Link als eigener Markdown-Absatz wird ebenfalls eingebettet.
- Loom-Player nutzen das Verhältnis **8:5** (wie Looms eigenes Embed, `padding-bottom: 62.5%`), damit keine schwarzen Seitenränder entstehen. YouTube/Vimeo bleiben 16:9.
- Erstes Video sitzt in Organisation und Vorbereitung: [Loom `d36f4524cad64ffca532bc2bd982fa75`](https://www.loom.com/embed/d36f4524cad64ffca532bc2bd982fa75), Titel «Diese Seite und wie wir weiterarbeiten».

### 4. Terminfindung (Doodle-ähnlich)

Niederschwellig, ohne Login: Namen wählen, Donnerstage ankreuzen. Alle sehen die Einträge in Echtzeit.

Zur Auswahl (alle 17.30 Uhr):

- Oktober · Online 1: 15., 22., 29. Oktober
- November · Online 2: 5., 12., 19., 26. November
- Dezember · Online 3: 3., 10. Dezember

Nicht angeboten: 1. und 8. Oktober, 17. Dezember.

Termine lassen sich in `Content/walchwil/02-organisation.md` unter `dates:` ergänzen oder streichen.

### 5. Fragen vorab (Kachel 3 · Idee und Plan)

- Gemeinsames Fragenfeld auf der Programmkachel, für alle sichtbar.
- Namen wählen, Frage in einem Satz. Steht dasselbe schon da, wird sie nicht doppelt angelegt — «ich auch» hängt die Person an die bestehende Frage.
- Eigene Fragen können gelöscht werden. Vorher ein Dialog: die Frage ist danach für niemanden mehr sichtbar; bitte nur die eigene löschen, nicht die der anderen. «Löschen» erscheint nur bei der eigenen Frage.

### 6. Content

Ordner `Content/walchwil/`:

- `index.md` — Einleitung, Online-Rhythmus
- `01-sommer.md` … `05-praesentation.md` plus `02-organisation.md`
- `_README.md` — Loom-URLs, Termine, `questions: true`

`Workspace/Walchwil.md` an das neue Online-Format und den Organisationsschritt angepasst.

### 7. Code und Daten

- `lib/walchwil.ts` — Sessions, Phasen, Videos, Daten, `questions`.
- `components/WalchwilProgram.tsx` — Onepager, ausgeklappter aktueller Schritt.
- `components/WalchwilPoll.tsx` — Termin-Umfrage.
- `components/WalchwilQuestions.tsx` — Fragen vorab inkl. Löschen-Dialog.
- `components/VideoEmbed.tsx`, `lib/video.ts` — Loom-Einbettung, Aspektverhältnis 8:5.
- `lib/walchwil-participant.ts` — gemeinsamer Name in `localStorage`.
- `middleware.ts` — Redirect `/Walchwil` → `/walchwil`.

Supabase-Projekt VisibleVibe:

- Tabelle `walchwil_poll_responses` (poll_id, participant, slots), RLS für anon/authenticated, Realtime.
- Tabelle `walchwil_questions` (session_slug, body, author, supporters). Gelöschte Fragen werden per leerem `body` ausgeblendet, nicht per DELETE-Policy.
- Migration: `supabase/migrations/20260828150900_walchwil_poll_responses.sql`, `20260828152800_walchwil_questions.sql`.

### 8. Verifikation (diese Session)

- `/walchwil` Status 200; Programm, ausgeklappte Organisation, Termine und Fragen-UI sichtbar.
- `/walchwil/organisation` leitet nach `/walchwil#organisation`.
- `/Walchwil` leitet nach `/walchwil`.
- Loom-Player ohne seitliche Balken geprüft (Screenshot nach der 8:5-Anpassung).
- Keine E-Mail-Adressen im gerenderten HTML. `noindex` gesetzt.

### Offene Punkte (Walchwil)

- Genaue Live-Donnerstage stehen erst nach der Umfrage fest; die Monatskacheln (Online 1–3) haben noch keine konkreten Daten.
- Impulse-Videos für Oktober, November und Dezember fehlen noch (`url:` in den Session-Dateien).
- Nach dem jeweiligen Impuls: Kachel wieder einklappen (Mechanismus noch nicht gebaut, Layout ist darauf vorbereitet).
- Fragen vorab nur auf Idee und Plan (`questions: true`); für Let’s build und Skalieren bei Bedarf ebenso setzen.
- Die Umfrage und die Fragen sind über den Seitenlink erreichbar (kein Login). Das ist Absicht (niedrige Schwelle), die URL sollte intern bleiben.

---

## Session vom 28.08.2026 — Startseite, Navigation, Connect, Rechtliches

Nach dem Walchwil-Onepager: die öffentliche Plattform schlanker machen. Der Header wirkte überladen, die Startseite und Connect sollten zur aktuellen Kommunikation (Leitsatz, LinkedIn-Beitrag, Blog, Discord) passen.

### 1. Startseite

- Überschrift: **«Lernen gestalten. Ideen bauen.»**
- Untertitel: **«Lehrpersonen entwickeln Lernapps.»**
- Der kleine Kicker «VisibleVibe» über der Überschrift ist entfernt.
- Der Satz «nicht fürs Programmieren um des Programmierens willen» ist gestrichen. Es bleibt: «Eine Lern- und Entwicklungsumgebung für Pädagogik, Technologie und Gestaltung.»
- Learn, Design und Connect bleiben die drei Einstiegskarten.

### 2. Header und «Mein Bereich»

- Navigation nur noch: Wortmarke VisibleVibe (zur Startseite) und **Anmelden** bzw. **Mein Bereich**.
- Entfernt: Learn, Design, Projekte, Connect, Meine Boards, Abmelden, die frühere Bezeichnung «Konto».
- Learn, Design und Connect sind über die Startseite erreichbar. Projekte weiter über Learn (Skilltree) und über Meine Boards.
- `/account` heisst **Mein Bereich**: Boards öffnen, Abmelden, Passwort, Export, Kontolöschung.
- «Mein Bereich» ist in der Navigation aktiv auf `/account` und `/dashboard`.

### 3. Connect

Überarbeitet anhand des LinkedIn-Beitrags «VisibleVibe-Entdeckungsreise» (Version 2) und des veröffentlichten Blogbeitrags.

- Einstieg mit der Frage: Was passiert, wenn Lehrpersonen ihre digitalen Werkzeuge selbst bauen?
- Community-Modell-Grafik bleibt.
- Zwei Wege als Karten:
  - **Community of Practice** — [Discord](https://discord.gg/SvW7Zd4TV), [Blogbeitrag «Community-Aufbau im Zentrum»](https://www.fhnw.ch/plattformen/imedias/2026/08/25/community-aufbau-im-zentrum/)
  - **Begleitete Unterrichtsentwicklung** — [imedias.ch/visiblevibe](https://imedias.ch/visiblevibe/)
- Content: `Content/connect/community.md`. Seite: `app/connect/page.tsx`.

### 4. Impressum und Datenschutz

- Footer: Impressum und Datenschutz neben «Ein Projekt von imedias – Beratungsstelle der FHNW.»
- `/impressum` — FHNW PH, Institut Weiterbildung und Beratung, imedias, Windisch; Kontakt Peter Rigert.
- `/datenschutz` — Konto und Boards, Sitzungs-Cookies, lokale Speicherung, Walchwil-Angaben, KI-Coach (OpenAI), keine Analyse-Cookies. Export und Löschung über Mein Bereich. Verweis auf die Datenschutzerklärung der FHNW.

### 5. Verifikation

- `/` Status 200: neuer Leitsatz, Untertitel, Header nur Anmelden, Footer mit beiden Links.
- `/connect` Status 200: Discord-, Blog- und imedias-Links.
- `/impressum` und `/datenschutz` Status 200.

---

## Session vom 24.08.2026 — Design-Überarbeitung

Die Design Guideline (`Workspace/Design Guideline.md`) enthielt nur fünf Stichworte (Excalidraw-inspiriert, Weissraum, minimalistisch, dezentes FHNW-Gelb, keine Tags). Analyse des Ist-Zustands ergab: Der Skizzen-Look war nur behauptet (gerade Rahmen, kein Schatten, generische Schrift), das Gelb füllte beim Hover ganze Karten, alle Elemente hatten dasselbe visuelle Gewicht, die Seite hatte keine Tiefe (weiss auf weiss).

### Sechs Quick Wins

1. **Skizzen-Schatten**: `vv-box` hat jetzt den versetzten 3px-Schatten (`shadow-sketch`, war in der Config definiert, aber ungenutzt). Verlinkte Karten heben sich beim Hover an (`vv-lift` / `vv-lift-group` in `globals.css`: Versatz + 5px-Schatten).
2. **Gelb zurückgenommen**: Kein Vollgelb mehr beim Hover — Hover-Zustände nutzen `fhnw-soft`. Vollgelb reserviert für aktive Navigation, Projekt-Anker im Skilltree und primäre Buttons.
3. **Tiefe**: Seitenhintergrund `paper` (#f7f7f5), Boxen bleiben weiss. Seitenpanels der Board-Ansichten explizit weiss gesetzt.
4. **Rahmen differenziert**: Header/Footer nur noch feine Linie (`border-ink/20`); 2px-Ink-Rahmen exklusiv für Karten.
5. **Excalifont**: Original-Handschrift von Excalidraw (SIL OFL, Latin-Subset inkl. Umlauten, 24 KB) aus dem Excalidraw-Repository nach `app/fonts/` geladen, per `next/font/local` eingebunden. Gilt für alle `h1`, Kicker und die Wortmarke — Fliesstext bleibt Source Sans 3.
6. **Kategorie-Marker im Skilltree**: Themenkarten zeigen einen kleinen Markerstrich plus Label — Grün (Pädagogik), Blau (Technologie), Violett (Usability/Design). Kein Tag-Chip, nur Farbcode.

### Code

- `tailwind.config.ts` — neue Tokens: `cat-pedagogy/-technology/-usability`, `shadow-sketch-lg`, `font-hand`.
- `app/globals.css` — `paper`-Hintergrund, `h1` in Handschrift, `vv-lift`/`vv-lift-group`.
- `app/layout.tsx`, `components/Header.tsx`, `Footer.tsx`, `Page.tsx`, `SkillTree.tsx`, `StepNav.tsx`, `MethodCoach.tsx`, `LogoutButton.tsx`, `AccountDataActions.tsx`, `ExcalidrawBoard.tsx`, `MethodShell.tsx` sowie die Startseiten von Home, Design, Engineering und Dashboard.
- `Workspace/Design Guideline.md` um die getroffenen Entscheidungen erweitert (Farb-Tokens, Skizzen-Look, Typografie).

### Verifikation

- `next build` fehlerfrei, keine Linter-Fehler.

### Offene Punkte (Design)

- Excalifont hat nur einen Regular-Schnitt; `font-semibold` auf `h1` wird künstlich verfettet — im Browser prüfen, ggf. entfernen.
- Die drei Kategoriefarben sind ein Vorschlag; Hex-Werte zentral in `tailwind.config.ts`.

---

## Session vom 28.08.2026 — Illustrationen eingebaut

Die beiden Illustrationen aus `Workspace/assets/` sind in die Website eingebaut:

- **Startseite**: `visiblevibe-landingpage-arbeitstisch.png` (1024×400) zwischen Intro-Text und den drei Einstiegskarten, lädt mit `priority`.
- **Connect**: `visiblevibe-community-modell-v2.png` (1672×941) direkt nach der Einleitung, vor dem Markdown-Inhalt.

Beide Dateien nach `public/images/` kopiert (`arbeitstisch.png`, `community-modell.png`); Originale in `Workspace/assets/` bleiben als Quellmaterial. Eingebunden über `next/image` mit echten Pixelmassen (kein Layout-Springen) und beschreibenden Alt-Texten. Bewusst ohne `vv-box`-Rahmen: Der Off-White-Hintergrund der Illustrationen liegt nah am `paper`-Ton, die Bilder wirken wie direkt auf die Seite gezeichnet.

### Verifikation

- `next build` fehlerfrei.

---

## Weitere Sessions

*(Hier die nächsten v0.3-Arbeitssessions anhängen.)*
