'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

const ICONS: Record<string, React.ReactNode> = {
  shield: (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M16 3L28 8V16C28 23 22 28 16 29C10 28 4 23 4 16V8L16 3Z" />
    </svg>
  ),
  lock: (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <rect x="6" y="14" width="20" height="14" rx="2" />
      <path d="M10 14V10C10 6.686 12.686 4 16 4C19.314 4 22 6.686 22 10V14" />
      <circle cx="16" cy="21" r="2" fill="currentColor" />
    </svg>
  ),
  check: (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="16" cy="16" r="12" />
      <polyline points="10,16 14,20 22,12" strokeWidth={2} />
    </svg>
  ),
  document: (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M8 4H20L26 10V28H8V4Z" />
      <path d="M20 4V10H26" />
      <line x1="12" y1="16" x2="22" y2="16" />
      <line x1="12" y1="20" x2="22" y2="20" />
      <line x1="12" y1="24" x2="18" y2="24" />
    </svg>
  ),
  certificate: (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <rect x="4" y="4" width="24" height="18" rx="2" />
      <circle cx="16" cy="13" r="4" />
      <path d="M14 22V28L16 26L18 28V22" />
    </svg>
  ),
};

const SIGNAL_BACKGROUNDS: Record<string, React.ReactNode> = {
  sovereignty: (
    <svg className="absolute inset-0 w-full h-full text-white transition-transform duration-700 group-hover:scale-105 pointer-events-none" viewBox="0 0 500 500" fill="none" stroke="currentColor">
      <circle cx="250" cy="230" r="150" fill="#38bdf8" opacity="0.03" />
      <circle cx="250" cy="230" r="80" fill="#818cf8" opacity="0.04" />
      <g transform="translate(100, 40)">
        {/* Shield layers */}
        <path d="M150 20 L290 70 V200 C290 290 225 340 150 360 C75 340 10 290 10 200 V70 Z" strokeWidth="1.5" opacity="0.1" fill="currentColor" fillOpacity="0.02" />
        <path d="M150 50 L260 90 V200 C260 270 210 310 150 330 C90 310 40 270 40 200 V90 Z" strokeWidth="1.5" stroke="#38bdf8" opacity="0.18" fill="#38bdf8" fillOpacity="0.02" />
        <path d="M150 80 L230 110 V200 C230 250 195 280 150 295 C105 280 70 250 70 200 V110 Z" strokeWidth="2" stroke="#818cf8" opacity="0.22" fill="#818cf8" fillOpacity="0.03" />
        {/* Flag/star inside */}
        <path d="M150 140 L162 170 L195 170 L168 188 L178 218 L150 200 L122 218 L132 188 L105 170 L138 170 Z" strokeWidth="1.5" stroke="#38bdf8" opacity="0.3" fill="#38bdf8" fillOpacity="0.06" />
        {/* Nodes */}
        <circle cx="150" cy="20" r="3" fill="#38bdf8" opacity="0.6" stroke="none" />
        <circle cx="290" cy="70" r="3" fill="#818cf8" opacity="0.5" stroke="none" />
        <circle cx="10" cy="70" r="3" fill="#c084fc" opacity="0.5" stroke="none" />
        <circle cx="150" cy="360" r="3" fill="#38bdf8" opacity="0.4" stroke="none" />
        {/* Particles */}
        <circle cx="100" cy="150" r="2" fill="#38bdf8" opacity="0.4" stroke="none" />
        <circle cx="210" cy="160" r="2" fill="#c084fc" opacity="0.4" stroke="none" />
        <circle cx="80" cy="280" r="1.5" fill="#818cf8" opacity="0.3" stroke="none" />
        <circle cx="230" cy="270" r="1.5" fill="#38bdf8" opacity="0.3" stroke="none" />
      </g>
      {/* Background lines */}
      <g opacity="0.05">
        {[...Array(8)].map((_, i) => (
          <line key={`sv${i}`} x1="0" y1={60 + i * 55} x2="500" y2={60 + i * 55} strokeWidth="1" />
        ))}
      </g>
    </svg>
  ),
  zeroTrust: (
    <svg className="absolute inset-0 w-full h-full text-white transition-transform duration-700 group-hover:scale-105 pointer-events-none" viewBox="0 0 500 500" fill="none" stroke="currentColor">
      <circle cx="250" cy="220" r="140" fill="#c084fc" opacity="0.03" />
      <circle cx="250" cy="220" r="70" fill="#38bdf8" opacity="0.04" />
      <g transform="translate(80, 50)">
        {/* Layered lock */}
        <rect x="110" y="180" width="120" height="100" rx="8" fill="currentColor" fillOpacity="0.06" stroke="none" />
        <rect x="110" y="180" width="120" height="100" rx="8" strokeWidth="1.5" opacity="0.12" />
        <path d="M130 180 V150 C130 115 210 115 210 150 V180" strokeWidth="2" stroke="#c084fc" opacity="0.3" fill="none" />
        <circle cx="170" cy="230" r="12" fill="#c084fc" fillOpacity="0.15" stroke="#c084fc" strokeWidth="1.5" opacity="0.5" />
        <circle cx="170" cy="230" r="5" fill="#c084fc" opacity="0.8" stroke="none" />
        <line x1="170" y1="242" x2="170" y2="255" strokeWidth="2.5" stroke="#c084fc" opacity="0.5" />
        {/* Verification rings */}
        <circle cx="170" cy="230" r="40" strokeWidth="1" stroke="#38bdf8" opacity="0.12" strokeDasharray="6 4" />
        <circle cx="170" cy="230" r="60" strokeWidth="1" opacity="0.08" strokeDasharray="4 6" />
        <circle cx="170" cy="230" r="80" strokeWidth="0.5" stroke="#818cf8" opacity="0.06" strokeDasharray="8 4" />
        {/* Network verification nodes */}
        <circle cx="50" cy="140" r="4" fill="#38bdf8" opacity="0.6" stroke="none" />
        <circle cx="290" cy="140" r="4" fill="#818cf8" opacity="0.6" stroke="none" />
        <circle cx="50" cy="320" r="3" fill="#c084fc" opacity="0.4" stroke="none" />
        <circle cx="290" cy="320" r="3" fill="#38bdf8" opacity="0.4" stroke="none" />
        {/* Verification paths */}
        <line x1="50" y1="140" x2="130" y2="180" strokeWidth="1" stroke="#38bdf8" opacity="0.15" strokeDasharray="4 6" />
        <line x1="290" y1="140" x2="210" y2="180" strokeWidth="1" stroke="#818cf8" opacity="0.15" strokeDasharray="4 6" />
        <line x1="50" y1="320" x2="130" y2="280" strokeWidth="1" stroke="#c084fc" opacity="0.1" strokeDasharray="4 6" />
        <line x1="290" y1="320" x2="210" y2="280" strokeWidth="1" opacity="0.08" strokeDasharray="4 6" />
        {/* Particles */}
        <circle cx="120" cy="100" r="1.5" fill="#38bdf8" opacity="0.5" stroke="none" />
        <circle cx="240" cy="110" r="1.5" fill="#c084fc" opacity="0.4" stroke="none" />
        <circle cx="100" cy="340" r="1.5" fill="#818cf8" opacity="0.3" stroke="none" />
      </g>
    </svg>
  ),
  sla: (
    <svg className="absolute inset-0 w-full h-full text-white transition-transform duration-700 group-hover:scale-105 pointer-events-none" viewBox="0 0 500 500" fill="none" stroke="currentColor">
      <circle cx="250" cy="230" r="140" fill="#34d399" opacity="0.03" />
      <circle cx="250" cy="230" r="70" fill="#38bdf8" opacity="0.04" />
      <g transform="translate(100, 60)">
        {/* Large circle frame */}
        <circle cx="150" cy="180" r="120" strokeWidth="1.5" opacity="0.1" />
        <circle cx="150" cy="180" r="100" strokeWidth="1.5" stroke="#34d399" opacity="0.15" />
        <circle cx="150" cy="180" r="80" strokeWidth="1" stroke="#38bdf8" opacity="0.1" strokeDasharray="6 4" />
        {/* Giant checkmark */}
        <path d="M95 185 L130 220 L215 135" strokeWidth="8" stroke="#34d399" strokeLinecap="round" strokeLinejoin="round" opacity="0.35" />
        <path d="M100 180 L132 212 L210 140" strokeWidth="4" stroke="#38bdf8" strokeLinecap="round" strokeLinejoin="round" opacity="0.2" />
        {/* Progress arc at top */}
        <path d="M60 120 A100 100 0 0 1 240 120" strokeWidth="3" stroke="#34d399" opacity="0.2" fill="none" />
        {/* Metric bars at bottom */}
        <rect x="70" y="310" width="30" height="50" rx="2" fill="#34d399" fillOpacity="0.08" stroke="none" />
        <rect x="110" y="290" width="30" height="70" rx="2" fill="#38bdf8" fillOpacity="0.08" stroke="none" />
        <rect x="150" y="300" width="30" height="60" rx="2" fill="#818cf8" fillOpacity="0.06" stroke="none" />
        <rect x="190" y="280" width="30" height="80" rx="2" fill="#34d399" fillOpacity="0.1" stroke="none" />
        {/* Nodes */}
        <circle cx="150" cy="60" r="3" fill="#34d399" opacity="0.6" stroke="none" />
        <circle cx="270" cy="180" r="3" fill="#38bdf8" opacity="0.5" stroke="none" />
        <circle cx="30" cy="180" r="3" fill="#818cf8" opacity="0.5" stroke="none" />
        {/* Particles */}
        <circle cx="80" cy="100" r="1.5" fill="#34d399" opacity="0.4" stroke="none" />
        <circle cx="230" cy="130" r="1.5" fill="#38bdf8" opacity="0.4" stroke="none" />
        <circle cx="60" cy="270" r="1.5" fill="#818cf8" opacity="0.3" stroke="none" />
        <circle cx="250" cy="260" r="1.5" fill="#34d399" opacity="0.3" stroke="none" />
      </g>
    </svg>
  ),
  traceability: (
    <svg className="absolute inset-0 w-full h-full text-white transition-transform duration-700 group-hover:scale-105 pointer-events-none" viewBox="0 0 500 500" fill="none" stroke="currentColor">
      <circle cx="250" cy="220" r="140" fill="#818cf8" opacity="0.03" />
      <circle cx="250" cy="220" r="70" fill="#38bdf8" opacity="0.04" />
      <g transform="translate(80, 40)">
        {/* Document stack */}
        <rect x="100" y="80" width="160" height="200" rx="6" fill="currentColor" fillOpacity="0.04" strokeWidth="1.5" opacity="0.1" />
        <rect x="110" y="70" width="160" height="200" rx="6" fill="currentColor" fillOpacity="0.05" strokeWidth="1.5" opacity="0.12" />
        <rect x="120" y="60" width="160" height="200" rx="6" fill="currentColor" fillOpacity="0.06" strokeWidth="1.5" stroke="#818cf8" opacity="0.18" />
        {/* Document lines */}
        <line x1="140" y1="95" x2="260" y2="95" strokeWidth="1.5" stroke="#38bdf8" opacity="0.2" />
        <line x1="140" y1="115" x2="240" y2="115" strokeWidth="1" opacity="0.1" />
        <line x1="140" y1="135" x2="255" y2="135" strokeWidth="1" stroke="#818cf8" opacity="0.12" />
        <line x1="140" y1="155" x2="230" y2="155" strokeWidth="1" opacity="0.08" />
        <line x1="140" y1="175" x2="250" y2="175" strokeWidth="1" stroke="#c084fc" opacity="0.1" />
        <line x1="140" y1="195" x2="220" y2="195" strokeWidth="1" opacity="0.06" />
        <line x1="140" y1="215" x2="260" y2="215" strokeWidth="1" stroke="#38bdf8" opacity="0.1" />
        {/* Chain/link trail */}
        <path d="M200 260 L200 300 L120 300 L120 340 L200 340 L200 380" strokeWidth="2" stroke="#818cf8" opacity="0.15" fill="none" strokeDasharray="6 4" />
        <circle cx="200" cy="260" r="4" fill="#818cf8" opacity="0.6" stroke="none" />
        <circle cx="120" cy="300" r="3" fill="#38bdf8" opacity="0.5" stroke="none" />
        <circle cx="200" cy="340" r="3" fill="#c084fc" opacity="0.5" stroke="none" />
        <circle cx="200" cy="380" r="4" fill="#818cf8" opacity="0.4" stroke="none" />
        {/* Hash/fingerprint icon */}
        <rect x="230" y="290" width="60" height="50" rx="4" fill="currentColor" fillOpacity="0.04" stroke="none" />
        <line x1="240" y1="305" x2="280" y2="305" strokeWidth="1" stroke="#38bdf8" opacity="0.15" />
        <line x1="240" y1="315" x2="270" y2="315" strokeWidth="1" opacity="0.08" />
        <line x1="240" y1="325" x2="280" y2="325" strokeWidth="1" stroke="#c084fc" opacity="0.1" />
        {/* Particles */}
        <circle cx="60" cy="120" r="2" fill="#38bdf8" opacity="0.4" stroke="none" />
        <circle cx="300" cy="100" r="2" fill="#818cf8" opacity="0.4" stroke="none" />
        <circle cx="70" cy="350" r="1.5" fill="#c084fc" opacity="0.3" stroke="none" />
        <circle cx="290" cy="360" r="1.5" fill="#38bdf8" opacity="0.3" stroke="none" />
      </g>
    </svg>
  ),
  compliance: (
    <svg className="absolute inset-0 w-full h-full text-white transition-transform duration-700 group-hover:scale-105 pointer-events-none" viewBox="0 0 500 500" fill="none" stroke="currentColor">
      <circle cx="250" cy="220" r="140" fill="#fbbf24" opacity="0.03" />
      <circle cx="250" cy="220" r="70" fill="#818cf8" opacity="0.04" />
      <g transform="translate(90, 40)">
        {/* Certificate frame */}
        <rect x="60" y="60" width="200" height="260" rx="8" fill="currentColor" fillOpacity="0.04" strokeWidth="1.5" opacity="0.1" />
        <rect x="70" y="70" width="180" height="240" rx="6" fill="currentColor" fillOpacity="0.05" strokeWidth="1" stroke="#fbbf24" opacity="0.15" />
        {/* Certificate header line */}
        <line x1="100" y1="100" x2="220" y2="100" strokeWidth="2" stroke="#fbbf24" opacity="0.2" />
        <line x1="110" y1="120" x2="210" y2="120" strokeWidth="1" opacity="0.08" />
        {/* Seal / medallion */}
        <circle cx="160" cy="190" r="40" strokeWidth="1.5" stroke="#fbbf24" opacity="0.2" fill="#fbbf24" fillOpacity="0.03" />
        <circle cx="160" cy="190" r="28" strokeWidth="1" stroke="#818cf8" opacity="0.15" />
        <circle cx="160" cy="190" r="15" fill="#fbbf24" fillOpacity="0.12" stroke="none" />
        <circle cx="160" cy="190" r="6" fill="#fbbf24" opacity="0.7" stroke="none" />
        {/* Seal rays */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 160 + Math.cos(rad) * 32;
          const y1 = 190 + Math.sin(rad) * 32;
          const x2 = 160 + Math.cos(rad) * 45;
          const y2 = 190 + Math.sin(rad) * 45;
          return <line key={`sr${i}`} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="1" stroke="#fbbf24" opacity="0.15" />;
        })}
        {/* Ribbon */}
        <path d="M140 270 L140 330 L160 310 L180 330 L180 270" strokeWidth="1.5" stroke="#fbbf24" opacity="0.2" fill="#fbbf24" fillOpacity="0.04" />
        {/* Content lines below seal */}
        <line x1="100" y1="250" x2="220" y2="250" strokeWidth="1" opacity="0.06" />
        <line x1="110" y1="265" x2="210" y2="265" strokeWidth="1" stroke="#818cf8" opacity="0.08" />
        {/* Surrounding check marks */}
        <path d="M280 120 L290 130 L310 110" strokeWidth="2" stroke="#34d399" opacity="0.2" strokeLinecap="round" />
        <path d="M280 170 L290 180 L310 160" strokeWidth="2" stroke="#34d399" opacity="0.15" strokeLinecap="round" />
        <path d="M280 220 L290 230 L310 210" strokeWidth="2" stroke="#34d399" opacity="0.12" strokeLinecap="round" />
        {/* Particles */}
        <circle cx="40" cy="150" r="2" fill="#fbbf24" opacity="0.4" stroke="none" />
        <circle cx="290" cy="280" r="2" fill="#818cf8" opacity="0.4" stroke="none" />
        <circle cx="50" cy="300" r="1.5" fill="#38bdf8" opacity="0.3" stroke="none" />
        <circle cx="280" cy="80" r="1.5" fill="#fbbf24" opacity="0.4" stroke="none" />
      </g>
    </svg>
  ),
};

