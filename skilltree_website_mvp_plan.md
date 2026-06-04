# MVP-Plan: Community-pflegbarer Skilltree für Learning App Design

## 1. Zielbild

Die Website ist ein schlankes, selbst entwickeltes MVP für einen interaktiven Skilltree. Sie dient als Wissens- und Navigationssystem für ein CAS/SAS-Angebot rund um Learning App Design, Vibe Coding, KI, UX und didaktische Gestaltung.

Die Plattform soll zwei Hauptrollen unterstützen:

1. **Besucher:innen / Teilnehmende**  
   Sie können sich durch einen interaktiven Skilltree klicken, Knoten öffnen, Inhalte lesen, Projektpfade nachvollziehen und passende Ressourcen finden.

2. **Superuser / Redaktion**  
   Sie können Skill-Knoten, Verbindungen und Projektpfade bearbeiten. Bei jeder Änderung wird automatisch eine Version gespeichert, damit Inhalte nachvollziehbar und wiederherstellbar bleiben.

Das MVP ist bewusst eng geschnitten. Es soll nicht sofort ein vollständiges Wiki, LMS oder Community-Netzwerk werden. Der Fokus liegt auf: **Skilltree anzeigen, Knoten lesen, Inhalte bearbeiten, Versionen sichern.**

---

## 2. Produktprinzipien

### 2.1 Lernnavigation vor Content-Menge

Die Website soll nicht primär eine Materialsammlung sein. Sie soll sichtbar machen, welche Kompetenzen für bestimmte Lernapp-Projekte nötig sind und wie diese Kompetenzen miteinander zusammenhängen.

### 2.2 Knoten statt Kapitel

Inhalte werden nicht linear als Kursseiten organisiert, sondern als Skill-Knoten. Jeder Knoten steht für eine konkrete Fähigkeit, ein Konzept oder einen technischen Baustein.

Beispiele:

- Retrieval Practice
- Prompting
- Webapp Basics
- React Components
- Formative Feedback
- Datenbankgrundlagen
- Progress Visualization
- Trust Calibration
- User Testing

### 2.3 Projektpfade statt vollständiger Kurslogik

Die Website soll Projektpfade sichtbar machen. Ein Projektpfad bündelt mehrere Knoten, die für ein bestimmtes Artefakt relevant sind.

Beispiele:

- Interaktive Quiz-Webapp
- KI-gestützte Tutor-App
- Lernfortschritts-Dashboard
- Personalisierte Lernumgebung

### 2.4 Redaktionelle Qualität statt offene Wildwuchs-Community

Im MVP dürfen nur Superuser Inhalte direkt bearbeiten. Community-Beiträge können später ergänzt werden. Vorerst reicht ein klarer redaktioneller Kern.

### 2.5 Versionierung minimal, aber zuverlässig

Bei jedem Speichern eines Knotens wird die alte Version automatisch archiviert. Ein komplexes Diff-System ist nicht Teil des MVP. Wiederherstellen alter Versionen ist aber erwünscht.

---

## 3. Technischer Stack

Empfohlener Stack:

- **Framework:** Next.js mit App Router
- **Frontend:** React
- **Skilltree-Visualisierung:** React Flow
- **Styling:** Tailwind CSS
- **Datenbank:** Supabase / PostgreSQL
- **Authentifizierung:** Supabase Auth
- **Deployment:** Vercel
- **Editor:** Markdown-Editor mit Vorschau
- **Markdown Rendering:** react-markdown oder vergleichbare Library

Begründung:

Dieser Stack ist nah an typischen Vibe-Coding-Workflows, gut dokumentiert, relativ leicht deploybar und passt zu einem späteren CAS-Kontext. Supabase bietet Auth, Datenbank und Rechteverwaltung aus einer Hand. React Flow eignet sich sehr gut für eine interaktive Knoten-Kanten-Visualisierung.

---

## 4. Rollen und Rechte

### 4.1 Public User

Darf:

- Skilltree ansehen
- Knoten anklicken
- Knotenseiten lesen
- Projektpfade ansehen
- nach Knoten suchen
- nach Kategorie filtern

Darf nicht:

- Inhalte bearbeiten
- Versionen sehen
- Knoten erstellen oder löschen

### 4.2 Superuser

Darf zusätzlich:

- Login verwenden
- Knoten erstellen
- Knoten bearbeiten
- Knoten löschen oder archivieren
- Verbindungen zwischen Knoten erstellen und bearbeiten
- Projektpfade erstellen und bearbeiten
- Versionen ansehen
- alte Versionen wiederherstellen
- Status eines Knotens setzen

