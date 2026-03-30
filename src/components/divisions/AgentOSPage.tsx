'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
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

// ─── Data ─────────────────────────────────────────────────────────────────────
const metrics = [
  { value: 'R 499', label: 'per agent/month' },
  { value: 'Month 8', label: 'cash positive' },
  { value: '50+', label: 'agents year 1' },
  { value: 'R 420k', label: 'Year 1 HMH net' },
];

const features = [
  { Icon: Phone, title: 'Full call-to-close pipeline', desc: 'Log calls, track viewings, manage offers — all in one place.' },
  { Icon: FileCheck, title: 'One-click tenant verification', desc: 'TGPDC Verify FLEX integration for instant background checks.' },
  { Icon: MessageSquare, title: 'AI landlord weekly reports', desc: 'Auto-drafted every Thursday — no manual work required.' },
  { Icon: BarChart3, title: 'Building Intelligence module', desc: 'Log buildings and calls to build a searchable property database.' },
  { Icon: TrendingUp, title: 'Social content engine', desc: 'OpenAI-powered TikTok & Instagram captions generated in seconds.' },
  { Icon: Shield, title: 'Secured by Hybrid Vector HCS-U7', desc: 'Post-quantum authentication protecting every agent session.' },
];

const withoutAgentOS = [
  '2–3 hours daily lost to admin tasks',
  'Manual tenant verification delays',
  'No systematic follow-up on leads',
  'Landlord reports typed from scratch',
  'Social content created ad-hoc or skipped',
];

const withAgentOS = [
  'Automated admin — focus on closing',
  'Instant TGPDC Verify FLEX results',
  'Structured pipeline with reminders',
  'AI-drafted weekly landlord updates',
  'Social captions generated in 10 seconds',
];

const pricingTiers = [
  {
    name: 'Solo Agent',
    price: 'R 499',
    period: '/month',
    featured: false,
    features: ['Full CRM pipeline', 'TGPDC verification', 'AI weekly reports', 'Social content engine'],
  },
  {
    name: 'Agency Office',
    price: 'R 5 000',
    period: '/month',
    featured: true,
    features: ['All Solo features', 'Team dashboard', 'Branch analytics', 'Priority support', 'Building Intelligence'],
  },
  {
    name: 'Franchise Network',
    price: 'Custom',
    period: '/annual',
    featured: false,
    features: ['All Agency features', 'Multi-branch management', 'White-label option', 'Dedicated account manager'],
  },
];

const stack = [
  { name: 'Affectli', role: 'Field operations & task management', color: '#1A6FB5' },
  { name: 'TGPDC', role: 'Tenant verification & compliance', color: '#0D9A6A' },
  { name: 'Hybrid Vector', role: 'HCS-U7 post-quantum auth', color: '#7B4FD4' },
  { name: 'Mobipaid', role: 'Payment collection & reconciliation', color: '#D97706' },
];

// ─── Main component ───────────────────────────────────────────────────────────
export function AgentOSPage() {
  return (
    <div className="bg-background text-foreground">
      {/* 1 — HERO */}
      <Section className="pt-32 pb-20 text-center">
        <Reveal>
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest rounded-full px-4 py-1.5 mb-6"
            style={{ background: `${ACCENT}22`, color: ACCENT }}
          >
            HMH PropTech
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="text-5xl md:text-6xl font-extrabold text-foreground mb-4">AgentOS</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-xl font-medium mb-6" style={{ color: ACCENT }}>
            From call to closing.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="max-w-2xl mx-auto text-base text-foreground-secondary leading-relaxed mb-10">
            South African real estate agents lose 2–3 hours every day to admin — manually typing
            reports, chasing tenant documents, and scrambling for social content. AgentOS automates
            the entire back-office so you focus on what actually earns commission: showing properties
            and closing deals.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:contact@hmh-africa.com"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: ACCENT }}
            >
              Book a demo
            </a>
            <Link
              href="/en/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
            >
              Learn more
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
            Everything in one platform
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.07}>
              <div className="rounded-2xl border border-border bg-surface p-6 h-full">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-xl mb-4"
                  style={{ background: `${ACCENT}22` }}
                >
                  <f.Icon size={20} style={{ color: ACCENT }} />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-foreground-secondary leading-relaxed">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 4 — BEFORE / AFTER */}
      <Section className="bg-surface">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Your desk — before and after
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Without */}
          <Reveal delay={0.05}>
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
              <h3 className="font-bold text-red-400 mb-5">Without AgentOS</h3>
              <ul className="space-y-3">
                {withoutAgentOS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-foreground-secondary">
                    <span className="text-red-400 mt-0.5 shrink-0">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          {/* With */}
          <Reveal delay={0.1}>
            <div
              className="rounded-2xl border p-6"
              style={{ borderColor: `${ACCENT}44`, background: `${ACCENT}0D` }}
            >
              <h3 className="font-bold mb-5" style={{ color: ACCENT }}>
                With AgentOS
              </h3>
              <ul className="space-y-3">
                {withAgentOS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-foreground-secondary">
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
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Pricing</h2>
          <p className="text-center text-foreground-secondary mb-12">Simple, transparent. No setup fees.</p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingTiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.08}>
              <div
                className={`rounded-2xl border p-7 flex flex-col h-full ${
                  tier.featured ? 'border-transparent shadow-xl shadow-black/20' : 'border-border bg-surface'
                }`}
                style={tier.featured ? { background: ACCENT, color: '#fff' } : {}}
              >
                <p className={`text-sm font-semibold mb-1 ${tier.featured ? 'text-white/80' : 'text-foreground-secondary'}`}>
                  {tier.name}
                </p>
                <div className="flex items-baseline gap-1 mb-5">
                  <span className="text-3xl font-extrabold">{tier.price}</span>
                  <span className={`text-sm ${tier.featured ? 'text-white/70' : 'text-foreground-secondary'}`}>
                    {tier.period}
                  </span>
                </div>
                <ul className="space-y-2 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 size={14} className={`mt-0.5 shrink-0 ${tier.featured ? 'text-white' : ''}`} style={!tier.featured ? { color: ACCENT } : {}} />
                      <span className={tier.featured ? 'text-white' : 'text-foreground-secondary'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="mailto:contact@hmh-africa.com"
                  className={`mt-6 block text-center rounded-xl py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 ${
                    tier.featured ? 'bg-white text-[#0D9A6A]' : 'border border-border text-foreground hover:bg-surface-elevated'
                  }`}
                >
                  Get started
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 6 — STACK */}
      <Section className="bg-surface">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Built on trusted infrastructure</h2>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {stack.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.07}>
              <div className="rounded-2xl border border-border bg-background p-5 text-center">
                <div
                  className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center text-sm font-bold text-white"
                  style={{ background: s.color }}
                >
                  {s.name[0]}
                </div>
                <p className="font-semibold text-foreground text-sm">{s.name}</p>
                <p className="text-xs text-foreground-secondary mt-1 leading-tight">{s.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 7 — CTA */}
      <Section className="text-center">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to run your desk on AgentOS?
          </h2>
          <p className="text-foreground-secondary mb-8 max-w-md mx-auto">
            Join the first cohort of South African agents automating their workflow with AgentOS.
          </p>
          <a
            href="mailto:contact@hmh-africa.com"
            className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: ACCENT }}
          >
            Contact us to get started
          </a>
        </Reveal>
      </Section>
    </div>
  );
}
