'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowRight } from 'lucide-react';

type StatKey = 'latency' | 'antiSpoofing' | 'apps' | 'patents';

type StatConfig = {
  key: StatKey;
  value: string;
};

const STATS: readonly StatConfig[] = [
  { key: 'latency', value: '<3ms' },
  { key: 'antiSpoofing', value: '100%' },
  { key: 'apps', value: '10+' },
  { key: 'patents', value: '3' },
] as const;

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * BackboneSection — full-width dark section showcasing HCS-U7 as the shared backbone
 * underpinning every HC-1 division.
 */
export function BackboneSection() {
  const t = useTranslations('backbone');
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:py-32"
      style={{ background: '#0a0a0a' }}
    >
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
      {/* Soft accent glow */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,194,255,0.08) 0%, transparent 60%)' }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate={isInView && !prefersReducedMotion ? 'visible' : 'hidden'}
        className="relative z-10 container"
      >
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 md:mb-16">
          <motion.p
            variants={item}
            className="uppercase tracking-[0.2em] text-xs mb-4 text-foreground-secondary"
          >
            {t('label')}
          </motion.p>
          <motion.h2
            variants={item}
            className="text-display-sm md:text-display-md font-bold mb-5"
          >
            <span className="text-foreground">{t('titlePrefix')} </span>
            <span className="text-gradient-accent">{t('titleHighlight')}</span>
          </motion.h2>
          <motion.p
            variants={item}
            className="text-body md:text-body-lg text-foreground-secondary leading-relaxed"
          >
            {t('description')}
          </motion.p>
        </div>

        {/* Stats */}
        <motion.div
          variants={item}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-14"
        >
          {STATS.map((stat) => (
            <div
              key={stat.key}
              className="glass hover-lift rounded-2xl p-6 md:p-7 text-center"
            >
              <div className="text-3xl md:text-4xl font-extrabold text-gradient-accent mb-2 tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-foreground-secondary leading-snug">
                {t(`stats.${stat.key}`)}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div variants={item} className="flex justify-center">
          <a
            href={`/${locale}/capabilities/hybrid-vector`}
            className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:gap-3"
            style={{
              background: 'rgba(0, 194, 255, 0.08)',
              border: '1px solid var(--border-accent)',
              boxShadow: 'var(--shadow-glow-subtle)',
            }}
          >
            <span>{t('cta')}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
