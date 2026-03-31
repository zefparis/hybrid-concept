'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const SERVICE_KEYS = ['plan', 'integrate', 'assure'] as const;
type ServiceKey = typeof SERVICE_KEYS[number];

const CARD_CONFIG: Record<ServiceKey, { accent: string; num: string }> = {
  plan:      { accent: '#00C2FF', num: '01' },
  integrate: { accent: '#818cf8', num: '02' },
  assure:    { accent: '#34d399', num: '03' },
};

function CardIcon({ type, color }: { type: ServiceKey; color: string }) {
  if (type === 'plan') return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <circle cx="15" cy="15" r="2" strokeDasharray="2 2" />
    </svg>
  );
  if (type === 'integrate') return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <line x1="8.4" y1="10.8" x2="15.6" y2="7.2" />
      <line x1="8.4" y1="13.2" x2="15.6" y2="16.8" />
      <line x1="18" y1="8.5" x2="18" y2="15.5" />
    </svg>
  );
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L20 6V12C20 17 16 21 12 22C8 21 4 17 4 12V6L12 2Z" />
      <polyline points="9,12 11,14 15,9" strokeWidth={2.5} />
    </svg>
  );
}

/**
 * What We Do section - 3 pillars: Plan, Integrate, Assure
 */
export function WhatWeDo() {
  const t = useTranslations('whatWeDo');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 bg-surface">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-center mb-16"
        >
          <h2 className="text-display-sm md:text-display-md font-bold text-foreground">
            {t('heading')}
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {SERVICE_KEYS.map((key, idx) => {
            const cfg = CARD_CONFIG[key];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.65,
                  delay: prefersReducedMotion ? 0 : idx * 0.13,
                  ease: [0.16, 1, 0.3, 1] as const,
                }}
                className="group relative rounded-2xl overflow-hidden transition-all duration-500 cursor-default"
                style={{
                  background: 'linear-gradient(145deg, #162032 0%, #131c2e 100%)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  boxShadow: '0 8px 40px rgba(0,0,0,0.35)',
                }}
              >
                {/* Colored top accent bar */}
                <div
                  className="absolute top-0 inset-x-0 h-[2px]"
                  style={{ background: `linear-gradient(90deg, ${cfg.accent} 0%, transparent 75%)` }}
                />

                {/* Hover background glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 90% 10%, ${cfg.accent}1A 0%, transparent 58%)` }}
                />

                {/* Hover inset border glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: `inset 0 0 0 1px ${cfg.accent}30` }}
                />

                {/* Large decorative step number */}
                <div
                  className="absolute -top-3 right-4 text-[8.5rem] font-black leading-none select-none pointer-events-none"
                  style={{ color: cfg.accent, opacity: 0.05 }}
                >
                  {cfg.num}
                </div>

                {/* Card content */}
                <div className="relative z-10 p-8 md:p-10 flex flex-col">
                  {/* Step chip + divider line */}
                  <div className="flex items-center gap-3 mb-7">
                    <span
                      className="text-[11px] font-black tracking-[0.2em] uppercase px-3 py-1 rounded-full shrink-0"
                      style={{
                        background: `${cfg.accent}18`,
                        color: cfg.accent,
                        border: `1px solid ${cfg.accent}30`,
                      }}
                    >
                      {cfg.num}
                    </span>
                    <div
                      className="flex-1 h-px"
                      style={{ background: `linear-gradient(90deg, ${cfg.accent}30, transparent)` }}
                    />
                  </div>

                  {/* Icon with glow */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110"
                    style={{
                      background: `${cfg.accent}18`,
                      border: `1px solid ${cfg.accent}35`,
                      boxShadow: `0 4px 24px ${cfg.accent}15`,
                    }}
                  >
                    <CardIcon type={key} color={cfg.accent} />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-[1.6rem] font-extrabold text-white mb-3 tracking-tight leading-tight">
                    {t(`${key}.title`)}
                  </h3>

                  {/* Animated accent underline */}
                  <div
                    className="rounded-full mb-5 h-[2px] transition-all duration-500 group-hover:w-14"
                    style={{ background: cfg.accent, width: '2rem' }}
                  />

                  {/* Description */}
                  <p className="text-white/60 leading-relaxed text-sm md:text-[0.95rem]">
                    {t(`${key}.description`)}
                  </p>
                </div>

                {/* Bottom glow line on hover */}
                <div
                  className="absolute bottom-0 inset-x-0 h-px opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${cfg.accent}, transparent)` }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
