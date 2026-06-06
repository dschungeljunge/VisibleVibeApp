---
id: "datenbanken"
slug: "datenbanken"
title: "Datenbanken"
summary: "Relationale Datenbanken, Tabellendesign und Supabase-Integration für persistente Lernapp-Daten."
category: "Data Design"
level: 6
status: "stable"
video_url: ""
practice_task: |
  Entwirf ein Datenbankschema für deine Lernapp: Erstelle ein ER-Diagramm mit mindestens drei Tabellen (z. B. users, sessions, responses). Erkläre, warum du jede Relation als 1:n oder m:n modelliert hast. Implementiere das Schema anschliessend in Supabase und überprüfe es mit einer einfachen SQL-Abfrage.
quality_criteria: |
  - Das ER-Diagramm enthält mindestens drei Tabellen mit korrekten Primär- und Fremdschlüsseln
  - Jede Relation (1:n oder m:n) ist im Diagramm und in der Begründung klar beschrieben
  - Das Schema ist in Supabase angelegt und via Table Editor sichtbar
  - Eine SQL-Abfrage (SELECT mit JOIN) liefert sinnvolle Testdaten
  - Personenbezogene Daten sind minimiert: Kein Klarname nötig, wenn ein Pseudonym reicht
resources_markdown: |
  - [Supabase Quickstart: Next.js](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs) - Offizielle Anleitung für die Integration von Supabase in Next.js.
  - [PostgreSQL Tutorial](https://www.postgresqltutorial.com) - Umfassender, kostenloser SQL-Lernpfad für Einsteiger.
  - [drawio / Lucidchart](https://draw.io) - Kostenloses Tool für ER-Diagramme.
  - [Datenschutz-Grundverordnung: Datenminimierung](https://gdpr.eu/article-5-how-to-process-personal-data/) - DSGVO Art. 5 zur Grundsatz der Datenminimierung im Schulkontext.
position_x: 1980
position_y: 480
connections:
  - target: "user-management"
    type: "leads_to"
  - target: "data-analytics"
    type: "leads_to"
  - target: "datenschutz-schule"
    type: "leads_to"
---

## Der Vibe (Kurzbeschreibung & Relevanz)

Eine Lernapp, die nichts speichert, beginnt bei jedem Start von null. Keine Fortschrittsanzeige, keine personalisierten Aufgaben, keine Möglichkeit für Lehrpersonen zu sehen, wo die Klasse steht. Das reicht für ein schnelles Klassenexperiment — aber nicht für eine App, die Lernende über Wochen begleiten soll.

Dauerhaftes Speichern von Lerndaten braucht eine Datenbank. Und eine Datenbank ist kein Chaos-Speicher — es ist ein **strukturiertes System**, das Informationen in Tabellen organisiert und über Beziehungen (Relationen) miteinander verknüpft. Wer gelernt hat, Vokabelübungen zu absolvieren und welche davon richtig war, gehört nicht in dieselbe Tabelle wie die Vokabeln selbst.

### Warum brauchst du das in deiner Lernapp?

Ohne Datenbank weisst du nach einer Woche nicht mehr, ob eine Schülerin Vokabel 47 letzte Woche zweimal falsch beantwortet hat und deshalb heute eine Wiederholung braucht. Mit einer Datenbank weisst du es — und deine App kann darauf reagieren. Das ist die technische Voraussetzung für adaptive Lernumgebungen, für Lehrpersonen-Dashboards und für Spaced-Practice-Algorithmen.

---

## Didaktisches Szenario & Exploration mit KI

### Das Szenario

Eine Lehrperson baut eine Vokabel-Lernapp. Sie speichert alle Daten im LocalStorage des Browsers — funktioniert gut, solange man dasselbe Gerät nutzt. Dann wechselt eine Schülerin vom Schulcomputer auf ihr Handy. Ihr Fortschritt ist weg. Eine andere Schülerin löscht versehentlich den Browser-Cache. Alles weg.

Gleichzeitig möchte die Lehrperson wissen, welche Vokabeln die Klasse am häufigsten falsch beantwortet. Mit LocalStorage ist das unmöglich — die Daten sitzen verteilt auf 20 verschiedenen Geräten.

Die Lösung: Eine zentralisierte Datenbank, auf die alle Geräte zugreifen. In diesem Kurs verwenden wir **Supabase** — ein Open-Source-Backend, das PostgreSQL als Datenbank nutzt und eine einfache API für Next.js-Apps bereitstellt.

### Exploration mit der KI

**Relationale Datenbanken: Das Grundprinzip:** Was ist eine relationale Datenbank, und was unterscheidet sie von einem einfachen JSON-File oder einem Excel-Sheet? Lass dir erklären: Was sind Tabellen, Zeilen, Spalten, Primärschlüssel und Fremdschlüssel? Fordere ein konkretes Beispiel mit zwei verknüpften Tabellen aus dem Bildungskontext.

**Normalisierung: Warum man Daten nicht dupliziert:** Ein häufiger Anfängerfehler ist, Schülernamen direkt in die Antwort-Tabelle zu schreiben, statt über einen Fremdschlüssel auf eine Schüler-Tabelle zu verweisen. Lasse dir erklären, was Normalisierung bedeutet und warum Datenduplizierung langfristig zu Inkonsistenzen führt.

**ER-Diagramme lesen und zeichnen:** Wie liest man ein Entity-Relationship-Diagramm? Was bedeuten die Symbole für 1:n und m:n-Relationen? Lass dir ein ER-Diagramm für eine einfache Lernapp (Schüler, Aufgaben, Antworten) erklären. Zeichne danach ein eigenes Diagramm für deine App.

**Supabase im Vergleich:** Supabase ist eine verwaltete Datenbank mit eingebautem UI, Authentifizierung und API. Lasse dir erklären, was der Unterschied zwischen Supabase und einer selbst verwalteten PostgreSQL-Datenbank ist, und warum Supabase für Einsteiger die bessere Wahl ist.

---

## Geführtes Beispiel (Worked Example)

Wir legen das Datenbankschema für eine **Vokabel-Lernapp mit Fortschrittstracking** an.

### Das Entwicklungsziel

Instruiere deine KI, dir beim Entwurf und der Implementierung des folgenden Schemas zu helfen:

**Schritt 1 — Das ER-Diagramm:**
Entwirf ein Schema mit vier Tabellen:
- `users`: id, created_at, pseudonym (kein Klarname)
- `vocabulary_sets`: id, title, created_by (FK → users)
- `vocabulary_items`: id, set_id (FK → vocabulary_sets), term, definition
- `learning_responses`: id, user_id (FK → users), item_id (FK → vocabulary_items), is_correct, responded_at

**Schritt 2 — Schema in Supabase anlegen:**
Öffne deinen Supabase-Account und lege die vier Tabellen mit den korrekten Relationen im Table Editor oder via SQL-Editor an. Die KI kann dir das SQL-Skript generieren — prüfe es aber selbst: Sind alle Fremdschlüssel korrekt gesetzt?

**Schritt 3 — Testdaten einfügen:**
Lege über den Supabase Table Editor manuell fünf Vokabeln und drei simulierte Lernantworten an.

**Schritt 4 — Erste SQL-Abfrage:**
Schreibe (mit Hilfe der KI) eine SQL-Abfrage, die für einen bestimmten User alle Vokabeln auflistet, bei denen er mehr als einmal falsch geantwortet hat — sortiert nach Fehleranzahl absteigend. Verstehe, was die Abfrage macht, bevor du sie ausführst.

---

## Häufige Stolpersteine (Gotchas & Re-Prompting)

* ⚠️ **Die KI denormalisiert das Schema (speichert alles in einer Tabelle):**
  * *Warum passiert das?* Aus Bequemlichkeit fügt die KI manchmal alle relevanten Felder in eine einzige Tabelle (z. B. alle Antwort- und Vokabeldaten in `responses`). Das funktioniert kurzfristig, führt aber zu Redundanz: Wenn eine Vokabel-Definition geändert wird, muss sie in hundert Antwortzeilen aktualisiert werden.
  * *Lösung (Re-Prompt):* Weise die KI explizit an, das Schema zu normalisieren: Vokabeln in einer eigenen Tabelle, Antworten nur mit Fremdschlüssel-Referenz. Erkläre das Ziel: Jede Information soll an genau einem Ort gespeichert sein.

* ⚠️ **Row-Level-Security (RLS) in Supabase ist deaktiviert:**
  * *Warum passiert das?* Supabase aktiviert Row-Level Security (RLS) per Default — eine Sicherheitsschicht, die verhindert, dass ein Nutzer die Daten eines anderen lesen kann. Wenn RLS aktiv ist, aber keine Policies definiert sind, schlägt jede Datenbankabfrage fehl. Die KI deaktiviert RLS manchmal, um das Problem zu umgehen.
  * *Lösung (Re-Prompt):* Lasse die KI keine RLS-Deaktivierung vornehmen. Fordere stattdessen die korrekte Policy-Definition: „Ein User darf nur seine eigenen `learning_responses`-Zeilen lesen und schreiben." Das ist die sichere Variante für eine Schulkontext-App.

* ⚠️ **Datenschutzproblem: Klarnamen in der Datenbank:**
  * *Warum passiert das?* Wenn du die KI bittest, ein User-Management-System zu bauen, fügt sie oft Name, E-Mail und andere identifizierbare Felder in die `users`-Tabelle ein. Im Schulkontext ist das aus DSGVO-Sicht problematisch.
  * *Lösung (Re-Prompt):* Instruiere die KI explizit, das Prinzip der Datenminimierung umzusetzen: Statt Klarname und Geburtsdatum nur ein Pseudonym und eine Klassen-ID. Frage die KI, wie man eine App vollständig pseudonymisiert betreiben kann.
