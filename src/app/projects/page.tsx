'use client';

import React from 'react';
import { useSkillTree } from '../../context/SkillTreeContext';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, Award, ArrowRight, CheckCircle2, 
  Map, BookOpen, Layers, Lightbulb 
} from 'lucide-react';

export default function ProjectsPage() {
  const router = useRouter();
  const { 
    projects, 
    nodes, 
    completionStates, 
    setSelectedProjectId,
    setSelectedNodeId
  } = useSkillTree();

  const handleShowOnTree = (projectId: string) => {
    setSelectedProjectId(projectId);
    setSelectedNodeId(null); // Clear selected node so it focuses on project path
    router.push('/skilltree');
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">Projektpfade</h1>
        <p className="mt-2 text-sm text-slate-400">
          Wähle einen Projektpfad, um die dafür notwendigen Kompetenzen gebündelt zu erwerben und deine Lernapp zu entwickeln.
        </p>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((project) => {
          // Calculate progress for this specific project
          const totalNodesCount = project.required_node_ids.length;
          const completedNodesCount = project.required_node_ids.filter(
            (id: string) => completionStates[id] === 'completed'
          ).length;
          const progressPercent = totalNodesCount > 0 
            ? Math.round((completedNodesCount / totalNodesCount) * 100) 
            : 0;

          return (
            <div 
              key={project.id}
              className="glass-panel flex flex-col justify-between rounded-2xl p-6 border border-white/5 shadow-xl transition-all hover:border-white/10"
            >
              <div className="space-y-4">
                
                {/* Top Badge and Progress */}
                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 px-2.5 py-0.5 text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                    <Sparkles className="h-3 w-3 animate-pulse" />
                    <span>Artefakt-Stufe</span>
                  </span>
                  
                  {progressPercent === 100 && (
                    <span className="flex items-center space-x-1 text-xs font-bold text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Bereit zum Bauen!</span>
                    </span>
                  )}
                </div>

                {/* Title & Summary */}
                <div>
                  <h2 className="text-xl font-bold text-white">{project.title}</h2>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">{project.summary}</p>
                </div>

                {/* Completion Progress Bar */}
                <div className="rounded-xl border border-white/3 bg-slate-950/40 p-3.5">
                  <div className="mb-1.5 flex items-center justify-between text-[11px] font-medium text-slate-400">
                    <span>Pfad-Vollständigkeit</span>
                    <span className="font-semibold text-rose-400">{progressPercent}% ({completedNodesCount}/{totalNodesCount} Skills)</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 to-rose-500 transition-all duration-500" 
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Core Principles Cards */}
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 pt-2">
                  <div className="rounded-xl bg-slate-950/30 p-3 border border-white/3">
                    <h4 className="text-[9px] font-bold text-violet-400 uppercase tracking-wide">Didaktik</h4>
                    <p className="mt-1 text-[10px] text-slate-300 leading-snug line-clamp-3">{project.learning_strategy}</p>
                  </div>
                  <div className="rounded-xl bg-slate-950/30 p-3 border border-white/3">
                    <h4 className="text-[9px] font-bold text-emerald-400 uppercase tracking-wide">Technik</h4>
                    <p className="mt-1 text-[10px] text-slate-300 leading-snug line-clamp-3">{project.technology_principle}</p>
                  </div>
                  <div className="rounded-xl bg-slate-950/30 p-3 border border-white/3">
                    <h4 className="text-[9px] font-bold text-rose-400 uppercase tracking-wide">UX / UI</h4>
                    <p className="mt-1 text-[10px] text-slate-300 leading-snug line-clamp-3">{project.ux_principle}</p>
                  </div>
                </div>

                {/* Artifact definition preview */}
                <div className="rounded-xl border border-white/3 bg-slate-950/20 p-3.5 space-y-1">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide">Ziel-Artefakt:</span>
                  <p className="text-[10px] text-slate-300 leading-relaxed">{project.artifact_description}</p>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row pt-4 border-t border-white/5">
                <button
                  onClick={() => handleShowOnTree(project.id)}
                  className="flex flex-1 items-center justify-center space-x-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-rose-600 py-2.5 text-xs font-bold text-white shadow-md hover:from-violet-500 hover:to-rose-500 transition-all cursor-pointer"
                >
                  <Map className="h-4 w-4" />
                  <span>Auf dem Skilltree visualisieren</span>
                </button>
                
                <button
                  onClick={() => {
                    setSelectedProjectId(project.id);
                    setSelectedNodeId(null);
                    router.push('/skilltree');
                  }}
                  className="flex items-center justify-center space-x-1 rounded-xl border border-white/5 bg-slate-900 px-4 py-2.5 text-xs font-bold text-slate-300 hover:bg-slate-800 transition-all cursor-pointer"
                >
                  <span>Details öffnen</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
