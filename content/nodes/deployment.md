---
id: "deployment"
slug: "deployment"
title: "Deployment"
summary: "Von der lokalen Entwicklungsumgebung zur öffentlich erreichbaren Web-App mit Vercel und GitHub."
category: "Product Design"
level: 3
status: "stable"
video_url: ""
practice_task: |
  Deploye deine Quiz-Webapp auf Vercel. Die App soll unter einer öffentlichen URL erreichbar sein und fehlerfrei funktionieren. Teile die URL im Kursforum.
quality_criteria: |
  - Die App ist unter einer öffentlichen Vercel-URL erreichbar (nicht localhost)
  - Die App läuft ohne Konsolenfehler im Browser
  - Umgebungsvariablen (falls vorhanden) sind in Vercel konfiguriert, nicht im Code
  - Ein neuer Push auf den main-Branch triggert automatisch ein neues Deployment
  - Die URL wurde mit mindestens einer Person ausserhalb des Kurses geteilt und getestet
resources_markdown: |
  - [Vercel: Getting Started](https://vercel.com/docs/getting-started-with-vercel) - Offizielle Einführung in das Deployment mit Vercel, inkl. GitHub-Verbindung.
  - [GitHub: Create a Repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/quickstart-for-repositories) - Wie man ein neues GitHub-Repository erstellt.
  - [Vercel: Environment Variables](https://vercel.com/docs/projects/environment-variables) - Wie man API-Keys und andere Secrets sicher in Vercel konfiguriert.
  - [Next.js: Deployment](https://nextjs.org/docs/pages/building-your-application/deploying) - Offizielle Next.js-Dokumentation zum Deployment auf Vercel.
position_x: 840
position_y: 240
connections:
  - target: "quiz-webapp"
    type: "required_for_project"
---

## Der Vibe (Kurzbeschreibung & Relevanz)

Eine Lernapp, die nur auf deinem Laptop läuft, kann niemanden in deiner Klasse erreichen. Deployment ist der Schritt, der deine App aus der lokalen Entwicklungsumgebung in die Welt bringt: auf einen Server, der rund um die Uhr erreichbar ist, von jedem Gerät, mit jeder Internetverbindung.

In diesem Kurs verwenden wir **Vercel** — die Hosting-Plattform, die optimal auf Next.js zugeschnitten ist. Ein Deployment auf Vercel ist in drei Schritten erledigt: Code auf GitHub hochladen, GitHub mit Vercel verbinden, Vercel baut und deployt automatisch. Ab diesem Moment ist deine App öffentlich erreichbar.

### Warum brauchst du das in deiner Lernapp?

Weil eine App, die niemand testen kann, auch niemanden lehrt. Das erste Deployment ist nicht das Ende des Entwicklungsprozesses — es ist der Beginn des echten Lernens. Erst wenn Schülerinnen, Schüler oder Kolleginnen die App auf einem echten Gerät öffnen, erfährst du, was funktioniert und was nicht.

---

## Didaktisches Szenario & Exploration mit KI

### Das Szenario

Eine Lehrperson hat eine Quiz-App fertig entwickelt. Sie läuft auf ihrem Laptop — aber die Schülerinnen und Schüler können sie nicht öffnen. Sie kopiert die HTML-Datei auf einen USB-Stick. Manche Browser öffnen sie, manche nicht. Die Bilder laden nicht. Das Formular funktioniert nicht, weil JavaScript blockiert wird.

Das Problem: Eine lokale Datei ist kein Webserver. Sie folgt anderen Regeln als eine Seite im Internet. Der Weg zu einer echten, öffentlich erreichbaren App führt über einen Webserver — und Vercel macht genau das, ohne dass du eigene Server-Infrastruktur verwalten musst.

### Exploration mit der KI

**Wie funktioniert ein Web-Hosting-Dienst?** Lasse dir erklären: Was macht Vercel genau, wenn du eine App deployest? Was ist der Unterschied zwischen „auf dem Server ausführen" und „eine statische Seite hosten"? Warum ist Vercel für Next.js-Apps besonders gut geeignet?

**Git und GitHub als Fundament:** Vercel deployt aus einem GitHub-Repository. Lasse dir erklären: Was ist der Unterschied zwischen Git (das Versionskontrollsystem) und GitHub (der Online-Dienst)? Was ist ein Commit, was ist ein Push? Und warum ist es sinnvoll, deinen Code in einem Repository zu speichern — auch wenn du allein daran arbeitest?

**Umgebungsvariablen (Environment Variables):** Warum darf ein API-Key nicht im Code stehen? Und wo speichert man ihn dann beim Deployment? Lasse dir erklären, wie Vercel Environment Variables funktionieren und wie man sie in einer Next.js-App über `process.env` abruft.

**Continuous Deployment:** Was bedeutet es, dass Vercel automatisch ein neues Deployment auslöst, sobald du Code auf GitHub pushst? Welchen Vorteil hat das für iterative Entwicklung? Und was passiert, wenn ein fehlerhafter Code-Push die App kaputtmacht — wie rollst du zum letzten funktionierenden Stand zurück?

---

## Geführtes Beispiel (Worked Example)

Wir deployen eine **bestehende Next.js-App** auf Vercel — Schritt für Schritt.

### Das Entwicklungsziel

Instruiere deine KI, dich durch den folgenden Prozess zu führen:

**Schritt 1 — GitHub-Repository erstellen:**
Erstelle ein kostenloses GitHub-Konto (falls noch nicht vorhanden). Erstelle ein neues Repository für deine App. Lade den Code deiner App mit Git hoch: `git init`, `git add .`, `git commit -m "Initial commit"`, `git push`.

**Schritt 2 — Vercel mit GitHub verbinden:**
Erstelle ein kostenloses Vercel-Konto. Verbinde es mit GitHub. Wähle dein Repository aus. Vercel erkennt Next.js automatisch und konfiguriert den Build-Prozess.

**Schritt 3 — Environment Variables konfigurieren:**
Falls deine App API-Keys oder andere Geheimnisse verwendet: Füge sie in den Vercel-Projekteinstellungen unter „Environment Variables" ein. Sie werden beim Build als `process.env.VARIABLE_NAME` verfügbar sein — nie im öffentlichen Code.

**Schritt 4 — Deployment auslösen und prüfen:**
Klicke auf „Deploy". Vercel baut die App und gibt dir eine URL. Öffne die URL auf einem Gerät, das nicht dein Entwicklungsrechner ist (Handy, Tablet oder ein anderer Computer). Prüfe: Läuft alles wie erwartet?

**Schritt 5 — Iterativen Workflow einrichten:**
Ändere eine Kleinigkeit in deiner App (z. B. einen Text), committe und pushe auf GitHub. Beobachte, wie Vercel automatisch ein neues Deployment startet. Verstehe: Das ist dein zukünftiger Entwicklungsrhythmus.

---

## Häufige Stolpersteine (Gotchas & Re-Prompting)

* ⚠️ **API-Key im Code — App startet nicht oder Key ist öffentlich sichtbar:**
  * *Warum passiert das?* Wenn ein API-Key direkt im Code steht (z. B. `const key = "sk-..."`), ist er im GitHub-Repository öffentlich sichtbar. Ausserdem schlägt Vercel den Build manchmal fehl, wenn Umgebungsvariablen fehlen.
  * *Lösung (Re-Prompt):* Instruiere deine KI, alle Secrets aus dem Code zu entfernen und durch `process.env.VARIABLE_NAME` zu ersetzen. Konfiguriere die Variablen dann in den Vercel-Einstellungen.

* ⚠️ **Build schlägt fehl wegen TypeScript-Fehlern:**
  * *Warum passiert das?* Lokal läuft Next.js in einem tolerierten Entwicklungsmodus. Der Vercel-Build ist strenger und bricht bei TypeScript-Fehlern oder fehlenden Imports ab.
  * *Lösung (Re-Prompt):* Führe vor dem Deployment lokal `npm run build` aus. Alle Build-Fehler, die Vercel sehen würde, erscheinen auch lokal. Behebe sie iterativ mit der KI.

* ⚠️ **Die App lädt lokal, aber nicht auf Vercel (CORS-Fehler):**
  * *Warum passiert das?* Wenn deine App direkt auf externe APIs (nicht über einen eigenen Backend-Proxy) zugreift, blockiert der Browser Anfragen von einer anderen Domain (CORS-Policy).
  * *Lösung (Re-Prompt):* Lasse die KI einen serverseitigen Route Handler in Next.js erstellen, der als Proxy dient. Die externe API wird dann serverseitig aufgerufen — CORS ist kein Problem mehr.

---

## Retrieval-Quiz

**Frage 1:** Eine Lehrperson hat eine funktionierende Lernapp auf ihrem Laptop. Sie möchte, dass Schülerinnen und Schüler zu Hause darauf zugreifen können. Beschreibe in 3–4 Sätzen, welche Schritte notwendig sind, damit die App öffentlich erreichbar ist.

**Frage 2:** Was ist der Unterschied zwischen einer Umgebungsvariable (`process.env.API_KEY`) und einem direkt im Code stehenden API-Key? Warum ist ersteres die sicherere Variante?

**Frage 3:** Du hast eine Änderung an deiner App gepusht — die App ist jetzt fehlerhaft. Wie rollst du auf Vercel zum letzten funktionierenden Deployment zurück? Und welche technische Funktion von Git und Vercel macht das möglich?

**Frage 4:** Ein Kollege hat seine App lokal fertiggestellt und mit `npm run dev` getestet — alles funktioniert. Nach dem Deployment auf Vercel schlägt der Build fehl. Wo liegt das Problem wahrscheinlich? Nenne zwei häufige Ursachen.
