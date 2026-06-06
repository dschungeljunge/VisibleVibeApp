---
id: "scaffolding"
slug: "scaffolding"
title: "Scaffolding"
summary: "Gestufte Hilfestellungen, die Lernende zur eigenständigen Lösung führen."
category: "Learning Design"
level: 5
status: "stable"
video_url: ""
practice_task: |
  Baue für deine eigene Lernapp ein dreistufiges Scaffolding-System: Auf Knopfdruck erhalten die Lernenden nacheinander einen strategischen Hinweis, eine Teillösung und schließlich die vollständige Lösung. Die Lehrperson definiert die Tipps pro Aufgabe.
quality_criteria: |
  - Die Hilfestellungen erscheinen nur auf explizite Anfrage (kein automatisches Aufdecken)
  - Es gibt mindestens drei Abstufungen, die progressiv konkreter werden
  - Die erste Stufe enthält einen strategischen Denkimpuls (nicht den Anfang der Lösung)
  - Die App protokolliert, welche Scaffolding-Stufe ein:e Lernende:r genutzt hat
  - Das UI signalisiert klar, wie viele Hilfe-Stufen noch verfügbar sind
resources_markdown: |
  - [Vygotsky: Mind in Society (1978)](https://www.marxists.org/archive/vygotsky/works/mind/) - Die Originalquelle zur Zone der proximalen Entwicklung.
  - [Wood, Bruner & Ross: The Role of Tutoring in Problem Solving (1976)](https://doi.org/10.1017/S0305000900003603) - Das Paper, das den Begriff „Scaffolding" in die Pädagogik eingeführt hat.
  - [Puntambekar & Hübscher: Tools for Scaffolding Students (2005)](https://doi.org/10.1007/s11423-005-8848-8) - Übertragung des Scaffolding-Konzepts auf digitale Lernumgebungen.
position_x: 1600
position_y: 1020
connections:
  - target: "cognitive-load-management"
    type: "leads_to"
---

## Der Vibe (Kurzbeschreibung & Relevanz)

**Scaffolding** (Lerngerüst) ist eine didaktische Strategie, bei der Lernende temporäre, gestufte Hilfestellungen erhalten, um Aufgaben zu bewältigen, die sie alleine noch nicht lösen könnten. Die Hilfen werden schrittweise abgebaut, sobald die Kompetenz wächst — wie ein Baugerüst, das entfernt wird, wenn das Gebäude steht.

### Warum brauchst du das in deiner Lernapp?

Ohne Scaffolding stehen Lernende vor einer binären Situation: Entweder sie schaffen die Aufgabe allein — oder sie scheitern und bekommen die Lösung präsentiert. Beides ist lernschädlich: Im ersten Fall fehlt die Herausforderung, im zweiten Fall fehlt die eigene Denkleistung. Scaffolding löst dieses Dilemma, indem es einen **dritten Weg** eröffnet: Die App führt die Lernenden mit dosierten Impulsen Schritt für Schritt zur eigenen Lösung. Die Anstrengung bleibt — aber die Frustration wird beherrschbar.

Für deine KI-gestützte Lernapp bedeutet das: Du musst ein System designen, das die **richtige Menge Hilfe zum richtigen Zeitpunkt** gibt. Nicht zu viel (das nimmt den Denkprozess vorweg), nicht zu wenig (das erzeugt Überforderung).

---

## Didaktisches Szenario & Exploration mit KI

### Das Szenario

Stell dir vor, du unterrichtest Mathematik in der 8. Klasse. Die Aufgabe auf dem Bildschirm lautet:

> *Ein Bauer hat 120 Meter Zaun. Er möchte damit eine rechteckige Weide einzäunen, die an einer Seite an eine Scheunenwand grenzt (dort braucht er keinen Zaun). Welche Maße muss die Weide haben, damit die Fläche maximal wird?*

Du beobachtest drei typische Reaktionen:
- **Schüler A** starrt 20 Sekunden auf den Bildschirm, klickt frustriert auf „Lösung anzeigen" und schreibt die Antwort ab. Gelernt hat er nichts.
- **Schülerin B** versucht es, stellt eine Gleichung auf, verheddert sich, löscht alles und gibt auf. Auch sie klickt auf „Lösung anzeigen".
- **Schülerin C** versucht es, stellt die richtige Gleichung auf, löst sie — und braucht keine Hilfe. Für sie war die Aufgabe angemessen.

Schüler A und B bräuchten keine fertige Lösung — sie bräuchten einen **gezielten Denkanstoß**, der sie wieder in die produktive Zone bringt. Genau das ist Scaffolding.

### Exploration mit der KI

Nutze einen KI-Chatbot deiner Wahl, um die didaktischen Grundlagen von Scaffolding eigenständig zu vertiefen, bevor du mit dem Coding beginnst. Thematisiere in deinem Gespräch:

* **Zone der proximalen Entwicklung (ZPD):** Vygotsky beschreibt einen Bereich zwischen dem, was Lernende allein können, und dem, was sie auch mit Hilfe noch nicht schaffen. Nur innerhalb dieser Zone ist Lernen möglich. Erarbeite dir mit der KI, was das für die Gestaltung deiner Tipp-Stufen bedeutet: Wie unterscheidest du einen Tipp, der in die ZPD fällt, von einem, der zu viel verrät?

* **Fading (das Ausblenden der Hilfe):** Scaffolding ist per Definition temporär. Die Hilfe soll sich selbst überflüssig machen. Diskutiere mit der KI, wie eine App erkennen oder befördern kann, dass Lernende mit der Zeit weniger Scaffolding benötigen. Was wäre ein realistischer Mechanismus dafür in einer Web-App?

* **Stufen-Design — von der Strategie zur Lösung:** Nicht jeder Tipp ist gleich. Ein guter Scaffolding-Entwurf unterscheidet zwischen (a) einem strategischen Hinweis (*„Welche Größen sind hier gesucht?"*), (b) einer teilweisen Strukturierung (*„Nenne die Seiten x und y. Welche Beziehung besteht zwischen ihnen?"*) und (c) einer konkreten Teillösung (*„Die Gleichung lautet: 2x + y = 120"*). Diskutiere mit der KI, warum die Reihenfolge entscheidend ist und warum Stufe (a) nicht einfach weggelassen werden sollte.

---

## Geführtes Beispiel (Worked Example)

Wir bauen ein **generisches Scaffolding-System**, das du für jede beliebige Aufgabe in deiner App wiederverwenden kannst.

### Das Entwicklungsziel

Instruiere deine KI (in Cursor oder Claude), eine Aufgabenseite zu erstellen, die folgende Anforderungen schrittweise umsetzt:

**1. Die Grundstruktur:**
* Eine Aufgabenstellung wird prominent angezeigt.
* Darunter befindet sich ein Eingabefeld (Freitext oder Zahleneingabe) für die Antwort der Lernenden.
* Ein Button „Antwort prüfen" wertet die Eingabe aus und gibt farblich codiertes Feedback (richtig/falsch).

**2. Das Tipp-System (Scaffolding):**
* Unter der Aufgabe befindet sich ein Button „💡 Ich brauche einen Tipp".
* Bei jedem Klick wird die nächste Scaffolding-Stufe aufgedeckt (z. B. als ausklappbares Akkordeon oder als eingeblendete Karte).
* Es gibt genau drei Stufen:
  * **Tipp 1 — Strategischer Impuls:** Ein Denkanstoß, der die Aufmerksamkeit auf den richtigen Aspekt lenkt, ohne etwas zu verraten. *(Beispiel: „Überlege: Wie viele Seiten muss der Bauer tatsächlich einzäunen?")*
  * **Tipp 2 — Strukturierungshilfe:** Eine teilweise Formalisierung des Problems. *(Beispiel: „Nenne die Breite x. Welche Länge ergibt sich dann aus den 120 Metern Zaun?")*
  * **Tipp 3 — Teillösung:** Ein konkreter Zwischenschritt. *(Beispiel: „Die Fläche ist A = x · (120 – 2x). Wie findest du das Maximum?")*
* Ein visueller Indikator zeigt an, wie viele Tipps bereits verwendet wurden (z. B. drei Punkte, die sich nacheinander füllen).

**3. Logging:**
* Im LocalStorage wird pro Aufgabe gespeichert, wie viele Scaffolding-Stufen die/der Lernende aufgedeckt hat.
* Diese Information könnte später für ein Lehrpersonen-Dashboard verwendet werden.

### Vorgehensweise

Setze die drei Blöcke in dieser Reihenfolge um. Teste nach jedem Block, ob die Funktionalität korrekt ist, bevor du den nächsten Prompt schreibst. Formuliere alle Prompts selbst — orientiere dich an den Anforderungen oben, nicht an kopierbaren Vorlagen.

---

## Häufige Stolpersteine (Gotchas & Re-Prompting)

* ⚠️ **Die KI macht Tipp 1 zu konkret:**
  * *Warum passiert das?* KI-Modelle tendieren dazu, „hilfreich" zu sein. Wenn du sie bittest, einen Tipp zu generieren, formuliert sie oft direkt eine Teillösung statt eines strategischen Impulses. Tipp 1 und Tipp 3 klingen dann fast identisch.
  * *Lösung (Re-Prompt):* Beschreibe der KI den Unterschied zwischen den Stufen explizit in deinen eigenen Worten. Formuliere klare Kriterien für jede Stufe: Tipp 1 darf *keine* Zahlen, Formeln oder Teilantworten enthalten — nur eine Lenkung der Aufmerksamkeit. Teste die generierten Tipps selbst: Wenn du nach dem Lesen von Tipp 1 die Aufgabe sofort lösen könntest, ist er zu konkret.

* ⚠️ **Alle Tipps werden sofort sichtbar gerendert:**
  * *Warum passiert das?* Die KI erzeugt oft HTML, das alle drei Tipps gleichzeitig anzeigt (z. B. als einfache Absätze untereinander), statt sie interaktiv aufzudecken. Das zerstört den gesamten Scaffolding-Effekt, weil Lernende sofort alles lesen.
  * *Lösung (Re-Prompt):* Betone, dass die Tipps initial vollständig unsichtbar sein müssen (z. B. `display: none` oder `hidden`). Beschreibe der KI, dass jeder Klick auf den Tipp-Button genau einen weiteren Tipp sichtbar macht — und dass der Button deaktiviert wird, sobald alle Stufen aufgedeckt sind.

* ⚠️ **Das Scaffolding wird statisch statt dynamisch gespeichert:**
  * *Warum passiert das?* Die KI hardcodiert oft die Tipptexte direkt ins HTML. Das funktioniert für eine einzelne Aufgabe, aber sobald du mehrere Aufgaben haben möchtest, musst du den gesamten HTML-Code duplizieren.
  * *Lösung (Re-Prompt):* Instruiere die KI, die Aufgaben und ihre Scaffolding-Stufen als Datenstruktur (z. B. ein JavaScript-Array von Objekten) zu definieren, die dynamisch gerendert wird. So kannst du später einfach neue Aufgaben mit neuen Tipps hinzufügen, ohne den Code zu verändern.
