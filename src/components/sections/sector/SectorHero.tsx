'use client';

import { useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface SectorHeroProps {
  sector: string;
}

// Stats keys per sector
const SECTOR_STATS: Record<string, string[]> = {
  energyMining: ['gdp', 'downtime', 'threats'],
  governmentPrograms: ['systems', 'sovereignty', 'compliance'],
  criticalInfra: ['services', 'downtime', 'cascades'],
  cyberResilience: ['threats', 'detection', 'containment'],
  portsLogistics: ['cargo', 'disruption', 'threats'],
  aiFusion: ['data', 'accuracy', 'latency'],
};

// Sector-specific images for side layout
const SECTOR_IMAGES: Record<string, string> = {
  cyberResilience: '/images/hcsshield.jpg',
};

export function SectorHero({ sector }: SectorHeroProps) {
  const t = useTranslations(`sectors.${sector}.hero`);
  const tStats = useTranslations(`sectors.${sector}.stats`);
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true });
  const prefersReducedMotion = useReducedMotion();
  
  const statKeys = SECTOR_STATS[sector] || ['gdp', 'downtime', 'threats'];
  const sideImage = SECTOR_IMAGES[sector];
  const hasSideImage = !!sideImage;

  return (
    <section
      ref={sectionRef}
      className={`relative ${hasSideImage ? 'min-h-[600px]' : 'min-h-[60vh]'} flex items-center overflow-hidden`}
    >
      {/* Background image - only for sectors without side image */}
      {!hasSideImage && (
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/images/sectors/energy-mining-hero.jpg)',
            }}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-background/80 via-background/70 to-background" />
        </div>
      )}

      {/* Content */}
      <div className={`relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full ${hasSideImage ? 'py-16' : 'pb-12'}`}>
        <div className={`grid ${hasSideImage ? 'grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center' : 'grid-cols-1'}`}>
          {/* Text column - 60% */}
          <div className={`${hasSideImage ? 'lg:col-span-3' : ''}`}>
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
              <h1 className="text-display-md md:text-display-lg font-extrabold text-foreground mb-6">
                {t('title')}
              </h1>
              <p className="text-body-lg md:text-heading-md text-foreground-secondary max-w-3xl leading-relaxed">
                {t('lead')}
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-3 sm:gap-8 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {statKeys.map((key) => (
                <div key={key} className="glass p-3 sm:p-6 rounded-lg border border-border">
                  <p className="text-xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-1 sm:mb-2 leading-tight">
                    {tStats(`${key}.value`)}
                  </p>
                  <p className="text-[10px] sm:text-body-sm text-foreground-secondary leading-tight">
                    {tStats(`${key}.label`)}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Image column - 40% (only for sectors with side image) */}
          {hasSideImage && (
            <motion.div
              className="lg:col-span-2 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView && !prefersReducedMotion ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative w-full max-w-md -mt-8">
                <Image
                  src={sideImage}
                  alt={t('title')}
                  width={500}
                  height={375}
                  className="w-full h-auto object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
