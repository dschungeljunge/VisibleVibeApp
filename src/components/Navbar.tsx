'use client';

import React from 'react';
import { useSkillTree } from '../context/SkillTreeContext';
import { Shield, ShieldAlert, Award, RefreshCw, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

export const Navbar: React.FC = () => {
  const { 
    nodes, 
    completionStates, 
    adminMode, 
    setAdminMode,
    refreshData,
    loading
  } = useSkillTree();

  // Calculate progress
  const totalSkills = nodes.length;
  const completedSkills = Object.values(completionStates).filter(state => state === 'completed').length;
  const progressPercent = totalSkills > 0 ? Math.round((completedSkills / totalSkills) * 100) : 0;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Title / Brand */}
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 via-rose-500 to-amber-500 p-0.5 shadow-md shadow-violet-500/20">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
                <Award className="h-4.5 w-4.5 text-rose-400" />
              </div>
            </div>
            <div>
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-base font-bold tracking-wide text-transparent sm:text-lg">
                Learning Design Skilltree
              </span>
              <span className="hidden text-[10px] text-slate-500 sm:block leading-none">
                CAS/SAS Learning App Design & Vibe Coding
              </span>
            </div>
          </Link>
        </div>

        {/* Global Progress Tracker */}
        {totalSkills > 0 && (
          <div className="hidden items-center space-x-4 md:flex lg:w-96">
            <div className="w-full">
              <div className="mb-1 flex items-center justify-between text-xs font-medium text-slate-400">
                <span>Gesamtfortschritt</span>
                <span className="font-semibold text-rose-400">{progressPercent}% ({completedSkills}/{totalSkills})</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 via-rose-500 to-emerald-500 transition-all duration-500 ease-out" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation & Admin Toggles */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Link 
            href="/skilltree" 
            className="flex items-center space-x-1 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
          >
            <LayoutDashboard className="h-3.5 w-3.5" />
            <span>Skilltree</span>
          </Link>
          
          <Link 
            href="/projects" 
            className="rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
          >
            Projekte
          </Link>
          
          <Link 
            href="/skills" 
            className="rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
          >
            Liste
          </Link>

          {/* Sync Button */}
          <button
            onClick={() => refreshData()}
            disabled={loading}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
            title="Daten synchronisieren"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>

          {/* Admin Toggle */}
          <button
            onClick={() => setAdminMode(!adminMode)}
            className={`flex items-center space-x-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold shadow-sm transition-all duration-300 ${
              adminMode 
                ? 'border-amber-500/30 bg-amber-500/10 text-amber-400 shadow-amber-500/5 hover:bg-amber-500/20' 
                : 'border-white/10 bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-300'
            }`}
          >
            {adminMode ? (
              <>
                <ShieldAlert className="h-3.5 w-3.5 animate-pulse" />
                <span className="hidden sm:inline">Admin-Modus</span>
              </>
            ) : (
              <>
                <Shield className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Admin</span>
              </>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
