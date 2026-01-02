'use client';

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
          >
            <div className="flex items-center gap-3 mb-6">
              <Icon1 className="w-6 h-6 text-accent" />
              <h3 className="text-heading-lg font-semibold">
                {t(`${category1}.title`)}
              </h3>
            </div>
            <ul className="space-y-6">
              {[0, 1, 2].map((i) => (
                <li key={i} className="pl-6 border-l-2 border-border">
                  <p className="text-body font-medium text-foreground mb-2">
                    {t(`${category1}.items.${i}.label`)}
                  </p>
                  <p className="text-body-sm text-foreground-secondary">
                    {t(`${category1}.items.${i}.details`)}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Second Risk Category */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView && !prefersReducedMotion ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Icon2 className="w-6 h-6 text-accent" />
              <h3 className="text-heading-lg font-semibold">
                {t(`${category2}.title`)}
              </h3>
            </div>
            <ul className="space-y-6">
              {[0, 1, 2].map((i) => (
                <li key={i} className="pl-6 border-l-2 border-border">
                  <p className="text-body font-medium text-foreground mb-2">
                    {t(`${category2}.items.${i}.label`)}
                  </p>
                  <p className="text-body-sm text-foreground-secondary">
                    {t(`${category2}.items.${i}.details`)}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
