---
id: "p-quiz"
slug: "quiz-webapp"
title: "Lernapp"
summary: "Eine einfache Lernapp, die aktive Abrufhandlungen (Retrieval Practice) auslöst."
artifact_description: "Eine responsive Webapplikation mit 5 didaktisch aufbereiteten Fragen, Fortschrittsanzeige, formativen Hilfestellungen und einer kurzen Reflexionsseite zur begründeten Lernwirksamkeit."
learning_strategy: "Aktivierung durch abwechselnde Abruf- und Kontrollprozesse (Retrieval Practice)."
technology_principle: "Komponentenbasierte UI-Strukturierung (React) und lokaler State."
ux_principle: "Unmittelbares, klares Feedback; Reduzierung von extraneous cognitive load."
definition_of_done: |
  - App ist online (z.B. Vercel)
  - 5 Fragen mit formativen Antwort-Feedbacks
  - Lokale Fortschrittspeicherung im Session-State
  - Getestet mit mind. 2 Testpersonen (Protokoll vorhanden)
  - Reflexion im Code-Repository dokumentiert
status: "stable"
required_node_ids:
  - "kickoff"
  - "technik"
  - "paedagogik"
  - "vibecoding"
  - "usability-design"
  - "webapp-basics"
  - "interaktive-elemente"
  - "coaching-tutoring"
  - "feedback"
  - "quiz-webapp"
---

### Projektbeschreibung
In diesem ersten Projekt entwickelst du das absolute Fundament digitaler Lernplattformen: Ein interaktives Quiz. Anstatt einfacher Richtig/Falsch-Rückmeldungen entwirfst du Rückmeldungen, die gezielt auf Fehlvorstellungen eingehen.

### Empfohlener Arbeitsablauf
1. **Didaktisches Design:** Definiere die Lernziele und erstelle die Fragen sowie formatives Feedback auf Papier.
2. **Technisches Gerüst:** Richte ein React-Projekt ein und erstelle die grundlegenden UI-Komponenten.
3. **Interaktive Logik:** Implementiere das Umschalten der Fragen, Speichern der Antworten und Berechnen des Scores.
4. **Feinpolitur & Testing:** Teste die App mit Kolleg:innen auf Verständlichkeit und beseitige Usability-Probleme.
