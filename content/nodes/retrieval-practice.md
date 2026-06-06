---
id: "retrieval-practice"
slug: "retrieval-practice"
title: "Retrieval Practice"
summary: "Didaktische Methoden zur aktiven Wissensrekonstruktion aus dem Gedächtnis."
category: "Learning Design"
level: 4
status: "stable"
video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
practice_task: |
  Entwirfe für deine Lernapp ein Interaktionsmuster, das Schüler:innen dazu zwingt, eine Information aktiv selbst abzurufen (z.B. durch Freitext-Eingabe oder Lückentext), anstatt sie nur wiederzuerkennen (Multiple-Choice). Ergänze eine sofortige formative Rückmeldung.
quality_criteria: |
  - Die Lernenden müssen die Antwort selbst formulieren oder konstruieren (kein reines Auswählen)
  - Nach der Eingabe wird sofort die richtige Lösung mit einer kurzen Erklärung (formatives Feedback) angezeigt
  - Die App bietet eine Möglichkeit, falsch beantwortete Fragen später erneut abzufragen (Spaced Practice)
resources_markdown: |
  - [Make It Stick (Brown, Roediger, McDaniel)](https://www.retrievalpractice.org/make-it-stick) - Das Standardwerk über lernwirksames Lernen.
  - [RetrievalPractice.org](https://www.retrievalpractice.org) - Umfangreiche Materialsammlung und wissenschaftliche Grundlagen.
  - [The Testing Effect (Roediger & Karpicke, 2006)](https://scienceoflearning.com) - Die wegweisende Studie zur Wirksamkeit des Testens.
position_x: 1220
position_y: 1500
connections:
  - target: "quiz-webapp"
    type: "required_for_project"
---

## Der Vibe (Kurzbeschreibung & Relevanz)

**Retrieval Practice** (aktiver Wissensabruf) ist eines der am besten erforschten und wirksamsten didaktischen Prinzipien überhaupt. Es beschreibt den Vorgang, Informationen aktiv aus dem eigenen Langzeitgedächtnis abzurufen, anstatt sie einfach nur passiv nochmals zu lesen. 

### Warum brauchst du das in deiner Lernapp?
Viele Lernende (und auch Lehrpersonen) verwechseln *Wiedererkennen* mit *Können*. Wenn Schüler:innen ein Kapitel im Buch nochmals lesen, fühlt sich das flüssig und vertraut an (Illusion of Competence). Sie haben das Wissen aber nicht gefestigt. Erst wenn sie gezwungen sind, die Antwort auf eine Frage ohne Hilfsmittel selbst zu rekonstruieren, wird der neuronale Pfad im Gehirn gestärkt. Deine Lernapp muss ein Werkzeug sein, das diesen "anstrengenden", aber hochwirksamen Abrufprozess gezielt anstößt.

---

## Didaktisches Dilemma & Exploration mit KI

Stell dir vor, du planst ein Vokabelspiel für deine Klasse.
* **Option A:** Ein schnelles Multiple-Choice-Quiz. Die Schüler:innen lieben es, weil sie schnell Punkte sammeln und oft richtig raten können. Die gefühlte Motivation ist hoch.
* **Option B:** Ein Freitext-Eingabefeld. Die Schüler:innen müssen die Wörter komplett selbst schreiben. Sie machen mehr Fehler, beschweren sich über die Anstrengung, und das Punktesammeln ist mühsam.

Welches Design wählst du? Führe ein Gespräch mit deiner KI (z. B. Claude oder ChatGPT) und thematisiere dabei die folgenden didaktischen Fragestellungen in deinen eigenen Worten:
* Was besagt das Prinzip der "Wünschenswerten Erschwernisse" (Desirable Difficulties) im Kontext von Retrieval Practice?
* Wie lässt sich das didaktisch wertvolle, aber anstrengende Freitext-Design so gestalten, dass Frust bei leistungsschwächeren Schüler:innen minimiert wird?
* Welche Rolle spielt die unmittelbare formative Rückmeldung direkt nach dem Abrufversuch?

### 📺 Erklärvideo
In diesem Video wird gezeigt, wie sich Retrieval Practice durch verschiedene UI-Elemente in einer Web-App abbilden lässt.

---

## Geführtes Beispiel (Worked Example)

Wir entwerfen ein digitales **Vokabel-Lern-Tool** für den Englischunterricht, das aktiven Wissensabruf erzwingt.

### Das Entwicklungsziel
Lasse deine KI eine einzelne HTML-Seite mit CSS (Tailwind) und JavaScript generieren. Formuliere die Prompts so, dass folgende Funktionalitäten implementiert werden:

1. **Die Kernlogik:**
   * Ein deutsches Wort wird angezeigt. Die Lernenden müssen die englische Übersetzung in ein Textfeld eintragen (kein Multiple-Choice).
   * Nach dem Absenden wird die Eingabe geprüft (z. B. fehlerunabhängig von Groß-/Kleinschreibung).
   * Ist die Antwort richtig, erscheint eine Bestätigung. Ist sie falsch, zeigt die App das korrekte Wort sowie eine kurze Eselsbrücke an, um das Einprägen zu erleichtern.
   * Ein Button lädt das nächste Wort.

Gestalte die Prompts eigenständig und führe einen iterativen Verfeinerungsprozess mit deiner KI durch, um das gewünschte Zen-Layout (minimalistisch und ablenkungsfrei) zu erreichen.

---

## Häufige Stolpersteine (Gotchas)

* ⚠️ **Frustration durch Tippfehler**:
  * *Warum passiert das?* Wenn Schüler:innen "chalenge" statt "challenge" schreiben und die App das als komplett falsch wertet, führt das zu Frust und senkt die Lernmotivation.
  * *Lösung (Re-Prompt):* Weise deine KI an, eine einfache Abstandsmetrik (wie die Levenshtein-Distanz) oder einen toleranten Prüfalgorithmus einzubauen, der Tippfehler erkennt und einen korrigierenden Hinweis ausgibt, anstatt die Antwort sofort als falsch zu markieren.

* ⚠️ **Fehlendes Spaced Learning**:
  * *Warum passiert das?* Wenn richtig beantwortete Wörter genauso oft wiederholt werden wie falsch beantwortete, verschwenden die Lernenden Zeit.
  * *Lösung (Re-Prompt):* Lasse die KI ein Drei-Boxen-System (Leitner-Prinzip) im lokalen Speicher (LocalStorage) der Web-App umsetzen. Richtig beantwortete Wörter wandern weiter, falsch beantwortete fallen in die erste Box zurück.
