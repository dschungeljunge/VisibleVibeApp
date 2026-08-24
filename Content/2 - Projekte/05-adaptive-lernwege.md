---
title: Lernwege adaptiv steuern
id: adaptive-lernwege
slug: adaptive-lernwege
type: learn-project
sequence: 5
order: 5
summary: Baue eine transparente adaptive Lernsequenz mit erklärbaren Regeln und Wahlmöglichkeiten.
reference_app: Regelbasierte adaptive Lernsequenz
status: published
estimated_time: 16–24 Stunden
difficulty: Vertiefung
support_level: niedrig
prerequisites:
  - interaktive-lernaufgabe
  - lernspuren-sichtbar-machen
  - ki-lernbegleitung
portfolio_artifact: Erklärbare adaptive Lernsequenz mit Simulation, Erprobung und Governanceplan
---

# Projekt 5: Lernwege adaptiv steuern

In diesem Projekt entwickelst du eine kurze Lernsequenz, die auf eine Antwort und die angegebene Sicherheit reagiert. Die Kernlogik bleibt regelbasiert und sichtbar. KI darf Varianten oder Hinweise erzeugen, entscheidet aber nicht allein, welchen Lernweg eine Person erhält.

Adaptivität bedeutet hier nicht, ein umfassendes Profil von Lernenden zu erstellen. Du triffst wenige vorläufige Entscheidungen, erklärst sie und gibst Lernenden die Möglichkeit, einen anderen Weg zu wählen.

## Das baust du

Eine Sequenz mit einer diagnostischen Einstiegsaufgabe und vier möglichen nächsten Schritten:

| Antwort | Sicherheit | Vorgeschlagener nächster Schritt |
|---|---|---|
| passend | hoch | Transferaufgabe |
| passend | niedrig | kurzes Beispiel, danach ähnliche Aufgabe |
| nicht passend | niedrig | Hinweis und zweiter Versuch |
| nicht passend | hoch | kontrastierendes Beispiel und Begründungsauftrag |

Jede Empfehlung wird erklärt. Lernende können den Vorschlag ablehnen und einen anderen Weg wählen.

## Das brauchst du

- eine diagnostische Aufgabe aus Projekt 2;
- mindestens zwei fachlich geprüfte Unterstützungsvarianten;
- das Excalidraw-Projektboard;
- einen KI-Coding-Assistenten;
- synthetische Testverläufe;
- zwei Lernende und eine Lehrperson für die Erprobung.

## Am Ende kannst du

- ein begrenztes pädagogisches Adaptionsziel formulieren;
- geeignete Signale von unbegründeten Lernendenmerkmalen unterscheiden;
- Zustände, Regeln, Übergänge und Rückkehrpfade modellieren;
- regelbasierte und KI-gestützte Komponenten trennen;
- alle erreichbaren Pfade systematisch simulieren;
- Transparenz, Fehlzuordnung und ungleiche Folgen prüfen;
- Monitoring und eine manuelle Alternative planen.

---

## 1. Sense: Finde eine begründete Verzweigung

Suche eine Stelle in einer Lernsequenz, an der derselbe nächste Schritt nicht für alle sinnvoll ist. Beschreibe zwei kontrastierende Fälle.

Beispiel:

- Person A wählt die passende Antwort, ist aber unsicher und kann sie kaum begründen.
- Person B wählt eine unpassende Antwort, ist aber sehr sicher und hält an ihrer Erklärung fest.

### Auf dem Board

Erstelle für jeden Fall:

- beobachtbare Lernspur;
- mögliche Interpretation;
- alternative Interpretation;
- hilfreicher nächster Schritt;
- Risiko einer Fehlentscheidung.

### Zwischencheck

Die Lernspur ist eine Antwort, Begründung oder Selbsteinschätzung. „Schwach“, „begabt“ oder „unmotiviert“ sind keine beobachtbaren Lernspuren.

---

## 2. Frame: Formuliere deine Adaptivitätshypothese

Vervollständige:

> Wenn die Lernumgebung **[Signal]** erkennt, schlägt sie **[nächste Lernhandlung]** vor, weil **[pädagogische Annahme]**. Die Zuordnung kann falsch sein, wenn **[Grenze]**.

Beispiel:

> Wenn eine Antwort fachlich passend, aber mit geringer Sicherheit gegeben wird, schlägt die Umgebung ein kurzes Beispiel und eine ähnliche Aufgabe vor. Damit kann die Person ihr Verständnis stabilisieren. Die Zuordnung kann falsch sein, wenn die Sicherheitsskala missverstanden wurde.

