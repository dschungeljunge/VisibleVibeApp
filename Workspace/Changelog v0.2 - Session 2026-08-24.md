# Changelog v0.2 — Session vom 24.08.2026

Dokumentation der Arbeitssession. Drei Stränge: projektzentrierter Skilltree (1–4), Nutzerkonten und Board-Persistenz (5–8), VisibleVibe-Methode als selbstgesteuerte Board-Arbeit (9–12).

## Ausgangslage

Die Projekte in `Content/2 - Projekte/` haben einen zentralen Stellenwert erhalten. Der gesamte Skilltree-Content soll sich konsequent auf diese fünf Projekte fokussieren. Die v0.1-Logik (verzweigter Baum über `parent`-Beziehungen, dokumentiert in `Content/_ANLEITUNG.md`) entsprach nicht mehr der Vorstellung.

## 1. Themenkatalog entwickelt

Aus den fünf Projekten wurden 31 Lernthemen abgeleitet — jeweils mit der Leitfrage: An welchem Wissen muss man vorbeigekommen sein, um das Projekt erfolgreich umzusetzen?

- **Pädagogik (11 Themen):** Beobachtung und Interpretation, Wirkungshypothesen, Lernziele und Denkhandlungen, Präkonzepte und Fehlvorstellungen, Diagnostische Aufgaben und Distraktoren, Lernwirksames Feedback, Selbsteinschätzung und Metakognition, Lernspuren und formative Diagnostik, Scaffolding und kognitive Eigenleistung, Adaptivität und Differenzierung, Nebenwirkungen digitaler Lernwerkzeuge
- **Technologie (12 Themen):** Die HTML-Datei als einfachste Website, Aufbau einer Web-App, Zustände und Ereignisse, Trennung von Inhalt und Programmlogik, Coding-Aufträge formulieren, Code lesen und gezielt verändern, Datenmodellierung, Funktionsweise von Sprachmodellen, KI-Verhalten spezifizieren, Regelbasierte Logik und Entscheidungsbäume, Systematisches Testen, Veröffentlichen und Geheimnisse schützen, Datenschutz und Datensparsamkeit
- **Usability Design (7 Themen):** Reduktion aufs Wesentliche, Oberflächen und Abläufe skizzieren, Lesbarkeit und visuelle Hierarchie, Selbsterklärende Bedienung, Barrierefreiheit, Daten verständlich darstellen, Usability-Tests

Jedes Thema besteht vorerst aus wenigen Sätzen im Wiki-Stil (keine Handlungsaufforderungen, keine Links); Ausbau folgt später. Der vollständige Katalog mit Texten liegt in `Workspace/Skilltree-Themen v0.2.md`.

Das Thema „Die HTML-Datei als einfachste Website“ wurde auf Wunsch ergänzt: Die einzelne HTML-Datei ist die Form, in der die User ihre ersten Apps erzeugen (Projekt 1).

## 2. Neue Skilltree-Logik beschlossen

- Der Skilltree ist **projektzentriert** statt verzweigt: Die fünf Projekte bilden das Rückgrat, die Themen sind dem Projekt zugeordnet, für das sie **erstmals** gebraucht werden.
- Jedes Thema erscheint genau **einmal**; spätere Projekte setzen die Themen früherer Projekte voraus (passend zur `prerequisites`-Kette der Projekte).
- Kein vorgeschriebener Lernweg, kein Freischalten: User klicken die Themen an, die sie nicht kennen oder die sie interessieren.
- Verteilung: Projekt 1 → 15 Themen, Projekt 2 → 7, Projekt 3 → 4, Projekt 4 → 3, Projekt 5 → 2.

## 3. Content-Änderungen

