# Schule Walchwil — Inhalte

Diese Datei erscheint nicht auf der Website.

Die Seite `/walchwil` liest alle Markdown-Dateien in diesem Ordner. `index.md` ist die Einleitung. Jede andere Datei ist ein Programmschritt. Der aktuelle Schritt wird auf der einen Seite ausgeklappt; die übrigen bleiben kompakt. `/walchwil/<slug>` führt zur Übersichtsseite.

## Loom-Impulse einfügen

In der Session-Datei unter `videos:` die Share-URL (oder Embed-URL) ergänzen:

```yaml
videos:
  - title: "Ideen finden und bestätigen"
    url: "https://www.loom.com/share/..."
  - title: "Werkzeuge auswählen"
    url: "https://www.loom.com/share/..."
```

Loom → Share → Link kopieren reicht. Die Seite wandelt den Link in die Einbettung um.

Alternativ die Share-URL als eigenen Absatz in den Markdown-Text legen. Auch dann erscheint der Player.

## Termine in der Umfrage

In `02-organisation.md` unter `dates:` Einträge ergänzen oder streichen:

```yaml
dates:
  - id: "2026-10-08"
    label: "8. Oktober"
    group: "Oktober · Online 1"
```

`id` ist das interne Datum, `label` erscheint in der Umfrage, `group` fasst Termine zusammen.

## Fragen vorab

`questions: true` im Frontmatter öffnet auf der Programmkachel ein gemeinsames Fragenfeld.

## Weiteres

Den bestehenden Schritt öffnen und unter dem Frontmatter schreiben: Links, Notizen, Checklisten. Nach dem Speichern die Seite neu laden.

`status: draft` hält einen Schritt unsichtbar.

Keine E-Mail-Adressen in diesen Dateien — die Seite ist über den Link erreichbar.