Lege fest:

- Was soll durch die Anpassung besser werden?
- Welche Daten genügen dafür?
- Welche Entscheidung darf nicht automatisiert werden?
- Wie kann eine Person die Empfehlung korrigieren?

---

## 3. Ideate: Entwirf ein erklärbares Regelwerk

Nutze zunächst genau diese vier Zustände:

```text
A: Antwort passend + Sicherheit 3–4
B: Antwort passend + Sicherheit 1–2
C: Antwort nicht passend + Sicherheit 1–2
D: Antwort nicht passend + Sicherheit 3–4
```

Erstelle für jeden Zustand eine Regelkarte:

```text
Signal:
Vorläufige Annahme:
Vorgeschlagene Handlung:
Erklärung für die lernende Person:
Mögliche Fehlzuordnung:
Alternative oder Übersteuerung:
Rückkehr in den gemeinsamen Lernweg:
```

Zeichne danach den vollständigen Entscheidungsbaum. Jeder Pfad braucht:

- einen Anfang und ein Ende;
- eine Möglichkeit zur Rückkehr;
- eine Erklärung der Empfehlung;
- eine sichtbare Wahlmöglichkeit.

Reduziere das Modell, wenn du mehr als fünf Zustände oder sechs Regeln benötigst. Komplexität erschwert nicht nur den Bau, sondern auch Prüfung und Verantwortung.

### Entscheide über KI

Markiere im Board jede Funktion als:

- **feste Regel**;
- **vorgefertigter Inhalt**;
- **mögliche KI-Unterstützung**;
- **Entscheidung eines Menschen**.

Eine sinnvolle erste KI-Funktion ist das sprachliche Variieren eines bereits geprüften Beispiels. Die Wahl des Lernwegs bleibt regelbasiert.

---

## 4. Build: Implementiere zuerst nur die Regeln

Nutze diesen Startprompt:

```text
Erstelle eine responsive Web-App für eine kurze adaptive Lernsequenz.

Einstiegsaufgabe:
[Frage und Antwortmöglichkeiten aus Projekt 2]

Nach der Antwort fragt die App nach der Sicherheit von 1 bis 4.
Danach wendet sie exakt diese Regeln an:

A: passend + 3–4 → Transferaufgabe
B: passend + 1–2 → kurzes Beispiel, dann ähnliche Aufgabe
C: nicht passend + 1–2 → gestufter Hinweis, dann zweiter Versuch
D: nicht passend + 3–4 → kontrastierendes Beispiel und Begründungsauftrag

Anforderungen:
- Zeige der lernenden Person, warum ein Schritt vorgeschlagen wird.
- Biete immer „anderen Weg wählen“ an.
- Ermögliche nach jedem Pfad die Rückkehr in einen gemeinsamen Abschluss.
- Speichere keine personenbezogenen Daten.
- Halte Regeln und Lerninhalte in getrennten, gut auffindbaren Strukturen.
- Protokolliere für den Test lokal nur Zustand, gewählten Weg und Abschluss.
- Verwende zunächst keine KI und keine externe Datenbank.

Erkläre mir nach der Minimalversion, wo Regeln, Inhalte und Übergänge liegen.
```

Prüfe die vier Regeln manuell. Ergänze erst danach Inhalte und Gestaltung.

### Optionale KI-Erweiterung

Ergänze KI nur, wenn du einen konkreten Mehrwert begründen kannst. Beispiel:

> Erzeuge zu einem geprüften Prinzip ein neues, altersgerechtes Beispiel. Verändere nicht das zugrunde liegende Fachprinzip. Kennzeichne die Ausgabe als Vorschlag und ermögliche der Lehrperson, sie vor der Nutzung freizugeben.

Dokumentiere, welche Teile deterministisch bleiben und welche variieren können. KI darf im Referenzprojekt weder Lernende klassifizieren noch den Pfad allein auswählen.

---

## 5. Test & Reflect: Simuliere alle Pfade

Erstelle mindestens diese Testfälle:

| Fall | Antwort | Sicherheit | Erwarteter Zustand |
|---|---|---|---|
| 1 | passend | 4 | A |
| 2 | passend | 2 | B |
| 3 | nicht passend | 1 | C |
| 4 | nicht passend | 4 | D |
| 5 | keine Antwort | 3 | keine Zuordnung, Hinweis anzeigen |
| 6 | passend | keine Angabe | Sicherheit nachfordern oder freie Wahl anbieten |

