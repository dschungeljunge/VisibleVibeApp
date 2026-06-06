---
id: "user-management"
slug: "user-management"
title: "User Management"
summary: "Authentifizierung, Rollenverteilung und datenschutzkonformes Tracking mit Supabase Auth."
category: "Data Design"
level: 7
status: "stable"
video_url: ""
practice_task: |
  Richte Supabase Auth in deiner App ein und erstelle zwei geschützte Routen: eine für Lernende (/lernende) und eine für Lehrpersonen (/lehrperson). Die Lehrpersonen-Route soll nur für Accounts mit der Rolle "teacher" erreichbar sein — alle anderen werden auf die Lernenden-Ansicht umgeleitet.
quality_criteria: |
  - Login und Registrierung funktionieren via Supabase Auth (E-Mail / Magic Link)
  - Nicht eingeloggte Nutzende werden von geschützten Routen auf die Login-Seite weitergeleitet
  - Die Rollenunterscheidung (teacher / student) ist über Supabase Row-Level Security umgesetzt
  - Personenbezogene Daten sind minimiert (kein Pflicht-Klarname bei Registrierung)
  - Der Auth-Token wird serverseitig validiert (nicht nur im Frontend)
resources_markdown: |
  - [Supabase Auth: Next.js Guide](https://supabase.com/docs/guides/auth/server-side/nextjs) - Offizielle Anleitung für serverseitige Authentifizierung in Next.js mit dem App Router.
  - [Supabase Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security) - Wie Datenbankzugriffe pro Nutzerrolle eingeschränkt werden.
  - [DSGVO im Schulkontext – Schweiz (DSG)](https://www.edoeb.admin.ch/edoeb/de/home/datenschutz/bildung.html) - Leitfaden zum Datenschutz in Bildungskontexten.
  - [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html) - Sicherheitsstandards für Authentifizierungssysteme.
position_x: 2360
position_y: 300
connections:
  - target: "adaptive-lernumgebung"
    type: "required_for_project"
  - target: "datenschutz-schule"
    type: "leads_to"
---

## Der Vibe (Kurzbeschreibung & Relevanz)

Sobald mehrere Personen deine Lernapp nutzen, brauchst du Antworten auf drei Fragen: Wer ist gerade in der App? Was darf diese Person sehen und tun? Wie schützt du die Daten einer Person vor dem Zugriff durch andere?

Das sind die Kernfragen des User Managements. Und im Schulkontext sind sie besonders heikel: Du arbeitest mit Daten von Minderjährigen. Selbst harmlos wirkende Informationen — welche Aufgaben ein Kind wie oft falsch beantwortet hat — fallen unter die DSGVO und das schweizerische Datenschutzgesetz (DSG). Ein falsch konfiguriertes Authentifizierungssystem kann dazu führen, dass Schülerdaten für alle sichtbar sind, die die richtige URL kennen.

### Warum brauchst du das in deiner Lernapp?

Ohne User Management ist jede Lernsession anonym — du kannst Fortschritte nicht personalisieren. Mit User Management kannst du zwischen Lernenden und Lehrpersonen unterscheiden: Lernende sehen ihre eigenen Aufgaben und Ergebnisse, Lehrpersonen sehen das Klassenbild. Diese Rollenaufteilung ist die Voraussetzung für sinnvolle Lehrpersonen-Dashboards und adaptive Lernumgebungen.

---

## Didaktisches Szenario & Exploration mit KI

### Das Szenario

Eine Lehrperson hat ihre App ohne Login deployed. Alle Schülerinnen und Schüler nutzen dieselbe URL. Sie bemerkt nach zwei Wochen: Der Fortschrittsbalken zeigt für alle denselben Stand — weil alle Antworten in derselben anonymen Session landen. Es gibt keine Möglichkeit zu sagen, wer was gelernt hat.

Sie fügt eine einfache Lösung hinzu: Ein Textfeld für den Vornamen am Start. Schülerinnen und Schüler tippen ihren Namen ein, ihre Daten werden unter diesem Namen gespeichert. Funktioniert — aber: Schüler Jonas kann in das Textfeld „Leah" eingeben und Leahs Daten einsehen. Kein Schutz, kein echter Login.

Die richtige Lösung ist ein vollständiges Authentifizierungssystem: eindeutige, verifizierte Identitäten, serverseitig validiert, mit Rollenzuweisung und Zugriffsschutz auf Datenbankebene.

### Exploration mit der KI

**Authentifizierung vs. Autorisierung:** Was ist der Unterschied zwischen diesen beiden Begriffen? Wann ist jemand *authentifiziert* (bestätigte Identität) und wann ist er *autorisiert* (Berechtigung für eine Aktion)? Lasse dir beide an einem konkreten App-Beispiel erklären.

**Datenschutz by Design:** Das DSG und die DSGVO verlangen nicht nur sichere Speicherung, sondern *Datenminimierung*: Es sollen nur jene Daten erhoben werden, die für den Zweck wirklich notwendig sind. Diskutiere mit der KI: Braucht deine Lernapp den echten Namen einer Schülerin? Oder reicht eine Klasse + Pseudonym? Was ist der Mindestdatensatz für ein funktionierendes User Management in deinem Kontext?

**Magic Links vs. Passwort-Login:** Supabase unterstützt verschiedene Login-Methoden. Magic Links (ein einmaliger Login-Link per E-Mail) haben den Vorteil, dass kein Passwort gespeichert werden muss — was die Sicherheit erhöht und die Registrierung vereinfacht. Diskutiere mit der KI, welche Login-Methode für deine Zielgruppe (Schüleralter, Schul-E-Mail-Verfügbarkeit) die sinnvollste ist.

**Row Level Security (RLS) in der Praxis:** RLS ist Supabase' Mechanismus, um Datenbankzugriffe auf Zeilenebene zu schützen. Lasse dir an einem Beispiel erklären, wie eine Policy aussieht, die sicherstellt, dass ein Schüler nur seine eigenen `learning_responses` lesen kann — nicht die seiner Mitschüler.

---

## Geführtes Beispiel (Worked Example)

Wir richten ein **rollenbasiertes Authentifizierungssystem** mit Supabase Auth in Next.js ein.

### Das Entwicklungsziel

Instruiere deine KI, die folgende Architektur schrittweise umzusetzen:

**Schritt 1 — Supabase Auth aktivieren:**
Aktiviere E-Mail-Authentifizierung in deinem Supabase-Projekt. Erstelle einen `profiles`-Tabellen-Eintrag für jeden neuen User via Database Trigger (Supabase-Funktion, die automatisch nach der Registrierung ausgeführt wird). Der Profil-Eintrag enthält: `id` (= user id), `role` (default: `student`), `pseudonym`.

**Schritt 2 — Geschützte Routen in Next.js:**
Erstelle eine `middleware.ts`-Datei im Root des Projekts. Die Middleware überprüft bei jedem Request, ob eine gültige Supabase-Session vorliegt. Nicht eingeloggte Personen werden auf `/login` weitergeleitet.

**Schritt 3 — Rollenbasierter Zugriff:**
Die `/lehrperson`-Route darf nur für Accounts mit `role = 'teacher'` erreichbar sein. Die Rolle wird serverseitig aus der `profiles`-Tabelle gelesen — nie aus einem Cookie oder einem Frontend-State, der manipuliert werden könnte.

**Schritt 4 — Login-Seite:**
Eine einfache Login-Seite mit E-Mail-Eingabe. Nach dem Absenden sendet Supabase einen Magic Link per E-Mail. Nach dem Klick auf den Link ist die Nutzerin oder der Nutzer eingeloggt und wird auf die passende Route weitergeleitet (basierend auf der Rolle).

---

## Häufige Stolpersteine (Gotchas & Re-Prompting)

* ⚠️ **Rollencheck nur im Frontend (unsicherer Ansatz):**
  * *Warum passiert das?* Die KI implementiert Rollenchecks manchmal nur im React-State des Frontends: `if (user.role === 'teacher') { ... }`. Das lässt sich trivial umgehen, indem man im Browser-DevTools die Variable manipuliert.
  * *Lösung (Re-Prompt):* Betone, dass der Rollencheck auf dem Server stattfinden muss — entweder in der Next.js Middleware oder in einem Server Component. Erkläre das Sicherheitsproblem: Ein clientseitiger Rollencheck ist keine Zugriffskontrolle.

* ⚠️ **Auth-Token läuft ab, App zeigt weiterhin geschützte Inhalte:**
  * *Warum passiert das?* Wenn der Supabase-Auth-Token nicht korrekt auf Session-Ablauf überprüft wird, bleibt eine eingeloggte Session nach dem Ablauf des Tokens im Frontend-State sichtbar — obwohl keine gültige Authentifizierung mehr vorliegt.
  * *Lösung (Re-Prompt):* Instruiere die KI, `@supabase/ssr` korrekt einzurichten und Session-Refreshes über die Middleware zu handhaben. Das offizielle Supabase-Next.js-Template enthält dafür vorkonfigurierte Patterns.

* ⚠️ **Schülerdaten sind ohne Login erreichbar (fehlende RLS-Policies):**
  * *Warum passiert das?* Supabase deaktiviert den Datenzugriff für nicht-authentifizierte Anfragen per Default — aber nur wenn RLS aktiviert ist. Wenn RLS für eine Tabelle ausgeschaltet ist (was die KI manchmal als schnelle Lösung tut), kann jede Person mit dem Supabase-URL und dem Anon-Key alle Datenbankzeilen lesen.
  * *Lösung (Re-Prompt):* Überprüfe für jede Tabelle, ob RLS aktiviert ist (`ALTER TABLE ... ENABLE ROW LEVEL SECURITY`). Lasse die KI für jede Tabelle explizit die notwendigen Policies definieren.
