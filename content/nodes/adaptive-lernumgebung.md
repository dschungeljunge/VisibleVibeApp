---
id: "adaptive-lernumgebung"
slug: "adaptive-lernumgebung"
title: "Adaptive Lernumgebung"
summary: "Das Abschlussprojekt: Eine Lernapp, die Aufgaben dynamisch an die Fehlerhistorie der Lernenden anpasst."
category: "Product Design"
level: 9
artifact_description: "Eine vollständige Web-App, die Lernenden individuell angepasste Aufgaben präsentiert — basierend auf ihrer persönlichen Fehlerhistorie. Sie kombiniert Authentifizierung, Datenbank, Learning Analytics, KI-gestütztes Feedback und Lehrpersonen-Dashboard zu einer kohärenten Lernumgebung."
learning_strategy: "Adaptives Lernen auf Basis des Leitner-Prinzips (Spaced Repetition), sokratisches KI-Feedback und formative Lernbegleitung."
technology_principle: "Supabase (Auth + Datenbank + Analytics), Next.js App Router (serverseitige Komponenten + API Routes), LLM-Integration via sicherem Proxy."
ux_principle: "Fortschrittstransparenz (die Lernenden verstehen, warum sie welche Aufgabe erhalten), Trust Calibration (KI-Grenzen sind sichtbar) und minimaler extraneous cognitive load."
definition_of_done: |
  - Lernende können sich einloggen und ihre persönliche Lernhistorie einsehen
  - Das System wählt die nächste Aufgabe basierend auf der Fehlerhistorie aus (häufiger Falsche öfter)
  - Eine KI gibt nach jeder Schülerantwort sokratisches Feedback (kein direktes Verraten der Lösung)
  - Das KI-Feedback ist auf den spezifischen Fehler der Schülerin / des Schülers zugeschnitten (nicht generisch)
  - Eine Lehrpersonen-Ansicht zeigt aggregierte Fehlerquoten pro Aufgabe für die Klasse
  - Alle Schülerdaten sind pseudonymisiert und per Row Level Security geschützt
  - Der API-Key ist ausschliesslich serverseitig gespeichert
  - Die App funktioniert auf Desktop und Mobile ohne Funktionsverlust
status: "stable"
is_milestone: true
position_x: 3120
position_y: 600
video_url: ""
required_node_ids:
  - "kickoff"
  - "technik"
  - "paedagogik"
  - "ki-llms"
  - "vibecoding"
  - "webapp-basics"
  - "software-projektmanagement"
  - "usability-design"
  - "coaching-tutoring"
  - "feedback"
  - "scaffolding"
  - "retrieval-practice"
  - "api-keys"
  - "prompting"
  - "kontext-engineering"
  - "cognitive-load-management"
  - "datenbanken"
  - "user-management"
  - "data-analytics"
  - "daten-darstellen"
  - "progress-visualization"
---

### Projektbeschreibung

Die Adaptive Lernumgebung ist das Abschlussprojekt des VisibleVibe Skilltrees. Sie ist kein weiteres Feature — sie ist das Zusammenführen aller Einzelkompetenzen zu einem kohärenten, lernwirksamen Produkt.

Was dieses Projekt von den vorherigen unterscheidet, ist die **Adaptivität**: Die App entscheidet nicht zufällig, welche Aufgabe eine Lernende als Nächstes erhält. Sie entscheidet auf Basis einer Geschichte — der persönlichen Fehlerhistorie. Aufgaben, die häufig falsch beantwortet wurden, tauchen öfter auf. Aufgaben, die sicher beherrscht werden, tauchen seltener auf. Das entspricht dem Leitner-Prinzip (Spaced Repetition), einem der robustesten Mechanismen der Lernforschung.

Gleichzeitig ist die App nicht allein auf Algorithmen angewiesen. Ein KI-Tutor gibt nach jeder Antwort sokratisches Feedback — aber kein generisches. Das Feedback ist auf den spezifischen Fehler zugeschnitten: Es benennt die Fehlvorstellung, nicht nur die falsche Antwort.

### Verknüpfte Kompetenzen

