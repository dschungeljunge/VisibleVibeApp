'use client';

import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { useSkillTree } from '../context/SkillTreeContext';
import { Lock, CheckCircle2, Clock, PlayCircle, Sparkles } from 'lucide-react';

interface CustomNodeProps {
  id: string;
  data: {
    title: string;
    category: string;
    level: number;
    is_milestone?: boolean;
    summary: string;
  };
}

export const CustomNode: React.FC<CustomNodeProps> = ({ id, data }) => {
  const { 
    completionStates, 
    selectedNodeId, 
    selectedProjectId,
    projects,
    hoveredNodeId,
    setHoveredNodeId
  } = useSkillTree();

  const state = completionStates[id] || 'locked';
  const isSelected = selectedNodeId === id;
  const isHovered = hoveredNodeId === id;
  
  // Project highlight logic
  const activeProject = projects.find(p => p.id === selectedProjectId) || null;
  const isNodeInActiveProject = activeProject?.required_node_ids.includes(id) || false;

  // Visual styling parameters based on category
  const categoryStyles = {
    'Learning Design': {
      border: 'border-violet-500/40',
      activeBorder: 'border-violet-400 border-2',
      glow: 'shadow-[0_0_15px_rgba(139,92,246,0.3)]',
      bgGlow: 'bg-violet-500/10',
      text: 'text-violet-400',
      badge: 'bg-violet-500/10 text-violet-400 border-violet-500/20'
    },
    'UX Design': {
      border: 'border-rose-500/40',
      activeBorder: 'border-rose-400 border-2',
      glow: 'shadow-[0_0_15px_rgba(244,63,94,0.3)]',
      bgGlow: 'bg-rose-500/10',
      text: 'text-rose-400',
      badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20'
    },
    'AI Design': {
      border: 'border-emerald-500/40',
      activeBorder: 'border-emerald-400 border-2',
      glow: 'shadow-[0_0_15px_rgba(16,185,129,0.3)]',
      bgGlow: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    },
    'Data Design': {
      border: 'border-blue-500/40',
      activeBorder: 'border-blue-400 border-2',
      glow: 'shadow-[0_0_15px_rgba(59,130,246,0.3)]',
      bgGlow: 'bg-blue-500/10',
      text: 'text-blue-400',
      badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
    },
    'Product Design': {
      border: 'border-amber-500/40',
      activeBorder: 'border-amber-400 border-2',
      glow: 'shadow-[0_0_15px_rgba(234,179,8,0.3)]',
      bgGlow: 'bg-amber-500/10',
      text: 'text-amber-400',
      badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
    }
  };

  const style = categoryStyles[data.category as keyof typeof categoryStyles] || categoryStyles['Learning Design'];

  // Base state classes
  let stateClasses = '';
  let shadowClass = '';
  let borderClass = 'border-white/10';

  if (state === 'completed') {
    stateClasses = 'bg-slate-900/90 text-white';
    borderClass = 'border-emerald-500/60 border-2';
    shadowClass = 'shadow-[0_0_20px_rgba(16,185,129,0.25)]';
  } else if (state === 'in_progress') {
    stateClasses = 'bg-slate-900/95 text-white';
    borderClass = 'border-amber-400 border-2';
    shadowClass = 'pulse-glow-product';
  } else if (state === 'unlocked') {
    stateClasses = 'bg-slate-900/80 text-slate-200';
    borderClass = `border-rose-500/50`;
    shadowClass = 'shadow-[0_0_12px_rgba(244,63,94,0.15)]';
  } else {
    // Locked
    stateClasses = 'bg-slate-950/60 text-slate-500 opacity-60 grayscale';
    borderClass = 'border-white/5';
  }

  // Overriding styles for selected/hovered nodes
  if (isSelected) {
    borderClass = 'border-white border-2 scale-105';
    shadowClass = 'shadow-[0_0_25px_rgba(255,255,255,0.25)]';
  } else if (isHovered) {
    borderClass = 'border-white/60 scale-102';
  }

  // Project path highlight border override
  const projectHighlightClass = (selectedProjectId && isNodeInActiveProject && state !== 'locked')
    ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-950 shadow-[0_0_25px_rgba(234,179,8,0.4)]'
    : '';

  return (
    <div
      onMouseEnter={() => setHoveredNodeId(id)}
      onMouseLeave={() => setHoveredNodeId(null)}
      className={`glass-card relative flex w-52 flex-col rounded-2xl p-3.5 transition-all duration-300 ${stateClasses} ${borderClass} ${shadowClass} ${projectHighlightClass}`}
    >
      {/* Handles for connections */}
      {id !== 'kickoff' && (
        <Handle
          type="target"
          position={Position.Left}
          className="!h-2.5 !w-2.5 !bg-slate-300 hover:!scale-125 !transition-transform"
        />
      )}
      
      <Handle
        type="source"
        position={Position.Right}
        className="!h-2.5 !w-2.5 !bg-slate-300 hover:!scale-125 !transition-transform"
      />

      {/* Domain color stripe at top */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl ${style.bgGlow}`} />

      {/* Header Info */}
      <div className="flex items-center justify-between mt-1">
        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
          Stufe {data.level}
        </span>
        <div className="flex items-center space-x-1.5">
          {data.is_milestone && (
            <span title="Meilenstein" className="text-amber-400">
              <Sparkles className="h-3 w-3 animate-pulse" />
            </span>
          )}
          <span>
            {state === 'completed' && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
            {state === 'in_progress' && <Clock className="h-3.5 w-3.5 text-amber-400" />}
            {state === 'unlocked' && <PlayCircle className="h-3.5 w-3.5 text-rose-500 animate-pulse" />}
            {state === 'locked' && <Lock className="h-3.5 w-3.5 text-slate-500" />}
          </span>
        </div>
      </div>

      {/* Main Title */}
      <h3 className="mt-2 text-xs font-extrabold tracking-wide text-white line-clamp-1">
        {data.title}
      </h3>
      
      {/* Brief Summary */}
      <p className="mt-1 text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
        {data.summary}
      </p>

      {/* Bottom Category Badge */}
      <div className="mt-2.5 flex items-center justify-between">
        <span className={`rounded-md border px-1.5 py-0.5 text-[8px] font-bold tracking-wider uppercase ${style.badge}`}>
          {data.category.split(' ')[0]}
        </span>
      </div>
    </div>
  );
};
