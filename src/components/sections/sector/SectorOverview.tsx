'use client';

import React from 'react';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Shield, TrendingDown, Globe, Link as LinkIcon, AlertTriangle, FileText } from 'lucide-react';

const icons = {
  revenue: Shield,
  risks: TrendingDown,
  exposure: Globe,
  sovereignty: Shield,
  continuity: LinkIcon,
  threats: AlertTriangle,
  dependency: LinkIcon,
  regulation: FileText,
  landscape: Globe,
  gaps: AlertTriangle,
  impact: TrendingDown,
  economic: Shield,
  complexity: Globe,
  dataVolume: TrendingDown,
  latency: Globe,
  integration: LinkIcon,
};

const OVERVIEW_BACKGROUNDS: React.ReactNode[] = [
  (
    <svg key="ob0" className="absolute inset-0 w-full h-full text-white transition-transform duration-700 group-hover:scale-105 pointer-events-none" viewBox="0 0 500 500" fill="none" stroke="currentColor">
      <circle cx="250" cy="230" r="150" fill="#38bdf8" opacity="0.03" />
      <circle cx="250" cy="230" r="70" fill="#818cf8" opacity="0.04" />
      <g transform="translate(100, 60)">
        {/* Abstract data flow */}
        <path d="M50 100 Q 150 40 250 100 T 350 100" strokeWidth="1.5" stroke="#38bdf8" opacity="0.15" fill="none" />
        <path d="M50 140 Q 150 80 250 140 T 350 140" strokeWidth="1" opacity="0.08" fill="none" />
        <path d="M50 180 Q 150 120 250 180 T 350 180" strokeWidth="1" stroke="#818cf8" opacity="0.1" fill="none" />
        {/* Nodes */}
        <circle cx="150" cy="70" r="6" fill="#38bdf8" fillOpacity="0.15" stroke="#38bdf8" strokeWidth="1" opacity="0.4" />
        <circle cx="150" cy="70" r="3" fill="#38bdf8" opacity="0.8" stroke="none" />
        <circle cx="250" cy="100" r="5" fill="#818cf8" fillOpacity="0.12" stroke="#818cf8" strokeWidth="1" opacity="0.35" />
        <circle cx="250" cy="100" r="2.5" fill="#818cf8" opacity="0.7" stroke="none" />
        {/* Connection */}
        <line x1="156" y1="70" x2="244" y2="100" strokeWidth="1" stroke="#38bdf8" opacity="0.15" strokeDasharray="4 4" />
        {/* Data blocks */}
        <rect x="80" y="220" width="60" height="40" rx="3" fill="currentColor" fillOpacity="0.04" stroke="none" />
        <line x1="90" y1="235" x2="130" y2="235" strokeWidth="1" stroke="#38bdf8" opacity="0.12" />
        <line x1="90" y1="248" x2="120" y2="248" strokeWidth="1" opacity="0.06" />
        <rect x="170" y="230" width="50" height="35" rx="3" fill="currentColor" fillOpacity="0.03" stroke="none" />
        <line x1="180" y1="242" x2="210" y2="242" strokeWidth="1" stroke="#818cf8" opacity="0.1" />
        {/* Particles */}
        <circle cx="60" cy="200" r="1.5" fill="#38bdf8" opacity="0.4" stroke="none" />
        <circle cx="300" cy="160" r="1.5" fill="#c084fc" opacity="0.3" stroke="none" />
        <circle cx="200" cy="290" r="1.5" fill="#818cf8" opacity="0.3" stroke="none" />
      </g>
    </svg>
  ),
  (
    <svg key="ob1" className="absolute inset-0 w-full h-full text-white transition-transform duration-700 group-hover:scale-105 pointer-events-none" viewBox="0 0 500 500" fill="none" stroke="currentColor">
      <circle cx="250" cy="230" r="150" fill="#c084fc" opacity="0.03" />
      <circle cx="250" cy="230" r="70" fill="#38bdf8" opacity="0.04" />
      <g transform="translate(100, 60)">
        {/* Hexagonal grid */}
        <path d="M150 60 L200 90 L200 140 L150 170 L100 140 L100 90 Z" strokeWidth="1" opacity="0.08" />
        <path d="M150 90 L180 108 L180 138 L150 155 L120 138 L120 108 Z" strokeWidth="1.5" stroke="#c084fc" opacity="0.15" fill="#c084fc" fillOpacity="0.02" />
        {/* Center node */}
        <circle cx="150" cy="125" r="8" fill="#c084fc" fillOpacity="0.12" stroke="#c084fc" strokeWidth="1" opacity="0.4" />
        <circle cx="150" cy="125" r="3.5" fill="#c084fc" opacity="0.8" stroke="none" />
        {/* Radial connections */}
        <line x1="150" y1="60" x2="150" y2="90" strokeWidth="1" stroke="#38bdf8" opacity="0.12" strokeDasharray="3 3" />
        <line x1="200" y1="115" x2="180" y2="115" strokeWidth="1" opacity="0.08" strokeDasharray="3 3" />
        <line x1="100" y1="115" x2="120" y2="115" strokeWidth="1" stroke="#818cf8" opacity="0.1" strokeDasharray="3 3" />
        {/* Outer orbit nodes */}
        <circle cx="150" cy="50" r="3" fill="#38bdf8" opacity="0.5" stroke="none" />
        <circle cx="210" cy="115" r="3" fill="#818cf8" opacity="0.5" stroke="none" />
        <circle cx="90" cy="115" r="3" fill="#c084fc" opacity="0.5" stroke="none" />
        <circle cx="150" cy="180" r="3" fill="#38bdf8" opacity="0.4" stroke="none" />
        {/* Data block */}
        <rect x="80" y="220" width="140" height="50" rx="4" fill="currentColor" fillOpacity="0.03" stroke="none" />
        <line x1="95" y1="238" x2="200" y2="238" strokeWidth="1" stroke="#c084fc" opacity="0.1" />
        <line x1="95" y1="252" x2="175" y2="252" strokeWidth="1" opacity="0.06" />
        {/* Particles */}
        <circle cx="50" cy="170" r="1.5" fill="#c084fc" opacity="0.4" stroke="none" />
        <circle cx="260" cy="80" r="1.5" fill="#38bdf8" opacity="0.3" stroke="none" />
      </g>
    </svg>
  ),
  (
    <svg key="ob2" className="absolute inset-0 w-full h-full text-white transition-transform duration-700 group-hover:scale-105 pointer-events-none" viewBox="0 0 500 500" fill="none" stroke="currentColor">
      <circle cx="250" cy="230" r="150" fill="#34d399" opacity="0.03" />
      <circle cx="250" cy="230" r="70" fill="#818cf8" opacity="0.04" />
      <g transform="translate(100, 60)">
        {/* Network mesh */}
        <circle cx="100" cy="100" r="5" fill="#34d399" fillOpacity="0.15" stroke="#34d399" strokeWidth="1" opacity="0.4" />
        <circle cx="100" cy="100" r="2.5" fill="#34d399" opacity="0.7" stroke="none" />
        <circle cx="200" cy="80" r="5" fill="#38bdf8" fillOpacity="0.12" stroke="#38bdf8" strokeWidth="1" opacity="0.35" />
        <circle cx="200" cy="80" r="2.5" fill="#38bdf8" opacity="0.7" stroke="none" />
        <circle cx="250" cy="160" r="6" fill="#818cf8" fillOpacity="0.15" stroke="#818cf8" strokeWidth="1" opacity="0.4" />
        <circle cx="250" cy="160" r="3" fill="#818cf8" opacity="0.8" stroke="none" />
        <circle cx="60" cy="180" r="4" fill="#34d399" fillOpacity="0.1" stroke="#34d399" strokeWidth="1" opacity="0.3" />
        <circle cx="60" cy="180" r="2" fill="#34d399" opacity="0.6" stroke="none" />
        <circle cx="160" cy="200" r="5" fill="#c084fc" fillOpacity="0.12" stroke="#c084fc" strokeWidth="1" opacity="0.35" />
        <circle cx="160" cy="200" r="2.5" fill="#c084fc" opacity="0.7" stroke="none" />
        {/* Connections */}
        <line x1="105" y1="100" x2="195" y2="80" strokeWidth="1" stroke="#34d399" opacity="0.15" strokeDasharray="4 4" />
        <line x1="205" y1="80" x2="244" y2="160" strokeWidth="1" stroke="#38bdf8" opacity="0.12" strokeDasharray="4 4" />
        <line x1="105" y1="100" x2="60" y2="180" strokeWidth="1" opacity="0.08" strokeDasharray="4 4" />
        <line x1="65" y1="180" x2="155" y2="200" strokeWidth="1" stroke="#c084fc" opacity="0.1" strokeDasharray="4 4" />
        <line x1="165" y1="200" x2="244" y2="160" strokeWidth="1" stroke="#818cf8" opacity="0.12" strokeDasharray="4 4" />
        {/* Pulse */}
        <circle cx="250" cy="160" r="15" fill="#818cf8" fillOpacity="0.05" stroke="none" />
        {/* Particles */}
        <circle cx="150" cy="130" r="1.5" fill="#34d399" opacity="0.4" stroke="none" />
        <circle cx="220" cy="120" r="1.5" fill="#38bdf8" opacity="0.3" stroke="none" />
        <circle cx="110" cy="220" r="1.5" fill="#818cf8" opacity="0.3" stroke="none" />
      </g>
    </svg>
  ),
];