### 4.3 Admin-Rolle optional

Im MVP kann Superuser und Admin identisch sein. Eine separate Admin-Rolle ist erst nötig, wenn mehrere Redaktor:innen mit unterschiedlichen Rechten arbeiten.

---

## 5. Informationsarchitektur

### 5.1 Hauptnavigation

Die Website braucht nur wenige Hauptbereiche:

1. **Skilltree**  
   Interaktive Übersicht aller Knoten und Verbindungen.

2. **Projektpfade**  
   Übersicht der Artefaktpfade, z. B. Quiz-Webapp, Tutor-App, Dashboard.

3. **Knotenübersicht**  
   Listenansicht aller Skills mit Suche und Filter.

4. **Über das Projekt**  
   Kurze Erklärung: Ziel, CAS/SAS-Kontext, Mitwirkungsmöglichkeiten.

5. **Admin**  
   Nur sichtbar für eingeloggte Superuser.

### 5.2 Skilltree-Seite

Die Skilltree-Seite ist die zentrale Startseite der Plattform.

Funktionen:

- Knoten als visuelle Elemente anzeigen
- Verbindungen als Kanten anzeigen
- Zoom und Pan
- Klick auf Knoten öffnet Detailpanel oder führt zur Knotenseite
- Filter nach Kategorie
- Filter nach Level
- Hervorhebung eines Projektpfads
- Legende für Kategorien

MVP-Entscheid:

Die Knotenpositionen werden zunächst manuell in der Datenbank gespeichert (`position_x`, `position_y`). Ein visueller Drag-and-Drop-Editor für die Positionierung ist nicht zwingend Teil des ersten MVP.

### 5.3 Knotenseite

Jeder Knoten hat eine eigene Detailseite.

Pfadbeispiel:

`/skills/prompting`

Inhalte:

- Titel
- Kategorie
- Level
- Status
- Kurzbeschreibung
- Warum relevant für Learning Apps?
- Voraussetzungen
- Führt zu
- Zugehörige Projektpfade
- Hauptinhalt als Markdown
- Mini-Aufgabe
- Qualitätskriterien
- Ressourcen
- letzte Aktualisierung

### 5.4 Projektpfadseite

Jeder Projektpfad hat eine eigene Seite.

Pfadbeispiel:

`/projects/tutor-app`

Inhalte:

- Titel
- Kurzbeschreibung
- Zielartefakt
- relevante Lernstrategie
- relevantes Technologieprinzip
- relevantes UX-Prinzip
- benötigte Knoten
- optionale Erweiterungsknoten
- Definition of Done
- Beispielablauf
- empfohlene Reihenfolge

---

## 6. Datenmodell

### 6.1 Tabelle: `profiles`

Ergänzt Supabase Auth mit Rolleninformationen.

Felder:

- `id` UUID, primary key, references auth.users.id
- `email` text
- `display_name` text
- `role` text, values: `public`, `superuser`, `admin`
- `created_at` timestamp
- `updated_at` timestamp

Hinweis:

Normale Besucher:innen brauchen keinen Account. Accounts sind nur für Superuser nötig.

---

### 6.2 Tabelle: `nodes`

Speichert den aktuellen Stand jedes Skill-Knotens.

Felder:

- `id` UUID, primary key
- `slug` text, unique, z. B. `prompting`
- `title` text
- `summary` text
- `category` text, z. B. `AI Design`, `Learning Design`, `UX Design`, `Data Design`, `Product Design`
- `level` integer, z. B. 1–10
- `status` text, values: `draft`, `reviewed`, `stable`, `archived`
- `content_markdown` text
- `practice_task` text
- `quality_criteria` text
- `resources_markdown` text
- `position_x` integer
- `position_y` integer
- `created_by` UUID
- `updated_by` UUID
- `created_at` timestamp
- `updated_at` timestamp

MVP-Hinweis:

Die Felder `practice_task`, `quality_criteria` und `resources_markdown` können auch im `content_markdown` enthalten sein. Für bessere Struktur und spätere Wiederverwendung ist eine Trennung aber sinnvoll.

---

### 6.3 Tabelle: `edges`

Speichert Beziehungen zwischen Knoten.

Felder:

- `id` UUID, primary key
- `source_node_id` UUID, references nodes.id
- `target_node_id` UUID, references nodes.id
- `relation_type` text, values: `prerequisite`, `leads_to`, `related`, `required_for_project`, `optional_extension`
- `label` text, optional
- `created_by` UUID
- `created_at` timestamp

