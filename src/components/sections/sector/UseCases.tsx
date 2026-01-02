'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView, useReducedMotion } from 'framer-motion';

interface UseCasesProps {
  sector: string;
}

export function UseCases({ sector }: UseCasesProps) {
  const t = useTranslations(`sectors.${sector}.useCases`);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  const cases = ['offshore', 'mining', 'pipeline'];

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
              className="p-8 rounded-lg border-l-4 border-accent bg-surface-elevated"
            >
              <h3 className="text-heading-lg font-semibold mb-4">
                {t(`${useCase}.title`)}
              </h3>
              <p className="text-body text-foreground-secondary leading-relaxed">
                {t(`${useCase}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
