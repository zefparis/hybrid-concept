'use client';

import { useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { CAPABILITIES } from '@/lib/constants';

export function CapabilitiesIntegration() {
  const t = useTranslations('sectors.energyMining.capabilities');
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section ref={sectionRef} className="py-20 md:py-32 px-6 md:px-12 bg-surface">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-display-sm md:text-display-md font-bold mb-4">
            {t('heading')}
          </h2>
          <p className="text-body-lg text-foreground-secondary max-w-3xl">
            {t('intro')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CAPABILITIES.map((capability, idx) => (
            <motion.div
              key={capability.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.05 }}
            >
              <Link
                href={`/${locale}/capabilities/${capability.slug}`}
                className="block p-6 rounded-lg border border-border bg-surface-elevated hover:border-accent hover-lift transition-all group"
              >
                <h3 className="text-heading-md font-semibold mb-2 group-hover:text-accent transition-colors">
                  {capability.name}
                </h3>
                <p className="text-body-sm text-foreground-muted mb-3">
                  {capability.tagline}
                </p>
                <p className="text-body-sm text-foreground-secondary line-clamp-2">
                  {capability.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
