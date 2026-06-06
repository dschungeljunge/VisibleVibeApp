---
id: "datenschutz-schule"
slug: "datenschutz-schule"
title: "Datenschutz im Schulkontext"
summary: "DSGVO, DSG und datenschutzkonformes App-Design: Was Lehrpersonen rechtlich und technisch wissen müssen."
category: "Data Design"
level: 6
status: "stable"
video_url: ""
practice_task: |
  Führe ein Datenschutz-Audit deiner Lernapp durch. Liste alle Datenpunkte auf, die deine App erhebt oder speichern könnte. Kategorisiere sie: personenbezogen / pseudonymisiert / anonym. Identifiziere für jede personenbezogene Kategorie die rechtliche Grundlage (Einwilligung, berechtigtes Interesse, Vertragserfüllung) und beschreibe eine Massnahme zur Datenminimierung.
quality_criteria: |
  - Alle erhobenen Datenpunkte sind vollständig aufgelistet (auch implizite wie IP-Adressen, Session-Daten)
  - Jede Datenkategorie ist korrekt als personenbezogen / pseudonymisiert / anonym eingestuft
  - Für jede personenbezogene Kategorie ist eine rechtliche Grundlage benannt
  - Mindestens eine konkrete Datenminimierungsmassnahme ist beschrieben und technisch umsetzbar
  - Die Analyse unterscheidet zwischen dem Schweizer DSG und der EU-DSGVO (wo relevant)
