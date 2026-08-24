# Design Guideline

## Grundsätze
- Inspiriert von Excalidraw.
- viel Weissraum
- Minimalistisch.
- Dezent Farben einsetzen (Gelb der FHNW)
- keine Verschachtelungen, keine tags

## Umsetzung (Stand Aug 2026)

### Farben (Tailwind-Tokens in `tailwind.config.ts`)
- `ink` #1e1e1e — Text und Rahmen
- `paper` #f7f7f5 — Seitenhintergrund (Boxen bleiben weiss → Tiefe)
- `fhnw` #fde70e — nur als bewusster Akzent: aktive Navigation, Projekt-Anker, primäre Buttons
- `fhnw-soft` #fff48d — Hover-Zustände (nie Vollgelb beim Hover)
- Kategorie-Marker im Skilltree: `cat-pedagogy` (Grün), `cat-technology` (Blau), `cat-usability` (Violett) — als kleiner Markerstrich, nicht als Tag

### Skizzen-Look
- Alle Boxen: `vv-box` = weisse Fläche, 2px Ink-Rahmen, versetzter Schatten (`shadow-sketch`, 3px)
- Verlinkte Boxen heben sich beim Hover an: `vv-lift` / `vv-lift-group` (Versatz + grösserer Schatten) statt Farbwechsel
- 2px-Rahmen nur für Karten/Boxen; Header und Footer haben feine Linien (`border-ink/20`)

### Typografie
- Fliesstext: Source Sans 3
- Handschrift: Excalifont (Original von Excalidraw, SIL OFL, lokal in `app/fonts/`)
  - nur für h1, Kicker und die Wortmarke im Header — Fliesstext bleibt gut lesbar
