---
id: "webapp-basics"
slug: "webapp-basics"
title: "Webapp Basics"
summary: "Komponentenbasierte Webentwicklung, State-Management und das App-Router-Modell in Next.js."
category: "Product Design"
level: 4
status: "stable"
video_url: ""
practice_task: |
  Instruiere deine KI, eine einzelne React-Komponente zu bauen: eine Lernkarte (Flashcard), die auf der Vorderseite einen Begriff zeigt und nach einem Klick umdreht, um die Definition anzuzeigen. Baue die Komponente iterativ: zuerst das Umdrehen, dann das visuelle Design.
quality_criteria: |
  - Die Komponente verwendet useState für den Flip-Zustand
  - Vorder- und Rückseite werden durch bedingtes Rendering gesteuert, nicht durch CSS visibility
  - Die Komponente ist in sich geschlossen und wiederverwendbar (Props für Begriff und Definition)
  - Der Flip-Zustand setzt sich beim Laden der nächsten Karte zurück
  - Das UI signalisiert klar, auf welcher Seite man sich befindet (z. B. durch Farbe oder Label)
resources_markdown: |
  - [React Docs: useState](https://react.dev/reference/react/useState) - Offizielle Dokumentation zum State-Hook, mit interaktiven Beispielen.
  - [React Docs: Your First Component](https://react.dev/learn/your-first-component) - Einführung in JSX und Komponentenstruktur.
  - [Next.js Docs: App Router](https://nextjs.org/docs/app) - Dokumentation zum App Router, der in diesem Kurs verwendet wird.
  - [React Docs: Conditional Rendering](https://react.dev/learn/conditional-rendering) - Wie man UI-Elemente abhängig vom State anzeigt oder verbirgt.
position_x: 1220
position_y: 540
connections:
  - target: "quiz-webapp"
    type: "required_for_project"
  - target: "tutor-app"
    type: "required_for_project"
  - target: "datenbanken"
    type: "leads_to"
---

## Der Vibe (Kurzbeschreibung & Relevanz)

Eine Web-App ist keine Webseite. Eine Webseite zeigt statischen Inhalt — sie ändert sich nur, wenn du eine neue URL aufrufst. Eine Web-App **reagiert** auf das, was Nutzende tun: Sie merkt sich, welche Antwort du eingegeben hast. Sie zeigt das nächste Element an, ohne die Seite neu zu laden. Sie verändert ihr Aussehen abhängig davon, was gerade passiert.

Diese Reaktionsfähigkeit heisst **State** (Zustand). Und State ist das konzeptuelle Fundament jeder interaktiven Lernapp, die du in diesem Kurs baust.

### Warum brauchst du das in deiner Lernapp?

Jedes Feature, das du dir vorstellst, basiert auf State:
- Das Quiz weiss, welche Frage die Lernenden gerade beantworten — State.
- Die App zeigt nach einer richtigen Antwort grünes Feedback — State.
- Der Fortschrittsbalken wächst mit jeder abgeschlossenen Aufgabe — State.
- Das Scaffolding-System zeigt den zweiten Tipp erst, wenn der erste geöffnet wurde — State.

Ohne ein Grundverständnis davon, wie State in React/Next.js funktioniert, wirst du die KI nicht präzise genug instruieren können, um diese Features zu bauen. Und du wirst nicht erkennen, warum ein Feature fehlerhaft reagiert.

---

## Didaktisches Szenario & Exploration mit KI

### Das Szenario

Stell dir vor, du baust ein Vokabel-Lernwerkzeug. Auf dem Bildschirm soll eine Lernkarte (Flashcard) erscheinen: Vorderseite zeigt das deutsche Wort, Rückseite zeigt die englische Übersetzung. Ein Klick dreht die Karte um.

Du gibst deiner KI die Anweisung: „Erstelle eine Flashcard-Komponente." Die KI liefert dir Code — aber beim Testen stellst du fest: Ein Klick dreht alle Karten auf der Seite um, nicht nur die angeklickte. Oder: Der Flip-Zustand bleibt erhalten, wenn die nächste Karte geladen wird, sodass du sofort die Rückseite siehst. Oder: Die Umdreh-Logik verschwindet bei einem kleinen CSS-Update.

Alle diese Fehler haben dieselbe Ursache: Die KI hat State falsch implementiert, weil dein Prompt nicht präzise genug beschrieben hat, *welcher State wo leben soll* und *wann er zurückgesetzt werden soll*.

### Exploration mit der KI

Bevor du mit dem Coding beginnst, lohnt es sich, die konzeptuellen Grundlagen mit der KI zu klären. Frage deinen KI-Chatbot zu folgenden Aspekten:

**Komponenten und Props:** Was ist eine React-Komponente, und was sind Props? Warum ist es wichtig, dass eine Lernkarten-Komponente wiederverwendbar ist und ihren Inhalt über Props empfängt — statt ihn fest eincodiert zu haben? Was verändert sich dadurch, wenn du später 50 Vokabeln hast statt einer einzigen?

**useState und Reaktivität:** Was genau passiert, wenn sich ein State in React ändert? Warum reicht es nicht, eine normale JavaScript-Variable zu verändern? Lass dir den Unterschied an einem einfachen Beispiel erklären. Und frage: Was bedeutet es, wenn zwei Komponenten „denselben State teilen" müssen — ist das möglich? Wie funktioniert das?

**Bedingtes Rendering:** Wie entscheidet React, welche Teile der UI angezeigt werden? Was ist der Unterschied zwischen bedingtem Rendering (die Komponente erscheint gar nicht im DOM) und `display: none` in CSS (die Komponente ist im DOM, aber unsichtbar)? Warum ist dieser Unterschied für Screenreader und Barrierefreiheit relevant?

---

## Geführtes Beispiel (Worked Example)

Wir bauen eine **Flashcard-Komponente** für ein Vokabeltraining. Die Komponente soll wiederverwendbar sein — du übergibst ihr einen Begriff und eine Definition, sie kümmert sich um den Rest.

### Das Entwicklungsziel

Instruiere deine KI (in Cursor oder Claude), eine React-Komponente in Next.js zu erstellen. Setze die Anforderungen in dieser Reihenfolge um und teste nach jedem Schritt, bevor du weitermachst.

**Schritt 1 — Die Grundstruktur:**
Eine Komponente namens `Flashcard`, die zwei Props entgegennimmt: `term` (der Begriff) und `definition` (die Erklärung). Initial zeigt die Komponente den Begriff. Ein Klick auf die Karte wechselt zur Definition. Ein weiterer Klick wechselt zurück. Kein besonderes Design, keine Animation — zuerst die Funktion.

**Schritt 2 — Reset-Verhalten:**
Die Komponente soll auch einen dritten Prop entgegennehmen: `onNext` (eine Funktion, die beim Klick auf einen „Nächste Karte"-Button aufgerufen wird). Wenn `onNext` aufgerufen wird, soll der Flip-State automatisch auf die Vorderseite zurückgesetzt werden, damit die nächste Karte immer mit dem Begriff beginnt.

**Schritt 3 — Visuelles Feedback:**
Füge ein visuelles Signal hinzu, das anzeigt, auf welcher Seite der Karte man sich befindet: zum Beispiel ein kleines Label „Begriff" und „Definition" oben auf der Karte, oder eine Hintergrundfarbe, die wechselt. Kein aufwendiges 3D-Flip-CSS — das kommt erst, wenn die Logik stabil läuft.

### Vorgehensweise

Formuliere für jeden Schritt einen eigenen Prompt. Teste die Lösung nach Schritt 1, bevor du mit Schritt 2 weitermachst. Wenn die KI eine Lösung liefert, die zwar funktioniert, aber anders aufgebaut ist als erwartet (z. B. State im Parent statt in der Komponente selbst) — frage sie, warum sie diese Entscheidung getroffen hat. Die Erklärung hilft dir zu beurteilen, ob der Ansatz solide ist.

---

## Häufige Stolpersteine (Gotchas & Re-Prompting)

* ⚠️ **State lebt im falschen Ort:**
  * *Warum passiert das?* Wenn du die KI bittest, eine Flashcard-Komponente zu bauen, platziert sie den Flip-State manchmal in der Eltern-Komponente statt in der Flashcard-Komponente selbst. Das führt dazu, dass alle Karten denselben Zustand teilen — ein Klick dreht alle Karten gleichzeitig um.
  * *Lösung (Re-Prompt):* Betone explizit, dass jede Flashcard-Instanz ihren eigenen, unabhängigen Flip-State verwalten soll. Beschreibe das Problem in eigenen Worten: „Wenn ich zwei Flashcards auf der Seite habe und die erste umdrehe, soll die zweite davon unberührt bleiben."

* ⚠️ **Der State wird beim Prop-Wechsel nicht zurückgesetzt:**
  * *Warum passiert das?* React behält den State einer Komponente, solange die Komponente im DOM existiert — auch wenn sich ihre Props ändern. Wenn du die nächste Vokabel lädst, bleibt die Komponente dieselbe, also bleibt auch der Flip-State erhalten. Die neue Karte erscheint sofort auf der Rückseite.
  * *Lösung (Re-Prompt):* Weise die KI an, dem `useEffect`-Hook (mit `term` als Abhängigkeit) einen Reset des Flip-States hinzuzufügen. Oder: Erkläre ihr das gewünschte Verhalten und lass sie eine geeignete Strategie vorschlagen — und begründen.

* ⚠️ **Die KI baut sofort eine aufwendige 3D-Animation:**
  * *Warum passiert das?* „Flashcard umdrehen" assoziiert KI-Modelle oft automatisch mit dem klassischen CSS-3D-Flip-Effekt. Der ist komplex, schwer zu debuggen und für ein erstes Funktionsmuster unnötig.
  * *Lösung (Re-Prompt):* Beginne bewusst mit der Anweisung, noch kein CSS-Flip einzubauen. Erst wenn die Logik (State, Reset, Props) stabil läuft, kannst du die Animation als separaten Schritt hinzufügen. Trenne Funktion und Ästhetik in deinen Prompts.

---

## Retrieval-Quiz

**Frage 1:** Eine Lehrperson baut ein Quiz und stellt fest: Wenn sie auf „Nächste Frage" klickt, zeigt die App noch immer das Feedback (grüner Haken oder rotes Kreuz) von der vorherigen Frage. Welches State-Management-Problem liegt hier vor, und wie würdest du es beschreiben, um die KI zur richtigen Lösung zu führen?

**Frage 2:** Was ist der Unterschied zwischen einer React-Komponente, die State intern verwaltet, und einer, die ihren State als Prop von aussen erhält? Wann ist welche Variante sinnvoller in einer Lernapp?

**Frage 3:** Du hast eine Flashcard-Komponente gebaut. Jetzt willst du, dass die App sich merkt, welche Karten der Schüler bereits korrekt beantwortet hat — auch nachdem er die Seite neu lädt. Reicht `useState` dafür aus? Wenn nicht: Was brauchst du zusätzlich?

**Frage 4:** Warum ist es ein Problem, wenn die KI die Anzeige-Logik deiner App mit `display: none` statt mit bedingtem Rendering umsetzt? Nenne mindestens einen technischen und einen didaktischen Grund (bezogen auf Barrierefreiheit deiner Lernapp).