// Column keys per sector
const SECTOR_COLUMNS: Record<string, string[]> = {
  energyMining: ['revenue', 'risks', 'exposure'],
  governmentPrograms: ['sovereignty', 'continuity', 'threats'],
  criticalInfra: ['dependency', 'exposure', 'regulation'],
  cyberResilience: ['landscape', 'gaps', 'impact'],
  portsLogistics: ['economic', 'threats', 'complexity'],
  aiFusion: ['dataVolume', 'latency', 'integration'],
};

interface SectorOverviewProps {
  sector: string;
}

export function SectorOverview({ sector }: SectorOverviewProps) {
  const t = useTranslations(`sectors.${sector}.overview`);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  const columns = SECTOR_COLUMNS[sector] || ['revenue', 'risks', 'exposure'];

  return (
    <section ref={sectionRef} className="py-20 md:py-32 px-6 md:px-12 bg-surface">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-display-sm md:text-display-md font-bold mb-6">
            {t('heading')}
          </h2>
          <p className="text-body-lg text-foreground-secondary max-w-4xl leading-relaxed">
            {t('intro')}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {columns.map((col, idx) => {
            const Icon = icons[col as keyof typeof icons];
            return (
              <motion.div
                key={col}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="group relative p-8 md:p-10 rounded-2xl bg-surface-card border border-white/8 hover:border-white/15 hover-lift shadow-xl transition-all duration-500 overflow-hidden"
              >
                {/* Background Graphic */}
                {OVERVIEW_BACKGROUNDS[idx]}

                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-br from-[#38bdf8]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10">
                  <div className="mb-6 text-white/80 group-hover:text-white transition-colors duration-300">
                    <div className="w-12 h-12 rounded-lg border border-white/20 flex items-center justify-center bg-white/5">
                      <Icon className="w-7 h-7" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-[#38bdf8] transition-colors">
                    {t(`${col}.title`)}
                  </h3>
                  <ul className="space-y-3">
                    {[0, 1, 2].map((i) => (
                      <li key={i} className="text-sm text-white/70 flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] mt-2 mr-3 shrink-0" />
                        <span>{t(`${col}.points.${i}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
