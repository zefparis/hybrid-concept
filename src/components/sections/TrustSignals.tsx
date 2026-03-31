'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Shield, Lock, CheckCircle, FileText, Award, type LucideIcon } from 'lucide-react';

const SIGNAL_KEYS = ['sovereignty', 'zeroTrust', 'sla', 'traceability', 'compliance'] as const;
type SignalKey = typeof SIGNAL_KEYS[number];

const SIGNAL_CONFIG: Record<SignalKey, { accent: string; Icon: LucideIcon }> = {
  sovereignty:  { accent: '#00C2FF', Icon: Shield },
  zeroTrust:    { accent: '#818cf8', Icon: Lock },
  sla:          { accent: '#34d399', Icon: CheckCircle },
  traceability: { accent: '#c084fc', Icon: FileText },
  compliance:   { accent: '#fbbf24', Icon: Award },
};

/**
 * Trust Signals section - Governance, compliance, sovereignty
 */
export function TrustSignals() {
  const t = useTranslations('trustSignals');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  function renderCard(key: SignalKey, idx: number) {
    const { accent, Icon } = SIGNAL_CONFIG[key];
    return (
      <motion.div
        key={key}
        initial={{ opacity: 0, y: 28 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.65,
          delay: prefersReducedMotion ? 0 : idx * 0.1,
          ease: [0.16, 1, 0.3, 1] as const,
        }}
        className="group relative rounded-2xl overflow-hidden transition-all duration-500 cursor-default"
        style={{
          background: 'linear-gradient(145deg, #162032 0%, #131c2e 100%)',
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
        }}
      >
        {/* Colored top accent bar */}
        <div
          className="absolute top-0 inset-x-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, ${accent} 0%, transparent 75%)` }}
        />

        {/* Hover background glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ background: `radial-gradient(circle at 90% 10%, ${accent}1A 0%, transparent 58%)` }}
        />

        {/* Hover inset border glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: `inset 0 0 0 1px ${accent}30` }}
        />

        {/* Card content */}
        <div className="relative z-10 p-8 md:p-10">
          {/* Icon with glow */}
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110"
            style={{
              background: `${accent}18`,
              border: `1px solid ${accent}35`,
              boxShadow: `0 4px 24px ${accent}15`,
            }}
          >
            <Icon size={22} color={accent} />
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-extrabold text-white mb-3 tracking-tight leading-tight">
            {t(`${key}.title`)}
          </h3>

          {/* Animated accent underline */}
          <div
            className="rounded-full mb-4 h-[2px] transition-all duration-500 group-hover:w-12"
            style={{ background: accent, width: '1.75rem' }}
          />

          {/* Description */}
          <p className="text-white/60 leading-relaxed text-sm md:text-[0.95rem]">
            {t(`${key}.description`)}
          </p>
        </div>

        {/* Bottom glow line on hover */}
        <div
          className="absolute bottom-0 inset-x-0 h-px opacity-0 group-hover:opacity-60 transition-opacity duration-500"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
        />
      </motion.div>
    );
  }

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-surface">
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

        {/* Row 1: 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SIGNAL_KEYS.slice(0, 3).map((key, idx) => renderCard(key, idx))}
        </div>

        {/* Row 2: 2 cards centred */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 max-w-2xl mx-auto">
          {SIGNAL_KEYS.slice(3).map((key, idx) => renderCard(key, 3 + idx))}
        </div>
      </div>
    </section>
  );
}