const SIGNAL_KEYS = ['sovereignty', 'zeroTrust', 'sla', 'traceability', 'compliance'] as const;
const SIGNAL_ICONS: Record<string, string> = {
  sovereignty: 'shield',
  zeroTrust: 'lock',
  sla: 'check',
  traceability: 'document',
  compliance: 'certificate',
};

/**
 * Trust Signals section - Governance, compliance, sovereignty
 */
export function TrustSignals() {
  const t = useTranslations('trustSignals');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  const cardClasses = cn(
    'group relative p-8 md:p-10 rounded-2xl overflow-hidden',
    'bg-[#1a1b2e] border border-white/5',
    'hover:border-white/10 hover-lift shadow-xl',
    'transition-all duration-500'
  );

  const firstThree = SIGNAL_KEYS.slice(0, 3);
  const lastTwo = SIGNAL_KEYS.slice(3);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-surface">
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

        {/* Trust Items - 3 columns desktop, 1 column mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {firstThree.map((key, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ 
                duration: 0.5, 
                delay: prefersReducedMotion ? 0 : index * 0.1, 
                ease: [0.16, 1, 0.3, 1] as const 
              }}
              className={cardClasses}
            >
              {/* Background Graphic */}
              {SIGNAL_BACKGROUNDS[key]}

              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-br from-[#38bdf8]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="mb-6 text-white/80 group-hover:text-white transition-colors duration-300">
                  <div className="w-12 h-12 rounded-lg border border-white/20 flex items-center justify-center bg-white/5">
                    {ICONS[SIGNAL_ICONS[key]] || ICONS.shield}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-[#38bdf8] transition-colors">
                  {t(`${key}.title`)}
                </h3>

                {/* Description */}
                <p className="text-white/70 font-medium">
                  {t(`${key}.description`)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Trust Items (2 remaining) */}
        {lastTwo.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-2xl mx-auto">
            {lastTwo.map((key, index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ 
                  duration: 0.5, 
                  delay: prefersReducedMotion ? 0 : (3 + index) * 0.1, 
                  ease: [0.16, 1, 0.3, 1] as const 
                }}
                className={cardClasses}
              >
                {/* Background Graphic */}
                {SIGNAL_BACKGROUNDS[key]}

                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-br from-[#38bdf8]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6 text-white/80 group-hover:text-white transition-colors duration-300">
                    <div className="w-12 h-12 rounded-lg border border-white/20 flex items-center justify-center bg-white/5">
                      {ICONS[SIGNAL_ICONS[key]] || ICONS.shield}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-[#38bdf8] transition-colors">
                    {t(`${key}.title`)}
                  </h3>

                  {/* Description */}
                  <p className="text-white/70 font-medium">
                    {t(`${key}.description`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
