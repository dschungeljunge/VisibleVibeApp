---
id: "progress-visualization"
slug: "progress-visualization"
title: "Progress Visualization"
summary: "Lernfortschritt sichtbar machen: GitHub-Heatmaps, Kompetenzraster und motivierende Fortschrittsdarstellungen."
category: "UX Design"
level: 7
status: "stable"
video_url: ""
practice_task: |
  Baue eine Aktivitäts-Heatmap für deine Lernapp: Eine Kalenderansicht (ähnlich dem GitHub-Contribution-Graph), die für jeden der letzten 52 Wochen die Lernaktivität als farblich abgestuftes Kästchen zeigt. Klick auf ein Kästchen zeigt die Details des jeweiligen Tages.
quality_criteria: |
  - Die Heatmap zeigt die letzten 52 Wochen (364 Tage) als Grid
  - Die Farbintensität ist in mindestens 4 Stufen abgestuft (0 / wenig / mittel / viel)
  - Leere Tage (keine Aktivität) sind klar von aktiven Tagen unterscheidbar
  - Ein Tooltip zeigt beim Hover das genaue Datum und die Anzahl Aktivitäten
  - Die Daten werden aus der Datenbank geladen (nicht hardcodiert)
resources_markdown: |
  - [cal-heatmap (JavaScript)](https://cal-heatmap.com) - Spezialisierte Bibliothek für Kalender-Heatmaps.
  - [D3.js](https://d3js.org) - Das leistungsfähigste, aber auch komplexeste Visualisierungs-Framework für das Web.
  - [Zimmerman: Self-Regulated Learning (2002)](https://doi.org/10.1080/01443410.2013.764961) - Forschung zur Rolle der Fortschrittswahrnehmung bei selbstreguliertem Lernen.
  - [Nir Eyal: Hooked (2014)](https://www.nirandfar.com/hooked/) - Verhaltenspsychologische Grundlagen von Habits und Streaks in digitalen Produkten.
position_x: 2360
position_y: 900
connections:
  - target: "dashboard"
    type: "required_for_project"
  - target: "adaptive-lernumgebung"
    type: "required_for_project"
---

## Der Vibe (Kurzbeschreibung & Relevanz)

GitHub hat eine Designentscheidung getroffen, die sich viral verbreitet hat: der Contribution Graph. Ein Jahr in Kästchen aufgeteilt, grün eingefärbt nach Intensität. Nichts weiter. Und trotzdem motiviert er Millionen von Entwicklerinnen und Entwicklern täglich dazu, Code zu committen — nur um die Kette grüner Kästchen nicht zu unterbrechen.

Das ist kein Zufall. Die Verhaltensforscherin BJ Fogg und der Autor Nir Eyal haben das Phänomen systematisch untersucht: Sichtbare Kontinuität — die Streak — ist einer der stärksten bekannten Mechanismen zur Bildung von Lerngewohnheiten. Wer sieht, dass er 14 Tage in Folge gelernt hat, hat einen starken Anreiz, den 15. Tag nicht zu verpassen.

Gleichzeitig warnt die Forschung vor dem falschen Einsatz: Eine Streak, die zu viel Druck erzeugt, kann bei einem Unterbruch zu komplettem Demotivierung führen (Sunk-Cost-Effekt). Gute Progress Visualization zeigt Fortschritt, ohne Versagen zu bestrafen.

### Warum brauchst du das in deiner Lernapp?

Fortschrittsvisualisierungen erfüllen drei didaktische Funktionen: Sie machen Lernfortschritt **wahrnehmbar** (ich sehe, was ich gelernt habe), sie unterstützen **Selbstregulation** (ich erkenne, wo ich Lücken habe) und sie fördern **Kontinuität** (ich möchte weitermachen). Ohne Visualisierung bleibt Lernen abstrakt — die Anstrengungen unsichtbar, der Fortschritt gefühlt null.

---

## Didaktisches Szenario & Exploration mit KI

### Das Szenario

Zwei Schüler nutzen dieselbe Vokabel-Lernapp über vier Wochen:

**Schüler A** sieht nach vier Wochen: „Du hast 280 Vokabeln gelernt." Er nickt. Irgendwie gut, aber er hat kein Bild davon, wie das über die Zeit verteilt war. War er in der ersten Woche intensiv und in der vierten gar nicht? Er weiss es nicht.

**Schüler B** sieht eine Heatmap der letzten vier Wochen. Er sieht: Die erste Woche war intensiv (dunkle Kästchen), die dritte Woche hatte eine Lücke von drei Tagen (leere Kästchen). Jetzt ist er motiviert, diese Woche wieder dunkle Kästchen zu erzeugen.

Schüler B's Erfahrung ist informationsreicher und handlungsleitender — obwohl beide dieselbe Gesamtzahl an Vokabeln gelernt haben.

### Exploration mit der KI

**Streaks: Motivationsbooster oder Frustrationsfalle?** Diskutiere mit der KI die Vor- und Nachteile von Streak-basierten Mechanismen in Lern-Apps. Duolingo ist dafür bekannt — aber auch für die hohe Abbruchrate nach einem Streak-Verlust. Wie kannst du die motivierende Wirkung nutzen, ohne die Demotivierung bei einem Unterbruch zu riskieren?

**Visualisierung von Lernlücken:** Eine Heatmap zeigt nicht nur, wann gelernt wurde — sie zeigt auch, wann nicht. Wie gestaltest du eine Visualisierung, die Lernlücken deutlich macht, ohne Schülerinnen und Schüler zu beschämen? Was ist der Unterschied zwischen einer Visualisierung für Lernende und einer für Lehrpersonen beim gleichen Datensatz?

**Aggregation über Zeit:** Was ist der didaktische Unterschied zwischen täglicher Aktivität (hat jemand heute etwas getan?) und kumuliertem Fortschritt (wie viele Aufgaben insgesamt)? Welche Dimension ist für Selbstregulation nützlicher, welche für die Lehrpersonen-Diagnose?

---

## Geführtes Beispiel (Worked Example)

Wir bauen eine **GitHub-ähnliche Aktivitäts-Heatmap**, die Lernaktivitäten der letzten 52 Wochen darstellt.

### Das Entwicklungsziel

**Schritt 1 — Datenaggregation:**
Schreibe eine SQL-Abfrage (oder Supabase-Funktion), die für den eingeloggten User die Anzahl Lernaktivitäten pro Tag für die letzten 364 Tage zurückgibt. Das Ergebnis ist ein Array von Objekten: `{ date: "2024-05-15", count: 7 }`.

**Schritt 2 — Das Kalender-Grid:**
Erstelle eine React-Komponente, die 364 Kästchen in einem Wochen-Grid (52 Spalten × 7 Zeilen) darstellt. Jedes Kästchen repräsentiert einen Tag. Die Farbe hängt vom `count`-Wert ab:
- 0: Hellgrau
- 1–3: Hellgrün
- 4–8: Mittelgrün
- 9+: Dunkelgrün

**Schritt 3 — Tooltip:**
Beim Hover über ein Kästchen erscheint ein kleines Tooltip mit dem Datum und der Aktivitätsanzahl: „12. Mai 2024 — 5 Aktivitäten."

**Schritt 4 — Wochenbeschriftung:**
Füge links eine Y-Achse mit den Wochentagen (Mo, Mi, Fr) und oben eine X-Achse mit den Monatsnamen hinzu.

---

## Häufige Stolpersteine (Gotchas & Re-Prompting)

* ⚠️ **Datum-Handling: Zeitzonenfehler:**
  * *Warum passiert das?* Datenbank-Zeitstempel sind oft in UTC gespeichert, während der Browser in der lokalen Zeitzone arbeitet. Ein Eintrag um 23:00 Uhr Schweizer Zeit ist in UTC am nächsten Tag — das Kästchen erscheint am falschen Tag.
  * *Lösung (Re-Prompt):* Weise die KI an, alle Datumsvergleiche in der Datenbankabfrage in der lokalen Zeitzone durchzuführen (`AT TIME ZONE 'Europe/Zurich'` in PostgreSQL). Alternativ: Speichere `responded_date` als separates `DATE`-Feld (ohne Uhrzeit) direkt beim Eintrag — dann entfällt das Timezone-Problem.

* ⚠️ **Das Grid ist nicht korrekt nach Kalenderwochen ausgerichtet:**
  * *Warum passiert das?* Wenn du einfach 364 Kästchen nebeneinander renderst, beginnt die erste Woche nicht notwendigerweise am Montag. Das Grid sieht aus wie GitHub — aber die Wochentage stimmen nicht überein.
  * *Lösung (Re-Prompt):* Beschreibe der KI, dass das Grid am Montag der Woche vor 364 Tagen beginnen soll, und dass leere Felder am Anfang und Ende mit transparenten Platzhalter-Kästchen gefüllt werden.

* ⚠️ **Die KI lädt alle Rohdaten ins Frontend und aggregiert dort:**
  * *Warum passiert das?* Statt einer aggregierenden SQL-Abfrage (die nur 364 Zeilen zurückgibt) lädt die KI alle `learning_responses` der letzten 364 Tage ins Frontend und berechnet die Tagessummen in JavaScript. Bei aktiven Lernenden kann das tausende von Einträgen sein.
  * *Lösung (Re-Prompt):* Betone, dass die Aggregation in der Datenbank stattfinden soll — nicht im Frontend. Das reduziert die übertragene Datenmenge drastisch und hält die Komponente schnell.
