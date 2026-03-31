'use client';

import React from 'react';
import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

const STEP_KEYS = ['anticipate', 'assure', 'continuity', 'revenue'] as const;

const STEP_BACKGROUNDS: Record<string, React.ReactNode> = {
  anticipate: (
    <svg className="absolute inset-0 w-full h-full text-white transition-transform duration-700 group-hover:scale-105 pointer-events-none" viewBox="0 0 400 400" fill="none" stroke="currentColor">
      <circle cx="200" cy="180" r="120" fill="#38bdf8" opacity="0.03" />
      <circle cx="200" cy="180" r="60" fill="#818cf8" opacity="0.04" />
      <g transform="translate(100, 60)">
        {/* Radar sweep */}
        <circle cx="100" cy="130" r="90" strokeWidth="1" opacity="0.08" />
        <circle cx="100" cy="130" r="65" strokeWidth="1" stroke="#38bdf8" opacity="0.12" strokeDasharray="4 4" />
        <circle cx="100" cy="130" r="40" strokeWidth="1.5" stroke="#818cf8" opacity="0.15" />
        <circle cx="100" cy="130" r="15" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="1" opacity="0.3" />
        <circle cx="100" cy="130" r="4" fill="#38bdf8" opacity="0.8" stroke="none" />
        {/* Sweep line */}
        <line x1="100" y1="130" x2="170" y2="70" strokeWidth="1.5" stroke="#38bdf8" opacity="0.25" />
        {/* Detected points */}
        <circle cx="140" cy="90" r="3" fill="#c084fc" opacity="0.7" stroke="none" />
        <circle cx="60" cy="80" r="2.5" fill="#38bdf8" opacity="0.6" stroke="none" />
        <circle cx="150" cy="160" r="2" fill="#818cf8" opacity="0.5" stroke="none" />
        <circle cx="55" cy="170" r="2.5" fill="#38bdf8" opacity="0.5" stroke="none" />
        {/* Cross-hairs */}
        <line x1="100" y1="40" x2="100" y2="220" strokeWidth="0.5" opacity="0.06" />
        <line x1="10" y1="130" x2="190" y2="130" strokeWidth="0.5" opacity="0.06" />
      </g>
    </svg>
  ),
  assure: (
    <svg className="absolute inset-0 w-full h-full text-white transition-transform duration-700 group-hover:scale-105 pointer-events-none" viewBox="0 0 400 400" fill="none" stroke="currentColor">
      <circle cx="200" cy="180" r="120" fill="#818cf8" opacity="0.03" />
      <circle cx="200" cy="180" r="60" fill="#38bdf8" opacity="0.04" />
      <g transform="translate(100, 50)">
        {/* Shield */}
        <path d="M100 20 L190 55 V150 C190 210 150 245 100 260 C50 245 10 210 10 150 V55 Z" strokeWidth="1.5" opacity="0.1" fill="currentColor" fillOpacity="0.02" />
        <path d="M100 40 L170 68 V150 C170 200 140 228 100 240 C60 228 30 200 30 150 V68 Z" strokeWidth="1.5" stroke="#818cf8" opacity="0.18" fill="#818cf8" fillOpacity="0.02" />
        {/* Checkmark */}
        <path d="M70 140 L90 160 L140 110" strokeWidth="4" stroke="#38bdf8" strokeLinecap="round" strokeLinejoin="round" opacity="0.35" />
        {/* Nodes */}
        <circle cx="100" cy="20" r="3" fill="#818cf8" opacity="0.6" stroke="none" />
        <circle cx="190" cy="55" r="2" fill="#38bdf8" opacity="0.5" stroke="none" />
        <circle cx="10" cy="55" r="2" fill="#c084fc" opacity="0.5" stroke="none" />
        {/* Particles */}
        <circle cx="60" cy="100" r="1.5" fill="#38bdf8" opacity="0.4" stroke="none" />
        <circle cx="150" cy="120" r="1.5" fill="#c084fc" opacity="0.4" stroke="none" />
      </g>
    </svg>
  ),
  continuity: (
    <svg className="absolute inset-0 w-full h-full text-white transition-transform duration-700 group-hover:scale-105 pointer-events-none" viewBox="0 0 400 400" fill="none" stroke="currentColor">
      <circle cx="200" cy="180" r="120" fill="#34d399" opacity="0.03" />
      <circle cx="200" cy="180" r="60" fill="#38bdf8" opacity="0.04" />
      <g transform="translate(60, 60)">
        {/* Chain links */}
        <ellipse cx="70" cy="130" rx="40" ry="25" strokeWidth="1.5" stroke="#34d399" opacity="0.2" fill="#34d399" fillOpacity="0.02" />
        <ellipse cx="140" cy="130" rx="40" ry="25" strokeWidth="1.5" stroke="#38bdf8" opacity="0.2" fill="#38bdf8" fillOpacity="0.02" />
        <ellipse cx="210" cy="130" rx="40" ry="25" strokeWidth="1.5" stroke="#818cf8" opacity="0.2" fill="#818cf8" fillOpacity="0.02" />
        {/* Connection flow line */}
        <path d="M30 130 Q 70 90 110 130 Q 140 170 180 130 Q 210 90 250 130" strokeWidth="2" stroke="#34d399" opacity="0.2" fill="none" strokeDasharray="6 4" />
        {/* Nodes */}
        <circle cx="70" cy="130" r="5" fill="#34d399" opacity="0.7" stroke="none" />
        <circle cx="140" cy="130" r="6" fill="#38bdf8" opacity="0.8" stroke="none" />
        <circle cx="210" cy="130" r="5" fill="#818cf8" opacity="0.7" stroke="none" />
        {/* Pulse */}
        <circle cx="140" cy="130" r="14" fill="#38bdf8" fillOpacity="0.06" stroke="none" />
        {/* Arrows on flow */}
        <path d="M95 115 L105 130 L95 145" strokeWidth="1" stroke="#34d399" opacity="0.25" fill="none" />
        <path d="M165 115 L175 130 L165 145" strokeWidth="1" stroke="#38bdf8" opacity="0.25" fill="none" />
      </g>
    </svg>
  ),
  revenue: (
    <svg className="absolute inset-0 w-full h-full text-white transition-transform duration-700 group-hover:scale-105 pointer-events-none" viewBox="0 0 400 400" fill="none" stroke="currentColor">
      <circle cx="200" cy="180" r="120" fill="#fbbf24" opacity="0.03" />
      <circle cx="200" cy="180" r="60" fill="#34d399" opacity="0.04" />
      <g transform="translate(70, 50)">
        {/* Chart bars */}
        <rect x="30" y="170" width="30" height="60" rx="2" fill="#38bdf8" fillOpacity="0.08" stroke="none" />
        <rect x="80" y="140" width="30" height="90" rx="2" fill="#818cf8" fillOpacity="0.08" stroke="none" />
        <rect x="130" y="100" width="30" height="130" rx="2" fill="#34d399" fillOpacity="0.1" stroke="none" />
        <rect x="180" y="60" width="30" height="170" rx="2" fill="#fbbf24" fillOpacity="0.12" stroke="none" />
        {/* Growth line */}
        <path d="M45 165 L95 135 L145 95 L195 55" strokeWidth="2" stroke="#fbbf24" opacity="0.3" fill="none" />
        {/* Node dots on line */}
        <circle cx="45" cy="165" r="3" fill="#38bdf8" opacity="0.7" stroke="none" />
        <circle cx="95" cy="135" r="3" fill="#818cf8" opacity="0.7" stroke="none" />
        <circle cx="145" cy="95" r="4" fill="#34d399" opacity="0.8" stroke="none" />
        <circle cx="195" cy="55" r="5" fill="#fbbf24" opacity="0.8" stroke="none" />
        {/* Arrow up */}
        <path d="M195 55 L195 30 M185 40 L195 30 L205 40" strokeWidth="1.5" stroke="#fbbf24" opacity="0.3" fill="none" />
        {/* Base line */}
        <line x1="20" y1="230" x2="220" y2="230" strokeWidth="1" opacity="0.08" />
      </g>
    </svg>
  ),
};

