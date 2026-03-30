'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Layers, FileCheck, Globe, BarChart3, Shield, Users, ArrowRight } from 'lucide-react';
import React from 'react';

const ACCENT = '#1A6FB5';

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

const MODULE_ICONS = [Layers, FileCheck, Globe, BarChart3, Shield, Users];
const MODULE_KEYS = ['pipeline', 'verify', 'dfiMatch', 'bsScore', 'kyc', 'localContent'] as const;
const ACTOR_KEYS = ['aec', 'dfi', 'gov', 'advisory'] as const;
const REVENUE_KEYS = ['fee', 'subscription', 'advisory', 'whitelabel'] as const;
const DFIS = ['AADFI', 'AfDB', 'AFC', 'Afreximbank', 'DBSA', 'IFC'];
const METRIC_KEYS = ['fee', 'dfi', 'sectors', 'standard'] as const;

// ─── Main component ───────────────────────────────────────────────────────────
export function AECGatewayPage() {
  const t = useTranslations('aecGatewayPage');

  const infragateChecks = t.raw('infragateChecks') as string[];
  const africanSectors = t.raw('africanSectors') as string[];

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
          <h1 className="text-5xl md:text-6xl font-extrabold text-foreground mb-4">AEC Gateway</h1>
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
              {t('requestAccess')}
            </a>
            <a
              href="mailto:contact@hmh-africa.com"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
            >
              {t('institutionalDemo')}
            </a>
          </div>
        </Reveal>
      </Section>

      {/* 2 — METRICS STRIP */}
      <section style={{ background: ACCENT }}>
        <div className="container py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {METRIC_KEYS.map((key) => (
              <div key={key} className="text-center">
                <p className="text-3xl font-extrabold text-white">{t(`metrics.${key}.value`)}</p>
                <p className="text-sm font-medium text-white/90 mt-1">{t(`metrics.${key}.label`)}</p>
                <p className="text-xs text-white/70 mt-0.5">{t(`metrics.${key}.sub`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — PLATFORM MODULES */}
      <Section>
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">{t('modulesTitle')}</h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODULE_KEYS.map((key, i) => {
            const Icon = MODULE_ICONS[i];
            return (
              <Reveal key={key} delay={i * 0.07}>
                <div className="rounded-2xl border border-border bg-surface p-6 h-full">
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-xl mb-4"
                    style={{ background: `${ACCENT}22` }}
                  >
                    <Icon size={20} style={{ color: ACCENT }} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{t(`modules.${key}.title`)}</h3>
                  <p className="text-sm text-foreground-secondary leading-relaxed">{t(`modules.${key}.desc`)}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* 4 — INFRAGATE STANDARD */}
      <Section className="bg-surface">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            {t('infragateTitle')}
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto items-start">
          <Reveal delay={0.05}>
            <div>
              <p className="text-sm text-foreground-secondary leading-relaxed mb-6">
                {t('infragateDesc')}
              </p>
              <ul className="space-y-3">
                {infragateChecks.map((check, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground-secondary">
                    <span className="mt-1 shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style={{ background: ACCENT }}>✓</span>
                    {check}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-foreground-secondary mb-4">
                {t('sectorsCovered')}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {africanSectors.map((sector, i) => (
                  <div
                    key={i}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-center"
                    style={{ background: `${ACCENT}15`, color: ACCENT }}
                  >
                    {sector}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 5 — DFI NETWORK */}
      <Section>
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">{t('dfiTitle')}</h2>
          <p className="text-center text-foreground-secondary mb-12">{t('dfiSubtitle')}</p>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {DFIS.map((dfi, i) => (
            <Reveal key={dfi} delay={i * 0.07}>
              <div
                className="rounded-2xl border p-6 text-center font-bold text-lg"
                style={{ borderColor: `${ACCENT}44`, background: `${ACCENT}0D`, color: ACCENT }}
              >
                {dfi}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 6 — REVENUE MODEL */}
      <Section className="bg-surface">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">{t('revenueTitle')}</h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {REVENUE_KEYS.map((key, i) => (
            <Reveal key={key} delay={i * 0.07}>
              <div className="rounded-2xl border border-border bg-background p-6">
                <h3 className="font-semibold text-foreground mb-2">{t(`revenue.${key}.title`)}</h3>
                <p className="text-sm text-foreground-secondary">{t(`revenue.${key}.detail`)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 7 — ARCHITECTURE */}
      <Section>
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            {t('archTitle')}
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {ACTOR_KEYS.map((key, i) => (
            <Reveal key={key} delay={i * 0.07}>
              <div className="rounded-2xl border border-border bg-surface p-5 text-center h-full">
                <div
                  className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center text-white text-sm font-bold"
                  style={{ background: ACCENT }}
                >
                  {t(`actors.${key}.name`)[0]}
                </div>
                <p className="font-semibold text-foreground text-sm">{t(`actors.${key}.name`)}</p>
                <p className="text-xs font-medium mt-0.5 mb-2" style={{ color: ACCENT }}>
                  {t(`actors.${key}.role`)}
                </p>
                <p className="text-xs text-foreground-secondary leading-tight">{t(`actors.${key}.desc`)}</p>
              </div>
            </Reveal>
          ))}
        </div>
        {/* HCS-U7 banner */}
        <Reveal delay={0.3}>
          <div className="rounded-2xl border border-[#7B4FD4]/30 bg-[#7B4FD4]/10 px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Shield size={20} className="text-[#7B4FD4] shrink-0" />
              <p className="text-sm text-foreground">
                <span className="font-semibold text-[#7B4FD4]">{t('bannerHighlight')}</span>{' '}
                {t('bannerText')}
              </p>
            </div>
            <a
              href="https://hybrid-vector.com"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-xs font-semibold text-[#7B4FD4] hover:underline flex items-center gap-1"
            >
              hybrid-vector.com <ArrowRight size={12} />
            </a>
          </div>
        </Reveal>
      </Section>

      {/* 8 — CTA */}
      <Section className="bg-surface text-center">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('ctaTitle')}</h2>
          <p className="text-foreground-secondary mb-8 max-w-md mx-auto">{t('ctaDesc')}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:contact@hmh-africa.com"
              className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: ACCENT }}
            >
              {t('requestAccess')}
            </a>
            <a
              href="mailto:contact@hmh-africa.com"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-8 py-4 text-base font-semibold text-foreground transition-colors hover:bg-background"
            >
              {t('institutionalDemo')}
            </a>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
