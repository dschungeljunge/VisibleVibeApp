export type ResponsibilityRoleId =
  | "rights"
  | "school"
  | "oversight"
  | "teacher"
  | "colleagues"
  | "internal"
  | "provider"
  | "visiblevibe"
  | "developer"
  | "platform";

export type ResponsibilityRole = {
  id: ResponsibilityRoleId;
  title: string;
  subtitle: string;
  must: string[];
  boundary: string[];
};

export type ResponsibilitySource = {
  href: string;
  label: string;
};

export type ResponsibilityGroup = {
  id: string;
  title: string;
  description: string;
  roles: ResponsibilityRoleId[];
};

export const RESPONSIBILITY_MAP_INTRO = {
  title: "Wer trägt beim VibeCoding welche Verantwortung?",
  lead: "Ein Akteur kann beraten, entwickeln oder betreiben – rechtlich verantwortlich bleibt die Stelle, die Zweck und wesentliche Mittel bestimmt.",
} as const;

export const RESPONSIBILITY_DEFAULT_ROLE: ResponsibilityRoleId = "school";

export const RESPONSIBILITY_ROLES: ResponsibilityRole[] = [
  {
    id: "rights",
    title: "Kinder und Eltern",
    subtitle: "Rechteinhabende",
    must: [
      "verständlich über Daten, Zweck, Empfänger und Dauer informiert werden",
      "Auskunft, Berichtigung und gegebenenfalls Löschung verlangen können",
      "bei freiwilligen Bearbeitungen wirksam zustimmen oder ablehnen können",
    ],
    boundary: [
      "müssen weder Anbieter prüfen noch technische Risiken beurteilen",
      "eine Einwilligung repariert keine unsichere oder unverhältnismässige Anwendung",
      "dürfen durch eine Ablehnung freiwilliger Bearbeitungen keinen Nachteil erfahren",
    ],
  },
  {
    id: "school",
    title: "Schule / zuständiges öffentliches Organ",
    subtitle: "trägt die Gesamtverantwortung",
    must: [
      "Zweck, Notwendigkeit und Rechtsgrundlage festlegen",
      "Rollen, Zugriffe, Aufbewahrung und Löschung regeln",
      "Anbieter auswählen, Verträge abschliessen und Risiken nachweisbar prüfen",
      "bei erhöhtem Risiko eine Datenschutz-Folgenabschätzung veranlassen",
    ],
    boundary: [
      "kann die Verantwortung nicht an Lehrperson, IT oder Cloud-Anbieter delegieren",
      "in Aargau nennt der Leitfaden die jeweilige Schule als verantwortliches Organ",
      "wer intern freigibt, muss durch kantonale und kommunale Zuständigkeiten geklärt sein",
    ],
  },
  {
    id: "oversight",
    title: "Kantonale Datenschutzaufsicht",
    subtitle: "berät und beaufsichtigt",
    must: [
      "öffentliche Organe unabhängig beraten und beaufsichtigen",
      "bei vorgesehenen Verfahren konsultiert werden, soweit das kantonale Recht dies verlangt",
      "Empfehlungen abgeben und Datenschutzrecht durchsetzen",
    ],
    boundary: [
      "entwickelt die Anwendung nicht",
      "führt nicht das operative Risikomanagement der Schule",
      "ihre Beratung überträgt die Verantwortung nicht von der Schule auf die Aufsicht",
    ],
  },
  {
    id: "teacher",
    title: "Lehrperson / App-Autor:in",
    subtitle: "setzt Regeln im Alltag um",
    must: [
      "bis zur Freigabe nur synthetische Testdaten verwenden",
      "nur genehmigte Dienste, Konten und Speicherorte nutzen",
      "Daten minimieren, Zugriffe schützen und Vorfälle melden",
      "vor Pilotierung die Schulleitung beziehungsweise zuständige Stelle einbeziehen",
    ],
    boundary: [
      "erteilt sich nicht selbst die Freigabe für den Produktivbetrieb",
      "muss keine Verträge mit Cloud-Anbietern juristisch beurteilen",
      "trägt berufliche Sorgfaltspflichten, aber nicht allein die institutionelle Gesamtverantwortung",
    ],
  },
  {
    id: "colleagues",
    title: "Weitere nutzende Lehrpersonen",
    subtitle: "setzen die App im eigenen Unterricht ein",
    must: [
      "nur Apps einsetzen, die die Schule für diesen Zweck freigegeben hat",
      "keine echten Schülerdaten in ungeprüfte Prototypen eingeben",
      "Auffälligkeiten und Vorfälle der App-Autor:in und der Schulleitung melden",
    ],
    boundary: [
      "verantworten nicht die App, sondern nur den eigenen Einsatz im Unterricht",
      "ihre Nutzung macht aus einem Prototyp keine freigegebene Anwendung",
      "müssen Verträge und Technik nicht selbst beurteilen",
    ],
  },
  {
    id: "internal",
    title: "Schulleitung, IT und interne Datenschutzstelle",
    subtitle: "entscheiden, prüfen und sichern",
    must: [
      "einen klaren Freigabeweg und eine erreichbare Ansprechstelle schaffen",
      "Architektur, Berechtigungen, Authentifizierung, Logs und Löschung prüfen",
      "Datenflüsse, Unterauftragnehmer und Auslandbezug klären",
      "Schutzmassnahmen dokumentieren und regelmässig überprüfen",
    ],
    boundary: [
      "IT-Sicherheit ersetzt weder Zweckprüfung noch pädagogische Notwendigkeit",
      "Datenschutzberatung ist nicht automatisch eine formelle Genehmigung",
      "ein in der Schweiz stehender Server garantiert noch keine vollständige Datenhoheit",
    ],
  },
  {
    id: "provider",
    title: "Cloud-, KI- und Hosting-Anbieter",
    subtitle: "bearbeiten Daten vertraglich",
    must: [
      "Daten nur gemäss Vertrag und dokumentierter Weisung bearbeiten",
      "angemessene Sicherheit gewährleisten und Vorfälle melden",
      "Unterauftragnehmer und Bearbeitungsorte transparent machen",
      "Daten nach Vertragsende zurückgeben oder löschen",
    ],
    boundary: [
      "wird bei Werbung, eigenem Modelltraining oder eigener Analyse möglicherweise selbst Verantwortlicher",
      "eine Datenschutzerklärung allein ersetzt keinen Auftragsbearbeitungsvertrag",
      "kostenlose oder private Konten passen häufig nicht zu einer schulischen Auftragsbearbeitung",
    ],
  },
  {
    id: "visiblevibe",
    title: "VisibleVibe / imedias / PH",
    subtitle: "befähigt und gestaltet Schutzvorgaben",
    must: [
      "eine datenschutzarme Prototyping-Sandbox und klare rote Linien vermitteln",
      "Vorlagen für Dateninventar, Risiko-Triage und Übergabe an die Schule bereitstellen",
      "zwischen Lernprototyp, Pilot und Produktivsystem sichtbar unterscheiden",
      "keine Freigabe suggerieren, die nur Schule oder Träger erteilen können",
    ],
    boundary: [
      "ist als Community- oder Weiterbildungsanbieter nicht automatisch für jede entstandene App verantwortlich",
      "wird relevanter, sobald PH/imedias Hosting, Konten, Datenbank oder zentrale KI-Schnittstellen bereitstellt",
      "Haftung und Datenschutzrolle folgen der tatsächlichen Funktion, nicht dem Label „Community“",
    ],
  },
  {
    id: "developer",
    title: "Technische Entwicklung",
    subtitle: "setzt Privacy und Security by Design um",
    must: [
      "Privacy und Security by Design praktisch umsetzen",
      "sichere Standardwerte, geringe Datenspeicherung und restriktive Zugriffe bauen",
      "keine Geheimnisse oder reale Daten in Code, Prompts, Logs oder öffentliche Repositories schreiben",
      "Tests, Updates, Backups und Löschfunktionen dokumentieren",
    ],
    boundary: [
      "entscheidet nicht allein über Rechtsgrundlage oder pädagogische Erforderlichkeit",
      "technische Funktionstüchtigkeit bedeutet noch keine Datenschutzkonformität",
      "bei VibeCoding bleibt menschliche Prüfung des erzeugten Codes notwendig",
    ],
  },
  {
    id: "platform",
    title: "Zentrale VibeCoding-Plattform",
    subtitle: "kann zusätzliche Verantwortung auslösen",
    must: [
      "eigene Rolle pro Datenfluss klären: Verantwortlicher, gemeinsam Verantwortlicher oder Auftragsbearbeiter",
      "Mandantentrennung, Rollen, Verträge, Supportzugriffe und Unterauftragnehmer regeln",
      "Lehrpersonen sichere Standards und institutionell freigegebene Bausteine anbieten",
      "den Übergang von Test- zu Echtdaten technisch absichern",
    ],
    boundary: [
      "ein Disclaimer „Lehrperson ist verantwortlich“ ändert die tatsächliche Rollenverteilung nicht",
      "zentrale Speicherung oder KI-Gateways können PH/imedias in eine operative Datenschutzrolle bringen",
      "für reale Schülerdaten braucht es mehr als eine technisch funktionierende Hosting-Lösung",
    ],
  },
];

