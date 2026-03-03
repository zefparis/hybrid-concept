'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

const ICONS: Record<string, React.ReactNode> = {
  plan: (
    <div className="w-12 h-12 rounded-lg border border-accent/30 flex items-center justify-center bg-accent/5">
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="3" x2="9" y2="21" />
        <circle cx="15" cy="15" r="3" strokeDasharray="1 1" />
      </svg>
    </div>
  ),
  integrate: (
    <div className="w-12 h-12 rounded-lg border border-accent/30 flex items-center justify-center bg-accent/5">
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="18" cy="18" r="3" />
        <line x1="8.5" y1="10.5" x2="15.5" y2="7.5" />
        <line x1="8.5" y1="13.5" x2="15.5" y2="16.5" />
        <line x1="18" y1="9" x2="18" y2="15" />
      </svg>
    </div>
  ),
  assure: (
    <div className="w-12 h-12 rounded-lg border border-accent/30 flex items-center justify-center bg-accent/5">
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 2L20 6V12C20 17 16 21 12 22C8 21 4 17 4 12V6L12 2Z" />
        <polyline points="9,12 11,14 15,9" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  ),
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const SERVICE_KEYS = ['plan', 'integrate', 'assure'] as const;

const BACKGROUND_GRAPHICS: Record<string, React.ReactNode> = {
  plan: (
    <svg className="absolute inset-0 w-full h-full text-white/5 transition-transform duration-700 group-hover:scale-105 pointer-events-none" viewBox="0 0 500 500" fill="none" stroke="currentColor">
      {/* Background abstract grid */}
      <g strokeWidth="1" opacity="0.3">
        <line x1="100" y1="80" x2="400" y2="80" strokeDasharray="4 4" />
        <line x1="100" y1="120" x2="400" y2="120" strokeDasharray="2 4 8 4" />
        <line x1="100" y1="380" x2="400" y2="380" strokeDasharray="6 2 2 2" />
        <line x1="100" y1="420" x2="400" y2="420" strokeDasharray="4 4" />
      </g>
      
      <g strokeWidth="2" transform="translate(130, 100)">
        {/* Colorful Accent Layer */}
        <g stroke="#38bdf8" opacity="0.3" strokeWidth="3">
          <line x1="120" y1="45" x2="120" y2="70" />
          <line x1="20" y1="70" x2="220" y2="70" />
          <line x1="20" y1="70" x2="20" y2="90" />
          <line x1="220" y1="70" x2="220" y2="90" />
        </g>

        {/* Root Node */}
        <rect x="70" y="0" width="100" height="45" rx="4" fill="currentColor" fillOpacity="0.05" />
        <line x1="90" y1="22.5" x2="150" y2="22.5" strokeWidth="1.5" />
        <circle cx="120" cy="45" r="3" fill="#38bdf8" opacity="0.5" stroke="none" />
        
        {/* Root to Level 1 connectors */}
        <line x1="120" y1="45" x2="120" y2="80" />
        <line x1="-30" y1="80" x2="270" y2="80" />
        
        {/* Level 1 Nodes */}
        <line x1="-30" y1="80" x2="-30" y2="100" />
        <rect x="-80" y="100" width="100" height="40" rx="3" fill="currentColor" fillOpacity="0.05" />
        <line x1="-65" y1="120" x2="-5" y2="120" strokeWidth="1.5" />
        <circle cx="-30" cy="140" r="3" fill="#818cf8" opacity="0.5" stroke="none" />
        
        <line x1="120" y1="80" x2="120" y2="100" />
        <rect x="70" y="100" width="100" height="40" rx="3" fill="currentColor" fillOpacity="0.05" />
        <line x1="85" y1="120" x2="155" y2="120" strokeWidth="1.5" />
        <circle cx="120" cy="140" r="3" fill="#818cf8" opacity="0.5" stroke="none" />
        
        <line x1="270" y1="80" x2="270" y2="100" />
        <rect x="220" y="100" width="100" height="40" rx="3" fill="currentColor" fillOpacity="0.05" />
        <line x1="235" y1="120" x2="305" y2="120" strokeWidth="1.5" />
        
        {/* Level 1 to Level 2 connectors (Left branch) */}
        <line x1="-30" y1="140" x2="-30" y2="170" />
        <line x1="-80" y1="170" x2="20" y2="170" />
        
        <line x1="-80" y1="170" x2="-80" y2="190" />
        <rect x="-110" y="190" width="60" height="30" rx="2" fill="currentColor" fillOpacity="0.02" />
        
        <line x1="20" y1="170" x2="20" y2="190" />
        <rect x="-10" y="190" width="60" height="30" rx="2" fill="currentColor" fillOpacity="0.02" />

        {/* Level 1 to Level 2 connectors (Middle branch) */}
        <line x1="120" y1="140" x2="120" y2="190" />
        <rect x="90" y="190" width="60" height="30" rx="2" fill="currentColor" fillOpacity="0.02" />
        <circle cx="120" cy="220" r="2" fill="#c084fc" opacity="0.5" stroke="none" />
        
        <line x1="120" y1="220" x2="120" y2="240" />
        <rect x="90" y="240" width="60" height="30" rx="2" fill="currentColor" fillOpacity="0.02" />

        {/* Level 1 to Level 2 connectors (Right branch) */}
        <line x1="270" y1="140" x2="270" y2="170" />
        <line x1="220" y1="170" x2="320" y2="170" />
        
        <line x1="220" y1="170" x2="220" y2="190" />
        <rect x="190" y="190" width="60" height="30" rx="2" fill="currentColor" fillOpacity="0.02" />
        
        <line x1="320" y1="170" x2="320" y2="190" />
        <rect x="290" y="190" width="60" height="30" rx="2" fill="currentColor" fillOpacity="0.02" />

        {/* Deep level details */}
        <line x1="-80" y1="220" x2="-80" y2="250" />
        <rect x="-100" y="250" width="40" height="20" rx="2" fill="currentColor" fillOpacity="0.01" />
        
        <line x1="20" y1="220" x2="20" y2="250" />
        <rect x="0" y="250" width="40" height="20" rx="2" fill="currentColor" fillOpacity="0.01" />

        <line x1="320" y1="220" x2="320" y2="250" />
        <rect x="300" y="250" width="40" height="20" rx="2" fill="currentColor" fillOpacity="0.01" />
      </g>
    </svg>
  ),
  integrate: (
    <svg className="absolute inset-0 w-full h-full text-white/5 transition-transform duration-700 group-hover:scale-105 pointer-events-none" viewBox="0 0 500 500" fill="none" stroke="currentColor">
      {/* Background pseudo-code lines */}
      <g strokeWidth="1" opacity="0.3">
        <line x1="50" y1="80" x2="200" y2="80" strokeDasharray="4 4" />
        <line x1="300" y1="100" x2="450" y2="100" strokeDasharray="2 4 8 4" />
        <line x1="80" y1="400" x2="220" y2="400" strokeDasharray="4 2 4 8" />
        <line x1="280" y1="420" x2="420" y2="420" strokeDasharray="6 2 2 2" />
      </g>

      <g strokeWidth="2" transform="translate(130, 80)">
        {/* Layer 1 (Top) */}
        <g className="drop-shadow-lg">
          <path d="M120 20 L300 90 L120 160 L-60 90 Z" fill="currentColor" fillOpacity="0.08" />
          <path d="M-60 90 v20 l180 70 l180 -70 v-20" opacity="0.3" />
          {/* Surface details layer 1 */}
          <path d="M120 50 L220 90 L120 130 L20 90 Z" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
          <path d="M120 70 L170 90 L120 110 L70 90 Z" strokeWidth="1.5" stroke="#38bdf8" opacity="0.4" />
          <circle cx="120" cy="90" r="5" fill="#38bdf8" stroke="none" opacity="0.8" />
        </g>
        
        {/* Layer 2 (Middle) */}
        <g transform="translate(0, 90)" className="drop-shadow-lg">
          <path d="M120 20 L300 90 L120 160 L-60 90 Z" fill="currentColor" fillOpacity="0.05" />
          <path d="M-60 90 v20 l180 70 l180 -70 v-20" opacity="0.3" />
          {/* Surface details layer 2 */}
          <path d="M120 50 L220 90 L120 130 L20 90 Z" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
          <circle cx="120" cy="90" r="5" fill="#818cf8" stroke="none" opacity="0.8" />
          <circle cx="30" cy="55" r="4" fill="currentColor" opacity="0.6" />
          <circle cx="210" cy="125" r="4" fill="currentColor" opacity="0.6" />
        </g>
        
        {/* Layer 3 (Bottom) */}
        <g transform="translate(0, 180)" className="drop-shadow-lg">
          <path d="M120 20 L300 90 L120 160 L-60 90 Z" fill="currentColor" fillOpacity="0.02" />
          <path d="M-60 90 v20 l180 70 l180 -70 v-20" opacity="0.3" />
          {/* Surface details layer 3 */}
          <path d="M120 50 L220 90 L120 130 L20 90 Z" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
          <circle cx="120" cy="90" r="5" fill="#c084fc" stroke="none" opacity="0.8" />
        </g>
        
        {/* Main Vertical Data Connection (Core) */}
        <line x1="120" y1="90" x2="120" y2="270" strokeDasharray="8 8" strokeWidth="3" stroke="#818cf8" opacity="0.6" />
        <circle cx="120" cy="180" r="8" fill="none" stroke="#818cf8" strokeWidth="2" opacity="0.5" />
        
        {/* Secondary Vertical connections */}
        <line x1="30" y1="145" x2="30" y2="235" strokeDasharray="4 4" strokeWidth="1.5" opacity="0.4" />
        <line x1="210" y1="215" x2="210" y2="305" strokeDasharray="4 4" strokeWidth="1.5" opacity="0.4" />
      </g>
    </svg>
  ),
  assure: (
    <svg className="absolute inset-0 w-full h-full text-white/5 transition-transform duration-700 group-hover:scale-105 pointer-events-none" viewBox="0 0 500 500" fill="none" stroke="currentColor">
      {/* Matrix Code Background Pattern */}
      <g strokeWidth="2" opacity="0.2">
        {[...Array(20)].map((_, i) => (
          <line 
            key={i} 
            x1={20 + (i % 3) * 10} 
            y1={30 + i * 18} 
            x2={480 - (i % 2) * 40} 
            y2={30 + i * 18} 
            strokeDasharray={`${(i * 7 % 20) + 5} ${(i * 11 % 10) + 5} ${(i * 13 % 40) + 10} ${(i * 17 % 10) + 5}`} 
          />
        ))}
      </g>
      
      <g transform="translate(110, 60)">
        {/* Glow behind shield */}
        <circle cx="140" cy="180" r="120" fill="#38bdf8" opacity="0.05" filter="blur(20px)" />
        
        {/* Massive Outer Shield */}
        <path d="M140 20 L320 70 V210 C320 310 240 370 140 400 C40 370 -40 310 -40 210 V70 Z" strokeWidth="2" fill="currentColor" fillOpacity="0.02" />
        
        {/* Secondary Inner Shield */}
        <path d="M140 55 L280 95 V210 C280 290 220 340 140 365 C60 340 0 290 0 210 V95 Z" strokeWidth="3" fill="currentColor" fillOpacity="0.05" />
        
        {/* Third Inner Shield */}
        <path d="M140 90 L240 120 V210 C240 270 190 310 140 330 C90 310 40 270 40 210 V120 Z" strokeWidth="4" stroke="#818cf8" fill="currentColor" fillOpacity="0.08" opacity="0.6" />
        
        {/* Giant Checkmark */}
        <path d="M80 200 L120 240 L210 140" strokeWidth="12" stroke="#38bdf8" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
        
        {/* Shield Highlights/Glow Lines */}
        <path d="M140 20 L320 70 V210 C320 250 290 290 250 320" strokeWidth="1.5" opacity="0.5" />
        <path d="M-40 70 L140 20" strokeWidth="1.5" opacity="0.5" />
        
        {/* Digital abstract rings around checkmark */}
        <circle cx="140" cy="200" r="100" strokeWidth="1.5" strokeDasharray="10 15" opacity="0.3" />
        <circle cx="140" cy="200" r="120" strokeWidth="1.5" stroke="#c084fc" strokeDasharray="4 20" opacity="0.4" />
      </g>
    </svg>
  )
};

/**
 * What We Do section - 3 pillars: Plan, Integrate, Assure
 */
export function WhatWeDo() {
  const t = useTranslations('whatWeDo');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-surface"
    >
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

        {/* Services Grid */}
        <motion.div
          variants={prefersReducedMotion ? {} : containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {SERVICE_KEYS.map((key) => (
            <motion.div
              key={key}
              variants={prefersReducedMotion ? {} : itemVariants}
              className={cn(
                'group relative p-8 md:p-10 rounded-2xl overflow-hidden',
                'bg-surface-card border border-white/8',
                'transition-all duration-500',
                'hover:border-white/10 hover-lift shadow-xl'
              )}
            >
              {/* Background Graphic */}
              {BACKGROUND_GRAPHICS[key]}

              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col">
                {/* Icon */}
                <div className="mb-6 text-white/80 group-hover:text-white transition-colors duration-300">
                  {ICONS[key]}
                </div>

                {/* Title */}
                <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">
                  {t(`${key}.title`)}
                </h3>

                {/* Description */}
                <p className="text-white/80 leading-relaxed font-medium">
                  {t(`${key}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
