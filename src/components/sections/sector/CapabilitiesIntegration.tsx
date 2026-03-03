'use client';

import React from 'react';
import { useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { CAPABILITIES } from '@/lib/constants';

const CAP_BACKGROUNDS: React.ReactNode[] = [
  (
    <svg key="cb0" className="absolute inset-0 w-full h-full text-white transition-transform duration-700 group-hover:scale-105 pointer-events-none" viewBox="0 0 500 500" fill="none" stroke="currentColor">
      <circle cx="380" cy="120" r="120" fill="#38bdf8" opacity="0.03" />
      <circle cx="380" cy="120" r="60" fill="#818cf8" opacity="0.04" />
      <g transform="translate(150, 100)">
        {/* Crosshair / target */}
        <circle cx="150" cy="150" r="80" strokeWidth="1" opacity="0.06" />
        <circle cx="150" cy="150" r="55" strokeWidth="1" stroke="#38bdf8" opacity="0.1" strokeDasharray="4 4" />
        <circle cx="150" cy="150" r="30" strokeWidth="1.5" stroke="#818cf8" opacity="0.15" />
        <circle cx="150" cy="150" r="5" fill="#38bdf8" opacity="0.6" stroke="none" />
        <line x1="150" y1="70" x2="150" y2="230" strokeWidth="0.5" opacity="0.05" />
        <line x1="70" y1="150" x2="230" y2="150" strokeWidth="0.5" opacity="0.05" />
        {/* Particles */}
        <circle cx="100" cy="100" r="2" fill="#c084fc" opacity="0.4" stroke="none" />
        <circle cx="210" cy="120" r="1.5" fill="#38bdf8" opacity="0.3" stroke="none" />
      </g>
    </svg>
  ),
  (
    <svg key="cb1" className="absolute inset-0 w-full h-full text-white transition-transform duration-700 group-hover:scale-105 pointer-events-none" viewBox="0 0 500 500" fill="none" stroke="currentColor">
      <circle cx="380" cy="120" r="120" fill="#c084fc" opacity="0.03" />
      <circle cx="380" cy="120" r="60" fill="#38bdf8" opacity="0.04" />
      <g transform="translate(150, 100)">
        {/* Interlocked rings */}
        <circle cx="120" cy="150" r="50" strokeWidth="1.5" stroke="#c084fc" opacity="0.12" />
        <circle cx="180" cy="150" r="50" strokeWidth="1.5" stroke="#38bdf8" opacity="0.12" />
        {/* Intersection highlight */}
        <ellipse cx="150" cy="150" rx="20" ry="40" fill="#818cf8" fillOpacity="0.04" stroke="#818cf8" strokeWidth="1" opacity="0.1" />
        <circle cx="150" cy="150" r="4" fill="#818cf8" opacity="0.7" stroke="none" />
        {/* Particles */}
        <circle cx="80" cy="120" r="2" fill="#c084fc" opacity="0.4" stroke="none" />
        <circle cx="220" cy="180" r="1.5" fill="#38bdf8" opacity="0.3" stroke="none" />
      </g>
    </svg>
  ),
  (
    <svg key="cb2" className="absolute inset-0 w-full h-full text-white transition-transform duration-700 group-hover:scale-105 pointer-events-none" viewBox="0 0 500 500" fill="none" stroke="currentColor">
      <circle cx="380" cy="120" r="120" fill="#34d399" opacity="0.03" />
      <circle cx="380" cy="120" r="60" fill="#818cf8" opacity="0.04" />
      <g transform="translate(150, 100)">
        {/* Circuit / command lines */}
        <path d="M80 100 L150 100 L150 150 L220 150" strokeWidth="1.5" stroke="#34d399" opacity="0.15" fill="none" />
        <path d="M80 200 L120 200 L120 150 L150 150" strokeWidth="1" stroke="#38bdf8" opacity="0.12" fill="none" />
        <path d="M220 200 L180 200 L180 180 L150 180 L150 150" strokeWidth="1" stroke="#818cf8" opacity="0.1" fill="none" />
        {/* Nodes */}
        <circle cx="150" cy="150" r="6" fill="#34d399" fillOpacity="0.12" stroke="#34d399" strokeWidth="1" opacity="0.4" />
        <circle cx="150" cy="150" r="3" fill="#34d399" opacity="0.7" stroke="none" />
        <circle cx="80" cy="100" r="3" fill="#38bdf8" opacity="0.5" stroke="none" />
        <circle cx="220" cy="150" r="3" fill="#818cf8" opacity="0.5" stroke="none" />
        <circle cx="80" cy="200" r="2.5" fill="#c084fc" opacity="0.4" stroke="none" />
        <circle cx="220" cy="200" r="2.5" fill="#34d399" opacity="0.4" stroke="none" />
      </g>
    </svg>
  ),
];

interface CapabilitiesIntegrationProps {
  sector?: string;
}

export function CapabilitiesIntegration({ sector }: CapabilitiesIntegrationProps) {
  const sectorKey = sector || 'energyMining';
  const t = useTranslations(`sectors.${sectorKey}.capabilities`);
  const tCaps = useTranslations(`sectors.${sectorKey}.capabilityCards`);
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  const isCyber = sector === 'cyberResilience';
  const cyberCapKeys = ['brainML', 'antiMimicry', 'pqc', 'celestialEntropy', 'tripleSig', 'dockerIsolation'];

  return (
    <section ref={sectionRef} className="py-20 md:py-32 px-6 md:px-12 bg-surface">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-display-sm md:text-display-md font-bold mb-4">
            {t('heading')}
          </h2>
          <p className="text-body-lg text-foreground-secondary max-w-3xl">
            {t('intro')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isCyber ? (
            cyberCapKeys.map((key, idx) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: idx * 0.05 }}
              >
                <div className="group relative block h-full p-6 md:p-8 rounded-2xl bg-surface-card border border-white/8 hover:border-white/15 hover-lift shadow-xl transition-all duration-500 overflow-hidden">
                  {/* Background Graphic */}
                  {CAP_BACKGROUNDS[idx % 3]}

                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-linear-to-br from-[#38bdf8]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-[#38bdf8] transition-colors">
                      {tCaps(`${key}.name`)}
                    </h3>
                    <p className="text-sm text-[#38bdf8]/70 font-medium mb-3">
                      {tCaps(`${key}.tagline`)}
                    </p>
                    <p className="text-sm text-white/60 line-clamp-3">
                      {tCaps(`${key}.description`)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            CAPABILITIES.map((capability, idx) => (
              <motion.div
                key={capability.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: idx * 0.05 }}
              >
                <Link
                  href={`/${locale}/capabilities/${capability.slug}`}
                  className="group relative block h-full p-6 md:p-8 rounded-2xl bg-surface-card border border-white/8 hover:border-white/15 hover-lift shadow-xl transition-all duration-500 overflow-hidden"
                >
                  {/* Background Graphic */}
                  {CAP_BACKGROUNDS[idx % 3]}

                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-linear-to-br from-[#38bdf8]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-[#38bdf8] transition-colors">
                      {capability.name}
                    </h3>
                    <p className="text-sm text-[#38bdf8]/70 font-medium mb-3">
                      {capability.tagline}
                    </p>
                    <p className="text-sm text-white/60 line-clamp-2">
                      {capability.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