export const RESPONSIBILITY_GROUPS: ResponsibilityGroup[] = [
  {
    id: "rights",
    title: "Rechteinhabende",
    description: "Um ihre Daten geht es — sie haben Rechte, keine Prüfpflichten.",
    roles: ["rights"],
  },
  {
    id: "school",
    title: "Die Schule",
    description:
      "Hier liegt die Gesamtverantwortung — beim Organ, nicht bei der einzelnen Lehrperson.",
    roles: ["school", "internal", "teacher", "colleagues"],
  },
  {
    id: "tech",
    title: "Technische Seite",
    description: "Bearbeitet Daten im Auftrag — mit Vertrag, nicht auf Zuruf.",
    roles: ["developer", "provider", "platform"],
  },
  {
    id: "support",
    title: "Begleitung und Aufsicht",
    description: "Beraten und befähigen, tragen die Verantwortung aber nicht.",
    roles: ["visiblevibe", "oversight"],
  },
];

export const RESPONSIBILITY_FLOW = [
  {
    title: "1 · Prototyp",
    text: "Lehrperson entwickelt nur mit synthetischen Daten.",
  },
  {
    title: "2 · Pilot",
    text: "Schule prüft Zweck, Daten, Anbieter und Risiken.",
  },
  {
    title: "3 · Produktivbetrieb",
    text: "Formelle Freigabe, Verträge, Schutz- und Löschkonzept.",
  },
] as const;

