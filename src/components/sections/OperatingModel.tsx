'use client';

import { motion } from 'framer-motion';
import { HOMEPAGE_CONTENT } from '@/lib/constants';

/**
 * Operating Model section - Flow diagram: Anticipate → Assure → Continuity → Revenue
 */
export function OperatingModel() {
  const { title, description, stages } = HOMEPAGE_CONTENT.operatingModel;

  return (
    <section className="py-20 md:py-32">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-[var(--text-primary)]">
            {title}
          </h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)]">
            {description}
          </p>
        </motion.div>

        {/* Flow Diagram */}
        <div className="relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-[var(--border)] -translate-y-1/2 z-0" />

          {/* Stages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 relative z-10">
            {stages.map((stage, index) => (
              <motion.div
                key={stage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
                className="relative"
              >
                {/* Card */}
                <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] text-center">
                  {/* Step Number */}
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--accent)] text-white text-sm font-semibold mb-4">
                    {index + 1}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                    {stage.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[var(--text-secondary)]">
                    {stage.description}
                  </p>
                </div>

                {/* Arrow (Desktop, not on last item) */}
                {index < stages.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 z-20 items-center justify-center w-8 h-8 rounded-full bg-[var(--background)] border border-[var(--border)]">
                    <svg className="w-4 h-4 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
