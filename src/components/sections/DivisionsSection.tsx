'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Shield, Building2, Home } from 'lucide-react';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';

const divisions = [
  {
    id: 'agentos',
    category: 'PropTech',
    name: 'AgentOS',
    tagline: 'From call to closing.',
    description:
      'The operating platform for South African real estate agents — automating tenant verification, landlord reports, and social content so agents close more deals.',
    accent: '#0D9A6A',
    href: '/sectors/agentos',
    Icon: Home,
    metrics: [
      { value: 'R 499', label: 'per agent/month' },
      { value: 'M8+', label: 'cash positive' },
      { value: 'TGPDC', label: 'compliance' },
    ],
    status: 'Beta · South Africa',
  },
  {
    id: 'aec-gateway',
    category: 'Infrastructure Finance',
    name: 'AEC Gateway',
    tagline: 'Connecting African projects to global capital.',
    description:
      'Pipeline-to-close platform for infrastructure projects across Africa, matching promoters with 80+ DFIs via the proprietary INFRAGATE VS/BS standard.',
    accent: '#1A6FB5',
    href: '/sectors/aec-gateway',
    Icon: Building2,
    metrics: [
      { value: '0.1–0.5%', label: 'transaction fee' },
      { value: '80+', label: 'DFI network' },
      { value: 'INFRAGATE', label: 'standard' },
    ],
    status: 'Active · Pan-African',
  },
  {
    id: 'hybrid-vector',
    category: 'Cybersecurity',
    name: 'Hybrid Vector',
    tagline: 'Post-quantum authentication. Zero exploitable vulnerability.',
    description:
      'HCS-U7 cognitive authentication platform with 11-layer anti-mimicry, Brain ML v2.0, and ML-KEM post-quantum cryptography — securing every HMH product.',
    accent: '#7B4FD4',
    href: '/sectors/cyber-resilience',
    Icon: Shield,
    metrics: [
      { value: '3 brevets', label: 'FR patents' },
      { value: 'R 5.5k+', label: 'per month' },
      { value: 'ML-KEM', label: 'post-quantum' },
    ],
    status: 'Production · IA-SOLUTION',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const bannerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
      delay: 0.5,
    },
  },
};

export function DivisionsSection() {
  const locale = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-24 bg-background">
      <div className="container">
        {/* Heading */}
        <div className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-foreground-secondary mb-3">
            Our Divisions
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Three platforms. One infrastructure layer.
          </h2>
        </div>

        {/* Cards grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {divisions.map((div) => (
            <motion.div key={div.id} variants={cardVariants}>
              <Link
                href={`/${locale}${div.href}`}
                className={cn(
                  'group flex flex-col h-full rounded-2xl border border-border bg-surface p-6',
                  'transition-shadow hover:shadow-xl hover:shadow-black/20'
                )}
              >
                {/* Category badge */}
                <span
                  className="inline-block self-start text-xs font-semibold uppercase tracking-wider rounded-full px-3 py-1 mb-4"
                  style={{ background: `${div.accent}22`, color: div.accent }}
                >
                  {div.category}
                </span>

                {/* Icon */}
                <div
                  className="flex items-center justify-center w-11 h-11 rounded-xl mb-4"
                  style={{ background: `${div.accent}22` }}
                >
                  <div.Icon size={22} style={{ color: div.accent }} />
                </div>

                {/* Name + tagline */}
                <h3 className="text-xl font-bold text-foreground mb-1">{div.name}</h3>
                <p className="text-sm font-medium mb-3" style={{ color: div.accent }}>
                  {div.tagline}
                </p>

                {/* Description */}
                <p className="text-sm text-foreground-secondary leading-relaxed flex-1 mb-5">
                  {div.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 mb-5">
                  {div.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-lg p-2 text-center"
                      style={{ background: `${div.accent}11` }}
                    >
                      <p className="text-sm font-bold" style={{ color: div.accent }}>
                        {m.value}
                      </p>
                      <p className="text-[10px] text-foreground-secondary leading-tight mt-0.5">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Status + arrow */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-foreground-secondary">{div.status}</span>
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                    style={{ color: div.accent }}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* HCS-U7 banner */}
        <motion.div
          variants={bannerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mt-10 rounded-2xl border border-[#7B4FD4]/30 bg-[#7B4FD4]/10 px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <Shield size={20} className="text-[#7B4FD4] shrink-0" />
            <p className="text-sm text-foreground">
              <span className="font-semibold text-[#7B4FD4]">HCS-U7 auth layer</span> — every HMH
              division is protected by IA-SOLUTION post-quantum cognitive authentication.
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
        </motion.div>
      </div>
    </section>
  );
}
