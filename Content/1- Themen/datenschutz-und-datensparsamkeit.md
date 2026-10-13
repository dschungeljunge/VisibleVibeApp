---
title: "Datenschutz und Datensparsamkeit"
slug: "datenschutz-und-datensparsamkeit"
type: "learn-topic"
category: "technology"
project: "lernspuren-sichtbar-machen"
order: 24
status: "published"
format: article
summary: "Wie wir Lernapps verantwortungsbewusst gestalten: mit wenigen Daten, überschaubaren Lösungen und einer gemeinsamen Haltung. Ein Manifest-Entwurf aus der VisibleVibe-Community."
video: "https://www.loom.com/share/6fc5913ffa614bf9860dcbd0839a0c90"
---

## Verantwortung beginnt beim Gestalten

Du entwickelst eine Lernapp, probierst einen ersten Ablauf aus und siehst, wie daraus ein Werkzeug für deinen Unterricht werden könnte. Dabei tauchen Fragen auf: Muss ich wissen, wer welche Antwort gegeben hat? Wo landen die Eingaben? Welche Dienste laufen im Hintergrund? Und wie gut kenne ich die Lösung, bevor meine Klasse sie nutzt?

Beim **VisibleVibe #3 am 22. September 2026 in Olten** haben wir viel über Datenschutz und Datensicherheit diskutiert. Wir wollten eine verständliche Orientierung finden, die uns beim Entwickeln begleitet und zu bewussten Entscheidungen führt. Aus diesem Austausch ist ein erster Manifest-Entwurf entstanden.

Im Video oben fasst Peter die Diskussion in rund zwölf Minuten zusammen. Die drei Leitlinien verbinden unsere pädagogische Haltung mit der Verantwortung für das, was wir bauen.

> **Ein Entwurf, den wir gemeinsam weiterentwickeln:** Das Manifest ist eine offene Ideensammlung. Die Leitlinien und Umsetzungsvorschläge sind noch nicht verabschiedet. Auch die Bezeichnung – Manifest, Code of Conduct oder eine andere Form – bleibt offen.

