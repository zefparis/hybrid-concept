'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Shield, Cpu, TrendingUp, type LucideIcon } from 'lucide-react';

type DivisionKey = 'secure' | 'operate' | 'finance';
type AuthorKey = 'iaSolution' | 'benoitBogaerts';

type DivisionConfig = {
  key: DivisionKey;
  accent: string;
  icon: LucideIcon;
  products: readonly string[];
  authorKey: AuthorKey;
};

const DIVISIONS: readonly DivisionConfig[] = [
  {
    key: 'secure',
    accent: '#7C3AED',
    icon: Shield,
    products: ['HCS-U7', 'HV-GUARD', 'Drone anti-spoofing', 'Shadow Mode'],
    authorKey: 'iaSolution',
  },
  {
    key: 'operate',
    accent: '#0D9488',
    icon: Cpu,
    products: ['AgentOS', 'Good People Data', 'SA Networks'],
    authorKey: 'benoitBogaerts',
  },
  {
    key: 'finance',
    accent: '#D97706',
    icon: TrendingUp,
    products: ['AEC Gateway', 'INFRAGATE Africa', 'DFIs / AfDB'],
    authorKey: 'benoitBogaerts',
  },
] as const;

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * DivisionGrid — HC-1 product architecture: Secure / Operate / Finance.
 * Replaces the legacy Plan/Integrate/Assure pillars.
 */
export function DivisionGrid() {
  const t = useTranslations('divisions');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 bg-surface">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14 md:mb-16 max-w-3xl mx-auto"
        >
          <p className="uppercase tracking-[0.2em] text-xs mb-4 text-foreground-secondary">
            {t('eyebrow')}
          </p>
          <h2 className="text-display-sm md:text-display-md font-bold text-foreground mb-5">
            {t('heading')}
          </h2>
          <p className="text-body md:text-body-lg text-foreground-secondary leading-relaxed">
            {t('subheading')}
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView && !prefersReducedMotion ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {DIVISIONS.map((division) => {
            const Icon = division.icon;
            return (
              <motion.article
                key={division.key}
                variants={cardVariant}
                className="group relative rounded-2xl overflow-hidden hover-lift"
                style={{
                  background: 'linear-gradient(145deg, #162032 0%, #131c2e 100%)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.35)',
                }}
              >
                {/* Top accent bar */}
                <div
                  className="absolute top-0 inset-x-0 h-[2px]"
                  style={{ background: `linear-gradient(90deg, ${division.accent} 0%, transparent 75%)` }}
                />

                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 90% 10%, ${division.accent}1A 0%, transparent 58%)` }}
                />

                {/* Inset border on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: `inset 0 0 0 1px ${division.accent}30` }}
                />

                <div className="relative z-10 p-8 md:p-10 flex flex-col h-full">
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110"
                    style={{
                      background: `${division.accent}18`,
                      border: `1px solid ${division.accent}35`,
                      boxShadow: `0 4px 24px ${division.accent}15`,
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: division.accent }} aria-hidden="true" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-[1.6rem] font-extrabold text-white mb-3 tracking-tight leading-tight">
                    {t(`${division.key}.title`)}
                  </h3>

                  {/* Accent underline */}
                  <div
                    className="rounded-full mb-5 h-[2px] transition-all duration-500 group-hover:w-14"
                    style={{ background: division.accent, width: '2rem' }}
                  />

                  {/* Subtitle */}
                  <p className="text-white/60 leading-relaxed text-sm md:text-[0.95rem] mb-6">
                    {t(`${division.key}.subtitle`)}
                  </p>

                  {/* Product badges */}
                  <ul className="flex flex-wrap gap-2 mt-auto" aria-label={t(`${division.key}.title`)}>
                    {division.products.map((product) => (
                      <li
                        key={product}
                        className="text-[11px] font-semibold tracking-wide px-2.5 py-1 rounded-full"
                        style={{
                          background: `${division.accent}14`,
                          color: division.accent,
                          border: `1px solid ${division.accent}30`,
                        }}
                      >
                        {product}
                      </li>
                    ))}
                  </ul>

                  {/* Author label */}
                  <p
                    className="mt-2"
                    style={{ fontSize: '12px', color: 'var(--foreground-muted)' }}
                  >
                    {t(`authors.${division.authorKey}`)}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
