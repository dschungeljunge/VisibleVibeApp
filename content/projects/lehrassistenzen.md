---
id: "p-coaching"
slug: "lehrassistenzen"
title: "Lehrassistenzen"
summary: "Gestaltung von intelligenten Tutor-Systemen und Feedback-Assistenten."
artifact_description: "Ein intelligentes KI-Assistenzsystem, das Lernende sokratisch begleitet, auf spezifische Fehler eingeht und formative Rückmeldungen gibt."
learning_strategy: "Systematisches Prompt-Engineering und die Integration von LLM-APIs in Web-Apps."
technology_principle: "LLM-Integration, API-Anfragen, sicheres Key-Management im Backend."
ux_principle: "Vertrauensbildung (Trust Calibration), Transparenz über KI-Grenzen."
definition_of_done: |
  - KI-Assistent reagiert nachweislich sokratisch (kein direktes Verraten von Lösungen)
  - API-Keys werden sicher auf dem Server aufbewahrt (nicht im Frontend)
  - Das System gibt differenziertes Feedback auf Schülerfehler
status: "stable"
required_node_ids:
  - "kickoff"
  - "technik"
  - "paedagogik"
  - "vibecoding"
  - "ki-llms"
  - "prompting"
  - "kontext-engineering"
  - "api-keys"
  - "coaching-tutoring"
  - "tutor-app"
---

### Projektbeschreibung
Dieses Modul fokussiert sich auf die Integration intelligenter Sprachmodelle (LLMs) in deine Web-Apps. Du lernst, wie man Prompts strukturiert, Kontext lädt und APIs so integriert, dass sie als geduldige, sokratische Lernpartner agieren.

### Empfohlener Arbeitsablauf
1. **System Prompting:** Entwirf und teste den System-Prompt der KI im Playground.
2. **Backend-Integration:** Erstelle einen Next.js API-Route Handler zum sicheren Weiterleiten von Anfragen.
3. **Kontext-Laden:** Integriere externe Wissensquellen in den Prompt (RAG / Kontext Engineering).
4. **Fehlertoleranz:** Behandle API-Ausfälle oder Formatierungsfehler der KI im Client ab.
