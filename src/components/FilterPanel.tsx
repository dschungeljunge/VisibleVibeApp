'use client';

import React from 'react';
import { useSkillTree } from '../context/SkillTreeContext';
import { Search, RotateCcw, Layers, Sparkles } from 'lucide-react';

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
    { name: 'Learning Design', activeClass: 'bg-violet-600 text-white border-violet-850', inactiveClass: 'bg-violet-50 text-violet-800 border-violet-200 hover:bg-violet-100/70' },
    { name: 'UX Design', activeClass: 'bg-rose-600 text-white border-rose-850', inactiveClass: 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100/70' },
    { name: 'AI Design', activeClass: 'bg-emerald-600 text-white border-emerald-850', inactiveClass: 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100/70' },
    { name: 'Data Design', activeClass: 'bg-blue-600 text-white border-blue-850', inactiveClass: 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100/70' },
    { name: 'Product Design', activeClass: 'bg-amber-600 text-white border-amber-850', inactiveClass: 'bg-amber-50 text-amber-850 border-amber-200 hover:bg-amber-100/70' }
  ];

  const hasActiveFilters = !!(categoryFilter || levelFilter || searchQuery || selectedProjectId);

  return (
    <div className="glass-panel rounded-2xl p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute top-2.5 left-3 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Skills suchen (z.B. Prompting)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border-2 border-slate-900 bg-white py-2 pr-4 pl-9 text-sm text-slate-800 placeholder-slate-400 shadow-sm outline-none transition-all focus:ring-2 focus:ring-violet-400"
          />
        </div>

        {/* Project Path Selector */}
        <div className="relative w-full sm:w-64">
          <div className="flex items-center space-x-2 rounded-xl border-2 border-slate-900 bg-white px-3 py-1.5 shadow-sm">
            <Sparkles className="h-4 w-4 text-amber-500 shrink-0" />
            <select
              value={selectedProjectId || ''}
              onChange={(e) => setSelectedProjectId(e.target.value || null)}
              className="w-full bg-transparent text-xs font-bold text-slate-800 outline-none cursor-pointer"
            >
              <option value="" className="bg-white text-slate-400">--- Lernpfad wählen ---</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id} className="bg-white text-slate-800">
                  {project.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Level Selector */}
        <div className="relative w-full sm:w-44">
          <div className="flex items-center space-x-2 rounded-xl border-2 border-slate-900 bg-white px-3 py-1.5 shadow-sm">
            <Layers className="h-4 w-4 text-slate-500 shrink-0" />
            <select
              value={levelFilter || ''}
              onChange={(e) => setLevelFilter(e.target.value ? Number(e.target.value) : null)}
              className="w-full bg-transparent text-xs font-bold text-slate-800 outline-none cursor-pointer"
            >
              <option value="" className="bg-white text-slate-400">Stufe (Alle)</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((lvl) => (
                <option key={lvl} value={lvl} className="bg-white text-slate-800">
                  Stufe {lvl}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Reset Filters (Always rendered, disables to avoid layout shifts) */}
        <button
          onClick={() => {
            if (hasActiveFilters) {
              resetFilters();
              setSelectedProjectId(null);
            }
          }}
          disabled={!hasActiveFilters}
          className={`flex items-center justify-center space-x-1.5 rounded-xl border-2 px-4 py-2 text-xs font-bold transition-all cursor-pointer shadow-[2px_2px_0px_0px_#18181b] active:translate-y-px shrink-0 ${
            hasActiveFilters
              ? 'border-rose-500 bg-rose-50 text-rose-600 hover:bg-rose-100/50'
              : 'border-slate-200 bg-slate-100 text-slate-400 shadow-none pointer-events-none opacity-50'
          }`}
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Zurücksetzen</span>
        </button>

      </div>

      {/* Category Tabs */}
      <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-900/10 pt-3">
        <button
          onClick={() => setCategoryFilter(null)}
          className={`rounded-full px-3 py-1 text-xs font-black border-2 transition-all cursor-pointer shadow-[2px_2px_0px_0px_#18181b] active:translate-y-px ${
            categoryFilter === null
              ? 'border-slate-900 bg-slate-900 text-white shadow-none'
              : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
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
              className={`rounded-full px-3 py-1 text-xs font-black border-2 transition-all cursor-pointer shadow-[2px_2px_0px_0px_#18181b] active:translate-y-px ${
                isSelected 
                  ? `${cat.activeClass} shadow-none` 
                  : cat.inactiveClass
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
