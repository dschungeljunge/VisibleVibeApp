---
id: "ki-llms"
slug: "ki-llms"
title: "Künstliche Intelligenz LLMs"
summary: "Grundwissen über Sprachmodelle, neuronale Netze und generative KI."
category: "AI Design"
level: 4
status: "stable"
video_url: ""
practice_task: |
  Entwirfe ein didaktisches Szenario für deinen Unterricht, in dem Schüler:innen ein LLM einsetzen. Kopiere den Entwurf in Claude/ChatGPT und lasse ihn kritisch bezüglich Halluzinationen, Vorsagen der Lösung und Datenschutz prüfen.
quality_criteria: |
  - Das Szenario definiert eine klare Rolle für die KI (z. B. Feedbackgeber, Diskussionspartner)
  - Mögliche Stolpersteine wie Halluzinationen und das "Vorsagen" von Lösungen wurden antizipiert
  - Die Schülerinstruktionen enthalten Regeln zum kritischen Umgang mit KI-Antworten
resources_markdown: |
  - [Introduction to LLMs (Andrej Karpathy)](https://www.youtube.com/watch?v=zjkBMFhNj_g) - Das beste Einführungsvideo zur Funktionsweise von LLMs.
  - [Prompt Engineering Guide: LLM Basics](https://www.promptingguide.ai/research/llm-basics) - Wissenschaftlicher Überblick über Sprachmodelle.
  - [Datenschutz und Schule (CH/DE/AT)](#) - Leitfaden zum rechtssicheren Einsatz von KI-Tools im Unterricht.
position_x: 1220
position_y: 300
connections:
  - target: "kontext-engineering"
    type: "leads_to"
  - target: "api-keys"
    type: "leads_to"
  - target: "prompting"
    type: "leads_to"
---

## Der Impuls (Relevanz & Dilemma)

Künstliche Intelligenz und große Sprachmodelle (Large Language Models, LLMs) wie GPT-4 oder Claude 3 verändern das Lernen grundlegend. Als Lehrperson stehst du vor einem Dilemma:
* Einerseits können LLMs als **ultimative persönliche Tutoren** agieren, die geduldig Fragen beantworten, Texte auf dem passenden Sprachniveau erklären und individuelles Feedback geben.
* Andererseits verführen sie zum **kognitiven Bypass**: Schüler:innen lassen sich Lösungen einfach generieren, kopieren diese in ihre Dokumente und umgehen den eigentlichen Denkprozess.

Um lernwirksame Lernapps zu bauen, musst du verstehen, wie LLMs funktionieren – nicht als Informatiker:in, sondern als Didaktiker:in. Ein LLM ist keine Datenbank, die Fakten abruft, sondern ein mathematisches System, das das *wahrscheinlichste nächste Wort* vorhersagt.

---

## Erarbeitung mit der KI (Exploration)

Nutze eine KI deiner Wahl (z. B. Claude oder ChatGPT), um dein Verständnis über die Kernmechanismen von Sprachmodellen selbstgesteuert zu vertiefen. 

Instruiere die KI eigenständig, dir folgende Konzepte zu erklären und zu veranschaulichen:
* **Tokens und Kontextfenster (Context Window):** Lasse dir erklären, wie ein LLM Text liest, warum das Gedächtnis der KI begrenzt ist und was das für lange Schüler-Konversationen bedeutet.
* **Halluzinationen (Hallucinations):** Ergründe, warum LLMs dazu neigen, plausibel klingende Unwahrheiten zu erfinden und wie man dies durch präzises didaktisches Prompting minimieren kann.

*Tipp für deine Interaktion:* Bringe die KI dazu, diese Begriffe mithilfe einer Metapher aus deinem eigenen Schulfach (z. B. Biologie, Geschichte, Fremdsprachen) zu erklären und dich anschließend abzufragen, um dein Verständnis zu prüfen.

---

## Reflexionsaufgabe (Transfer)

Nimm dir nach dem Dialog mit der KI 15 Minuten Zeit, um über dein eigenes Lernapp-Projekt nachzudenken:
1. **Verlässlichkeit:** In welchen Bereichen deiner App muss die KI absolut korrekte Fakten liefern? Wie stellst du sicher, dass sie nicht "halluziniert" (z. B. durch Bereitstellung von Quellentexten im Prompt)?
2. **Kognitive Aktivierung:** Wie verhinderst du in deiner App, dass die KI den Schüler:innen die Arbeit komplett abnimmt? Welche Regeln musst du im System Prompt festlegen?
3. **Datenschutz:** Welche Schülerdaten werden an das LLM gesendet? Wie kannst du sicherstellen, dass keine personenbezogenen Daten übermittelt werden?
