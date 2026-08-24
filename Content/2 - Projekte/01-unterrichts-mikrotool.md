---
title: Unterrichts-Mikrotool entwickeln
id: unterrichts-mikrotool
slug: unterrichts-mikrotool
type: learn-project
sequence: 1
order: 1
summary: Entwickle ein fokussiertes Unterrichts-Mikrotool und durchlaufe den gesamten VisibleVibe-Prozess.
reference_app: Visueller Klassenzimmer-Timer
status: published
estimated_time: 5–7 Stunden
difficulty: Einstieg
support_level: hoch
prerequisites: []
portfolio_artifact: Getestetes und veröffentlichtes Mikrotool mit kurzer Entwicklungsdokumentation
---

# Projekt 1: Unterrichts-Mikrotool entwickeln

In diesem Projekt entwickelst du einen visuellen Timer für dein Klassenzimmer. Dabei durchläufst du erstmals den gesamten TECC-Prozess: Du untersuchst eine Unterrichtssituation, triffst Gestaltungsentscheidungen, baust eine kleine Web-App und testest sie mit einer anderen Person.

Der Timer ist nur das Übungsprojekt. Entscheidend ist, dass du lernst, ein digitales Werkzeug auf einen klaren pädagogischen Zweck zu reduzieren.

## Das baust du

Dein Timer soll:

- eine Dauer in Minuten annehmen;
- gestartet, pausiert und zurückgesetzt werden können;
- die verbleibende Zeit auch aus Distanz deutlich zeigen;
- im Vollbild funktionieren;
- den Ablauf visuell signalisieren.

Konten, Statistiken, komplexe Animationen und Datenspeicherung brauchst du nicht.

## Das brauchst du

- ungefähr 5 bis 7 Stunden;
- eine konkrete Unterrichtssituation, in der Zeit sichtbar gemacht wird;
- das Excalidraw-Projektboard neben dieser Anleitung;
- einen KI-Coding-Assistenten mit Vorschau;
- eine Person für einen kurzen Test.

> Du brauchst keine Programmiererfahrung. Du musst aber bereit sein, Entscheidungen selbst zu treffen und die erzeugte App systematisch zu prüfen.

## Am Ende kannst du

- eine Nutzungssituation präzise beschreiben;
- notwendige von bloss attraktiven Funktionen unterscheiden;
- eine einfache Oberfläche skizzieren;
- einen umsetzbaren Coding-Auftrag formulieren;
- KI-generierten Code gezielt verändern;
- Zustände und Grenzfälle testen;
- den pädagogischen Nutzen und mögliche Nebenwirkungen beurteilen.

---

## 1. Sense: Beobachte eine konkrete Situation

Denke an eine Unterrichtsphase, in der du Zeit sichtbar machst. Beschreibe nicht allgemein deinen Unterricht, sondern eine einzelne Szene.

### Auf dem Board

Erstelle drei Karten:

1. **Situation:** Wann und wo findet die Szene statt?
2. **Beteiligte:** Was tun Lernende und Lehrperson?
3. **Beobachtung:** Was ist sichtbar oder hörbar problematisch?

Trenne Beobachtungen von Interpretationen.

| Zu allgemein | Beobachtbar |
|---|---|
| Die Lernenden haben kein Zeitgefühl. | Drei Gruppen fragen innerhalb von fünf Minuten nach der verbleibenden Zeit. |
| Der aktuelle Timer ist schlecht. | Die Anzeige ist von der hinteren Reihe nicht lesbar. |

### Zwischencheck

Deine Beschreibung nennt einen konkreten Moment, beteiligte Personen und mindestens eine beobachtbare Schwierigkeit. Die Lösung „Timer“ kommt noch nicht vor.

---

## 2. Frame: Formuliere Problem und Wirkung

Vervollständige auf dem Board diese beiden Sätze:

> Wenn **[Personengruppe]** in **[Situation]** versucht, **[Handlung]**, wird dies erschwert durch **[beobachtbares Problem]**.

> Wenn **[Information oder Handlung]** sichtbar wird, erwarten wir, dass **[beobachtbare Veränderung]** eintritt.

Beispiel:

> Wenn Lernende in einer Gruppenarbeitsphase ihre Arbeit einteilen, wird dies erschwert, weil die verbleibende Zeit nur auf dem kleinen Bildschirm der Lehrperson sichtbar ist.

> Wenn die verbleibende Zeit im Raum eindeutig sichtbar ist, erwarten wir weniger Nachfragen und selbstständigere Übergänge zwischen den Arbeitsschritten.

Notiere zusätzlich eine mögliche Nebenwirkung. Ein sichtbarer Countdown kann beispielsweise Orientierung schaffen, aber auch Zeitdruck verstärken.

### Zwischencheck

Deine Wirkungshypothese beschreibt eine mögliche Veränderung im Handeln. „Der Timer funktioniert“ ist keine pädagogische Wirkung.

---

## 3. Ideate: Begrenze und skizziere dein Werkzeug

Sortiere deine Ideen auf dem Board:

- **Muss:** Ohne diese Funktion ist der Timer in deiner Situation nicht brauchbar.
- **Soll:** Diese Funktion verbessert die Nutzung deutlich.
- **Kann:** Diese Idee ist interessant, aber für den ersten Test nicht nötig.

Für die erste Version dürfen höchstens fünf Funktionen unter **Muss** stehen.

Skizziere danach drei Zustände:

1. Timer ist noch nicht gestartet.
2. Timer läuft oder ist pausiert.
3. Zeit ist abgelaufen.

Zeichne ein, was sichtbar ist und welche Handlung jeweils möglich sein muss. Prüfe die Skizze aus der Perspektive einer Person in der hintersten Reihe.

### Deine Qualitätskriterien

