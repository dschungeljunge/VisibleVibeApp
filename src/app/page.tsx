'use client';

import React from 'react';
import Link from 'next/link';
import { Map, ArrowRight, BookOpen, Users } from 'lucide-react';


export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4 overflow-hidden">

      {/* Decorative Blur Orbs */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-violet-600/10 blur-[128px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-rose-600/10 blur-[128px]" />

      {/* Hero */}
      <div className="relative z-10 max-w-3xl text-center space-y-8">

        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl leading-tight">
          Der interaktive
          <span className="block mt-2 bg-gradient-to-r from-violet-400 via-rose-400 to-amber-400 bg-clip-text text-transparent">
            Learning Design Skilltree
          </span>
        </h1>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/skilltree"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-violet-600 to-rose-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-violet-500/20 hover:from-violet-500 hover:to-rose-500 hover:shadow-violet-500/30 hover:scale-105 active:scale-98 transition-all"
          >
            <Map className="h-4.5 w-4.5" />
            <span>Skilltree öffnen</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/design-prozess"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl bg-slate-900 border border-white/10 px-8 py-4 text-sm font-bold text-slate-200 shadow-lg shadow-black/20 hover:bg-slate-800 hover:text-white hover:border-white/20 hover:scale-105 active:scale-98 transition-all"
          >
            <BookOpen className="h-4.5 w-4.5 text-amber-400" />
            <span>Design Prozess</span>
          </Link>

          <Link
            href="/community"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 rounded-xl bg-slate-900 border border-white/10 px-8 py-4 text-sm font-bold text-slate-200 shadow-lg shadow-black/20 hover:bg-slate-800 hover:text-white hover:border-white/20 hover:scale-105 active:scale-98 transition-all"
          >
            <Users className="h-4.5 w-4.5 text-emerald-400" />
            <span>Community</span>
          </Link>
        </div>


      </div>
    </div>
  );
}
