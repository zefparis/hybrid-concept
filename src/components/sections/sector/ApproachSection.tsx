'use client';

import React from 'react';
import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Layers, Workflow, Shield } from 'lucide-react';

const icons = {
  architecture: Layers,
  integration: Workflow,
  continuity: Shield,
  assurance: Shield,
  zerotrust: Shield,
  soc: Workflow,
  intelligence: Layers,
  modeling: Layers,
  hardening: Shield,
  monitoring: Workflow,
  surveillance: Workflow,
  coordination: Layers,
  fusion: Layers,
  prediction: Workflow,
  autonomy: Shield,
};

// Tab keys per sector
const SECTOR_TABS: Record<string, string[]> = {
  energyMining: ['architecture', 'integration', 'continuity'],
  governmentPrograms: ['architecture', 'integration', 'assurance'],
  criticalInfra: ['modeling', 'hardening', 'monitoring'],
  cyberResilience: ['zerotrust', 'soc', 'intelligence'],
  portsLogistics: ['surveillance', 'intelligence', 'coordination'],
  aiFusion: ['fusion', 'prediction', 'autonomy'],
};

interface ApproachSectionProps {
  sector: string;
}

export function ApproachSection({ sector }: ApproachSectionProps) {
  const t = useTranslations(`sectors.${sector}.approach`);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();
  
  const tabs = SECTOR_TABS[sector] || ['architecture', 'integration', 'continuity'];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 px-6 md:px-12 bg-surface">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-display-sm md:text-display-md font-bold mb-6">
            {t('heading')}
          </h2>
          <p className="text-body-lg text-foreground-secondary max-w-4xl leading-relaxed">
            {t('intro')}
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {tabs.map((tab) => {
            const Icon = icons[tab as keyof typeof icons];
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-accent text-white shadow-lg shadow-accent/20'
                    : 'bg-surface-card text-foreground-secondary border border-border hover:border-border-strong hover:text-foreground'
                }`}
              >
                <Icon className="w-5 h-5" />
                {t(`${tab}.title`)}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="group relative p-8 md:p-10 rounded-2xl bg-surface-card border border-white/8 shadow-xl overflow-hidden"
        >
          {/* Background SVG */}
          <svg className="absolute inset-0 w-full h-full text-white transition-transform duration-700 pointer-events-none" viewBox="0 0 800 400" fill="none" stroke="currentColor">
            <circle cx="650" cy="200" r="180" fill="#00C2FF" opacity="0.02" />
            <circle cx="650" cy="200" r="90" fill="#00C2FF" opacity="0.03" />
            <g transform="translate(450, 50)">
              {/* Layered architecture blocks */}
              <rect x="40" y="60" width="200" height="40" rx="4" fill="currentColor" fillOpacity="0.04" strokeWidth="1" opacity="0.08" />
              <rect x="40" y="110" width="200" height="40" rx="4" fill="#00C2FF" fillOpacity="0.03" strokeWidth="1" stroke="#00C2FF" opacity="0.1" />
              <rect x="40" y="160" width="200" height="40" rx="4" fill="#00C2FF" fillOpacity="0.02" strokeWidth="1" stroke="#00C2FF" opacity="0.08" />
              <rect x="40" y="210" width="200" height="40" rx="4" fill="#00C2FF" fillOpacity="0.02" strokeWidth="1" stroke="#00C2FF" opacity="0.06" />
              {/* Connection arrows between layers */}
              <line x1="140" y1="100" x2="140" y2="110" strokeWidth="1" stroke="#00C2FF" opacity="0.15" />
              <line x1="140" y1="150" x2="140" y2="160" strokeWidth="1" stroke="#00C2FF" opacity="0.12" />
              <line x1="140" y1="200" x2="140" y2="210" strokeWidth="1" stroke="#00C2FF" opacity="0.1" />
              {/* Nodes */}
              <circle cx="140" cy="80" r="3" fill="#00C2FF" opacity="0.5" stroke="none" />
              <circle cx="140" cy="130" r="4" fill="#00C2FF" opacity="0.6" stroke="none" />
              <circle cx="140" cy="180" r="3" fill="#00C2FF" opacity="0.5" stroke="none" />
              <circle cx="140" cy="230" r="3" fill="#00C2FF" opacity="0.4" stroke="none" />
              {/* Decorative lines */}
              <line x1="60" y1="75" x2="120" y2="75" strokeWidth="1" stroke="#00C2FF" opacity="0.08" />
              <line x1="160" y1="125" x2="220" y2="125" strokeWidth="1" stroke="#00C2FF" opacity="0.06" />
              {/* Particles */}
              <circle cx="20" cy="100" r="1.5" fill="#00C2FF" opacity="0.4" stroke="none" />
              <circle cx="260" cy="180" r="1.5" fill="#00C2FF" opacity="0.3" stroke="none" />
              <circle cx="80" cy="260" r="1.5" fill="#00C2FF" opacity="0.3" stroke="none" />
            </g>
          </svg>

          <div className="relative z-10">
            <h3 className="text-2xl font-extrabold text-foreground mb-4 tracking-tight">
              {t(`${activeTab}.title`)}
            </h3>
            <p className="text-foreground-secondary font-medium mb-6 leading-relaxed">
              {t(`${activeTab}.description`)}
            </p>
            <div className="pl-4 border-l-2 border-accent">
              <p className="text-sm font-semibold text-accent mb-1">Outcome</p>
              <p className="text-foreground-muted font-medium">
                {t(`${activeTab}.outcome`)}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
