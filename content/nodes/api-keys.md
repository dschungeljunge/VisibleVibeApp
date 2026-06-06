---
id: "api-keys"
slug: "api-keys"
title: "API-Keys"
summary: "Sichere Verwaltung von API-Schlüsseln, Umgebungsvariablen und serverseitige Proxy-Routes in Next.js."
category: "Product Design"
level: 5
status: "stable"
video_url: ""
practice_task: |
  Erstelle in deiner Next.js-App einen Route Handler (/api/chat), der eine Schülereingabe entgegennimmt und sie serverseitig an die OpenAI- oder Anthropic-API weiterleitet. Der API-Key soll ausschliesslich in der .env.local-Datei stehen und im Browser-Tab unter "Sources" nicht sichtbar sein.
quality_criteria: |
  - Der API-Key steht ausschliesslich in .env.local, nicht im Frontend-Code
  - Der Route Handler gibt bei fehlendem oder ungültigem Key einen verständlichen Fehler zurück
  - Das Frontend ruft ausschliesslich die eigene /api/-Route auf, nie direkt die externe API
  - Die .env.local-Datei ist in .gitignore eingetragen (Key wird nicht ins Git-Repository gepusht)
  - Der Key ist im Browser-DevTools-Tab "Network" nicht im Response-Body sichtbar