resources_markdown: |
  - [EDÖB: Datenschutz im Bildungsbereich](https://www.edoeb.admin.ch/edoeb/de/home/datenschutz/bildung.html) - Schweizer Datenschutzbeauftragter mit spezifischen Hinweisen für Schulen.
  - [DSGVO Art. 5: Grundsätze der Datenverarbeitung](https://gdpr.eu/article-5-how-to-process-personal-data/) - Die Kerngrundsätze: Zweckbindung, Datenminimierung, Speicherbegrenzung.
  - [Datenschutz by Design: ENISA Guidelines](https://www.enisa.europa.eu/publications/privacy-and-data-protection-by-design) - Technische Leitlinien für datenschutzkonformes Software-Design.
  - [Pseudonymisierung vs. Anonymisierung (BSI)](https://www.bsi.bund.de) - Unterschied und technische Umsetzung im Schulkontext.
position_x: 1980
position_y: 1080
connections:
  - target: "dashboard"
    type: "required_for_project"
  - target: "adaptive-lernumgebung"
    type: "required_for_project"
---

## Der Impuls (Relevanz & Dilemma)

Eine Lehrperson baut eine Lernapp, in der Schülerinnen und Schüler täglich Aufgaben lösen. Die App speichert Vorname, Klasse, Lernfortschritt und Fehlerhistorie in einer Supabase-Datenbank. Das fühlt sich harmlos an. Es ist es nicht.

Sobald du Daten über identifizierbare Personen speicherst, greift das Datenschutzrecht. In der Schweiz das Datenschutzgesetz (DSG, revidiert 2023), in der EU die DSGVO. Beide gelten auch im Schulkontext und auch dann, wenn die App nicht kommerziell betrieben wird. Der Vorsatz spielt keine Rolle: Auch gut gemeinte Apps können gegen geltendes Recht verstossen — und Lehrpersonen haften dafür persönlich, wenn sie Auftragsverarbeitung ohne rechtliche Grundlage durchführen.

Das Dilemma: Eine Lernapp, die nichts über ihre Nutzerinnen und Nutzer weiss, kann nicht adaptiv sein. Sie kann keine Fortschritte zeigen, keine schwachen Aufgaben wiederholen, kein Klassenbild generieren. Datenschutz und Lernwirksamkeit stehen in einem echten Spannungsverhältnis — und die Lösung ist nicht, alles zu speichern oder gar nichts. Die Lösung ist **Privacy by Design**: Datenschutz als Designprinzip, von Anfang an, nicht als nachträglicher Compliance-Check.

---

## Erarbeitung mit der KI (Exploration)

Nutze einen KI-Chatbot, um die relevanten Datenschutzkonzepte für deinen App-Kontext zu durchdenken.

**Personenbezogene Daten im Schulkontext:** Was genau gilt als „personenbezogenes Datum"? Ist ein Pseudonym personenbezogen? Ist eine IP-Adresse personenbezogen? Lass dir anhand konkreter Beispiele aus dem Bildungsbereich erklären, wo die Grenze liegt — und warum sie im Schulkontext enger gezogen ist als anderswo (Daten von Minderjährigen).

**Die sieben Grundsätze der DSGVO (Art. 5):** Lasse dir die Grundsätze Zweckbindung, Datenminimierung und Speicherbegrenzung an einem konkreten Lernapp-Beispiel erklären. Wie lange darf Lernfortschritt einer Schülerin gespeichert werden? Was passiert mit den Daten, wenn die Schülerin die Schule wechselt?

**Pseudonymisierung als technische Massnahme:** Was ist der Unterschied zwischen Anonymisierung (irreversibel, kein Personenbezug mehr) und Pseudonymisierung (reversibel, Personenbezug über Schlüssel herstellbar)? Warum ist Pseudonymisierung für Lern-Apps die praktikablere Wahl — und welche technischen Massnahmen sind notwendig, damit sie wirksam ist?

**Rechtliche Grundlagen im Schulkontext:** Unter welcher Rechtsgrundlage darf eine Schule Lerndaten von Schülerinnen und Schülern erheben? Braucht es eine Einwilligung der Eltern? Oder gilt die Verarbeitung als „im öffentlichen Interesse"? Und was ändert sich, wenn die App auch von Schülerinnen und Schülern zu Hause (ausserhalb des Schulgeländes) genutzt wird?

---

## Transfer

1. **Daten-Inventar deiner App:** Erstelle eine vollständige Liste aller Daten, die deine Lernapp erhebt, verarbeitet oder speichert — auch implizite Daten wie Session-Tokens, Zeitstempel und Geräteinformationen. Kategorisiere sie nach Personenbezug.

2. **Minimierungsstrategie:** Wähle die drei Datenpunkte, die du als am sensibelsten einschätzt. Überlege: Brauchst du sie wirklich für den Lernerfolg deiner App? Gibt es eine weniger invasive Alternative (z. B. Pseudonym statt Klarname, Klassenkennung statt Geburtsdatum)?

3. **Privacy-by-Design-Entscheid:** Beschreibe eine konkrete Designentscheidung, die du aufgrund dieser Analyse ändern würdest — und begründe sie sowohl rechtlich (Grundsatz der Datenminimierung) als auch didaktisch (die Lernwirksamkeit bleibt erhalten).

---

## Retrieval-Quiz

**Frage 1:** Eine Lehrperson speichert in ihrer App folgende Daten: Pseudonym, Klasse, Anzahl richtiger Antworten pro Aufgabe, Zeitstempel der letzten Session. Welche dieser Daten sind personenbezogen im Sinne der DSGVO? Begründe deine Einschätzung.

**Frage 2:** Was ist der Unterschied zwischen Pseudonymisierung und Anonymisierung? Warum ist Anonymisierung für Lern-Apps mit Fortschrittstracking oft nicht praktikabel?

**Frage 3:** Eine Schülerin möchte, dass alle ihre gespeicherten Lerndaten gelöscht werden (Recht auf Vergessenwerden, Art. 17 DSGVO). Was muss eine Lehrperson technisch tun, um diesem Wunsch nachzukommen? Welche Tabellen in einer typischen Supabase-Lernapp wären betroffen?

**Frage 4:** Auf welcher Rechtsgrundlage kann eine Schweizer Schule Lerndaten von Schülerinnen und Schülern ohne explizite Einwilligung der Eltern verarbeiten? Und unter welcher Bedingung entfällt diese Grundlage?
