'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSkillTree } from '../../../context/SkillTreeContext';
import Link from 'next/link';
import { 
  ArrowLeft, CheckCircle2, Circle, Clock, Lock, 
  Sparkles, ChevronRight, BookOpen, ExternalLink, HelpCircle 
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function SkillDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { 
    nodes, 
    edges, 
    completionStates, 
    updateNodeState 
  } = useSkillTree();

  const node = nodes.find(n => n.slug === slug) || null;

  if (!node) {
    return (
      <div className="flex h-[calc(100vh-64px)] w-full flex-col items-center justify-center bg-slate-950 text-slate-400">
        <span className="text-sm font-semibold text-rose-400">Kompetenz &quot;{slug}&quot; nicht gefunden.</span>
        <button 
          onClick={() => router.push('/skills')}
          className="mt-4 flex items-center space-x-2 text-xs font-bold text-slate-300 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Zurück zur Übersicht</span>
        </button>
      </div>
    );
  }

  const state = completionStates[node.id] || 'locked';

  // Find prerequisites (incoming edges)
  const prereqEdges = edges.filter(e => e.target_node_id === node.id);
  const prereqNodes = nodes.filter(n => prereqEdges.some(e => e.source_node_id === n.id));

  // Find downstream skills unlocked (outgoing edges)
  const downstreamEdges = edges.filter(e => e.source_node_id === node.id);
  const downstreamNodes = nodes.filter(n => downstreamEdges.some(e => e.target_node_id === n.id));

  const handleStateChange = async (newState: 'unlocked' | 'in_progress' | 'completed') => {
    await updateNodeState(node.id, newState);
  };

  const categoryColors = {
    'Learning Design': 'text-violet-400 border-violet-500/20 bg-violet-500/5 ring-violet-500/10',
    'UX Design': 'text-rose-400 border-rose-500/20 bg-rose-500/5 ring-rose-500/10',
    'AI Design': 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5 ring-emerald-500/10',
    'Data Design': 'text-blue-400 border-blue-500/20 bg-blue-500/5 ring-blue-500/10',
    'Product Design': 'text-amber-400 border-amber-500/20 bg-amber-500/5 ring-amber-500/10'
  };

  const colorStyle = categoryColors[node.category as keyof typeof categoryColors] || categoryColors['Learning Design'];

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      
      {/* Back navigation */}
      <button 
        onClick={() => router.back()}
        className="flex items-center space-x-2 text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Zurück</span>
      </button>

      {/* Main Layout Card */}
      <div className="glass-panel rounded-2xl p-6 md:p-8 space-y-6">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${colorStyle}`}>
            {node.category}
          </span>
          <span className="rounded-full border border-white/10 bg-slate-900 px-3 py-1 text-xs font-semibold text-slate-400">
            Stufe {node.level}
          </span>
          {node.is_milestone && (
            <span className="flex items-center space-x-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-400 shadow-md shadow-amber-500/5">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              <span>Meilenstein-Projekt</span>
            </span>
          )}
        </div>

        {/* Title */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {node.title}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            {node.summary}
          </p>
        </div>

        {/* Completion Control */}
        <div className="rounded-xl border border-white/5 bg-slate-950/60 p-4 sm:p-5">
          <h3 className="text-xs font-semibold tracking-wider text-slate-500 uppercase">Lernfortschritt</h3>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            
            {/* Status indicator */}
            <div className="flex items-center space-x-2.5">
              {state === 'locked' && (
                <>
                  <Lock className="h-6 w-6 text-slate-600" />
                  <div>
                    <span className="text-sm font-bold text-slate-400">Gesperrt</span>
                    <p className="text-[10px] text-slate-500">Du musst erst alle Voraussetzungen abschliessen.</p>
                  </div>
                </>
              )}
              {state === 'unlocked' && (
                <>
                  <Circle className="h-6 w-6 text-rose-500 animate-pulse" />
                  <div>
                    <span className="text-sm font-bold text-rose-400">Verfügbar</span>
                    <p className="text-[10px] text-slate-500">Bereit für die Bearbeitung.</p>
                  </div>
                </>
              )}
              {state === 'in_progress' && (
                <>
                  <Clock className="h-6 w-6 text-amber-400 animate-spin-slow" />
                  <div>
                    <span className="text-sm font-bold text-amber-400">In Bearbeitung</span>
                    <p className="text-[10px] text-slate-500">Du arbeitest aktuell an dieser Kompetenz.</p>
                  </div>
                </>
              )}
              {state === 'completed' && (
                <>
                  <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                  <div>
                    <span className="text-sm font-bold text-emerald-400">Abgeschlossen</span>
                    <p className="text-[10px] text-slate-500">Kompetenz erfolgreich erworben!</p>
                  </div>
                </>
              )}
            </div>

            {/* Actions buttons */}
            {state !== 'locked' && (
              <div className="flex space-x-2 self-end sm:self-auto">
                <button
                  onClick={() => handleStateChange('unlocked')}
                  className={`rounded-xl px-4 py-2 text-xs font-bold border transition-all cursor-pointer ${
                    state === 'unlocked' 
                      ? 'bg-rose-500/20 border-rose-500/50 text-rose-400' 
                      : 'border-white/5 bg-white/5 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Verfügbar
                </button>
                <button
                  onClick={() => handleStateChange('in_progress')}
                  className={`rounded-xl px-4 py-2 text-xs font-bold border transition-all cursor-pointer ${
                    state === 'in_progress' 
                      ? 'bg-amber-500/20 border-amber-500/50 text-amber-400' 
                      : 'border-white/5 bg-white/5 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Lernen
                </button>
                <button
                  onClick={() => handleStateChange('completed')}
                  className={`rounded-xl px-4 py-2 text-xs font-bold border transition-all cursor-pointer ${
                    state === 'completed' 
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' 
                      : 'border-white/5 bg-white/5 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Abschliessen
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Details (Markdown content) */}
        <div className="border-t border-white/5 pt-6 space-y-6">
          <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed">
            <ReactMarkdown>{node.content_markdown}</ReactMarkdown>
          </div>

          {/* Mini-Practice Task Section */}
          {node.practice_task && (
            <div className="rounded-2xl border border-white/5 bg-slate-950/40 p-5 space-y-2">
              <h4 className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-rose-400">
                <CheckCircle2 className="h-4.5 w-4.5" />
                <span>Praxisaufgabe</span>
              </h4>
              <p className="text-xs leading-relaxed text-slate-300">{node.practice_task}</p>
            </div>
          )}

          {/* Quality Criteria */}
          {node.quality_criteria && (
            <div className="rounded-2xl border border-white/5 bg-slate-950/40 p-5 space-y-2">
              <h4 className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-violet-400">
                <HelpCircle className="h-4.5 w-4.5" />
                <span>Qualitätskriterien</span>
              </h4>
              <div className="text-xs leading-relaxed text-slate-300 whitespace-pre-line">
                {node.quality_criteria}
              </div>
            </div>
          )}

          {/* Resources */}
          {node.resources_markdown && (
            <div className="rounded-2xl border border-white/5 bg-slate-950/40 p-5 space-y-2">
              <h4 className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <ExternalLink className="h-4.5 w-4.5" />
                <span>Links &amp; Ressourcen</span>
              </h4>
              <div className="text-xs leading-relaxed text-slate-300 resources-markdown">
                <ReactMarkdown>{node.resources_markdown}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>

        {/* Prerequisites and Leads To connections */}
        <div className="border-t border-white/5 pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Prerequisites */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase">Voraussetzungen</h3>
            {prereqNodes.length === 0 ? (
              <p className="text-xs text-slate-500">Keine Voraussetzungen (Startknoten).</p>
            ) : (
              <div className="flex flex-col gap-1.5">
                {prereqNodes.map(prereq => (
                  <Link 
                    key={prereq.id} 
                    href={`/skills/${prereq.slug}`}
                    className="flex items-center space-x-2 rounded-lg bg-white/3 border border-white/3 px-3 py-2 text-xs font-bold text-slate-300 hover:bg-white/5 hover:text-white"
                  >
                    <ChevronRight className="h-3 w-3 text-slate-500" />
                    <span>{prereq.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Unlocks */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase">Schaltet frei</h3>
            {downstreamNodes.length === 0 ? (
              <p className="text-xs text-slate-500">Schaltet keine weiteren Einzelknoten frei (Endknoten).</p>
            ) : (
              <div className="flex flex-col gap-1.5">
                {downstreamNodes.map(down => (
                  <Link 
                    key={down.id} 
                    href={`/skills/${down.slug}`}
                    className="flex items-center space-x-2 rounded-lg bg-white/3 border border-white/3 px-3 py-2 text-xs font-bold text-slate-300 hover:bg-white/5 hover:text-white"
                  >
                    <ChevronRight className="h-3 w-3 text-slate-500" />
                    <span>{down.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