Beispiele:

- `Webapp Basics` → `React Components`, relation: `prerequisite`
- `Prompting` → `Tutor App`, relation: `required_for_project`
- `Formative Feedback` → `Tutor App`, relation: `required_for_project`

---

### 6.4 Tabelle: `projects`

Speichert Projektpfade bzw. Artefaktstufen.

Felder:

- `id` UUID, primary key
- `slug` text, unique
- `title` text
- `summary` text
- `artifact_description` text
- `learning_strategy` text
- `technology_principle` text
- `ux_principle` text
- `definition_of_done` text
- `content_markdown` text
- `status` text, values: `draft`, `reviewed`, `stable`, `archived`
- `created_by` UUID
- `updated_by` UUID
- `created_at` timestamp
- `updated_at` timestamp

---

### 6.5 Tabelle: `project_nodes`

Verknüpft Projektpfade mit Knoten.

Felder:

- `id` UUID, primary key
- `project_id` UUID, references projects.id
- `node_id` UUID, references nodes.id
- `importance` text, values: `required`, `recommended`, `optional`
- `sequence_order` integer

---

### 6.6 Tabelle: `node_versions`

Speichert alte Versionen von Knoten.

Felder:

- `id` UUID, primary key
- `node_id` UUID, references nodes.id
- `snapshot` jsonb
- `change_note` text
- `created_by` UUID
- `created_at` timestamp

`snapshot` enthält den vollständigen Zustand des Knotens vor der Änderung:

```json
{
  "title": "Prompting",
  "summary": "...",
  "category": "AI Design",
  "level": 3,
  "status": "draft",
  "content_markdown": "...",
  "practice_task": "...",
  "quality_criteria": "...",
  "resources_markdown": "...",
  "position_x": 400,
  "position_y": 200
}
```

---

### 6.7 Tabelle: `project_versions`

Analog zu `node_versions`, aber für Projektpfade.

Felder:

- `id` UUID, primary key
- `project_id` UUID, references projects.id
- `snapshot` jsonb
- `change_note` text
- `created_by` UUID
- `created_at` timestamp

---

## 7. Sicherheits- und Berechtigungslogik

### 7.1 Public Read

Alle `stable` und `reviewed` Knoten und Projekte sind öffentlich sichtbar.

Optional im MVP:

- `draft` nur für Superuser sichtbar
- `archived` nicht öffentlich sichtbar

### 7.2 Superuser Write

Nur eingeloggte Nutzer:innen mit Rolle `superuser` oder `admin` dürfen Inhalte erstellen, bearbeiten oder löschen.

### 7.3 Supabase Row Level Security

RLS-Regeln:

- Public darf `nodes` lesen, wenn `status IN ('reviewed', 'stable')`
- Superuser/Admin darf alle `nodes` lesen
- Superuser/Admin darf `nodes` insert/update
- Superuser/Admin darf `edges` insert/update/delete
- Public darf `edges` lesen, wenn beide verbundenen Knoten öffentlich sind
- Public darf `projects` lesen, wenn `status IN ('reviewed', 'stable')`
- Superuser/Admin darf `projects` insert/update
- Nur Superuser/Admin darf Versionen lesen

---

## 8. UX und Design

### 8.1 Visuelle Grundidee

Das Interface soll ruhig, klar und fachlich hochwertig wirken. Es darf nicht nach Gamification-Spielerei aussehen. Der Skilltree ist ein Navigationsinstrument, kein Belohnungssystem.

Stil:

- minimalistisches Layout
- helle Flächen
- klare Typografie
- dezente Linien
- farbliche Kodierung nach Kompetenzfeldern
- keine übertriebene Gamification

### 8.2 Kategorien und Farben

Mögliche Kategorien:

1. **Learning Design**  
   Lernstrategien, didaktische Prinzipien, Aufgabenqualität

2. **UX Design**  
   Learnability, Cognitive Load Management, Progress Visualization, Trust Calibration

3. **AI Design**  
   LLMs, Prompting, Context Engineering, KI-Feedback, Guardrails

4. **Data Design**  
   Datenbanken, User Management, Lernstände, Dashboards, Learning Analytics

5. **Product Design**  
   Vibe Coding, MVP, Testing, Deployment, Wartung

Farben sollten sparsam eingesetzt werden. Wichtig ist die Lesbarkeit.

