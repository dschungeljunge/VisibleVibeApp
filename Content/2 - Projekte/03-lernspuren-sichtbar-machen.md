---
title: Lernspuren sichtbar machen
id: lernspuren-sichtbar-machen
slug: lernspuren-sichtbar-machen
type: learn-project
sequence: 3
order: 3
summary: Entwickle ein datensparsames Dashboard, das Lernspuren verständlich und verantwortungsvoll darstellt.
reference_app: Lernstands-Dashboard
status: published
estimated_time: 10–14 Stunden
difficulty: Fortgeschritten
support_level: mittel
prerequisites:
  - interaktive-lernaufgabe
portfolio_artifact: Datensparsames Dashboard mit begründetem Datenmodell und Interpretationstest
---

# Projekt 3: Lernspuren sichtbar machen

In diesem Projekt entwickelst du ein Dashboard, das ausgewählte Lernspuren verständlich darstellt. Ausgangspunkt ist nicht die Frage „Welche Daten haben wir?“, sondern „Welche Entscheidung soll mit diesen Daten besser möglich werden?“

Du lernst, Daten zu reduzieren, passende Darstellungen auszuwählen und Fehlinterpretationen sichtbar zu machen. Dein Dashboard soll professionelles Urteil unterstützen, nicht ersetzen.

## Das baust du

Ein kleines Dashboard für Daten aus einer interaktiven Lernaufgabe. Es zeigt:

- Bearbeitungsstand für wenige Aufgaben oder Lernziele;
- erste und überarbeitete Antworten;
- Sicherheitseinschätzungen;
- Nutzung eines Hinweises;
- fehlende oder widersprüchliche Daten;
- einen begründeten nächsten Schritt.

Du beginnst mit synthetischen Daten. Verwende im Projekt keine Klarnamen und keine realen personenbezogenen Daten.

## Das brauchst du

- die Lernlogik aus Projekt 2 oder eine vergleichbare Lernaufgabe;
- das Excalidraw-Projektboard;
- einen KI-Coding-Assistenten mit Vorschau;
- die unten bereitgestellten Testdaten;
- drei Personen für einen Interpretationstest.

## Am Ende kannst du

- eine pädagogische Entscheidung als Datenzweck formulieren;
- Lernspuren von Behauptungen über einen Lernzustand unterscheiden;
- ein minimales Datenschema entwickeln;
- eine passende Visualisierung auswählen;
- fehlende und unsichere Daten sichtbar behandeln;
- Datenschutz und Zugriff bereits im Entwurf berücksichtigen;
- testen, welche Schlussfolgerungen Menschen aus einem Dashboard ziehen.

---

## 1. Sense: Beginne mit einer Entscheidung

Wähle eine konkrete Person und eine konkrete Entscheidung.

Beispiele:

- Eine lernende Person entscheidet, welche Aufgabe sie nochmals bearbeiten möchte.
- Eine Lehrperson entscheidet, mit wem sie ein kurzes Verständnisgespräch führt.
- Eine Lerngruppe entscheidet, welches Konzept gemeinsam geklärt werden soll.

### Auf dem Board

Vervollständige:

> **[Person]** muss in **[Situation]** entscheiden, ob **[mögliche Handlungen]**. Heute fehlt dafür **[Information]**.

Notiere danach zwei Spalten:

- Was müsste die Person tatsächlich wissen?
- Welche vorhandenen Daten wirken nützlich, beantworten die Frage aber nicht direkt?

Beispiel: Bearbeitungszeit kann auffällig sein, zeigt aber nicht eindeutig, ob eine Person gründlich arbeitete, abgelenkt war oder die Aufgabe nicht verstand.

---

## 2. Frame: Begrenze Zweck und Aussage

Formuliere deinen Entscheidungssatz:

> Wenn **[Person]** die Darstellung sieht, kann sie begründeter entscheiden, ob **[nächste Handlung]**.

