---
id: "quiz-webapp"
slug: "quiz-webapp"
title: "Interaktive Quiz-Webapp"
summary: "Erstes Meilenstein-Projekt: Eine Quiz-App, die aktiven Wissensabruf erzwingt und formatives Feedback gibt."
category: "Product Design"
level: 3
artifact_description: "Eine responsive Webapplikation mit didaktisch aufbereiteten Fragen, fehlerspezifischem formativem Feedback, Fortschrittsanzeige und einer abschliessenden Ergebnisseite."
learning_strategy: "Retrieval Practice als Kern: Aktiver Wissensabruf statt passiver Wiedererkennung, ergänzt durch fehlerspezifisches formatives Feedback auf Prozessebene."
technology_principle: "Komponentenbasierte UI-Strukturierung in React/Next.js, lokaler State-Management mit useState, kein Backend erforderlich."
ux_principle: "Unmittelbares, klares Feedback nach jeder Antwort; Fortschrittsanzeige zur Selbstregulation; minimaler extraneous cognitive load durch reduziertes UI."
definition_of_done: |
  - Die App läuft fehlerfrei im Browser (keine Konsolenfehler)
  - Mindestens 5 Fragen mit je mindestens 2 verschiedenen Feedback-Texten (richtig / falsch mit Fehlvorstellung)
  - Die Fortschrittsanzeige aktualisiert sich nach jeder Antwort
  - Die App ist mit mindestens 2 Personen getestet — ein Testprotokoll liegt vor
  - Die App ist auf Vercel oder einem ähnlichen Hosting deployed und via URL erreichbar
  - Das Ergebnis-Screen zeigt den Score und ermutigt zur Wiederholung falscher Antworten
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
  - "retrieval-practice"
  - "deployment"
position_x: 840
position_y: 960
connections:
  - target: "datenbanken"
    type: "leads_to"
---

### Projektbeschreibung

Die interaktive Quiz-Webapp ist dein erstes grosses Meilensteinprojekt. Nicht weil Quizze pädagogisch besonders anspruchsvoll sind — sondern weil das Quiz als Format zwingt, alle Grundkompetenzen des Kurses erstmals zusammenzuführen: Lernziele definieren, Fragen didaktisch gestalten, eine React-App bauen, Feedback auf Fehlvorstellungen konzipieren, auf einem echten Gerät testen und deployen.

Das Besondere: Diese App macht es explizit falsch, einfaches Richtig/Falsch-Feedback zu zeigen. Sie gibt **fehlerspezifisches formatives Feedback**: Wer eine Frage falsch beantwortet, sieht nicht „Das ist falsch." — sie sieht, welche Fehlvorstellung hinter ihrer Antwort steckt und einen konkreten Denkansatz für den nächsten Versuch.

### Verknüpfte Kompetenzen

| Knoten | Mitgebrachte Kompetenz |
|--------|----------------------|
| **Pädagogik** | Lernziele nach ABCD-Modell als Ausgangspunkt für jede Frage |
| **Feedback** | Prozessebenen-Feedback auf Fehlvorstellungen, nicht nur Richtig/Falsch |
| **Retrieval Practice** | Freie Antwortformate bevorzugen, aktiven Abruf erzwingen |
| **Coaching & Tutoring** | Feedback ermutigt zum Nachdenken statt Lösungen zu verraten |
| **Webapp Basics** | React-Komponenten, useState für Frage-State und Score |
| **Interaktive Elemente** | Klare Affordances, sofortiges visuelles Feedback |
| **Usability Design** | Reduziertes UI, klare Navigation, Testprotokoll |
| **VibeCoding** | App vollständig via Prompting in Cursor oder Claude erstellt |

### Empfohlener Arbeitsablauf

**Phase 1 — Didaktisches Design (ca. 1–2 Stunden, ohne Computer)**

1. Wähle ein konkretes Thema aus deinem Unterricht. Definiere drei handlungsorientierte Lernziele nach dem ABCD-Modell.
2. Schreibe mindestens 5 Fragen auf Papier — jede mit einer richtigen Antwort und den 2–3 häufigsten Falschantworten, die Lernende in der Realität geben.
3. Formuliere für jede Falschantwort ein fehlerspezifisches Feedback: Welche Fehlvorstellung steckt dahinter? Was ist der nächste Denkschritt?
4. Entscheide dich für einen Fragetyp: Multiple Choice (Auswahl) oder Freitext (Eingabe). Für Retrieval Practice ist Freitext wirkungsvoller — aber schwieriger zu auswerten.

**Phase 2 — Technisches Gerüst (ca. 2–3 Stunden)**

5. Definiere die Datenstruktur deiner Fragen als JavaScript-Array: Jedes Objekt enthält Frage, mögliche Antworten, korrekte Antwort und die Feedback-Texte pro Falschantwort.
6. Erstelle die Grundkomponenten: `QuizQuestion` (zeigt eine Frage an), `AnswerOption` (klickbare Antwort), `FeedbackPanel` (zeigt Feedback nach Antwort), `ProgressBar` (aktueller Stand), `ResultScreen` (Abschluss).
7. Instruiere deine KI schrittweise. Beginne mit der Darstellung einer einzigen Frage, dann füge Interaktivität hinzu, dann Fortschritt, dann Feedback.

**Phase 3 — Qualitätssicherung und Deployment (ca. 1–2 Stunden)**

8. Führe einen Usability-Test mit zwei Personen durch. Notiere, wo sie stocken oder verwirrt sind. Passe die App an.
9. Deploye die App auf Vercel (kostenlos, direkt aus GitHub). Teile die URL mit deiner Lerngruppe.
10. Verlinke die App in deinem App-Konzept-Canvas und ergänze das Canvas um das, was du beim Bauen gelernt hast.

### Reflexionsfragen nach Abschluss

1. **Feedbackqualität:** Lasse deine App von einer Kollegin oder einem Kollegen testen, der das Thema nicht kennt. Hilft das Feedback wirklich beim Verstehen — oder formuliert es nur den Fehler um?

2. **Retrieval-Effekt:** Vergleiche Mental deine App mit einem Lückentext-Arbeitsblatt zu demselben Thema. Was kann die App, was der Arbeitsblatt nicht kann? Und umgekehrt?

3. **Nächste Version:** Wenn du die App in drei Monaten nochmals anpassen dürftest — was wäre das erste Feature, das du hinzufügst? Und warum genau dieses?
