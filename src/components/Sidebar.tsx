'use client';

import React from 'react';
import { useSkillTree } from '../context/SkillTreeContext';
import { 
  X, CheckCircle2, Circle, Clock, Lock, Sparkles, BookOpen, 
  ArrowRight, ClipboardCheck, Link2 
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const Sidebar: React.FC = () => {
  const {
    nodes,
    projects,
    selectedNodeId,
    setSelectedNodeId,
    selectedProjectId,
    setSelectedProjectId,
    completionStates,
    updateNodeState,
  } = useSkillTree();

  const activeNode = nodes.find(n => n.id === selectedNodeId) || null;
  const activeProject = projects.find(p => p.id === selectedProjectId) || null;

  if (!activeNode && !activeProject) return null;

  const handleClose = () => {
    setSelectedNodeId(null);
  };

  const handleNodeStateChange = (state: 'unlocked' | 'in_progress' | 'completed') => {
    if (!selectedNodeId) return;
    updateNodeState(selectedNodeId, state);
  };

  // Node details view
  const renderNodeView = () => {
    if (!activeNode) return null;
    const state = completionStates[activeNode.id] || 'locked';

    const categoryColors = {
      'Learning Design': 'text-violet-400 border-violet-500/20 bg-violet-500/5',
      'UX Design': 'text-rose-400 border-rose-500/20 bg-rose-500/5',
      'AI Design': 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
      'Data Design': 'text-blue-400 border-blue-500/20 bg-blue-500/5',
      'Product Design': 'text-amber-400 border-amber-500/20 bg-amber-500/5'
    };

    return (
      <div className="flex flex-col space-y-6">
        {/* Header Metadata */}
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${categoryColors[activeNode.category as keyof typeof categoryColors]}`}>
            {activeNode.category}
          </span>
          <span className="rounded-full border border-white/10 bg-slate-900 px-2.5 py-0.5 text-xs font-semibold text-slate-400">
            Stufe {activeNode.level}
          </span>
          {activeNode.is_milestone && (
            <span className="flex items-center space-x-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-xs font-bold text-amber-400">
              <Sparkles className="h-3 w-3 animate-pulse" />
              <span>Meilenstein</span>
            </span>
          )}
        </div>

        {/* Title & Summary */}
        <div>
          <h2 className="text-xl font-bold text-white sm:text-2xl">{activeNode.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">{activeNode.summary}</p>
        </div>

        {/* Completion Control (User-facing progress) */}
        <div className="rounded-xl border border-white/5 bg-slate-950/60 p-4">
          <h3 className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Lernstatus</h3>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-2">
              {state === 'locked' && (
                <>
                  <Lock className="h-5 w-5 text-slate-500" />
                  <span className="text-sm font-semibold text-slate-400">Gesperrt (Voraussetzungen fehlen)</span>
                </>
              )}
              {state === 'unlocked' && (
                <>
                  <Circle className="h-5 w-5 text-rose-500" />
                  <span className="text-sm font-semibold text-rose-400">Verfügbar (Bereit zum Lernen)</span>
                </>
              )}
              {state === 'in_progress' && (
                <>
                  <Clock className="h-5 w-5 text-amber-400 animate-spin-slow" />
                  <span className="text-sm font-semibold text-amber-400">In Bearbeitung</span>
                </>
              )}
              {state === 'completed' && (
                <>
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  <span className="text-sm font-semibold text-emerald-400">Abgeschlossen</span>
                </>
              )}
            </div>

            {state !== 'locked' && (
              <div className="flex space-x-1.5 self-end sm:self-auto">
                <button
                  onClick={() => handleNodeStateChange('unlocked')}
                  className={`rounded-lg px-2.5 py-1.5 text-xs font-bold border transition-all cursor-pointer ${
                    state === 'unlocked' 
                      ? 'bg-rose-500/20 border-rose-500/50 text-rose-400' 
                      : 'border-white/5 bg-white/5 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Bereit
                </button>
                <button
                  onClick={() => handleNodeStateChange('in_progress')}
                  className={`rounded-lg px-2.5 py-1.5 text-xs font-bold border transition-all cursor-pointer ${
                    state === 'in_progress' 
                      ? 'bg-amber-500/20 border-amber-500/50 text-amber-400' 
                      : 'border-white/5 bg-white/5 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Lernen
                </button>
                <button
                  onClick={() => handleNodeStateChange('completed')}
                  className={`rounded-lg px-2.5 py-1.5 text-xs font-bold border transition-all cursor-pointer ${
                    state === 'completed' 
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' 
                      : 'border-white/5 bg-white/5 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Erledigt
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content Tabs (Markdown description) */}
        <div className="border-t border-white/5 pt-4 space-y-4">
          <div className="prose prose-invert max-w-none text-sm leading-relaxed text-slate-300">
            <ReactMarkdown>{activeNode.content_markdown}</ReactMarkdown>
          </div>
          
          {/* Practice Task */}
          {activeNode.practice_task && (
            <div className="rounded-xl border border-white/5 bg-slate-950/40 p-4">
              <h4 className="flex items-center space-x-2 text-xs font-bold tracking-wider text-rose-400 uppercase">
                <ClipboardCheck className="h-4 w-4" />
                <span>Praxisaufgabe</span>
              </h4>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">{activeNode.practice_task}</p>
            </div>
          )}

          {/* Quality Criteria */}
          {activeNode.quality_criteria && (
            <div className="rounded-xl border border-white/5 bg-slate-950/40 p-4">
              <h4 className="flex items-center space-x-2 text-xs font-bold tracking-wider text-violet-400 uppercase">
                <CheckCircle2 className="h-4 w-4" />
                <span>Qualitätskriterien</span>
              </h4>
              <div className="mt-2 text-xs text-slate-300 whitespace-pre-line leading-relaxed">
                {activeNode.quality_criteria}
              </div>
            </div>
          )}

          {/* Resources */}
          {activeNode.resources_markdown && (
            <div className="rounded-xl border border-white/5 bg-slate-950/40 p-4">
              <h4 className="flex items-center space-x-2 text-xs font-bold tracking-wider text-emerald-400 uppercase">
                <Link2 className="h-4 w-4" />
                <span>Ressourcen & Links</span>
              </h4>
              <div className="mt-2 text-xs text-slate-300 leading-relaxed resources-markdown">
                <ReactMarkdown>{activeNode.resources_markdown}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Project details view
  const renderProjectView = () => {
    if (!activeProject) return null;
    
    // Nodes required for this project
    const projectNodes = nodes.filter(n => activeProject.required_node_ids.includes(n.id))
      .sort((a, b) => a.level - b.level);

    return (
      <div className="flex flex-col space-y-6">
        <div>
          <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-xs font-bold text-amber-400">
            Projektpfad
          </span>
          <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">{activeProject.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">{activeProject.summary}</p>
        </div>

        {/* Artifact Description */}
        <div className="rounded-xl border border-white/5 bg-slate-950/60 p-4">
          <h3 className="text-xs font-bold tracking-wider text-amber-400 uppercase">Ziel-Artefakt</h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-300">{activeProject.artifact_description}</p>
        </div>

        {/* Project details card */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-white/5 bg-slate-950/30 p-3 text-center">
            <h4 className="text-[10px] font-bold text-violet-400 uppercase">Lernstrategie</h4>
            <p className="mt-1 text-xs text-slate-300 line-clamp-3 leading-normal">{activeProject.learning_strategy}</p>
          </div>
          <div className="rounded-xl border border-white/5 bg-slate-950/30 p-3 text-center">
            <h4 className="text-[10px] font-bold text-emerald-400 uppercase">Technikprinzip</h4>
            <p className="mt-1 text-xs text-slate-300 line-clamp-3 leading-normal">{activeProject.technology_principle}</p>
          </div>
          <div className="rounded-xl border border-white/5 bg-slate-950/30 p-3 text-center">
            <h4 className="text-[10px] font-bold text-rose-400 uppercase">UX-Prinzip</h4>
            <p className="mt-1 text-xs text-slate-300 line-clamp-3 leading-normal">{activeProject.ux_principle}</p>
          </div>
        </div>

        {/* Path Nodes sequence */}
        <div className="border-t border-white/5 pt-4">
          <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase">Benötigte Kompetenzen</h3>
          <div className="mt-3 space-y-2">
            {projectNodes.map((n, idx) => {
              const state = completionStates[n.id] || 'locked';
              return (
                <button
                  key={n.id}
                  onClick={() => {
                    setSelectedNodeId(n.id);
                  }}
                  className="flex w-full items-center justify-between rounded-xl border border-white/5 bg-slate-950/40 p-3 text-left hover:bg-slate-950 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-slate-400">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-white">{n.title}</h4>
                      <p className="text-[10px] text-slate-500">Stufe {n.level} • {n.category}</p>
                    </div>
                  </div>
                  <div>
                    {state === 'completed' && <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400" />}
                    {state === 'in_progress' && <Clock className="h-4.5 w-4.5 text-amber-400 animate-pulse" />}
                    {state === 'unlocked' && <Circle className="h-4.5 w-4.5 text-rose-500" />}
                    {state === 'locked' && <Lock className="h-4.5 w-4.5 text-slate-600" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Definition of Done */}
        <div className="rounded-xl border border-white/5 bg-slate-950/60 p-4">
          <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase">Definition of Done (DoD)</h3>
          <div className="mt-2 text-xs leading-relaxed text-slate-300 whitespace-pre-line">
            {activeProject.definition_of_done}
          </div>
        </div>

        {/* Markdown description of path */}
        <div className="prose prose-invert max-w-none text-xs leading-relaxed text-slate-300">
          <ReactMarkdown>{activeProject.content_markdown}</ReactMarkdown>
        </div>
      </div>
    );
  };

  return (
    <div className="glass-panel-heavy fixed top-16 right-0 z-30 h-[calc(100vh-64px)] w-full overflow-y-auto border-l border-white/10 shadow-2xl transition-all sm:w-110 md:w-128 lg:w-144">
      {/* Sidebar Controls Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/5 bg-slate-950/90 px-4 py-3">
        <div className="flex space-x-1">
          <button
            className="rounded-lg px-3 py-1.5 text-xs font-bold bg-white/10 text-white shadow-sm"
          >
            Inhalt
          </button>
        </div>

        <div className="flex items-center space-x-1.5">
          {activeProject && activeNode && (
            <button
              onClick={() => setSelectedNodeId(null)}
              className="flex items-center space-x-1 rounded-lg border border-white/10 bg-slate-900 px-2 py-1 text-[10px] font-bold text-slate-400 hover:bg-slate-800 transition-colors"
            >
              <span>Zum Projektpfad</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          )}
          <button
            onClick={handleClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6">
        {activeNode ? renderNodeView() : renderProjectView()}
      </div>
    </div>
  );
};
