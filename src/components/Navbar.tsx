'use client';

import React from 'react';
import { useSkillTree } from '../context/SkillTreeContext';
import { Award, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

export const Navbar: React.FC = () => {
  const { 
    nodes, 
    completionStates, 
  } = useSkillTree();

  // Calculate progress
  const totalSkills = nodes.length;
  const completedSkills = Object.values(completionStates).filter(state => state === 'completed').length;
  const progressPercent = totalSkills > 0 ? Math.round((completedSkills / totalSkills) * 100) : 0;

  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-slate-900/10 bg-[#faf8f5]/90 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Title / Brand */}
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-500 via-rose-500 to-amber-500 p-0.5 shadow-sm">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#faf8f5]">
                <Award className="h-4.5 w-4.5 text-rose-500" />
              </div>
            </div>
            <div>
              <span className="text-base font-black tracking-tight text-slate-800 sm:text-lg">
                Learning Design Skilltree
              </span>
            </div>
          </Link>
        </div>

        {/* Global Progress Tracker */}
        {totalSkills > 0 && (
          <div className="hidden items-center space-x-4 md:flex lg:w-96">
            <div className="w-full">
              <div className="mb-1 flex items-center justify-between text-xs font-semibold text-slate-600">
                <span>Gesamtfortschritt</span>
                <span className="font-bold text-rose-600">{progressPercent}% ({completedSkills}/{totalSkills})</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200 border border-slate-900/5">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 via-rose-500 to-emerald-500 transition-all duration-500 ease-out" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          <Link 
            href="/skilltree" 
            className="flex items-center space-x-1 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-900/5 hover:text-slate-950 transition-all"
          >
            <LayoutDashboard className="h-3.5 w-3.5 text-slate-600" />
            <span>Skilltree</span>
          </Link>
          
          <Link 
            href="/projects" 
            className="rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-900/5 hover:text-slate-950 transition-all"
          >
            Projekte
          </Link>
          
          <Link 
            href="/skills" 
            className="rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-900/5 hover:text-slate-950 transition-all"
          >
            Liste
          </Link>
        </div>


      </div>
    </header>
  );
};
