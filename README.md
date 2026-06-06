# VisibleVibe Skilltree

**Eine interaktive Lernplattform für Lehrpersonen im CAS/SAS Learning App Design.**

Der Skilltree begleitet Lehrpersonen dabei, lernwirksame Web-Apps mit KI-Assistenten (Vibe Coding) zu entwerfen und zu bauen — ohne Programmierkenntnisse vorauszusetzen. Er ist selbst eine Next.js-Web-App: Die Lerninhalte sind Markdown-Dateien, die bei jedem Start in eine interaktive Node-Karte kompiliert werden.

---

## Inhaltsverzeichnis

- [Was ist das?](#was-ist-das)
- [Projektstruktur](#projektstruktur)
- [Content-Pipeline](#content-pipeline)
- [Lokale Entwicklung](#lokale-entwicklung)
- [Inhalte bearbeiten](#inhalte-bearbeiten)
- [Neuen Node erstellen](#neuen-node-erstellen)
- [Pädagogisches Konzept](#pädagogisches-konzept)
- [Tech Stack](#tech-stack)

---

## Was ist das?

Der VisibleVibe Skilltree ist eine **nichtlineare Lernplattform** mit drei Knotentypen:

| Typ | Beschreibung | Beispiele |
|-----|-------------|---------|
| **A — Orientierungsknoten** | Konzeptwissen, KI-Dialog, Retrieval-Quiz. Kein Code. | Pädagogik, KI & LLMs, Feedback |
| **B — Implementierungsknoten** | Hands-on-Feature bauen via Vibe Coding. | Scaffolding, API-Keys, Datenbanken |
| **P — Projektmeilensteine** | Integration mehrerer Knoten zu einem bewertbaren App-Produkt. | Quiz-Webapp, KI-Tutor, Dashboard |

Jeder Knoten ist eine Markdown-Datei in `content/nodes/`. Projektmeilensteine liegen zusätzlich in `content/projects/`. Der Kompilier-Schritt (`npm run dev`) liest alle Dateien, extrahiert Frontmatter und Markdown-Body, und erzeugt daraus `src/data/seedData.ts` — die einzige Datenquelle der App.

---

## Projektstruktur

```
VisibleVibeApp/
├── content/                   # Lerninhalte (bearbeite diese!)
│   ├── nodes/                 # Alle Skillknoten (Typ A & B & P)
│   │   ├── kickoff.md
│   │   ├── paedagogik.md
│   │   ├── technik.md
│   │   └── ...                # 26 Knoten gesamt
│   ├── projects/              # Zusätzliche Projektdateien (Typ P, Legacy)
│   │   ├── quiz-webapp.md
│   │   ├── tutor-app.md
│   │   └── ...
│   ├── archive/               # Alte Konzeptversionen, nicht produktiv
│   └── paedagogisches-konzept.md   # Das pädagogische Rahmenkonzept (V2)
│
├── scripts/
│   └── compile-content.ts     # Markdown → seedData.ts Kompiler
│
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── page.tsx           # Startseite (Hero + 3-Schritte-Übersicht)
│   │   ├── skilltree/         # Interaktiver Skilltree (React Flow)
│   │   ├── skills/[slug]/     # Einzelne Node-Detailseite
│   │   └── projects/          # Projektpfad-Übersicht
│   ├── components/
│   │   ├── SkillTreeCanvas.tsx   # React Flow Canvas
│   │   ├── CustomNode.tsx        # Node-Darstellung im Canvas
│   │   ├── Sidebar.tsx           # Detail-Sidebar (öffnet bei Node-Klick)
│   │   ├── FilterPanel.tsx       # Kategorie-Filter
│   │   └── Navbar.tsx            # Globale Navigation
│   ├── data/
│   │   └── seedData.ts        # AUTO-GENERIERT — nicht manuell bearbeiten!
│   ├── lib/
│   │   └── dataClient.ts      # Lese-API für seedData + LocalStorage
│   └── context/               # React Context für globalen State
│
├── AGENTS.md                  # Instruktionen für KI-Coding-Assistenten
├── README.md                  # Diese Datei
├── package.json
└── next.config.ts
```

---

## Content-Pipeline

Das zentrale Designprinzip: **Inhalte leben in Markdown, die App liest TypeScript.**

```
content/nodes/*.md
content/projects/*.md
        │
        ▼  (bei jedem npm run dev / npm run build)
scripts/compile-content.ts
        │
        ▼
src/data/seedData.ts   ← AUTO-GENERIERT (nicht committen ohne Grund)
        │
        ▼
React-Komponenten lesen Daten über src/lib/dataClient.ts
```

**Workflow für Inhaltspflege:**
1. Markdown-Datei in `content/nodes/` bearbeiten oder erstellen
2. `npm run dev` neu starten (oder läuft bereits: der Kompiler läuft beim Start)
3. App im Browser prüfen

> **Achtung:** `src/data/seedData.ts` wird bei jedem Build überschrieben. Niemals dort direkt editieren.

---

## Lokale Entwicklung

### Voraussetzungen

- Node.js ≥ 18
- npm ≥ 9

### Setup

```bash
# 1. Repository klonen
git clone <repo-url>
cd VisibleVibeApp

# 2. Abhängigkeiten installieren
npm install

# 3. Entwicklungsserver starten (kompiliert Content und startet Next.js)
npm run dev
```

App öffnet unter [http://localhost:3000](http://localhost:3000).

Der `npm run dev`-Befehl führt zuerst `scripts/compile-content.ts` aus (konvertiert alle Markdown-Dateien zu `seedData.ts`) und startet dann den Next.js Dev-Server.

---

## Inhalte bearbeiten

Alle Lerninhalte werden in `content/nodes/` als Markdown-Dateien mit YAML-Frontmatter gepflegt.

### Frontmatter-Felder (alle Nodes)

```yaml
---
id: "eindeutige-id"            # Kebab-case, einmalig im System
slug: "url-slug"               # Identisch mit id (für Routing)
title: "Anzeigename"           # Wird im Skilltree und Sidebar angezeigt
summary: "Kurzbeschreibung"    # Max. 120 Zeichen, erscheint auf der Node-Kachel
category: "Learning Design"    # Einer von: Learning Design | UX Design | AI Design
                               #            Data Design | Product Design
level: 3                       # 1–10, bestimmt Reihenfolge im Compilat
status: "stable"               # draft | reviewed | stable | archived
video_url: ""                  # Optional: YouTube-Embed-URL
practice_task: |               # Praxisaufgabe (Multiline YAML)
  Beschreibung...
quality_criteria: |            # Messbare Abnahmekriterien (Multiline YAML)
  - Kriterium 1
  - Kriterium 2
resources_markdown: |          # Weiterführende Links (Multiline YAML)
  - [Titel](URL) - Beschreibung
position_x: 480                # X-Position im Skilltree-Canvas (Pixel)
position_y: 450                # Y-Position im Skilltree-Canvas (Pixel)
connections:                   # Kanten zu anderen Nodes
  - target: "ziel-node-id"
    type: "leads_to"           # leads_to | required_for_project
---
```

### Zusätzliche Frontmatter-Felder für Projektmeilensteine (Typ P)

```yaml
is_milestone: true
artifact_description: "Beschreibung des Endprodukts"
learning_strategy: "Didaktische Methode"
technology_principle: "Technologischer Fokus"
ux_principle: "UX-Designprinzip"
definition_of_done: |
  - Kriterium 1
  - Kriterium 2
required_node_ids:
  - "voraussetzung-1"
  - "voraussetzung-2"
```

### Markdown-Body (nach dem `---`)

Der Body folgt direkt nach dem Frontmatter und wird als `content_markdown` gespeichert. Er wird in der Sidebar via `react-markdown` gerendert. Volle Markdown-Syntax ist unterstützt.

**Struktur nach Knotentyp:**

**Typ A (Orientierungsknoten):**
```markdown
## Der Impuls (Relevanz & Dilemma)
## Erarbeitung mit der KI (Exploration)
## Transfer
## Retrieval-Quiz
```

**Typ B (Implementierungsknoten):**
```markdown
## Der Vibe (Kurzbeschreibung & Relevanz)
## Didaktisches Szenario & Exploration mit KI
## Geführtes Beispiel (Worked Example)
## Häufige Stolpersteine (Gotchas & Re-Prompting)
## Retrieval-Quiz
```

**Typ P (Projektmeilenstein):**
```markdown
### Projektbeschreibung
### Verknüpfte Kompetenzen
### Empfohlener Arbeitsablauf
### Reflexionsfragen nach Abschluss
```

---

## Neuen Node erstellen

1. Neue Datei in `content/nodes/` erstellen: `mein-thema.md`
2. Vollständiges Frontmatter ausfüllen (alle Pflichtfelder — siehe oben)
3. Markdown-Body nach dem Knotentyp strukturieren
4. `position_x` und `position_y` wählen (prüfe im laufenden Skilltree, wo Platz ist)
5. Verbindungen zu anderen Nodes über `connections` definieren
6. Dev-Server neu starten, Node erscheint im Skilltree

**Wichtig bei Verbindungen:** Die `target`-ID in `connections` muss der `id` eines existierenden Nodes entsprechen. Fehlerhafte IDs werden beim Kompilieren still ignoriert (keine Kante wird erzeugt).

---

## Pädagogisches Konzept

Das vollständige pädagogische Rahmenkonzept ist unter [`content/paedagogisches-konzept.md`](content/paedagogisches-konzept.md) dokumentiert.

Kernprinzipien:
- **Produktive Eigenleistung:** Keine kopierbaren Prompt-Vorlagen. Die Lehrpersonen formulieren selbst.
- **Didaktische Fundierung:** Jeder Implementierungsknoten ist an ein lernwissenschaftliches Prinzip gebunden.
- **Retrieval statt Reflexion:** Knoten schliessen mit anspruchsvollen Abruffragen, nicht mit offenen Reflexionsfragen.

Sprachregeln für Content-Autoren:
- Direktes „Du", professioneller Ton, auf Augenhöhe
- **Keine Gedankenstriche** (—) als Stilmittel (wirkt wie KI-Sprache)
- Kein normatives Framing der KI-Nutzung
- Forschungsreferenzen willkommen im Impuls, Substanz als Qualitätsmerkmal

---

## Tech Stack

| Bereich | Technologie |
|---------|------------|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + TailwindCSS 4 |
| Skilltree-Visualisierung | @xyflow/react (React Flow) |
| Markdown-Parsing | gray-matter (Frontmatter), react-markdown (Rendering) |
| Icons | lucide-react |
| Content-Pipeline | Custom Build-Script (`scripts/compile-content.ts`) |
| User-Fortschritt | LocalStorage (kein Backend aktuell) |
| Deployment | Vercel (empfohlen) |

### Geplante Erweiterungen (noch nicht implementiert)

- Supabase-Integration für persistente Nutzerprofile und Lernfortschritt
- Authentifizierung (Lernende / Lehrpersonen)
- Learning Analytics Dashboard
- Adaptive Aufgabenauswahl auf Basis der Fehlerhistorie

Diese Erweiterungen sind im Skilltree selbst als Lernknoten dokumentiert (`datenbanken`, `user-management`, `data-analytics`, `dashboard`, `adaptive-lernumgebung`) — der Kurs beschreibt damit seinen eigenen nächsten Entwicklungsschritt.

---

*Für Fragen zum pädagogischen Konzept: [paedagogisches-konzept.md](content/paedagogisches-konzept.md)*  
*Für KI-Coding-Assistenten: [AGENTS.md](AGENTS.md)*