### 8.3 Skilltree-Knoten

Jeder Knoten zeigt:

- Titel
- Kategorie-Farbe
- Status-Icon oder Status-Badge
- Level optional

Beim Hover:

- Kurzbeschreibung
- Kategorie
- relevante Projektpfade

Beim Klick:

Variante A: Detailpanel rechts öffnet sich  
Variante B: Navigation zur Knotenseite

Für das MVP ist Variante B einfacher. Variante A kann später ergänzt werden.

---

## 9. Seitenstruktur / Routing

Empfohlene Next.js-Routen:

```text
/
/skilltree
/skills
/skills/[slug]
/projects
/projects/[slug]
/about
/admin
/admin/nodes
/admin/nodes/new
/admin/nodes/[id]
/admin/projects
/admin/projects/new
/admin/projects/[id]
/admin/edges
/admin/versions/nodes/[id]
/login
```

### 9.1 Startseite `/`

Inhalt:

- kurzer Claim
- Button zum Skilltree
- Button zu Projektpfaden
- Erklärung in 3 Schritten:
  1. Skilltree erkunden
  2. Projektpfad wählen
  3. Lernapp-Artefakt entwickeln

### 9.2 Skilltree `/skilltree`

Interaktive Visualisierung.

### 9.3 Skills `/skills`

Listenansicht mit:

- Suche
- Kategorie-Filter
- Status-Filter für Superuser
- Level-Filter

### 9.4 Skilldetail `/skills/[slug]`

Detailseite eines Knotens.

### 9.5 Projektpfade `/projects`

Kartenansicht aller Projektpfade.

### 9.6 Admin `/admin`

Dashboard für Superuser.

Zeigt:

- Anzahl Knoten
- Anzahl Projekte
- zuletzt geänderte Knoten
- Entwürfe
- direkte Links zu Bearbeitungsfunktionen

---

## 10. Admin-Funktionen

### 10.1 Knoten erstellen

Formularfelder:

- Titel
- Slug automatisch aus Titel generieren, aber editierbar
- Kategorie
- Level
- Status
- Kurzbeschreibung
- Markdown-Inhalt
- Praxisaufgabe
- Qualitätskriterien
- Ressourcen
- Position X
- Position Y

Beim Speichern:

- neuer Knoten wird erstellt
- keine Version nötig, da neu

### 10.2 Knoten bearbeiten

Vor dem Speichern:

1. aktuellen Zustand des Knotens laden
2. Snapshot in `node_versions` speichern
3. neue Daten in `nodes` speichern
4. `updated_at` und `updated_by` aktualisieren

### 10.3 Knoten archivieren statt löschen

Im MVP sollte Löschen vermieden werden. Besser:

- Status auf `archived` setzen
- Knoten öffentlich ausblenden
- Verbindungen bleiben nachvollziehbar

### 10.4 Verbindung erstellen

Formular:

- Quelle auswählen
- Ziel auswählen
- Beziehungstyp auswählen
- optionales Label

### 10.5 Projektpfad erstellen/bearbeiten

Formular:

- Titel
- Slug
- Kurzbeschreibung
- Zielartefakt
- Lernstrategie
- Technologieprinzip
- UX-Prinzip
- Definition of Done
- Markdown-Inhalt
- Status
- Knoten zuordnen
- Reihenfolge der Knoten definieren
- Wichtigkeit: required/recommended/optional

### 10.6 Versionen ansehen

Für jeden Knoten:

- Liste alter Versionen
- Datum
- Bearbeiter:in
- Change Note
- Button: Version ansehen
- Button: Version wiederherstellen

MVP: Keine visuelle Diff-Ansicht nötig.

### 10.7 Version wiederherstellen

Ablauf:

1. aktuellen Zustand ebenfalls als neue Version speichern
2. ausgewählte alte Version in `nodes` zurückschreiben
3. Change Note: `Restored version from [date]`

---

## 11. Markdown-Konvention für Knoteninhalte

Jeder Knoten sollte ein einheitliches Template verwenden.

```markdown
## Kurzbeschreibung

Was ist dieser Skill in 3–5 Sätzen?

## Warum ist das für Learning Apps relevant?

Welche Designentscheidung wird dadurch möglich?

## Voraussetzungen

Welche anderen Skills helfen vorher?

## Mini-Tutorial

Wie kann man diesen Skill niederschwellig ausprobieren?

## Praxisaufgabe

Was soll eine Person konkret tun, um den Skill anzuwenden?

## Beispiel im Unterricht

Wie könnte dieser Skill in einer Lernapp für den Unterricht sichtbar werden?

## Qualitätskriterien

Woran erkennt man eine gute Umsetzung?

## Ressourcen

Links, Videos, Papers, Tools, Prompts.
```

