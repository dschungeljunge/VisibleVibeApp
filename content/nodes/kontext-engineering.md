---
id: "kontext-engineering"
slug: "kontext-engineering"
title: "Kontext Engineering"
summary: "Kontextfenster gezielt befüllen, Retrieval Augmented Generation (RAG) und lehrplangebundene KI."
category: "AI Design"
level: 5
status: "stable"
video_url: ""
practice_task: |
  Baue einen Prompt, der die KI als Lese-Begleiter für einen konkreten Schultext positioniert. Der Text soll direkt im Prompt mitgegeben werden. Die KI soll ausschliesslich auf Basis dieses Textes antworten und Schülerantworten, die über den Text hinausgehen, freundlich darauf hinweisen, dass sie sich auf den Text stützen sollen.
quality_criteria: |
  - Der Schultext ist vollständig im System Prompt eingebettet (nicht als Anhang)
  - Die KI beantwortet Fragen ausschliesslich auf Basis des mitgegebenen Textes
  - Die KI gibt bei Fragen ausserhalb des Textes eine klare Einschränkungsmeldung
  - Die KI zitiert bei inhaltlichen Aussagen die relevante Textstelle (Satz oder Abschnitt)
  - Das Verhalten ist robust: Auch wenn Schülerinnen und Schüler die KI bitten, „auch externes Wissen" zu nutzen, bleibt sie im Textkontext