Wähle vier Kriterien, an denen du deine App später testest. Ergänze mindestens eines für deine konkrete Situation.

- Die Restzeit ist aus der vorgesehenen Distanz erkennbar.
- Start, Pause und Reset sind eindeutig.
- Der aktuelle Zustand ist ohne Erklärung verständlich.
- Die App funktioniert im Vollbild.
- Der Ablauf wird wahrnehmbar, aber nicht unnötig stressauslösend signalisiert.

---

## 4. Build: Baue die erste Version

Öffne den Coding-Bereich. Nutze diesen Startprompt und passe die Angaben in eckigen Klammern an:

```text
Erstelle eine kleine Web-App als visuellen Klassenzimmer-Timer.

Nutzungssituation:
[Beschreibe deine konkrete Situation in 2–3 Sätzen.]

Die erste Version muss:
- eine Dauer in ganzen Minuten annehmen,
- starten, pausieren und zurücksetzen können,
- die Restzeit als grosse Ziffern anzeigen,
- im Vollbild gut lesbar sein,
- bei 0:00 einen klaren visuellen Endzustand zeigen.

Gestaltung:
- sehr wenige Bedienelemente,
- hoher Kontrast,
- keine Anmeldung und keine Datenspeicherung,
- responsiv für Notebook und Beamer.

Erstelle zunächst eine funktionierende Minimalversion. Erkläre mir danach kurz,
welcher Teil des Codes Struktur, Gestaltung und Verhalten steuert.
```

### Arbeite in kleinen Schritten

1. Prüfe zuerst nur Start, Pause und Reset.
2. Prüfe danach die Anzeige bei 0:05, 0:01 und 0:00.
3. Ändere anschliessend genau eine Sache, beispielsweise Schriftgrösse oder Endsignal.
4. Lass nicht die ganze App neu schreiben. Bitte um eine gezielte Änderung.
5. Notiere auf dem Board: Was hast du verlangt? Was wurde verändert? Was verstehst du noch nicht?

> Wenn etwas nicht funktioniert, beschreibe dem Coding-Assistenten den beobachteten Fehler, den erwarteten Zustand und die genauen Schritte, mit denen er auftritt.

---

## 5. Test & Reflect: Prüfe mehr als den Idealablauf

Führe zuerst selbst diese Tests durch:

| Test | Erwartetes Verhalten |
|---|---|
| Start bei 1 Minute | Countdown läuft genau einmal los. |
| Pause und erneuter Start | Die Zeit läuft an derselben Stelle weiter. |
| Reset während des Countdowns | Der Timer kehrt eindeutig zum Ausgangszustand zurück. |
| Ablauf bei 0:00 | Die Anzeige wird nicht negativ. |
| Mehrfaches schnelles Klicken | Es starten keine parallelen Countdowns. |
| Kleine und grosse Fensterbreite | Ziffern und Buttons bleiben nutzbar. |

Gib die App danach einer Person ohne Bedienerklärung. Bitte sie:

1. zwei Minuten einzustellen;
2. den Timer zu starten und zu pausieren;
3. den Timer zurückzusetzen;
4. zu erklären, woran sie den aktuellen Zustand erkennt.

Beobachte, ohne sofort zu helfen. Notiere Irritationen, Fehlklicks und Rückfragen. Überarbeite anschliessend mindestens einen Punkt.

### Pädagogische Reflexion

Beantworte auf dem Board:

- Welche Handlung unterstützt der Timer tatsächlich?
- Woran würdest du diese Wirkung im Unterricht erkennen?
- Für wen oder in welcher Situation könnte er ungeeignet sein?
- Was sollte weiterhin durch die Lehrperson entschieden werden?

---

## 6. Grow: Veröffentliche und übertrage

Veröffentliche die App so, dass eine andere Person sie ohne deinen Computer öffnen kann. Erstelle eine kurze Beschreibung:

```text
Dieses Werkzeug unterstützt [Zielgruppe] in [Situation], indem es [Mechanismus].
Getestet wurde [Test]. Aufgrund des Tests wurde [Änderung] vorgenommen.
Nicht geeignet ist das Werkzeug für [Grenze oder Kontext].
```

Entwickle anschliessend eine Transferidee für ein anderes Mikrotool, etwa einen Gruppenindikator, Zufallsgenerator, Lautstärkehinweis oder eine visuelle Ablaufkarte. Du musst diese zweite App noch nicht bauen.

## Projekt abgeschlossen?

- [ ] Ich habe eine konkrete Situation beschrieben.
- [ ] Ich habe Problem und Lösung getrennt.
- [ ] Ich habe eine überprüfbare Wirkungshypothese formuliert.
- [ ] Meine erste Version enthält nur notwendige Funktionen.
- [ ] Ich habe mindestens fünf technische Zustände oder Grenzfälle geprüft.
- [ ] Eine andere Person hat die App ohne Erklärung getestet.
- [ ] Ich habe aufgrund des Tests etwas verändert.
- [ ] Die App ist veröffentlicht.
- [ ] Ich habe Nutzen, Nebenwirkung und Grenze dokumentiert.

## Das kommt in dein Portfolio

1. Problemstatement und Wirkungshypothese
2. Screenshot deines Muss-Soll-Kann-Feldes und deiner Zustandsskizzen
3. Link zur veröffentlichten App
4. kurze Beschreibung einer gezielten Änderung am generierten Code
5. Testprotokoll mit beobachtetem Problem und Überarbeitung
6. Reflexion zu Nutzen, Nebenwirkung und Transfer

## Wenn du bereits Erfahrung hast

Du kannst den Nachbau überspringen und direkt ein eigenes Mikrotool entwickeln. Sense, Frame, der Test mit einer anderen Person und die Portfolioevidenz bleiben verbindlich.

