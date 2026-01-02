'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { TRUST_SIGNALS } from '@/lib/constants';
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

interface TrustSignalsProps {
  heading?: string;
}

/**
 * Trust Signals section - Governance, compliance, sovereignty
 */
export function TrustSignals({ heading = 'Governance & Trust' }: TrustSignalsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  const cardClasses = cn(
    'group relative p-8 rounded-xl overflow-hidden',
    'bg-surface-elevated border border-border',
    'transition-all duration-500',
    'hover:border-accent hover-lift'
  );

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
            {heading}
          </h2>
        </motion.div>

        {/* Trust Items - 3 columns desktop, 1 column mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TRUST_SIGNALS.slice(0, 3).map((signal, index) => (
            <motion.div
              key={signal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ 
                duration: 0.5, 
                delay: prefersReducedMotion ? 0 : index * 0.1, 
                ease: [0.16, 1, 0.3, 1] as const 
              }}
              className={cardClasses}
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="mb-6 text-foreground-secondary group-hover:text-accent transition-colors duration-300">
                  {signal.icon && ICONS[signal.icon] ? ICONS[signal.icon] : ICONS.shield}
                </div>

                {/* Title */}
                <h3 className="text-heading-md font-semibold text-foreground mb-3">
                  {signal.title}
                </h3>

                {/* Description */}
                <p className="text-body-sm text-foreground-secondary">
                  {signal.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Trust Items (2 remaining) */}
        {TRUST_SIGNALS.length > 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-2xl mx-auto">
            {TRUST_SIGNALS.slice(3).map((signal, index) => (
              <motion.div
                key={signal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ 
                  duration: 0.5, 
                  delay: prefersReducedMotion ? 0 : (3 + index) * 0.1, 
                  ease: [0.16, 1, 0.3, 1] as const 
                }}
                className={cardClasses}
              >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6 text-foreground-secondary group-hover:text-accent transition-colors duration-300">
                    {signal.icon && ICONS[signal.icon] ? ICONS[signal.icon] : ICONS.shield}
                  </div>

                  {/* Title */}
                  <h3 className="text-heading-md font-semibold text-foreground mb-3">
                    {signal.title}
                  </h3>

                  {/* Description */}
                  <p className="text-body-sm text-foreground-secondary">
                    {signal.description}
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
