---
id: "data-analytics"
slug: "data-analytics"
title: "Data Analytics"
summary: "Learning Analytics: Lernaktivitäten erfassen, Fehlermuster analysieren und datengestützte Rückmeldungen erzeugen."
category: "Data Design"
level: 7
status: "stable"
video_url: ""
practice_task: |
  Schreibe eine SQL-Abfrage (oder eine Supabase-Funktion), die für jede Aufgabe deiner App die Fehlerquote und die durchschnittliche Bearbeitungszeit berechnet. Visualisiere das Ergebnis als einfaches Balkendiagramm in deiner App. Interpretiere: Welche Aufgabe ist am schwierigsten — und wie würdest du darauf didaktisch reagieren?
quality_criteria: |
  - Die Abfrage berechnet Fehlerquote (falsche / alle Antworten) und Durchschnittsdauer pro Aufgabe
  - Das Balkendiagramm ist korrekt beschriftet und zeigt Werte auf einen Blick
  - Alle Lerndaten sind anonymisiert verarbeitet (kein Klarname sichtbar)
  - Die Interpretation enthält eine konkrete didaktische Handlungsempfehlung
resources_markdown: |
  - [Handbook of Learning Analytics (2017)](https://solaresearch.org/hla-17/) - Standardwerk des Forschungsfelds, kostenlos downloadbar.
  - [Siemens & Long: Penetrating the Fog (2011)](https://er.educause.edu/articles/2011/9/penetrating-the-fog-analytics-and-learning-and-education) - Klassischer Einführungsartikel zu Learning Analytics im Bildungskontext.
  - [Recharts Dokumentation](https://recharts.org/en-US/api) - React-Diagrammbibliothek für einfache Visualisierungen.
  - [Supabase: Database Functions](https://supabase.com/docs/guides/database/functions) - Wie man Berechnungen direkt in der Datenbank als PostgreSQL-Funktionen ausführt.
position_x: 2360
position_y: 600
connections:
  - target: "dashboard"
    type: "required_for_project"
  - target: "adaptive-lernumgebung"
    type: "required_for_project"
---

## Der Vibe (Kurzbeschreibung & Relevanz)

George Siemens und Phil Long definierten Learning Analytics 2011 als „das Messen, Sammeln, Analysieren und Berichten von Daten über Lernende und ihre Kontexte, mit dem Ziel, das Lernen und die Lernumgebung zu verstehen und zu optimieren."

Das klingt abstrakt — ist aber für dich als Lehrperson und App-Designerin oder App-Designer sehr konkret: Du hast in deiner App Daten, die du bisher nicht nutzt. Jede Schülerantwort ist ein Datenpunkt. Jede Bearbeitungszeit ist ein Datenpunkt. Jeder Fehlertyp ist ein Datenpunkt. Zusammengenommen erzählen diese Daten eine Geschichte: Wo stockt die Klasse? Welche Aufgabe ist zu leicht, welche zu schwer? Welche Lernende brauchen zusätzliche Unterstützung?

### Warum brauchst du das in deiner Lernapp?

Ohne Analytics ist deine App eine Blackbox: Du weisst, dass die Schülerinnen und Schüler sie nutzen — aber nicht, was sie dabei lernen. Mit Analytics verwandelt sich deine App in ein Diagnoseinstrument. Und Diagnose ist — das belegt Hatties Metastudie — einer der stärksten Hebel für Lehrpersonen: Lehrpersonen, die wissen, was ihre Klasse nicht kann, können gezielt intervenieren.

---

## Didaktisches Szenario & Exploration mit KI

### Das Szenario

Eine Lehrperson nutzt ihre Vokabel-Lernapp seit zwei Wochen mit ihrer Klasse. Sie weiss, dass die App funktioniert — sie sieht, dass sich Schülerinnen und Schüler einloggen. Aber sie weiss nicht:
- Welche Vokabeln werden von mehr als der Hälfte der Klasse falsch beantwortet?
- Gibt es Schülerinnen oder Schüler, die sich seit fünf Tagen nicht mehr eingeloggt haben?
- Welche Vokabeln werden sehr schnell beantwortet — ein Zeichen dafür, dass sie geraten wurden statt erinnert?

Diese drei Fragen lassen sich mit einer strukturierten Datenbank und einfachen SQL-Abfragen beantworten. Die Antworten erlauben gezielte didaktische Interventionen: Die schwierigen Vokabeln in der nächsten Stunde besprechen, inaktive Lernende ansprechen, schnelle Antworten mit einer Mindest-Antwortzeit bremsen.

### Exploration mit der KI

**SQL-Abfragen für Lernanalysen:** Lass dir erklären, wie eine SQL-Abfrage mit `GROUP BY`, `COUNT` und `AVG` funktioniert. Fordere konkrete Beispiele für Lernanalyse-Abfragen: (a) Fehlerquote pro Aufgabe, (b) durchschnittliche Bearbeitungszeit pro Aufgabe, (c) Anzahl aktiver Nutzender in den letzten 7 Tagen.

**Datenschutz in der Lernanalyse:** Learning Analytics und Datenschutz stehen in einem grundsätzlichen Spannungsfeld. Mehr Daten ermöglichen präzisere Analysen — aber erhöhen auch das Risiko für Datenmissbrauch und Stigmatisierung. Diskutiere mit der KI: Welche Daten sind für die Lernanalyse in deiner App wirklich notwendig? Was solltest du bewusst *nicht* messen?

**Aggregiert vs. individuell:** Was ist der Unterschied zwischen einer aggregierten Analyse (Fehlerquote der gesamten Klasse bei Aufgabe 7) und einer individuellen Analyse (Fehlerquote von Schüler Jonas bei Aufgabe 7)? Wann ist welche Ebene angemessen — und für wen?

---

## Geführtes Beispiel (Worked Example)

Wir bauen eine **Analytics-Funktion**, die für jede Aufgabe Fehlerquote und Bearbeitungszeit berechnet und visualisiert.

### Das Entwicklungsziel

**Schritt 1 — Zeitstempel-Tracking:**
Erweitere dein Datenbankschema um zwei Felder in der `learning_responses`-Tabelle: `started_at` (Zeitstempel, wann die Aufgabe angezeigt wurde) und `responded_at` (Zeitstempel, wann geantwortet wurde). Die Differenz ergibt die Bearbeitungszeit.

**Schritt 2 — SQL-Abfrage:**
Schreibe eine Abfrage, die folgendes berechnet — gruppiert nach `item_id`:
- Anzahl aller Antworten
- Anzahl falscher Antworten
- Fehlerquote (falsch / alle, als Prozentwert)
- Durchschnittliche Bearbeitungszeit in Sekunden

**Schritt 3 — Supabase-Funktion (optional):**
Kapsle die Abfrage in eine PostgreSQL-Funktion in Supabase, die du aus Next.js mit `supabase.rpc('get_item_analytics')` aufrufen kannst. Das trennt die Analytics-Logik sauber vom Frontend.

**Schritt 4 — Balkendiagramm:**
Visualisiere die Fehlerquote pro Aufgabe als Balkendiagramm mit Recharts. Die X-Achse zeigt die Aufgaben-ID oder den Aufgabentitel, die Y-Achse zeigt die Fehlerquote in Prozent. Farbliche Kodierung: grün unter 30 %, gelb 30–60 %, rot über 60 %.

---

## Häufige Stolpersteine (Gotchas & Re-Prompting)

* ⚠️ **Division durch null in der Fehlerquote:**
  * *Warum passiert das?* Wenn eine Aufgabe noch keine Antworten hat, teilt die Abfrage durch null — und gibt einen Fehler oder NULL zurück statt 0 %.
  * *Lösung (Re-Prompt):* Instruiere die KI, `NULLIF(total_answers, 0)` oder `CASE WHEN total_answers = 0 THEN 0 ELSE ... END` zu verwenden. Erkläre das Problem: Neue Aufgaben ohne Antworten sollen mit 0 % Fehlerquote angezeigt werden, nicht als Fehler.

* ⚠️ **Die KI aggregiert über alle Nutzenden, auch gelöschte:**
  * *Warum passiert das?* Wenn Nutzerkonten gelöscht werden, bleiben deren Antworten in `learning_responses` — als verwaiste Datensätze ohne gültigen Fremdschlüssel. Die Abfrage schliesst sie trotzdem ein.
  * *Lösung (Re-Prompt):* Füge einen JOIN auf die `users`-Tabelle hinzu und filtere mit `WHERE users.id IS NOT NULL`. Oder: Richte einen Cascade-Delete ein, der Antworten automatisch löscht, wenn ein User-Account entfernt wird.

* ⚠️ **Bearbeitungszeit enthält Ausreisser (Schüler:in pausiert das Browser-Tab):**
  * *Warum passiert das?* Wenn eine Schülerin das Tab pausiert, wechselt und 20 Minuten später zurückkommt, ergibt die Differenz von `started_at` und `responded_at` 20 Minuten — ein irreführender Ausreisser.
  * *Lösung (Re-Prompt):* Weise die KI an, in der Abfrage einen Maximalwert für Bearbeitungszeiten zu setzen (z. B. 120 Sekunden). Antworten über diesem Wert werden aus der Durchschnittsberechnung ausgeschlossen oder separat ausgewiesen.
