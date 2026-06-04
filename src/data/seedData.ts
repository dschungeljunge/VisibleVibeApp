export interface SkillNode {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: 'Learning Design' | 'UX Design' | 'AI Design' | 'Data Design' | 'Product Design';
  level: number;
  status: 'draft' | 'reviewed' | 'stable' | 'archived';
  content_markdown: string;
  practice_task: string;
  quality_criteria: string;
  resources_markdown: string;
  position_x: number;
  position_y: number;
  is_milestone?: boolean;
}

export interface SkillEdge {
  id: string;
  source_node_id: string;
  target_node_id: string;
  relation_type: 'prerequisite' | 'leads_to' | 'related' | 'required_for_project' | 'optional_extension';
  label?: string;
}

export interface ProjectPath {
  id: string;
  slug: string;
  title: string;
  summary: string;
  artifact_description: string;
  learning_strategy: string;
  technology_principle: string;
  ux_principle: string;
  definition_of_done: string;
  content_markdown: string;
  status: 'draft' | 'reviewed' | 'stable' | 'archived';
  required_node_ids: string[];
}

export const seedNodes: SkillNode[] = [
  // COLUMN 1
  {
    id: 'kickoff',
    slug: 'kickoff',
    title: 'KickOff',
    summary: 'Der Startpunkt deiner Lernreise im CAS/SAS Learning App Design.',
    category: 'Product Design',
    level: 1,
    status: 'stable',
    content_markdown: `## Kurzbeschreibung
Der KickOff markiert den offiziellen Startpunkt. Hier klären wir die Rahmenbedingungen, lernen die Struktur des Kurses kennen und verschaffen uns einen Überblick über die kommenden Themen und Projekte.

## Warum ist das für Learning Apps relevant?
Ohne ein klares gemeinsames Verständnis der Ziele und Abläufe verliert man sich schnell in der Komplexität aus Technik, Didaktik und Design. Der KickOff kalibriert unsere Erwartungen.

## Voraussetzungen
Keine. Das ist der Startpunkt für alle!`,
    practice_task: 'Verschaffe dir einen Überblick über den Skilltree und erstelle ein erstes Konzeptdokument für dein eigenes App-Vorhaben.',
    quality_criteria: '- Teilnahme am KickOff-Event\n- Erstes ausgefülltes Konzept-Canvas',
    resources_markdown: '- [Kurs-Syllabus (Link)](#)\n- [Miro-Board des Kickoffs](#)',
    position_x: 80,
    position_y: 400
  },

  // COLUMN 2
  {
    id: 'technik',
    slug: 'technik',
    title: 'Technik',
    summary: 'Grundlagen der Software-Entwicklung, Web-Technologien und Coding-Tools.',
    category: 'Product Design',
    level: 2,
    status: 'stable',
    content_markdown: `## Kurzbeschreibung
Die Technik-Spur gibt dir das Rüstzeug, um Webapplikationen zu planen, zu strukturieren und selbst Code zu schreiben. Hier geht es um das Verstehen von Client-Server-Architekturen, APIs und Code-Editoren.

## Warum ist das für Learning Apps relevant?
Wer die technischen Möglichkeiten und Grenzen versteht, kann bessere didaktische Konzepte entwerfen. Du musst kein Programmierprofi werden, aber die Sprache der Entwickler:innen sprechen können.`,
    practice_task: 'Richte deinen lokalen Code-Editor (z.B. VS Code) ein und starte einen lokalen Webserver.',
    quality_criteria: '- Lokale Entwicklungsumgebung läuft\n- Grundverständnis von HTML/JS vorhanden',
    resources_markdown: '- [VS Code Setup Guide](#)\n- [MDN Web Docs: Web-Grundlagen](#)',
    position_x: 280,
    position_y: 250
  },
  {
    id: 'paedagogik',
    slug: 'paedagogik',
    title: 'Pädagogik',
    summary: 'Instruktionsdesign, Lerntheorien und didaktische Leitlinien für digitales Lernen.',
    category: 'Learning Design',
    level: 2,
    status: 'stable',
    content_markdown: `## Kurzbeschreibung
Didaktik und Pädagogik bilden das Fundament jeder erfolgreichen Lernapp. Hier lernst du, wie Menschen lernen und wie du Lernangebote so strukturierst, dass sie lernwirksam und motivierend sind.

## Warum ist das für Learning Apps relevant?
Eine technisch perfekte App nützt nichts, wenn sie didaktisch schlecht konzipiert ist. Die didaktischen Entscheidungen bestimmen das Design und die Interaktionsmuster der App.`,
    practice_task: 'Formuliere für ein konkretes Lernapp-Projekt drei präzise, handlungsorientierte Lernziele.',
    quality_criteria: '- Lernziele sind messbar und handlungsorientiert\n- Zielgruppe ist klar definiert',
    resources_markdown: '- [Bloom\'sche Taxonomie im Digitalen](#)\n- [Kerres: Didaktisches Design](#)',
    position_x: 280,
    position_y: 550
  },

  // COLUMN 3
  {
    id: 'vibecoding',
    slug: 'vibecoding',
    title: 'VibeCoding',
    summary: 'Agiles Coden mit KI-Assistenten wie ChatGPT, Claude und Cursor.',
    category: 'Product Design',
    level: 3,
    status: 'stable',
    content_markdown: `## Kurzbeschreibung
VibeCoding beschreibt das Programmieren auf einer höheren Abstraktionsebene mithilfe von KI-Generatoren. Du beschreibst das Verhalten und den Stil, die KI schreibt den Code.

## Warum ist das für Learning Apps relevant?
Es ermöglicht Nicht-Programmierer:innen, in kürzester Zeit funktionierende MVPs und interaktive Prototypen zu bauen und didaktische Ideen sofort auszuprobieren.`,
    practice_task: 'Erstelle eine einfache interaktive HTML-Seite ausschließlich durch Prompts mit Claude oder ChatGPT.',
    quality_criteria: '- Der Prompt-Verlauf ist dokumentiert\n- Code läuft ohne Syntaxfehler\n- Anpassungen wurden iterativ durchgeführt',
    resources_markdown: '- [VibeCoding Guide 2026](#)\n- [Cursor Editor Tutorial](#)',
    position_x: 480,
    position_y: 250
  },
  {
    id: 'usability-design',
    slug: 'usability-design',
    title: 'Usability Design',
    summary: 'Grundregeln des Interface-Designs, Barrierefreiheit und intuitive Nutzerführung.',
    category: 'UX Design',
    level: 3,
    status: 'stable',
    content_markdown: `## Kurzbeschreibung
Usability Design sorgt dafür, dass sich Lernende in der App zurechtfinden, ohne durch die Bedienung abgelenkt zu werden. Der Fokus liegt auf Einfachheit, Konsistenz und Feedback.

## Warum ist das für Learning Apps relevant?
Schlechte Usability erzeugt unnötige kognitive Belastung (extraneous cognitive load), die die eigentliche Lernleistung schmälert. Gute Usability ist barrierefrei.`,
    practice_task: 'Führe einen Paper-Prototyping-Test mit 2 Personen durch, um das Navigationskonzept deiner App zu validieren.',
    quality_criteria: '- Navigationsstruktur hat flache Hierarchien\n- Usability-Test Protokoll liegt vor',
    resources_markdown: '- [Don Norman: The Design of Everyday Things](#)\n- [Nielsen Norman Group Usability Heuristics](#)',
    position_x: 480,
    position_y: 450
  },

  // COLUMN 4
  {
    id: 'software-projektmanagement',
    slug: 'software-projektmanagement',
    title: 'Software Projektmanagement',
    summary: 'Agile Methoden, MVP-Definition und Release-Planung für Bildungssoftware.',
    category: 'Product Design',
    level: 4,
    status: 'stable',
    content_markdown: `## Kurzbeschreibung
Professionelles Strukturieren von Softwareprojekten mit Git, Feature-Boards und klaren Etappenzielen. Fokus auf das "Minimum Viable Product" (MVP).

## Warum ist das für Learning Apps relevant?
Lernsoftware-Projekte neigen zum "Feature Creep" (zu viele Funktionen). Agile Methoden helfen, sich auf den didaktischen Kern zu konzentrieren und schnell zu releasen.`,
    practice_task: 'Erstelle ein Kanban-Board (z.B. in GitHub oder Trello) und definiere das MVP deiner App in 5 Kernfeatures.',
    quality_criteria: '- MVP ist scharf abgegrenzt (Scope-Definition)\n- Erste 3 Tickets sind detailliert beschrieben',
    resources_markdown: '- [Agiles Projektmanagement in der Schule](#)\n- [GitHub Projects Guide](#)',
    position_x: 680,
    position_y: 100
  },
  {
    id: 'ki-llms',
    slug: 'ki-llms',
    title: 'künstliche Intelligenz LLMs',
    summary: 'Grundwissen über Sprachmodelle, neuronale Netze und generative KI.',
    category: 'AI Design',
    level: 4,
    status: 'stable',
    content_markdown: `## Kurzbeschreibung
Einführung in die Funktionsweise großer Sprachmodelle (LLMs) wie GPT-4 und Claude 3. Verständnis von Tokens, Temperatur und Kontextfenstern.

## Warum ist das für Learning Apps relevant?
LLMs sind der Motor für personalisiertes Feedback, adaptive Tutoren und dynamische Generierung von Lernaufgaben. Man muss verstehen, wie sie "denken".`,
    practice_task: 'Experimentiere in der OpenAI- oder Anthropic-Console mit Temperatur- und Top-P-Einstellungen und dokumentiere die Unterschiede.',
    quality_criteria: '- Grundbegriffe (Token, Halluzination, Kontext) können erklärt werden\n- Systematische Testreihe dokumentiert',
    resources_markdown: '- [Introduction to LLMs (Andrej Karpathy)](#)\n- [Prompt Engineering Guide: LLM Basics](#)',
    position_x: 680,
    position_y: 200
  },
  {
    id: 'webapp-basics',
    slug: 'webapp-basics',
    title: 'Webapp Basics',
    summary: 'Komponentenbasierte Webentwicklung, Client-Rendering und State-Management.',
    category: 'Product Design',
    level: 4,
    status: 'stable',
    content_markdown: `## Kurzbeschreibung
Verständnis von modernen Single-Page-Applications (SPA) auf Basis von React/Next.js. Komponenten, Props, State und Event-Handling.

## Warum ist das für Learning Apps relevant?
Moderne interaktive Lernapps benötigen einen dynamischen State (z.B. Antworten der User speichern, Ansichten wechseln, Timer steuern) ohne Seiten-Reloads.`,
    practice_task: 'Baue ein einfaches React-Formular, das Usereingaben verarbeitet und direkt auf dem Bildschirm validiert darstellt.',
    quality_criteria: '- Komponentenhierarchie ist sauber getrennt\n- State wird lokal gehalten und korrekt aktualisiert',
    resources_markdown: '- [React Dokumentation: Quick Start](#)\n- [Next.js App Router Dokumentation](#)',
    position_x: 680,
    position_y: 350
  },
  {
    id: 'interaktive-elemente',
    slug: 'interaktive-elemente',
    title: 'Interaktive Elemente',
    summary: 'Drag & Drop, Slider, Inputs und Animationen für aktive Beteiligung.',
    category: 'UX Design',
    level: 4,
    status: 'stable',
    content_markdown: `## Kurzbeschreibung
Design und Implementierung von aktiven Interaktionsmustern. Knöpfe, Drag-and-Drop, Schieberegler und unmittelbares Feedback im Interface.

## Warum ist das für Learning Apps relevant?
Lernen geschieht durch Aktivität. Interaktive Elemente fordern Lernende heraus und verwandeln passiven Konsum in aktives Ausprobieren und Reflektieren.`,
    practice_task: 'Gestalte ein interaktives Zuordnungs-Spiel (Match-Task) auf Papier oder digital und teste den Interaktionsfluss.',
    quality_criteria: '- Sofortiges visuelles Feedback bei Interaktion\n- Klare Affordances (Klickbarkeit erkennbar)',
    resources_markdown: '- [Interaction Design Foundation: Gestalt Principles](#)\n- [Framer Motion Animation Guide](#)',
    position_x: 680,
    position_y: 480
  },
  {
    id: 'coaching-tutoring',
    slug: 'coaching-tutoring',
    title: 'Coaching Tutoring',
    summary: 'Methoden zur pädagogischen Begleitung, Fragetechniken und Tutor-Rollen.',
    category: 'Learning Design',
    level: 4,
    status: 'stable',
    content_markdown: `## Kurzbeschreibung
Begleitung von Lernenden durch gezielte Impulse, Sokratische Gesprächsführung und scaffolding-basierte Hilfestellungen statt direkter Instruktion.

## Warum ist das für Learning Apps relevant?
Eine App, die sofort die Lösung anzeigt, verhindert das Lernen. Ein digitaler Tutor muss lernen, wie er Fragen stellt, die zum Nachdenken anregen.`,
    practice_task: 'Schreibe einen Dialogbaum für einen virtuellen Coach, der eine Person beim Schreiben eines Textes anleitet.',
    quality_criteria: '- Der Coach gibt keine direkten Lösungen vor\n- Coach stellt offene, reflektierende Fragen',
    resources_markdown: '- [Sokratische Methode im E-Learning](#)\n- [Hattie: Visible Learning - Tutor Feedback](#)',
    position_x: 680,
    position_y: 600
  },
  {
    id: 'feedback',
    slug: 'feedback',
    title: 'Feedback',
    summary: 'Feedback-Schleifen, Fehlerdidaktik und lernförderliche Rückmeldungen.',
    category: 'Learning Design',
    level: 4,
    status: 'stable',
    content_markdown: `## Kurzbeschreibung
Gestaltung von automatisiertem, formativem Feedback. Fehler werden nicht als Scheitern, sondern als Lernchance begriffen.

## Warum ist das für Learning Apps relevant?
Sofortiges, qualitativ hochwertiges Feedback ist einer der stärksten Faktoren für Lernerfolg. Es muss aufklären (warum falsch?) und anleiten (wie weiter?).`,
    practice_task: 'Entwerfe ein Feedback-System für 3 typische Fehler in einer Matheaufgabe, das auf die Fehlvorstellungen eingeht.',
    quality_criteria: '- Feedback ist konstruktiv und handlungsleitend\n- Geht über "richtig/falsch" hinaus',
    resources_markdown: '- [John Hattie & Helen Timperley: The Power of Feedback](#)\n- [Formatives Feedback digital gestalten](#)',
    position_x: 680,
    position_y: 750
  },

  // COLUMN 5
  {
    id: 'kontext-engineering',
    slug: 'kontext-engineering',
    title: 'Kontext Engineering',
    summary: 'Dynamic Context Construction, Retrieval Augmented Generation (RAG) und Vektordatenbanken.',
    category: 'AI Design',
    level: 5,
    status: 'stable',
    content_markdown: `## Kurzbeschreibung
Dem Sprachmodell gezielt Kontextinformationen (z.B. Unterrichtsmaterialien, Lehrpläne oder Schülerprofile) zur Verfügung stellen, um präzise Antworten zu sichern.

## Warum ist das für Learning Apps relevant?
LLMs halluzinieren ohne Kontext. Durch Context Engineering verankerst du die KI im konkreten Lernstoff und dem Lehrplan.`,
    practice_task: 'Baue einen Prompt, der ein PDF-Dokument als Wissensdatenbank nutzt und Fragen ausschließlich auf Basis dieses Dokuments beantwortet.',
    quality_criteria: '- KI weigert sich, Fragen außerhalb des Dokuments zu beantworten\n- Quellenangaben werden mitgeliefert',
    resources_markdown: '- [Pinecone Guide to RAG](#)\n- [LangChain JS Overview](#)',
    position_x: 880,
    position_y: 100
  },
  {
    id: 'api-keys',
    slug: 'api-keys',
    title: 'API-Keys',
    summary: 'Sichere Verwaltung von API-Schlüsseln, Umgebungsvariablen und Backend-Proxies.',
    category: 'Product Design',
    level: 5,
    status: 'stable',
    content_markdown: `## Kurzbeschreibung
Einbindung von externen KI-Schnittstellen (OpenAI, Anthropic) in eigene Webapps. Schutz von Keys vor Missbrauch im Frontend (Server-Side-Route Handler).

## Warum ist das für Learning Apps relevant?
Wenn du API-Keys direkt im Client (Browser) hinterlegst, können Nutzer sie stehlen und auf deine Kosten Anfragen senden. Sicherheit ist Pflicht.`,
    practice_task: 'Erstelle eine Next.js Route (`/api/chat`), die eine Anfrage an OpenAI weiterleitet, ohne dass der Key im Frontend sichtbar ist.',
    quality_criteria: '- API Key ist ausschließlich in der `.env` Datei hinterlegt\n- Frontend ruft nur die eigene API-Route auf',
    resources_markdown: '- [Next.js API Routes / Route Handlers](#)\n- [OWASP API Security Top 10](#)',
    position_x: 880,
    position_y: 200
  },
  {
    id: 'prompting',
    slug: 'prompting',
    title: 'Prompting',
    summary: 'System Prompts, Few-Shot Prompting, Chain of Thought und strukturierte KI-Ausgaben (JSON).',
    category: 'AI Design',
    level: 5,
    status: 'stable',
    content_markdown: `## Kurzbeschreibung
Systematisches Formulieren von Instruktionen für Sprachmodelle. Nutzung von Techniken wie Role-Prompting, Few-Shot-Beispielen und erzwungenen JSON-Ausgaben.

## Warum ist das für Learning Apps relevant?
Ein guter Prompt macht den Unterschied zwischen einem unberechenbaren Chatbot und einem präzisen, didaktisch geschulten Lernbegleiter.`,
    practice_task: 'Schreibe einen System Prompt für eine KI, die Schüleraufsätze bewertet und das Feedback strukturiert als JSON ausgibt.',
    quality_criteria: '- Ausgabe erfolgt zuverlässig im JSON-Format\n- Kriterienraster wird strikt eingehalten',
    resources_markdown: '- [Anthropic Prompt Library](#)\n- [LearnPrompting.org](#)',
    position_x: 880,
    position_y: 300
  },
  {
    id: 'quiz-webapp',
    slug: 'quiz-webapp',
    title: 'interaktive Quizz Webapp',
    summary: 'Ein interaktives Tool zum Üben und Abrufen von gelerntem Wissen mit direktem Feedback.',
    category: 'Product Design',
    level: 5,
    status: 'reviewed',
    is_milestone: true,
    content_markdown: `## Kurzbeschreibung
Die interaktive Quiz-Webapp ist dein erstes grosses Meilenstein-Projekt. Sie kombiniert HTML/React-Grundlagen mit didaktischen Abruffragen und Usability-Prinzipien.

## Warum ist das für Learning Apps relevant?
Hier wendest du an, wie man Benutzeroberflächen aufbaut, die aktives Abrufen (Retrieval Practice) erzwingen und direktes, korrigierendes Feedback liefern.

## Voraussetzungen
- Technik, Pädagogik
- VibeCoding, Usability Design
- Webapp Basics, Interaktive Elemente, Coaching Tutoring`,
    practice_task: 'Implementiere eine funktionsfähige Quiz-App mit 5 Fragen, Fortschrittsanzeige und formativen Rückmeldungen bei Fehlern.',
    quality_criteria: '- App läuft fehlerfrei im Browser\n- Formatives Feedback klärt Fehlvorstellungen auf\n- Responsive Design für Mobile und Desktop',
    resources_markdown: '- [Quiz-App Boilerplate React](#)\n- [Retrieval Practice in Classroom Apps](#)',
    position_x: 880,
    position_y: 450
  },
  {
    id: 'daten-darstellen',
    slug: 'daten-darstellen',
    title: 'Daten darstellen',
    summary: 'Visualisierung von Daten, Diagramme, Tabellen und interaktive Graphen.',
    category: 'UX Design',
    level: 5,
    status: 'stable',
    content_markdown: `## Kurzbeschreibung
Verständliche Aufbereitung von Zahlen und komplexen Werten für Lernende und Lehrende. Einsatz von SVG-Grafiken, Diagramm-Bibliotheken und Dashboards.

## Warum ist das für Learning Apps relevant?
Lernende müssen ihren Fortschritt auf einen Blick sehen. Komplexe Lerndaten (z.B. Fehlerverteilung) müssen grafisch so aufbereitet sein, dass sie motivieren und nicht frustrieren.`,
    practice_task: 'Erstelle eine SVG-basierte Fortschritts-Visualisierung (z.B. eine Donut-Chart), die den Lernfortschritt dynamisch anzeigt.',
    quality_criteria: '- Diagramm ist barrierefrei (Farbkontraste)\n- Datenpunkte reagieren auf dynamische Änderungen',
    resources_markdown: '- [Tailwind Charts / SVG Guide](#)\n- [Edward Tufte: Visual Display of Quantitative Information](#)',
    position_x: 880,
    position_y: 600
  },
  {
    id: 'scaffolding',
    slug: 'scaffolding',
    title: 'Scaffolding',
    summary: 'Temporäre Hilfestellungen, gestufte Lernhilfen und Hilfebuttons.',
    category: 'Learning Design',
    level: 5,
    status: 'stable',
    content_markdown: `## Kurzbeschreibung
Unterstützungsstrukturen, die es Lernenden ermöglichen, Aufgaben zu lösen, die sie alleine noch nicht bewältigen könnten. Die Hilfen werden sukzessive abgebaut.

## Warum ist das für Learning Apps relevant?
Gutes Scaffolding verhindert Frustration. Statt die Lösung zu verraten, bietet die App gestufte Tipps an (z.B. Tipp 1: Hinweis auf Regel; Tipp 2: Teillösung; Tipp 3: Ausrechnen).`,
    practice_task: 'Entwerfe ein dreistufiges Hilfesystem (Scaffolding) für eine komplexe Textaufgabe in deiner App.',
    quality_criteria: '- Tipps werden erst auf Nachfrage sichtbar\n- Tipps werden von Stufe zu Stufe konkreter',
    resources_markdown: '- [Vygotsky: Zone of Proximal Development](#)\n- [Scaffolding im Fachunterricht](#)',
    position_x: 880,
    position_y: 700
  },

  // COLUMN 6
  {
    id: 'tutor-app',
    slug: 'tutor-app',
    title: 'Tutor App',
    summary: 'Eine KI-gestützte App, die Lernbegleitung anbietet und offene Fragen didaktisch klug beantwortet.',
    category: 'Product Design',
    level: 6,
    status: 'reviewed',
    is_milestone: true,
    content_markdown: `## Kurzbeschreibung
Die Tutor App ist das zweite grosse Meilenstein-Projekt. Sie nutzt generative KI (LLMs), Prompting und API-Integration, um eine Sokratische Lernbegleitung zu simulieren.

## Warum ist das für Learning Apps relevant?
Hier lernst du, wie du KI als personalisierten Coach einsetzt, der nicht einfach Antworten diktiert, sondern Lernende anleitet, Probleme selbst zu lösen.

## Voraussetzungen
- künstliche Intelligenz LLMs, Webapp Basics, Coaching Tutoring
- API-Keys, Prompting`,
    practice_task: 'Entwickle eine Tutor-App mit Chat-Interface. Der System-Prompt muss die Sokratische Gesprächsführung erzwingen.',
    quality_criteria: '- KI gibt die Lösung nie direkt aus\n- KI prüft das Vorwissen der User\n- Verbindung zum LLM läuft sicher über das Backend',
    resources_markdown: '- [Sokratischer Tutor: Prompt-Template](#)\n- [Next.js AI SDK Quickstart](#)',
    position_x: 1080,
    position_y: 250
  },
  {
    id: 'datenbanken',
    slug: 'datenbanken',
    title: 'Datenbanken',
    summary: 'Relationale Datenbanken, Tabellendesign, SQL und Supabase-Integration.',
    category: 'Data Design',
    level: 6,
    status: 'stable',
    content_markdown: `## Kurzbeschreibung
Dauerhaftes Speichern von Anwendungsdaten. Tabellenstrukturen, Primär- und Fremdschlüssel, Abfragen und Integration von Cloud-Datenbanken (Supabase).

## Warum ist das für Learning Apps relevant?
Wenn Lernende ihre App schließen, darf ihr Lernstand nicht verloren gehen. Datenbanken ermöglichen personalisierte Lernsitzungen über mehrere Tage.`,
    practice_task: 'Entwerfe ein ER-Diagramm für eine App, die Benutzer, Lektionen und Testergebnisse speichert.',
    quality_criteria: '- Relationen (1:n, m:n) sind korrekt abgebildet\n- Tabellenschema ist normalisiert',
    resources_markdown: '- [Supabase Database Tutorial](#)\n- [SQL Grundlagen für Einsteiger](#)',
    position_x: 1080,
    position_y: 380
  },
  {
    id: 'cognitive-load-management',
    slug: 'cognitive-load-management',
    title: 'Cognitive Load Management',
    summary: 'Reduzierung von extraneous load, Strukturierung komplexer Inhalte.',
    category: 'UX Design',
    level: 6,
    status: 'stable',
    content_markdown: `## Kurzbeschreibung
Didaktische Reduktion und visuelle Strukturierung zur Entlastung des Arbeitsgedächtnisses. Steuerung der Intrinsischen, Extrinsischen und Germenen Belastung.

## Warum ist das für Learning Apps relevant?
Lernapps überfordern oft mit bunten Animationen und Soundeffekten. Gutes Design minimiert diese Ablenkung (extraneous load) und fokussiert auf den Lernstoff.`,
    practice_task: 'Analysiere eine bestehende Lernapp und identifiziere 3 UI-Elemente, die die kognitive Belastung unnötig erhöhen.',
    quality_criteria: '- Klare Trennung von Lerninhalt und Navigation\n- Keine unnötigen Audio/Video-Ablenkungen',
    resources_markdown: '- [Sweller: Cognitive Load Theory](#)\n- [Mayer: Principles of Multimedia Learning](#)',
    position_x: 1080,
    position_y: 600
  },

  // COLUMN 7
  {
    id: 'user-management',
    slug: 'user-management',
    title: 'User Management',
    summary: 'Registrierung, Login, Rollenverteilung und Datenschutzkonformes Tracking.',
    category: 'Data Design',
    level: 7,
    status: 'stable',
    content_markdown: `## Kurzbeschreibung
Authentifizierung und Autorisierung von Nutzer:innen. Trennung zwischen Schüler- und Lehrer-Accounts, sicheres Passwortmanagement und DSGVO-Konformität.

## Warum ist das für Learning Apps relevant?
Schulkontexte haben extrem hohe Datenschutzanforderungen. User Management muss sicher, datensparsam und idealerweise pseudonymisiert möglich sein.`,
    practice_task: 'Richte Supabase Auth in deiner App ein und erstelle eine geschützte Route, die nur für eingeloggte User erreichbar ist.',
    quality_criteria: '- Login und Registrierung funktionieren\n- Benutzerdaten werden verschlüsselt gespeichert',
    resources_markdown: '- [Supabase Auth in Next.js Quickstart](#)\n- [Datenschutz an Schulen (Leitfaden)](#)',
    position_x: 1280,
    position_y: 350
  },
  {
    id: 'data-analytics',
    slug: 'data-analytics',
    title: 'Data Analytics',
    summary: 'Erfassung und Analyse von Lernaktivitäten (Learning Analytics) zur Lernprozessdiagnose.',
    category: 'Data Design',
    level: 7,
    status: 'stable',
    content_markdown: `## Kurzbeschreibung
Erfassen von Lernwegen, Antwortzeiten und Fehlermustern, um Lehrenden und Lernenden Einblicke in den Lernprozess zu geben (Learning Analytics).

## Warum ist das für Learning Apps relevant?
Es ermöglicht datengestützte Feedback-Schleifen. Ein Lehrer sieht sofort, bei welcher Aufgabe die halbe Klasse gescheitert ist, und kann reagieren.`,
    practice_task: 'Schreibe eine Abfrage, die die durchschnittliche Bearbeitungszeit und Fehlerquote pro Aufgabe berechnet und ausgibt.',
    quality_criteria: '- Lerndaten werden anonymisiert verarbeitet\n- Visualisierung hebt Ausreißer hervor',
    resources_markdown: '- [Handbook of Learning Analytics](#)\n- [xAPI Standard Overview](#)',
    position_x: 1280,
    position_y: 480
  },
  {
    id: 'progress-visualization',
    slug: 'progress-visualization',
    title: 'Progress Visualization',
    summary: 'Visualisierung des Lernfortschritts (Treemaps, Badges, Heatmaps).',
    category: 'UX Design',
    level: 7,
    status: 'stable',
    content_markdown: `## Kurzbeschreibung
Fortgeschrittene visuelle Rückmeldung über den Lernstand. Entwicklung von Heatmaps (wie bei GitHub), Spinnennetz-Diagrammen oder Kompetenzrastern.

## Warum ist das für Learning Apps relevant?
Lernende wollen Fortschritt spüren. Eine ansprechende Visualisierung macht den Zuwachs an Kompetenz sichtbar und motiviert zum Dranbleiben.`,
    practice_task: 'Konzipiere eine GitHub-ähnliche Heatmap-Komponente, die tägliche Lernaktivitäten darstellt.',
    quality_criteria: '- Farben signalisieren Aktivitätsintensität\n- Tooltip zeigt Details pro Tag',
    resources_markdown: '- [D3.js Visualization Library](#)\n- [Visualizing Student Progress Best Practices](#)',
    position_x: 1280,
    position_y: 630
  },
  {
    id: 'retrieval-practice',
    slug: 'retrieval-practice',
    title: 'Retrieval Practice',
    summary: 'Didaktische Methoden zur aktiven Wissensrekonstruktion.',
    category: 'Learning Design',
    level: 7,
    status: 'stable',
    content_markdown: `## Kurzbeschreibung
Lernaktivitäten, die das Abrufen von Informationen aus dem Langzeitgedächtnis erzwingen (z.B. Flashcards, Freitextfragen, Lückentexte).

## Warum ist das für Learning Apps relevant?
Aktives Abrufen festigt neuronale Pfade wesentlich besser als passives Durchlesen. Die App muss Gelegenheiten für dieses "schwere" Lernen schaffen.`,
    practice_task: 'Erstelle eine Liste von 5 Lernszenarien, die das Prinzip des aktiven Abrufs digital unterstützen.',
    quality_criteria: '- Fokus liegt auf der Abrufhandlung (nicht Wiederholung)\n- Unmittelbare Selbstkontrolle integriert',
    resources_markdown: '- [Make It Stick (Brown, Roediger, McDaniel)](#)\n- [RetrievalPractice.org](#)',
    position_x: 1280,
    position_y: 750
  },

  // COLUMN 8
  {
    id: 'dashboard',
    slug: 'dashboard',
    title: 'Dashboard',
    summary: 'Cockpit für Lehrende und Lernende zur Steuerung des Lernprozesses.',
    category: 'Product Design',
    level: 8,
    status: 'reviewed',
    is_milestone: true,
    content_markdown: `## Kurzbeschreibung
Das Dashboard ist das dritte grosse Meilenstein-Projekt. Es fasst Datenbanken, Analytics und Progress Visualization in einer Steuerungszentrale zusammen.

## Warum ist das für Learning Apps relevant?
Es bietet Lehrenden ein Diagnoseinstrument für die Klasse und Lernenden ein Cockpit zur selbstregulierten Steuerung ihrer nächsten Schritte.

## Voraussetzungen
- Datenbanken, Daten darstellen
- User Management, Data Analytics, Progress Visualization`,
    practice_task: 'Entwickle ein funktionsfähiges Dashboard, das simulierte oder echte Lerndaten in Echtzeit visualisiert.',
    quality_criteria: '- Übersichtliche Strukturierung (Kachel-Design)\n- Filterung nach Klassen/Modulen möglich\n- Klare didaktische Handlungsempfehlungen ableitbar',
    resources_markdown: '- [Dashboard Design Patterns](#)\n- [Chart.js Integration in React](#)',
    position_x: 1480,
    position_y: 550
  },

  // COLUMN 9
  {
    id: 'adaptive-lernumgebung',
    slug: 'adaptive-lernumgebung',
    title: 'Adaptive Lernumgebung',
    summary: 'Die Krönung: Eine Lernapp, die sich vollautomatisch an das Niveau und Tempo der Lernenden anpasst.',
    category: 'Product Design',
    level: 9,
    status: 'reviewed',
    is_milestone: true,
    content_markdown: `## Kurzbeschreibung
Die Adaptive Lernumgebung ist das finale Abschlussprojekt. Sie verknüpft alle Bereiche: Didaktik, künstliche Intelligenz, Datenbanken, Analytics und Dashboards zu einem lernwirksamen Ganzen.

## Warum ist das für Learning Apps relevant?
Sie repräsentiert die Zukunft des digitalen Lernens: Ein System, das individuell auf Stärken und Schwächen reagiert, passende Aufgaben wählt und optimal coacht.

## Voraussetzungen
- Alle vorherigen Meilensteine (Quiz-Webapp, Tutor App, Dashboard)
- Fortgeschrittene Skills (Kontext Engineering, User Management, Data Analytics, Progress Visualization)`,
    practice_task: 'Konzipiere und baue den Prototyp einer adaptiven Umgebung, die Aufgaben auf Basis der Fehlerhistorie auswählt.',
    quality_criteria: '- System reagiert dynamisch auf korrekte/falsche Eingaben\n- Schwierigkeitsgrad passt sich automatisch an (Zone der proximalen Entwicklung)\n- Transparenz für die Lernenden gewahrt (Trust Calibration)',
    resources_markdown: '- [Adaptive Learning Systems Architecture](#)\n- [Intelligent Tutoring Systems (ITS) Overview](#)',
    position_x: 1680,
    position_y: 380
  }
];

