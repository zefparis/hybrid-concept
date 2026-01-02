'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { TrendingUp, DollarSign, Award } from 'lucide-react';

const icons = {
  uptime: TrendingUp,
  downtime: DollarSign,
  confidence: Award,
};

interface ValuePropositionProps {
  sector: string;
}

export function ValueProposition({ sector }: ValuePropositionProps) {
  const t = useTranslations(`sectors.${sector}.value`);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  const metrics = ['uptime', 'downtime', 'confidence'];

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
                className="relative p-10 rounded-lg border border-border bg-surface-elevated hover-lift group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />

                <div className="relative z-10">
                  <Icon className="w-10 h-10 text-accent mb-6" />

                  <p className="text-5xl md:text-6xl font-bold text-gradient-accent mb-3">
                    {t(`${metric}.metric`)}
                  </p>

                  <h3 className="text-heading-lg font-semibold mb-4">
                    {t(`${metric}.label`)}
                  </h3>

                  <p className="text-body text-foreground-secondary mb-3">
                    {t(`${metric}.impact`)}
                  </p>

                  <p className="text-body-sm text-foreground-muted">
                    {t(`${metric}.method`)}
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-accent to-accent-hover group-hover:w-full transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