Formuliere direkt darunter einen Grenzsatz:

> Aus diesen Daten darf nicht geschlossen werden, dass **[zu weit gehende Interpretation]**.

Beispiel:

> Wenn eine Lehrperson Antwortrevision und Sicherheit gemeinsam sieht, kann sie begründeter auswählen, zu welcher Aufgabe sie nachfragt.

> Daraus darf nicht geschlossen werden, dass eine Person das gesamte Konzept dauerhaft beherrscht oder nicht beherrscht.

### Zwischencheck

Wenn dein Satz keine konkrete Handlung enthält, ist der Datenzweck noch zu allgemein.

---

## 3. Ideate: Modelliere nur notwendige Daten

Nutze für die Referenz-App dieses Datenschema:

| Feld | Bedeutung | Beispiel |
|---|---|---|
| learner_id | zufällige oder pseudonyme Kennung | L04 |
| task_id | Aufgabe oder Lernziel | kondensation_1 |
| attempt | erster oder zweiter Versuch | 1 |
| correct | fachlich passend beantwortet | true |
| confidence | Selbsteinschätzung von 1 bis 4 | 2 |
| used_hint | Hinweis vor Antwort genutzt | true |

### Beispieldaten

```csv
learner_id,task_id,attempt,correct,confidence,used_hint
L01,kondensation_1,1,false,4,false
L01,kondensation_1,2,true,3,true
L02,kondensation_1,1,true,2,false
L03,kondensation_1,1,true,4,false
L04,kondensation_1,1,false,1,false
L04,kondensation_1,2,false,2,true
L05,kondensation_1,1,true,,false
L06,kondensation_1,1,false,4,false
L06,kondensation_1,2,false,4,true
L07,kondensation_1,1,true,3,false
L08,kondensation_1,1,,2,false
```

Die leeren Werte sind beabsichtigt. Dein Dashboard muss zeigen, dass Daten fehlen, statt sie als falsch oder null zu behandeln.

### Auf dem Board

Zeichne einen Datenfluss:

```text
Lernhandlung → erfasstes Feld → Verarbeitung → Darstellung → mögliche Entscheidung
```

Beantworte für jedes Feld:

- Warum brauche ich es?
- Wer darf es sehen?
- Wie lange wird es gebraucht?
- Was geht verloren, wenn ich es weglasse?

Entferne mindestens ein Feld, das für deinen Entscheidungssatz nicht notwendig ist.

### Entwirf zwei Darstellungen

Skizziere zwei Varianten, beispielsweise:

- Matrix aus Lernenden und Aufgaben;
- vier Felder aus Richtigkeit und Sicherheit;
- Verlauf von erstem zu zweitem Versuch;
- Liste offener Gesprächsanlässe.

Wähle nicht die schönste, sondern die Darstellung, die deine Entscheidung am klarsten unterstützt.

---

## 4. Build: Baue das Dashboard mit Testdaten

Nutze diesen Startprompt:

```text
Erstelle eine responsive Dashboard-Web-App auf Basis der folgenden CSV-Daten:
[CSV aus dieser Projektseite einfügen]

Zweck:
[Dein Entscheidungssatz]

Das Dashboard soll:
- erste und zweite Versuche unterscheidbar machen,
- Richtigkeit und Sicherheit gemeinsam darstellen,
- fehlende Werte ausdrücklich als „keine Angabe“ zeigen,
- die Nutzung eines Hinweises sichtbar machen,
- von einer Übersicht zu den zugrunde liegenden Einträgen führen,
- keine Rangliste und keinen Gesamtscore erzeugen.

Füge oberhalb der Darstellung einen kurzen Hinweis ein:
„Diese Ansicht zeigt ausgewählte Lernspuren. Sie erlaubt keine vollständige
Aussage über den Lernstand einer Person.“

Verwende nur die bereitgestellten lokalen Testdaten. Keine Anmeldung,
keine externe Datenbank und keine Übertragung personenbezogener Daten.

Erkläre mir nach der Minimalversion:
1. wie die Daten eingelesen werden,
2. wie fehlende Werte behandelt werden,
3. wo Darstellung und Schwellenwerte verändert werden können.
```

