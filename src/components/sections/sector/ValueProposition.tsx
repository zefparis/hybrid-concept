'use client';

import React from 'react';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { TrendingUp, DollarSign, Award } from 'lucide-react';

const icons = {
  uptime: TrendingUp,
  downtime: DollarSign,
  confidence: Award,
  sovereignty: Award,
  response: TrendingUp,
  availability: TrendingUp,
  mttr: DollarSign,
  compliance: Award,
  detection: TrendingUp,
  containment: DollarSign,
  prevented: Award,
  interdiction: TrendingUp,
  throughput: DollarSign,
  incidents: Award,
  prediction: TrendingUp,
  latency: DollarSign,
  efficiency: Award,
};

const VALUE_BACKGROUNDS: React.ReactNode[] = [
  (
    <svg key="vb0" className="absolute inset-0 w-full h-full text-white transition-transform duration-700 group-hover:scale-105 pointer-events-none" viewBox="0 0 500 500" fill="none" stroke="currentColor">
      <circle cx="250" cy="220" r="160" fill="#38bdf8" opacity="0.03" />
      <circle cx="250" cy="220" r="80" fill="#818cf8" opacity="0.04" />
      <g transform="translate(80, 50)">
        {/* Rising chart */}
        <path d="M40 300 L100 250 L170 270 L230 180 L300 120" strokeWidth="2" stroke="#38bdf8" opacity="0.2" fill="none" />
        <path d="M40 300 L100 250 L170 270 L230 180 L300 120 L300 300 L40 300 Z" fill="#38bdf8" fillOpacity="0.03" stroke="none" />
        {/* Chart dots */}
        <circle cx="40" cy="300" r="4" fill="#38bdf8" opacity="0.5" stroke="none" />
        <circle cx="100" cy="250" r="4" fill="#818cf8" opacity="0.6" stroke="none" />
        <circle cx="170" cy="270" r="4" fill="#38bdf8" opacity="0.5" stroke="none" />
        <circle cx="230" cy="180" r="5" fill="#818cf8" opacity="0.7" stroke="none" />
        <circle cx="300" cy="120" r="6" fill="#38bdf8" opacity="0.8" stroke="none" />
        {/* Pulse on top */}
        <circle cx="300" cy="120" r="15" fill="#38bdf8" fillOpacity="0.06" stroke="none" />
        <circle cx="300" cy="120" r="25" stroke="#38bdf8" strokeWidth="0.5" opacity="0.08" strokeDasharray="4 4" />
        {/* Grid lines */}
        <line x1="40" y1="200" x2="300" y2="200" strokeWidth="0.5" opacity="0.05" />
        <line x1="40" y1="250" x2="300" y2="250" strokeWidth="0.5" opacity="0.05" />
        <line x1="40" y1="300" x2="300" y2="300" strokeWidth="0.5" opacity="0.05" />
        {/* Particles */}
        <circle cx="150" cy="150" r="1.5" fill="#c084fc" opacity="0.4" stroke="none" />
        <circle cx="260" cy="230" r="1.5" fill="#38bdf8" opacity="0.3" stroke="none" />
      </g>
    </svg>
  ),
  (
    <svg key="vb1" className="absolute inset-0 w-full h-full text-white transition-transform duration-700 group-hover:scale-105 pointer-events-none" viewBox="0 0 500 500" fill="none" stroke="currentColor">
      <circle cx="250" cy="220" r="160" fill="#34d399" opacity="0.03" />
      <circle cx="250" cy="220" r="80" fill="#38bdf8" opacity="0.04" />
      <g transform="translate(80, 50)">
        {/* Gauge / speedometer */}
        <path d="M70 280 A130 130 0 0 1 270 280" strokeWidth="2" opacity="0.08" fill="none" />
        <path d="M90 270 A110 110 0 0 1 250 270" strokeWidth="3" stroke="#34d399" opacity="0.15" fill="none" />
        <path d="M110 260 A90 90 0 0 1 230 260" strokeWidth="4" stroke="#38bdf8" opacity="0.12" fill="none" />
        {/* Needle */}
        <line x1="170" y1="270" x2="230" y2="170" strokeWidth="2" stroke="#34d399" opacity="0.3" />
        <circle cx="170" cy="270" r="8" fill="#34d399" fillOpacity="0.15" stroke="#34d399" strokeWidth="1" opacity="0.4" />
        <circle cx="170" cy="270" r="4" fill="#34d399" opacity="0.8" stroke="none" />
        {/* Tick marks */}
        <line x1="70" y1="280" x2="80" y2="270" strokeWidth="1.5" opacity="0.1" />
        <line x1="100" y1="210" x2="112" y2="215" strokeWidth="1.5" stroke="#34d399" opacity="0.12" />
        <line x1="170" y1="150" x2="170" y2="165" strokeWidth="1.5" stroke="#38bdf8" opacity="0.15" />
        <line x1="240" y1="210" x2="228" y2="215" strokeWidth="1.5" stroke="#34d399" opacity="0.12" />
        <line x1="270" y1="280" x2="260" y2="270" strokeWidth="1.5" opacity="0.1" />
        {/* Value display */}
        <rect x="120" y="300" width="100" height="40" rx="4" fill="currentColor" fillOpacity="0.04" stroke="none" />
        <line x1="135" y1="318" x2="205" y2="318" strokeWidth="1" stroke="#34d399" opacity="0.12" />
        {/* Particles */}
        <circle cx="80" cy="170" r="1.5" fill="#34d399" opacity="0.4" stroke="none" />
        <circle cx="260" cy="190" r="1.5" fill="#38bdf8" opacity="0.4" stroke="none" />
        <circle cx="140" cy="130" r="1.5" fill="#818cf8" opacity="0.3" stroke="none" />
      </g>
    </svg>
  ),
  (
    <svg key="vb2" className="absolute inset-0 w-full h-full text-white transition-transform duration-700 group-hover:scale-105 pointer-events-none" viewBox="0 0 500 500" fill="none" stroke="currentColor">
      <circle cx="250" cy="220" r="160" fill="#fbbf24" opacity="0.03" />
      <circle cx="250" cy="220" r="80" fill="#818cf8" opacity="0.04" />
      <g transform="translate(80, 50)">
        {/* Trophy / award shape */}
        <path d="M120 120 L120 200 Q120 260 170 280 Q220 260 220 200 L220 120 Z" strokeWidth="1.5" stroke="#fbbf24" opacity="0.18" fill="#fbbf24" fillOpacity="0.03" />
        <path d="M135 130 L135 195 Q135 245 170 262 Q205 245 205 195 L205 130 Z" strokeWidth="1" stroke="#818cf8" opacity="0.12" fill="none" />
        {/* Cup handles */}
        <path d="M120 140 Q80 140 80 180 Q80 210 120 210" strokeWidth="1" opacity="0.08" fill="none" />
        <path d="M220 140 Q260 140 260 180 Q260 210 220 210" strokeWidth="1" opacity="0.08" fill="none" />
        {/* Star inside */}
        <path d="M170 145 L178 165 L198 165 L182 178 L188 198 L170 188 L152 198 L158 178 L142 165 L162 165 Z" strokeWidth="1" stroke="#fbbf24" opacity="0.25" fill="#fbbf24" fillOpacity="0.06" />
        {/* Base */}
        <rect x="145" y="285" width="50" height="10" rx="2" fill="currentColor" fillOpacity="0.06" stroke="none" />
        <rect x="135" y="295" width="70" height="8" rx="2" fill="currentColor" fillOpacity="0.04" stroke="none" />
        {/* Sparkles */}
        <circle cx="100" cy="160" r="2" fill="#fbbf24" opacity="0.5" stroke="none" />
        <circle cx="240" cy="150" r="2" fill="#818cf8" opacity="0.5" stroke="none" />
        <circle cx="130" cy="250" r="1.5" fill="#38bdf8" opacity="0.4" stroke="none" />
        <circle cx="220" cy="240" r="1.5" fill="#fbbf24" opacity="0.4" stroke="none" />
        {/* Confetti lines */}
        <line x1="90" y1="110" x2="100" y2="100" strokeWidth="1" stroke="#fbbf24" opacity="0.15" />
        <line x1="250" y1="105" x2="240" y2="95" strokeWidth="1" stroke="#818cf8" opacity="0.12" />
        <line x1="80" y1="220" x2="90" y2="225" strokeWidth="1" stroke="#38bdf8" opacity="0.1" />
        <line x1="260" y1="230" x2="250" y2="235" strokeWidth="1" stroke="#fbbf24" opacity="0.1" />
      </g>
    </svg>
  ),
];