- **31 neue Themen-Dateien** angelegt, eine Datei pro Thema, mit Frontmatter `type: learn-topic`, `category`, `order` und dem **neuen Feld `project`** (Slug des Projekts, für das das Thema erstmals gebraucht wird).
- Ablageort: **`Content/1- Themen/`** (zunächst in `Content/learn/topics/` erstellt, danach auf Wunsch verschoben). Die Website kompiliert den Skilltree von dort; der Loader liest alle Ordner rekursiv.
- **Gelöscht:** die vier v0.1-Themen (`web-app-grundlagen`, `prompting-grundlagen`, `ui-design-grundlagen`, `paedagogik-lernziele`), die vier leeren Platzhalter in `1- Themen/` (`Kickoff.md`, `Pädagogik.md`, `Technologie.md`, `Design.md`) sowie der leer gewordene Ordner `Content/learn/`.
- Die fünf Projektdateien in `2 - Projekte/` erhielten vollständiges Frontmatter (`type: learn-project`, `slug`, `order`, `summary`, `status: published`) — teilweise parallel durch den Website-Agenten erfolgt.
- `Content/_ANLEITUNG.md` aktualisiert: neue Ordnerübersicht, Abschnitt „Skilltree-Logik (seit v0.2)“, `project`-Feld dokumentiert, `parent`-Feld als nicht mehr ausgewertet markiert.

## 4. Code-Änderungen (Website)

- `lib/types.ts`: neues optionales Feld `project` im `ContentDocument`.
- `lib/content.ts`: Frontmatter-Feld `project` wird eingelesen.
- `lib/skilltree.ts`: komplett neu — `buildProjectSkillMap()` gruppiert Themen nach Projekt (in Projektreihenfolge, innerhalb der Gruppe sortiert nach Kategorie und `order`); Themen ohne Projektbezug landen in `unassigned`. Die alte `parent`-Baumlogik (`buildSkillTree`) ist entfernt.
- `components/SkillTree.tsx`: komplett neu — pro Projekt ein Abschnitt mit Themen-Raster (weisse Kästchen mit Kategorie-Label), Verbindungslinie und gelbem Projekt-Anker, der auf `/projects/<slug>` verlinkt. Fallback-Abschnitt „Weitere Themen“ für nicht zugeordnete Themen (aktuell leer).
- `app/learn/page.tsx`: lädt Themen und Projekte, baut die Projekt-Map, neuer Einleitungstext (kein empfohlener Weg mehr).

## 5. Nutzerkonten und persönliches Dashboard

- Ein eigenes Supabase-Projekt **VisibleVibe** in der Region `eu-central-2` wurde eingerichtet.
- Supabase Auth integriert: Registrierung mit E-Mail-Bestätigung, Login, Logout und
  Passwort-Reset per E-Mail.
- Neue Routen: `/login`, `/forgot-password`, `/account`, `/account/password`,
  `/auth/callback` und `/dashboard`.
- Das Dashboard **„Meine Boards“** zeigt das fortlaufende Methoden-Board sowie die fünf
  Projektboards mit dem jeweils letzten Bearbeitungszeitpunkt.
- Unter `/account` können User ihr Passwort ändern, alle eigenen Daten als JSON exportieren
  und ihr Konto samt Boards und Versionen vollständig löschen.
- Die Kontolöschung läuft über die authentifizierte Supabase Edge Function `delete-account`;
  der `service_role`-Schlüssel wird nicht an den Browser ausgeliefert.
- Navigation um **Projekte**, **Meine Boards**, **Konto** und die Auth-Aktionen ergänzt.

## 6. Excalidraw-Persistenz und Versionierung

- Tabelle `boards` angelegt: Excalidraw-Szenen werden als `JSONB` gespeichert und über
  `owner_id`, `kind` und `context_slug` einem User und Arbeitskontext zugeordnet.
- Zwei getrennte Arbeitsmodelle umgesetzt:
  - **VisibleVibe-Methode:** ein gemeinsames Board pro User über alle Methodenschritte hinweg;
  - **Projekte:** ein separates Board pro User und Projekt.
- Das bisherige lokale Methoden-Board wird beim ersten Login übernommen, wenn noch kein
  Supabase-Board vorhanden ist.