Wichtig:

Die zentrale Frage pro Knoten lautet:

> Welche Designentscheidung wird durch diesen Skill möglich?

Das verhindert, dass der Skilltree zu einer reinen Technologie- oder Linkliste wird.

---

## 12. Erste Seed-Inhalte

Für das MVP sollten ca. 20–30 Knoten angelegt werden. Nicht mehr. Die Qualität der Struktur ist wichtiger als Menge.

### 12.1 Learning Design

- Retrieval Practice
- Spaced Practice
- Worked Examples
- Scaffolding
- Formative Feedback
- Self-Regulated Learning
- Fachliche Lernziele präzisieren
- Fehlvorstellungen identifizieren

### 12.2 UX Design

- Learnability
- Cognitive Load Management
- Progressive Disclosure
- Actionable Feedback Design
- Progress Visualization
- User Control and Freedom
- Trust Calibration
- Usability Testing

### 12.3 AI Design

- LLM-Grundlagen
- Prompting
- System Prompt
- Strukturierte KI-Ausgaben
- Context Engineering
- Guardrails
- KI-Feedback

### 12.4 Data Design

- Datenmodellierung
- Supabase Basics
- User Management
- Lernstand speichern
- Dashboard Basics
- Learning Analytics Basics

### 12.5 Product Design

- Vibe Coding Workflow
- MVP definieren
- Software-Projektmanagement light
- Deployment
- Versionierung
- Classroom Testing

---

## 13. Erste Projektpfade

### 13.1 Interaktive Quiz-Webapp

Ziel:

Eine einfache Lernapp, die aktive Abrufhandlungen auslöst.

Kernknoten:

- Retrieval Practice
- Learnability
- Vibe Coding Workflow
- Webapp Basics
- MVP definieren
- Usability Testing

Definition of Done:

- App ist online erreichbar
- Lernende können mindestens 5 Aufgaben bearbeiten
- Lernhandlung ist klar erkennbar
- Rückmeldung ist verständlich
- kurze Reflexion begründet die Lernstrategie

---

### 13.2 KI-gestützte Tutor-App

Ziel:

Eine App, die Lernenden auf Basis einer Eingabe formative, handlungsleitende Rückmeldungen gibt.

Kernknoten:

- Formative Feedback
- Actionable Feedback Design
- LLM-Grundlagen
- Prompting
- System Prompt
- Strukturierte KI-Ausgaben
- Trust Calibration

Definition of Done:

- App nimmt eine Lernendenantwort entgegen
- KI gibt Feedback anhand expliziter Kriterien
- Feedback enthält eine nächste Handlung
- App vermeidet direkte Lösungsausgabe, wenn nicht gewünscht
- Grenzen und Fehlerrisiken werden reflektiert

---

### 13.3 Lernfortschritts-Dashboard

Ziel:

Eine App speichert Lernstände und macht Fortschritt sichtbar.

Kernknoten:

- Spaced Practice
- Progress Visualization
- Datenmodellierung
- Supabase Basics
- User Management
- Lernstand speichern
- Dashboard Basics

Definition of Done:

- App speichert Lernhandlungen
- Lernstand wird visuell dargestellt
- nächste Lernhandlung wird nachvollziehbar empfohlen
- Datenmodell ist dokumentiert
- Datenschutzfragen werden reflektiert

---

### 13.4 Personalisierte Lernumgebung

Ziel:

Eine Lernapp kombiniert Lernstand, KI-Unterstützung und Reflexion zu einer einfachen personalisierten Lernumgebung.

Kernknoten:

- Self-Regulated Learning
- Learning Analytics Basics
- Context Engineering
- User Control and Freedom
- Trust Calibration
- Classroom Testing

Definition of Done:

- Lernende können ein Ziel setzen
- App unterstützt Arbeit und Reflexion
- Lernstand oder Eingaben beeinflussen nächste Schritte
- Nutzer:innen behalten Kontrolle über Empfehlungen
- Pilotierung oder Test ist dokumentiert

---

## 14. Komponentenarchitektur

### 14.1 Frontend-Komponenten

Empfohlene Komponenten:

