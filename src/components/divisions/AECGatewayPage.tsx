'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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

// ─── Data ─────────────────────────────────────────────────────────────────────
const metrics = [
  { value: '0.1–0.5%', label: 'transaction success fee', sub: 'of financial close' },
  { value: '80+', label: 'DFI network', sub: 'via AADFI anchor' },
  { value: '12', label: 'African sectors', sub: 'pipeline coverage' },
  { value: 'VS 1-5', label: 'INFRAGATE standard', sub: 'proprietary methodology' },
];

const modules = [
  { Icon: Layers, title: 'Pipeline', desc: 'Full project pipeline management from submission to close.' },
  { Icon: FileCheck, title: 'Verify', desc: 'Document verification and compliance validation.' },
  { Icon: Globe, title: 'DFI Match', desc: 'Algorithmic matching to the right development finance institutions.' },
  { Icon: BarChart3, title: 'BS Score', desc: 'Bankability Score 0–100 assessment for every project.' },
  { Icon: Shield, title: 'KYC/AML', desc: 'Powered by HCS-U7 post-quantum authentication.' },
  { Icon: Users, title: 'Local Content', desc: 'Tracks local content compliance across 12 countries.' },
];

const infragateChecks = [
  'VS 1–5 viability score maps project readiness against DFI criteria',
  'BS 0–100 bankability score quantifies fundability at every stage',
  'Standardised project dossier accepted by AADFI member institutions',
  'Automated gap analysis with actionable remediation steps',
];

const africanSectors = [
  'Energy', 'Water', 'Transport', 'Digital Infrastructure',
  'Healthcare', 'Education', 'Agriculture', 'Mining',
  'Housing', 'Industrial Parks', 'Financial Infrastructure', 'Social Development',
];

const dfis = ['AADFI', 'AfDB', 'AFC', 'Afreximbank', 'DBSA', 'IFC'];

const revenueModel = [
  { title: 'Transaction success fee', detail: '0.1–0.5% of financial close value' },
  { title: 'Platform subscription', detail: 'Tiered SaaS per active project' },
  { title: 'Advisory & reporting', detail: 'Project-based fee for structuring support' },
  { title: 'White-label instances', detail: 'AEC · ECP branded deployments' },
];

const actors = [
  { name: 'AEC/ECP', role: 'Branded client', desc: 'Project promoters using the AEC or ECP branded gateway.' },
  { name: 'DFIs/Banks', role: 'Subscriber', desc: 'Development finance institutions accessing the deal pipeline.' },
  { name: 'Governments', role: 'Country portal', desc: 'Sovereign entities managing national project registries.' },
  { name: 'Advisory firms', role: 'Revenue partner', desc: 'Transaction advisors earning fees on successful closes.' },
];

// ─── Main component ───────────────────────────────────────────────────────────
export function AECGatewayPage() {
  return (
    <div className="bg-background text-foreground">
      {/* 1 — HERO */}
      <Section className="pt-32 pb-20 text-center">
        <Reveal>
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest rounded-full px-4 py-1.5 mb-6"
            style={{ background: `${ACCENT}22`, color: ACCENT }}
          >
            HMH Infrastructure Finance
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="text-5xl md:text-6xl font-extrabold text-foreground mb-4">AEC Gateway</h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-xl font-medium mb-6" style={{ color: ACCENT }}>
            Powered by HMH · INFRAGATE Standard
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="max-w-2xl mx-auto text-base text-foreground-secondary leading-relaxed mb-10">
            AEC Gateway connects African infrastructure projects to a network of 80+ development
            finance institutions. From pipeline submission to financial close, every project is
            scored, structured, and matched using the proprietary INFRAGATE VS/BS methodology.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:contact@hmh-africa.com"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: ACCENT }}
            >
              Request platform access
            </a>
            <a
              href="mailto:contact@hmh-africa.com"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
            >
              Institutional demo
            </a>
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
                <p className="text-sm font-medium text-white/90 mt-1">{m.label}</p>
                <p className="text-xs text-white/70 mt-0.5">{m.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — PLATFORM MODULES */}
      <Section>
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Platform modules</h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.07}>
              <div className="rounded-2xl border border-border bg-surface p-6 h-full">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-xl mb-4"
                  style={{ background: `${ACCENT}22` }}
                >
                  <m.Icon size={20} style={{ color: ACCENT }} />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{m.title}</h3>
                <p className="text-sm text-foreground-secondary leading-relaxed">{m.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 4 — INFRAGATE STANDARD */}
      <Section className="bg-surface">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            The INFRAGATE Standard
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto items-start">
          {/* Left — explanation */}
          <Reveal delay={0.05}>
            <div>
              <p className="text-sm text-foreground-secondary leading-relaxed mb-6">
                INFRAGATE is HMH's proprietary project assessment methodology — a two-axis framework
                that maps viability (VS 1–5) against bankability (BS 0–100) to give DFIs and project
                promoters a shared language for infrastructure finance.
              </p>
              <ul className="space-y-3">
                {infragateChecks.map((check) => (
                  <li key={check} className="flex items-start gap-3 text-sm text-foreground-secondary">
                    <span className="mt-1 shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style={{ background: ACCENT }}>✓</span>
                    {check}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          {/* Right — 12 sectors grid */}
          <Reveal delay={0.1}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-foreground-secondary mb-4">
                12 African sectors covered
              </p>
              <div className="grid grid-cols-2 gap-2">
                {africanSectors.map((sector) => (
                  <div
                    key={sector}
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
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">DFI Network</h2>
          <p className="text-center text-foreground-secondary mb-12">
            Anchored by AADFI — connecting projects to 80+ development finance institutions.
          </p>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {dfis.map((dfi, i) => (
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
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Revenue model</h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {revenueModel.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.07}>
              <div className="rounded-2xl border border-border bg-background p-6">
                <h3 className="font-semibold text-foreground mb-2">{r.title}</h3>
                <p className="text-sm text-foreground-secondary">{r.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 7 — ARCHITECTURE */}
      <Section>
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Platform architecture
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {actors.map((actor, i) => (
            <Reveal key={actor.name} delay={i * 0.07}>
              <div className="rounded-2xl border border-border bg-surface p-5 text-center h-full">
                <div
                  className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center text-white text-sm font-bold"
                  style={{ background: ACCENT }}
                >
                  {actor.name[0]}
                </div>
                <p className="font-semibold text-foreground text-sm">{actor.name}</p>
                <p className="text-xs font-medium mt-0.5 mb-2" style={{ color: ACCENT }}>
                  {actor.role}
                </p>
                <p className="text-xs text-foreground-secondary leading-tight">{actor.desc}</p>
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
                <span className="font-semibold text-[#7B4FD4]">HCS-U7 authentication</span> — every
                AEC Gateway session is protected by IA-SOLUTION post-quantum cognitive
                authentication.
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to access the AEC Gateway?
          </h2>
          <p className="text-foreground-secondary mb-8 max-w-md mx-auto">
            Whether you are a project promoter, DFI, or advisory firm — AEC Gateway gives you
            direct access to African infrastructure capital flows.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:contact@hmh-africa.com"
              className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: ACCENT }}
            >
              Request platform access
            </a>
            <a
              href="mailto:contact@hmh-africa.com"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-8 py-4 text-base font-semibold text-foreground transition-colors hover:bg-background"
            >
              Institutional demo
            </a>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
