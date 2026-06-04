'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Award, Sparkles, Map, ClipboardList, CheckSquare, 
  ArrowRight, BookOpen, Brain, Code, Cpu, Layers 
} from 'lucide-react';

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4 py-16 overflow-hidden">
      
      {/* Decorative Blur Orbs */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-violet-600/10 blur-[128px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-rose-600/10 blur-[128px]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-emerald-600/5 blur-[160px]" />

      {/* Hero section */}
      <div className="relative z-10 max-w-4xl text-center space-y-6">
        
        <div className="inline-flex items-center space-x-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-3.5 py-1 text-xs font-semibold text-violet-400">
          <Sparkles className="h-3.5 w-3.5 animate-pulse" />
          <span>CAS/SAS Learning App Design</span>
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
          Der interaktive
          <span className="block mt-2 bg-gradient-to-r from-violet-400 via-rose-400 to-amber-400 bg-clip-text text-transparent">
            Learning Design Skilltree
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-base text-slate-400 sm:text-lg leading-relaxed">
          Navigiere durch Kompetenzen aus Didaktik, User Experience, KI-Integration und agilem Coden. 
          Plane dein Lernapp-Projekt anhand vordefinierter Praxis-Pfade.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col justify-center gap-3 sm:flex-row pt-4">
          <Link
            href="/skilltree"
            className="flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-violet-600 to-rose-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-500/20 hover:from-violet-500 hover:to-rose-500 hover:shadow-violet-500/30 hover:scale-102 active:scale-98 transition-all"
          >
            <Map className="h-4.5 w-4.5" />
            <span>Interaktiven Skilltree öffnen</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          
          <Link
            href="/projects"
            className="flex items-center justify-center space-x-2 rounded-xl border border-white/10 bg-slate-900/60 px-6 py-3.5 text-sm font-bold text-slate-200 backdrop-blur-sm hover:bg-slate-800/80 hover:text-white transition-all"
          >
            <BookOpen className="h-4.5 w-4.5" />
            <span>Projektpfade ansehen</span>
          </Link>
        </div>

      </div>

      {/* 3 Step Concept Cards */}
      <div className="relative z-10 mx-auto mt-20 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
        
        {/* Step 1 */}
        <div className="glass-card rounded-2xl p-6 relative">
          <div className="absolute -top-4 -left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-sm font-bold text-white shadow-md shadow-violet-500/20">
            1
          </div>
          <div className="mt-2 flex items-center space-x-3">
            <div className="rounded-lg bg-violet-500/10 p-2 text-violet-400">
              <Map className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Skilltree erkunden</h3>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-slate-400">
            Klicke dich durch die Kompetenzen. Jede Kachel liefert verständliche Praxisanleitungen, Hilfen und Kriterien.
          </p>
        </div>

        {/* Step 2 */}
        <div className="glass-card rounded-2xl p-6 relative">
          <div className="absolute -top-4 -left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-rose-600 text-sm font-bold text-white shadow-md shadow-rose-500/20">
            2
          </div>
          <div className="mt-2 flex items-center space-x-3">
            <div className="rounded-lg bg-rose-500/10 p-2 text-rose-400">
              <ClipboardList className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Projektpfad wählen</h3>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-slate-400">
            Wähle dein Ziel-Artefakt: z.B. eine Quiz-Webapp, einen KI-Tutor oder ein Dashboard. Die benötigten Skills leuchten auf.
          </p>
        </div>

        {/* Step 3 */}
        <div className="glass-card rounded-2xl p-6 relative">
          <div className="absolute -top-4 -left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-sm font-bold text-white shadow-md shadow-emerald-500/20">
            3
          </div>
          <div className="mt-2 flex items-center space-x-3">
            <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400">
              <CheckSquare className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Lernapp entwickeln</h3>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-slate-400">
            Setze die Mini-Aufgaben pro Skill um. Mit jedem Haken schaltest du automatisch die nachfolgenden Pfade frei.
          </p>
        </div>

      </div>

      {/* Core Competency Pillars Info */}
      <div className="relative z-10 max-w-5xl mt-24 border-t border-white/5 pt-12 w-full text-center">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">
          Die vier Säulen des Programms
        </h2>
        
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="flex flex-col items-center p-4">
            <Brain className="h-6 w-6 text-violet-400 mb-2" />
            <h4 className="text-xs font-bold text-white">Learning Design</h4>
            <p className="text-[10px] text-slate-500 mt-1">Didaktik &amp; Feedback</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <Cpu className="h-6 w-6 text-emerald-400 mb-2" />
            <h4 className="text-xs font-bold text-white">AI Design</h4>
            <p className="text-[10px] text-slate-500 mt-1">Prompting &amp; RAG</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <Code className="h-6 w-6 text-amber-400 mb-2" />
            <h4 className="text-xs font-bold text-white">Product Design</h4>
            <p className="text-[10px] text-slate-500 mt-1">Vibe Coding &amp; MVPs</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <Layers className="h-6 w-6 text-rose-400 mb-2" />
            <h4 className="text-xs font-bold text-white">UX/UI Design</h4>
            <p className="text-[10px] text-slate-500 mt-1">Cognitive Load &amp; Flow</p>
          </div>
        </div>
      </div>

    </div>
  );
}
