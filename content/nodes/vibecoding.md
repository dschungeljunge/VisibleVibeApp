---
id: "vibecoding"
slug: "vibecoding"
title: "VibeCoding"
summary: "Agiles Coden mit KI-Assistenten wie ChatGPT, Claude und Cursor."
category: "Product Design"
level: 3
status: "stable"
video_url: "https://www.youtube.com/embed/P-8P2Qv3aF0"
practice_task: |
  Erstelle eine funktionierende, interaktive HTML-Seite für deinen Unterricht (z. B. ein einfaches Vokabel-Lernspiel) ausschließlich durch iteratives Prompting in Cursor oder Claude. Du darfst keine einzige Zeile Code von Hand schreiben!
quality_criteria: |
  - Die Seite läuft ohne Konsolenfehler und reagiert korrekt auf Benutzereingaben
  - Es wurde mindestens ein Fehler durch einen iterativen Korrektur-Prompt (Re-Prompt) behoben
  - Der Prompt-Verlauf (mindestens 3 Iterationen) ist nachvollziehbar dokumentiert
resources_markdown: |
  - [Andrej Karpathy on Vibe Coding](https://twitter.com/karpathy) - Der Ursprung des Begriffs.
  - [Cursor Editor Tutorial](https://cursor.sh) - Offizielle Dokumentation für das Vibe-Coding-Tool.
  - [KI-Prompt-Bibliothek für Lehrpersonen](#) - Sammlung didaktisch optimierter Prompts.
position_x: 840
position_y: 480
connections:
  - target: "software-projektmanagement"
    type: "leads_to"
  - target: "webapp-basics"
    type: "leads_to"
  - target: "deployment"
    type: "leads_to"
---

## Der Vibe (Kurzbeschreibung & Relevanz)

**VibeCoding** beschreibt das Programmieren auf einer neuen, höheren Abstraktionsebene. Anstatt Code Buchstabe für Buchstabe selbst zu tippen, agierst du als *Architekt:in und Didaktiker:in*. Du beschreibst das gewünschte Verhalten, das Design und die pädagogische Logik in natürlicher Sprache. Die generative KI übernimmt das Schreiben, Formatieren und Debuggen des Codes.

### Warum brauchst du das in deiner Lernapp?
Viele hervorragende Unterrichtsideen scheitern an der technischen Hürde des Programmierens. VibeCoding bricht diese Barriere. Es ermöglicht dir als Lehrperson, innerhalb weniger Minuten funktionierende, maßgeschneiderte Prototypen (MVPs) zu bauen, direkt im Klassenzimmer zu testen und didaktische Konzepte sofort auszuprobieren. Du musst keine Programmiersprache fließend beherrschen – deine didaktische Präzision ist deine wichtigste Programmierfähigkeit.

---

## Erarbeitung mit der KI (Exploration)

Nutze einen KI-Chatbot deiner Wahl (z. B. Claude oder ChatGPT), um zu reflektieren, wie sich deine Rolle als Lehrperson durch VibeCoding verändert. 

Führe eine Diskussion mit der KI über folgende Schwerpunkte:
* Was unterscheidet Vibe Coding fundamental von klassischem Programmieren?
* Welche Risiken bezüglich Qualität, Datenschutz und Sicherheitsaspekten entstehen, wenn du Code verwendest, den du nicht komplett selbst geschrieben hast?
* Wie kannst du Schüler:innen anleiten, ebenfalls mit KI-Hilfe zu codieren, ohne dass ihr Lerneffekt blockiert wird?

Formuliere deine Fragen an die KI selbstständig und passe den Gesprächsverlauf an deine Interessen an.

### 📺 Erklärvideo
In diesem 3-minütigen Video siehst du, wie VibeCoding im Zusammenspiel zwischen einem Browser und dem Cursor-Editor live abläuft.

---

## Geführtes Beispiel (Worked Example)

Wir entwerfen ein einfaches **Kopfrechen-Spiel** für die Primarstufe. Das Spiel soll Schüler:innen helfen, Additionsaufgaben zu üben.

### Das Entwicklungsziel
Instruiere deine KI (in Cursor oder Claude), eine in sich geschlossene HTML-Datei zu erstellen, welche die folgenden Anforderungen schrittweise umsetzt:

1. **Das Fundament:**
   * Generierung zufälliger Additionsaufgaben im Zahlenraum 1-100 (z. B. `12 + 25`).
   * Ein Textfeld für die Antwort, ein Button zum Prüfen und direktes farbliches Feedback (grün für richtig, rot für falsch).
   * Automatisches Laden der nächsten Aufgabe nach einer kurzen Verzögerung (ca. 2 Sekunden).
   * Ein modernes, cleanes Layout (z. B. zentriert, gut lesbare Schriftarten und kontrastreiche Farben).

2. **Die Erweiterung:**
   * Ein Punktestand (Score), der sich bei korrekten Antworten erhöht und bei Fehlern verringert.
   * Anzeige der korrekten Lösung im Feedbackbereich, falls die Antwort falsch war.

Entwirf die Prompts für deine KI selbstständig. Versuche, die Anforderungen schrittweise einzubringen (iteratives Vorgehen), um den Prozess sauber zu steuern.

---

## Häufige Stolpersteine (Gotchas)

* ⚠️ **Die KI gerät in eine Endlos-Fehlerschleife (Code-Loop)**:
  * *Warum passiert das?* Wenn du eine Fehlermeldung kopierst und die KI aufforderst, sie zu korrigieren, ändert sie manchmal Code an der falschen Stelle, was neue Fehler erzeugt.
  * *Lösung (Re-Prompt):* Stoppe die KI. Gib ihr den ursprünglichen, funktionierenden Code zurück und fordere sie auf, einen Schritt zurückzugehen und die Implementierung einfacher zu gestalten.

* ⚠️ **Die App sieht langweilig oder unmodern aus**:
  * *Warum passiert das?* Standardmäßig generiert die KI oft sehr einfaches HTML/CSS im Stil der 2000er Jahre.
  * *Lösung (Re-Prompt):* Beschreibe der KI den gewünschten Look in deinen eigenen Worten (z. B. *"Verwende Tailwind CSS für ein modernes, kartenbasiertes Design mit abgerundeten Ecken und weichen Schatten"*).
