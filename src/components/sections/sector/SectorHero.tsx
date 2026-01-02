'use client';

import { useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import Link from 'next/link';

interface SectorHeroProps {
  sector: string;
}

export function SectorHero({ sector }: SectorHeroProps) {
  const t = useTranslations(`sectors.${sector}.hero`);
  const tStats = useTranslations(`sectors.${sector}.stats`);
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/sectors/energy-mining-hero.jpg)',
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Breadcrumb */}
        <nav className="text-body-sm text-foreground-secondary mb-8">
          <Link
            href={`/${locale}`}
            className="hover:text-foreground transition-colors"
          >
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/${locale}/sectors`}
            className="hover:text-foreground transition-colors"
          >
            Sectors
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{t('title')}</span>
        </nav>

        {/* Title & subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-body uppercase tracking-[0.2em] text-accent mb-4">
            {t('subtitle')}
          </p>
          <h1 className="text-display-md md:text-display-lg font-bold text-gradient mb-6">
            {t('title')}
          </h1>
          <p className="text-body-lg md:text-heading-md text-foreground-secondary max-w-3xl leading-relaxed">
            {t('lead')}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="glass p-6 rounded-lg border border-border">
            <p className="text-4xl md:text-5xl font-bold text-accent mb-2">
              {tStats('gdp.value')}
            </p>
            <p className="text-body-sm text-foreground-secondary">
              {tStats('gdp.label')}
            </p>
          </div>
          <div className="glass p-6 rounded-lg border border-border">
            <p className="text-4xl md:text-5xl font-bold text-accent mb-2">
              {tStats('downtime.value')}
            </p>
            <p className="text-body-sm text-foreground-secondary">
              {tStats('downtime.label')}
            </p>
          </div>
          <div className="glass p-6 rounded-lg border border-border">
            <p className="text-4xl md:text-5xl font-bold text-accent mb-2">
              {tStats('threats.value')}
            </p>
            <p className="text-body-sm text-foreground-secondary">
              {tStats('threats.label')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
