'use client';

import React from 'react';
import { FilterPanel } from '../../components/FilterPanel';
import { SkillTreeCanvas } from '../../components/SkillTreeCanvas';
import { Sidebar } from '../../components/Sidebar';
import { useSkillTree } from '../../context/SkillTreeContext';
import { ReactFlowProvider } from '@xyflow/react';

export default function SkillTreePage() {
  const { loading, error, selectedNodeId, selectedProjectId } = useSkillTree();

  const isSidebarOpen = !!(selectedNodeId || selectedProjectId);

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-64px)] w-full flex-col items-center justify-center bg-white text-slate-500">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-rose-500" />
        <span className="mt-4 text-xs font-semibold tracking-wider">Lade interaktiven Skilltree...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[calc(100vh-64px)] w-full flex-col items-center justify-center bg-white text-slate-500">
        <span className="text-sm font-semibold text-rose-500">{error}</span>
      </div>
    );
  }

  return (
    <ReactFlowProvider>
      <div className="relative flex h-[calc(100vh-64px)] w-full flex-col overflow-hidden bg-white">
        {/* Floating Filter Panel */}
        <div className={`absolute top-4 left-4 z-20 md:left-6 transition-all duration-300 ${
          isSidebarOpen 
            ? 'right-4 sm:right-[464px] md:right-[536px] lg:right-[600px]' 
            : 'right-4 md:right-6'
        }`}>
          <FilterPanel />
        </div>

        {/* Connection Canvas */}
        <div className="h-full w-full">
          <SkillTreeCanvas />
        </div>

        {/* Detail Sliding Panel */}
        <Sidebar />
      </div>
    </ReactFlowProvider>
  );
}
