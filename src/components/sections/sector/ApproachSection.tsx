'use client';

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
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-accent text-white'
                    : 'bg-surface-elevated text-foreground-secondary hover:bg-surface-hover'
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
          className="p-8 rounded-lg border border-border bg-surface-elevated"
        >
          <h3 className="text-heading-lg font-semibold mb-4">
            {t(`${activeTab}.title`)}
          </h3>
          <p className="text-body text-foreground-secondary mb-6 leading-relaxed">
            {t(`${activeTab}.description`)}
          </p>
          <div className="pl-4 border-l-2 border-accent">
            <p className="text-body-sm font-medium text-accent mb-1">Outcome</p>
            <p className="text-body text-foreground">
              {t(`${activeTab}.outcome`)}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
