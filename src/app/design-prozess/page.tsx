'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, BookOpen, Sparkles, Code, 
  RotateCcw, Compass, Lightbulb, CheckCircle2, 
  HelpCircle, ChevronRight, Layers, GraduationCap 
} from 'lucide-react';

interface Step {
  id: string;
  title: string;
  shortDesc: string;
  icon: React.ReactNode;
  concept: string;
  details: string[];
  tips: string[];
}

export default function DesignProzessPage() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'backward' | 'loop' | 'nodes'>('backward');

  const backwardSteps: Step[] = [
    {
      id: 'step-1',
      title: '1. Lernziel definieren',
      shortDesc: 'Starten Sie mit dem Ende vor Augen (ABCD-Modell).',
      icon: <GraduationCap className="h-6 w-6 text-violet-400" />,
      concept: 'Wiggins & McTighe argumentieren in „Understanding by Design“, dass guter Unterricht rückwärts geplant wird. Bevor Sie ein einziges Feature designen oder eine Zeile Code schreiben lassen, legen Sie fest, was Lernende am Ende können sollen.',
      details: [
        'Audience (Wer lernt?): Zielgruppe genau beschreiben (Klasse, Vorwissen).',
        'Behavior (Welches Verhalten?): Messbares, beobachtbares Verhalten festlegen.',
        'Condition (Welche Bedingungen?): Hilfsmittel oder Kontext angeben.',
        'Degree (Wie gut?): Qualitätsmaßstab für den Lernerfolg definieren.'
      ],
      tips: [
        'Vermeiden Sie vage Verben wie „verstehen“ oder „kennen“. Nutzen Sie stattdessen „einordnen“, „analysieren“, „erklären“ oder „anwenden“.',
        'Verwenden Sie KI, um Ihre Lernziele auf Präzision nach dem ABCD-Modell prüfen zu lassen.'
      ]
    },
    {
      id: 'step-2',
      title: '2. Überprüfung festlegen',
      shortDesc: 'Wie weisen Lernende den Erfolg nach?',
      icon: <CheckCircle2 className="h-6 w-6 text-rose-400" />,
      concept: 'Überlegen Sie, woran Sie und die Lernenden erkennen, dass das Ziel erreicht wurde. Der Nachweis darf nicht auf einfachem Multiple-Choice beruhen, das nur Wiedererkennung abfragt.',
      details: [
        'Aktiver Wissensabruf (Retrieval Practice): Freitextantworten statt Raten.',
        'Fehlerspezifisches Feedback: Antworten so auswerten, dass falsche Konzepte offengelegt werden.',
        'Formative Assessments: Feedback während des Lernprozesses, nicht erst am Ende.',
        'Echtes Handeln: Aufgaben, bei denen man Objekte bewegen (Drag & Drop) oder selbst formulieren muss.'
      ],
      tips: [
        'Planen Sie Falschantworten („Distraktoren“) anhand realer Schülerfehler aus Ihrem Unterricht.',
        'Lassen Sie die KI feine Nuancen oder Tippfehler über Distanzmetriken abfangen, um Frust zu vermeiden.'
      ]
    },
    {
      id: 'step-3',
      title: '3. Aktivitäten & Features designen',
      shortDesc: 'Erst jetzt werden die eigentlichen Features der App entworfen.',
      icon: <Sparkles className="h-6 w-6 text-amber-400" />,
      concept: 'Nun werden die Interaktionsmuster entworfen, die genau zu den Lernzielen und der Überprüfung passen. Die App ist das didaktische Werkzeug, das den anspruchsvollen kognitiven Prozess der Schüler unterstützt.',
      details: [
        'Scaffolding: Hilfestellungen einbauen, die sich bei Erfolg verringern.',
        'Cognitive Load reduzieren: Keine ablenkenden Grafiken oder komplizierte UI.',
        'Vibe Coding: Funktionierende Prototypen (MVPs) in wenigen Minuten bauen.',
        'Didaktische Begründung: Jedes Feature muss direkt dem Lernprozess dienen (kein Feature Creep).'
      ],
      tips: [
        'Konzentrieren Sie sich auf das MVP (Minimum Viable Product): Lassen Sie optionale Wünsche wie Bestenlisten vorerst weg.',
        'Didaktische Präzision ist beim Vibe Coding wichtiger als Programmiererfahrung.'
      ]
    }
  ];

  const codingLoop = [
    {
      step: '1',
      title: 'Entwerfen (Design)',
      desc: 'Formulieren Sie das didaktische Konzept und die Benutzeroberfläche Ihrer App auf Papier oder in Notizen.',
      glow: 'glow-learning'
    },
    {
      step: '2',
      title: 'Promptexistenz (Prompt)',
      desc: 'Beschreiben Sie der KI in natürlicher Sprache das genaue Verhalten. Keine fertigen Vorlagen, sondern eigene didaktische Logik.',
      glow: 'glow-ai'
    },
    {
      step: '3',
      title: 'Testen & Debuggen',
      desc: 'Führen Sie die App lokal oder mobil aus. Beobachten Sie Fehler und geben Sie Fehlermeldungen zurück an die KI.',
      glow: 'glow-ux'
    },
    {
      step: '4',
      title: 'Reflektieren & Anpassen',
      desc: 'Prüfen Sie die App im echten Einsatz (Usability-Test mit Schülern). Reduzieren Sie Hürden und optimieren Sie das Feedback.',
      glow: 'glow-product'
    }
  ];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-12">
      
      {/* Navigation & Header */}
      <div className="flex flex-col space-y-4">
        <Link 
          href="/" 
          className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Zurück zur Startseite</span>
        </Link>
        
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Der Learning Design Prozess
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-3xl">
            Wie entsteht eine didaktisch fundierte Lernapp? Wir verbinden wissenschaftliche Erkenntnisse über effektives Lernen mit dem modernen, KI-gestützten Vibe Coding.
          </p>
        </div>
      </div>

      {/* Mode Switcher Tab Bar */}
      <div className="flex border-b border-white/10 gap-6">
        <button
          onClick={() => setActiveTab('backward')}
          className={`pb-4 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'backward' 
              ? 'border-violet-500 text-white' 
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          1. Backward Design
        </button>
        <button
          onClick={() => setActiveTab('loop')}
          className={`pb-4 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'loop' 
              ? 'border-rose-500 text-white' 
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          2. Der Vibe-Coding-Zyklus
        </button>
        <button
          onClick={() => setActiveTab('nodes')}
          className={`pb-4 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'nodes' 
              ? 'border-amber-500 text-white' 
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          3. Die Knotentypen im Skilltree
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'backward' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Step selection */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-2">Didaktische Schritte</span>
            {backwardSteps.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(idx)}
                className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-start space-x-3.5 ${
                  activeStep === idx 
                    ? 'bg-slate-900/90 border-violet-500/50 shadow-md shadow-violet-500/5' 
                    : 'bg-slate-950/40 border-white/5 hover:border-white/10 hover:bg-slate-900/40'
                }`}
              >
                <div className={`p-2 rounded-lg bg-slate-950 border ${
                  activeStep === idx ? 'border-violet-500/30' : 'border-white/5'
                }`}>
                  {step.icon}
                </div>
                <div className="space-y-1">
                  <h3 className={`text-sm font-bold ${activeStep === idx ? 'text-white' : 'text-slate-300'}`}>
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-1">{step.shortDesc}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Active Step Details */}
          <div className="lg:col-span-8 glass-panel rounded-2xl p-6 md:p-8 space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b border-white/5">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-white/10">
                {backwardSteps[activeStep].icon}
              </div>
              <div>
                <span className="text-[10px] font-bold text-violet-400 uppercase tracking-wider">Rückwärtsgerichtete Planung</span>
                <h2 className="text-xl md:text-2xl font-black text-white">{backwardSteps[activeStep].title}</h2>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Das didaktische Konzept</h4>
                <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/30 border border-white/3 rounded-xl p-4">
                  {backwardSteps[activeStep].concept}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Details Checkliste */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kernkomponenten</h4>
                  <ul className="space-y-2">
                    {backwardSteps[activeStep].details.map((detail, index) => (
                      <li key={index} className="flex items-start space-x-2 text-xs text-slate-300">
                        <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Didaktische Tipps */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center space-x-1">
                    <Lightbulb className="h-4 w-4 text-amber-400 shrink-0" />
                    <span>Praxistipp</span>
                  </h4>
                  <div className="space-y-2.5">
                    {backwardSteps[activeStep].tips.map((tip, index) => (
                      <div key={index} className="text-xs text-slate-400 leading-relaxed bg-slate-950/20 border border-white/3 p-3 rounded-lg">
                        {tip}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'loop' && (
        <div className="space-y-8">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-white">Der Vibe-Coding-Zyklus</h2>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Beim Vibe Coding agieren Sie als Architekt und Didaktiker, während die generative KI das Schreiben des Programmcodes übernimmt. Dieser Prozess läuft in einem kontinuierlichen, iterativen Zyklus ab:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {codingLoop.map((item, idx) => (
              <div 
                key={idx}
                className={`glass-panel p-6 rounded-2xl border border-white/5 space-y-4 relative flex flex-col justify-between`}
              >
                {/* Visual Step Number */}
                <span className="absolute top-4 right-4 text-4xl font-black text-white/5 select-none">{item.step}</span>
                
                <div className="space-y-2">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm bg-slate-950 border border-white/10`}>
                    {idx + 1}
                  </span>
                  <h3 className="text-base font-bold text-white pt-2">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>

                {idx < 3 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ChevronRight className="h-5 w-5 text-slate-500" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Key Principle Alert */}
          <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-5 max-w-3xl">
            <h4 className="text-sm font-bold text-rose-400 flex items-center space-x-1.5 mb-1">
              <RotateCcw className="h-4 w-4" />
              <span>Vergessen Sie Fehlerschleifen!</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Wenn die KI in eine Endlos-Schleife gerät oder fehlerhaften Code produziert: Stoppen Sie sie. Gehen Sie einen Schritt zurück, stellen Sie der KI Ihren funktionierenden Ausgangscode zur Verfügung und vereinfachen Sie Ihre Anforderungen.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'nodes' && (
        <div className="space-y-8">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-white">Die drei Knotentypen im Skilltree</h2>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Unser Lernphasenmodell führt Sie schrittweise vom Verstehen theoretischer Konzepte zur praktischen Umsetzung Ihrer eigenen Web-App. Die Knoten im Skilltree sind in drei Typen unterteilt:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Typ A */}
            <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-violet-400 uppercase tracking-widest">Typ A</span>
                <span className="rounded-full bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 text-[9px] font-bold text-violet-400">Orientierung</span>
              </div>
              <h3 className="text-base font-bold text-white">Conceptual Node (Orientierung)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Aufbau von Grundwissen und didaktischer Reflexionskompetenz. Hier schreiben Sie keinen Code. Im Fokus steht das Verstehen, das Diskutieren didaktischer Dilemmas mit der KI und der Transfer auf Ihr App-Projekt.
              </p>
              <div className="border-t border-white/5 pt-3">
                <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Ablauf:</span>
                <span className="text-[10px] text-slate-300">Impuls → KI-Exploration → Transfer → Quiz</span>
              </div>
            </div>

            {/* Typ B */}
            <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">Typ B</span>
                <span className="rounded-full bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 text-[9px] font-bold text-rose-400">Implementierung</span>
              </div>
              <h3 className="text-base font-bold text-white">Practical Node (Implementierung)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Hands-on-Umsetzung eines konkreten App-Features mittels Vibe Coding. Sie definieren Anforderungen und steuern die KI, um das Feature iterativ zu bauen, Fehler zu beheben und didaktische Logik einzuweben.
              </p>
              <div className="border-t border-white/5 pt-3">
                <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Ablauf:</span>
                <span className="text-[10px] text-slate-300">Vibe → Didaktisches Szenario → Worked Example → Stolpersteine → Quiz</span>
              </div>
            </div>

            {/* Typ P */}
            <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Typ P</span>
                <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[9px] font-bold text-amber-400">Projekt</span>
              </div>
              <h3 className="text-base font-bold text-white">Project Node (Meilenstein)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Integration mehrerer erlernter Einzelkompetenzen in ein bewertbares App-Zwischenprodukt (z. B. Quiz-Webapp, KI-Tutor). Ein mehrstündiges Arbeitsprojekt zur Synthese Ihres bisherigen Wissens.
              </p>
              <div className="border-t border-white/5 pt-3">
                <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Ablauf:</span>
                <span className="text-[10px] text-slate-300">Projektbeschreibung → Kompetenz-Matrix → Arbeitsablauf → Definition of Done</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Start Project CTA */}
      <div className="glass-panel rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-white/10 bg-gradient-to-r from-slate-950 to-slate-900/60">
        <div className="space-y-2 max-w-2xl text-center md:text-left">
          <h3 className="text-lg font-bold text-white">Bereit, den Skilltree zu erkunden?</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Beginnen Sie mit der Erforschung der grundlegenden Knoten wie „Pädagogik“ und „Technik“ auf Level 2, um Ihr theoretisches Fundament zu legen.
          </p>
        </div>
        <Link
          href="/skilltree"
          className="inline-flex items-center space-x-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-rose-600 px-6 py-3 text-xs font-bold text-white hover:from-violet-500 hover:to-rose-500 shadow-md hover:scale-105 transition-all w-full md:w-auto justify-center cursor-pointer"
        >
          <span>Skilltree öffnen</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

    </div>
  );
}
