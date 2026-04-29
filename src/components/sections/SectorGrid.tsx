'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import {
  Building2,
  Plane,
  Zap,
  Container,
  ShieldCheck,
  Leaf,
  type LucideIcon,
} from 'lucide-react';

type SectorSize = 'large' | 'medium' | 'small' | 'wide';

type SectorEntry = {
  /** Numeric translation key (1..6) */
  key: '1' | '2' | '3' | '4' | '5' | '6';
  /** Display number e.g. "01" */
  number: string;
  /** URL slug under /[locale]/sectors/{slug} */
  slug: string;
  icon: LucideIcon;
  size: SectorSize;
};

const SECTORS: readonly SectorEntry[] = [
  { key: '1', number: '01', slug: 'government-national-programs', icon: Building2,   size: 'large'  },
  { key: '2', number: '02', slug: 'aviation',                     icon: Plane,       size: 'medium' },
  { key: '3', number: '03', slug: 'energy-mining',                icon: Zap,         size: 'small'  },
  { key: '4', number: '04', slug: 'ports-borders-logistics',      icon: Container,   size: 'small'  },
  { key: '5', number: '05', slug: 'cyber-resilience',             icon: ShieldCheck, size: 'small'  },
  { key: '6', number: '06', slug: 'modern-agriculture',           icon: Leaf,        size: 'wide'   },
] as const;

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Tailwind grid-column spans for the bento layout (desktop md+). */
function colSpan(size: SectorSize): string {
  switch (size) {
    case 'large':
      return 'md:col-span-3'; // 60% of 5
    case 'medium':
      return 'md:col-span-2'; // 40% of 5
    case 'small':
      return 'md:col-span-2'; // 1/3 of 6 (row 2 uses 6-col grid)
    case 'wide':
      return 'md:col-span-6'; // full width
  }
}

/** Which row of the desktop grid this card belongs to. */
function rowFor(size: SectorSize): 'top' | 'mid' | 'wide' {
  if (size === 'large' || size === 'medium') return 'top';
  if (size === 'wide') return 'wide';
  return 'mid';
}

interface SectorCardProps {
  sector: SectorEntry;
  href: string;
  title: string;
  description: string;
  exploreLabel: string;
}

