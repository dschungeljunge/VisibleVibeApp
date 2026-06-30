'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Users, MessageSquare, Share2, 
  ArrowRight, ExternalLink, Heart, Sparkles, 
  Map, Award 
} from 'lucide-react';

export default function CommunityPage() {
  const communityFeatures = [
    {
      icon: <Share2 className="h-6 w-6 text-emerald-400" />,
      title: 'Lernapps teilen (Showcase)',
      desc: 'Veröffentlichen Sie den Link zu Ihrer App und schauen Sie sich die Prototypen anderer Teilnehmer an. Lassen Sie sich inspirieren!',
      link: '/projects',
      linkLabel: 'Projekte durchstöbern'
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-rose-400" />,
      title: 'Peer-Feedback (Prozessebene)',
      desc: 'Gutes Feedback fokussiert die Prozessebene und regt zum Nachdenken an. Unterstützen Sie andere Lehrpersonen beim Verfeinern ihrer App-Konzepte.',
      link: '/skilltree',
      linkLabel: 'Didaktik im Skilltree'
    },
    {
      icon: <Users className="h-6 w-6 text-violet-400" />,
      title: 'Support-Kanäle & Austausch',
      desc: 'Tauschen Sie funktionierende Prompt-Strategien aus, klären Sie Fragen zum Datenschutz an Schulen und lösen Sie technische Gotchas gemeinsam.',
      external: true,
      link: '#',
      linkLabel: 'Discord-Server beitreten (Demo)'
    }
  ];

  const highlights = [
    {
      author: 'Melanie S.',
      role: 'Sekundarstufe II, Mathematik',
      quote: '„Durch das Peer-Feedback im Kurs habe ich gemerkt, dass meine Rechen-App den Schülern zu früh die Lösung verraten hat. Jetzt gibt es formative Denkanstöße.“',
      project: 'Kopfrechen-Trainer'
    },
    {
      author: 'Christian K.',
      role: 'Primarstufe, Englisch',
      quote: '„Die Levenshtein-Distanz für meine Vokabel-App war ein Tipp aus der Community. Kein Frust mehr bei kleinen Tippfehlern der Kinder!“',
      project: 'Vocabulary Builder'
    }
  ];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-12">
      
      {/* Navigation & Header */}
      <div className="flex flex-col space-y-4">
        <Link 
          href="/" 
          className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Zurück zur Startseite</span>
        </Link>
        
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Die VisibleVibe Community
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-3xl">
            Lernen ist ein zutiefst sozialer Prozess. Im CAS/SAS-Programm arbeiten wir kooperativ zusammen, teilen unsere Lernwerkzeuge und wachsen an gegenseitigem Feedback.
          </p>
        </div>
      </div>

      {/* Main Grid: Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {communityFeatures.map((feat, idx) => (
          <div 
            key={idx}
            className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col justify-between space-y-4 hover:border-white/10 transition-all"
          >
            <div className="space-y-3">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-white/10 w-fit">
                {feat.icon}
              </div>
              <h3 className="text-base font-bold text-white">{feat.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
            </div>

            <div className="pt-2">
              {feat.external ? (
                <a
                  href={feat.link}
                  className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-400 hover:underline"
                >
                  <span>{feat.linkLabel}</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                <Link
                  href={feat.link}
                  className="inline-flex items-center space-x-1 text-xs font-bold text-violet-400 hover:underline"
                >
                  <span>{feat.linkLabel}</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Showcase / Highlight Section */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Award className="h-5 w-5 text-amber-400" />
          <h2 className="text-xl font-bold text-white">Stimmen aus dem Kurs</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {highlights.map((item, idx) => (
            <div 
              key={idx}
              className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4 bg-slate-950/20"
            >
              <p className="text-xs text-slate-300 italic leading-relaxed">
                {item.quote}
              </p>
              
              <div className="flex justify-between items-center pt-2 border-t border-white/5">
                <div>
                  <h4 className="text-xs font-bold text-white">{item.author}</h4>
                  <p className="text-[10px] text-slate-500">{item.role}</p>
                </div>
                <span className="rounded-full bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 text-[9px] font-bold text-violet-400">
                  {item.project}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to action card */}
      <div className="glass-panel rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-white/10 bg-gradient-to-r from-slate-950 to-slate-900/60">
        <div className="space-y-2 max-w-2xl text-center md:text-left">
          <h3 className="text-lg font-bold text-white">Mitmachen & Mitgestalten</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Teilen Sie Ihr App-Konzept-Canvas mit Ihrer Lerngruppe und bitten Sie um Feedback zu Ihren Lernzielen. Das Feedback hilft Ihnen, Stolpersteine frühzeitig auszuräumen.
          </p>
        </div>
        <Link
          href="/projects"
          className="inline-flex items-center space-x-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-rose-600 px-6 py-3 text-xs font-bold text-white hover:from-violet-500 hover:to-rose-500 shadow-md hover:scale-105 transition-all w-full md:w-auto justify-center cursor-pointer"
        >
          <span>Projekt-Galerie öffnen</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

    </div>
  );
}
