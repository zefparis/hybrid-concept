'use client';

import React from 'react';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView, useReducedMotion } from 'framer-motion';

// Use case keys per sector
const SECTOR_CASES: Record<string, string[]> = {
  energyMining: ['offshore', 'mining', 'pipeline'],
  governmentPrograms: ['election', 'emergency', 'border'],
  criticalInfra: ['power', 'water', 'telecom'],
  cyberResilience: ['ransomware', 'apt', 'supply'],
  portsLogistics: ['narcotics', 'weapons', 'cyber'],
  aiFusion: ['threat', 'maintenance', 'autonomous'],
};

const USECASE_BACKGROUNDS: React.ReactNode[] = [
  (
    <svg key="uc0" className="absolute inset-0 w-full h-full text-white transition-transform duration-700 group-hover:scale-105 pointer-events-none" viewBox="0 0 1000 300" fill="none" stroke="currentColor">
      <circle cx="850" cy="150" r="140" fill="#38bdf8" opacity="0.02" />
      <circle cx="850" cy="150" r="70" fill="#818cf8" opacity="0.03" />
      <g transform="translate(600, 30)">
        {/* Signal wave pattern */}
        <path d="M0 130 Q 40 80 80 130 T 160 130 T 240 130 T 320 130" strokeWidth="1.5" stroke="#38bdf8" opacity="0.12" fill="none" />
        <path d="M0 150 Q 40 100 80 150 T 160 150 T 240 150 T 320 150" strokeWidth="1" opacity="0.06" fill="none" />
        {/* Nodes along wave */}
        <circle cx="80" cy="130" r="4" fill="#38bdf8" opacity="0.5" stroke="none" />
        <circle cx="160" cy="130" r="5" fill="#818cf8" opacity="0.6" stroke="none" />
        <circle cx="240" cy="130" r="4" fill="#c084fc" opacity="0.5" stroke="none" />
        {/* Connection */}
        <line x1="80" y1="130" x2="160" y2="130" strokeWidth="1" stroke="#38bdf8" opacity="0.1" strokeDasharray="4 4" />
        <line x1="160" y1="130" x2="240" y2="130" strokeWidth="1" stroke="#818cf8" opacity="0.1" strokeDasharray="4 4" />
        {/* Particles */}
        <circle cx="40" cy="100" r="1.5" fill="#38bdf8" opacity="0.4" stroke="none" />
        <circle cx="200" cy="100" r="1.5" fill="#c084fc" opacity="0.3" stroke="none" />
        <circle cx="300" cy="160" r="1.5" fill="#818cf8" opacity="0.3" stroke="none" />
      </g>
    </svg>
  ),
  (
    <svg key="uc1" className="absolute inset-0 w-full h-full text-white transition-transform duration-700 group-hover:scale-105 pointer-events-none" viewBox="0 0 1000 300" fill="none" stroke="currentColor">
      <circle cx="850" cy="150" r="140" fill="#c084fc" opacity="0.02" />
      <circle cx="850" cy="150" r="70" fill="#38bdf8" opacity="0.03" />
      <g transform="translate(620, 40)">
        {/* Shield outline */}
        <path d="M120 20 L220 55 V140 C220 190 175 220 120 235 C65 220 20 190 20 140 V55 Z" strokeWidth="1.5" stroke="#c084fc" opacity="0.1" fill="#c084fc" fillOpacity="0.01" />
        <path d="M120 40 L195 68 V140 C195 180 160 205 120 215 C80 205 45 180 45 140 V68 Z" strokeWidth="1" stroke="#38bdf8" opacity="0.08" fill="none" />
        {/* Check inside */}
        <path d="M85 130 L105 150 L160 100" strokeWidth="3" stroke="#c084fc" strokeLinecap="round" strokeLinejoin="round" opacity="0.2" />
        {/* Nodes */}
        <circle cx="120" cy="20" r="3" fill="#c084fc" opacity="0.5" stroke="none" />
        <circle cx="220" cy="55" r="2" fill="#38bdf8" opacity="0.4" stroke="none" />
        <circle cx="20" cy="55" r="2" fill="#818cf8" opacity="0.4" stroke="none" />
      </g>
    </svg>
  ),
  (
    <svg key="uc2" className="absolute inset-0 w-full h-full text-white transition-transform duration-700 group-hover:scale-105 pointer-events-none" viewBox="0 0 1000 300" fill="none" stroke="currentColor">
      <circle cx="850" cy="150" r="140" fill="#34d399" opacity="0.02" />
      <circle cx="850" cy="150" r="70" fill="#818cf8" opacity="0.03" />
      <g transform="translate(620, 30)">
        {/* Network graph */}
        <circle cx="100" cy="80" r="5" fill="#34d399" fillOpacity="0.15" stroke="#34d399" strokeWidth="1" opacity="0.35" />
        <circle cx="100" cy="80" r="2.5" fill="#34d399" opacity="0.7" stroke="none" />
        <circle cx="200" cy="60" r="6" fill="#38bdf8" fillOpacity="0.15" stroke="#38bdf8" strokeWidth="1" opacity="0.4" />
        <circle cx="200" cy="60" r="3" fill="#38bdf8" opacity="0.8" stroke="none" />
        <circle cx="150" cy="170" r="5" fill="#818cf8" fillOpacity="0.12" stroke="#818cf8" strokeWidth="1" opacity="0.35" />
        <circle cx="150" cy="170" r="2.5" fill="#818cf8" opacity="0.7" stroke="none" />
        <circle cx="260" cy="150" r="4" fill="#c084fc" fillOpacity="0.1" stroke="#c084fc" strokeWidth="1" opacity="0.3" />
        <circle cx="260" cy="150" r="2" fill="#c084fc" opacity="0.6" stroke="none" />
        {/* Connections */}
        <line x1="105" y1="80" x2="195" y2="60" strokeWidth="1" stroke="#34d399" opacity="0.12" strokeDasharray="4 4" />
        <line x1="200" y1="66" x2="155" y2="164" strokeWidth="1" stroke="#38bdf8" opacity="0.1" strokeDasharray="4 4" />
        <line x1="155" y1="170" x2="254" y2="150" strokeWidth="1" stroke="#818cf8" opacity="0.08" strokeDasharray="4 4" />
        <line x1="105" y1="80" x2="145" y2="164" strokeWidth="1" opacity="0.06" strokeDasharray="4 4" />
      </g>
    </svg>
  ),
];

interface UseCasesProps {
  sector: string;
}

export function UseCases({ sector }: UseCasesProps) {
  const t = useTranslations(`sectors.${sector}.useCases`);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  const cases = SECTOR_CASES[sector] || ['offshore', 'mining', 'pipeline'];

  return (
    <section ref={sectionRef} className="py-20 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-display-sm md:text-display-md font-bold mb-16"
        >
          {t('heading')}
        </motion.h2>

        <div className="space-y-6">
          {cases.map((useCase, idx) => (
            <motion.div
              key={useCase}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="group relative p-8 md:p-10 rounded-2xl bg-[#1a1b2e] border border-white/5 hover:border-white/10 shadow-xl transition-all duration-500 overflow-hidden"
            >
              {/* Background Graphic */}
              {USECASE_BACKGROUNDS[idx % 3]}

              {/* Left accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-[#38bdf8] via-[#818cf8] to-[#c084fc] opacity-40 group-hover:opacity-70 transition-opacity duration-500" />

              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-br from-[#38bdf8]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10 pl-4">
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-[#38bdf8] transition-colors">
                  {t(`${useCase}.title`)}
                </h3>
                <p className="text-white/70 font-medium leading-relaxed">
                  {t(`${useCase}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