- `Navbar`
- `Footer`
- `SkillTreeCanvas`
- `SkillNodeCard`
- `SkillNodeTooltip`
- `CategoryLegend`
- `FilterPanel`
- `NodeDetailPage`
- `ProjectPathCard`
- `ProjectPathPage`
- `MarkdownRenderer`
- `AdminLayout`
- `NodeEditorForm`
- `ProjectEditorForm`
- `EdgeEditorForm`
- `VersionList`
- `VersionPreview`
- `StatusBadge`
- `CategoryBadge`

### 14.2 Backend / Server Actions

Empfohlene serverseitige Funktionen:

- `getPublicNodes()`
- `getPublicEdges()`
- `getNodeBySlug(slug)`
- `getProjects()`
- `getProjectBySlug(slug)`
- `createNode(data)`
- `updateNode(id, data, changeNote)`
- `archiveNode(id)`
- `createEdge(data)`
- `updateEdge(id, data)`
- `deleteEdge(id)`
- `createProject(data)`
- `updateProject(id, data, changeNote)`
- `getNodeVersions(nodeId)`
- `restoreNodeVersion(versionId)`
- `requireSuperuser()`

---

## 15. Versionierungslogik im Detail

### 15.1 Beim Bearbeiten eines Knotens

Pseudo-Ablauf:

```text
function updateNode(nodeId, newData, changeNote, userId):
    currentNode = getNode(nodeId)
    createNodeVersion({
        node_id: nodeId,
        snapshot: currentNode,
        change_note: changeNote,
        created_by: userId
    })
    update nodes set newData where id = nodeId
```

### 15.2 Beim Wiederherstellen

```text
function restoreNodeVersion(versionId, userId):
    version = getNodeVersion(versionId)
    currentNode = getNode(version.node_id)
    createNodeVersion({
        node_id: version.node_id,
        snapshot: currentNode,
        change_note: "Backup before restore",
        created_by: userId
    })
    update nodes with version.snapshot
```

### 15.3 Change Notes

Beim Speichern sollte optional eine kurze Änderungsnotiz verlangt werden.

Beispiele:

- „Ressourcen ergänzt“
- „Qualitätskriterien präzisiert“
- „Praxisaufgabe vereinfacht“
- „Status auf reviewed gesetzt“

---

## 16. MVP-Abgrenzung

### 16.1 Im MVP enthalten

- öffentlicher Skilltree
- Knoten anklicken und lesen
- Projektpfade lesen
- Suche und einfache Filter
- Login für Superuser
- Knoten erstellen/bearbeiten/archivieren
- Verbindungen erstellen/bearbeiten
- Projektpfade erstellen/bearbeiten
- automatische Versionierung
- alte Version wiederherstellen
- Deployment

### 16.2 Nicht im MVP enthalten

- offene Community-Accounts
- Beitragsvorschläge durch normale User
- Kommentare
- Likes/Badges
- persönliche Fortschrittsverfolgung
- komplexe Lernpfad-Empfehlungen
- Live-Collaboration
- WYSIWYG-Editor
- automatisches Layout des Skilltrees
- komplexe Diff-Ansicht
- Benachrichtigungen
- Mehrsprachigkeit
- Zahlungsfunktionen
- LMS-Funktionen

---

## 17. Entwicklungsphasen

### Phase 1: Setup und Datenmodell

Ziele:

- Next.js-Projekt initialisieren
- Tailwind einrichten
- Supabase-Projekt erstellen
- Datenbanktabellen anlegen
- RLS-Regeln definieren
- Auth einrichten
- Seed-Daten vorbereiten

Akzeptanzkriterien:

- App läuft lokal
- Supabase ist verbunden
- öffentliche Daten können gelesen werden
- Superuser kann sich einloggen

---

### Phase 2: Public Skilltree

Ziele:

- React Flow integrieren
- Knoten aus Datenbank anzeigen
- Kanten aus Datenbank anzeigen
- Kategorien visuell unterscheiden
- Klick auf Knoten führt zur Detailseite
- Zoom/Pan funktioniert

Akzeptanzkriterien:

- Skilltree zeigt mindestens 20 Seed-Knoten
- Verbindungen werden korrekt angezeigt
- Knoten sind anklickbar
- Darstellung ist responsiv genug für Desktop

MVP-Fokus:

Desktop zuerst. Mobile Optimierung kann später vertieft werden.

---

### Phase 3: Knotenseiten und Projektpfade

Ziele:

- `/skills` Listenansicht
- `/skills/[slug]` Detailseite
- Markdown Rendering
- Projektpfadübersicht
- Projektpfaddetailseite
- Verknüpfte Knoten anzeigen