resources_markdown: |
  - [Lewis et al.: Retrieval-Augmented Generation (2020)](https://arxiv.org/abs/2005.11401) - Das Originalpaper, das den Begriff RAG geprägt hat.
  - [Anthropic: Contextual Retrieval](https://www.anthropic.com/news/contextual-retrieval) - Anthropics Ansatz zur Verbesserung von RAG in der Praxis.
  - [Simon Willison: Understanding LLM Context Windows](https://simonwillison.net/2023/Jun/8/gpt-token-length/) - Praxisnahe Erklärung von Token-Limits und Kontext-Strategie.
position_x: 1600
position_y: 60
connections:
  - target: "tutor-app"
    type: "required_for_project"
---

## Der Vibe (Kurzbeschreibung & Relevanz)

Ein LLM weiss viel — aber nicht alles. Und was es weiss, hat es bis zu einem bestimmten Stichtag gelernt (Training Cutoff). Es kennt keine schuleigenen Lehrpläne, keine kantonalen Bildungsstandards, keine aktuellen Schulbücher und keine konkreten Texte, die du deinen Schülerinnen und Schülern gegeben hast.

Wenn du ein LLM ohne Kontext über einen Schultext befragst, wird es auf sein allgemeines Trainings-Wissen zurückgreifen — und plausibel klingende, aber möglicherweise falsche oder themenfernen Antworten generieren. Das ist keine Fehlfunktion des Modells: Es tut, was es kann. Aber für didaktisch zuverlässige Lernbegleitung reicht das nicht.

**Kontext Engineering** ist die Praxis, einem LLM gezielt die Informationen mitzugeben, die es für eine bestimmte Aufgabe benötigt — noch bevor die Schülerin oder der Schüler zu schreiben beginnt. Das kann ein Schultext sein, ein Lehrplan-Auszug, ein Vokabular, eine Aufgabenstellung oder eine Wissensdatenbank.

### Warum brauchst du das in deiner Lernapp?

Stell dir vor, du baust eine KI-Begleitung für einen Deutschunterricht über Kafkas *Die Verwandlung*. Ohne Kontext-Engineering beantwortet die KI jede Frage auf Basis ihres allgemeinen Kafka-Wissens — präzise, aber nicht auf den Textauszug bezogen, den deine Klasse gerade liest. Mit Kontext-Engineering gibst du der KI genau den Textabschnitt mit, den deine Schülerinnen und Schüler bearbeiten. Die KI antwortet jetzt textnah, zitierbar und didaktisch kontrolliert.

---

## Didaktisches Szenario & Exploration mit KI

### Das Szenario

Eine Lehrperson baut eine KI-Begleitung für einen Biologie-Unterricht über Photosynthese. Sie hat einen zweiseitigen Textauszug aus dem Lehrmittel und möchte, dass die KI die Schülerinnen und Schüler beim Verstehen begleitet — sokratisch, ohne Lösungen zu verraten.

**Variante A:** Die Lehrperson gibt der KI keine Kontextinformation. Die KI weiss aus ihrem Training Einiges über Photosynthese, aber sie bezieht sich auf andere Formulierungen, andere Modelle und andere Beispiele als das Lehrmittel. Wenn ein Schüler fragt: „Was meint der Text mit ‚Lichtreaktion'?", antwortet die KI mit einer allgemeinen, korrekten Erklärung — aber nicht mit der Erklärung aus dem Lehrmittel. Die Schülerinnen und Schüler müssen im Kopf abgleichen, was die KI sagt und was im Lehrmittel steht. Das erhöht den cognitive load unnötig.

**Variante B:** Die Lehrperson fügt den vollständigen Textauszug in den System Prompt ein. Die KI verankert alle ihre Antworten in diesem Text, zitiert relevante Passagen und weist darauf hin, wenn eine Frage über den Text hinausgeht. Die Antworten sind konsistent mit dem Lehrmittel.

### Exploration mit der KI

Nutze einen KI-Chatbot, um die technischen und didaktischen Dimensionen von Kontext-Engineering zu verstehen.

**Das Kontextfenster als Ressource:** Jedes LLM hat ein maximales Kontextfenster — die Menge an Text (gemessen in Tokens), die es in einer einzigen Konversation verarbeiten kann. Lass dir erklären: Was passiert, wenn ein Gespräch das Kontextfenster übersteigt? Wie viele Seiten Text passen typischerweise in ein modernes Kontextfenster? Was bedeutet das für deine Lernapp, wenn Schülerinnen und Schüler lange Konversationen führen?

**Retrieval Augmented Generation (RAG):** Wenn der Kontext zu gross wird (z. B. ein ganzes Schulbuch), reicht das Einfügen in den Prompt nicht mehr. RAG ist die Technik, bei der aus einer grossen Wissensdatenbank automatisch nur die relevanten Abschnitte herausgesucht und in den Prompt eingefügt werden. Lass dir den Grundmechanismus erklären: Was ist ein Embedding? Wie funktioniert die semantische Suche? Du musst das nicht selbst implementieren — aber du solltest verstehen, wann es notwendig wird.

**Grounding und Halluzinationsreduktion:** Eine der häufigsten Ursachen von LLM-Halluzinationen ist fehlender Kontext. Die KI „erfindet" Antworten, weil sie keine gesicherte Quelle hat. Wie verändert das Einfügen eines konkreten Texts die Zuverlässigkeit der KI-Antworten? Und welche Art von Fragen halluziniert die KI auch dann noch, wenn sie einen Kontext hat?

---

## Geführtes Beispiel (Worked Example)

Wir bauen einen **textgebundenen Lese-Begleiter** für einen konkreten Schultext.

### Das Entwicklungsziel

Instruiere deine KI, einen System Prompt zu entwickeln, der folgende Eigenschaften hat:

**Schritt 1 — Den Text einbetten:**
Wähle einen konkreten Schultext, den du in deinem Unterricht verwendest (2–4 Seiten). Füge ihn vollständig in den System Prompt ein — nach einer klaren Kennzeichnung (z. B. `<schultext>...<schultext>`). Die Kennzeichnung hilft der KI, den Kontext vom Rest des Prompts zu unterscheiden.

**Schritt 2 — Die Bindungsregel:**
Formuliere im System Prompt explizit, dass die KI ausschliesslich auf Basis des eingebetteten Schultextes antwortet. Wenn eine Frage nicht mit dem Text beantwortet werden kann, soll die KI das transparent kommunizieren und die Schülerinnen und Schüler auf den relevanten Textabschnitt hinweisen.

**Schritt 3 — Zitierverhalten:**
Instruiere die KI, bei inhaltlichen Aussagen die konkrete Textstelle zu nennen, auf die sie sich bezieht (z. B. „Im dritten Abschnitt, wo der Text sagt: ‚...'"). Das ermöglicht den Schülerinnen und Schülern, die Antwort selbst im Text nachzuvollziehen.

**Schritt 4 — Robustheitstest:**
Teste den Prompt mit drei Eingaben: (a) einer Frage, die direkt im Text beantwortet ist, (b) einer Frage, die über den Text hinausgeht, (c) dem expliziten Wunsch: „Nutze auch dein allgemeines Wissen, nicht nur den Text." Überprüfe, ob die KI in allen drei Fällen korrekt reagiert.

---

## Häufige Stolpersteine (Gotchas & Re-Prompting)

* ⚠️ **Die KI vermischt Kontextwissen und Trainingswissen:**
  * *Warum passiert das?* Sprachmodelle haben keine strikte Trennung zwischen „was steht im Prompt" und „was weiss ich aus dem Training". Wenn ein Begriff im Schultext vorkommt, der auch im Trainingswissen verankert ist, fügt die KI manchmal allgemeines Wissen hinzu, das nicht aus dem Text stammt — ohne das transparent zu machen.
  * *Lösung (Re-Prompt):* Ergänze die Bindungsregel um eine Formulierung wie: „Wenn du eine Aussage machst, die nicht direkt aus dem Text belegt werden kann, markiere sie ausdrücklich als allgemeines Wissen und weise die Lernenden darauf hin."

* ⚠️ **Sehr lange Texte überschreiten das effektive Kontextfenster:**
  * *Warum passiert das?* LLMs haben zwar grosse Kontextfenster, aber die Qualität der Verarbeitung nimmt bei sehr langen Eingaben ab — besonders für Informationen in der Mitte des Prompts (Lost-in-the-Middle-Problem). Ein 20-seitiger Text wird nicht mit derselben Präzision verarbeitet wie ein 2-seitiger.
  * *Lösung (Re-Prompt):* Reduziere den Kontext auf das didaktisch Wesentliche: Welche Abschnitte des Textes sind für die Lernaufgabe tatsächlich relevant? Je präziser der Kontext, desto zuverlässiger die Antworten.

* ⚠️ **Die KI zitiert korrekt, aber aus dem falschen Abschnitt:**
  * *Warum passiert das?* Wenn mehrere Abschnitte ähnliche Formulierungen enthalten, zitiert die KI manchmal den falschen. Das ist besonders in Schulbuchabschnitten der Fall, die Konzepte mehrfach mit leicht unterschiedlichen Worten einführen.
  * *Lösung (Re-Prompt):* Füge im Prompt eine Nummerierung der Abschnitte oder Sätze ein. Dann kann die KI nicht nur auf Wortebene, sondern auch auf Strukturebene referenzieren: „In Abschnitt 3, Satz 2 steht..."
