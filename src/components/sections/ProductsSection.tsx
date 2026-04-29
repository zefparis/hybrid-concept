'use client';

import { useRef, type CSSProperties } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import {
  ShieldCheck,
  Fingerprint,
  Eye,
  Radio,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

type ProductKey = 'hcsU7' | 'hvGuard' | 'shadowMode' | 'droneAntiSpoofing';

type ProductConfig = {
  key: ProductKey;
  href: (locale: string) => string;
  accent: string;
  icon: LucideIcon;
  badges: readonly string[];
};

const PRODUCTS: readonly ProductConfig[] = [
  {
    key: 'hcsU7',
    href: (l) => `/${l}/products/hcs-u7`,
    accent: '#7C3AED',
    icon: ShieldCheck,
    badges: ['PQC FIPS 203/204', 'Brain ML', '<3ms latency'],
  },
  {
    key: 'hvGuard',
    href: (l) => `/${l}/products/hv-guard`,
    accent: '#0D9488',
    icon: Fingerprint,
    badges: ['10 Guard apps', 'Face + Voice + Cognitive', 'Offline-first'],
  },
  {
    key: 'shadowMode',
    href: (l) => `/${l}/products/shadow-mode`,
    accent: '#D97706',
    icon: Eye,
    badges: ['Zero integration', 'Live Threat Map', 'PDF reports'],
  },
  {
    key: 'droneAntiSpoofing',
    href: (l) => `/${l}/contact`,
    accent: '#DC2626',
    icon: Radio,
    badges: ['FR Patent', 'Byzantine consensus', '< 150g / < €500'],
  },
] as const;

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const card: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * ProductsSection — homepage 2x2 product grid.
 * Replaces the legacy 3-division layout with the four real HMH products.
 * Cards are minimal: var(--surface) background, var(--border) border, hover
 * promotes border to the product accent color and lifts the card by 2px.
 */
export function ProductsSection() {
  const t = useTranslations('products');
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 bg-surface">
      <div className="container">
        {/* Header — left aligned */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-12 md:mb-16"
        >
          <p className="uppercase tracking-[0.25em] text-xs sm:text-sm mb-4 text-accent font-semibold">
            {t('eyebrow')}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-5 tracking-tight leading-tight">
            {t('heading')}
          </h2>
          <p className="text-base sm:text-lg text-foreground-muted leading-relaxed">
            {t('description')}
          </p>
        </motion.div>

        {/* 2x2 grid */}
        <motion.ul
          variants={container}
          initial="hidden"
          animate={isInView && !prefersReducedMotion ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 list-none p-0 m-0"
        >
          {PRODUCTS.map((product) => {
            const Icon = product.icon;
            const cardStyle: CSSProperties = {
              ['--card-accent' as string]: product.accent,
              background: 'var(--surface)',
              borderRadius: '16px',
            };
            return (
              <motion.li key={product.key} variants={card}>
                <Link
                  href={product.href(locale)}
                  className="group block h-full p-8 md:p-10 border border-border transition-all duration-300 hover:-translate-y-0.5 hover:border-(--card-accent)"
                  style={cardStyle}
                >
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `${product.accent}1A`,
                      border: `1px solid ${product.accent}40`,
                    }}
                  >
                    <Icon
                      className="w-6 h-6"
                      style={{ color: product.accent }}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-[1.7rem] font-extrabold text-white mb-2 tracking-tight leading-tight">
                    {t(`${product.key}.title`)}
                  </h3>

                  {/* Subtitle */}
                  <p
                    className="text-xs font-semibold mb-5 uppercase tracking-wider"
                    style={{ color: product.accent }}
                  >
                    {t(`${product.key}.subtitle`)}
                  </p>

                  {/* Description */}
                  <p className="text-white/85 leading-relaxed text-[15px] md:text-base mb-6">
                    {t(`${product.key}.description`)}
                  </p>

                  {/* Badges */}
                  <ul
                    className="flex flex-wrap gap-2 mb-6 list-none p-0 m-0"
                    aria-label={t(`${product.key}.title`)}
                  >
                    {product.badges.map((badge) => (
                      <li
                        key={badge}
                        className="text-xs sm:text-[13px] font-semibold tracking-wide px-3 py-1.5 rounded-full"
                        style={{
                          background: `${product.accent}1F`,
                          color: '#fff',
                          border: `1px solid ${product.accent}55`,
                        }}
                      >
                        {badge}
                      </li>
                    ))}
                  </ul>

                  {/* Discover link */}
                  <span
                    className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3"
                    style={{ color: product.accent }}
                  >
                    {t('discover')}
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
