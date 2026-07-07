'use client';

import React, { useState } from 'react';
import { useSkillTree } from '../context/SkillTreeContext';
import { X, Clock, CheckCircle2, PlayCircle, ClipboardCheck, Award } from 'lucide-react';

interface PopupNodeProps {
  data: {
    nodeId: string;
    title: string;
    category: string;
    summary: string;
    practice_task?: string;
    quality_criteria?: string;
  };
}

export const PopupNode: React.FC<PopupNodeProps> = ({ data }) => {
  const { nodeId, title, category, summary, practice_task, quality_criteria } = data;
  const { completionStates, updateNodeState, setSelectedNodeId } = useSkillTree();
  const [showTask, setShowTask] = useState(false);

  const state = completionStates[nodeId] || 'locked';

  const handleStateChange = (newState: 'unlocked' | 'in_progress' | 'completed') => {
    updateNodeState(nodeId, newState);
  };

  const handleClose = () => {
    setSelectedNodeId(null);
  };

  return (
    <div className="glass-panel w-76 rounded-xl bg-[#faf8f5] p-4 text-slate-800 border-2 border-slate-900 shadow-[4px_4px_0px_rgba(24,24,27,0.15)] relative pointer-events-auto select-text">
      {/* Close button */}
      <button 
        onClick={handleClose}
        className="absolute top-2.5 right-2.5 rounded-lg p-1 text-slate-400 hover:bg-slate-900/5 hover:text-slate-950 transition-colors cursor-pointer"
      >
        <X className="h-4 w-4" />
      </button>

      {/* Category Badge */}
      <span className="inline-block rounded-md border border-slate-900/10 bg-slate-900/5 px-2 py-0.5 text-[8px] font-black uppercase tracking-wider text-slate-500">
        {category}
      </span>

      {/* Title */}
      <h4 className="mt-1.5 text-xs font-black leading-snug text-slate-900 pr-5">
        {title}
      </h4>

      {/* Summary / Kurzbeschreibung */}
      <p className="mt-2 text-[10px] text-slate-600 leading-relaxed font-medium">
        {summary}
      </p>

      {/* Collapsible Practice Task & Criteria */}
      {(practice_task || quality_criteria) && (
        <div className="mt-3 border-t border-slate-200/60 pt-2.5">
          <button
            onClick={() => setShowTask(!showTask)}
            className="flex items-center space-x-1 text-[9px] font-black text-rose-600 hover:text-rose-700 transition-colors cursor-pointer"
          >
            <span>{showTask ? 'Aufgabe ausblenden' : 'Praxisaufgabe & Kriterien anzeigen'}</span>
          </button>
          
          {showTask && (
            <div className="mt-2 space-y-2.5 rounded-lg border border-slate-900/5 bg-slate-100/50 p-2.5 text-[9px] leading-relaxed text-slate-700">
              {practice_task && (
                <div>
                  <h5 className="flex items-center space-x-1 font-black text-rose-800 uppercase tracking-wide">
                    <ClipboardCheck className="h-3 w-3 shrink-0" />
                    <span>Aufgabe</span>
                  </h5>
                  <p className="mt-1 font-medium whitespace-pre-line">{practice_task}</p>
                </div>
              )}
              {quality_criteria && (
                <div className="border-t border-slate-200/50 pt-2">
                  <h5 className="flex items-center space-x-1 font-black text-violet-850 uppercase tracking-wide">
                    <Award className="h-3 w-3 shrink-0" />
                    <span>Qualitätskriterien</span>
                  </h5>
                  <p className="mt-1 font-medium whitespace-pre-line">{quality_criteria}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* State Toggle Buttons */}
      {state !== 'locked' && (
        <div className="mt-4 border-t border-slate-200/80 pt-3">
          <div className="flex justify-between items-center">
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Status:</span>
            <div className="flex space-x-1">
              <button
                onClick={() => handleStateChange('unlocked')}
                className={`rounded-lg px-2.5 py-1 text-[9px] font-black border transition-all cursor-pointer shadow-[1px_1px_0px_rgba(0,0,0,0.05)] ${
                  state === 'unlocked' 
                    ? 'bg-rose-100 border-rose-500 text-rose-800 font-extrabold shadow-none' 
                    : 'border-slate-200 bg-white text-slate-500 hover:text-slate-800'
                }`}
              >
                Bereit
              </button>
              <button
                onClick={() => handleStateChange('in_progress')}
                className={`rounded-lg px-2.5 py-1 text-[9px] font-black border transition-all cursor-pointer shadow-[1px_1px_0px_rgba(0,0,0,0.05)] ${
                  state === 'in_progress' 
                    ? 'bg-amber-100 border-amber-500 text-amber-800 font-extrabold shadow-none' 
                    : 'border-slate-200 bg-white text-slate-500 hover:text-slate-800'
                }`}
              >
                Lernen
              </button>
              <button
                onClick={() => handleStateChange('completed')}
                className={`rounded-lg px-2.5 py-1 text-[9px] font-black border transition-all cursor-pointer shadow-[1px_1px_0px_rgba(0,0,0,0.05)] ${
                  state === 'completed' 
                    ? 'bg-emerald-100 border-emerald-500 text-emerald-800 font-extrabold shadow-none' 
                    : 'border-slate-200 bg-white text-slate-500 hover:text-slate-800'
                }`}
              >
                Erledigt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default PopupNode;
