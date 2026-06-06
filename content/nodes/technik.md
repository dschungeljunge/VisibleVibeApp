---
id: "technik"
slug: "technik"
title: "Technik"
summary: "Client-Server-Architektur, Web-Technologien und die Werkzeuge des modernen Web-Developments."
category: "Product Design"
level: 2
status: "stable"
video_url: ""
practice_task: |
  Öffne die Browser-Entwicklerwerkzeuge (F12) auf einer beliebigen Website und beobachte den Netzwerk-Tab. Lade die Seite neu. Erkläre anschliessend in 3–4 Sätzen, was du siehst, und ordne es dem Client-Server-Modell zu. Lasse die KI deine Erklärung überprüfen.
quality_criteria: |
  - Die Begriffe Client, Server, Request und Response werden korrekt verwendet
  - Der Unterschied zwischen HTML, CSS und JavaScript ist klar beschrieben
  - Du kannst erklären, warum eine Lernapp mit Datenbankanbindung eine serverseitige Komponente braucht
  - Die lokale Entwicklungsumgebung (Code-Editor, Terminal) ist eingerichtet und funktionsfähig
resources_markdown: |
  - [MDN Web Docs: How the Web works](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works) - Das beste Einführungsartikel zum Client-Server-Modell, kostenlos und präzise.
  - [VS Code – Download](https://code.visualstudio.com) - Der meistgenutzte Code-Editor, empfohlen für diesen Kurs.
  - [Cursor – Download](https://cursor.sh) - KI-gestützter Code-Editor, auf dem ein Grossteil des Vibe Codings in diesem Kurs stattfindet.
  - [MDN: HTML Basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics) - Kurze, präzise Einführung in HTML-Struktur und Elemente.
position_x: 460
position_y: 480
connections:
  - target: "ki-llms"
    type: "leads_to"
  - target: "vibecoding"
    type: "leads_to"
---

## Der Impuls (Relevanz & Dilemma)

Du hast eine fertige Lernapp im Browser geöffnet. Du siehst ein Eingabefeld, tippst eine Antwort, klickst auf „Prüfen" — und sofort erscheint farbiges Feedback. Die App funktioniert. Aber was passiert eigentlich zwischen deinem Klick und dem Feedback?

Für viele Lehrpersonen ist das eine Blackbox. Und das ist meist kein Problem — bis zur App-Entwicklung. Wenn du mit einem KI-Assistenten eine App baust und er dir schreibt: *„Ich erstelle eine serverseitige Route, die die Anfrage an die OpenAI-API weiterleitet"* — was bedeutet das? Wenn du die KI fragst, warum eine bestimmte Funktion nicht funktioniert, und sie antwortet: *„Das liegt daran, dass du einen asynchronen Fetch-Call in einem synchronen Kontext verwendest"* — wie prüfst du, ob das stimmt?

Du musst kein Entwickler werden. Aber du brauchst ein mentales Modell davon, wie eine Web-App aufgebaut ist. Nicht um selbst zu programmieren, sondern um **die richtigen Fragen zu stellen**, **die Antworten der KI einzuordnen** und **zu erkennen, wenn etwas strukturell falsch ist**. Dieses mentale Modell heisst Client-Server-Architektur, und es ist die konzeptuelle Grundlage für alles, was in diesem Kurs folgt.

---

## Erarbeitung mit der KI (Exploration)

Nutze einen KI-Chatbot deiner Wahl, um das Client-Server-Modell und die Grundbausteine des Webs eigenständig zu erarbeiten. Die folgenden Leitfragen strukturieren das Gespräch — geh so tief, wie es für dein Projekt relevant ist.

**Das Client-Server-Modell**

Lass dir das Grundprinzip erklären: Was ist ein Client, was ist ein Server? Was passiert, wenn du in deinem Browser eine URL eingibst — Schritt für Schritt, von der Eingabe bis zur angezeigten Seite? Fordere die KI auf, die Erklärung mit einer Alltagsanalogie zu verknüpfen (z. B. Bestellung in einem Restaurant). Prüfe danach: Passt die Analogie? Wo hört sie auf zu funktionieren?

**HTML, CSS und JavaScript: die drei Schichten**

Jede Web-Seite, die du im Browser siehst, besteht aus drei Teilen, die unterschiedliche Aufgaben haben. Lasse dir erklären: Was ist die Aufgabe von HTML (Struktur), CSS (Darstellung) und JavaScript (Verhalten)? Welche der drei Sprachen ist für deine Lernapp vermutlich am wichtigsten, wenn du interaktive Lernaufgaben bauen willst?

**Frontend und Backend: wo passiert was?**

Manche Dinge passieren im Browser (Frontend), andere auf einem externen Computer im Internet (Backend). Frage die KI: Welche Teile einer typischen Lernapp laufen im Frontend, welche im Backend? Warum wäre es ein Sicherheitsproblem, einen KI-API-Key im Frontend zu speichern? Was genau ist eine API, und wie unterscheidet sie sich von einer Webseite?

**Entwicklungsumgebung einrichten**

Lass dich von der KI durch die Einrichtung deiner lokalen Entwicklungsumgebung führen: Code-Editor (VS Code oder Cursor), Terminal, Node.js. Falls du Cursor noch nicht kennst: Frage die KI, was ihn von VS Code unterscheidet und warum er für Vibe Coding besonders geeignet ist.

---

## Transfer

Beziehe das Gelernte auf dein App-Projekt aus dem KickOff-Canvas:

1. **Architekturentscheidung:** Braucht deine App ein Backend — oder reicht ein reines Frontend? Überlege: Willst du Nutzerdaten dauerhaft speichern? Willst du eine KI-API einbinden? Willst du, dass verschiedene Personen auf dieselben Daten zugreifen können? Jedes „Ja" deutet auf ein Backend hin.

2. **Technologieentscheidung:** In diesem Kurs verwenden wir Next.js als Framework (das sowohl Frontend als auch Backend in einem Projekt vereint). Frage die KI, was Next.js von einem einfachen HTML-File unterscheidet — und in welchen Fällen ein einfaches HTML-File tatsächlich die bessere Wahl wäre.

3. **Dein mentales Modell:** Zeichne auf einem Blatt Papier oder in einem digitalen Tool eine einfache Skizze deiner zukünftigen App-Architektur: Wo sitzt der Browser (Client)? Wo sitzt der Server? Was fliegt hin, was kommt zurück?

---

## Retrieval-Quiz

**Frage 1:** Eine Lehrperson baut eine Vokabel-Lernapp. Sie möchte, dass Schülerinnen und Schüler einloggen können und ihr persönlicher Fortschritt gespeichert wird. Braucht sie dafür ein Backend? Begründe in 2–3 Sätzen, warum oder warum nicht.

**Frage 2:** Erkläre den Unterschied zwischen HTML und JavaScript mit je einem konkreten Beispiel aus dem Kontext einer Lernapp.

**Frage 3:** Ein KI-Assistent antwortet auf eine Debugging-Frage: „Das Problem liegt im asynchronen Fetch-Request — du musst `await` verwenden." Du weisst nicht, was das genau bedeutet. Welche zwei Folgefragen würdest du der KI stellen, um die Antwort einordnen zu können, ohne die Technologie selbst zu kennen?

**Frage 4:** Was ist der Unterschied zwischen einer API und einer Webseite? Und warum ist diese Unterscheidung wichtig, wenn du eine KI in deine Lernapp einbinden willst?
