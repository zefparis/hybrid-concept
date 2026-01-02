'use client';

import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui';

/**
 * Final CTA section for homepage
 */
export function CTASection() {
  const t = useTranslations('cta');
  const locale = useLocale();

  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="relative overflow-hidden rounded-3xl bg-surface border border-border p-12 md:p-20 text-center"
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent blur-[150px]" />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
              {t('heading')}
            </h2>
            <p className="mt-4 text-lg text-foreground-secondary">
              {t('description')}
            </p>
            <div className="mt-8">
              <Button href={`/${locale}/contact`} size="lg">
                {t('button')}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
