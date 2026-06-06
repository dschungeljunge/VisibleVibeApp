---
id: "cognitive-load-management"
slug: "cognitive-load-management"
title: "Cognitive Load Management"
summary: "Arbeitsgedächtnis, kognitive Belastungstypen und UI-Prinzipien für lernförderliches Design."
category: "UX Design"
level: 6
status: "stable"
video_url: ""
practice_task: |
  Analysiere deine eigene Lernapp (oder eine bestehende App deiner Wahl). Identifiziere drei UI-Elemente oder Designentscheidungen, die den extraneous load unnötig erhöhen. Formuliere für jedes Element eine konkrete Verbesserungsempfehlung mit didaktischer Begründung.
quality_criteria: |
  - Die drei Elemente sind konkret benannt (nicht nur „das Design ist unübersichtlich")
  - Jede Analyse unterscheidet, ob es sich um intrinsic, extraneous oder germane load handelt
  - Die Verbesserungsempfehlungen sind umsetzbar und didaktisch begründet
  - Die Analyse berücksichtigt die spezifische Zielgruppe (Alter, Vorwissen, Kontext)
resources_markdown: |
  - [Sweller: Cognitive Load Theory (1988)](https://doi.org/10.1207/s15516709cog1202_4) - Das Originalpaper, das die Cognitive Load Theory begründet hat.
  - [Mayer: Multimedia Learning (2009)](https://www.cambridge.org/core/books/multimedia-learning/B820D8895C7BC8D0D8BCE3CFB0BA82C5) - Die wichtigsten Prinzipien für die Gestaltung multimedialer Lernumgebungen (Coherence, Signaling, Contiguity u. a.).
  - [Nielsen Norman Group: Cognitive Load](https://www.nngroup.com/articles/minimize-cognitive-load/) - Praxisnaher Artikel über UX-Design-Strategien zur Reduktion kognitiver Belastung.
position_x: 1980
position_y: 780
connections:
  - target: "dashboard"
    type: "required_for_project"
  - target: "adaptive-lernumgebung"
    type: "required_for_project"
---

## Der Impuls (Relevanz & Dilemma)

John Sweller entwickelte die Cognitive Load Theory in den späten 1980er Jahren, um ein paradoxes Phänomen zu erklären: Lernumgebungen, die auf den ersten Blick ansprechend und reich an Informationen wirken, führen oft zu schlechteren Lernresultaten als reduzierte, schlichtere Umgebungen.

Der Grund liegt in den Grenzen des menschlichen Arbeitsgedächtnisses. Das Arbeitsgedächtnis — jener Teil des Gedächtnisses, in dem aktive Denkprozesse stattfinden — kann gleichzeitig nur 4 bis 7 Informationseinheiten verarbeiten (Miller, 1956). Wenn eine Lernapp das Arbeitsgedächtnis mit Navigation, Animationen, Tondateien, bunten Grafiken und Erklärtexten gleichzeitig belastet, bleibt für das eigentliche Lernen — also das Verknüpfen neuer Informationen mit Vorwissen — keine Kapazität mehr übrig.

Sweller unterscheidet drei Arten kognitiver Belastung:

**Intrinsic Load** entsteht durch die inhärente Komplexität des Lernstoffs selbst. Das Lösen einer Differentialgleichung erzeugt mehr intrinsic load als das Einmaleins. Dieser Typ lässt sich nicht eliminieren — nur durch geeignete Sequenzierung und Scaffolding reduzieren.

**Extraneous Load** entsteht durch schlechtes didaktisches oder visuelles Design: irrelevante Bilder, ablenkende Animationen, inkonsistente Navigation, überflüssige Text-Bild-Doppelungen. Dieser Typ lässt sich durch bewusstes Design vollständig vermeiden — und sollte es auch.

**Germane Load** ist die kognitive Anstrengung, die direkt dem Lernen dient: das Verknüpfen neuer Konzepte, das Erkennen von Mustern, das Aufbauen von Schemata. Gutes Design maximiert die verfügbare Kapazität für diesen Typ, indem es extraneous load konsequent eliminiert.

Richard Mayer übertrug diese Erkenntnisse in zwölf empirisch belegte Gestaltungsprinzipien für multimediale Lernumgebungen — darunter das **Kohärenzprinzip** (irrelevante Materialien weglassen, auch wenn sie interessant sind), das **Signalisierungsprinzip** (Schlüsselbegriffe hervorheben) und das **Segmentierungsprinzip** (komplexe Inhalte in lernbare Einheiten aufteilen).

---

## Erarbeitung mit der KI (Exploration)

Nutze einen KI-Chatbot, um die Cognitive Load Theory für dein App-Design zu operationalisieren.

**Die drei Load-Typen in konkreten App-Beispielen**

Lass dir die drei Lasttypen an konkreten Beispielen aus Lern-Apps erklären. Fordere die KI auf, für jede der folgenden Design-Entscheidungen zu bestimmen, welchen Load-Typ sie primär erhöht: (a) ein Hintergrundvideo in der Lernapp, (b) eine zu lange Aufgabenstellung in einem Quiz, (c) eine Lernapp, die Vokabeln und Grammatikregeln gleichzeitig auf dem Bildschirm zeigt. Prüfe die Einschätzungen kritisch — gibt es Fälle, wo mehrere Typen gleichzeitig erhöht werden?

**Mayers Prinzipien im App-Kontext**

Lass dir das Kohärenzprinzip, das Signalisierungsprinzip und das Modalitätsprinzip (Text und Bild statt Text und Text) erklären. Fordere konkrete Beispiele aus Lernapp-Designs. Welche dieser Prinzipien sind in deiner geplanten App besonders relevant? Welche verletzt typisches KI-generiertes UI per Default — und wie müsstest du dagegen prompten?

**Chunking und Sequenzierung**

Das Arbeitsgedächtnis lässt sich durch Chunking entlasten: das Bündeln einzelner Informationen zu sinnvollen Einheiten. Wie lässt sich Chunking im Design einer Lernapp umsetzen? Diskutiere mit der KI: Was ist der Unterschied zwischen einer App, die alle 20 Vokabeln gleichzeitig anzeigt, und einer, die jeweils 5 in einem Set gruppiert?

---

## Transfer

1. **Load-Analyse deiner App:** Betrachte das Design deiner geplanten Lernapp (oder eine Skizze davon) und identifiziere: Welche Elemente erzeugen intrinsic load (unvermeidbar), welche extraneous load (vermeidbar), welche germane load (erwünscht)?

2. **Mayer-Check:** Wähle drei von Mayers Gestaltungsprinzipien aus und prüfe dein App-Design damit. Gibt es Elemente, die du auf Basis dieser Prinzipien eliminieren oder verändern würdest?

3. **Prompt-Strategie:** KI-generiertes UI tendiert dazu, extraneous load zu erhöhen — durch übermässige Animationen, bunte Farbakzente und zu viele parallele Informationsstränge. Überlege: Welche Instruktionen gibst du deiner KI von Anfang an mit, um ein kognitiv entlastendes Design zu erzeugen?

---

## Retrieval-Quiz

**Frage 1:** Eine Lernapp zeigt beim Vokabellernen gleichzeitig das Wort auf Deutsch, das Wort auf Englisch, ein Bild des Gegenstands, ein Audiobeispiel und drei Beispielsätze. Analysiere diese Situation aus Sicht der Cognitive Load Theory: Welche Load-Typen sind erhöht, welcher ist möglicherweise zu niedrig? Was würdest du konkret verändern?

**Frage 2:** Mayers Kohärenzprinzip besagt, dass das Weglassen interessanter, aber irrelevanter Materialien das Lernen verbessert. Eine Lehrperson möchte trotzdem motivierende Bilder einbauen. Wie löst du diesen Widerspruch — und welchen Kompromiss würdest du ihr empfehlen?

**Frage 3:** Du baust eine App für 6-Jährige (geringes Vorwissen, kurze Aufmerksamkeitsspanne) und eine für 16-Jährige (höheres Vorwissen, stärkere Konzentrationsfähigkeit). Wie verändert sich die ideale kognitive Belastung in den beiden Apps? Was folgt daraus für das jeweilige Design?

**Frage 4:** Deine KI generiert eine Lernapp mit einem lebhaften animierten Hintergrund und Soundeffekten bei jeder Antwort. Du weisst, dass das extraneous load erzeugt. Formuliere in eigenen Worten einen Re-Prompt, der die KI anweist, diese Designentscheidungen zu überarbeiten — ohne „Cognitive Load Theory" oder Fachtermini zu benutzen.
