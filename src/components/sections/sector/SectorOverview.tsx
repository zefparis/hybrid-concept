'use client';

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
                className="p-8 rounded-lg border border-border bg-surface-elevated hover:bg-surface-hover transition-colors"
              >
                <Icon className="w-8 h-8 text-accent mb-6" />
                <h3 className="text-heading-lg font-semibold mb-4">
                  {t(`${col}.title`)}
                </h3>
                <ul className="space-y-3">
                  {[0, 1, 2].map((i) => (
                    <li key={i} className="text-body-sm text-foreground-secondary flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 mr-3 shrink-0" />
                      <span>{t(`${col}.points.${i}`)}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
