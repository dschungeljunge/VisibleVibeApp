---
id: "interaktive-elemente"
slug: "interaktive-elemente"
title: "Interaktive Elemente"
summary: "Drag & Drop, Zuordnungsaufgaben, Slider und unmittelbares visuelles Feedback für aktives Lernen."
category: "UX Design"
level: 4
status: "stable"
video_url: ""
practice_task: |
  Baue ein interaktives Zuordnungs-Feature für deine Lernapp: Lernende ziehen Begriffe per Drag & Drop auf die passenden Definitionen. Nach dem Zuordnen erhalten sie sofortiges farbliches Feedback (richtig/falsch) und können fehlerhafte Zuordnungen korrigieren.
quality_criteria: |
  - Drag & Drop funktioniert auf Desktop und Touch-Geräten (Mobile)
  - Jedes Element signalisiert klar seinen Zustand: unzugeordnet / zugeordnet / richtig / falsch
  - Nach einer Falschzuordnung kann die Lernende / der Lernende korrigieren (kein sofortiger Lock)
  - Die Lösung wird erst nach dem Absenden aller Zuordnungen gezeigt, nicht Element für Element
  - Das Feature ist ohne Mausbedienung via Keyboard navigierbar (Barrierefreiheit)
resources_markdown: |
  - [MDN: HTML Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API) - Die native Browser-API für Drag & Drop, ohne Bibliothek.
  - [dnd-kit (React)](https://dndkit.com) - Moderne, barrierefreie Drag-&-Drop-Bibliothek für React.
  - [Gestalt Principles – Interaction Design Foundation](https://www.interaction-design.org/literature/topics/gestalt-principles) - Wie visuelle Gruppierung Verständnis und Orientierung beeinflusst.
  - [WCAG 2.1: Keyboard Accessible](https://www.w3.org/WAI/WCAG21/Understanding/keyboard) - Barrierefreiheits-Standard für Tastaturnavigation.
position_x: 1220
position_y: 780
connections:
  - target: "quiz-webapp"
    type: "required_for_project"
---

## Der Vibe (Kurzbeschreibung & Relevanz)

Eine Aufgabe, die man anfassen, bewegen und in die richtige Position bringen kann, ist didaktisch etwas anderes als eine Aufgabe, die man anklickt. Die Körperlichkeit des Handelns — auch in der digitalen Simulation durch Drag & Drop — aktiviert andere Verarbeitungsprozesse als das reine Lesen oder Auswählen.

Aber interaktive Elemente haben eine Tücke: Sie sind technisch aufwendiger zu implementieren als einfache Multiple-Choice-Fragen, und sie erzeugen, wenn sie schlecht designt sind, extraneous cognitive load anstatt Lernaktivierung. Eine Drag-&-Drop-Aufgabe, bei der die Lernenden unklar ist, welche Elemente ziehbar sind und wo sie landen sollen, führt zu Frustration statt zu Lerneffekten.

### Warum brauchst du das in deiner Lernapp?

Zuordnungsaufgaben (Matching), Sortieraufgaben und interaktive Diagramme sind didaktisch wirkungsvoll, weil sie **Verknüpfungen sichtbar machen**: Welches Konzept gehört zu welchem Beispiel? In welcher Reihenfolge passieren Ereignisse? Welche Komponenten bilden ein System? Diese Art von Aufgaben aktiviert auf Blooms Ebene des Anwendens und Analysierens — deutlich höher als das blosse Wiedererkennen in Multiple-Choice-Formaten.

---

## Didaktisches Szenario & Exploration mit KI

### Das Szenario

Du baust einen Geschichts-Trainer für die 8. Klasse. Die Aufgabe: Die Lernenden sollen historische Ereignisse der Französischen Revolution der richtigen Phase zuordnen (Vorrevolution / konstitutionelle Monarchie / Erste Republik / Terrorherrschaft).

**Variante A:** Multiple-Choice. Unter jedem Ereignis stehen vier Phasen zur Auswahl. Die Lernenden klicken eine an. Schnell, einfach, aber sie sehen nicht, welche anderen Ereignisse in dieselbe Phase fallen.

**Variante B:** Drag & Drop. Oben eine Liste von Ereignissen. Unten vier Spalten (eine pro Phase). Die Lernenden ziehen jedes Ereignis in die passende Spalte. Sie sehen sofort, wie sich die Zeitlinie füllt, und können Fehlzuordnungen vor dem Absenden noch korrigieren.

Variante B ist anspruchsvoller zu bauen — aber sie erzeugt ein qualitativ anderes Lernerlebnis: Die Lernenden konstruieren aktiv eine zeitliche Struktur, statt passiv Optionen abzugleichen.

### Exploration mit der KI

**Affordance und Feedback-Design:** Was macht eine Drag-&-Drop-Aufgabe intuitiv benutzbar? Diskutiere mit der KI: Welche visuellen Signale signalisieren einem Nutzenden, dass ein Element ziehbar ist? Was sind die Unterschiede in der Wahrnehmung zwischen Desktop- und Touch-Interfaces? Wie gibt man sofortiges, nicht-überwältigendes Feedback nach einer Zuordnung?

**Native API vs. Bibliothek:** Die Browser-eigene HTML Drag and Drop API ist schwerfällig und hat bekannte Probleme mit Touch-Geräten. Bibliotheken wie `dnd-kit` lösen das, fügen aber eine Abhängigkeit hinzu. Lasse die KI die Vor- und Nachteile beider Ansätze für deine konkrete App erklären. Wann würde eine Bibliothek den Mehraufwand rechtfertigen?

**Barrierefreiheit bei Interaktiven Aufgaben:** Drag & Drop ist per Design mausbasiert. Wie kann eine Zuordnungsaufgabe auch für Lernende mit motorischen Einschränkungen oder ohne Maus zugänglich gemacht werden? Lass dir die Tastatur-Alternative erklären (Tab / Enter / Pfeiltasten) und diskutiere, ob das für deine Zielgruppe relevant ist.

---

## Geführtes Beispiel (Worked Example)

Wir bauen eine **Drag-&-Drop-Zuordnungsaufgabe** für eine Lernapp. Das Feature soll generisch sein: Du gibst Begriffe und Kategorien als Daten mit, die Komponente kümmert sich um die Interaktion.

### Das Entwicklungsziel

Instruiere deine KI, eine React-Komponente zu erstellen, die folgende Anforderungen schrittweise umsetzt:

**Schritt 1 — Die Datenstruktur:**
Definiere die Aufgabe als JavaScript-Objekt: ein Array von Begriffen (jeder mit einer korrekten Kategorie-ID) und ein Array von Kategorien (jede mit ID und Label). Die Komponente erhält diese Daten als Props.

**Schritt 2 — Die Zuordnungslogik:**
Die Begriffe werden initial in einer unsortierten Liste angezeigt. Die Kategorien werden als Zielbereiche (Drop Zones) dargestellt. State verwaltet, welcher Begriff welcher Kategorie zugeordnet ist. Noch nicht zugeordnete Begriffe bleiben in der Ausgangsliste.

**Schritt 3 — Feedback-Mechanismus:**
Ein „Auswerten"-Button erscheint, sobald alle Begriffe zugeordnet sind. Nach dem Klick wechselt die Hintergrundfarbe jedes zugeordneten Begriffs: grün für richtig, rot für falsch. Fehlerhafte Begriffe können zurück in die Ausgangsliste gezogen und neu zugeordnet werden.

**Schritt 4 — Mobile Support:**
Teste die Komponente auf einem Touch-Gerät oder im Browser-DevTools-Mobilmodus. Falls Drag & Drop nicht funktioniert, instruiere die KI, eine Touch-kompatible Lösung zu implementieren (entweder via `dnd-kit` oder via Click-to-Select-Click-to-Place als Fallback).

---

## Häufige Stolpersteine (Gotchas & Re-Prompting)

* ⚠️ **Drag & Drop funktioniert im Browser, nicht aber auf dem Handy:**
  * *Warum passiert das?* Die native HTML Drag and Drop API unterstützt keine Touch-Events. Auf Mobile-Geräten muss explizit ein Touch-Event-Handler oder eine spezialisierte Bibliothek verwendet werden.
  * *Lösung (Re-Prompt):* Weise die KI explizit auf das Touch-Problem hin und fordere entweder die Integration von `dnd-kit` (React-Bibliothek mit Touch-Support) oder eine Click-basierte Alternative an, die auf allen Geräten funktioniert.

* ⚠️ **Der Zustand bricht beim Drag zusammen (Phantomkopie bleibt sichtbar):**
  * *Warum passiert das?* Bei fehlerhafter State-Verwaltung bleibt ein Element visuell an der alten Position, obwohl es laut State bereits zugeordnet ist. Das passiert, wenn das Drag-Event und der State nicht synchron aktualisiert werden.
  * *Lösung (Re-Prompt):* Beschreibe das Symptom präzise: „Ein Element erscheint sowohl in der Ausgangsliste als auch in der Zielkategorie gleichzeitig." Füge hinzu, dass der State-Update und die visuelle Aktualisierung synchron erfolgen müssen.

* ⚠️ **Die KI baut das Feedback zu früh ein (nach jeder Einzelzuordnung):**
  * *Warum passiert das?* Sofortiges Feedback nach jeder einzelnen Zuordnung (statt nach dem Auswerten aller) klingt hilfreich — ist es didaktisch aber nicht. Die Lernenden optimieren dann ihre Zuordnungen über Trial-and-Error statt über echtes Überlegen.
  * *Lösung (Re-Prompt):* Betone, dass Richtig/Falsch-Feedback erst nach dem expliziten Absenden aller Zuordnungen sichtbar werden soll. Das ist eine bewusste didaktische Entscheidung — erkläre der KI den Grund: Die Lernenden sollen alle Zuordnungen aktiv überlegen, bevor sie eine Rückmeldung erhalten.
