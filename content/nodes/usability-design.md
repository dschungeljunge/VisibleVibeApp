---
id: "usability-design"
slug: "usability-design"
title: "Usability Design"
summary: "Grundregeln des Interface-Designs, Nielsens Heuristiken und intuitive Nutzerführung für Lern-Apps."
category: "UX Design"
level: 3
status: "stable"
video_url: ""
practice_task: |
  Führe einen Usability-Test mit zwei Personen durch. Lasse sie eine Kernaufgabe deiner App (oder eines Papier-Prototyps) ohne Anleitung erledigen. Beobachte, wo sie stocken. Leite daraus drei konkrete Verbesserungen ab — mit didaktischer Begründung.
quality_criteria: |
  - Ein schriftliches Testprotokoll mit beobachteten Stockpunkten liegt vor
  - Die Navigationsstruktur hat maximal zwei Hierarchieebenen
  - Alle interaktiven Elemente sind als solche erkennbar (Affordance)
  - Jede Verbesserungsempfehlung ist mit einer Usability-Heuristik oder einem Cognitive-Load-Prinzip begründet
resources_markdown: |
  - [Nielsen: 10 Usability Heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) - Die meistzitierte Grundlage für Interface-Evaluation. Kostenlos, präzise, anwendbar.
  - [Don Norman: The Design of Everyday Things](https://www.basicbooks.com/titles/don-norman/the-design-of-everyday-things/9780465050659/) - Das Standardwerk über Affordances, Signifiers und nutzerzentriertes Design.
  - [Nielsen Norman Group: Usability Testing 101](https://www.nngroup.com/articles/usability-testing-101/) - Einführung in die Methodik von Usability-Tests, auch mit kleinen Stichproben.
position_x: 840
position_y: 720
connections:
  - target: "interaktive-elemente"
    type: "leads_to"
  - target: "daten-darstellen"
    type: "leads_to"
---

## Der Impuls (Relevanz & Dilemma)

Jakob Nielsen führte in den 1990er Jahren einen Versuch durch, der bis heute zitiert wird: Er testete verschiedene Software-Produkte mit verschiedenen Anzahlen von Testpersonen und mass, wie viele Usability-Probleme jeweils gefunden wurden. Das Ergebnis: Mit fünf Testpersonen werden rund 85 % aller schwerwiegenden Usability-Probleme aufgedeckt. Jede weitere Person bringt stark abnehmende Erkenntnisse.

Das hat eine direkte Konsequenz für dich: Du brauchst keine aufwendige Nutzerstudie, um zu wissen, ob deine App funktioniert. Zwei Lehrpersonen oder Schülerinnen und Schüler, die du beim Benutzen beobachtest, reichen aus, um die gravierendsten Probleme sichtbar zu machen.

Das eigentliche Dilemma beim App-Design ist ein bekanntes Phänomen: die **Expertise-Blindheit** (Curse of Knowledge). Als Designerin oder Designer kennst du deine App so gut, dass du nicht mehr sehen kannst, was Aussenstehende verwirrt. Du weisst, dass der kleine Pfeil oben rechts zum nächsten Schritt führt — sie wissen es nicht und suchen. Du weisst, dass man die Karte antippen muss — sie warten darauf, dass sich etwas automatisch bewegt.

Gutes Usability Design beginnt nicht mit Ästhetik, sondern mit der Bereitschaft, **zu beobachten, wie andere Menschen mit deiner App wirklich interagieren** — nicht wie du glaubst, dass sie es tun.

---

## Erarbeitung mit der KI (Exploration)

Nutze einen KI-Chatbot, um die wichtigsten Konzepte des Usability Designs auf deinen App-Kontext zu übertragen.

**Nielsens 10 Usability-Heuristiken:** Lass dir die zehn Heuristiken erklären und fordere für jede ein konkretes Beispiel aus dem Bereich Lern-Apps. Welche drei Heuristiken sind für deine geplante App am relevantesten? Begründe.

**Affordance und Signifiers:** Don Norman unterscheidet zwischen dem, was ein Objekt kann (Affordance) und dem, was dem Nutzer signalisiert, was es kann (Signifier). Ein Knopf mit Reliefoptik hat eine klare Signifier — ein flacher Text ohne Rahmen oft nicht. Frage die KI: Welche UI-Elemente in Lern-Apps haben häufig schlechte Signifiers? Wie verändert sich das Problem, wenn die App von 8-Jährigen statt von Erwachsenen genutzt wird?

**Der Zusammenhang mit Cognitive Load:** Schlechte Usability und hoher extraneous cognitive load sind zwei Seiten derselben Medaille. Diskutiere mit der KI: Wann ist ein Interface-Problem ein Usability-Problem (intuitives Verstehen), und wann ist es ein Cognitive-Load-Problem (mentale Verarbeitungskapazität)? Gibt es Fälle, wo ein Usability-Problem gleichzeitig ein Cognitive-Load-Problem ist?

**Paper Prototyping:** Wie funktioniert ein Paper-Prototyping-Usability-Test? Was sind Vor- und Nachteile gegenüber dem Test einer funktionierenden App? Und was ist das Wichtigste, das du beim Beobachten einer Testperson tun — und nicht tun — solltest?

---

## Transfer

1. **Heuristik-Analyse:** Wähle drei von Nielsens zehn Heuristiken aus. Überprüfe dein App-Design (oder eine Skizze davon) anhand dieser drei Heuristiken. Wo siehst du potenzielle Probleme?

2. **Testplan:** Beschreibe in drei Sätzen, welche eine Kernaufgabe du in einem Usability-Test testen würdest, wen du als Testpersonen auswählen würdest, und was du als Beobachterin oder Beobachter notieren würdest.

3. **KI-Prompt-Strategie:** KI-Assistenten generieren per Default UI, das für ein allgemeines Publikum optimiert ist — nicht für Schülerinnen und Schüler einer spezifischen Altersgruppe. Welche Usability-Anforderungen deiner Zielgruppe würdest du explizit in jeden Coding-Prompt aufnehmen?

---

## Retrieval-Quiz

**Frage 1:** Eine Lehrperson testet ihre App mit fünf Schülerinnen und Schülern und findet dabei zwölf Usability-Probleme. Sie möchte wissen, ob sie noch mehr Testpersonen braucht. Was würde Jakob Nielsen ihr raten — und warum?

**Frage 2:** In deiner Lernapp gibt es einen Button „Weiter", der zur nächsten Aufgabe führt. Beim Test stocken drei Schülerinnen und Schüler hier. Sie wissen nicht, dass sie auf den Button klicken sollen. Ist das ein Affordance-Problem oder ein Signifier-Problem? Was wäre eine konkrete Lösung?

**Frage 3:** Erkläre, warum das Testen einer App mit Lehrpersonen (die die App für ihre Klasse evaluieren) weniger wertvoll ist als das Testen mit den eigentlichen Endnutzern — den Schülerinnen und Schülern.

**Frage 4:** Nenne zwei konkrete Usability-Anforderungen, die für eine Lernapp mit Erstklässlern gelten, die für eine App mit Gymnasiastinnen und Gymnasiasten nicht oder weniger relevant sind.
