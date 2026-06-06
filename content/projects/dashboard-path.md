---
id: "p-dashboard"
slug: "dashboard-path"
title: "Lernfortschritts-Dashboard"
summary: "Speichert Lernstände ab und macht den Fortschritt diagnostisch auswertbar."
artifact_description: "Eine datenbankgestützte Plattform mit Login-Bereich, die Lernstände persistent sichert und in interaktiven Grafiken (z.B. Dashboards) für Lernende (Reflexion) und Lehrende (Diagnose) aufbereitet."
learning_strategy: "Selbstreguliertes Lernen durch kontinuierliches Monitoring des eigenen Lernstandes."
technology_principle: "Datenbankmodellierung (SQL, Relationen), Cloud-Datenbank-Integration (Supabase) und Datenvisualisierung."
ux_principle: "Progress Visualization, Dashboard-Kacheldesign und übersichtliche Informationshierarchie."
definition_of_done: |
  - Daten werden persistent in Supabase gespeichert
  - Unterschiedliche Sichten (Lehrperson / Schüler:in)
  - Interaktive Diagramme zur Auswertung der Fehlerquote
  - Sicheres User-Management und Login-Schutz
  - Datenschutz-Konzept (Dokumentation) liegt vor
status: "stable"
required_node_ids:
  - "kickoff"
  - "technik"
  - "paedagogik"
  - "usability-design"
  - "webapp-basics"
  - "daten-darstellen"
  - "datenbanken"
  - "user-management"
  - "data-analytics"
  - "progress-visualization"
  - "dashboard"
---

### Projektbeschreibung
Dieses Projekt widmet sich den Daten. Ohne persistente Speicherung und Analyse bleibt Lernen flüchtig. Du lernst, wie man Datenbanktabellen anlegt und Lerndaten so darstellt, dass man didaktische Muster erkennt.

### Empfohlener Arbeitsablauf
1. **Datenbank-Design:** Erstelle dein Tabellenschema in Supabase und richte Testdaten ein.
2. **Auth-Integration:** Implementiere Registrierung und Login.
3. **Dashboard UI:** Baue ein übersichtliches Kacheldesign für das Dashboard.
4. **Visualisierung:** Verbinde die echten Datenbankabfragen mit Diagrammen (SVG/Chart.js).