- Autosave mit sichtbaren Zuständen: „Wird gespeichert“, „gespeichert“, „offline“ und
  „Speichern fehlgeschlagen“.
- Bei fehlender Verbindung bleibt der aktuelle Stand lokal erhalten und wird nach erneuter
  Verbindung wieder synchronisiert.
- Tabelle `board_versions` mit RLS ergänzt:
  - automatische Sicherung bei Änderungen, höchstens alle fünf Minuten;
  - maximal 50 Versionen pro Board;
  - manuelle Versionen;
  - Wiederherstellung älterer Versionen, wobei der vorherige Stand erhalten bleibt.
- Row Level Security ist auf `boards` und `board_versions` aktiv. User können ausschließlich
  eigene Datensätze lesen, erstellen, verändern und löschen.
- Lokale und entfernte Datenbankmigrationen wurden auf denselben Versionsstand gebracht.

## 7. Product Brief und technische Dokumentation

- `Workspace/VISIBLEVIBE_PRODUCT_BUILD_BRIEF_v2.md` an den erweiterten v0.2-Scope angepasst:
  Supabase Auth, persönliche Boards, getrennte Methoden-/Projektkontexte, Offline-Speicherung,
  Versionierung, Export und Kontolöschung sind nun dokumentiert.
- `.env.example` mit den benötigten öffentlichen Supabase-Variablen ergänzt.
- Supabase SSR-Clients und Session-Middleware für den Next.js App Router eingerichtet.

## 8. Verifikation

- `/learn` rendert alle 31 Themen-Links und die fünf Projekt-Anker (geprüft auf dem laufenden Dev-Server, Status 200).
- Themen-Detailseiten und `/projects` stichprobenartig geprüft (Status 200).
- `/login`, `/forgot-password` und `/projects` liefern Status 200; `/account` leitet ohne
  Session zur Anmeldung weiter.
- Produktionsbuild inklusive TypeScript- und Next.js-Prüfung erfolgreich.
- Keine Linter-Fehler.
- Supabase Security Advisor: RLS-Konfiguration ohne Befund; verbleibender Hinweis zur noch
  deaktivierten Erkennung kompromittierter Passwörter.
- Die Edge Function zur Kontolöschung ist aktiv, verlangt ein gültiges JWT und antwortet ohne
  Authentifizierung mit Status 401.
- Automatische Versionierung ist aktiv und hat bereits einen ersten Snapshot erzeugt.

## 9. VisibleVibe-Methode geschärft (Konzept)

Arbeitsgrundlage: `Workspace/VisibleVibeMethode.md`.

- Gedanken in `((…))` ausformuliert: Mindset in Sense (Hebel im eigenen Unterricht), Flow und Mockup in Ideate als Excalidraw-Übungen, Test & Reflect mit evaluativem Mindset und Sichtbarmachen (angelehnt an LUUISE).
- Frame mit Erfolgskriterium verknüpft (Woran merkst du in einer Lektion, dass die Lücke sich schliesst?) — Brücke zu Phase 5.
- Sprache punktuell geschärft (u. a. VisibleVibe statt TeacherEdTech, Vibe Coding statt No-Code, «Schulproblem» → Herausforderung).
- Später in derselben Session: Gegensatzformeln («nicht X, sondern Y») in den Anleitungstexten entschärft. Gegenbeispiele stehen als «typischer Fehltritt» oder als ein gelungenes Beispiel, ohne Paarformel.

## 10. Methode als selbstgesteuerte Board-Arbeit

Zielgruppe: Lehrpersonen, die zum ersten Mal eigene Lernapps denken. Desktop zuerst.

Die sechs Phasen sind in **17 Mini-Aufgaben** zerlegt. Eine Aufgabe = Warum, nummeriertes Vorgehen, Beispiel, typischer Fehltritt, gelbe Karte «Jetzt auf dem Board», «Fertig, wenn …».

