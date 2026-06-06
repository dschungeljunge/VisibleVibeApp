---
id: "software-projektmanagement"
slug: "software-projektmanagement"
title: "Software Projektmanagement"
summary: "Agile Methoden, MVP-Definition und iteratives Release-Management für Bildungssoftware."
category: "Product Design"
level: 4
status: "stable"
video_url: ""
practice_task: |
  Definiere das MVP (Minimum Viable Product) deiner Lernapp in maximal fünf Features. Erstelle für jedes Feature ein Ticket in GitHub Projects oder Trello mit einer User Story (Als [Rolle] möchte ich [Funktion], damit [Nutzen]). Priorisiere die Features nach didaktischer Wirkung, nicht nach technischer Einfachheit.
quality_criteria: |
  - Das MVP ist scharf abgegrenzt: Was ist drin, was kommt nach dem ersten Release?
  - Jedes Ticket enthält eine vollständige User Story mit Rolle, Funktion und Nutzen
  - Die Priorisierung ist explizit didaktisch begründet (nicht: "das ist einfach zu bauen")
  - Ein Kanban-Board mit mindestens den Spalten Backlog / In Progress / Done existiert
resources_markdown: |
  - [Shape Up – Basecamp (kostenlos)](https://basecamp.com/shapeup) - Die agile Methode, die auf Lernprojekte gut übertragbar ist: feste Zeitboxen, klarer Scope.
  - [GitHub Projects Dokumentation](https://docs.github.com/en/issues/planning-and-tracking-with-projects) - Wie man GitHub als Projektmanagement-Tool einsetzt.
  - [User Stories – Mountain Goat Software](https://www.mountaingoatsoftware.com/agile/user-stories) - Einführung in das Format und die Funktion von User Stories.
position_x: 1220
position_y: 60
connections:
  - target: "quiz-webapp"
    type: "required_for_project"
---

## Der Impuls (Relevanz & Dilemma)

Es gibt ein Phänomen in der Softwareentwicklung, das so universell ist, dass es einen Namen hat: **Feature Creep**. Ein Projekt beginnt mit einer klaren Idee — und wächst im Verlauf der Entwicklung durch immer neue Ideen, Wünsche und „wäre-doch-toll"-Ergänzungen, bis aus dem ursprünglichen Kern ein unüberschaubares Konglomerat von halbfertigen Features entstanden ist. Das Endprodukt ist weder fertig noch konsistent — und das eigentliche Lernproblem, das die App lösen sollte, ist im Chaos untergegangen.

Für Lehrpersonen, die zum ersten Mal eine App entwickeln, ist Feature Creep besonders verführerisch. Denn didaktische Ideen kommen schnell: Wäre es nicht toll, wenn Schülerinnen und Schüler auch Notizen hinzufügen könnten? Und Fortschrittssterne? Und ein Klassenpodest? Und Sprachausgabe? Und...

Agiles Projektmanagement setzt dagegen ein klares Gegengewicht: das **Minimum Viable Product (MVP)**. Ein MVP ist die kleinste funktionsfähige Version deiner App, die ein reales Lernproblem löst und bei echten Schülerinnen und Schülern eingesetzt werden kann — ohne ein einziges zusätzliches Feature. Die Frage ist nicht: „Was könnte die App noch leisten?" Die Frage ist: „Was muss die App leisten, damit die erste echte Lernsession stattfinden kann?"

---

## Erarbeitung mit der KI (Exploration)

Nutze einen KI-Chatbot, um die Kernkonzepte agilen Projektmanagements für deinen App-Kontext zu operationalisieren.

**MVP vs. Prototyp vs. fertige App:** Was ist der genaue Unterschied zwischen einem Prototyp (testet eine Designhypothese), einem MVP (liefert echten Nutzen) und einer fertigen App? Lasse dir ein Beispiel aus dem Bildungsbereich zeigen: Wie würde ein MVP einer Vokabel-Lernapp aussehen — und was wäre kein MVP, sondern ein Prototyp?

**User Stories als Designwerkzeug:** User Stories haben das Format „Als [Rolle] möchte ich [Funktion], damit [Nutzen]." Das „damit" ist der entscheidende Teil: Es zwingt zur didaktischen Begründung. Formuliere mit der KI drei User Stories für deine geplante App — je eine aus der Perspektive einer Schülerin, einer Lehrperson und eines Elternteils. Diskutiere: Widersprechen sich die Perspektiven? Was priorisierst du?

**Priorisierung: Value vs. Effort:** Agile Teams priorisieren Features nach dem Verhältnis von Nutzen (Value) zu Aufwand (Effort). Lasse die KI dir erklären, wie eine einfache 2x2-Matrix (High Value / Low Effort oben links, Low Value / High Effort unten rechts) als Priorisierungswerkzeug funktioniert. Platziere mit der KI fünf deiner App-Feature-Ideen auf dieser Matrix.

**Iteration und Release-Zyklen:** Warum ist es besser, alle sechs Wochen eine funktionierende, reduzierte Version zu releasen, als erst nach sechs Monaten eine vollständige? Diskutiere mit der KI am konkreten Beispiel: Was lernst du in einem ersten echten Schuleinsatz deiner MVP-App, das du durch weiteres Bauen im stillen Kämmerlein nie herausgefunden hättest?

---

## Transfer

1. **MVP-Definition:** Schreibe in drei Sätzen, was deine App in ihrer ersten Version können muss — und was explizit nicht dazugehört. Formuliere danach drei Features, die du bewusst aus dem MVP herausgelassen hast, und begründe, warum sie warten können.

2. **Ticket-Erstellung:** Wähle das wichtigste Feature deines MVPs und schreibe dafür ein vollständiges Ticket mit: User Story, Akzeptanzkriterien (wann gilt das Feature als fertig?) und einer groben Aufwandsschätzung (halber Tag / ein Tag / zwei Tage).

3. **Didaktische Priorisierung:** Stelle dir vor, du hast nur noch 10 Entwicklungsstunden. Welches eine Feature deiner Liste hat die grösste didaktische Wirkung pro investierter Stunde? Begründe deine Wahl.

---

## Retrieval-Quiz

**Frage 1:** Eine Lehrperson hat eine Liste mit 22 Feature-Ideen für ihre Lernapp. Sie fragt dich: „Wie finde ich heraus, womit ich anfangen soll?" Beschreibe eine konkrete Methode zur Priorisierung — mit didaktischem Kriterium.

**Frage 2:** Was ist der Unterschied zwischen einer User Story und einer technischen Anforderung (Requirement)? Warum sind User Stories für Lehrpersonen ohne Programmierkenntnisse besonders geeignet, um mit KI-Assistenten zu kommunizieren?

**Frage 3:** Eine Lernapp ist nach drei Monaten Entwicklung immer noch nicht fertig, weil ständig neue Feature-Ideen dazugekommen sind. Welches agile Prinzip wurde verletzt? Wie hätte das verhindert werden können?

**Frage 4:** Warum ist ein echter Schuleinsatz — auch mit einer sehr reduzierten App — wertvoller als weiteres Bauen ohne Nutzertests? Nenne zwei konkrete Erkenntnisse, die man nur durch echten Einsatz gewinnt.