export const RESPONSIBILITY_SOURCES: ResponsibilitySource[] = [
  {
    href: "https://www.ag.ch/media/kanton-aargau/dvi/dokumente/ges/organisation/idag/publikationen/20230923-leitfadendatenschutzdatensicherheitvolksschule.pdf",
    label: "OEDB Aargau: Leitfaden Volksschule",
  },
  {
    href: "https://www.edoeb.admin.ch/de/outsourcing-auftragsdatenbearbeitung",
    label: "EDÖB: Auftragsbearbeitung",
  },
  {
    href: "https://explore.educa.ch/risikodatenbank/",
    label: "Educa: Risikodatenbank",
  },
];

// ---------------------------------------------------------------------------
// Station 2: Datenzonen — mit welchen Daten baust du?
// ---------------------------------------------------------------------------

export type DataZoneId = "free" | "approval" | "taboo";

export type DataZone = {
  id: DataZoneId;
  title: string;
  line: string;
  items: string[];
};

export const DATA_ZONES_INTRO = {
  title: "Mit welchen Daten baust du?",
  lead: "Drei Zonen reichen. Entscheidend ist der Personenbezug — nicht die Technik.",
} as const;

export const DATA_ZONES: DataZone[] = [
  {
    id: "free",
    title: "Frei",
    line: "Kein Personenbezug, keine Freigabe nötig. Die meisten Lernapps kommen vollständig damit aus.",
    items: [
      "erfundene Namen und Testresultate",
      "Aufgaben, Lösungen und Erklärtexte",
      "anonyme Ergebnisse wie «7 von 20 richtig»",
      "alles, was du über dich selbst zeigst",
    ],
  },
  {
    id: "approval",
    title: "Mit Freigabe",
    line: "Echte Personendaten: so wenig wie möglich, und erst nachdem die Schule den Einsatz freigegeben hat. Im Prototyp: erfundene Daten.",
    items: [
      "echte Namen und Klassenlisten",
      "E-Mail-Adressen und Logins",
      "Noten und Lernstände einzelner Kinder",
      "Fotos und Stimmaufnahmen",
    ],
  },
  {
    id: "taboo",
    title: "Tabu",
    line: "Besonders schützenswert. Dafür baust du keine eigene App — weder speichern noch an KI-Dienste schicken.",
    items: [
      "Diagnosen und Therapien, etwa ADHS oder Logopädie",
      "Religion und Weltanschauung",
      "Sozialhilfe, Kindesschutz, Disziplinarisches",
      "Lernprofile, die sich über Wochen zu einem Persönlichkeitsbild verdichten",
    ],
  },
];

export const DATA_CONTEXT_NOTE =
  "Der Kontext entscheidet: «Lea» ist harmlos, «Lea übt mit der Logopädie-App» ist tabu. Ein Klassenschnitt ist anonym — eine Rangliste mit Namen nicht mehr. Prüfe darum Kombinationen, nicht einzelne Felder.";
