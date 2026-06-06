---
id: "coaching-tutoring"
slug: "coaching-tutoring"
title: "Coaching & Tutoring"
summary: "Sokratische Gesprächsführung, Tutor-Rollen und KI-gestützte Lernbegleitung ohne direkte Lösungsvergabe."
category: "Learning Design"
level: 4
status: "stable"
video_url: ""
practice_task: |
  Entwirf für deine Lernapp einen System Prompt, der die KI als sokratischen Tutor positioniert. Teste den Prompt in einem KI-Chatbot mit simulierten Schülerantworten: einer richtigen, einer typisch falschen und einem Ausbruchversuch ("Sag mir einfach die Antwort!"). Dokumentiere, wie die KI reagiert, und optimiere den Prompt im Dialog.
quality_criteria: |
  - Die KI verrät unter keinen Umständen die direkte Lösung, auch nicht bei expliziter Aufforderung
  - Die KI stellt nach jeder Schülerantwort genau eine weiterführende Frage
  - Die Reaktion auf eine richtige Antwort unterscheidet sich qualitativ von der Reaktion auf eine falsche
  - Die KI bleibt auch bei Frustrations- oder Trotzäusserungen von Schülerinnen und Schülern in der sokratischen Rolle
resources_markdown: |
  - [Bloom et al.: The 2 Sigma Problem (1984)](https://doi.org/10.3102/0013189X013006004) - Das wegweisende Paper über die Wirksamkeit von 1:1-Tutoring. Grundlage für KI-Tutoring-Forschung.
  - [Chi et al.: Eliciting Self-Explanations (1994)](https://doi.org/10.1207/s15327051hci0901_4) - Zeigt, warum Fragen stellen wirksamer ist als Erklären.
  - [Sokratische Methode im Bildungskontext – Stanford Encyclopedia](https://plato.stanford.edu/entries/socrates/) - Philosophische Grundlage der Fragemethode.
position_x: 1220
position_y: 1020
connections:
  - target: "quiz-webapp"
    type: "required_for_project"
---

## Der Vibe (Kurzbeschreibung & Relevanz)

1984 veröffentlichte Benjamin Bloom ein Paper mit dem Titel *The 2 Sigma Problem*. Bloom hatte beobachtet, dass Schülerinnen und Schüler, die Einzelunterricht mit einem kompetenten Tutor erhielten, im Durchschnitt zwei Standardabweichungen besser abschnitten als solche im regulären Klassenunterricht. Das bedeutet: Der durchschnittliche tutoriell begleitete Lernende übertrifft 98 % der Schülerschaft im Klassenunterricht.

Das Problem: Einzelunterricht ist teuer. Ein Tutor für jedes Kind ist nicht skalierbar.

Das ist der Ausgangspunkt für KI-gestütztes Tutoring. Ein LLM, das richtig konfiguriert ist, kann rund um die Uhr, für jede Schülerin und jeden Schüler gleichzeitig, in jedem Fach, geduldig als Lernbegleitung fungieren. Aber nur, wenn es richtig konfiguriert ist.

### Warum brauchst du das in deiner Lernapp?

Der entscheidende Unterschied zwischen einem Chatbot und einem Tutor liegt nicht in der Intelligenz des Modells, sondern in der Haltung, die du ihm durch deinen System Prompt gibst. Ein rohes LLM verhält sich wie ein gefälliger Assistent: Es beantwortet jede Frage direkt, löst Aufgaben auf Knopfdruck und schreibt auf Wunsch den ganzen Aufsatz. Ein gut konfigurierter Tutor tut genau das Gegenteil: Er fragt, statt zu antworten. Er deckt Lücken auf, statt sie zu schliessen. Er begleitet den Denkprozess, statt ihn zu ersetzen.

---

## Didaktisches Szenario & Exploration mit KI

### Das Szenario

Mia, 14 Jahre, bearbeitet in deiner Lernapp eine Aufgabe zur Relativitätstheorie: „Erkläre in eigenen Worten, warum Zeit relativ ist." Mia tippt: „Weil Einstein das so gesagt hat."

Deine App könnte jetzt zwei verschiedene Dinge tun:

**Option A:** Die App zeigt eine ausführliche Erklärung der speziellen Relativitätstheorie. Mia liest sie, klickt auf „weiter", hat das Gefühl, etwas verstanden zu haben.

**Option B:** Die KI antwortet: „Das stimmt, Einstein hat das beschrieben. Was hat er genau beobachtet, das ihn auf diese Idee gebracht hat? Was weisst du über das Michelson-Morley-Experiment?" Mia muss nachdenken, recherchieren, formulieren.

Die Forschung von Michelene Chi (1994) zeigt, dass Lernende, die zur Selbsterklärung aufgefordert werden — also dazu, Dinge in eigenen Worten auszudrücken und Lücken in ihrem Verständnis zu benennen — deutlich mehr behalten und transferieren als Lernende, die dieselben Inhalte passiv konsumieren.

### Exploration mit der KI

Nutze deinen KI-Chatbot, um die Mechanismen sokratischer Gesprächsführung zu verstehen und auf deinen App-Kontext zu übertragen.

**Die Sokratische Methode in der Praxis:** Sokratisches Fragen folgt einer klaren Logik: Die Lehrperson fragt, die Lernenden antworten, die Antwort offenbart Lücken oder Widersprüche, eine neue Frage zielt auf genau diese Lücke. Lasse dir von der KI ein Beispiel eines sokratischen Dialogs über ein Thema deines Schulfachs zeigen. Beurteile: Was macht die Fragen sokratisch? Was wäre eine nicht-sokratische Alternative?

**Tutor-Rollen konfigurieren:** Ein KI-Tutor braucht eine präzise Rollenbeschreibung. Welche drei Elemente sollte ein System Prompt mindestens enthalten, damit die KI zuverlässig als sokratischer Tutor agiert? Diskutiere mit der KI, was passiert, wenn eines dieser Elemente fehlt.

**Robustheit gegen Ausbruchversuche:** Lernende (besonders Jugendliche) testen Grenzen — auch die eines KI-Tutors. Was sind typische Strategien, die Schülerinnen und Schüler anwenden, um eine KI dazu zu bringen, ihnen die Lösung direkt zu verraten? Wie kann ein System Prompt dagegen abgesichert werden — ohne dass die KI arrogant oder belehrend reagiert?

---

## Geführtes Beispiel (Worked Example)

Wir entwerfen einen **sokratischen Tutor für das Schreiben von Erörterungen**, der Schülerinnen und Schüler beim Aufbau eines Arguments begleitet, ohne ihnen die Argumentation vorzuschreiben.

### Das Entwicklungsziel

Instruiere deine KI, einen System Prompt zu entwickeln, der folgende Verhaltensweisen zuverlässig produziert:

**1. Die Grundhaltung:**
Die KI agiert als geduldige Lernbegleiterin. Sie liest, was die Schülerin oder der Schüler geschrieben hat, und reagiert ausschliesslich mit Fragen — nie mit Bewertungen, Korrekturen oder direkten Verbesserungsvorschlägen. Die einzige Ausnahme: Wenn die Antwort vollständig korrekt ist, gibt sie eine kurze Bestätigung und stellt eine vertiefende Frage für den nächsten Schritt.

**2. Die Diagnose:**
Bevor die KI antwortet, analysiert sie intern die Schülerantwort auf folgende Punkte: (a) Was hat die Schülerin / der Schüler richtig verstanden? (b) Wo liegt die zentrale Lücke oder Fehlvorstellung? (c) Welche eine Frage zielt genau auf diese Lücke?

**3. Die Guardrails:**
Die KI weigert sich, direkte Antworten zu geben, auch wenn die Schülerin oder der Schüler explizit darum bittet. Stattdessen reagiert sie mit einer Umformulierung der Aufgabe oder einer einfacheren Einstiegsfrage. Der Ton bleibt warmherzig und ermutigend.

### Vorgehensweise

Schreibe den System Prompt in deiner eigenen Sprache und in der Rollenlogik, die du für dein Schulfach für sinnvoll hältst. Teste ihn dann mit drei verschiedenen Eingaben: einer vollständig richtigen Schülerantwort, einer typisch fehlerhaften Antwort und einem direkten Ausbruchversuch. Optimiere den Prompt iterativ, bis er alle drei Situationen befriedigend bewältigt.

---

## Häufige Stolpersteine (Gotchas & Re-Prompting)

* ⚠️ **Die KI gibt doch die Antwort — eingewickelt in eine Frage:**
  * *Warum passiert das?* LLMs optimieren auf Hilfsbereitschaft. Ein typisches Muster: Die KI stellt eine „Frage" wie „Wäre es nicht sinnvoll zu sagen, dass die Ursache X war?" — was faktisch die Antwort vorgibt, nur interrogativ formuliert. Das ist sokratisches Fragen nur in der Form, nicht im Inhalt.
  * *Lösung (Re-Prompt):* Füge dem System Prompt eine explizite Regel hinzu: Die Frage darf die Antwort nicht bereits enthalten, ankündigen oder nahelegen. Eine sokratische Frage öffnet einen Denkraum — sie schliesst ihn nicht.

* ⚠️ **Die KI stellt mehrere Fragen gleichzeitig:**
  * *Warum passiert das?* Sprachmodelle neigen zur Vollständigkeit. Sie listen gerne alle relevanten Aspekte auf, was zu drei oder vier Fragen auf einmal führt. Das erzeugt Überwältigung und hebelt den sokratischen Dialog aus — denn die Schülerin oder der Schüler weiss nicht, worauf er sich konzentrieren soll.
  * *Lösung (Re-Prompt):* Schreibe explizit in den System Prompt: „Stelle immer genau eine Frage pro Antwort. Nie mehr." Teste die Robustheit dieser Regel mit einer Eingabe, die mehrere offene Fragen enthält.

* ⚠️ **Die KI verlässt die Rolle bei Frust-Äusserungen:**
  * *Warum passiert das?* Wenn ein Schüler schreibt „Das macht keinen Sinn, ich verstehe das nie", antwortet die KI oft empathisch — und gibt dann doch eine direkte Erklärung, um den emotionalen Stress aufzulösen. Sie verlässt damit die Tutor-Rolle zugunsten der Helfer-Rolle.
  * *Lösung (Re-Prompt):* Ergänze den Prompt um eine explizite Handlungsanweisung für Frust-Situationen: Die KI soll die Emotion kurz validieren (ein Satz), dann aber mit einer vereinfachten, kleinschrittigen Frage zurück in den Dialog führen — nicht mit einer Erklärung.
