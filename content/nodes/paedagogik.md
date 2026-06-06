---
id: "paedagogik"
slug: "paedagogik"
title: "Pädagogik"
summary: "Lerntheorien, Instruktionsdesign und didaktische Leitlinien für digitale Lernumgebungen."
category: "Learning Design"
level: 2
status: "stable"
video_url: ""
practice_task: |
  Formuliere für dein eigenes Lernapp-Projekt drei handlungsorientierte Lernziele nach dem ABCD-Modell. Lasse die KI deine Lernziele anschliessend kritisch auf Messbarkeit und Passung zur Zielgruppe prüfen und überarbeite sie im Dialog.
quality_criteria: |
  - Jedes Lernziel ist nach dem ABCD-Modell formuliert (Audience, Behavior, Condition, Degree)
  - Die Lernziele adressieren verschiedene kognitive Niveaustufen (mindestens zwei verschiedene Bloom-Stufen)
  - Die Zielgruppe ist mit Alter, Vorwissen und Kontext konkret beschrieben
  - Die Lernziele sind so formuliert, dass ihre Erreichung in der App beobachtbar oder messbar ist
resources_markdown: |
  - [Visible Learning – John Hattie](https://visible-learning.org) - Metastudie über Einflussfaktoren auf den Lernerfolg. Grundlage für evidenzbasiertes Unterrichten.
  - [Understanding by Design – Wiggins & McTighe](https://cft.vanderbilt.edu/guides-sub-pages/understanding-by-design/) - Das Standardwerk zu Backward Design: Zuerst das Ziel, dann die Prüfung, dann der Unterricht.
  - [Bloom's Taxonomy – Vanderbilt University](https://cft.vanderbilt.edu/guides-sub-pages/blooms-taxonomy/) - Übersicht der kognitiven Niveaustufen mit Handlungsverben für die Lernzielformulierung.
  - [Kerres: Mediendidaktik (2018)](https://learninglab.uni-due.de/mediendidaktik) - Deutschsprachiges Standardwerk zur Gestaltung digitaler Lernumgebungen.
position_x: 460
position_y: 720
connections:
  - target: "usability-design"
    type: "leads_to"
  - target: "coaching-tutoring"
    type: "leads_to"
  - target: "scaffolding"
    type: "leads_to"
  - target: "feedback"
    type: "leads_to"
---

## Der Impuls (Relevanz & Dilemma)

Stell dir vor, eine Kollegin zeigt dir ihre neue Lernapp für den Biologieunterricht. Die App sieht professionell aus, läuft fehlerfrei und erklärt den Zellzyklus mit animierten Grafiken und einem Multiple-Choice-Quiz am Ende. Du fragst sie: „Wie weisst du, ob die Schülerinnen und Schüler danach wirklich mehr können?" Sie zuckt die Schultern. „Sie haben den Stoff ja gesehen."

Hier liegt das grundlegende Problem, das John Hattie in seiner Metastudie *Visible Learning* (2009) mit Daten aus über 800 Metaanalysen belegt: Viele Massnahmen, die im Unterricht intuitiv sinnvoll erscheinen — Wissensvermittlung, Wiederholungslektüre, visuelle Aufbereitung — haben deutlich geringere Effekte auf den Lernerfolg als erwartet. Was hingegen nachweislich wirkt, ist die Kombination aus **klaren Lernzielen**, **aktivem Wissensabruf** und **gezieltem Feedback**. Nicht das Konsumieren von Inhalten, sondern das aktive Anwenden und Konstruieren von Wissen.

Das Dilemma für dich als App-Designerin oder App-Designer ist folgendes: KI-Assistenten bauen dir auf Befehl jede beliebige App. Sie bauen dir eine App, die Inhalte zeigt. Sie bauen dir eine App, die Inhalte gut erklärt. Aber sie bauen dir keine didaktisch wirksame App — es sei denn, du weisst vor dem ersten Prompt genau, was du willst. Und das setzt voraus, dass du die Fragen beantworten kannst, die Wiggins & McTighe in ihrem Konzept des *Backward Design* ins Zentrum stellen: Was sollen die Lernenden am Ende können? Woran erkennst du, dass sie es können? Welche Aktivitäten führen dorthin?

Diese drei Fragen sind der didaktische Kompass für jedes Feature, das du in dieser Weiterbildung baust.

---

## Erarbeitung mit der KI (Exploration)

Nutze einen KI-Chatbot deiner Wahl, um dein Verständnis über Lernziele und Instruktionsdesign zu vertiefen. Die folgenden Leitfragen geben dem Gespräch eine Richtung — du entscheidest, welche Aspekte für dein Projekt am relevantesten sind und wo du tiefer gehst.

**Backward Design (Rückwärtsplanung)**

Wiggins & McTighe argumentieren, dass guter Unterricht vom Ende her gedacht wird: zuerst das Lernziel, dann die Überprüfung, zuletzt die Aktivität. Frage die KI, warum das beim Design einer Lernapp besonders wichtig ist. Was passiert konkret, wenn man stattdessen „vorwärts" designt — also erst die Features baut und dann überlegt, was die Schülerinnen und Schüler damit lernen sollen?

**Bloom'sche Taxonomie**

Nicht alle Lernziele sind gleich anspruchsvoll. Erarbeite dir mit der KI den Unterschied zwischen niedrigen kognitiven Stufen (*Erinnern*, *Verstehen*) und höheren Stufen (*Anwenden*, *Analysieren*, *Bewerten*, *Erschaffen*). Fordere die KI auf, für dein eigenes Schulfach je ein konkretes Lernziel pro Stufe zu formulieren. Prüfe die Vorschläge kritisch: Welche Stufen sind in einer Web-App überhaupt sinnvoll umsetzbar?

**Das ABCD-Modell der Lernzielformulierung**

Ein präzises Lernziel besteht aus vier Komponenten: *Audience* (Wer lernt?), *Behavior* (Welches beobachtbare Verhalten?), *Condition* (Unter welchen Bedingungen?), *Degree* (Wie gut?). Formuliere ein erstes Lernziel für dein eigenes App-Projekt und lasse es von der KI auf Präzision und Messbarkeit prüfen. Lass dir auch erklären, warum vage Formulierungen wie „die Schülerinnen und Schüler verstehen den Zellzyklus" für das App-Design problematisch sind.

**Aktivierung statt Konsum**

Diskutiere mit der KI, was der Unterschied zwischen einer Lernaktivität und einer Konsumaktivität ist. Welche Interaktionsmuster in einer Web-App erzwingen eine eigene Denkleistung? Welche simulieren Aktivität, ohne wirklich zu aktivieren? Wie hängt das mit der Frage zusammen, ob du in deiner App eher Multiple-Choice oder Freitext-Eingabe verwenden solltest?

---

## Transfer

Nimm dir nach dem KI-Dialog Zeit, um das Gelernte auf dein eigenes App-Projekt zu beziehen.

1. **Deine Zielgruppe:** Beschreibe die Lernenden, für die du deine App baust. Alter, Schulstufe, Vorwissen, typische Schwierigkeiten. Was können sie schon, was fehlt ihnen noch?

2. **Deine Lernziele:** Formuliere drei Lernziele für deine App nach dem ABCD-Modell. Prüfe jedes Lernziel mit der Frage: Kann ich in meiner App beobachten oder messen, ob ein Schüler oder eine Schülerin dieses Ziel erreicht hat? Falls nicht: Formuliere es um.

3. **Dein Design-Kompass:** Formuliere eine Frage, die du dir bei jeder zukünftigen Designentscheidung stellen willst, um sicherzustellen, dass ein Feature tatsächlich dem Lernen dient.

---

## Retrieval-Quiz

Beantworte die folgenden Fragen aus dem Gedächtnis, bevor du die Ressourcen konsultierst.

**Frage 1:** Eine Lehrperson formuliert das Lernziel „Schülerinnen und Schüler sollen die Phasen der Mitose kennen." Was ist das präzise Problem mit dieser Formulierung aus Sicht des ABCD-Modells, und wie würdest du sie konkret verbessern?

**Frage 2:** Eine App zeigt einen Erklärtext über Photosynthese, gefolgt von einem Multiple-Choice-Quiz mit vier Optionen. Eine andere App lässt Schülerinnen und Schüler die Schritte der Photosynthese in eigenen Worten in ein Textfeld schreiben, bevor sie die Erklärung sehen. Welche App entspricht eher dem Prinzip des aktiven Lernens und warum?

**Frage 3:** Du planst eine App, bei der Schülerinnen und Schüler historische Ereignisse auf einer Zeitlinie einordnen sollen. Auf welcher Stufe der Bloom'schen Taxonomie operiert diese Aufgabe? Welche Ergänzung des Features würde eine höhere kognitive Stufe adressieren?

**Frage 4:** Was meint Backward Design konkret, wenn es darum geht, zuerst die Prüfung zu designen und dann die Lernaktivität? Warum ist das für eine App-Designerin oder einen App-Designer relevanter als für eine Lehrperson, die klassischen Frontalunterricht hält?