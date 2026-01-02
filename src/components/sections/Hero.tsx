'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import type { HeroProps } from '@/types';

const MOTION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
    },
  },
};

/**
 * Hero section component
 * Variants: home (full height), page (compact), minimal
 */
export function Hero({
  title,
  tagline,
  description,
  cta,
  secondaryCta,
  variant = 'home',
}: HeroProps) {
  const isHome = variant === 'home';
  const isMinimal = variant === 'minimal';

  return (
    <section
      className={cn(
        'relative flex items-center justify-center overflow-hidden',
        isHome && 'min-h-screen pt-20',
        !isHome && !isMinimal && 'min-h-[60vh] pt-32 pb-20',
        isMinimal && 'pt-32 pb-16'
      )}
    >
      {/* Background Grid Pattern */}
      {isHome && (
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(var(--text-primary) 1px, transparent 1px),
                linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)
              `,
              backgroundSize: '64px 64px',
            }}
          />
        </div>
      )}

      {/* Gradient Orb */}
      {isHome && (
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] opacity-20 pointer-events-none">
          <div className="absolute inset-0 rounded-full bg-[var(--accent)] blur-[128px]" />
        </div>
      )}

      <div className="container relative z-10">
        <motion.div
          variants={MOTION_VARIANTS.container}
          initial="hidden"
          animate="visible"
          className={cn(
            'max-w-4xl',
            isHome && 'mx-auto text-center',
            !isHome && 'text-left'
          )}
        >
          {/* Tagline */}
          {tagline && (
            <motion.p
              variants={MOTION_VARIANTS.item}
              className="text-sm md:text-base font-medium text-[var(--accent)] tracking-wider uppercase mb-4"
            >
              {tagline}
            </motion.p>
          )}

          {/* Title */}
          <motion.h1
            variants={MOTION_VARIANTS.item}
            className={cn(
              'font-semibold tracking-tight text-[var(--text-primary)]',
              isHome && 'text-4xl md:text-6xl lg:text-7xl',
              !isHome && 'text-3xl md:text-5xl'
            )}
          >
            {title}
          </motion.h1>

          {/* Description */}
          {description && (
            <motion.p
              variants={MOTION_VARIANTS.item}
              className={cn(
                'mt-6 text-[var(--text-secondary)] leading-relaxed',
                isHome && 'text-lg md:text-xl max-w-2xl mx-auto',
                !isHome && 'text-base md:text-lg max-w-xl'
              )}
            >
              {description}
            </motion.p>
          )}

          {/* CTAs */}
          {(cta || secondaryCta) && (
            <motion.div
              variants={MOTION_VARIANTS.item}
              className={cn(
                'mt-10 flex flex-wrap gap-4',
                isHome && 'justify-center',
                !isHome && 'justify-start'
              )}
            >
              {cta && (
                <Button href={cta.href} size={isHome ? 'lg' : 'md'}>
                  {cta.label}
                </Button>
              )}
              {secondaryCta && (
                <Button
                  href={secondaryCta.href}
                  variant="outline"
                  size={isHome ? 'lg' : 'md'}
                >
                  {secondaryCta.label}
                </Button>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Scroll Indicator (Home only) */}
      {isHome && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-[var(--text-muted)]">
            <span className="text-xs uppercase tracking-wider">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
