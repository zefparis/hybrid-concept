'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { HeroProps } from '@/types';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.1,
    },
  },
};

/**
 * Hero section component
 * Variants: home (full height), page (compact), minimal
 */
export function Hero({
  title,
  subtitle,
  tagline,
  coreStatement,
  description,
  ctaText,
  ctaHref,
  cta,
  secondaryCta,
  variant = 'home',
}: HeroProps) {
  const isHome = variant === 'home';
  const isMinimal = variant === 'minimal';
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);

  const displaySubtitle = subtitle || tagline;
  const displayDescription = coreStatement || description;
  const displayCtaText = ctaText || cta?.label;
  const displayCtaHref = ctaHref || cta?.href;

  return (
    <section
      ref={containerRef}
      className={cn(
        'relative flex items-center justify-center overflow-hidden',
        isHome && 'min-h-screen pt-20',
        !isHome && !isMinimal && 'min-h-[60vh] pt-32 pb-20',
        isMinimal && 'pt-32 pb-16'
      )}
      style={{
        background: isHome 
          ? 'linear-gradient(180deg, #0a0a0a 0%, #141414 100%)' 
          : undefined,
      }}
    >
      <div className="container relative z-10">
        <motion.div
          variants={prefersReducedMotion ? {} : staggerContainer}
          initial="hidden"
          animate="visible"
          className={cn(
            'max-w-4xl',
            isHome && 'mx-auto text-center',
            !isHome && 'text-left'
          )}
        >
          {/* Title - h1 */}
          <motion.h1
            variants={prefersReducedMotion ? {} : fadeInUp}
            className={cn(
              'font-bold tracking-tight text-[var(--text-primary)]',
              isHome && 'text-4xl md:text-6xl',
              !isHome && 'text-3xl md:text-5xl'
            )}
          >
            {title}
          </motion.h1>

          {/* Subtitle - h2 */}
          {displaySubtitle && (
            <motion.h2
              variants={prefersReducedMotion ? {} : fadeInUp}
              className={cn(
                'mt-4 font-medium uppercase tracking-[0.2em] text-[var(--text-secondary)]',
                isHome && 'text-xl md:text-2xl',
                !isHome && 'text-lg md:text-xl'
              )}
            >
              {displaySubtitle}
            </motion.h2>
          )}

          {/* Core Statement / Description - p */}
          {displayDescription && (
            <motion.p
              variants={prefersReducedMotion ? {} : fadeInUp}
              className={cn(
                'mt-8 text-[var(--text-secondary)] leading-relaxed',
                isHome && 'text-lg md:text-xl max-w-[800px] mx-auto',
                !isHome && 'text-base md:text-lg max-w-xl'
              )}
            >
              {displayDescription}
            </motion.p>
          )}

          {/* CTA */}
          {displayCtaText && displayCtaHref && (
            <motion.div
              variants={prefersReducedMotion ? {} : fadeInUp}
              className={cn(
                'mt-10',
                isHome && 'flex justify-center',
                !isHome && 'flex justify-start'
              )}
            >
              <Link
                href={displayCtaHref}
                className={cn(
                  'group inline-flex items-center gap-2 px-6 py-3',
                  'border border-[var(--border)] rounded-lg',
                  'text-[var(--text-primary)] font-medium',
                  'transition-all duration-300',
                  'hover:border-[var(--accent)] hover:shadow-[0_0_20px_rgba(37,99,235,0.15)]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]'
                )}
              >
                {displayCtaText}
                <svg 
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Scroll Indicator (Home only) */}
      {isHome && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-[var(--text-muted)]">
            <span className="text-xs uppercase tracking-wider">Scroll</span>
            <motion.div
              animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
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
