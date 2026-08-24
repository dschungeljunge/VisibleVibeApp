# Content-Anleitung für VisibleVibe

Diese Datei wird **nicht** auf der Website angezeigt (Dateiname beginnt mit `_`).

Der andere Agent baut die Website. Du kannst Dateien in diesem Vault ersetzen oder ergänzen. Nach dem Speichern die Dev-Server-Seite neu laden.

## Regel

Neue Inhalte entstehen durch neue Markdown-Dateien mit YAML-Frontmatter. Dafür muss kein React-Code geändert werden.

Nur Dateien mit gültigem `type` werden eingelesen. `status: draft` bleibt unsichtbar. `published` erscheint öffentlich. `coming-soon` erscheint in Übersichten, der Inhalt ist aber als noch nicht ausgearbeitet markiert.

## Ordner

```text
Content/
  1- Themen/              Lernthemen (Skilltree, learn-topic)
  2 - Projekte/           die fünf Projekte (learn-project)
  design/visiblevibe/     Methodenschritte
  design/engineering/     Best Practices
  connect/                Community-Seite
```

Die Ordnerstruktur ist nur Organisation. Eingelesen wird jede Markdown-Datei mit gültigem `type`, egal in welchem Unterordner sie liegt.

## Skilltree-Logik (seit v0.2)

Der Skilltree auf `/learn` ist projektzentriert. Jedes Thema (`learn-topic`) trägt im Frontmatter ein Feld `project` mit dem Slug des Projekts, für das es **erstmals** gebraucht wird. Die Seite gruppiert die Themen nach Projekt (in Projektreihenfolge); jedes Thema erscheint genau einmal. Spätere Projekte setzen die Themen früherer Projekte voraus.

Themen ohne `project`-Feld erscheinen am Ende unter „Weitere Themen“. Das alte `parent`-Feld wird nicht mehr ausgewertet.

## Pflichtfelder

```yaml
---
title: "Titel"
slug: "url-name"
type: "learn-topic"
status: "published"
order: 1
summary: "Kurze Kernaussage."
---
```

`type` muss eines dieser Werte sein:

- `learn-topic`
- `learn-project`
- `visiblevibe-step`
- `engineering-practice`
- `connect`

## Optionale Felder

```yaml
category: "technology"   # pedagogy | technology | usability
project: "unterrichts-mikrotool"  # Projekt, für das dieses Thema erstmals gebraucht wird
video: "https://www.loom.com/share/..."
goal: "Ziel dieses Methodenschritts"
tasks:
  - id: sammeln
    title: "Sammeln"
    why: "Warum dieser Mini-Schritt zählt."
    board: "Was konkret aufs Whiteboard kommt."
    done: "Woran du merkst, dass dieser Mini-Schritt fertig ist."
    text: |
      Anleitung für Einsteiger:innen. Nummerierte Schritte, ein Beispiel, ein typischer Fehltritt.
```

`tasks` gilt für VisibleVibe-Schritte. Jede Task ist eine Board-Aufgabe in der linken Spalte. Ohne `tasks` wird der Markdown-Body wie bisher gezeigt.

Neue optionale Felder dürfen ergänzt werden. Unbekannte Felder stören den Build nicht.

## Empfohlene Überschriften in Learn-Themen

```markdown
## Why
## How
## What
## Impuls
## Weiterführende Links
```

Die Website stellt den Markdown-Body 1:1 dar. Titel, Summary und Video kommen aus dem Frontmatter.
