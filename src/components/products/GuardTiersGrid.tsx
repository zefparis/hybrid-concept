'use client';

import { useRef, type CSSProperties } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import './guard-tiers.css';
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import {
  CreditCard,
  GraduationCap,
  DoorOpen,
  FileSignature,
  Briefcase,
  Hand,
  Gamepad2,
  Building2,
  Car,
  type LucideIcon,
} from 'lucide-react';

/* ================================================================
   Guard card data
   ================================================================ */

type Tier = 1 | 2 | 3;

interface GuardCard {
  key: string;
  icon: LucideIcon;
  accent: string;
  tier: Tier;
  appStoreUrl?: string;
  demoUrl?: string;
}

const GUARDS: GuardCard[] = [
  // Tier 1 — Live & deployed
  {
    key: 'payguard',
    icon: CreditCard,
    accent: '#10b981',
    tier: 1,
    appStoreUrl: 'https://apps.apple.com/app/payguard/id6743112812',
    demoUrl: 'https://payguard.vercel.app',
  },
  {
    key: 'edguard',
    icon: GraduationCap,
    accent: '#6366f1',
    tier: 1,
    appStoreUrl: 'https://apps.apple.com/app/edguard/id6744432498',
    demoUrl: 'https://edguard-v2.vercel.app',
  },
  // Tier 2 — Live demo
  {
    key: 'accessguard',
    icon: DoorOpen,
    accent: '#0ea5e9',
    tier: 2,
    demoUrl: 'https://accessguard.vercel.app',
  },
  {
    key: 'signguard',
    icon: FileSignature,
    accent: '#8b5cf6',
    tier: 2,
    demoUrl: 'https://signguard.vercel.app',
  },
  // Tier 3 — On request
  { key: 'workguard', icon: Briefcase, accent: '#f59e0b', tier: 3 },
  { key: 'palmguard', icon: Hand, accent: '#ec4899', tier: 3 },
  { key: 'playguard', icon: Gamepad2, accent: '#14b8a6', tier: 3 },
  { key: 'siteguard', icon: Building2, accent: '#f97316', tier: 3 },
  { key: 'driveguard', icon: Car, accent: '#64748b', tier: 3 },
];

/* ================================================================
   Animation variants
   ================================================================ */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

/* ================================================================
   Component
   ================================================================ */

export function GuardTiersGrid() {
  const t = useTranslations('guards');
  const locale = useLocale();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const prefersReduced = useReducedMotion();

  const tier1 = GUARDS.filter((g) => g.tier === 1);
  const tier2 = GUARDS.filter((g) => g.tier === 2);
  const tier3 = GUARDS.filter((g) => g.tier === 3);

  const allCards = [...tier1, ...tier2, ...tier3];
  let cardNum = 0;

  function renderCard(guard: GuardCard) {
    cardNum++;
    const num = String(cardNum).padStart(2, '0');
    const Icon = guard.icon;
    const isTier3 = guard.tier === 3;

    const wrapStyle: CSSProperties = {
      ['--g-accent' as string]: guard.accent,
    };

    return (
      <motion.div
        key={guard.key}
        variants={cardVariants}
        className={`guard-card${isTier3 ? ' guard-card--muted' : ''}`}
        style={wrapStyle}
      >
        {/* Gradient top border */}
        <div
          className="guard-card__border"
          style={{ background: `linear-gradient(90deg, ${guard.accent}90, ${guard.accent}30)` }}
        />

        <div className="guard-card__inner">
          {/* Number */}
          <span className={`guard-card__num${isTier3 ? ' guard-card__num--muted' : ''}`}>
            {num}
          </span>

          {/* Icon */}
          <div
            className="guard-card__icon"
            style={{
              background: `${guard.accent}18`,
              border: `1px solid ${guard.accent}40`,
            }}
          >
            <Icon className="w-5 h-5" style={{ color: guard.accent }} aria-hidden="true" />
          </div>

          {/* Title + subtitle */}
          <h3 className="guard-card__title">{t(`${guard.key}.title`)}</h3>
          <p className="guard-card__subtitle" style={{ color: guard.accent }}>
            {t(`${guard.key}.subtitle`)}
          </p>
          <p className="guard-card__desc">{t(`${guard.key}.description`)}</p>

          {/* Badge */}
          {guard.tier === 1 && (
            <span className="guard-badge guard-badge--live">
              <span className="guard-badge__dot guard-badge__dot--green" />
              LIVE ON APP STORE
            </span>
          )}
          {guard.tier === 2 && (
            <span className="guard-badge guard-badge--demo">
              <span className="guard-badge__dot guard-badge__dot--blue" />
              LIVE DEMO
            </span>
          )}
          {guard.tier === 3 && (
            <span className="guard-badge guard-badge--request">
              {t('tier3.badge')}
            </span>
          )}

          {/* CTA */}
          {guard.tier === 1 && guard.demoUrl && (
            <div className="guard-card__actions">
              <a
                href={guard.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="guard-cta guard-cta--primary"
                style={{ borderColor: `${guard.accent}60`, color: guard.accent }}
              >
                Live Demo →
              </a>
              {guard.appStoreUrl && (
                <a
                  href={guard.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="guard-cta guard-cta--secondary"
                >
                  App Store
                </a>
              )}
            </div>
          )}
          {guard.tier === 2 && guard.demoUrl && (
            <div className="guard-card__actions">
              <a
                href={guard.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="guard-cta guard-cta--primary"
                style={{ borderColor: `${guard.accent}60`, color: guard.accent }}
              >
                Live Demo →
              </a>
            </div>
          )}
          {guard.tier === 3 && (
            <div className="guard-card__actions">
              <Link
                href={`/${locale}/contact`}
                className="guard-cta guard-cta--muted"
              >
                {t('cta.contact')}
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <section ref={ref} className="guard-tiers">
      <div className="guard-tiers__container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="guard-tiers__header"
        >
          <h2 className="guard-tiers__heading">{t('heading')}</h2>
          <p className="guard-tiers__subheading">{t('subheading')}</p>
        </motion.div>

        {/* Tier 1 */}
        <div className="guard-tier">
          <p className="guard-tier__label">{t('tier1.label')}</p>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView && !prefersReduced ? 'visible' : 'hidden'}
            className="guard-tier__grid guard-tier__grid--2"
          >
            {tier1.map((g) => renderCard(g))}
          </motion.div>
        </div>

        {/* Tier 2 */}
        <div className="guard-tier guard-tier--separator">
          <p className="guard-tier__label">{t('tier2.label')}</p>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView && !prefersReduced ? 'visible' : 'hidden'}
            className="guard-tier__grid guard-tier__grid--2"
          >
            {tier2.map((g) => renderCard(g))}
          </motion.div>
        </div>

        {/* Tier 3 */}
        <div className="guard-tier guard-tier--separator">
          <p className="guard-tier__label">{t('tier3.label')}</p>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView && !prefersReduced ? 'visible' : 'hidden'}
            className="guard-tier__grid guard-tier__grid--3"
          >
            {tier3.map((g) => renderCard(g))}
          </motion.div>

          {/* Global CTA under tier 3 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="guard-tier__global-cta"
          >
            <Link href={`/${locale}/contact`} className="guard-global-btn">
              {t('tier3.cta')}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
