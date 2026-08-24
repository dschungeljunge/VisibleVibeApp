---
title: "Build"
slug: "build"
type: "visiblevibe-step"
order: 4
status: "published"
summary: "Den kleinsten lernwirksamen Mechanismus bauen."
goal: "Einen testbaren Prototyp, der den Kernmechanismus erfahrbar macht."
video: ""
tasks:
  - id: minimal
    title: "Minimal"
    why: "Je schlanker der erste Bau, desto leichter siehst du später, ob der Kern trägt."
    board: "Ein Satz, gross: «Die App tut X, damit Lernende Y tun können.» Darunter drei Dinge, die in Version 1 bewusst draussen bleiben."
    coach: "Alles streichen, was nicht den eingekreisten Kernmechanismus trägt."
    done: "Der Satz benennt den Kernmechanismus. Die Streichliste enthält typische Ablenkungen (Login, Auswertung, schönes Design)."
    text: |
      Schau auf Flow und Bühne. Die Leitfrage:

      **Was ist die kleinste Funktion, ohne die der Kernmechanismus nicht erfahrbar ist?**

      Schreib das als einen Satz aufs Board:

      «Die App tut **X**, damit Lernende **Y** tun können.»

      Darunter eine kurze Streichliste für Version 1, zum Beispiel:

      - Login
      - Punktewertung
      - Lehrer-Dashboard
      - poliertes Layout

      **Beispiel:** «Die App hängt eine Rückmeldung an eine Textstelle und verlangt einen Änderungssatz, damit Lernende Feedback in eine benannte Überarbeitung übersetzen.»

      Du baust einen **testbaren Lernmechanismus**. Daraus kann später ein Schulprodukt werden.
  - id: prompt
    title: "Prompt"
    why: "Die KI schreibt Code. Du entscheidest, was gebaut wird. Ein klarer Auftrag hält den Kern im Blick."
    board: "Schreib den Bauauftrag so aufs Board, dass du ihn 1:1 in deinen KI-Editor kopieren kannst."
    coach: "Den Prompt am Kernmechanismus und am Flow ausrichten."
    done: "Der Auftrag enthält: wer handelt, was die App tut, wo der Lernmoment ist, was in Version 1 draussen bleibt."
    text: |
      Formuliere den Auftrag an die KI auf dem Board. Übernimm Formulierungen, die du schon hast (Kernmechanismus, Flow, Streichliste).

      Der Auftrag braucht mindestens:

      1. Für wen und in welcher Situation?
      2. Was tun die Lernenden Schritt für Schritt?
      3. Wie reagiert das System – besonders im Lernmoment?
      4. Was bleibt in Version 1 draussen?
      5. Einfache Web-App, die sofort ausprobiert werden kann.

      **Tipp:** Hänge den Flow in Worten an («Zuerst …, dann …, wenn unsicher, dann …»). KI baut zuverlässiger, wenn der Ablauf erzählt ist.

      Dann: kopieren, in den KI-Editor legen, bauen. Die pädagogische Steuerung bleibt bei dir. Wenn Extra-Features vorgeschlagen werden, hilft die Streichliste.
  - id: check
    title: "Check"
    why: "Wenn der Mechanismus in zwei Minuten erfahrbar ist, lohnt der Test im Unterricht."
    board: "Drei Haken neben dem Prototyp-Satz: Kern sichtbar? In 2 Minuten verstehbar? Ohne Extra-Erklärvideo nutzbar?"
    coach: "Wenn der Check scheitert, den Flow vereinfachen."
    done: "Alle drei Haken sind ehrlich gesetzt – oder du weisst, was du vereinfachst, bevor du testest."
    text: |
      Komm mit dem ersten lauffähigen Stand zurück aufs Board. Hake ehrlich ab:

      1. Wird der **Kernmechanismus** erfahrbar?
      2. Versteht eine Lernende den nächsten Schritt in **zwei Minuten**?
      3. Ergibt die App auch ohne extra Erklärvideo Sinn?

      Fehlt ein Haken: vereinfachen. Oft ist der Flow zu lang.

      Technische Macken notierst du. Die pädagogische Frage wird beantwortbar, sobald die App benutzbar genug ist.
---

Du baust den kleinsten Mechanismus, der getestet werden kann.

Die KI ist Co-Entwicklerin: Sie generiert Code, Oberfläche, Texte. Du entscheidest, was den Kern trägt. Ein schlanker erster Wurf macht späteres Anpassen leichter.