Prüfe jede berechnete Zahl manuell an zwei Personen aus dem Datensatz. Wenn du Kategorien oder Farben verwendest, dokumentiere deren Bedeutung. Vermeide die Etiketten „schwach“ oder „stark“.

---

## 5. Test & Reflect: Untersuche Interpretationen

Ergänze zunächst drei Grenzfälle in deinen Testdaten:

1. richtig mit geringer Sicherheit;
2. falsch mit hoher Sicherheit;
3. fehlende Antwort oder Sicherheit.

Gib danach drei Personen dieselbe Dashboard-Ansicht. Sie sollen ohne Diskussion schriftlich beantworten:

- Was ist sicher erkennbar?
- Was vermutest du nur?
- Welche nächste Handlung würdest du wählen?
- Welche zusätzliche Information bräuchtest du?

Vergleiche die Antworten. Markiere Aussagen, die deine Daten nicht tragen. Überarbeite Beschriftung, Darstellung oder Datenauswahl so, dass mindestens eine Fehlinterpretation unwahrscheinlicher wird.

### Prüfe die Verantwortung

Beantworte:

- Wer sieht Einzelinformationen und wer nur eine Zusammenfassung?
- Was passiert, wenn ein Wert falsch oder unvollständig ist?
- Kann die betroffene Person die Daten verstehen und korrigieren?
- Wann müssen die Daten gelöscht werden?
- Welche Entscheidung darf nie automatisch getroffen werden?

---

## 6. Grow: Übertrage auf deinen Kontext

Ersetze die Testdaten nicht sofort durch reale Daten. Erstelle zuerst einen Datensteckbrief:

```text
Entscheidung, die unterstützt werden soll:
Zielgruppe der Darstellung:
Erhobene Felder und Begründung:
Nicht erhobene Felder:
Zugriffsberechtigte Personen:
Aufbewahrungsdauer:
Möglichkeit zur Korrektur:
Zulässige Schlussfolgerungen:
Unzulässige Schlussfolgerungen:
```

Kläre institutionelle Datenschutzanforderungen, bevor du reale Lernendendaten verwendest.

## Projekt abgeschlossen?

- [ ] Mein Ausgangspunkt ist eine konkrete Entscheidung, nicht ein vorhandener Datensatz.
- [ ] Ich habe einen Zweck- und einen Grenzsatz formuliert.
- [ ] Jedes Datenfeld ist begründet.
- [ ] Ich habe mindestens ein unnötiges Feld entfernt.
- [ ] Fehlende Daten werden sichtbar und nicht als null interpretiert.
- [ ] Aggregierte Werte lassen sich zu ihren Einträgen zurückverfolgen.
- [ ] Drei Personen haben die Darstellung unabhängig interpretiert.
- [ ] Ich habe aufgrund einer Fehlinterpretation etwas verändert.
- [ ] Zugriff, Korrektur und Löschung sind geklärt.

## Das kommt in dein Portfolio

1. Entscheidungssatz und Grenzsatz
2. Datenfluss und minimales Datenschema
3. zwei Visualisierungsentwürfe mit begründeter Auswahl
4. Link zum Dashboard mit synthetischen Daten
5. Interpretationstest und dokumentierte Überarbeitung
6. Datensteckbrief mit zulässigen und unzulässigen Schlussfolgerungen

## Wenn du bereits Erfahrung hast

Du kannst ein bestehendes Dashboard auditieren. Rekonstruiere Zweck, Datenfluss und implizite Annahmen. Führe den Interpretationstest durch und entwickle eine reduzierte Alternative. Verwende keine realen Daten, bevor Zugriff und institutionelle Zulässigkeit geklärt sind.