[Manifest im Google Doc lesen und kommentieren](https://docs.google.com/document/d/1buYyvTqHziHNLAbsYG9MYBGcAKrYQweiy5Z5gB1gnSw/edit?usp=sharing)

## Unser Ausgangspunkt: der pädagogische Nutzen

Wir sind eine Community von Lehrpersonen, die digitale Werkzeuge für ihren Unterricht entwickeln, erproben und Erfahrungen miteinander teilen. Wir möchten etwas am Lernen verbessern. Dieser Ausgangspunkt hilft uns auch bei technischen Entscheidungen: Jede zusätzliche Funktion und jedes erhobene Datum sollten einen nachvollziehbaren Zweck haben.

Vielleicht möchtest du sehen, bei welcher Aufgabe deine Klasse hängen bleibt. Dafür brauchst du möglicherweise eine Übersicht über häufige Fehler. Ob du dafür auch Namen, E-Mail-Adressen oder einen Verlauf über mehrere Monate benötigst, ist eine eigene Frage. **Datensparsamkeit beginnt damit, diese Entscheidungen bewusst zu treffen.**

## Das Manifest: drei Leitlinien für unsere Lernapps

### 1. Wir gestalten zum Wohl der Schüler:innen und Lernenden

Unsere Lösungen sollen Lernenden zugutekommen. Ihr Wohl steht im Zentrum unserer Entscheidungen.

Der Entwurf schlägt vor, auf Monetarisierung zu verzichten und damit wirtschaftliche Anreize zu vermeiden, persönliche Daten zu sammeln und zu verwerten. Ebenso gehören der Verzicht auf Täuschung und Überwachung sowie der Schutz vor vermeidbaren Gefahren zu dieser Haltung.

Das betrifft auch Inhalte und Dienste, die wir von aussen einbinden: ein Video, ein Widget oder einen Link zu einer anderen Website. Wir wählen sie bewusst aus, achten auf altersgerechte Inhalte und fragen, welche Inhalte Lernende dort sehen und welche Daten dabei weitergegeben werden könnten.

**Für deine App:** Überlege bei jeder Funktion, wem sie hilft. Eine Rückmeldung kann Lernende beim nächsten Denkschritt unterstützen. Ob dafür zusätzlich ein öffentliches Ranking nötig ist und was es in deiner Klasse auslöst, solltest du gesondert prüfen.

### 2. Wir haben die Kontrolle über unsere Lösungen

Im Entwurf hat diese Leitlinie drei Teile: Wir denken unsere Lösung zu Ende, bauen sie überschaubar und gehen sparsam mit Daten um.

**Die Lösung durchdenken und fertig machen.** Beim Vibe Coding lässt sich schnell eine neue Funktion ergänzen. Bevor wir sie im Schulzimmer einsetzen, prüfen wir, ob sie im vorgesehenen Einsatz funktioniert. Dazu gehören auch unerwartete Eingaben und Situationen, in denen etwas schiefgeht. Bekannte Grenzen machen wir sichtbar.

**Einfach und unterhaltbar bauen.** Eine schlanke App mit einem klaren Zweck lässt sich leichter verstehen, testen und weiterentwickeln. «Reduce to the max» ist ein Umsetzungsvorschlag aus der Diskussion. Passende Open-Source-Bausteine können helfen; wir prüfen dabei, ob sie verständlich, gepflegt und für unseren Zweck geeignet sind.

**Möglichst wenig Daten möglichst nahe speichern.** Wir überlegen zuerst, welche Daten unsere Lösung überhaupt braucht. Wir sammeln nichts auf Vorrat und möchten Daten möglichst lokal verarbeiten und speichern. Wenn ein Server nötig ist, wählen wir dessen Standort bewusst.

Als grobe Orientierung schlägt das Manifest diese Reihenfolge vor:

1. Die Daten bleiben ausschliesslich lokal auf dem Gerät.
2. Falls ein Server nötig ist: ein Server in der Schweiz.
3. Andernfalls: ein Server in Europa.
4. Ein Server auf einem anderen Kontinent erst nach bewusster Abwägung.

Diese Reihenfolge beschreibt eine Präferenz der Community. Der Standort allein beantwortet noch nicht, wer Zugriff hat oder welche weiteren Dienste Daten erhalten. Entscheidend ist, dass wir die Datenflüsse unserer Lösung nachvollziehen können.

Der Manifest-Entwurf schlägt vor, wenn möglich mit **anonymisierten Profilen** zu arbeiten. Dabei prüfen wir, ob Personen auch durch die Kombination von Angaben erkennbar werden können. Nur Namen wegzulassen, genügt dafür nicht automatisch.

**Für deine App:** Eine Übung könnte Antworten nur für die aktuelle Rückmeldung auf dem Gerät verwenden und danach verwerfen. Wenn du die häufigsten Schwierigkeiten der Klasse sehen möchtest, prüfe zuerst, ob eine zusammengefasste Auswertung genügt. Falls du individuelle Lernverläufe brauchst, kläre bewusst, welche Angaben gespeichert werden, wer sie sehen kann und wann sie wieder gelöscht werden.

### 3. Wir teilen unsere Erkenntnisse

Wir lernen aus dem Einsatz unserer Lösungen und geben diese Erfahrungen weiter. Dazu gehört, was funktioniert, was offenbleibt und wo mögliche Gefahren liegen.

Ein Vorschlag aus dem Treffen: Im Footer unserer Apps verlinken wir neben Datenschutzinformationen und gegebenenfalls AGB auch unsere Reflexionen aus dem Schulzimmer. So können andere Lehrpersonen nachvollziehen, unter welchen Bedingungen wir eine Anwendung erprobt haben und welche Grenzen wir sehen.

**Für deine App:** Eine kurze Reflexion könnte beschreiben, welche Lernhandlung du unterstützen wolltest, was du beim Einsatz beobachtet hast und was du vor der nächsten Erprobung verändern möchtest. Teile deine Erkenntnisse so, dass einzelne Lernende darin nicht erkennbar werden.

## Nimm die Leitlinien in deinen nächsten Entwurf mit

Du kannst schon beim Skizzieren deiner App drei Fragen festhalten:

- **Wem hilft die Lösung?** Beschreibe den pädagogischen Nutzen und prüfe, welche Funktionen dafür gebraucht werden.
- **Was habe ich im Griff?** Benenne die Daten, ihren Weg und ihren Speicherort. Halte fest, welche Abläufe du vor dem Einsatz noch testen musst.
- **Was möchte ich weitergeben?** Überlege, welche Beobachtungen aus der Erprobung für andere Lehrpersonen hilfreich wären.

Du brauchst dafür noch keine umfangreiche Dokumentation. Einige klare Sätze können dir helfen, unnötige Funktionen und Daten früh zu erkennen und offene Fragen gezielt zu klären.

## Denk mit: Welche gemeinsame Haltung trägt uns?

Das Manifest lebt davon, dass unterschiedliche Erfahrungen aus der Community zusammenkommen. Zwei Fragen sind im Entwurf ausdrücklich noch offen: Welchen Platz sollen Entlastung und Wohlbefinden der Lehrpersonen haben, und wie gehen wir mit Spannungen zwischen ihren Interessen und jenen der Lernenden um? Und was verstehen wir unter dem Verzicht auf Monetarisierung – etwa bei freiwilligen Beiträgen zur Deckung der Betriebskosten?

Auch die Form möchten wir weiterdenken: Wie knapp sollen die Leitlinien bleiben? Welche konkreten Umsetzungshilfen brauchen wir zusätzlich? Und wie könnten Reflexionen aus dem Schulzimmer für andere wirklich nützlich werden?

**Bring deine Erfahrung ein:** Kommentiere den [Manifest-Entwurf im Google Doc](https://docs.google.com/document/d/1buYyvTqHziHNLAbsYG9MYBGcAKrYQweiy5Z5gB1gnSw/edit?usp=sharing), ergänze einen Umsetzungsvorschlag oder beschreibe eine Frage aus deiner eigenen App. Du kannst die Diskussion auch in unserer Community auf Discord oder beim nächsten Treffen aufnehmen.

---

*Dieser Beitrag greift die Diskussion beim VisibleVibe #3, Peters Video-Zusammenfassung und die am 13. Oktober 2026 bereitgestellte Fassung des Google Docs «VisibleVibe-Manifest: Verantwortungsbewusst gestalten» auf. Die Beispiele unter «Für deine App» und die Fragen für deinen nächsten Entwurf ergänzen das Manifest als Anregungen für die eigene Entwicklung.*
