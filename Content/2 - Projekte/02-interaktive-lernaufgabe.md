---
title: Interaktive Lernaufgabe gestalten
id: interaktive-lernaufgabe
slug: interaktive-lernaufgabe
type: learn-project
sequence: 2
order: 2
summary: Gestalte eine diagnostische Lernaufgabe, die Denkwege und Überarbeitungen sichtbar macht.
reference_app: Diagnostische Entscheidungs-App
status: published
estimated_time: 8–12 Stunden
difficulty: Aufbau
support_level: mittel bis hoch
prerequisites:
  - unterrichts-mikrotool
portfolio_artifact: Getestete Lernaufgabe mit begründeter Aufgaben- und Feedbacklogik
---

# Projekt 2: Interaktive Lernaufgabe gestalten

In diesem Projekt entwickelst du eine kurze digitale Lernaufgabe. Lernende treffen eine fachliche Entscheidung, geben ihre Sicherheit an und erhalten ein Feedback, das weiteres Denken auslöst.

Du baust nicht einfach ein Quiz. Deine Aufgabe soll einen Denkweg sichtbar machen und Lernenden ermöglichen, ihre erste Antwort zu überprüfen.

## Das baust du

Eine Sequenz mit drei bis fünf Aufgaben. Jede Aufgabe enthält:

- eine fachlich relevante Frage oder Entscheidung;
- plausible Antwortmöglichkeiten;
- eine Einschätzung der eigenen Sicherheit;
- ein Feedback, das zur jeweiligen Antwort passt;
- einen zweiten Versuch oder eine Anschlussfrage.

Als Referenz kannst du mit dieser Frage beginnen:

> An einem kalten Glas entstehen aussen Wassertropfen. Woher kommt dieses Wasser?

Mögliche Antworten:

- Es tritt durch das Glas nach aussen.
- Es kommt aus der Luft und kondensiert am kalten Glas.
- Das Glas erzeugt Wasser, wenn es kalt wird.
- Es spritzt beim Einschenken an die Aussenseite.

Du kannst das Beispiel nach dem Nachbau auf ein eigenes Fachthema übertragen.

## Das brauchst du

- eine fachliche Schwierigkeit aus deinem Unterricht;
- wenn möglich zwei bis drei reale Lernäusserungen oder typische Fehler;
- das Excalidraw-Projektboard;
- einen KI-Coding-Assistenten mit Vorschau;
- zwei Lernende oder andere Testpersonen;
- eine Person für ein fachliches Review.

## Am Ende kannst du

- ein Lernproblem in eine beobachtbare Denkhandlung übersetzen;
- diagnostisch ergiebige Antwortmöglichkeiten entwickeln;
- Lernziel, Aufgabe und Feedback aufeinander abstimmen;
- gestuftes Feedback formulieren;
- einen verzweigten Interaktionsablauf umsetzen;
- Bedienbarkeit und Lernlogik getrennt testen.

---

## 1. Sense: Sammle Hinweise auf das Denken der Lernenden

Wähle eine fachliche Schwierigkeit. Sammle zwei bis drei konkrete Hinweise: falsche Antworten, typische Erklärungen, Rückfragen oder beobachtete Strategien.

### Auf dem Board

Lege für jeden Hinweis eine Karte an:

- **Äusserung oder Handlung:** Was sagte oder tat die Person genau?
- **Mögliche Vorstellung:** Was könnte dahinterliegen?
- **Unsicherheit:** Welche andere Erklärung wäre ebenfalls möglich?

> Behandle eine falsche Antwort nicht sofort als stabile Fehlvorstellung. Eine einzelne Antwort kann durch Sprache, Aufmerksamkeit oder die Aufgabe selbst verursacht sein.

### Zwischencheck

Du hast mindestens eine konkrete Lernäusserung und kennzeichnest Interpretationen als vorläufig.

---

## 2. Frame: Bestimme die gewünschte Denkhandlung

Vervollständige:

> Lernende sollen nicht nur **[Ergebnis nennen]**, sondern **[fachlich relevante Denkhandlung]**.

Beispiel:

> Lernende sollen nicht nur „Kondensation“ auswählen, sondern erklären, dass Wasserdampf aus der Umgebungsluft am kalten Glas in den flüssigen Zustand übergeht.

Formuliere danach deine Wirkungshypothese:

> Wenn Lernende **[Entscheidung treffen / begründen / vergleichen]** und anschliessend **[Art des Feedbacks]** erhalten, können sie **[ihre Erklärung prüfen oder verbessern]**.

Lege ein sichtbares Lernzeichen fest. Das kann eine verbesserte Begründung, ein begründeter Wechsel der Antwort oder eine passendere Anwendung auf einen neuen Fall sein.

---

## 3. Ideate: Entwickle Aufgabe und Feedback

### Schritt 1: Formuliere die Kernfrage

Die Frage soll eine fachliche Entscheidung erfordern. Vermeide reine Begriffserinnerung, wenn du einen Denkweg untersuchen möchtest.

### Schritt 2: Entwickle Antwortmöglichkeiten

Erstelle eine Tabelle auf dem Board:

| Antwort | Möglicher Gedanke | Was möchtest du daraus noch nicht schliessen? |
|---|---|---|
| Option A | … | … |
| Option B | … | … |
| Option C | … | … |

Mindestens zwei Antwortmöglichkeiten müssen plausibel sein. Offensichtliche Spassantworten liefern keine diagnostisch brauchbare Information.

### Schritt 3: Plane gestuftes Feedback

Entwickle für jede Antwort:

