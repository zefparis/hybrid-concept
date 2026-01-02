'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { SERVICES } from '@/lib/constants';
import { cn } from '@/lib/utils';

const ICONS: Record<string, React.ReactNode> = {
  plan: (
    <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1}>
      <rect x="8" y="8" width="32" height="32" rx="2" />
      <line x1="8" y1="16" x2="40" y2="16" />
      <line x1="16" y1="8" x2="16" y2="40" />
      <circle cx="28" cy="28" r="6" strokeDasharray="2 2" />
    </svg>
  ),
  integrate: (
    <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1}>
      <circle cx="12" cy="24" r="4" />
      <circle cx="36" cy="12" r="4" />
      <circle cx="36" cy="36" r="4" />
      <line x1="16" y1="24" x2="32" y2="12" />
      <line x1="16" y1="24" x2="32" y2="36" />
      <line x1="36" y1="16" x2="36" y2="32" />
    </svg>
  ),
  assure: (
    <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1}>
      <path d="M24 4L40 12V24C40 34 32 42 24 44C16 42 8 34 8 24V12L24 4Z" />
      <polyline points="16,24 22,30 32,18" strokeWidth={1.5} />
    </svg>
  ),
};

interface WhatWeDoProps {
  heading?: string;
}

/**
 * What We Do section - 3 pillars: Plan, Integrate, Assure
 */
export function WhatWeDo({ heading = 'What We Do' }: WhatWeDoProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

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
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section 
      ref={sectionRef}
      className="px-6 py-12 md:px-12 md:py-20 bg-[var(--surface)]"
    >
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-[var(--text-primary)]">
            {heading}
          </h2>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={prefersReducedMotion ? {} : containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {SERVICES.map((service) => (
            <motion.div
              key={service.id}
              variants={prefersReducedMotion ? {} : itemVariants}
              className={cn(
                'group p-8 rounded-xl',
                'bg-[var(--surface-elevated)] border border-[var(--border)]',
                'transition-all duration-300',
                'hover:border-[var(--accent)] hover:scale-[1.02]'
              )}
            >
              {/* Icon */}
              <div className="mb-6 text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors duration-300">
                {service.icon && ICONS[service.icon] ? ICONS[service.icon] : ICONS.plan}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-base text-[var(--text-secondary)] leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
