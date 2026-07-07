'use client';

import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { useSkillTree } from '../context/SkillTreeContext';
import { 
  Lock, CheckCircle2, Clock, PlayCircle, Sparkles,
  BookOpen, Brain, Terminal, Database, ShieldAlert,
  GraduationCap, Cpu, Globe, HelpCircle, Eye,
  Zap, Users, MessageSquare, Layers, MousePointerClick,
  Sliders, Bot, Braces, Key, BarChart3, AppWindow,
  LineChart, LayoutDashboard, TrendingUp, Workflow, FileText
} from 'lucide-react';

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

// Map each node ID to a fitting Lucide React icon component
const nodeIcons: Record<string, React.ComponentType<any>> = {
  'kickoff': HelpCircle,
  'paedagogik': GraduationCap,
  'technik': Cpu,
  'deployment': Globe,
  'quiz-webapp': HelpCircle,
  'usability-design': Eye,
  'vibecoding': Zap,
  'coaching-tutoring': Users,
  'feedback': MessageSquare,
  'retrieval-practice': Brain,
  'scaffolding': Layers,
  'software-projektmanagement': FileText,
  'interaktive-elemente': MousePointerClick,
  'ki-llms': Bot,
  'kontext-engineering': Braces,
  'prompting': Terminal,
  'daten-darstellen': BarChart3,
  'datenbanken': Database,
  'datenschutz-schule': ShieldAlert,
  'tutor-app': Bot,
  'user-management': Users,
  'cognitive-load-management': Sliders,
  'data-analytics': LineChart,
  'dashboard': LayoutDashboard,
  'progress-visualization': TrendingUp,
  'adaptive-lernumgebung': Workflow,
  'api-keys': Key,
  'webapp-basics': AppWindow,
};

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

  // Visual styling parameters based on category with pale pastel backgrounds matching their washi tape decoration colors
  const categoryStyles = {
    'Learning Design': {
      bgBase: 'bg-violet-100/60 text-slate-800',
      border: 'border-violet-300',
      text: 'text-violet-700',
      badge: 'bg-violet-100 text-violet-800 border-violet-200/60',
      tape: 'washi-tape-violet',
      shadowColor: 'rgba(139,92,246,0.12)'
    },
    'UX Design': {
      bgBase: 'bg-rose-100/60 text-slate-800',
      border: 'border-rose-300',
      text: 'text-rose-700',
      badge: 'bg-rose-100 text-rose-800 border-rose-200/60',
      tape: 'washi-tape-rose',
      shadowColor: 'rgba(244,63,94,0.12)'
    },
    'AI Design': {
      bgBase: 'bg-emerald-100/60 text-slate-800',
      border: 'border-emerald-300',
      text: 'text-emerald-700',
      badge: 'bg-emerald-100 text-emerald-800 border-emerald-200/60',
      tape: 'washi-tape-emerald',
      shadowColor: 'rgba(16,185,129,0.12)'
    },
    'Data Design': {
      bgBase: 'bg-blue-100/60 text-slate-800',
      border: 'border-blue-300',
      text: 'text-blue-700',
      badge: 'bg-blue-100 text-blue-800 border-blue-200/60',
      tape: 'washi-tape-blue',
      shadowColor: 'rgba(59,130,246,0.12)'
    },
    'Product Design': {
      bgBase: 'bg-amber-100/60 text-slate-850',
      border: 'border-amber-300',
      text: 'text-amber-700',
      badge: 'bg-amber-100 text-amber-805 border-amber-200/60',
      tape: 'washi-tape',
      shadowColor: 'rgba(234,179,8,0.12)'
    }
  };

  const style = categoryStyles[data.category as keyof typeof categoryStyles] || categoryStyles['Learning Design'];

  // Base state classes
  let stateClasses = '';
  let shadowClass = '';
  let borderClass = '';

  if (state === 'completed') {
    stateClasses = `${style.bgBase}`;
    borderClass = 'border-emerald-500 border-3';
    shadowClass = 'shadow-[4px_4px_0px_0px_#10b981]';
  } else if (state === 'in_progress') {
    stateClasses = `${style.bgBase}`;
    borderClass = 'border-amber-400 border-3';
    shadowClass = 'pulse-glow-product shadow-[4px_4px_0px_0px_#f59e0b]';
  } else if (state === 'unlocked') {
    stateClasses = style.bgBase;
    borderClass = 'border-slate-900 border-2';
    shadowClass = `shadow-[4px_4px_0px_0px_#18181b]`;
  } else {
    // Locked (faded out gray state, no background color, no shadow)
    stateClasses = 'bg-slate-50 text-slate-400 opacity-40 grayscale pointer-events-none';
    borderClass = 'border-slate-200 border-dashed border-2';
    shadowClass = 'shadow-none';
  }

  // Overriding styles for selected/hovered nodes
  if (state !== 'locked') {
    if (isSelected) {
      borderClass = 'border-slate-900 border-3 scale-105';
      shadowClass = 'shadow-[6px_6px_0px_0px_rgba(24,24,27,0.25)]';
    } else if (isHovered) {
      borderClass = 'border-slate-800 border-2 scale-102';
    }
  }

  // Project path highlight border override
  const projectHighlightClass = (selectedProjectId && isNodeInActiveProject && state !== 'locked')
    ? 'ring-4 ring-amber-400 ring-offset-2 ring-offset-white shadow-[5px_5px_0px_0px_rgba(234,179,8,0.25)]'
    : '';

  // Organic slight rotation based on levels to simulate manual placement
  const rotationAngle = (data.level % 2 === 0) ? 'rotate-[0.5deg]' : 'rotate-[-0.6deg]';

  const IconComponent = nodeIcons[id] || FileText;

  return (
    <div
      onMouseEnter={state !== 'locked' ? () => setHoveredNodeId(id) : undefined}
      onMouseLeave={state !== 'locked' ? () => setHoveredNodeId(null) : undefined}
      className={`glass-card relative flex w-64 flex-col rounded-xl p-3.5 transition-all duration-200 ${stateClasses} ${borderClass} ${shadowClass} ${projectHighlightClass} ${rotationAngle}`}
    >
      {/* Visual Tape decoration for active/finished nodes */}
      {state !== 'locked' && (
        <div className={`washi-tape ${style.tape}`} />
      )}

      {/* Handles for connections (keep handles enabled even when locked so React Flow builds edges) */}
      {id !== 'kickoff' && (
        <Handle
          type="target"
          position={Position.Left}
          className="!h-2.5 !w-2.5 !bg-slate-800 hover:!scale-125 !transition-all"
        />
      )}
      
      <Handle
        type="source"
        position={Position.Right}
        className="!h-2.5 !w-2.5 !bg-slate-800 hover:!scale-125 !transition-all"
      />

      {/* Domain color stripe at top */}
      {state !== 'locked' && (
        <div className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-xl bg-slate-900/15`} />
      )}

      {/* Header Info */}
      <div className="flex items-center justify-between mt-1 select-none">
        <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500">
          Stufe {data.level}
        </span>
        <div className="flex items-center space-x-1.5">
          {data.is_milestone && state !== 'locked' && (
            <span title="Meilenstein" className="text-amber-500">
              <Sparkles className="h-3 w-3 animate-pulse" />
            </span>
          )}
          <span>
            {state === 'completed' && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />}
            {state === 'in_progress' && <Clock className="h-3.5 w-3.5 text-amber-500" />}
            {state === 'unlocked' && <PlayCircle className="h-3.5 w-3.5 text-rose-500 animate-pulse" />}
            {state === 'locked' && <Lock className="h-3.5 w-3.5 text-slate-400" />}
          </span>
        </div>
      </div>

      {/* Title & Icon Row */}
      <div className="mt-2 flex items-start space-x-2.5">
        {state !== 'locked' ? (
          <div className={`p-1.5 rounded-lg border-2 border-slate-900 bg-white ${style.text} shadow-[2px_2px_0px_0px_#18181b] shrink-0`}>
            <IconComponent className="h-4 w-4" />
          </div>
        ) : (
          <div className="p-1.5 rounded-lg border-2 border-slate-200 bg-slate-100 text-slate-400 shrink-0">
            <Lock className="h-4 w-4" />
          </div>
        )}
        <h3 className={`text-xs font-black tracking-wide leading-snug line-clamp-2 mt-0.5 ${
          state === 'locked' ? 'text-slate-400' : 'text-slate-800'
        }`}>
          {data.title}
        </h3>
      </div>

      {/* Bottom Category Badge (Only show for unlocked/completed nodes) */}
      {state !== 'locked' && (
        <div className="mt-3 flex items-center justify-between select-none">
          <span className={`rounded-md border px-1.5 py-0.5 text-[8px] font-bold tracking-wider uppercase ${style.badge}`}>
            {data.category}
          </span>
        </div>
      )}
    </div>
  );
};
