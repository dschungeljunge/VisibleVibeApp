---
title: KI-gestützte Lernbegleitung entwickeln
id: ki-lernbegleitung
slug: ki-lernbegleitung
type: learn-project
sequence: 4
order: 4
summary: Entwickle einen klar begrenzten KI-Lerncoach mit geprüften Regeln, Grenzen und Testfällen.
reference_app: Begrenzter Erklär-Coach
status: published
estimated_time: 12–18 Stunden
difficulty: Fortgeschritten
support_level: mittel bis niedrig
prerequisites:
  - interaktive-lernaufgabe
  - lernspuren-sichtbar-machen
portfolio_artifact: Begrenzter KI-Lerncoach mit Testsuite, Schutzkonzept und Einsatzentscheidung
---

# Projekt 4: KI-gestützte Lernbegleitung entwickeln

In diesem Projekt entwickelst du einen KI-Lerncoach für eine eng begrenzte Lernhandlung. Der Referenzcoach hilft Lernenden, eine eigene Erklärung zu verbessern. Er gibt nicht sofort eine Musterlösung, sondern fragt nach, lenkt die Aufmerksamkeit und fordert eine Überarbeitung.

Du entwickelst keinen allgemeinen Chatbot. Je offener sein Auftrag, desto schwieriger lassen sich Lernförderlichkeit, fachliche Qualität und Sicherheit prüfen.

## Das baust du

Einen **Erklär-Coach**, der:

- eine eigene Erklärung der lernenden Person entgegennimmt;
- zuerst eine Klärungsfrage stellt;
- danach höchstens zwei gestufte Hinweise gibt;
- zur Überarbeitung der eigenen Erklärung auffordert;
- eine Mustererklärung erst am Schluss und nur auf Wunsch zeigt;
- ausserhalb seines Themas transparent nicht weiterhilft;
- sensible Inhalte und personenbezogene Daten nicht anfordert.

## Das brauchst du

- ein enges Fachthema und zwei bis vier Qualitätskriterien für eine gute Erklärung;
- kurze, von dir geprüfte Fachmaterialien als Grundlage;
- das Excalidraw-Projektboard;
- einen institutionell zulässigen KI-Zugang;
- einen KI-Coding-Assistenten;
- eine Fachperson und zwei Lernende für Tests.

> Prüfe vor dem Einsatz, welche KI-Dienste und Datenarten an deiner Institution zulässig sind. Nutze im Prototyp keine echten Namen, Noten, Gesundheitsdaten oder vertraulichen Texte.

## Am Ende kannst du

- eine begrenzte KI-Unterstützungsfunktion formulieren;
- festlegen, welche Denkleistung bei den Lernenden bleiben muss;
- Aufgaben zwischen Interface, Regeln, Sprachmodell und Menschen verteilen;
- Systemanweisung, Kontext und Ausgabeformat gestalten;
- fachliche, pädagogische und sicherheitsbezogene Testfälle entwickeln;
- eine begründete Einsatz- oder Nichteinsatzentscheidung treffen.

---

## 1. Sense: Untersuche die Unterstützungslücke

Wähle einen Moment, in dem Lernende selbstständig arbeiten und Unterstützung benötigen. Sammle zwei konkrete Beispiele: eine typische Frage, eine unvollständige Erklärung oder eine Situation, in der die Lehrperson nicht sofort reagieren kann.

### Auf dem Board

Beschreibe:

- Was versucht die lernende Person gerade zu tun?
- Woran ist erkennbar, dass sie Unterstützung braucht?
- Welche Hilfe gibt eine gute Lehrperson an dieser Stelle?
- Welche Hilfe wäre zu viel, weil sie die Denkleistung übernimmt?
- Welche Fälle erfordern zwingend einen Menschen?

### Zwischencheck

„Fragen beantworten“ ist zu breit. „Eine eigene Erklärung anhand von drei Fachkriterien prüfen und überarbeiten“ ist begrenzt und testbar.

---

## 2. Frame: Formuliere Versprechen und Grenzen

Vervollständige diese Sätze:

> Der Coach unterstützt Lernende beim **[konkrete Lernhandlung]**.

> Die Lernenden müssen weiterhin selbst **[nicht auszulagernde Denkleistung]**.

> Der Coach darf **[klare Grenze]** nicht tun.