export const seedEdges: SkillEdge[] = [
  // Column 1 to Column 2
  { id: 'e-k-t', source_node_id: 'kickoff', target_node_id: 'technik', relation_type: 'leads_to' },
  { id: 'e-k-p', source_node_id: 'kickoff', target_node_id: 'paedagogik', relation_type: 'leads_to' },

  // Column 2 to Column 3/4
  { id: 'e-t-ki', source_node_id: 'technik', target_node_id: 'ki-llms', relation_type: 'leads_to' },
  { id: 'e-t-vc', source_node_id: 'technik', target_node_id: 'vibecoding', relation_type: 'leads_to' },
  { id: 'e-t-ud', source_node_id: 'technik', target_node_id: 'usability-design', relation_type: 'leads_to' },
  { id: 'e-p-ud', source_node_id: 'paedagogik', target_node_id: 'usability-design', relation_type: 'leads_to' },
  { id: 'e-p-ct', source_node_id: 'paedagogik', target_node_id: 'coaching-tutoring', relation_type: 'leads_to' },
  { id: 'e-p-sc', source_node_id: 'paedagogik', target_node_id: 'scaffolding', relation_type: 'leads_to' },
  { id: 'e-p-fb', source_node_id: 'paedagogik', target_node_id: 'feedback', relation_type: 'leads_to' },

  // Column 3 to Column 4
  { id: 'e-vc-sp', source_node_id: 'vibecoding', target_node_id: 'software-projektmanagement', relation_type: 'leads_to' },
  { id: 'e-vc-wb', source_node_id: 'vibecoding', target_node_id: 'webapp-basics', relation_type: 'leads_to' },
  { id: 'e-ud-ie', source_node_id: 'usability-design', target_node_id: 'interaktive-elemente', relation_type: 'leads_to' },
  { id: 'e-ud-dd', source_node_id: 'usability-design', target_node_id: 'daten-darstellen', relation_type: 'leads_to' },

  // Column 4 to Column 5
  { id: 'e-ki-ke', source_node_id: 'ki-llms', target_node_id: 'kontext-engineering', relation_type: 'leads_to' },
  { id: 'e-ki-ak', source_node_id: 'ki-llms', target_node_id: 'api-keys', relation_type: 'leads_to' },
  { id: 'e-ki-pr', source_node_id: 'ki-llms', target_node_id: 'prompting', relation_type: 'leads_to' },
  { id: 'e-wb-qw', source_node_id: 'webapp-basics', target_node_id: 'quiz-webapp', relation_type: 'required_for_project' },
  { id: 'e-ie-qw', source_node_id: 'interaktive-elemente', target_node_id: 'quiz-webapp', relation_type: 'required_for_project' },
  { id: 'e-ct-qw', source_node_id: 'coaching-tutoring', target_node_id: 'quiz-webapp', relation_type: 'required_for_project' },
  { id: 'e-fb-rp', source_node_id: 'feedback', target_node_id: 'retrieval-practice', relation_type: 'leads_to' },

  // Column 5 to Column 6
  { id: 'e-ak-ta', source_node_id: 'api-keys', target_node_id: 'tutor-app', relation_type: 'required_for_project' },
  { id: 'e-pr-ta', source_node_id: 'prompting', target_node_id: 'tutor-app', relation_type: 'required_for_project' },
  { id: 'e-wb-ta', source_node_id: 'webapp-basics', target_node_id: 'tutor-app', relation_type: 'required_for_project' },
  { id: 'e-wb-db', source_node_id: 'webapp-basics', target_node_id: 'datenbanken', relation_type: 'leads_to' },
  { id: 'e-dd-cl', source_node_id: 'daten-darstellen', target_node_id: 'cognitive-load-management', relation_type: 'leads_to' },
  { id: 'e-sc-cl', source_node_id: 'scaffolding', target_node_id: 'cognitive-load-management', relation_type: 'leads_to' },

  // Column 6 to Column 7
  { id: 'e-db-um', source_node_id: 'datenbanken', target_node_id: 'user-management', relation_type: 'leads_to' },
  { id: 'e-db-da', source_node_id: 'datenbanken', target_node_id: 'data-analytics', relation_type: 'leads_to' },
  { id: 'e-qw-da', source_node_id: 'quiz-webapp', target_node_id: 'data-analytics', relation_type: 'leads_to' },
  { id: 'e-dd-pv', source_node_id: 'daten-darstellen', target_node_id: 'progress-visualization', relation_type: 'leads_to' },

  // Column 7 to Column 8
  { id: 'e-da-db', source_node_id: 'data-analytics', target_node_id: 'dashboard', relation_type: 'required_for_project' },
  { id: 'e-pv-db', source_node_id: 'progress-visualization', target_node_id: 'dashboard', relation_type: 'required_for_project' },

  // Column 5/6/7/8 to Column 9
  { id: 'e-ke-al', source_node_id: 'kontext-engineering', target_node_id: 'adaptive-lernumgebung', relation_type: 'required_for_project' },
  { id: 'e-ta-al', source_node_id: 'tutor-app', target_node_id: 'adaptive-lernumgebung', relation_type: 'required_for_project' },
  { id: 'e-um-al', source_node_id: 'user-management', target_node_id: 'adaptive-lernumgebung', relation_type: 'required_for_project' },
  { id: 'e-da-al', source_node_id: 'data-analytics', target_node_id: 'adaptive-lernumgebung', relation_type: 'required_for_project' },
  { id: 'e-pv-al', source_node_id: 'progress-visualization', target_node_id: 'adaptive-lernumgebung', relation_type: 'required_for_project' },
  { id: 'e-db-al', source_node_id: 'dashboard', target_node_id: 'adaptive-lernumgebung', relation_type: 'required_for_project' }
];