resources_markdown: |
  - [Next.js: Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) - Offizielle Dokumentation zu Server-Side API-Routen im App Router.
  - [Next.js: Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables) - Wie .env.local, NEXT_PUBLIC_ und serverseitige Variablen funktionieren.
  - [OWASP: API Security Top 10](https://owasp.org/API-Security/editions/2023/en/0x00-header/) - Die häufigsten API-Sicherheitsprobleme — inkl. dem Exposing von Credentials.
  - [Anthropic API Reference](https://docs.anthropic.com/en/api/getting-started) - Einstiegsdokumentation für die Claude-API.
  - [OpenAI API Reference](https://platform.openai.com/docs/api-reference) - Einstiegsdokumentation für die GPT-API.
position_x: 1600
position_y: 300
connections:
  - target: "tutor-app"
    type: "required_for_project"
---

## Der Vibe (Kurzbeschreibung & Relevanz)

Du hast einen System Prompt entwickelt, deine KI-Tutor-Logik ist ausgereift — jetzt willst du sie in deine Lernapp einbauen. Der einfachste Weg wäre, deinen API-Key direkt in den JavaScript-Code zu schreiben, der im Browser läuft. Die App würde sofort funktionieren.

Das wäre ein schwerwiegender Fehler.

Jeder, der deine Lernapp benutzt, kann in den Browser-Entwicklertools unter „Sources" oder „Network" deinen API-Key lesen — in Klartext. Mit diesem Key kann jede Person auf deine Kosten beliebig viele API-Anfragen senden. Je nach Nutzungsvolumen kann das in wenigen Stunden Kosten in dreistelliger Höhe verursachen. API-Keys in öffentlichem Frontend-Code werden von automatisierten Bots systematisch abgescannt.

Die Lösung ist eine **serverseitige Proxy-Route**: Dein Browser kommuniziert nur mit deiner eigenen Next.js-App. Deine Next.js-App kommuniziert mit der externen KI-API — und hält dabei den Key geheim, weil Server-Code nie an den Browser ausgeliefert wird.

### Warum brauchst du das in deiner Lernapp?

Jede Lernapp, die eine KI-Schnittstelle einbindet, braucht diese Architektur. Ohne sie ist die App nicht für den Einsatz mit Schülerinnen und Schülern geeignet — unabhängig davon, wie gut der pädagogische Prompt ist.

---

## Didaktisches Szenario & Exploration mit KI

### Das Szenario

Drei Lehrpersonen bauen je eine KI-Tutor-App:

**Lehrperson A** fügt den API-Key direkt in den JavaScript-Code ein: `const apiKey = "sk-..."`. Die App funktioniert — bis eine technikaffine Schülerin den Key im DevTools findet, ihn mit Klassenkameradinnen teilt und alle beginnen, ihn für private ChatGPT-Nutzung zu verwenden. Innerhalb eines Wochenendes entstehen Kosten von mehreren hundert Franken.

**Lehrperson B** weiss, dass das unsicher ist, und versteckt den Key hinter einer Umgebungsvariable im Frontend: `process.env.NEXT_PUBLIC_API_KEY`. Das ist besser als Klartext — aber Next.js bündelt alle `NEXT_PUBLIC_`-Variablen in den Browser-Bundle. Der Key ist weiterhin für jeden sichtbar.

**Lehrperson C** baut eine serverseitige Route. Das Frontend sendet die Schülereingabe an `/api/chat` — eine Funktion, die nur auf dem Server läuft. Diese Funktion liest den Key aus einer serverseitigen Umgebungsvariable (ohne `NEXT_PUBLIC_`-Prefix) und kommuniziert mit der externen API. Der Key verlässt nie den Server.

Nur Lehrperson C macht es richtig.

### Exploration mit der KI

Bevor du den Code schreibst, lasse dir von einem KI-Chatbot die Konzepte erklären, damit du die Antworten deines Coding-Assistenten einordnen kannst.

**Client vs. Server in Next.js:** Was ist der fundamentale Unterschied zwischen Code, der im Browser läuft (Client), und Code, der auf dem Server läuft? Warum kann serverseitiger Code Geheimnisse halten, die clientseitiger Code nicht halten kann?

**Umgebungsvariablen in Next.js:** Was ist der Unterschied zwischen einer Variablen mit `NEXT_PUBLIC_`-Prefix und einer ohne? Welche landet im Browser-Bundle, welche bleibt serverseitig? Lass dir zeigen, wie eine `.env.local`-Datei aufgebaut ist.

**Route Handlers im App Router:** Was ist ein Route Handler in Next.js? Wie unterscheidet er sich von einer React-Seiten-Komponente? Warum läuft er immer serverseitig, auch wenn er als Datei im `app/`-Verzeichnis liegt?

---

## Geführtes Beispiel (Worked Example)

Wir bauen einen **sicheren Proxy-Endpunkt** für deine Lernapp, der Schüleranfragen an ein LLM weiterleitet.

### Das Entwicklungsziel

Instruiere deine KI (in Cursor oder Claude), die folgende Architektur in deiner Next.js-App umzusetzen:

**Schritt 1 — Die Umgebungsvariable:**
Erstelle eine `.env.local`-Datei im Root-Verzeichnis deines Projekts. Trage dort deinen API-Key ein — ohne `NEXT_PUBLIC_`-Prefix. Prüfe, ob `.env.local` bereits in der `.gitignore`-Datei steht (Next.js fügt das standardmässig hinzu; prüfe es trotzdem).

**Schritt 2 — Der Route Handler:**
Erstelle eine Datei `app/api/chat/route.ts`. Dieser Handler soll:
- Eine `POST`-Anfrage entgegennehmen, die im Body ein `messages`-Array enthält
- Den API-Key aus der serverseitigen Umgebungsvariable lesen
- Eine Anfrage an die Anthropic- oder OpenAI-API senden (wähle das Modell deiner App)
- Die Antwort des Modells als JSON zurückgeben
- Bei fehlendem API-Key einen HTTP-500-Fehler mit einer verständlichen Fehlermeldung zurückgeben

**Schritt 3 — Das Frontend:**
Das Frontend (deine Chat-Oberfläche) sendet die Schülereingabe als `POST`-Request an `/api/chat` — nicht an `api.openai.com` oder `api.anthropic.com`. Es wartet auf die Antwort und zeigt sie an.

**Schritt 4 — Sicherheitscheck:**
Öffne die Browser-Entwicklertools (F12), gehe zum „Network"-Tab, sende eine Anfrage und inspiziere sie. Ist der API-Key irgendwo sichtbar? Weder im Request-Header noch im Response-Body?

### Vorgehensweise

Setze die Schritte in dieser Reihenfolge um. Teste nach jedem Schritt, ob der vorherige funktioniert, bevor du weitermachst. Formuliere die Prompts selbst — orientiere dich an den Anforderungen oben, nicht an kopierbaren Templates.

---

## Häufige Stolpersteine (Gotchas & Re-Prompting)

* ⚠️ **Die KI verwendet `NEXT_PUBLIC_` für den API-Key:**
  * *Warum passiert das?* Viele Beispiele im Internet und in KI-Trainingsdaten zeigen Umgebungsvariablen mit `NEXT_PUBLIC_`-Prefix, weil sie für Frontend-sichtige Konfiguration gedacht ist. Eine KI kann dieses Muster fälschlicherweise auch für API-Keys übernehmen.
  * *Lösung (Re-Prompt):* Erkläre explizit, dass der API-Key keine `NEXT_PUBLIC_`-Variable sein darf, weil er sonst im Browser-Bundle landet. Betone, dass er ausschliesslich serverseitig lesbar sein muss.

* ⚠️ **Der Route Handler läuft im Browser statt auf dem Server:**
  * *Warum passiert das?* Wenn die KI die Route-Handler-Datei mit `"use client"` am Anfang versieht oder sie ausserhalb des korrekten Verzeichnisses anlegt, wird sie möglicherweise als Client-Komponente behandelt.
  * *Lösung (Re-Prompt):* Route-Handler-Dateien in Next.js dürfen kein `"use client"` enthalten — sie sind per Definition serverseitig. Lasse die KI das prüfen und ggf. entfernen. Die Datei muss im `app/api/`-Verzeichnis liegen und `route.ts` heissen.

* ⚠️ **CORS-Fehler beim Direktaufruf der externen API:**
  * *Warum passiert das?* Wenn das Frontend versehentlich direkt an die externe API sendet (z. B. durch einen Fehler im Fetch-URL), blockiert der Browser den Request aus Sicherheitsgründen (Cross-Origin Resource Sharing). Das ist eigentlich ein Schutzfehler — zeigt dir aber, dass deine Architektur noch nicht korrekt ist.
  * *Lösung (Re-Prompt):* Überprüfe die Fetch-URL im Frontend-Code. Sie sollte `/api/chat` lauten (relativ, kein Domainname), nicht `https://api.openai.com/...`. CORS-Fehler aus dem Frontend sind ein zuverlässiges Signal, dass der Umweg über den eigenen Server fehlt.