Prüfe zusätzlich:

- Erreicht jeder Pfad einen Abschluss?
- Kann eine Person ihren Weg ändern?
- Entstehen Schleifen oder Sackgassen?
- Bleibt die Begründung der Empfehlung verständlich?
- Was passiert bei einem technischen Fehler?
- Ist der gemeinsame Lernweg ohne Adaptivität weiterhin nutzbar?

### Prüfe Fehlzuordnung und Fairness

Erfinde sechs kontrastierende Lernendenverläufe. Variiere Sprachkompetenz, hohe oder niedrige Sicherheit, wechselnde Antworten und fehlende Angaben. Frage bei jedem Verlauf:

- Welche Empfehlung entsteht?
- Welche Annahme steckt darin?
- Was wäre die Folge, wenn die Annahme falsch ist?
- Kann die Person die Folge erkennen und korrigieren?
- Trifft dieselbe Regel unterschiedliche Personen unangemessen?

Lass zwei Lernende die Sequenz bearbeiten. Bitte sie anschliessend zu erklären, warum ihnen ein bestimmter Schritt vorgeschlagen wurde und wie sie einen anderen Weg wählen könnten. Eine Lehrperson beurteilt, an welchen Stellen menschliches Eingreifen nötig bleibt.

Überarbeite mindestens eine Regel, Erklärung oder Wahlmöglichkeit aufgrund der Simulation oder Erprobung.

---

## 6. Grow: Plane Einsatz und Rückbau

Erstelle eine System-Card:

```text
Name und Version:
Lernziel und Adaptionsziel:
Verwendete Signale:
Regeln und pädagogische Annahmen:
KI-gestützte Bestandteile:
Erklärung und Wahlmöglichkeiten für Lernende:
Getestete Pfade und Grenzfälle:
Bekannte Fehlzuordnungen oder ungleiche Folgen:
Menschliche Eingriffspunkte:
Gespeicherte Daten und Löschung:
Verantwortung für Monitoring und Änderungen:
Manuelle Alternative bei Ausfall oder Rückbau:
```

Lege fest, woran du nach der Einführung erkennst, ob die Anpassung nützlich ist. Nutze nicht nur Abschlussquote, Geschwindigkeit oder Zufriedenheit. Prüfe auch Qualität der Überarbeitungen, Verständnis der Empfehlungen und unbeabsichtigte Folgen.

## Projekt abgeschlossen?

- [ ] Mein Adaptionsziel ist eng und pädagogisch begründet.
- [ ] Ich verwende beobachtbare Lernspuren statt stabiler Etiketten.
- [ ] Jede Regel enthält Annahme, Grenze und Korrekturmöglichkeit.
- [ ] Lernende sehen die Begründung und können einen anderen Weg wählen.
- [ ] Regeln, KI und menschliche Entscheidungen sind klar getrennt.
- [ ] Alle Pfade, fehlenden Angaben und technischen Fehler wurden getestet.
- [ ] Ich habe kontrastierende Verläufe auf Fehlzuordnung geprüft.
- [ ] Lernende und eine Lehrperson haben die Sequenz erprobt.
- [ ] Mindestens eine Überarbeitung beruht auf Testevidenz.
- [ ] Monitoring und manuelle Alternative sind dokumentiert.

## Das kommt in dein Portfolio

1. zwei kontrastierende Ausgangsfälle
2. Adaptivitätshypothese mit Grenzen
3. Regelkarten und Entscheidungsbaum
4. klare Abgrenzung von Regeln, KI und menschlichen Entscheidungen
5. Link oder reproduzierbare Version der Lernumgebung
6. Simulation aller Pfade und Analyse kontrastierender Verläufe
7. Ergebnisse der Erprobung und dokumentierte Überarbeitung
8. System-Card mit Monitoring und manueller Alternative

## Wenn du bereits Erfahrung hast

Du kannst ein bestehendes adaptives System auditieren. Rekonstruiere Signale, Regeln und implizite Annahmen. Identifiziere nicht erklärbare oder nicht korrigierbare Entscheidungen und entwickle eine transparentere Minimalvariante. Der Nachweis von Funktionalität allein genügt nicht; Fehlzuordnung und Folgen müssen sichtbar geprüft werden.

