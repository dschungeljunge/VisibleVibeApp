'use client';

import React from 'react';
import { useSkillTree } from '../context/SkillTreeContext';
import { 
  X, CheckCircle2, Circle, Clock, Lock, 
  ArrowRight, ClipboardCheck, Link2 
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const Sidebar: React.FC = () => {
  const {
    nodes,
    projects,
    setSelectedNodeId,
    selectedProjectId,
    setSelectedProjectId,
    completionStates,
  } = useSkillTree();

  const activeProject = projects.find(p => p.id === selectedProjectId) || null;

  // Only render sidebar for projects, individual nodes are handled by the canvas PopupNode
  if (!activeProject) return null;

  const handleClose = () => {
    setSelectedProjectId(null);
  };

  // Project details view
  const renderProjectView = () => {
    // Nodes required for this project
    const projectNodes = nodes.filter(n => activeProject.required_node_ids.includes(n.id))
      .sort((a, b) => a.level - b.level);

    return (
      <div className="flex flex-col space-y-6">
        <div>
          <span className="rounded-md border-2 border-slate-900 bg-amber-100 px-2.5 py-0.5 text-xs font-black text-amber-800 shadow-[2px_2px_0px_rgba(24,24,27,0.1)]">
            Projektpfad
          </span>
          <h2 className="mt-3 text-xl font-black text-slate-900 sm:text-2xl">{activeProject.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">{activeProject.summary}</p>
        </div>

        {/* Artifact Description */}
        <div className="rounded-xl border-2 border-slate-900 bg-white p-5 shadow-[4px_4px_0px_rgba(24,24,27,0.12)] relative">
          <div className="washi-tape washi-tape-rose" />
          <h3 className="text-xs font-black tracking-wider text-amber-700 uppercase">Ziel-Artefakt</h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-700 font-medium">{activeProject.artifact_description}</p>
        </div>

        {/* Project details card */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border-2 border-slate-900 bg-[#fefce8] p-3 text-center shadow-[3px_3px_0px_rgba(24,24,27,0.1)]">
            <h4 className="text-[10px] font-black text-violet-700 uppercase">Lernstrategie</h4>
            <p className="mt-1 text-[10px] text-slate-700 leading-normal line-clamp-4">{activeProject.learning_strategy}</p>
          </div>
          <div className="rounded-xl border-2 border-slate-900 bg-[#fefce8] p-3 text-center shadow-[3px_3px_0px_rgba(24,24,27,0.1)]">
            <h4 className="text-[10px] font-black text-emerald-700 uppercase">Technikprinzip</h4>
            <p className="mt-1 text-[10px] text-slate-700 leading-normal line-clamp-4">{activeProject.technology_principle}</p>
          </div>
          <div className="rounded-xl border-2 border-slate-900 bg-[#fefce8] p-3 text-center shadow-[3px_3px_0px_rgba(24,24,27,0.1)]">
            <h4 className="text-[10px] font-black text-rose-700 uppercase">UX-Prinzip</h4>
            <p className="mt-1 text-[10px] text-slate-700 leading-normal line-clamp-4">{activeProject.ux_principle}</p>
          </div>
        </div>

        {/* Path Nodes sequence */}
        <div className="border-t-2 border-slate-900/10 pt-4">
          <h3 className="text-xs font-black tracking-wider text-slate-500 uppercase">Benötigte Kompetenzen</h3>
          <div className="mt-3 space-y-2.5">
            {projectNodes.map((n, idx) => {
              const state = completionStates[n.id] || 'locked';
              return (
                <button
                  key={n.id}
                  onClick={() => {
                    setSelectedNodeId(n.id);
                  }}
                  className="flex w-full items-center justify-between rounded-xl border-2 border-slate-900 bg-white p-3.5 text-left hover:bg-slate-50 shadow-[3px_3px_0px_rgba(24,24,27,0.1)] transition-all active:translate-y-px cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="text-xs font-black text-slate-800">{n.title}</h4>
                      <p className="text-[10px] text-slate-500 font-medium">Stufe {n.level} • {n.category}</p>
                    </div>
                  </div>
                  <div>
                    {state === 'completed' && <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600" />}
                    {state === 'in_progress' && <Clock className="h-4.5 w-4.5 text-amber-500 animate-pulse" />}
                    {state === 'unlocked' && <Circle className="h-4.5 w-4.5 text-rose-500" />}
                    {state === 'locked' && <Lock className="h-4.5 w-4.5 text-slate-400" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Definition of Done */}
        <div className="rounded-xl border-2 border-slate-900 bg-white p-5 shadow-[4px_4px_0px_rgba(24,24,27,0.12)]">
          <h3 className="text-xs font-black tracking-wider text-slate-600 uppercase">Definition of Done (DoD)</h3>
          <div className="mt-2 text-xs leading-relaxed text-slate-700 whitespace-pre-line font-medium">
            {activeProject.definition_of_done}
          </div>
        </div>

        {/* Markdown description of path */}
        <div className="prose prose-slate max-w-none text-xs leading-relaxed text-slate-800">
          <ReactMarkdown>{activeProject.content_markdown}</ReactMarkdown>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed top-16 right-0 z-30 h-[calc(100vh-64px)] w-full overflow-y-auto border-l-2 border-slate-900 bg-[#fdfbf7] shadow-2xl transition-all sm:w-110 md:w-128 lg:w-144">
      {/* Sidebar Controls Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b-2 border-slate-900 bg-[#faf8f5] px-4 py-3">
        <div className="flex space-x-1">
          <button
            className="rounded-lg border border-slate-900 bg-slate-900 px-3 py-1.5 text-xs font-bold text-white shadow-sm"
          >
            Inhalt
          </button>
        </div>

        <div className="flex items-center space-x-1.5">
          <button
            onClick={handleClose}
            className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-900/5 hover:text-slate-950 transition-colors cursor-pointer"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6">
        {renderProjectView()}
      </div>
    </div>
  );
};