1. eine Rückmeldung, die den gewählten Gedanken aufgreift;
2. einen Hinweis oder eine Gegenfrage;
3. einen zweiten Versuch;
4. erst danach eine fachliche Auflösung.

Beispiel für „Das Wasser tritt durch das Glas“:

> Prüfe deine Erklärung: Das Glas war aussen zunächst trocken. Welche Wasserquelle befindet sich ständig in der Umgebung des Glases?

### Schritt 4: Zeichne einen vollständigen Pfad

Zeichne im Board den Weg einer Person von der Frage über Antwort und Sicherheitseinschätzung bis zu Feedback, zweitem Versuch und Abschluss. Markiere Stellen, an denen sie steckenbleiben oder versehentlich weiterklicken könnte.

---

## 4. Build: Setze eine kurze Sequenz um

Nutze diesen Startprompt und ersetze die Inhalte in eckigen Klammern:

```text
Erstelle eine responsive Web-App für eine diagnostische Lernaufgabe.

Lernziel:
[Was sollen Lernende verstehen oder erklären können?]

Die App enthält zunächst genau eine Aufgabe:
[Frage]

Antwortmöglichkeiten:
[Optionen mit Kennzeichnung der fachlich besten Antwort]

Ablauf:
1. Eine Antwort auswählen.
2. Sicherheit auf einer Skala von 1 bis 4 angeben.
3. Antwort absenden.
4. Ein zur Antwort passendes Feedback anzeigen, aber noch nicht sofort die Lösung.
5. Einen zweiten Versuch ermöglichen.
6. Danach eine fachliche Auflösung und eine kurze Transferfrage zeigen.

Anforderungen:
- keine Anmeldung und keine externe Datenspeicherung,
- Antwort und Sicherheit nur im aktuellen Browserzustand halten,
- klare Tastaturbedienung und gut lesbare Darstellung,
- Inhalt und Feedback im Code getrennt von der Darstellungslogik speichern.

Zeige zuerst eine funktionierende Minimalversion. Erkläre anschliessend,
wo ich Frage, Antworten und Feedback ändern kann.
```

Prüfe die erste Aufgabe vollständig, bevor du weitere hinzufügst. Ergänze danach höchstens vier Aufgaben. Notiere jede grössere Änderung auf dem Board mit Begründung.

---

## 5. Test & Reflect: Prüfe Bedienung und Lernlogik getrennt

### Test A: Bedienbarkeit

Gib die App einer Person ohne fachlichen Testauftrag. Beobachte:

- Versteht sie, was zu tun ist?
- Erkennt sie, ob eine Antwort ausgewählt wurde?
- Versteht sie die Sicherheitsskala?
- Findet sie den zweiten Versuch?
- Kann sie die Aufgabe mit Tastatur bedienen?

### Test B: Lernlogik

Lass zwei Lernende die Aufgabe bearbeiten und möglichst laut denken. Notiere:

- Wie begründen sie die erste Antwort?
- Passt das Feedback zu ihrem tatsächlichen Gedanken?
- Verändert der Hinweis die Erklärung oder nur die Auswahl?
- Können sie das Prinzip auf die Transferfrage anwenden?

Lass danach eine Fachperson Frage, Antwortoptionen, Feedback und Auflösung prüfen.

Überarbeite mindestens eine Aufgabe aufgrund dieser Evidenz. „Die App gefällt“ ist keine ausreichende Testaussage.

---

## 6. Grow: Übertrage die Lernlogik

Ersetze die Referenzfrage durch eine Schwierigkeit aus deinem eigenen Fach. Dokumentiere für jede Aufgabe:

```text
Lernziel:
Erwartete Denkhandlung:
Antwortoption und mögliche Vorstellung:
Erster Feedbackimpuls:
Sichtbares Lernzeichen im zweiten Versuch:
Grenze der Interpretation:
```

Veröffentliche die App zusammen mit einem kurzen Hinweis für andere Lehrpersonen: Einsatzsituation, benötigte Zeit, erwartete Lernhandlung und bekannte Grenze.

## Projekt abgeschlossen?

- [ ] Ich arbeite mit konkreten Lernäusserungen oder begründeten Annahmen.
- [ ] Die Aufgabe verlangt eine relevante Denkhandlung.
- [ ] Meine Distraktoren sind fachlich plausibel.
- [ ] Das Feedback eröffnet einen nächsten Denkschritt.
- [ ] Lernende können ihre erste Antwort revidieren.
- [ ] Inhalt und Programmlogik sind getrennt änderbar.
- [ ] Ich habe Bedienbarkeit und Lernlogik separat getestet.
- [ ] Eine Fachperson hat die Inhalte geprüft.
- [ ] Mindestens eine Überarbeitung beruht auf Testevidenz.

## Das kommt in dein Portfolio

1. Beschreibung des Lernproblems mit konkreter Evidenz
2. Wirkungshypothese und erwartete Denkhandlung
3. Screenshot des Aufgaben- und Feedbackpfads
4. Link zur veröffentlichten App
5. Begründung der Antwortmöglichkeiten und Feedbackstufen
6. Ergebnisse des Bedien- und Lernlogiktests
7. dokumentierte Überarbeitung und Grenze der Interpretation

## Wenn du bereits Erfahrung hast

Du kannst direkt eine bestehende digitale Aufgabe aus deinem Unterricht untersuchen und überarbeiten. Der Test mit Lernenden, das fachliche Review und die dokumentierte Verbindung von Lernziel, Denkhandlung, Aufgabe und Feedback bleiben verbindlich.

