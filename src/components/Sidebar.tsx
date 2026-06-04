'use client';

import React, { useState, useEffect } from 'react';
import { useSkillTree } from '../context/SkillTreeContext';
import { 
  X, CheckCircle2, Circle, Clock, Lock, Sparkles, BookOpen, 
  Settings, History, Save, Trash2, ArrowRight, ClipboardCheck, Link2 
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { NodeVersion } from '../lib/dbClient';

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
    adminMode,
    saveNode,
    deleteNode,
    getNodeVersions,
    restoreNodeVersion
  } = useSkillTree();

  const [activeTab, setActiveTab] = useState<'view' | 'edit' | 'history'>('view');
  
  // Node Form State
  const [nodeTitle, setNodeTitle] = useState('');
  const [nodeSummary, setNodeSummary] = useState('');
  const [nodeCategory, setNodeCategory] = useState<'Learning Design' | 'UX Design' | 'AI Design' | 'Data Design' | 'Product Design'>('Learning Design');
  const [nodeLevel, setNodeLevel] = useState(1);
  const [nodeStatus, setNodeStatus] = useState<'draft' | 'reviewed' | 'stable' | 'archived'>('draft');
  const [nodeContent, setNodeContent] = useState('');
  const [nodePractice, setNodePractice] = useState('');
  const [nodeCriteria, setNodeCriteria] = useState('');
  const [nodeResources, setNodeResources] = useState('');
  const [nodePosX, setNodePosX] = useState(0);
  const [nodePosY, setNodePosY] = useState(0);
  const [changeNote, setChangeNote] = useState('');
  
  // Versions
  const [versions, setVersions] = useState<NodeVersion[]>([]);
  const [loadingVersions, setLoadingVersions] = useState(false);

  const activeNode = nodes.find(n => n.id === selectedNodeId) || null;
  const activeProject = projects.find(p => p.id === selectedProjectId) || null;

  // Reset tab and populate form when node changes
  useEffect(() => {
    if (activeNode) {
      setNodeTitle(activeNode.title);
      setNodeSummary(activeNode.summary);
      setNodeCategory(activeNode.category);
      setNodeLevel(activeNode.level);
      setNodeStatus(activeNode.status);
      setNodeContent(activeNode.content_markdown || '');
      setNodePractice(activeNode.practice_task || '');
      setNodeCriteria(activeNode.quality_criteria || '');
      setNodeResources(activeNode.resources_markdown || '');
      setNodePosX(activeNode.position_x);
      setNodePosY(activeNode.position_y);
      setChangeNote('');
      setActiveTab('view');
    }
  }, [activeNode]);

  // Load versions when history tab is active
  useEffect(() => {
    if (activeTab === 'history' && selectedNodeId) {
      setLoadingVersions(true);
      getNodeVersions(selectedNodeId)
        .then(data => setVersions(data))
        .catch(err => console.error(err))
        .finally(() => setLoadingVersions(false));
    }
  }, [activeTab, selectedNodeId, getNodeVersions]);

  if (!activeNode && !activeProject) return null;

  const handleClose = () => {
    setSelectedNodeId(null);
    // Don't close project path unless desired, but for visual clarity let's keep project highlight on
  };

  const handleNodeStateChange = async (state: 'unlocked' | 'in_progress' | 'completed') => {
    if (!selectedNodeId) return;
    await updateNodeState(selectedNodeId, state);
  };

  const handleSaveNode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedNodeId) return;
    try {
      await saveNode(selectedNodeId, {
        title: nodeTitle,
        summary: nodeSummary,
        category: nodeCategory,
        level: nodeLevel,
        status: nodeStatus,
        content_markdown: nodeContent,
        practice_task: nodePractice,
        quality_criteria: nodeCriteria,
        resources_markdown: nodeResources,
        position_x: nodePosX,
        position_y: nodePosY
      }, changeNote || 'Knoten bearbeitet');
      
      setChangeNote('');
      setActiveTab('view');
      alert('Knoten erfolgreich gespeichert!');
    } catch (err: any) {
      alert(err.message || 'Fehler beim Speichern.');
    }
  };

  const handleDeleteNode = async () => {
    if (!selectedNodeId) return;
    if (confirm('Möchtest du diesen Knoten wirklich löschen? Alle Verbindungen gehen verloren.')) {
      try {
        await deleteNode(selectedNodeId);
        alert('Knoten gelöscht.');
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  const handleRestoreVersion = async (versionId: string) => {
    if (confirm('Möchtest du diesen Knoten wirklich auf diese Version zurücksetzen? Der aktuelle Zustand wird als Backup gesichert.')) {
      try {
        await restoreNodeVersion(versionId);
        setActiveTab('view');
        alert('Version wiederhergestellt!');
      } catch (err: any) {
        alert(err.message);
      }
    }
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
            onClick={() => setActiveTab('view')}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'view' 
                ? 'bg-white/10 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Inhalt
          </button>
          
          {adminMode && activeNode && (
            <>
              <button
                onClick={() => setActiveTab('edit')}
                className={`flex items-center space-x-1 rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'edit' 
                    ? 'bg-amber-500/20 text-amber-400' 
                    : 'text-slate-400 hover:text-amber-400/80'
                }`}
              >
                <Settings className="h-3.5 w-3.5" />
                <span>Bearbeiten</span>
              </button>
              
              <button
                onClick={() => setActiveTab('history')}
                className={`flex items-center space-x-1 rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'history' 
                    ? 'bg-violet-500/20 text-violet-400' 
                    : 'text-slate-400 hover:text-violet-400/80'
                }`}
              >
                <History className="h-3.5 w-3.5" />
                <span>Historie</span>
              </button>
            </>
          )}
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
        {activeTab === 'view' && (activeNode ? renderNodeView() : renderProjectView())}

        {/* Node Editor Form */}
        {activeTab === 'edit' && activeNode && (
          <form onSubmit={handleSaveNode} className="space-y-4 text-sm text-slate-300">
            <h3 className="text-base font-bold text-white">Knoten bearbeiten</h3>
            
            <div>
              <label className="block text-xs font-semibold text-slate-400">Titel</label>
              <input
                type="text"
                value={nodeTitle}
                onChange={e => setNodeTitle(e.target.value)}
                className="mt-1 w-full rounded-lg border border-white/5 bg-slate-950/60 p-2.5 text-white outline-none focus:border-amber-500/30"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400">Kurzbeschreibung (Summary)</label>
              <textarea
                value={nodeSummary}
                onChange={e => setNodeSummary(e.target.value)}
                rows={2}
                className="mt-1 w-full rounded-lg border border-white/5 bg-slate-950/60 p-2.5 text-white outline-none focus:border-amber-500/30"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400">Kategorie</label>
                <select
                  value={nodeCategory}
                  onChange={e => setNodeCategory(e.target.value as any)}
                  className="mt-1 w-full rounded-lg border border-white/5 bg-slate-950/60 p-2.5 text-white outline-none focus:border-amber-500/30"
                >
                  <option value="Learning Design">Learning Design</option>
                  <option value="UX Design">UX Design</option>
                  <option value="AI Design">AI Design</option>
                  <option value="Data Design">Data Design</option>
                  <option value="Product Design">Product Design</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400">Level (1-9)</label>
                <input
                  type="number"
                  min={1}
                  max={9}
                  value={nodeLevel}
                  onChange={e => setNodeLevel(Number(e.target.value))}
                  className="mt-1 w-full rounded-lg border border-white/5 bg-slate-950/60 p-2.5 text-white outline-none focus:border-amber-500/30"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400">Status</label>
                <select
                  value={nodeStatus}
                  onChange={e => setNodeStatus(e.target.value as any)}
                  className="mt-1 w-full rounded-lg border border-white/5 bg-slate-950/60 p-2.5 text-white outline-none focus:border-amber-500/30"
                >
                  <option value="draft">Draft (Entwurf)</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="stable">Stable</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-slate-400">Position X</label>
                <input
                  type="number"
                  value={nodePosX}
                  onChange={e => setNodePosX(Number(e.target.value))}
                  className="mt-1 w-full rounded-lg border border-white/5 bg-slate-950/60 p-2.5 text-white outline-none focus:border-amber-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400">Position Y</label>
                <input
                  type="number"
                  value={nodePosY}
                  onChange={e => setNodePosY(Number(e.target.value))}
                  className="mt-1 w-full rounded-lg border border-white/5 bg-slate-950/60 p-2.5 text-white outline-none focus:border-amber-500/30"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400">Markdown-Inhalt (Hauptinhalt)</label>
              <textarea
                value={nodeContent}
                onChange={e => setNodeContent(e.target.value)}
                rows={8}
                className="mt-1 w-full font-mono text-xs rounded-lg border border-white/5 bg-slate-950/60 p-2.5 text-white outline-none focus:border-amber-500/30"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400">Praxisaufgabe</label>
              <textarea
                value={nodePractice}
                onChange={e => setNodePractice(e.target.value)}
                rows={3}
                className="mt-1 w-full rounded-lg border border-white/5 bg-slate-950/60 p-2.5 text-white outline-none focus:border-amber-500/30"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400">Qualitätskriterien</label>
              <textarea
                value={nodeCriteria}
                onChange={e => setNodeCriteria(e.target.value)}
                rows={3}
                className="mt-1 w-full rounded-lg border border-white/5 bg-slate-950/60 p-2.5 text-white outline-none focus:border-amber-500/30"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400">Ressourcen (Markdown Links)</label>
              <textarea
                value={nodeResources}
                onChange={e => setNodeResources(e.target.value)}
                rows={3}
                className="mt-1 w-full font-mono text-xs rounded-lg border border-white/5 bg-slate-950/60 p-2.5 text-white outline-none focus:border-amber-500/30"
              />
            </div>

            {/* Change Note for Version snapshitting */}
            <div className="border-t border-white/5 pt-4">
              <label className="block text-xs font-bold text-amber-400">Änderungsnotiz (für Versionsarchivierung)</label>
              <input
                type="text"
                placeholder="z.B. Praxisaufgabe präzisiert..."
                value={changeNote}
                onChange={e => setChangeNote(e.target.value)}
                className="mt-1 w-full rounded-lg border border-amber-500/20 bg-slate-950/60 p-2.5 text-white outline-none focus:border-amber-500/40"
                required
              />
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                type="submit"
                className="flex flex-1 items-center justify-center space-x-1.5 rounded-lg bg-amber-500 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-colors cursor-pointer"
              >
                <Save className="h-4 w-4" />
                <span>Knoten speichern</span>
              </button>
              
              <button
                type="button"
                onClick={handleDeleteNode}
                className="flex items-center justify-center rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 text-rose-400 hover:bg-rose-500/20 transition-colors cursor-pointer"
                title="Knoten löschen"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </form>
        )}

        {/* Node History Versions List */}
        {activeTab === 'history' && activeNode && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Versionshistorie</h3>
            
            {loadingVersions ? (
              <p className="text-xs text-slate-400">Lade Versionen...</p>
            ) : versions.length === 0 ? (
              <p className="text-xs text-slate-500">Keine vorherigen Versionen vorhanden.</p>
            ) : (
              <div className="space-y-3">
                {versions.map((ver) => (
                  <div key={ver.id} className="rounded-xl border border-white/5 bg-slate-950/40 p-4 space-y-2">
                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span>{new Date(ver.created_at).toLocaleString('de-CH')}</span>
                      <span className="font-semibold text-violet-400">Snapshot ID: {ver.id}</span>
                    </div>
                    
                    <p className="text-xs font-semibold text-slate-300">
                      &quot;{ver.change_note || 'Keine Notiz hinterlegt'}&quot;
                    </p>
                    
                    <div className="flex justify-between items-end border-t border-white/5 pt-2 mt-2">
                      <span className="text-[10px] text-slate-500">
                        Kategorie: {ver.snapshot.category} • Stufe: {ver.snapshot.level}
                      </span>
                      <button
                        onClick={() => handleRestoreVersion(ver.id)}
                        className="rounded bg-violet-600 px-2.5 py-1 text-[10px] font-bold text-white hover:bg-violet-500 transition-colors cursor-pointer"
                      >
                        Wiederherstellen
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
