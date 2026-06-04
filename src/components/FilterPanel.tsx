'use client';

import React from 'react';
import { useSkillTree } from '../context/SkillTreeContext';
import { Search, RotateCcw, BookOpen, Layers, Sparkles } from 'lucide-react';

export const FilterPanel: React.FC = () => {
  const {
    categoryFilter,
    setCategoryFilter,
    levelFilter,
    setLevelFilter,
    searchQuery,
    setSearchQuery,
    resetFilters,
    projects,
    selectedProjectId,
    setSelectedProjectId
  } = useSkillTree();

  const categories = [
    { name: 'Learning Design', color: 'bg-violet-500/10 text-violet-400 border-violet-500/30' },
    { name: 'UX Design', color: 'bg-rose-500/10 text-rose-400 border-rose-500/30' },
    { name: 'AI Design', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
    { name: 'Data Design', color: 'bg-blue-500/10 text-blue-400 border-blue-500/30' },
    { name: 'Product Design', color: 'bg-amber-500/10 text-amber-400 border-amber-500/30' }
  ];

  return (
    <div className="glass-panel rounded-2xl p-4 shadow-xl shadow-black/40">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute top-2.5 left-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Skills suchen (z.B. Prompting)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-white/5 bg-slate-950/50 py-2 pr-4 pl-9 text-sm text-slate-200 placeholder-slate-500 shadow-inner outline-none transition-colors focus:border-white/15 focus:bg-slate-950"
          />
        </div>

        {/* Project Path Selector */}
        <div className="relative w-full sm:w-64">
          <div className="flex items-center space-x-2 rounded-xl border border-white/5 bg-slate-950/50 px-3 py-1.5 shadow-inner">
            <Sparkles className="h-4 w-4 text-amber-400 shrink-0" />
            <select
              value={selectedProjectId || ''}
              onChange={(e) => setSelectedProjectId(e.target.value || null)}
              className="w-full bg-transparent text-xs font-semibold text-slate-300 outline-none cursor-pointer"
            >
              <option value="" className="bg-slate-950 text-slate-400">--- Projektpfad wählen ---</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id} className="bg-slate-950 text-slate-200">
                  {project.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Level Selector */}
        <div className="relative w-full sm:w-44">
          <div className="flex items-center space-x-2 rounded-xl border border-white/5 bg-slate-950/50 px-3 py-1.5 shadow-inner">
            <Layers className="h-4 w-4 text-slate-400 shrink-0" />
            <select
              value={levelFilter || ''}
              onChange={(e) => setLevelFilter(e.target.value ? Number(e.target.value) : null)}
              className="w-full bg-transparent text-xs font-semibold text-slate-300 outline-none cursor-pointer"
            >
              <option value="" className="bg-slate-950 text-slate-400">Stufe (Alle)</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((lvl) => (
                <option key={lvl} value={lvl} className="bg-slate-950 text-slate-200">
                  Stufe {lvl}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Reset Filters */}
        {(categoryFilter || levelFilter || searchQuery || selectedProjectId) && (
          <button
            onClick={() => {
              resetFilters();
              setSelectedProjectId(null);
            }}
            className="flex items-center justify-center space-x-1.5 rounded-xl border border-rose-500/20 bg-rose-500/5 px-4 py-2 text-xs font-bold text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30 transition-all cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Zurücksetzen</span>
          </button>
        )}

      </div>

      {/* Category Tabs */}
      <div className="mt-4 flex flex-wrap gap-2 border-t border-white/5 pt-3">
        <button
          onClick={() => setCategoryFilter(null)}
          className={`rounded-full px-3 py-1 text-xs font-medium border transition-all cursor-pointer ${
            categoryFilter === null
              ? 'border-white/20 bg-white/10 text-white'
              : 'border-white/5 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'
          }`}
        >
          Alle Kompetenzen
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
  );
};
