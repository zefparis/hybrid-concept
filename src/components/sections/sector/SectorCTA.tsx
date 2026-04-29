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
    <section ref={sectionRef} className="py-16 sm:py-20 md:py-32 px-4 sm:px-6 md:px-12 bg-surface">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-display-md font-bold mb-6 wrap-break-word">
            {t('heading')}
          </h2>
          <p className="text-base sm:text-body-lg text-foreground-secondary mb-8 sm:mb-10 leading-relaxed">
            {t('description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center">
            <Button href="https://www.hcs-u7.com" size="lg" className="w-full sm:w-auto">
              {t('primary')}
            </Button>
            <Button href={`/${locale}/sectors`} size="lg" variant="outline" className="w-full sm:w-auto">
              {t('secondary')}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