| Knoten | Mitgebrachte Kompetenz |
|--------|----------------------|
| **Pädagogik** | Lernziele nach ABCD-Modell, Backward Design |
| **KI & LLMs** | Verständnis von Kontextfenster, Halluzinationen, Token-Grenzen |
| **Prompting** | System Prompts mit Guardrails und sokratischem Verhalten |
| **Coaching & Tutoring** | Sokratische Gesprächsführung, Rollenrobustheit |
| **Scaffolding** | Gestufte Hilfestellungen, ZPD-bewusstes Design |
| **Retrieval Practice** | Aktiver Wissensabruf als Kernmechanismus |
| **Feedback** | Prozessebenen-Feedback auf Basis von Fehlvorstellungen |
| **Kontext Engineering** | Lernstoff-gebundenes KI-Feedback |
| **API-Keys** | Sicherer Proxy-Endpunkt für LLM-Anfragen |
| **Webapp Basics** | React-State, Komponenten, Props |
| **Datenbanken** | Schema-Design, Normalisierung, SQL-Abfragen |
| **User Management** | Authentifizierung, Rollenschutz, DSGVO |
| **Data Analytics** | Fehlerquoten-Abfragen, Aggregation, Zeitstempel |
| **Daten darstellen** | SVG-Diagramme, Recharts, Tufte-Prinzipien |
| **Progress Visualization** | Heatmap, Streak-Mechanismus, Selbstregulation |
| **Usability Design** | Nielsens Heuristiken, Cognitive Load, Testing |
| **Cognitive Load Management** | Extraneous Load eliminieren, Mayers Prinzipien |
| **Software Projektmanagement** | MVP, User Stories, Kanban |

### Empfohlener Arbeitsablauf

Dies ist ein mehrstündiges Projekt, das sinnvollerweise in vier Phasen aufgeteilt wird.

**Phase 1 — Konzept und Datenbankdesign (ca. 2–3 Stunden)**

1. Definiere das MVP deiner adaptiven Lernumgebung: Welches Fach, welche Aufgabentypen, welche Zielgruppe?
2. Entwirf das vollständige Datenbankschema: Mindestens `users`, `profiles`, `items`, `learning_responses`. Überlege: Wie speicherst du die Information, ob eine Aufgabe zuletzt richtig oder falsch beantwortet wurde?
3. Implementiere das Schema in Supabase, richte RLS und User Management ein.
4. Definiere den Adaptivitäts-Algorithmus: Wann gilt eine Aufgabe als „schwach beherrscht" (z. B. in den letzten 3 Versuchen mindestens 2x falsch)? Wie häufig soll sie wiederholt werden?

**Phase 2 — Kernfunktion: Adaptiver Aufgabenfluss (ca. 3–4 Stunden)**

5. Implementiere die Logik, die die nächste Aufgabe auswählt: SQL-Abfrage oder Supabase-Funktion, die auf Basis der Fehlerhistorie priorisiert.
6. Baue die Aufgaben-Ansicht: Aufgabe anzeigen, Eingabe entgegennehmen, Antwort in `learning_responses` speichern.
7. Verbinde die Antwortauswertung mit dem Algorithmus: Nach jeder Antwort wird die neue Priorität der Aufgabe berechnet.

**Phase 3 — KI-Feedback-Integration (ca. 2–3 Stunden)**

8. Entwickle den System Prompt für den KI-Tutor. Er soll: (a) sokratisch agieren, (b) die konkrete Schülerantwort analysieren, (c) die dahinterliegende Fehlvorstellung benennen, (d) eine weiterführende Frage stellen.
9. Baue den serverseitigen API-Proxy (Route Handler in Next.js).
10. Verbinde das Frontend mit dem Proxy: Nach jeder Antwort wird die Schülereingabe zusammen mit der Aufgabenstellung an die KI gesendet, das Feedback wird im Interface angezeigt.

**Phase 4 — Dashboard und Qualitätssicherung (ca. 2–3 Stunden)**

11. Baue die Lehrpersonen-Ansicht: Fehlerquote pro Aufgabe als Balkendiagramm, Aktivitäts-Heatmap für die letzten Wochen.
12. Baue die Lernenden-Ansicht: Eigener Fortschrittsring, eigene Heatmap, eigene Fehlerquote.
13. Führe einen Usability-Test mit 2 Personen durch (je eine Lernende-Perspektive und eine Lehrpersonen-Perspektive).
14. Härtungsphase: Teste Prompt-Injection-Versuche, Datenbankzugriffe ohne Login, Grenzfälle (keine Aufgaben, alle Aufgaben richtig beantwortet).

### Reflexionsfragen nach Abschluss

Bevor du das Projekt als abgeschlossen betrachtest:

1. **Lernwirksamkeit:** Ein Schüler nutzt deine App 15 Minuten täglich über zwei Wochen. Welche Daten zeigen dir, ob die Adaptivität funktioniert — also ob schwache Aufgaben tatsächlich häufiger erscheinen und mit der Zeit besser beherrscht werden?

2. **Datenschutz-Audit:** Gehe durch alle Datenbankabfragen und API-Calls. Welche personenbezogenen Daten werden übertragen? Gibt es einen Weg, die App mit weniger Daten genauso gut zu betreiben?

3. **Das blinde Fleck:** Was kann deine App nicht — was sie eigentlich können müsste, um im echten Schulunterricht vollständig nützlich zu sein? Was hättest du anders entworfen, wenn du heute von vorne anfangen würdest?
