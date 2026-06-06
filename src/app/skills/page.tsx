'use client';

import React from 'react';
import { useSkillTree } from '../../context/SkillTreeContext';
import Link from 'next/link';
import { 
  Search, RotateCcw, ArrowRight, Lock, CheckCircle2, 
  Clock, PlayCircle, Sparkles, BookOpen 
} from 'lucide-react';

export default function SkillsPage() {
  const {
    nodes,
    completionStates,
    categoryFilter,
    setCategoryFilter,
    levelFilter,
    setLevelFilter,
    searchQuery,
    setSearchQuery,
    resetFilters
  } = useSkillTree();

  const categories = [
    { name: 'Learning Design', color: 'bg-violet-500/10 text-violet-400 border-violet-500/30' },
    { name: 'UX Design', color: 'bg-rose-500/10 text-rose-400 border-rose-500/30' },
    { name: 'AI Design', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
    { name: 'Data Design', color: 'bg-blue-500/10 text-blue-400 border-blue-500/30' },
    { name: 'Product Design', color: 'bg-amber-500/10 text-amber-400 border-amber-500/30' }
  ];

  // Client-side filtering
  const filteredNodes = nodes.filter(node => {
    // 1. Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = node.title.toLowerCase().includes(q);
      const matchSummary = node.summary.toLowerCase().includes(q);
      if (!matchTitle && !matchSummary) return false;
    }
    // 2. Category Filter
    if (categoryFilter && node.category !== categoryFilter) return false;
    // 3. Level Filter
    if (levelFilter !== null && node.level !== levelFilter) return false;

    return true;
  });

  const categoryColorClasses = (cat: string) => {
    const map = {
      'Learning Design': 'text-violet-400 border-violet-500/20 bg-violet-500/5',
      'UX Design': 'text-rose-400 border-rose-500/20 bg-rose-500/5',
      'AI Design': 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
      'Data Design': 'text-blue-400 border-blue-500/20 bg-blue-500/5',
      'Product Design': 'text-amber-400 border-amber-500/20 bg-amber-500/5'
    };
    return map[cat as keyof typeof map] || map['Learning Design'];
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">Kompetenzübersicht</h1>
        <p className="mt-2 text-sm text-slate-400">
          Suche und filtere alle Skills des Skilltrees.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="glass-panel rounded-2xl p-4 space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute top-2.5 left-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Skills filtern (z.B. Feedback)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/5 bg-slate-950/60 py-2 pr-4 pl-9 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-white/15 focus:bg-slate-950"
            />
          </div>
          
          {/* Level Filter */}
          <div className="w-full md:w-44 select-container">
            <select
              value={levelFilter || ''}
              onChange={(e) => setLevelFilter(e.target.value ? Number(e.target.value) : null)}
              className="w-full rounded-xl border border-white/5 bg-slate-950/60 px-3 py-2 text-xs font-semibold text-slate-300 outline-none cursor-pointer"
            >
              <option value="" className="bg-slate-950 text-slate-400">Stufe (Alle)</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((lvl) => (
                <option key={lvl} value={lvl} className="bg-slate-950 text-slate-200">
                  Stufe {lvl}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filters */}
          {(categoryFilter || levelFilter || searchQuery) && (
            <button
              onClick={resetFilters}
              className="flex items-center justify-center space-x-1 rounded-xl border border-rose-500/20 bg-rose-500/5 px-4 py-2 text-xs font-bold text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30 transition-all cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Zurücksetzen</span>
            </button>
          )}
        </div>

        {/* Categories tag filters */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
          <button
            onClick={() => setCategoryFilter(null)}
            className={`rounded-full px-3 py-1 text-xs font-medium border transition-all cursor-pointer ${
              categoryFilter === null
                ? 'border-white/20 bg-white/10 text-white'
                : 'border-white/5 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'
            }`}
          >
            Alle
          </button>
          {categories.map((cat) => {
            const isSelected = categoryFilter === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setCategoryFilter(isSelected ? null : cat.name)}
                className={`rounded-full px-3 py-1 text-xs font-semibold border transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-white/10 border-white/40 text-white shadow-md' 
                    : `${cat.color} hover:bg-white/5`
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of cards */}
      {filteredNodes.length === 0 ? (
        <div className="rounded-2xl border border-white/5 bg-slate-950/30 p-12 text-center">
          <p className="text-sm text-slate-500">Keine Kompetenzen entsprechen deinen Filterkriterien.</p>
          <button 
            onClick={resetFilters} 
            className="mt-4 inline-flex items-center space-x-2 text-xs font-bold text-rose-400 hover:underline"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Filter aufheben</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredNodes.map(node => {
            const state = completionStates[node.id] || 'locked';
            
            return (
              <Link 
                href={`/skills/${node.slug}`} 
                key={node.id}
                className="glass-card flex flex-col justify-between rounded-2xl p-5 border border-white/5 hover:border-white/15 transition-all group"
              >
                <div className="space-y-3">
                  {/* Card top */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Stufe {node.level}
                    </span>
                    <div className="flex items-center space-x-1.5">
                      {node.is_milestone && (
                        <span className="text-amber-400" title="Meilenstein">
                          <Sparkles className="h-3.5 w-3.5" />
                        </span>
                      )}
                      <span>
                        {state === 'completed' && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
                        {state === 'in_progress' && <Clock className="h-4 w-4 text-amber-400" />}
                        {state === 'unlocked' && <PlayCircle className="h-4 w-4 text-rose-500" />}
                        {state === 'locked' && <Lock className="h-4 w-4 text-slate-600" />}
                      </span>
                    </div>
                  </div>

                  {/* Title & Info */}
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-rose-400 transition-colors">
                      {node.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {node.summary}
                    </p>
                  </div>
                </div>

                {/* Card bottom */}
                <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-3">
                  <span className={`rounded-md border px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase ${categoryColorClasses(node.category)}`}>
                    {node.category}
                  </span>
                  
                  <span className="flex items-center space-x-1 text-[10px] font-bold text-rose-400 group-hover:translate-x-1 transition-transform">
                    <span>Details</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}

    </div>
  );
}
