'use client';

import { motion } from 'framer-motion';
import { HOMEPAGE_CONTENT } from '@/lib/constants';

/**
 * Trust Signals section - Governance, compliance, sovereignty
 */
export function TrustSignals() {
  const { title, items } = HOMEPAGE_CONTENT.trustSignals;

  return (
    <section className="py-20 md:py-32 bg-[var(--surface)]">
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
        </motion.div>

        {/* Trust Items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
              className="p-8 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)]"
            >
              {/* Check Icon */}
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--success)]/10 text-[var(--success)] mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-[var(--text-secondary)]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
