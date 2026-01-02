'use client';

import { useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui';

interface SectorCTAProps {
  sector: string;
}

export function SectorCTA({ sector }: SectorCTAProps) {
  const t = useTranslations(`sectors.${sector}.cta`);
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section ref={sectionRef} className="py-20 md:py-32 px-6 md:px-12 bg-surface">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-display-sm md:text-display-md font-bold mb-6">
            {t('heading')}
          </h2>
          <p className="text-body-lg text-foreground-secondary mb-10 leading-relaxed">
            {t('description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href={`/${locale}/contact`} size="lg">
              {t('primary')}
            </Button>
            <Button href={`/${locale}/capabilities`} size="lg" variant="outline">
              {t('secondary')}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
