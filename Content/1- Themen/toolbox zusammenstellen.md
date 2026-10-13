---
title: Toolbox zusammenstellen
slug: toolbox-zusammenstellen
type: learn-topic
category: technology
project:
order:
status: published
video: "https://www.loom.com/embed/9b7865e3d68742f29f62411e48b8fcb2"
summary: "Drei Wege zum eigenen Lernwerkzeug: Finde die Entwicklungsumgebung, die zu deiner Unterrichtsidee, deinem Gerät und deinen Lernzielen passt."
---

## Welche Toolbox passt zu deiner Idee?

Du möchtest im VisibleVibe-Prozess ein eigenes digitales Lernwerkzeug entwickeln: vielleicht einen Timer, der deiner Klasse zeigt, wie viel Arbeitszeit für eine Aufgabe noch bleibt, oder eine Übung mit gezielten Rückmeldungen. Doch womit baust du das?

Im Video begleitet uns der Timer durch die drei Ebenen: vom einfachen Countdown über eine Variante mit Mikrofonfunktion bis zur umfangreicheren Fokus-App. An diesem Beispiel kannst du nachvollziehen, wie unterschiedliche Entwicklungswege zu deiner Idee passen.

Beim Vibe Coding beschreibst du einer KI, was dein Programm können soll. Sie erstellt Code, du probierst das Ergebnis aus und entwickelst es mit ihr weiter. Dafür gibt es drei Wege: einen Chatbot, eine Entwicklungsplattform im Browser oder eine lokale Entwicklungsumgebung auf deinem Computer.

Die drei Ebenen unterscheiden sich vor allem darin, wie viel Einrichtung sie brauchen und wie viel Kontrolle du über das Projekt hast. Sie sind keine Pflichtleiter, die du vollständig erklimmen musst. **Wähle die Umgebung, die deine nächste Unterrichtserprobung ermöglicht und zu dem passt, was du selbst lernen möchtest.**

## Ebene 1: Mit einem Chatbot eine HTML-Datei erstellen

Der einfachste Einstieg führt über einen vertrauten KI-Chat, etwa ChatGPT, Claude oder Microsoft Copilot. Du beschreibst deine Idee und bittest ausdrücklich um eine einzelne HTML-Datei. Je nach Chatoberfläche kannst du sie direkt herunterladen oder den ausgegebenen Code als Datei mit der Endung `.html` speichern.

Diese Datei öffnest du im Browser auf deinem Gerät. Wenn alle Bestandteile eingebaut sind und keine externen Dienste benötigt werden, funktioniert sie auch ohne Internetverbindung. Eine HTML-Datei kann Gestaltung und JavaScript enthalten – also die Logik für Fragen, Auswertungen, Hinweise oder kleine Simulationen. Damit lässt sich bereits viel umsetzen.

**Beispiel:** Du zeigst deiner Klasse einen Timer auf dem Bildschirm oder über den Beamer. Die grosse Zeitanzeige macht sichtbar, wie lange die Lernenden noch an einer Aufgabe arbeiten können. Du stellst die Dauer ein und kannst den Countdown starten, pausieren und zurücksetzen. Dafür brauchst du weder Benutzerkonten noch eine zentrale Datenbank.

Ein möglicher erster Auftrag an die KI lautet:

> Erstelle einen Timer für meinen Unterricht als einzelne HTML-Datei. Baue Gestaltung und JavaScript vollständig ein, ohne externe Bibliotheken oder Internetzugriffe. Ich möchte eine Arbeitsdauer in Minuten einstellen und den Countdown starten, pausieren und zurücksetzen können. Zeige die verbleibende Zeit so gross und kontrastreich, dass die Klasse sie über den Beamer gut lesen kann. Mache deutlich sichtbar, wenn die Zeit abgelaufen ist. Speichere keine personenbezogenen Daten. Erkläre mir, wie ich die Datei als timer.html speichere und im Browser öffne.

Teste danach unterschiedliche Zeitangaben, leere Eingaben sowie Start, Pause und Zurücksetzen. Prüfe auch, was beim Ablauf der Zeit passiert und ob die Anzeige aus der letzten Reihe lesbar ist. Beschreibe der KI jeweils konkret, was du beobachtest und was sich ändern soll. Sichere eine funktionierende Version, bevor du weiterarbeitest.