/**
 * Operating Model section - Flow diagram: Anticipate → Assure → Continuity → Revenue
 */
export function OperatingModel() {
  const t = useTranslations('operatingModel');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section ref={sectionRef} className="py-20 md:py-32">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-center mb-16"
        >
          <h2 className="text-display-sm md:text-display-md font-bold text-foreground">
            {t('heading')}
          </h2>
        </motion.div>

        {/* Flow Diagram - Desktop: Horizontal, Mobile: Vertical */}
        <div className="relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-px bg-white/10 -translate-y-1/2 z-0" />
          
          {/* Connection Line (Mobile) */}
          <div className="lg:hidden absolute top-0 bottom-0 left-1/2 w-px bg-white/10 -translate-x-1/2 z-0" />

          {/* Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4 relative z-10">
            {STEP_KEYS.map((key, index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ 
                  duration: 0.5, 
                  delay: prefersReducedMotion ? 0 : index * 0.15, 
                  ease: [0.16, 1, 0.3, 1] as const 
                }}
                className="relative flex flex-col items-center"
              >
                {/* Card */}
                <div className="group w-full relative p-6 rounded-2xl bg-surface-card border border-white/8 text-center hover:border-white/10 hover-lift shadow-xl transition-all duration-500 overflow-hidden">
                  {/* Background Graphic */}
                  {STEP_BACKGROUNDS[key]}

                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-linear-to-br from-[#38bdf8]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10">
                    {/* Label */}
                    <h3 className="text-sm sm:text-lg font-bold uppercase tracking-normal sm:tracking-wide text-white mb-2 group-hover:text-[#38bdf8] transition-colors">
                      {t(`${key}.label`)}
                    </h3>

                    {/* Description */}
                    <p className="text-white/70 font-medium text-sm">
                      {t(`${key}.description`)}
                    </p>
                  </div>
                </div>

                {/* Arrow (Desktop, not on last item) */}
                {index < STEP_KEYS.length - 1 && (
                  <motion.div 
                    className="hidden lg:flex absolute top-1/2 -right-2 -translate-y-1/2 z-20"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: prefersReducedMotion ? 0 : 0.5 + index * 0.15 }}
                  >
                    <ArrowRight className="w-4 h-4 text-[#38bdf8]" />
                  </motion.div>
                )}

                {/* Arrow (Mobile, not on last item) */}
                {index < STEP_KEYS.length - 1 && (
                  <motion.div 
                    className="lg:hidden flex justify-center py-4"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: prefersReducedMotion ? 0 : 0.5 + index * 0.15 }}
                  >
                    <ArrowDown className="w-4 h-4 text-[#38bdf8]" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
