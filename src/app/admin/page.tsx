'use client';

import React, { useState } from 'react';
import { useSkillTree } from '../../context/SkillTreeContext';
import { 
  ShieldAlert, ShieldCheck, Key, Settings, Sparkles, 
  Layers, Plus, Trash2, Edit2, Share2, HelpCircle 
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();
  const {
    nodes,
    edges,
    projects,
    adminMode,
    setAdminMode,
    createNode,
    saveEdge,
    deleteEdge,
    setSelectedNodeId
  } = useSkillTree();

  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);

  // New Node Form State
  const [newTitle, setNewTitle] = useState('');
  const [newSummary, setNewSummary] = useState('');
  const [newCategory, setNewCategory] = useState<'Learning Design' | 'UX Design' | 'AI Design' | 'Data Design' | 'Product Design'>('Learning Design');
  const [newLevel, setNewLevel] = useState(1);
  const [newStatus, setNewStatus] = useState<'draft' | 'reviewed' | 'stable' | 'archived'>('draft');
  const [newContent, setNewContent] = useState('');
  const [newPractice, setNewPractice] = useState('');
  const [newCriteria, setNewCriteria] = useState('');
  const [newResources, setNewResources] = useState('');
  const [newPosX, setNewPosX] = useState(100);
  const [newPosY, setNewPosY] = useState(100);
  const [newIsMilestone, setNewIsMilestone] = useState(false);

  // New Connection Form State
  const [sourceId, setSourceId] = useState('');
  const [targetId, setTargetId] = useState('');
  const [relType, setRelType] = useState<'prerequisite' | 'leads_to' | 'required_for_project'>('prerequisite');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'vibe2026') {
      setAdminMode(true);
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
    }
  };

  const handleCreateNode = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const slug = newTitle.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      
      await createNode({
        slug,
        title: newTitle,
        summary: newSummary,
        category: newCategory,
        level: newLevel,
        status: newStatus,
        content_markdown: newContent || `# ${newTitle}\n\nInhalte beschreiben...`,
        practice_task: newPractice,
        quality_criteria: newCriteria,
        resources_markdown: newResources,
        position_x: newPosX,
        position_y: newPosY,
        is_milestone: newIsMilestone
      });

      // Reset
      setNewTitle('');
      setNewSummary('');
      setNewContent('');
      setNewPractice('');
      setNewCriteria('');
      setNewResources('');
      setNewIsMilestone(false);
      
      alert('Knoten erfolgreich erstellt!');
    } catch (err: any) {
      alert(err.message || 'Fehler beim Erstellen.');
    }
  };

  const handleCreateEdge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourceId || !targetId) {
      alert('Bitte Quelle und Ziel auswählen.');
      return;
    }
    if (sourceId === targetId) {
      alert('Quelle und Ziel dürfen nicht identisch sein.');
      return;
    }
    try {
      await saveEdge({
        source_node_id: sourceId,
        target_node_id: targetId,
        relation_type: relType
      });
      alert('Verbindung erfolgreich erstellt!');
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDeleteEdge = async (edgeId: string) => {
    if (confirm('Diese Verbindung wirklich löschen?')) {
      try {
        await deleteEdge(edgeId);
        alert('Verbindung gelöscht.');
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  // Auth Protection screen
  if (!adminMode) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4">
        <div className="glass-panel w-full rounded-2xl p-6 text-center space-y-5 border border-white/5">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
            <ShieldAlert className="h-6 w-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Admin-Bereich geschützt</h2>
            <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">
              Bitte gib den Admin-Passcode ein, um neue Skills, Verbindungen und Versionen zu verwalten.
            </p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-3">
            <div className="relative">
              <Key className="absolute top-3 left-3 h-4 w-4 text-slate-500" />
              <input
                type="password"
                placeholder="Passcode eingeben..."
                value={passcode}
                onChange={e => setPasscode(e.target.value)}
                className={`w-full rounded-xl border bg-slate-950/60 py-2.5 pr-4 pl-9 text-center text-sm text-white placeholder-slate-500 outline-none transition-colors ${
                  passcodeError ? 'border-rose-500' : 'border-white/5 focus:border-amber-500/30'
                }`}
                required
              />
            </div>
            {passcodeError && (
              <p className="text-[10px] font-semibold text-rose-400">Falscher Passcode. Tipp: vibe2026</p>
            )}
            <button
              type="submit"
              className="w-full rounded-xl bg-amber-500 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-colors cursor-pointer"
            >
              Freischalten
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Admin Panel Main Dashboard
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-white/5 pb-5 sm:flex-row sm:items-center">
        <div>
          <h1 className="flex items-center space-x-2 text-2xl font-extrabold text-white sm:text-3xl">
            <ShieldCheck className="h-7 w-7 text-amber-400" />
            <span>Admin-Cockpit</span>
          </h1>
          <p className="mt-1.5 text-xs text-slate-400">
            Knoten erstellen, Verbindungen bearbeiten und Versionsgeschichten einsehen.
          </p>
        </div>
        <button
          onClick={() => setAdminMode(false)}
          className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-xs font-bold text-rose-400 hover:bg-rose-500/20 transition-all cursor-pointer"
        >
          Admin-Modus verlassen
        </button>
      </div>

      {/* Metrics Column */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-white/5 bg-slate-950/40 p-4">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Gesamt-Skills</span>
          <p className="mt-1 text-2xl font-extrabold text-white">{nodes.length}</p>
        </div>
        <div className="rounded-xl border border-white/5 bg-slate-950/40 p-4">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Verbindungen</span>
          <p className="mt-1 text-2xl font-extrabold text-white">{edges.length}</p>
        </div>
        <div className="rounded-xl border border-white/5 bg-slate-950/40 p-4">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Projektpfade</span>
          <p className="mt-1 text-2xl font-extrabold text-white">{projects.length}</p>
        </div>
        <div className="rounded-xl border border-white/5 bg-slate-950/40 p-4">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Stabile Skills</span>
          <p className="mt-1 text-2xl font-extrabold text-emerald-400">
            {nodes.filter(n => n.status === 'stable').length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        {/* Left Column: List of existing Skills */}
        <div className="glass-panel rounded-2xl p-5 border border-white/5 space-y-4 lg:col-span-2">
          <h2 className="text-base font-bold text-white">Kompetenz-Knoten bearbeiten</h2>
          <p className="text-[11px] text-slate-400 leading-normal">
            Klicke auf das Stift-Icon eines Skills. Es öffnet sich das Bearbeitungs-Panel im Skilltree, wo du auch die Versionshistorie einsehen kannst.
          </p>
          
          <div className="mt-2 divide-y divide-white/5 max-h-128 overflow-y-auto pr-2">
            {nodes.map((n) => (
              <div key={n.id} className="flex items-center justify-between py-2 text-xs">
                <div>
                  <h4 className="font-bold text-white">{n.title}</h4>
                  <p className="text-[10px] text-slate-500">Stufe {n.level} • {n.category}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                    n.status === 'stable' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                    n.status === 'reviewed' ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20' : 
                    'bg-slate-900 text-slate-400 border border-white/5'
                  }`}>
                    {n.status}
                  </span>
                  
                  <button
                    onClick={() => {
                      setSelectedNodeId(n.id);
                      router.push('/skilltree');
                    }}
                    className="rounded p-1 text-slate-400 hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
                    title="Im Skilltree-Panel bearbeiten"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Connection Manager */}
        <div className="glass-panel rounded-2xl p-5 border border-white/5 space-y-5">
          <h2 className="text-base font-bold text-white">Verbindungen verwalten</h2>
          
          {/* Create Connection Form */}
          <form onSubmit={handleCreateEdge} className="space-y-3.5 text-xs text-slate-300">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase">Quelle (Vorgänger)</label>
              <select
                value={sourceId}
                onChange={e => setSourceId(e.target.value)}
                className="mt-1 w-full rounded-lg border border-white/5 bg-slate-950 p-2 text-slate-200"
                required
              >
                <option value="">-- Quelle wählen --</option>
                {nodes.map(n => (
                  <option key={n.id} value={n.id}>{n.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase">Ziel (Nachfolger)</label>
              <select
                value={targetId}
                onChange={e => setTargetId(e.target.value)}
                className="mt-1 w-full rounded-lg border border-white/5 bg-slate-950 p-2 text-slate-200"
                required
              >
                <option value="">-- Ziel wählen --</option>
                {nodes.map(n => (
                  <option key={n.id} value={n.id}>{n.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase">Verbindungstyp</label>
              <select
                value={relType}
                onChange={e => setRelType(e.target.value as any)}
                className="mt-1 w-full rounded-lg border border-white/5 bg-slate-950 p-2 text-slate-200"
              >
                <option value="prerequisite">Prerequisite (Voraussetzung)</option>
                <option value="leads_to">Leads To (Führt zu)</option>
                <option value="required_for_project">Required for Project</option>
              </select>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center space-x-1 rounded-xl bg-violet-600 py-2.5 text-xs font-bold text-white hover:bg-violet-500 transition-colors cursor-pointer"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>Verbindung erstellen</span>
            </button>
          </form>

          {/* List of existing Connections */}
          <div className="border-t border-white/5 pt-4 space-y-3">
            <h3 className="text-xs font-bold text-white">Bestehende Verbindungen</h3>
            <div className="max-h-60 overflow-y-auto divide-y divide-white/3 pr-1 text-[11px] text-slate-400">
              {edges.map((edge) => {
                const srcNode = nodes.find(n => n.id === edge.source_node_id);
                const tgtNode = nodes.find(n => n.id === edge.target_node_id);
                return (
                  <div key={edge.id} className="flex items-center justify-between py-1.5">
                    <span className="line-clamp-1 flex-1">
                      {srcNode?.title} <span className="text-rose-400">➔</span> {tgtNode?.title}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteEdge(edge.id)}
                      className="rounded p-1 text-slate-500 hover:bg-rose-500/10 hover:text-rose-400 transition-colors shrink-0 cursor-pointer"
                      title="Verbindung löschen"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      {/* Big Form: Create New Skill Node */}
      <div className="glass-panel rounded-2xl p-6 border border-white/5 space-y-4">
        <h2 className="flex items-center space-x-2 text-base font-bold text-white">
          <Plus className="h-5 w-5 text-amber-400" />
          <span>Neuen Kompetenz-Knoten anlegen</span>
        </h2>
        
        <form onSubmit={handleCreateNode} className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-xs text-slate-300">
          <div className="space-y-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase">Titel</label>
              <input
                type="text"
                placeholder="z.B. Worked Examples..."
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                className="mt-1 w-full rounded-lg border border-white/5 bg-slate-950 p-2.5 text-white outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase">Kurzbeschreibung (Summary)</label>
              <textarea
                placeholder="Was ist dieser Skill in 1-2 Sätzen?"
                value={newSummary}
                onChange={e => setNewSummary(e.target.value)}
                rows={2}
                className="mt-1 w-full rounded-lg border border-white/5 bg-slate-950 p-2.5 text-white outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase">Kategorie</label>
                <select
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value as any)}
                  className="mt-1 w-full rounded-lg border border-white/5 bg-slate-950 p-2.5 text-white outline-none"
                >
                  <option value="Learning Design">Learning Design</option>
                  <option value="UX Design">UX Design</option>
                  <option value="AI Design">AI Design</option>
                  <option value="Data Design">Data Design</option>
                  <option value="Product Design">Product Design</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase">Level (Stufe 1-9)</label>
                <input
                  type="number"
                  min={1}
                  max={9}
                  value={newLevel}
                  onChange={e => setNewLevel(Number(e.target.value))}
                  className="mt-1 w-full rounded-lg border border-white/5 bg-slate-950 p-2.5 text-white outline-none"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase">Status</label>
                <select
                  value={newStatus}
                  onChange={e => setNewStatus(e.target.value as any)}
                  className="mt-1 w-full rounded-lg border border-white/5 bg-slate-950 p-2.5 text-white outline-none"
                >
                  <option value="draft">Draft (Entwurf)</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="stable">Stable</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase">Position X (Grid)</label>
                <input
                  type="number"
                  value={newPosX}
                  onChange={e => setNewPosX(Number(e.target.value))}
                  className="mt-1 w-full rounded-lg border border-white/5 bg-slate-950 p-2.5 text-white outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase">Position Y (Grid)</label>
                <input
                  type="number"
                  value={newPosY}
                  onChange={e => setNewPosY(Number(e.target.value))}
                  className="mt-1 w-full rounded-lg border border-white/5 bg-slate-950 p-2.5 text-white outline-none"
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 py-1.5">
              <input
                type="checkbox"
                id="isMilestone"
                checked={newIsMilestone}
                onChange={e => setNewIsMilestone(e.target.checked)}
                className="h-4 w-4 rounded bg-slate-950 border-white/5"
              />
              <label htmlFor="isMilestone" className="font-semibold text-slate-300">
                Ist dieser Knoten ein Haupt-Meilenstein (Gelber Hintergrund)?
              </label>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase">Markdown-Beschreibung &amp; Syllabus</label>
              <textarea
                placeholder="## Kurzbeschreibung&#10;Was ist dieser Skill...&#10;&#10;## Warum ist das für Learning Apps relevant?&#10;..."
                value={newContent}
                onChange={e => setNewContent(e.target.value)}
                rows={6}
                className="mt-1 w-full font-mono text-xs rounded-lg border border-white/5 bg-slate-950 p-2.5 text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase">Praxisaufgabe</label>
              <textarea
                placeholder="Welche konkrete Aufgabe soll gelöst werden?"
                value={newPractice}
                onChange={e => setNewPractice(e.target.value)}
                rows={2}
                className="mt-1 w-full rounded-lg border border-white/5 bg-slate-950 p-2.5 text-white outline-none"
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase">Qualitätskriterien</label>
                <textarea
                  placeholder="Z.B. - App läuft fehlerfrei..."
                  value={newCriteria}
                  onChange={e => setNewCriteria(e.target.value)}
                  rows={2}
                  className="mt-1 w-full rounded-lg border border-white/5 bg-slate-950 p-2.5 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase">Ressourcen (Markdown Links)</label>
                <textarea
                  placeholder="Z.B. - [Hattie Paper](#)"
                  value={newResources}
                  onChange={e => setNewResources(e.target.value)}
                  rows={2}
                  className="mt-1 w-full font-mono text-xs rounded-lg border border-white/5 bg-slate-950 p-2.5 text-white outline-none"
                />
              </div>
            </div>
          </div>

          <div className="sm:col-span-2 pt-2 border-t border-white/5">
            <button
              type="submit"
              className="flex w-full items-center justify-center space-x-1.5 rounded-xl bg-amber-500 py-3 text-xs font-bold text-slate-950 hover:bg-amber-400 transition-colors cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Skill-Knoten anlegen</span>
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