> Bei **[Situation]** verweist der Coach an **[Mensch oder verlässliche Ressource]**.

Beispiel:

> Der Coach unterstützt Lernende dabei, eine Erklärung zur Kondensation fachlich zu präzisieren. Die Lernenden müssen Ursache und Vorgang selbst formulieren. Der Coach darf die fertige Erklärung nicht als erste Reaktion liefern. Bei persönlichen, bewertungsrelevanten oder themenfremden Anliegen verweist er an die Lehrperson.

Definiere zwei bis vier fachliche Qualitätskriterien. Nur daran soll der Coach die Erklärung spiegeln.

---

## 3. Ideate: Verteile Aufgaben und zeichne den Gesprächspfad

Erstelle auf dem Board vier Bereiche:

| Komponente | Aufgabe im Coach |
|---|---|
| Interface | Eingabe strukturieren, Schritte und Grenzen sichtbar machen |
| feste Regeln | leere Eingabe, Abbruch, Datenschutz- und Eskalationshinweise behandeln |
| Sprachmodell | Erklärung mit den bereitgestellten Kriterien vergleichen und Fragen formulieren |
| Mensch | Fachmaterial prüfen, Einsatz begleiten, kritische Fälle übernehmen |

Zeichne danach mindestens diese Pfade:

1. verständliche, aber unvollständige Erklärung;
2. fachlich falsche Erklärung;
3. leere oder extrem kurze Eingabe;
4. themenfremde Frage;
5. persönliche oder sensible Mitteilung;
6. Aufforderung: „Gib mir einfach die Lösung.“

Für jeden Pfad notierst du die erwartete Reaktion. So entsteht bereits deine erste Testsuite.

---

## 4. Build: Erstelle zuerst die Coach-Spezifikation

Bevor du Code erzeugst, vervollständige diese Spezifikation:

```text
Rolle:
Du bist ein begrenzter Erklär-Coach zum Thema [Thema].

Zielgruppe:
[Alter, Schulstufe und notwendiges Vorwissen]

Ziel:
Die lernende Person verbessert ihre eigene Erklärung anhand dieser Kriterien:
1. [Kriterium]
2. [Kriterium]
3. [Kriterium]

Ablauf:
1. Fasse knapp zusammen, was du in der Erklärung verstanden hast.
2. Stelle genau eine Klärungsfrage.
3. Gib nach der Antwort höchstens einen Hinweis zum wichtigsten fehlenden Kriterium.
4. Fordere zu einer überarbeiteten Erklärung auf.
5. Gib danach Feedback zu den Kriterien. Zeige eine Mustererklärung nur auf Wunsch.

Grenzen:
- Behaupte keine sichere Diagnose über das Verständnis.
- Erfinde keine Fachinformationen ausserhalb des bereitgestellten Materials.
- Frage nicht nach Namen oder persönlichen Daten.
- Bei sensiblen, persönlichen, gefährlichen oder themenfremden Anliegen:
  freundlich begrenzen und an eine Lehrperson oder geeignete Fachperson verweisen.
- Wenn du unsicher bist, sage dies ausdrücklich.

Ausgabe:
- kurze, altersangemessene Sprache,
- immer nur eine Frage oder ein nächster Schritt,
- keine Bewertung mit Noten oder Punktzahl.
```

Prüfe die Spezifikation zuerst direkt mit einem Sprachmodell. Überarbeite sie, bevor du eine Oberfläche baust.

Nutze danach diesen Coding-Auftrag:

```text
Erstelle eine responsive Web-App für den unten beschriebenen Erklär-Coach.
[Coach-Spezifikation einfügen]

Die Oberfläche braucht:
- eine kurze Erklärung von Zweck und Grenze,
- ein Eingabefeld für die eigene Erklärung,
- eine schrittweise Darstellung des Dialogs,
- einen sichtbaren Neustart,
- einen Hinweis, keine personenbezogenen Daten einzugeben,
- eine Fehlermeldung, falls der KI-Dienst nicht erreichbar ist.

Trenne feste Interface-Regeln, Coach-Spezifikation und Modellaufruf im Code.
Speichere im Prototyp keine Eingaben dauerhaft.
Zeige keine technischen Zugangsschlüssel im Browsercode.

Erkläre nach der Minimalversion, wo Regeln, Prompt und Modellaufruf liegen.
```