export const seedProjects: ProjectPath[] = [
  {
    id: 'p-quiz',
    slug: 'quiz-webapp',
    title: 'Interaktive Quiz-Webapp',
    summary: 'Eine einfache Lernapp, die aktive Abrufhandlungen (Retrieval Practice) auslöst.',
    artifact_description: 'Eine responsive Webapplikation mit 5 didaktisch aufbereiteten Fragen, Fortschrittsanzeige, formativen Hilfestellungen und einer kurzen Reflexionsseite zur begründeten Lernwirksamkeit.',
    learning_strategy: 'Aktivierung durch abwechselnde Abruf- und Kontrollprozesse (Retrieval Practice).',
    technology_principle: 'Komponentenbasierte UI-Strukturierung (React) und lokaler State.',
    ux_principle: 'Unmittelbares, klares Feedback; Reduzierung von extraneous cognitive load.',
    definition_of_done: '- App ist online (z.B. Vercel)\n- 5 Fragen mit formativen Antwort-Feedbacks\n- Lokale Fortschrittspeicherung im Session-State\n- Getestet mit mind. 2 Testpersonen (Protokoll vorhanden)\n- Reflexion im Code-Repository dokumentiert',
    content_markdown: `### Projektbeschreibung
In diesem ersten Projekt entwickelst du das absolute Fundament digitaler Lernplattformen: Ein interaktives Quiz. Anstatt einfacher Richtig/Falsch-Rückmeldungen entwirfst du Rückmeldungen, die gezielt auf Fehlvorstellungen eingehen.

### Empfohlener Arbeitsablauf
1. **Didaktisches Design:** Definiere die Lernziele und erstelle die Fragen sowie formatives Feedback auf Papier.
2. **Technisches Gerüst:** Richte ein React-Projekt ein und erstelle die grundlegenden UI-Komponenten.
3. **Interaktive Logik:** Implementiere das Umschalten der Fragen, Speichern der Antworten und Berechnen des Scores.
4. **Feinpolitur & Testing:** Teste die App mit Kolleg:innen auf Verständlichkeit und beseitige Usability-Probleme.`,
    status: 'stable',
    required_node_ids: ['kickoff', 'technik', 'paedagogik', 'vibecoding', 'usability-design', 'webapp-basics', 'interaktive-elemente', 'coaching-tutoring', 'feedback', 'quiz-webapp']
  },
  {
    id: 'p-tutor',
    slug: 'tutor-app',
    title: 'KI-gestützte Tutor-App',
    summary: 'Eine App, die Lernenden formative, sokratische Rückmeldungen auf offene Eingaben gibt.',
    artifact_description: 'Ein webbasiertes Chat-Interface, das Eingaben an ein LLM weitergibt, dabei API-Schlüssel sicher serverseitig verbirgt und durch ausgeklügeltes Prompting didaktische Begleitung anstatt direkter Lösungen bietet.',
    learning_strategy: 'Sokratische Gesprächsführung, kognitives Scaffolding und formative Lernbegleitung.',
    technology_principle: 'Sichere API-Anbindung (Server-Side Route Handler) und strukturierte Text-Generierung.',
    ux_principle: 'Trust Calibration (Transparenz über KI-Grenzen), barrierefreies Chat-Layout.',
    definition_of_done: '- Benutzer können Freitext eingeben\n- Feedback erfolgt anhand expliziter, transparenter Kriterien\n- Prompting stellt sicher, dass Lösungen nicht direkt ausgegeben werden\n- API-Keys sind serverseitig geschützt (nicht im Frontend sichtbar)\n- Grenzen der KI werden für Benutzer klar ausgewiesen',
    content_markdown: `### Projektbeschreibung
Lernende schreiben Texte oder Lösungsansätze und eine KI analysiert diese, deckt logische Lücken auf und stellt gezielte Fragen zur Selbstkorrektur. Du programmierst einen virtuellen Coach.

### Empfohlener Arbeitsablauf
1. **Prompt Engineering:** Teste deinen System Prompt intensiv im OpenAI/Anthropic Playground, bis er zuverlässig sokratisch agiert.
2. **Backend Proxy:** Baue eine API-Route in Next.js, die Frontend-Anfragen annimmt und an das LLM weiterleitet.
3. **UI/UX Chat-Interface:** Erstelle eine flüssig wirkende Chat-Oberfläche mit Ladeindikatoren (Streaming-Effekt optional).
4. **Kalibrierung:** Teste typische Fehlingaben von Lernenden und passe den Prompt an, falls die KI aus der Rolle fällt.`,
    status: 'stable',
    required_node_ids: ['kickoff', 'technik', 'paedagogik', 'ki-llms', 'webapp-basics', 'coaching-tutoring', 'api-keys', 'prompting', 'tutor-app']
  },
  {
    id: 'p-dashboard',
    slug: 'dashboard-path',
    title: 'Lernfortschritts-Dashboard',
    summary: 'Speichert Lernstände ab und macht den Fortschritt diagnostisch auswertbar.',
    artifact_description: 'Eine datenbankgestützte Plattform mit Login-Bereich, die Lernstände persistent sichert und in interaktiven Grafiken (z.B. Dashboards) für Lernende (Reflexion) und Lehrende (Diagnose) aufbereitet.',
    learning_strategy: 'Selbstreguliertes Lernen durch kontinuierliches Monitoring des eigenen Lernstandes.',
    technology_principle: 'Datenbankmodellierung (SQL, Relationen), Cloud-Datenbank-Integration (Supabase) und Datenvisualisierung.',
    ux_principle: 'Progress Visualization, Dashboard-Kacheldesign und übersichtliche Informationshierarchie.',
    definition_of_done: '- Daten werden persistent in Supabase gespeichert\n- Unterschiedliche Sichten (Lehrperson / Schüler:in)\n- Interaktive Diagramme zur Auswertung der Fehlerquote\n- Sicheres User-Management und Login-Schutz\n- Datenschutz-Konzept (Dokumentation) liegt vor',
    content_markdown: `### Projektbeschreibung
Dieses Projekt widmet sich den Daten. Ohne persistente Speicherung und Analyse bleibt Lernen flüchtig. Du lernst, wie man Datenbanktabellen anlegt und Lerndaten so darstellt, dass man didaktische Muster erkennt.

### Empfohlener Arbeitsablauf
1. **Datenbank-Design:** Erstelle dein Tabellenschema in Supabase und richte Testdaten ein.
2. **Auth-Integration:** Implementiere Registrierung und Login.
3. **Dashboard UI:** Baue ein übersichtliches Kacheldesign für das Dashboard.
4. **Visualisierung:** Verbinde die echten Datenbankabfragen mit Diagrammen (SVG/Chart.js).`,
    status: 'stable',
    required_node_ids: ['kickoff', 'technik', 'paedagogik', 'usability-design', 'webapp-basics', 'daten-darstellen', 'datenbanken', 'user-management', 'data-analytics', 'progress-visualization', 'dashboard']
  },
  {
    id: 'p-adaptive',
    slug: 'adaptive-environment',
    title: 'Personalisierte Lernumgebung',
    summary: 'Kombiniert Lernstand, sokratische KI und Reflexion zu einer adaptiven Lernumgebung.',
    artifact_description: 'Ein vollwertiges Prototyp-Lernportal, das Schülerinnen auf Basis ihrer Eingaben und ihres Lernstands adaptive Pfade empfiehlt, Aufgaben generiert und eine Reflexionsschleife steuert.',
    learning_strategy: 'Personalisierung, adaptives Scaffolding und metakognitive Selbstregulation.',
    technology_principle: 'Fullstack Next.js/Supabase Webapp mit integriertem RAG/Vektor-Kontext.',
    ux_principle: 'User Control and Freedom, Progressive Disclosure.',
    definition_of_done: '- Schüler:innen können Lernziele eingeben\n- Aufgaben-Schwierigkeit passt sich automatisch an\n- KI lädt personalisierten Kontext und unterstützt sokratisch\n- Dashboards dokumentieren den Fortschritt\n- Abschließende Pilotierung im Klassenzimmer dokumentiert',
    content_markdown: `### Projektbeschreibung
Die Krönung deiner Entwicklungsreise. Du verknüpfst die Module Didaktik, UI-Design, API-Integration und Datenbanken zu einer adaptiven Plattform.

### Empfohlener Arbeitsablauf
1. **Architektur planen:** Zeichne den Daten- und Steuerungsfluss auf.
2. **Kombination der Komponenten:** Integriere deine bestehende Quiz-Logik, die Tutor-API und das Dashboard in ein Hauptportal.
3. **Adaptiver Algorithmus:** Schreibe die Auswertungslogik, die basierend auf dem Score die nächste Lektion wählt.
4. **Klassenzimmer-Test:** Führe einen echten Praxistest mit einer Kleingruppe durch und werte die Logfiles aus.`,
    status: 'stable',
    required_node_ids: ['kickoff', 'technik', 'paedagogik', 'vibecoding', 'usability-design', 'ki-llms', 'webapp-basics', 'coaching-tutoring', 'feedback', 'kontext-engineering', 'api-keys', 'prompting', 'quiz-webapp', 'daten-darstellen', 'scaffolding', 'tutor-app', 'datenbanken', 'cognitive-load-management', 'user-management', 'data-analytics', 'progress-visualization', 'retrieval-practice', 'dashboard', 'adaptive-lernumgebung']
  }
];
