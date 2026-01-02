'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { OPERATING_STEPS } from '@/lib/constants';

interface OperatingModelProps {
  heading?: string;
}

/**
 * Operating Model section - Flow diagram: Anticipate → Assure → Continuity → Revenue
 */
export function OperatingModel({ heading = 'Operating Model' }: OperatingModelProps) {
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
          <h2 className="text-3xl md:text-4xl font-semibold text-[var(--text-primary)]">
            {heading}
          </h2>
        </motion.div>

        {/* Flow Diagram - Desktop: Horizontal, Mobile: Vertical */}
        <div className="relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-px bg-[var(--border)] -translate-y-1/2 z-0" />
          
          {/* Connection Line (Mobile) */}
          <div className="lg:hidden absolute top-0 bottom-0 left-1/2 w-px bg-[var(--border)] -translate-x-1/2 z-0" />

          {/* Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4 relative z-10">
            {OPERATING_STEPS.map((step, index) => (
              <motion.div
                key={step.id}
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
                <div className="w-full p-6 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-center">
                  {/* Label */}
                  <h3 className="text-xl font-semibold uppercase tracking-wide text-[var(--text-primary)] mb-2">
                    {step.label}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[var(--text-secondary)]">
                    {step.description}
                  </p>
                </div>

                {/* Arrow (Desktop, not on last item) */}
                {index < OPERATING_STEPS.length - 1 && (
                  <motion.div 
                    className="hidden lg:flex absolute top-1/2 -right-2 -translate-y-1/2 z-20"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: prefersReducedMotion ? 0 : 0.5 + index * 0.15 }}
                  >
                    <svg className="w-4 h-4 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                )}

                {/* Arrow (Mobile, not on last item) */}
                {index < OPERATING_STEPS.length - 1 && (
                  <motion.div 
                    className="lg:hidden flex justify-center py-4"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: prefersReducedMotion ? 0 : 0.5 + index * 0.15 }}
                  >
                    <svg className="w-4 h-4 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7" />
                    </svg>
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