Wenn für den Modellaufruf ein Schlüssel oder Serverdienst nötig ist, folge der sicheren Vorgabe deiner Entwicklungsumgebung. Kopiere keine geheimen Schlüssel in öffentlich sichtbaren Code.

---

## 5. Test & Reflect: Teste systematisch statt exemplarisch

Erstelle eine Tabelle mit mindestens zwölf Fällen:

- drei fachlich gute oder teilweise gute Erklärungen;
- drei typische fachliche Fehler;
- zwei sehr kurze oder mehrdeutige Eingaben;
- zwei Versuche, sofort eine Lösung zu erhalten;
- eine themenfremde Eingabe;
- eine sensible oder persönliche Eingabe ohne reale Daten.

Bewerte jede Reaktion getrennt:

| Kriterium | Leitfrage |
|---|---|
| fachliche Richtigkeit | Ist die Reaktion mit dem geprüften Material vereinbar? |
| Lernförderlichkeit | Regt sie eine relevante Eigenleistung an? |
| Begrenzung | Bleibt der Coach im definierten Geltungsbereich? |
| Transparenz | Macht er Unsicherheit und Grenzen sichtbar? |
| Sicherheit | Werden sensible oder ungeeignete Fälle angemessen behandelt? |
| Konsistenz | Reagiert er bei Wiederholung hinreichend stabil? |

Führe kritische Fälle mehrfach aus. Eine gute Einzelantwort ist kein Nachweis für zuverlässiges Verhalten.

Lass danach zwei Lernende eine kurze Aufgabe mit dem Coach bearbeiten. Beobachte, ob sie ihre Erklärung tatsächlich verbessern oder nur Formulierungen übernehmen. Eine Fachperson prüft die Coach-Reaktionen.

Überarbeite Prompt, Regeln oder Geltungsbereich und führe danach die kritischen Tests erneut durch.

---

## 6. Grow: Triff eine begründete Einsatzentscheidung

Erstelle eine kurze Coach-Card:

```text
Name und Version:
Unterstützte Lernhandlung:
Nicht unterstützte Aufgaben:
Verwendete Fachgrundlage:
Verwendeter KI-Dienst:
Gespeicherte oder übertragene Daten:
Getestete Fälle:
Bekannte Fehler und verbleibende Risiken:
Eskalation an Menschen:
Verantwortliche Person für erneute Tests:
Entscheidung: einsetzen / nur begleitet einsetzen / noch nicht einsetzen
```

Veröffentliche den Coach nur, wenn Zugang, Datenschutz und Geheimnisse technisch geklärt sind. Eine lokale Demonstration ist ein zulässiges Projektergebnis, wenn eine Veröffentlichung nicht verantwortbar ist.

## Projekt abgeschlossen?

- [ ] Die Lernhandlung und der Geltungsbereich sind eng formuliert.
- [ ] Die nicht auszulagernde Denkleistung ist benannt.
- [ ] Feste Regeln, KI-Aufgaben und menschliche Verantwortung sind getrennt.
- [ ] Der Coach fordert Eigenaktivität statt sofortiger Lösungen.
- [ ] Ich habe mindestens zwölf Testfälle ausgeführt.
- [ ] Kritische Fälle wurden wiederholt und nach Änderungen erneut getestet.
- [ ] Eine Fachperson hat Reaktionen geprüft.
- [ ] Zwei Lernende haben den Coach erprobt.
- [ ] Datenschutz, Zugang und Eskalation sind dokumentiert.
- [ ] Die Einsatzentscheidung benennt verbleibende Risiken.

## Das kommt in dein Portfolio

1. Analyse der Unterstützungslücke
2. Unterstützungsversprechen, Nicht-Ziele und Qualitätskriterien
3. Human-AI-Rollenkarte und Gesprächspfade
4. Coach-Spezifikation und Link oder lokale Demonstration
5. Testsuite mit Ergebnissen vor und nach einer Überarbeitung
6. Beobachtungen aus der Erprobung
7. Coach-Card und begründete Einsatzentscheidung

## Wenn du bereits Erfahrung hast

Du kannst einen bestehenden KI-gestützten Lernprozess auditieren. Verkleinere seinen Geltungsbereich, mache die nicht auszulagernde Denkleistung explizit und entwickle eine reproduzierbare Testsuite. Ein freundlicher Disclaimer allein zählt nicht als Begrenzung.