| Phase | Mini-Aufgaben |
|---|---|
| Sense | Sammeln → Weil … → Knacknuss |
| Frame | Jetzt → Gelingen → Brücken → Delegieren |
| Ideate | Flow → Bühne |
| Build | Minimal → Prompt → Check |
| Test & Reflect | Kriterium → Spur → Deuten |
| Grow | Schärfen → Teilen |

Das Excalidraw-Board bleibt über alle Phasen dasselbe.

Live-Texte: `Content/design/visiblevibe/01-sense.md` bis `06-grow.md`. `Content/3 - VisibleVibeMethode/` ist Notizordner und verweist darauf (sonst doppelte Schritte in der Navigation).

`Content/_ANLEITUNG.md`: optionales Frontmatter `tasks` mit `id`, `title`, `why`, `board`, `done`, `text`.

## 11. Code-Änderungen (Methode / Design)

- `lib/types.ts`, `lib/content.ts`: `MethodTask` inkl. `done`; Schritte laden `tasks` aus YAML.
- `components/MethodCoach.tsx`: Coach-UI in der linken Spalte — Phaseneinordnung sichtbar, Mini-Schritte als beschriftete Buttons, Board-Karte, Fertig-Kriterium. Optional «Anleitung an mein Board anpassen» (lokal aus Board-Text, mit `OPENAI_API_KEY` über `/api/method/adapt` geschärft).
- `components/MethodShell.tsx`: Desktop-Spalte ca. 28–32 rem; **Trennlinie ziehbar** (320–640 px, lokal gespeichert unter `visiblevibe.method.sidebarPx`, Pfeiltasten wenn die Linie Fokus hat).

## 12. Verifikation (Methode)

- `/design/visiblevibe/sense` und die übrigen fünf Phasen liefern 200; Mini-Aufgaben und Board-Karte erscheinen in der linken Spalte.
- Typecheck der geänderten App-Dateien ohne neue Fehler (bestehende Deno-/Supabase-Hinweise in `supabase/functions/` sind unabhängig).

## Offene Punkte für v0.3

Skilltree:

- Der Skilltree wirkt mit 31 Themen **überladen**, besonders die erste Reihe (Projekt 1 mit 15 Themen). Das Team diskutiert, welche Themen zentral und welche verzichtbar sind.
- Mögliche Mechanismen dafür: `status: draft` nimmt ein Thema ohne Löschen aus der Anzeige; ein neues Frontmatter-Feld (z. B. `weight: core`) könnte Kern- von Nebenthemen unterscheiden — Anzeige-Logik dafür ist noch nicht gebaut.
- Die Themen sind bewusst kurze Wiki-Stubs und müssen inhaltlich ausgebaut werden.
- Vertiefungshinweise («vertieft in Projekt 4») sind noch nicht umgesetzt; angedacht als Vermerk auf der Themenseite statt im Baum.

Methode:

- Grow und die KI-Anpassung der Anleitung an einem echten Board-Durchlauf kalibrieren.
- Notion-Restlinks (Werkzeuge, Ökosystem) in Build ersetzen oder neu schreiben.
- Ob das Erfolgskriterium schon in Frame verbindlich wird oder weich bleibt, ist noch offen.

Technik / Betrieb:

- Next.js 14.2.35 und indirekte Abhängigkeiten erzeugen aktuell fünf `npm audit`-Befunde mit hoher Einstufung. Statt `npm audit fix --force` ist ein kontrolliertes Upgrade auf Next.js 16 mit anschliessenden Regressionstests vorgesehen.
- In Supabase muss die **Leaked Password Protection** noch manuell aktiviert werden.
- Vor dem Vercel-Deployment müssen die Supabase-Umgebungsvariablen sowie Produktions- und Callback-URLs konfiguriert werden.
- Ein automatisierter Zwei-User-Test für die RLS-Isolation und eine vollständige Auth-/Wiederherstellungs-Teststrecke fehlen noch.