Die Grenze liegt weniger bei der Anzahl möglicher Funktionen als bei der Organisation und dem Betrieb: Gemeinsame Daten über mehrere Geräte, sichere Benutzerkonten oder geschützte Zugänge zu KI-Diensten brauchen zusätzliche Infrastruktur. Ein Chatbot kann zwar auch Code für mehrere Dateien schreiben. Im einfachen Chat fehlt dir aber oft die Umgebung, die diese Dateien zusammen verwaltet, ausführt und prüft.

**Diese Ebene passt, wenn du einen überschaubaren Lernmechanismus schnell ausprobieren möchtest.** Eine lokal geöffnete Datei ist noch keine veröffentlichte Website: Du kannst die Datei weitergeben; für einen aufrufbaren Weblink brauchst du zusätzlich einen Hosting-Dienst.

## Ebene 2: In einer Plattform im Browser entwickeln

Browserplattformen bündeln viele Arbeitsschritte: Du beschreibst die Anwendung, die KI bearbeitet das Projekt, und du kannst eine Vorschau testen. Häufig lassen sich darüber auch Daten speichern und Anwendungen veröffentlichen. «Deployen» bedeutet dabei, eine Anwendung auf einem Server bereitzustellen, damit andere sie über einen Link nutzen können.

Beispiele sind **Lovable** und der **Build-Modus von Google AI Studio**. Google AI Studio unterstützt Projekte mit mehreren Dateien sowie Funktionen auf einem Server. Den Code kannst du herunterladen oder mit GitHub synchronisieren. ([Google-Dokumentation](https://ai.google.dev/gemini-api/docs/aistudio-build-mode))

**Beispiel:** Im Video entsteht in Google AI Studio ein Timer mit Mikrofonfunktion. Zum Countdown kommt damit eine weitere Eingabequelle hinzu, die mit den anderen Funktionen zusammenspielen muss. Du kannst die Anwendung direkt in der Vorschau ausprobieren und im Gespräch mit der KI weiterentwickeln. Für die Nutzung des Mikrofons braucht es die Freigabe im Browser.

Mikrofonzugriff ist grundsätzlich auch in einer einzelnen HTML-Datei möglich. Das Beispiel zeigt deshalb vor allem, wie du eine erweiterte Idee in einer Browserplattform entwickelst und testest. Welche Umgebung sinnvoll ist, hängt vom Zusammenspiel der Funktionen und deinem Arbeitsablauf ab. ([Dokumentation zum Mikrofonzugriff im Browser](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia))

Der Vorteil ist der schnelle Start. Du kannst dich zunächst auf die Interaktion und die Unterrichtsidee konzentrieren. Gleichzeitig gibt die Plattform bestimmte Technologien und Abläufe vor. Wie frei du Datenbank, Hosting und Zusammenarbeit wählen kannst, unterscheidet sich je nach Anbieter und Tarif.

Prüfe deshalb vor der Wahl: Kann ich meinen Code exportieren? Kann ich ihn später anderswo betreiben? Welche Dienste werden für gespeicherte Daten benötigt? Bei Lovable ist beispielsweise eine Synchronisation mit GitHub und eine Veröffentlichung ausserhalb der Plattform möglich. Der Wechsel kann trotzdem zusätzlichen Einrichtungsaufwand bedeuten. ([Lovable-Dokumentation](https://docs.lovable.dev/integrations/github))

Ein weiteres Beispiel ist **v0 von Vercel**: Damit kannst du Webanwendungen mit Datenbankanbindung entwickeln und auf Vercel veröffentlichen. Vercel ist dabei die Plattform für den Betrieb; v0 ist das Werkzeug zum KI-gestützten Bauen. ([v0: Webanwendungen entwickeln](https://v0.app/docs/full-stack-apps), [v0: Veröffentlichen](https://v0.app/docs/deployments)) Weitere Beispiele für diesen Weg sind **Bolt** und **Replit Agent**. Für den Einstieg genügt eine Plattform, die zu deinem Vorhaben passt. ([Bolt](https://support.bolt.new/get-started/intro-bolt), [Replit Agent](https://replit.com/products/agent))

**Diese Ebene passt, wenn du schnell eine umfangreichere Webanwendung entwickeln möchtest und die angebotenen Dienste zu deinem Vorhaben passen.** Vorschau und Veröffentlichung erleichtern das Testen, ersetzen aber weder die fachliche Prüfung noch die Prüfung der Zugriffsrechte auf gespeicherte Daten.

## Ebene 3: Auf dem eigenen Computer entwickeln

Bei diesem Weg liegt dein Projekt als Ordner mit Dateien auf deinem Computer. Du arbeitest mit einer installierten KI-App wie Codex oder Claude Code oder mit einem Code-Editor wie Cursor oder Visual Studio Code mit KI-Unterstützung. Der KI-Coding-Agent kann direkt mit deinen Projektdateien arbeiten, Änderungen vornehmen, Befehle ausführen und Ergebnisse prüfen. ([Offizielle OpenAI-Dokumentation](https://learn.chatgpt.com/docs/environments/local-environment), [Claude-Code-Dokumentation](https://code.claude.com/docs/en/desktop))

Du kannst deine Aufträge im Gespräch formulieren und die Ergebnisse prüfen oder selbst Dateien öffnen und Code bearbeiten. Wie diese Zugänge verbunden sind, hängt vom Werkzeug ab. Für die Wahl deiner Toolbox gehören sie zur gleichen Ebene: Du arbeitest direkt an deinem eigenen lokalen Projekt und kannst die Umgebung nach deinen Bedürfnissen erweitern.

Manchmal fällt dafür der Begriff **Harness**: Gemeint ist die Arbeitsumgebung, die einem KI-Agenten Werkzeuge gibt, etwa zum Lesen von Dateien, Ausführen von Befehlen und Prüfen von Ergebnissen. Solche Umgebungen gibt es lokal und in der Cloud. Für deinen Einstieg genügt die Frage: Kann die KI direkt mit meinem Projekt arbeiten?

Du hast hier besonders viel Kontrolle über Dateien, Bibliotheken, Datenbanken und die spätere Veröffentlichung. Mit Git kannst du Änderungen nachvollziehbar sichern. GitHub kann eine zusätzliche Plattform sein, um den Code aufzubewahren und mit anderen zu teilen; für den lokalen Start ist es nicht zwingend erforderlich.

**Beispiel:** Aus dem Timer kann eine Anwendung werden, die Fokuszeiten dauerhaft speichert, auswertet und mit weiteren Funktionen verbindet. Die im Video gezeigte **Fokus-App** ist ein solches Projekt, das mit Codex auf dem eigenen Computer entstanden ist. Sie nutzt eine lokale SQLite-Datenbank für die gespeicherten Fokuszeiten und enthält unter anderem eine Würfel-Funktion, die den Fortschritt sichtbar macht.

Das Beispiel zeigt, dass auch eine Datenbank auf dem eigenen Gerät laufen kann. Du kannst selbst entscheiden, wie du Daten aufbewahrst und welche Funktionen du ergänzt. Ein einfacher Timer braucht diese zusätzliche Infrastruktur noch nicht. Sie wird interessant, wenn du etwa Zeitverläufe über mehrere Sitzungen hinweg nutzen oder verschiedene Funktionen miteinander verbinden möchtest.

Diese Freiheit braucht Vorbereitung. Je nach Projekt installierst du neben der KI-App oder dem Editor weitere Werkzeuge und richtest Zugänge ein. Auf verwalteten Schulgeräten können Installationen, Skripte oder Netzwerkzugriffe eingeschränkt sein. Kläre mit der Schul-IT, welche Umgebung unterstützt wird. Lokales Entwickeln bedeutet zudem nicht automatisch, dass auch die KI lokal rechnet: Viele Coding-Agenten nutzen weiterhin einen Cloud-Dienst und benötigen dafür eine Internetverbindung.

**Diese Ebene lohnt sich besonders, wenn du neben einer funktionierenden Lösung auch technisches Verständnis aufbauen möchtest.** Du kannst lernen, wie Dateien zusammenspielen, wie ein Browser mit einem Server kommuniziert und wie Fehler entstehen und behoben werden. Dieser Lerneffekt entsteht durch deine Mitarbeit: Lass dir Änderungen erklären, verfolge einen Ablauf im Code und probiere eine kleine Anpassung selbst aus. Auch mit einem einfachen Projekt kannst du so beginnen.

## Klein anfangen – auch beim Budget

Für die erste Erprobung lohnt sich ein vorhandener Zugang oder ein Gratisangebot. Solche Einstiege gibt es auch ausserhalb klassischer Chatbots, beispielsweise bei Lovable und Cursor. Sie haben jedoch Nutzungsgrenzen. ([Lovable-Preise](https://lovable.dev/pricing), [Cursor-Preise](https://cursor.com/pricing))

Setze dir zunächst ein kleines Monatsbudget, beispielsweise rund 20 bis 30 Franken, und prüfe, ob der gewählte Tarif deinen Bedarf abdeckt. Das ist eine Budgetorientierung, kein garantierter Anbieterpreis in CHF. Tarife werden häufig in US-Dollar angegeben; Steuern, Wechselkurse und zusätzliche Nutzung können den Betrag verändern. Umfangreichere Angebote können bis in die Grössenordnung von 200 US-Dollar monatlich reichen. ([Cursor-Preise](https://cursor.com/pricing))

Ein grosses Abo brauchst du nicht automatisch für eine komplexe Idee. Entscheidend sind unter anderem Nutzungslimits, Arbeitsumfang und benötigte Funktionen. Unterscheide auch die Kosten für das **Entwickeln** von den Kosten für den **Betrieb**: Hosting, Datenbanken oder KI-Aufrufe innerhalb deiner fertigen App können zusätzlich anfallen. ([Lovable-Preise](https://lovable.dev/pricing))

## Deine Auswahl in vier Fragen

**1. Wie komplex erscheint deine Idee im Moment?** Du musst noch nicht wissen, was dein Prototyp im Detail können soll. Das klärt sich in den nächsten Schritten, beispielsweise wenn du mit der Wizard-of-Oz-Methode Abläufe erprobst und die Reaktionen des späteren Programms zunächst selbst übernimmst. Eine grobe Einschätzung ist aber oft schon möglich: Geht es um eine einzelne, überschaubare Interaktion oder vermutlich um mehrere Funktionen, die ineinandergreifen? Für eine einfache Idee kann Ebene 1 genügen. Bei vielen zusammenhängenden Funktionen lohnt sich ein Blick auf Ebene 2 oder 3. Du kannst diese Einschätzung später anpassen.

**2. Wo müssen Daten und Funktionen verfügbar sein?** Wenn alles auf einem Gerät funktioniert und keine gemeinsamen Daten nötig sind, ist Ebene 1 ein guter Start. Wenn Ergebnisse zentral gespeichert werden, mehrere Personen zusammenarbeiten oder geschützte Dienste eingebunden werden sollen, prüfe Ebene 2 oder 3. Ein Weblink allein erfordert noch keine komplexe App: Auch eine einzelne HTML-Datei kann auf einem Webserver liegen.

**3. Wie viel möchtest du selbst gestalten und verstehen?** Wenn dir ein schneller Prototyp mit wenig Einrichtung wichtig ist, passt Ebene 1 oder 2. Wenn du die Technik bewusst erkunden oder konkrete Dienste frei wählen möchtest, lohnt sich Ebene 3 – sofern dein Gerät und deine verfügbare Zeit das ermöglichen.

**4. Wie hoch ist dein Budget?** Überlege, welchen Betrag du monatlich für die Entwicklung und den späteren Betrieb einsetzen kannst. Gibt es bereits einen passenden Zugang über die Schule? Wenn du ohne zusätzliche Ausgaben starten möchtest, prüfe die Gratisangebote und ihre Grenzen. Wenn du ein Abo einplanst, vergleiche die enthaltene Nutzung und mögliche Zusatzkosten mit deinem Budget. So findest du einen Einstieg, den du auch über die erste Erprobung hinaus finanzieren kannst.

Beginne mit einem kleinen Prototyp und Beispieldaten. Sobald du im Unterricht personenbezogene Daten speichern möchtest, kläre die vorgesehenen Dienste und Zugriffe mit der Schule.

Deine Toolbox darf mit deiner Idee wachsen. Starte dort, wo du gut ins Arbeiten kommst. Wenn du dabei auch verstehen möchtest, wie Programme entstehen, ist die lokale Umgebung eine lohnende Lernchance: Bitte die KI nicht nur um das nächste Ergebnis, sondern auch um eine Erklärung, die du selbst nachvollziehen und überprüfen kannst.

*Tool-Beispiele und verlinkte Angaben geprüft am 13. Oktober 2026. Funktionen, Tarife und Verfügbarkeit können sich ändern.*
