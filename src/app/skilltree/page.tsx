'use client';

import React from 'react';
import { FilterPanel } from '../../components/FilterPanel';
import { SkillTreeCanvas } from '../../components/SkillTreeCanvas';
import { Sidebar } from '../../components/Sidebar';
import { useSkillTree } from '../../context/SkillTreeContext';

export default function SkillTreePage() {
  const { loading, error } = useSkillTree();

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-64px)] w-full flex-col items-center justify-center bg-slate-950 text-slate-400">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-700 border-t-rose-500" />
        <span className="mt-4 text-xs font-semibold tracking-wider">Lade interaktiven Skilltree...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[calc(100vh-64px)] w-full flex-col items-center justify-center bg-slate-950 text-slate-400">
        <span className="text-sm font-semibold text-rose-400">{error}</span>
      </div>
    );
  }

  return (
    <div className="relative flex h-[calc(100vh-64px)] w-full flex-col overflow-hidden bg-slate-950">
      {/* Floating Filter Panel */}
      <div className="absolute top-4 left-4 right-4 z-20 md:left-6 md:right-6 lg:right-1/3">
        <FilterPanel />
      </div>

      {/* Connection Canvas */}
      <div className="h-full w-full">
        <SkillTreeCanvas />
      </div>

      {/* Detail Sliding Panel */}
      <Sidebar />
    </div>
  );
}
