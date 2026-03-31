'use client';

import React from 'react';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { AlertTriangle, DollarSign, Shield, Lock } from 'lucide-react';

// Risk categories per sector
const SECTOR_RISKS: Record<string, [string, string]> = {
  energyMining: ['production', 'revenueGaps'],
  governmentPrograms: ['security', 'operational'],
  criticalInfra: ['operational', 'strategic'],
  cyberResilience: ['technical', 'operational'],
  portsLogistics: ['security', 'operational'],
  aiFusion: ['analytical', 'technical'],
};

const icons = {
  production: AlertTriangle,
  revenueGaps: DollarSign,
  security: Shield,
  operational: AlertTriangle,
  strategic: DollarSign,
  technical: Lock,
  analytical: AlertTriangle,
};

const RISK_BACKGROUNDS: React.ReactNode[] = [
  (
    <svg key="rb0" className="absolute inset-0 w-full h-full text-white transition-transform duration-700 group-hover:scale-105 pointer-events-none" viewBox="0 0 500 500" fill="none" stroke="currentColor">
      <circle cx="350" cy="150" r="140" fill="#00C2FF" opacity="0.02" />
      <circle cx="350" cy="150" r="70" fill="#00C2FF" opacity="0.03" />
      <g transform="translate(150, 60)">
        {/* Warning triangle */}
        <path d="M130 40 L240 230 L20 230 Z" strokeWidth="1.5" opacity="0.08" fill="currentColor" fillOpacity="0.02" />
        <path d="M130 70 L220 220 L40 220 Z" strokeWidth="1.5" stroke="#00C2FF" opacity="0.12" fill="#00C2FF" fillOpacity="0.02" />
        {/* Exclamation */}
        <line x1="130" y1="110" x2="130" y2="170" strokeWidth="3" stroke="#00C2FF" opacity="0.2" strokeLinecap="round" />
        <circle cx="130" cy="195" r="5" fill="#00C2FF" opacity="0.25" stroke="none" />
        {/* Ripple rings */}
        <circle cx="130" cy="150" r="60" strokeWidth="1" stroke="#00C2FF" opacity="0.06" strokeDasharray="4 6" />
        <circle cx="130" cy="150" r="90" strokeWidth="0.5" opacity="0.04" strokeDasharray="6 4" />
        {/* Data points */}
        <circle cx="50" cy="130" r="2" fill="#00C2FF" opacity="0.4" stroke="none" />
        <circle cx="210" cy="120" r="2" fill="#00C2FF" opacity="0.3" stroke="none" />
        <circle cx="80" cy="260" r="1.5" fill="#00C2FF" opacity="0.3" stroke="none" />
        <circle cx="190" cy="260" r="1.5" fill="#00C2FF" opacity="0.3" stroke="none" />
      </g>
    </svg>
  ),
  (
    <svg key="rb1" className="absolute inset-0 w-full h-full text-white transition-transform duration-700 group-hover:scale-105 pointer-events-none" viewBox="0 0 500 500" fill="none" stroke="currentColor">
      <circle cx="350" cy="150" r="140" fill="#00C2FF" opacity="0.02" />
      <circle cx="350" cy="150" r="70" fill="#00C2FF" opacity="0.03" />
      <g transform="translate(150, 60)">
        {/* Bar chart declining */}
        <rect x="30" y="100" width="35" height="130" rx="2" fill="#00C2FF" fillOpacity="0.06" stroke="none" />
        <rect x="80" y="140" width="35" height="90" rx="2" fill="#00C2FF" fillOpacity="0.05" stroke="none" />
        <rect x="130" y="170" width="35" height="60" rx="2" fill="#00C2FF" fillOpacity="0.04" stroke="none" />
        <rect x="180" y="195" width="35" height="35" rx="2" fill="#00C2FF" fillOpacity="0.05" stroke="none" />
        {/* Trend line */}
        <path d="M47 95 L97 135 L147 165 L197 190" strokeWidth="2" stroke="#00C2FF" opacity="0.18" fill="none" strokeDasharray="6 4" />
        {/* Dots */}
        <circle cx="47" cy="95" r="4" fill="#00C2FF" opacity="0.6" stroke="none" />
        <circle cx="97" cy="135" r="3" fill="#00C2FF" opacity="0.5" stroke="none" />
        <circle cx="147" cy="165" r="3" fill="#00C2FF" opacity="0.5" stroke="none" />
        <circle cx="197" cy="190" r="4" fill="#00C2FF" opacity="0.5" stroke="none" />
        {/* Base */}
        <line x1="20" y1="230" x2="230" y2="230" strokeWidth="1" opacity="0.06" />
        {/* Particles */}
        <circle cx="60" cy="70" r="1.5" fill="#00C2FF" opacity="0.4" stroke="none" />
        <circle cx="220" cy="160" r="1.5" fill="#00C2FF" opacity="0.3" stroke="none" />
      </g>
    </svg>
  ),
];

interface RiskLandscapeProps {
  sector: string;
}

export function RiskLandscape({ sector }: RiskLandscapeProps) {
  const t = useTranslations(`sectors.${sector}.risks`);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();
  
  const [category1, category2] = SECTOR_RISKS[sector] || ['production', 'revenueGaps'];
  const Icon1 = icons[category1 as keyof typeof icons] || AlertTriangle;
  const Icon2 = icons[category2 as keyof typeof icons] || DollarSign;

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* First Risk Category */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView && !prefersReducedMotion ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group relative p-8 md:p-10 rounded-2xl bg-surface-card border border-white/8 hover:border-white/15 shadow-xl transition-all duration-500 overflow-hidden"
          >
            {/* Background Graphic */}
            {RISK_BACKGROUNDS[0]}

            {/* Hover gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-[#00C2FF]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-start gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg border border-border-strong flex items-center justify-center bg-surface/50 text-accent shrink-0">
                  <Icon1 className="w-5 h-5" />
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight min-w-0">
                  {t(`${category1}.title`)}
                </h3>
              </div>
              <ul className="space-y-6">
                {[0, 1, 2].map((i) => (
                  <li key={i} className="pl-6 border-l-2 border-border">
                    <p className="font-semibold text-foreground mb-2">
                      {t(`${category1}.items.${i}.label`)}
                    </p>
                    <p className="text-sm text-foreground-secondary">
                      {t(`${category1}.items.${i}.details`)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Second Risk Category */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView && !prefersReducedMotion ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="group relative p-8 md:p-10 rounded-2xl bg-surface-card border border-white/8 hover:border-white/15 shadow-xl transition-all duration-500 overflow-hidden"
          >
            {/* Background Graphic */}
            {RISK_BACKGROUNDS[1]}

            {/* Hover gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-[#00C2FF]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-start gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg border border-border-strong flex items-center justify-center bg-surface/50 text-accent shrink-0">
                  <Icon2 className="w-5 h-5" />
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight min-w-0">
                  {t(`${category2}.title`)}
                </h3>
              </div>
              <ul className="space-y-6">
                {[0, 1, 2].map((i) => (
                  <li key={i} className="pl-6 border-l-2 border-border">
                    <p className="font-semibold text-foreground mb-2">
                      {t(`${category2}.items.${i}.label`)}
                    </p>
                    <p className="text-sm text-foreground-secondary">
                      {t(`${category2}.items.${i}.details`)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
