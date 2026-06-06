---
id: "daten-darstellen"
slug: "daten-darstellen"
title: "Daten darstellen"
summary: "Datenvisualisierung mit SVG und Chart-Bibliotheken: Fortschrittsbalken, Heatmaps und Diagramme für Lern-Apps."
category: "UX Design"
level: 5
status: "stable"
video_url: ""
practice_task: |
  Baue eine animierte Fortschrittsvisualisierung für deine Lernapp: Ein kreisförmiger Fortschrittsring (SVG-Donut-Chart), der den prozentualen Fortschritt innerhalb einer Lerneinheit anzeigt. Der Ring soll sich beim Laden animiert füllen und die Zahl in der Mitte soll live hochzählen.
quality_criteria: |
  - Die Visualisierung basiert auf SVG (kein rein CSS-basierter Kreisring)
  - Der Fortschritt wird als Prop übergeben (0–100) und ist dynamisch aktualisierbar
  - Die Animation startet beim Einblenden der Komponente (nicht beim Seitenload)
  - Die Farbe wechselt bei 100 % zu einem Erfolgssignal (z. B. Grün)
  - Die Visualisierung ist barrierefrei: Ein aria-label beschreibt den aktuellen Wert für Screenreader
resources_markdown: |
  - [MDN: SVG Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial) - Einführung in SVG-Syntax und -Konzepte direkt im Browser.
  - [Recharts (React)](https://recharts.org) - Einfach zu integrierende Chart-Bibliothek für React, basiert auf D3.
  - [Edward Tufte: Visual Display of Quantitative Information](https://www.edwardtufte.com/book/the-visual-display-of-quantitative-information/) - Das Standardwerk für Datenhonestität und Designprinzipien.
  - [WCAG: Non-text Content](https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html) - Wie grafische Inhalte für Screenreader zugänglich gemacht werden.
position_x: 1600
position_y: 780
connections:
  - target: "cognitive-load-management"
    type: "leads_to"
  - target: "progress-visualization"
    type: "leads_to"
---

## Der Vibe (Kurzbeschreibung & Relevanz)

Edward Tufte, der Pionier der Datenvisualisierung, hat einen Begriff geprägt, der seitdem zum Designstandard geworden ist: **Data-Ink Ratio**. Gemeint ist das Verhältnis zwischen dem Tinteneinsatz, der tatsächlich Daten transportiert, und dem gesamten Tinteneinsatz eines Diagramms. Dekorative Elemente — Schatten, 3D-Effekte, übermässige Farben, Gitterlinien — erhöhen die Menge an Tinte, ohne mehr Information zu vermitteln. Sie verschlechtern das Verhältnis.

Für Lern-Apps bedeutet das: Eine Visualisierung, die gut aussieht, aber schwer lesbar ist, verfehlt ihren Zweck. Der Fortschrittsring, der Balken, die Heatmap — sie sind kein Selbstzweck. Sie sollen Lernenden helfen zu verstehen, wo sie stehen, und sie motivieren, weiterzumachen.

### Warum brauchst du das in deiner Lernapp?

Lernende brauchen Rückmeldungen, die Fortschritt **erlebbar** machen. Text-basiertes Feedback wie „Du hast 7 von 10 Fragen richtig beantwortet" vermittelt die Information — aber es löst kein Erfolgsgefühl aus. Ein Fortschrittsring, der sich füllt, oder ein Balken, der wächst, aktiviert das Belohnungssystem des Gehirns auf eine Art, die reine Text-Rückmeldung nicht kann. Das ist kein Gamification-Trick — es ist die bewusste Nutzung visueller Sprache, um Lernmotivation zu stärken.

---

## Didaktisches Szenario & Exploration mit KI

### Das Szenario

Zwei Lernapp-Varianten für denselben Biologie-Kurs:

**Variante A:** Am Ende jeder Lerneinheit erscheint der Text: „Lektion 3 abgeschlossen. Noch 4 Lektionen übrig." Die Lernenden wissen, dass sie Fortschritt gemacht haben — aber sie spüren ihn nicht.

**Variante B:** Am Ende jeder Lektion füllt sich ein Fortschrittsring von 40 % auf 60 %. Die Zahl in der Mitte zählt langsam hoch. Die Farbe wechselt bei 100 % zu einem satten Grün mit einem kurzen Aufleuchten. Die Lernenden klicken freiwillig auf die nächste Lektion.

Der Unterschied zwischen den Varianten ist nicht der Inhalt — es ist die Sichtbarkeit des Fortschritts. In der Forschung zu Selbstregulation (Zimmerman, 2002) ist die Fortschrittswahrnehmung ein zentraler Faktor für die Aufrechterhaltung der Lernmotivation: Lernende, die ihren Fortschritt als konkret und messbar erleben, zeigen mehr Ausdauer.

### Exploration mit der KI

**SVG vs. CSS vs. Canvas:** Es gibt drei grundlegende Technologien für Visualisierungen im Browser. Lasse dir von der KI erklären, wann SVG (skalierbare Vektorgrafiken), wann CSS-Animationen und wann das HTML Canvas-Element die richtige Wahl ist. Für welche Art von Visualisierungen in einer Lernapp ist SVG besonders geeignet?

**Tuftes Prinzipien im App-Kontext:** Recherchiere mit der KI die fünf wichtigsten Prinzipien von Tuftes Datenhonestität. Welche zwei davon werden in typischen KI-generierten UI-Dashboards am häufigsten verletzt? Wie würdest du in deinen Coding-Prompts dagegen steuern?

**Animation und Cognitive Load:** Animationen können motivieren oder ablenken. Diskutiere mit der KI: Welche Eigenschaften machen eine Fortschrittsanimation lernförderlich statt ablenkend? Was sind die Regeln für Dauer, Intensität und Wiederholung?

---

## Geführtes Beispiel (Worked Example)

Wir bauen einen **animierten SVG-Fortschrittsring** als wiederverwendbare React-Komponente.

### Das Entwicklungsziel

Instruiere deine KI, eine React-Komponente `ProgressRing` zu erstellen, die folgende Anforderungen schrittweise umsetzt:

**Schritt 1 — Das SVG-Grundgerüst:**
Zwei konzentrische Kreise als SVG: ein heller Hintergrundring und ein dunklerer Vordergrundring, der den Fortschritt darstellt. Der Vordergrundring verwendet `stroke-dasharray` und `stroke-dashoffset`, um den Fortschritt als Bogenlänge zu steuern. Die Komponente nimmt einen `progress`-Prop (0–100).

**Schritt 2 — Die Zahl in der Mitte:**
In der Mitte des Rings steht die aktuelle Prozentzahl als SVG-Text. Wenn sich der `progress`-Prop ändert, aktualisiert sich die Zahl sofort.

**Schritt 3 — Animation:**
Die Füllung des Rings soll sich beim Einblenden animiert aufbauen (CSS transition auf `stroke-dashoffset`). Die Zahl in der Mitte zählt mit einer kurzen Verzögerung zum Endwert hoch. Die Dauer der Animation soll als optionaler Prop konfigurierbar sein.

**Schritt 4 — Erfolgszustand:**
Bei `progress === 100` wechselt die Ringfarbe zu Grün und eine kurze Pulsanimation signalisiert den Abschluss.

### Vorgehensweise

Baue die Schritte sequenziell auf. Teste den Ring nach jedem Schritt mit verschiedenen `progress`-Werten (0, 50, 100). Formuliere für jeden Schritt einen eigenen Prompt — der Ring soll am Ende ein eigenständiges, wiederverwendbares Modul sein.

---

## Häufige Stolpersteine (Gotchas & Re-Prompting)

* ⚠️ **Der Ring dreht sich in die falsche Richtung:**
  * *Warum passiert das?* SVG-Koordinatensysteme haben ihren Ursprung oben links. Ein Kreis beginnt standardmässig auf der 3-Uhr-Position und füllt sich im Uhrzeigersinn. Viele Lernende erwarten, dass der Ring bei 12 Uhr beginnt.
  * *Lösung (Re-Prompt):* Weise die KI an, den Startpunkt auf die 12-Uhr-Position zu setzen, indem das SVG-Element um -90 Grad rotiert wird (`transform="rotate(-90 cx cy)"`). Erkläre das gewünschte Verhalten: „Der Ring soll oben bei 12 Uhr starten und sich im Uhrzeigersinn füllen."

* ⚠️ **Die Animation läuft beim Seitenload, nicht beim Einblenden:**
  * *Warum passiert das?* Wenn die CSS-Transition auf dem initialen Render-Zustand startet, sieht die Komponente die Animation nicht — weil sie die Änderung von 0 auf den Zielwert nie explizit registriert.
  * *Lösung (Re-Prompt):* Instruiere die KI, den initialen `stroke-dashoffset` auf den Maximalwert zu setzen und ihn dann in einem `useEffect`-Hook (mit kurzer Verzögerung, z. B. 50ms) auf den Zielwert zu setzen. Die Transition wird damit korrekt ausgelöst.

* ⚠️ **Die KI generiert eine Chart-Bibliothek statt SVG:**
  * *Warum passiert das?* Auf die Anfrage „Fortschrittsring" greift die KI oft zur schnellsten Lösung: eine fertige Chart-Bibliothek wie `recharts` oder `chart.js`. Das ist für komplexe Diagramme sinnvoll, für einen einfachen Fortschrittsring aber ein Overkill und eine unnötige Abhängigkeit.
  * *Lösung (Re-Prompt):* Betone explizit, dass die Komponente ohne externe Bibliothek, ausschliesslich mit SVG und CSS, implementiert werden soll. Begründe: Du möchtest die volle Kontrolle über Styling und Animation.
