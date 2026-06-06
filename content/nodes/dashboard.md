---
id: "dashboard"
slug: "dashboard"
title: "Dashboard"
summary: "Meilenstein-Projekt: Ein Lehrpersonen-Dashboard, das aggregierte Lerndaten der Klasse visualisiert."
category: "Data Design"
level: 8
artifact_description: "Ein interaktives Web-Dashboard für Lehrpersonen, das Lernfortschritt, Fehlerquoten und Aktivitätsmuster der Klasse in Echtzeit aggregiert und als Grundlage für gezielte didaktische Interventionen dient."
learning_strategy: "Datengestützte Diagnose (Data-Informed Teaching): Lehrpersonen erkennen durch aggregierte Klassenanalysen, wo Handlungsbedarf besteht — und reagieren gezielt."
technology_principle: "Supabase (Auth + Row Level Security + Datenbankfunktionen), Next.js Server Components für Datenbankzugriff, Recharts für Visualisierungen."
ux_principle: "Tuftes Datenhonestität (nur relevante Daten, kein Chart-Junk), klare Rollenaufteilung (Lehrpersonen vs. Lernende), sofort handlungsleitende Visualisierungen."
definition_of_done: |
  - Die Lehrpersonen-Ansicht ist ausschliesslich für Accounts mit Rolle 'teacher' erreichbar (RLS + Middleware)
  - Das Dashboard zeigt für jede Aufgabe die Fehlerquote der Klasse als Balkendiagramm
  - Das Dashboard zeigt eine Aktivitäts-Heatmap der letzten 4 Wochen für die Klasse (aggregiert)
  - Lehrpersonen können nach Zeitraum und Aufgabengruppe filtern
  - Alle angezeigten Schülerdaten sind pseudonymisiert (kein Klarname)
  - Das Dashboard lädt in unter 3 Sekunden (Datenbankabfragen sind effizient, keine N+1-Abfragen)
status: "stable"
required_node_ids:
  - "datenbanken"
  - "user-management"
  - "data-analytics"
  - "daten-darstellen"
  - "progress-visualization"
  - "cognitive-load-management"
position_x: 2740
position_y: 600
connections:
  - target: "adaptive-lernumgebung"
    type: "required_for_project"
---

### Projektbeschreibung

Das Dashboard ist das dritte Meilensteinprojekt. Es wechselt die Perspektive: Bisher hast du Apps für Lernende gebaut. Jetzt baust du ein Werkzeug für Lehrpersonen.

Ein gutes Lehrpersonen-Dashboard ist kein Statistik-Tool — es ist ein **Diagnoseinstrument**. Es beantwortet nicht die Frage „Was ist passiert?", sondern „Was sollte ich jetzt tun?" Eine Lehrperson, die sieht, dass 14 von 20 Schülerinnen und Schüler Aufgabe 7 in den letzten drei Versuchen falsch beantwortet haben, kann handeln: In der nächsten Stunde Aufgabe 7 thematisieren, das Scaffolding für diese Aufgabe erhöhen, oder die App selbst anpassen.

Die Herausforderung liegt im Design: Zu viele Daten überfordern, zu wenige helfen nicht. Das Ziel ist ein Dashboard, das auf einen Blick die wichtigste Information zeigt — und auf den zweiten Blick die Details liefert.

### Verknüpfte Kompetenzen

| Knoten | Mitgebrachte Kompetenz |
|--------|----------------------|
| **Datenbanken** | Datenbankschema, SQL-Abfragen mit JOINs und GROUP BY |
| **User Management** | Rollenbasierter Zugriff, RLS, Lehrpersonen-Authentifizierung |
| **Data Analytics** | Fehlerquoten-Abfragen, Zeitstempel-Aggregation, Ausreisser-Handling |
| **Daten darstellen** | Recharts, Tufte-Prinzipien, barrierefreie Diagramme |
| **Progress Visualization** | Aktivitäts-Heatmap, aggregierte Klassenaktivität |
| **Cognitive Load Management** | Reduziertes UI, keine dekorativen Elemente, klare Signalisierung |

### Empfohlener Arbeitsablauf

**Phase 1 — Informationsarchitektur (ca. 1–2 Stunden)**

1. Definiere auf Papier: Welche drei Fragen muss das Dashboard für eine Lehrperson in unter 10 Sekunden beantworten? Keine anderen Fragen — nur diese drei.
2. Entwirf einen Wireframe: Welche Visualisierung beantwortet welche Frage? Balkendiagramm für Fehlerquoten? Tabelle für inaktive Lernende? Heatmap für Klassenaktivität?
3. Prüfe mit Tuftes Kohärenzprinzip: Welche geplanten Elemente kannst du weglassen, ohne Information zu verlieren?

**Phase 2 — Datenbankabfragen (ca. 2–3 Stunden)**

4. Schreibe die SQL-Abfragen oder Supabase-Funktionen für die drei Kernmetriken: Fehlerquote pro Aufgabe, Klassenaktivität pro Tag (letzte 28 Tage), Liste der Lernenden nach Aktivität (inaktivste zuerst).
5. Stelle sicher, dass alle Abfragen Row Level Security respektieren: Eine Lehrperson soll alle Klassendaten sehen — aber keine Daten anderer Klassen.
6. Optimiere die Abfragen: Lade keine Rohdaten ins Frontend, die dort aggregiert werden. Die Aggregation gehört in die Datenbank.

**Phase 3 — Visualisierung (ca. 2–3 Stunden)**

7. Implementiere die drei Kernvisualisierungen schrittweise. Beginne mit der Fehlerquote-Ansicht (das ist die didaktisch wichtigste Information), dann die Aktivitäts-Heatmap, dann die Tabelle.
8. Füge einen einfachen Filter hinzu: Zeitraum (letzte 7 / 28 Tage) und ggf. Aufgabengruppe. Implementiere den Filter so, dass er die SQL-Abfrage neu ausführt — nicht das Frontend-Array filtert.

**Phase 4 — Testing und Datenschutz-Audit (ca. 1–2 Stunden)**

9. Teste das Rollenkonzept: Logge dich als Schüleraccount ein und versuche, die Dashboard-URL direkt aufzurufen. Du solltest weitergeleitet werden.
10. Teste mit einer Kollegin oder einem Kollegen in der Lehrpersonen-Rolle: Welche drei Dinge sind sofort verständlich? Was ist unklar?
11. Datenschutz-Check: Welche personenbezogenen Daten werden im Dashboard angezeigt? Sind sie für den pädagogischen Zweck notwendig?

### Reflexionsfragen nach Abschluss

1. **Handlungsrelevanz:** Zeigt dein Dashboard Information, die eine Lehrperson zu einer konkreten pädagogischen Handlung führt? Oder zeigt es Information, die interessant, aber nicht handlungsleitend ist?

2. **Datenschutz vs. Nützlichkeit:** Wo hast du Daten weggelassen, die nützlich wären, aber datenschutzrechtlich problematisch? Was war die schwerste Abwägung?

3. **Skalierung:** Dein Dashboard funktioniert für 20 Schülerinnen und Schüler. Was würde sich verändern, wenn 200 oder 2000 Schülerinnen und Schüler dieselbe App nutzen? Wo liegen die technischen und pädagogischen Grenzen?
