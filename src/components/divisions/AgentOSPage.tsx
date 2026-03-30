'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import {
  Phone,
  FileCheck,
  MessageSquare,
  BarChart3,
  TrendingUp,
  Shield,
  CheckCircle2,
} from 'lucide-react';
import React from 'react';

const ACCENT = '#0D9A6A';

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({
  children,
  className = '',
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <section className={`py-20 ${className}`} style={style}>
      <div className="container">{children}</div>
    </section>
  );
}

// ─── Scroll-reveal wrapper ────────────────────────────────────────────────────
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] as const, delay }}
    >
      {children}
    </motion.div>
  );
}

const FEATURE_ICONS = [Phone, FileCheck, MessageSquare, BarChart3, TrendingUp, Shield];
const STACK_COLORS = ['#1A6FB5', '#0D9A6A', '#7B4FD4', '#D97706'];
const STACK_KEYS = ['affectli', 'tgpdc', 'hybridVector', 'mobipaid'] as const;
const FEATURE_KEYS = ['pipeline', 'verify', 'reports', 'building', 'social', 'security'] as const;
const TIER_KEYS = ['solo', 'agency', 'franchise'] as const;
const TIER_FEATURED = [false, true, false];

// ─── Main component ───────────────────────────────────────────────────────────
export function AgentOSPage() {
  const t = useTranslations('agentOSPage');
  const locale = useLocale();

  const metrics = [
    { value: t('metrics.price.value'), label: t('metrics.price.label') },
    { value: t('metrics.cashPositive.value'), label: t('metrics.cashPositive.label') },
    { value: t('metrics.agents.value'), label: t('metrics.agents.label') },
    { value: t('metrics.revenue.value'), label: t('metrics.revenue.label') },
  ];

  const withoutList = t.raw('withoutList') as string[];
  const withList = t.raw('withList') as string[];

  return (
    <div className="bg-background text-foreground">
      {/* 1 — HERO */}
      <Section className="pt-32 pb-20 text-center">
        <Reveal>
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest rounded-full px-4 py-1.5 mb-6"
            style={{ background: `${ACCENT}22`, color: ACCENT }}
          >
            {t('badge')}
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="text-5xl md:text-6xl font-extrabold text-foreground mb-4">AgentOS</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-xl font-medium mb-6" style={{ color: ACCENT }}>
            {t('tagline')}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="max-w-2xl mx-auto text-base text-foreground-secondary leading-relaxed mb-10">
            {t('description')}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:contact@hmh-africa.com"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: ACCENT }}
            >
              {t('bookDemo')}
            </a>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
            >
              {t('learnMore')}
            </Link>
          </div>
        </Reveal>
      </Section>

      {/* 2 — METRICS STRIP */}
      <section style={{ background: ACCENT }}>
        <div className="container py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {metrics.map((m) => (
              <div key={m.label} className="text-center">
                <p className="text-3xl font-extrabold text-white">{m.value}</p>
                <p className="text-sm text-white/80 mt-1">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — FEATURES GRID */}
      <Section>
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            {t('featuresTitle')}
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURE_KEYS.map((key, i) => {
            const Icon = FEATURE_ICONS[i];
            return (
              <Reveal key={key} delay={i * 0.07}>
                <div className="rounded-2xl border border-border bg-surface p-6 h-full">
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-xl mb-4"
                    style={{ background: `${ACCENT}22` }}
                  >
                    <Icon size={20} style={{ color: ACCENT }} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{t(`features.${key}.title`)}</h3>
                  <p className="text-sm text-foreground-secondary leading-relaxed">{t(`features.${key}.desc`)}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* 4 — BEFORE / AFTER */}
      <Section className="bg-surface">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            {t('beforeAfterTitle')}
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Reveal delay={0.05}>
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
              <h3 className="font-bold text-red-400 mb-5">{t('withoutTitle')}</h3>
              <ul className="space-y-3">
                {withoutList.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground-secondary">
                    <span className="text-red-400 mt-0.5 shrink-0">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div
              className="rounded-2xl border p-6"
              style={{ borderColor: `${ACCENT}44`, background: `${ACCENT}0D` }}
            >
              <h3 className="font-bold mb-5" style={{ color: ACCENT }}>
                {t('withTitle')}
              </h3>
              <ul className="space-y-3">
                {withList.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground-secondary">
                    <CheckCircle2 size={16} style={{ color: ACCENT }} className="mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 5 — PRICING */}
      <Section>
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">{t('pricingTitle')}</h2>
          <p className="text-center text-foreground-secondary mb-12">{t('pricingSubtitle')}</p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {TIER_KEYS.map((key, i) => {
            const featured = TIER_FEATURED[i];
            const features = t.raw(`tiers.${key}.features`) as string[];
            return (
              <Reveal key={key} delay={i * 0.08}>
                <div
                  className={`rounded-2xl border p-7 flex flex-col h-full ${
                    featured ? 'border-transparent shadow-xl shadow-black/20' : 'border-border bg-surface'
                  }`}
                  style={featured ? { background: ACCENT, color: '#fff' } : {}}
                >
                  <p className={`text-sm font-semibold mb-1 ${featured ? 'text-white/80' : 'text-foreground-secondary'}`}>
                    {t(`tiers.${key}.name`)}
                  </p>
                  <div className="flex items-baseline gap-1 mb-5">
                    <span className="text-3xl font-extrabold">{t(`tiers.${key}.price`)}</span>
                    <span className={`text-sm ${featured ? 'text-white/70' : 'text-foreground-secondary'}`}>
                      {t(`tiers.${key}.period`)}
                    </span>
                  </div>
                  <ul className="space-y-2 flex-1">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 size={14} className={`mt-0.5 shrink-0 ${featured ? 'text-white' : ''}`} style={!featured ? { color: ACCENT } : {}} />
                        <span className={featured ? 'text-white' : 'text-foreground-secondary'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="mailto:contact@hmh-africa.com"
                    className={`mt-6 block text-center rounded-xl py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 ${
                      featured ? 'bg-white text-[#0D9A6A]' : 'border border-border text-foreground hover:bg-surface-elevated'
                    }`}
                  >
                    {t('getStarted')}
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* 6 — STACK */}
      <Section className="bg-surface">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">{t('stackTitle')}</h2>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {STACK_KEYS.map((key, i) => (
            <Reveal key={key} delay={i * 0.07}>
              <div className="rounded-2xl border border-border bg-background p-5 text-center">
                <div
                  className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center text-sm font-bold text-white"
                  style={{ background: STACK_COLORS[i] }}
                >
                  {t(`stack.${key}.name`)[0]}
                </div>
                <p className="font-semibold text-foreground text-sm">{t(`stack.${key}.name`)}</p>
                <p className="text-xs text-foreground-secondary mt-1 leading-tight">{t(`stack.${key}.role`)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 7 — CTA */}
      <Section className="text-center">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('ctaTitle')}</h2>
          <p className="text-foreground-secondary mb-8 max-w-md mx-auto">{t('ctaDesc')}</p>
          <a
            href="mailto:contact@hmh-africa.com"
            className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: ACCENT }}
          >
            {t('ctaButton')}
          </a>
        </Reveal>
      </Section>
    </div>
  );
}