// Metric keys per sector
const SECTOR_METRICS: Record<string, string[]> = {
  energyMining: ['uptime', 'downtime', 'confidence'],
  governmentPrograms: ['uptime', 'sovereignty', 'response'],
  criticalInfra: ['availability', 'mttr', 'compliance'],
  cyberResilience: ['detection', 'containment', 'prevented'],
  portsLogistics: ['interdiction', 'throughput', 'incidents'],
  aiFusion: ['prediction', 'latency', 'efficiency'],
};

interface ValuePropositionProps {
  sector: string;
}

export function ValueProposition({ sector }: ValuePropositionProps) {
  const t = useTranslations(`sectors.${sector}.value`);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  const metrics = SECTOR_METRICS[sector] || ['uptime', 'downtime', 'confidence'];

  return (
    <section ref={sectionRef} className="py-20 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-display-sm md:text-display-md font-bold mb-16 text-center"
        >
          {t('heading')}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metrics.map((metric, idx) => {
            const Icon = icons[metric as keyof typeof icons];
            return (
              <motion.div
                key={metric}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className="group relative p-10 rounded-2xl bg-[#1a1b2e] border border-white/5 hover:border-white/10 hover-lift shadow-xl transition-all duration-500 overflow-hidden"
              >
                {/* Background Graphic */}
                {VALUE_BACKGROUNDS[idx]}

                <div className="absolute inset-0 bg-linear-to-br from-[#38bdf8]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

                <div className="relative z-10">
                  <div className="mb-6 text-white/80 group-hover:text-white transition-colors duration-300">
                    <div className="w-12 h-12 rounded-lg border border-white/20 flex items-center justify-center bg-white/5">
                      <Icon className="w-7 h-7" />
                    </div>
                  </div>

                  <p className="text-5xl md:text-6xl font-bold text-[#38bdf8] mb-3">
                    {t(`${metric}.metric`)}
                  </p>

                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-[#38bdf8] transition-colors">
                    {t(`${metric}.label`)}
                  </h3>

                  <p className="text-white/70 font-medium mb-3">
                    {t(`${metric}.impact`)}
                  </p>

                  <p className="text-sm text-white/50">
                    {t(`${metric}.method`)}
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-linear-to-r from-[#38bdf8] to-[#818cf8] group-hover:w-full transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