Akzeptanzkriterien:

- jeder Knoten hat eine lesbare Detailseite
- Projektpfade zeigen benötigte Knoten
- Markdown wird korrekt dargestellt
- Status und Kategorien sind sichtbar

---

### Phase 4: Adminbereich

Ziele:

- geschützter Adminbereich
- Knotenformular
- Projektformular
- Kantenformular
- einfache Tabellenübersichten

Akzeptanzkriterien:

- nur Superuser können Adminseiten sehen
- Knoten können erstellt und bearbeitet werden
- Projektpfade können erstellt und bearbeitet werden
- Kanten können erstellt und bearbeitet werden

---

### Phase 5: Versionierung

Ziele:

- beim Bearbeiten automatisch Version speichern
- Versionen pro Knoten anzeigen
- alte Version ansehen
- alte Version wiederherstellen

Akzeptanzkriterien:

- jede Änderung erzeugt einen Snapshot
- Versionen sind chronologisch sichtbar
- Wiederherstellung funktioniert zuverlässig
- aktueller Stand wird vor Restore gesichert

---

### Phase 6: Polishing und Pilot

Ziele:

- UX verbessern
- Fehlerbehandlung
- Ladezustände
- leere Zustände
- einfache Suche und Filter
- Deployment auf Vercel
- Test mit 3–5 Personen

Akzeptanzkriterien:

- Plattform ist online erreichbar
- Superuser-Workflow funktioniert von Anfang bis Ende
- Skilltree ist verständlich navigierbar
- erste Pilotfeedbacks sind dokumentiert

---

## 18. Qualitätskriterien für das MVP

Das MVP ist erfolgreich, wenn folgende Kriterien erfüllt sind:

1. Eine externe Person versteht innerhalb von 2 Minuten, wozu der Skilltree dient.
2. Eine externe Person kann einen Projektpfad öffnen und erkennen, welche Skills dafür nötig sind.
3. Ein Superuser kann ohne technische Hilfe einen Knoten bearbeiten.
4. Jede Änderung erzeugt zuverlässig eine alte Version.
5. Eine alte Version kann wiederhergestellt werden.
6. Die Plattform enthält mindestens 20 qualitativ strukturierte Knoten.
7. Die Plattform enthält mindestens 3 Projektpfade.
8. Der Skilltree ist nicht nur dekorativ, sondern dient tatsächlich als Navigation.

---

## 19. Zentrale Risiken

### Risiko 1: Zu viel Plattform, zu wenig Inhalt

Gegenmaßnahme:

Funktionsumfang klein halten. Zuerst 20 gute Knoten statt 100 halbfertige.

### Risiko 2: Graph wird unübersichtlich

Gegenmaßnahme:

Knoten nach Kategorien gruppieren. Projektpfade hervorheben. Filter einbauen.

### Risiko 3: Versionierung wird zu komplex

Gegenmaßnahme:

Nur Snapshots speichern. Keine Diff-Ansicht im MVP.

### Risiko 4: Admin-Editing wird zu aufwendig

Gegenmaßnahme:

Markdown-Editor statt Rich-Text-Editor.

### Risiko 5: Skilltree wird zu technisch

Gegenmaßnahme:

Jeder Knoten muss beantworten: Welche Designentscheidung für Learning Apps wird dadurch möglich?

---

## 20. Prompts für KI-Agenten

### 20.1 Agent 1: Datenbank und Supabase

Aufgabe:

Setze das Supabase-Datenmodell für den Skilltree um. Erstelle Tabellen für `profiles`, `nodes`, `edges`, `projects`, `project_nodes`, `node_versions` und `project_versions`. Definiere sinnvolle Datentypen, Foreign Keys, Timestamps und Row Level Security. Public User dürfen nur `reviewed` und `stable` Inhalte lesen. Superuser und Admins dürfen Inhalte erstellen und bearbeiten. Erstelle zusätzlich Seed-Daten für mindestens 20 Knoten und 3 Projektpfade.

Akzeptanzkriterien:

- Tabellen sind angelegt
- Relationen funktionieren
- RLS ist aktiv
- Seed-Daten sind vorhanden
- Superuser-Rolle ist testbar

### 20.2 Agent 2: Public Frontend

Aufgabe:

Baue das öffentliche Frontend mit Next.js, Tailwind und React Flow. Die Seite `/skilltree` soll Knoten und Kanten aus Supabase laden und interaktiv darstellen. Nutzer:innen können zoomen, verschieben, filtern und Knoten anklicken. Klick auf einen Knoten führt zu `/skills/[slug]`. Erstelle außerdem Listenansicht und Detailseite für Skills sowie Projektpfadübersicht und Projektpfadseiten.

Akzeptanzkriterien:

- Skilltree wird aus Datenbankdaten generiert
- Knoten sind klickbar
- Kategorien sind visuell unterscheidbar
- Skilldetailseiten funktionieren
- Projektpfade funktionieren

### 20.3 Agent 3: Adminbereich

Aufgabe:

Baue einen geschützten Adminbereich für Superuser. Superuser können Knoten, Kanten und Projektpfade erstellen und bearbeiten. Nutze Formulare mit Validierung. Beim Bearbeiten von Knoten und Projekten muss vor dem Speichern automatisch ein Snapshot der alten Version gespeichert werden. Implementiere Versionen anzeigen und Version wiederherstellen.

Akzeptanzkriterien:

- Login schützt Adminbereich
- Knoten CRUD funktioniert
- Kanten CRUD funktioniert
- Projekt CRUD funktioniert
- Versionierung funktioniert
- Restore funktioniert

### 20.4 Agent 4: UX und Polishing

Aufgabe:

Verbessere die Benutzeroberfläche. Erstelle klare Layouts, Status-Badges, Kategorie-Badges, leere Zustände, Ladezustände und Fehlermeldungen. Optimiere die Skilltree-Ansicht für Desktop. Sorge dafür, dass die Plattform fachlich ruhig, hochwertig und nicht verspielt wirkt.

Akzeptanzkriterien:

- UI ist konsistent
- Skilltree ist gut lesbar
- Detailseiten sind angenehm lesbar
- Adminformulare sind verständlich
- Fehler und Ladezustände sind abgefangen

---

## 21. Erste inhaltliche Struktur für Seed-Daten

### Kategorien

- Learning Design
- UX Design
- AI Design
- Data Design
- Product Design

### Startknoten

1. Learning App Canvas
2. Vibe Coding Workflow
3. MVP definieren
4. Webapp Basics
5. React Components
6. Retrieval Practice
7. Learnability
8. Cognitive Load Management
9. Formative Feedback
10. Actionable Feedback Design
11. LLM-Grundlagen
12. Prompting
13. System Prompt
14. Strukturierte KI-Ausgaben
15. Trust Calibration
16. Datenmodellierung
17. Supabase Basics
18. User Management
19. Lernstand speichern
20. Progress Visualization
21. Dashboard Basics
22. Spaced Practice
23. Self-Regulated Learning
24. Context Engineering
25. Classroom Testing
26. Deployment

### Start-Projektpfade

1. Interaktive Quiz-Webapp
2. KI-gestützte Tutor-App
3. Lernfortschritts-Dashboard
4. Personalisierte Lernumgebung

---

## 22. Definition of Done für die Website

Die Website gilt als MVP-fertig, wenn:

- sie auf Vercel deployed ist
- Supabase produktiv verbunden ist
- mindestens ein Superuser Login funktioniert
- mindestens 20 Knoten vorhanden sind
- mindestens 3 Projektpfade vorhanden sind
- Skilltree und Detailseiten öffentlich nutzbar sind
- Superuser Knoten bearbeiten kann
- Versionierung bei Änderungen funktioniert
- Restore einer alten Version funktioniert
- ein kurzer Pilot mit mindestens 3 Testpersonen durchgeführt wurde

---

## 23. Spätere Erweiterungen nach dem MVP

Erst nach erfolgreichem Pilot prüfen:

- Community-Beiträge als Vorschläge
- Kommentarfunktion pro Knoten
- Review-Workflow: vorgeschlagen → geprüft → übernommen
- persönliche Fortschrittsmarkierung
- Badges/Zertifikatslogik
- automatisches Skilltree-Layout
- Drag-and-Drop Graph Editor
- Diff-Ansicht für Versionen
- Mehrsprachigkeit
- Export als Open Educational Resource
- Verbindung mit SAS/CAS-Abgaben
- Integration von Beispielen aus Teilnehmendenprojekten

---

## 24. Leitentscheidung

Für das MVP gilt:

> Nicht ein vollständiges Wiki bauen. Nicht ein LMS bauen. Nicht eine Community-Plattform bauen. Sondern einen interaktiven Skilltree mit editierbaren, versionierten Knotenseiten.

Alles Weitere ist spätere Produktentwicklung.

