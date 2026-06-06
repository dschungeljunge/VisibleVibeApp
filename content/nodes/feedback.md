---
id: "feedback"
slug: "feedback"
title: "Feedback"
summary: "Feedback-Schleifen, Fehlerdidaktik und lernförderliche Rückmeldungen in digitalen Lernumgebungen."
category: "Learning Design"
level: 4
status: "stable"
video_url: ""
practice_task: |
  Entwirf für deine Lernapp ein Feedback-System für drei typische Fehler, die Lernende bei einer konkreten Aufgabe machen. Das Feedback soll die Fehlvorstellung benennen, nicht nur die falsche Antwort — und einen konkreten nächsten Denkschritt geben.
quality_criteria: |
  - Das Feedback unterscheidet mindestens drei verschiedene Fehlertypen mit jeweils eigener Rückmeldung
  - Jede Rückmeldung benennt die dahinterliegende Fehlvorstellung (nicht nur „falsch")
  - Das Feedback gibt einen konkreten nächsten Schritt (kein „Versuche es nochmals")
  - Das Feedback ist kürzer als 3 Sätze und für die Zielgruppe sprachlich angemessen
resources_markdown: |
  - [Hattie & Timperley: The Power of Feedback (2007)](https://doi.org/10.3102/003465430298487) - Die meistzitierte Studie zum Thema Feedback im Bildungskontext. Unterscheidet vier Feedback-Ebenen mit unterschiedlicher Wirksamkeit.
  - [Shute: Focus on Formative Feedback (2008)](https://doi.org/10.3102/0034654307313795) - Umfassender Review zur Wirkung von Feedback in computerbasierten Lernumgebungen.
  - [Dylan Wiliam: Embedded Formative Assessment](https://www.solutiontree.com/embedded-formative-assessment.html) - Praktisches Buch zur Umsetzung formativer Bewertung im Schulalltag.
position_x: 1220
position_y: 1260
connections:
  - target: "retrieval-practice"
    type: "leads_to"
---

## Der Impuls (Relevanz & Dilemma)

In der Hattie-Metastudie *Visible Learning* (2009) ist Feedback einer der stärksten Einflussfaktoren auf den Lernerfolg — mit einer durchschnittlichen Effektstärke von d = 0.73. Das klingt eindeutig. Aber Hattie und Helen Timperley zeigen in ihrer 2007 veröffentlichten Analyse des Forschungsfelds, dass Feedback auch einer der variabelsten Faktoren ist: je nach Art des Feedbacks kann es den Lernerfolg massiv stärken oder tatsächlich schaden.

Der entscheidende Unterschied liegt nicht in der Menge des Feedbacks, sondern in seinem Inhalt. Hattie und Timperley unterscheiden vier Ebenen:

- **Aufgabenebene (Task):** „Das ist falsch." Schwache Lernwirkung.
- **Prozessebene (Process):** „Diese Strategie führt zum Fehler, weil..." Starke Lernwirkung.
- **Selbstregulationsebene (Self-regulation):** „Wie könntest du deinen Lösungsansatz selbst überprüfen?" Sehr starke Lernwirkung.
- **Personenebene (Self):** „Du bist so klug!" Schlechteste aller Ebenen — schadet dem Lernen.

Für dich als App-Designerin oder App-Designer entsteht daraus ein konkretes Designproblem. Die meisten einfachen Lernapps operieren auf der Aufgabenebene: grüner Haken für richtig, rotes Kreuz für falsch. Das ist implementierungstechnisch einfach — und didaktisch schwach. Sobald du anfängst, auf der Prozessebene zu feedback, brauchst du Informationen, die du zunächst gar nicht hast: Was ist die häufige Fehlvorstellung hinter einer falschen Antwort? Warum scheitern Lernende, nicht nur wo?

---

## Erarbeitung mit der KI (Exploration)

Nutze einen KI-Chatbot, um die Konzepte rund um formatives Feedback eigenständig zu vertiefen. Die folgenden Leitfragen geben eine Richtung.

**Die vier Feedback-Ebenen in der Praxis**

Lasse dir die vier Feedback-Ebenen von Hattie & Timperley mit konkreten Beispielen aus deinem eigenen Schulfach erklären. Fordere die KI auf, für ein und dieselbe Schülerantwort Feedback auf allen vier Ebenen zu formulieren. Beurteile selbst: Welche Version würdest du in deiner App umsetzen wollen? Was braucht es technisch und inhaltlich dafür?

**Formatives vs. summatives Feedback**

Was unterscheidet formatives Feedback (das den Lernprozess begleitet) von summativem Feedback (das am Ende bewertet)? Warum ist der Zeitpunkt des Feedbacks entscheidend? Frage die KI: Was wäre in einer digitalen Lernapp ein Beispiel für summatives Feedback, das sich fälschlicherweise als formatives ausgibt?

**Fehlvorstellungen als Designgrundlage**

Die Forschung zeigt, dass viele Fehler von Lernenden keine zufälligen Flüchtigkeitsfehler sind, sondern systematische Fehlvorstellungen. Beispiel Mathematik: Viele Schülerinnen und Schüler glauben, dass Multiplikation immer eine grössere Zahl ergibt — was bei Dezimalzahlen falsch ist. Lasse dir von der KI für dein Schulfach drei häufige systematische Fehlvorstellungen nennen. Diskutiere: Wie würde ein lernwirksames Feedback auf genau diese Fehlvorstellung aussehen?

**Feedback und Motivation**

Es gibt eine Spannung zwischen lernwirksamem und motivierendem Feedback. Sofortiges Korrektur-Feedback ist lernwirksam, aber es kann Lernende entmutigen, wenn sie immer wieder scheitern. Welche Strategien gibt es, Feedback so zu gestalten, dass es korrektiv und ermutigend zugleich ist?

---

## Transfer

1. **Fehlvorstellungen kartieren:** Wähle eine konkrete Aufgabenstellung aus deiner geplanten Lernapp. Notiere drei häufige Fehler, die Lernende dabei machen. Beschreibe für jeden Fehler: Was ist die dahinterliegende Fehlvorstellung?

2. **Feedback auf Prozessebene entwerfen:** Formuliere für jeden der drei Fehler ein Feedback, das die Fehlvorstellung benennt und einen konkreten nächsten Denkschritt vorgibt. Nicht: „Das ist leider falsch." Sondern: „Du hast X angenommen, aber in diesem Fall gilt Y, weil…"

3. **Technische Umsetzung vordenken:** Wie weiss deine App, welche Fehlvorstellung hinter einer Falschantwort steckt? Reicht ein einfacher Textvergleich, oder brauchst du eine KI-Auswertung? Was sind die Vor- und Nachteile beider Ansätze für deine konkrete Lernapp?

---

## Retrieval-Quiz

**Frage 1:** Eine App zeigt nach jeder Antwort sofort „Richtig ✓" oder „Falsch ✗". Auf welcher der vier Feedback-Ebenen nach Hattie & Timperley operiert sie? Welche eine Ergänzung würde die Lernwirksamkeit am stärksten steigern?

**Frage 2:** Eine Lehrperson baut ein Quizspiel, bei dem Schülerinnen und Schüler nach 10 Fragen ihre Gesamtpunktzahl sehen. Ist das formatives oder summatives Feedback? Begründe, und erkläre, wie du das Feature verändern müsstest, damit es formativ wirkt.

**Frage 3:** Nenne eine Situation, in der sofortiges Feedback nach einer Falschantwort dem Lernen schaden kann — und eine Strategie, wie eine App damit umgehen könnte.

**Frage 4:** Du möchtest in deiner Lernapp Feedback auf der Prozessebene implementieren. Dafür müsstest du die dahinterliegenden Fehlvorstellungen kennen. Woher bekommst du diese Information? Nenne zwei verschiedene Wege.