function SectorCard({ sector, href, title, description, exploreLabel }: SectorCardProps) {
  const Icon = sector.icon;
  const isLarge = sector.size === 'large';
  const isWide = sector.size === 'wide';

  const baseStyle: React.CSSProperties = {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '16px',
    transition: 'border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
  };

  // Wide banner card: horizontal on ≥md, stacked on mobile
  if (isWide) {
    return (
      <Link
        href={href}
        className="sector-card group block hover:-translate-y-0.5 transition-transform duration-300 p-6 sm:p-7 md:px-8 md:py-6 min-h-[200px] md:min-h-0 md:h-[160px]"
        style={baseStyle}
      >
        <div className="flex flex-col md:flex-row md:items-center h-full gap-3 md:gap-6">
          {/* Left: number + icon + title */}
          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            <span
              className="font-bold uppercase"
              style={{
                fontSize: '12px',
                letterSpacing: '0.2em',
                color: 'var(--accent)',
              }}
            >
              {sector.number}
            </span>
            <Icon size={20} style={{ color: 'var(--accent)' }} aria-hidden="true" />
            <h3
              className="font-semibold text-white tracking-tight transition-colors duration-300 group-hover:text-accent-hover text-xl sm:text-2xl"
            >
              {title}
            </h3>
          </div>

          {/* Center: description */}
          <p
            className="flex-1 md:text-center"
            style={{
              color: 'var(--foreground-muted)',
              fontSize: '15px',
              lineHeight: 1.6,
            }}
          >
            {description}
          </p>

          {/* Right: explore arrow */}
          <span
            className="shrink-0 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
            style={{ color: 'var(--accent)', fontSize: '13px', fontWeight: 500 }}
          >
            {exploreLabel} →
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="sector-card group block h-full hover:-translate-y-0.5 transition-transform duration-300 p-6 sm:p-7 md:px-8"
      style={{
        ...baseStyle,
        minHeight: isLarge ? '280px' : '200px',
      }}
    >
      <div className="flex flex-col h-full">
        {/* Top row: number + icon */}
        <div className="flex items-center justify-between mb-5 sm:mb-6">
          <span
            className="font-bold uppercase"
            style={{
              fontSize: '12px',
              letterSpacing: '0.2em',
              color: 'var(--accent)',
            }}
          >
            {sector.number}
          </span>
          <Icon size={20} style={{ color: 'var(--accent)' }} aria-hidden="true" />
        </div>

        {/* Title */}
        <h3
          className={`font-extrabold text-white tracking-tight transition-colors duration-300 group-hover:text-accent-hover mb-3 ${
            isLarge ? 'text-2xl sm:text-3xl md:text-[2rem]' : 'text-xl sm:text-2xl'
          }`}
          style={{ lineHeight: 1.2 }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className={isLarge ? 'line-clamp-2' : 'line-clamp-3'}
          style={{
            color: 'var(--foreground-muted)',
            fontSize: isLarge ? '16px' : '15px',
            lineHeight: 1.6,
          }}
        >
          {description}
        </p>

        {/* Bottom: explore link — always visible on touch (no hover), hover-fade on ≥md */}
        <span
          className="mt-auto pt-6 inline-flex items-center md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
          style={{ color: 'var(--accent)', fontSize: '13px', fontWeight: 500 }}
        >
          {exploreLabel} →
        </span>
      </div>
    </Link>
  );
}

interface SectorGridProps {
  title?: string;
}

/**
 * SectorGrid — bento-style asymmetric grid showcasing the 6 HC-1 sectors.
 *
 * Desktop layout:
 *   Row 1 (5-col): [LARGE 60%] [MEDIUM 40%]
 *   Row 2 (6-col): [SMALL] [SMALL] [SMALL]
 *   Row 3 (6-col): [WIDE banner full]
 *
 * Mobile: single column stack.
 */
export function SectorGrid({ title }: SectorGridProps = {}) {
  const t = useTranslations('sectors');
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const prefersReducedMotion = useReducedMotion();
  const exploreLabel = t('explore');

  const topRow = SECTORS.filter((s) => rowFor(s.size) === 'top');
  const midRow = SECTORS.filter((s) => rowFor(s.size) === 'mid');
  const wideRow = SECTORS.filter((s) => rowFor(s.size) === 'wide');

  return (
    <section ref={sectionRef} className="py-20 md:py-32">
      <div className="container px-4 sm:px-6">
        {/* Section header — left aligned */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-12 md:mb-16"
        >
          <p
            className="uppercase mb-4 text-accent font-semibold"
            style={{
              fontSize: '12px',
              letterSpacing: '0.25em',
            }}
          >
            {t('eyebrow')}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
            {title || t('heading')}
          </h2>
          <p className="text-base sm:text-lg text-foreground-muted leading-relaxed">
            {t('description')}
          </p>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView && !prefersReducedMotion ? 'visible' : 'hidden'}
          className="flex flex-col gap-5"
        >
          {/* Row 1: large + medium (5-col split) */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
            {topRow.map((sector) => (
              <motion.div key={sector.key} variants={item} className={colSpan(sector.size)}>
                <SectorCard
                  sector={sector}
                  href={`/${locale}/sectors/${sector.slug}`}
                  title={t(`${sector.key}.title`)}
                  description={t(`${sector.key}.description`)}
                  exploreLabel={exploreLabel}
                />
              </motion.div>
            ))}
          </div>

          {/* Row 2: 3 equal small cards (6-col grid, span 2 each) */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
            {midRow.map((sector) => (
              <motion.div key={sector.key} variants={item} className={colSpan(sector.size)}>
                <SectorCard
                  sector={sector}
                  href={`/${locale}/sectors/${sector.slug}`}
                  title={t(`${sector.key}.title`)}
                  description={t(`${sector.key}.description`)}
                  exploreLabel={exploreLabel}
                />
              </motion.div>
            ))}
          </div>

          {/* Row 3: full-width banner */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
            {wideRow.map((sector) => (
              <motion.div key={sector.key} variants={item} className={colSpan(sector.size)}>
                <SectorCard
                  sector={sector}
                  href={`/${locale}/sectors/${sector.slug}`}
                  title={t(`${sector.key}.title`)}
                  description={t(`${sector.key}.description`)}
                  exploreLabel={exploreLabel}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Card-level hover border (scoped to .sector-card to avoid global side-effects) */}
      <style jsx>{`
        section :global(.sector-card:hover) {
          border-color: var(--accent);
          box-shadow: var(--shadow-md);
        }
      `}</style>
    </section>
  );
}
