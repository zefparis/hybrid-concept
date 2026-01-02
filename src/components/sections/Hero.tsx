'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import type { HeroProps } from '@/types';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
  }
};

/**
 * Premium Hero section component
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
}: Partial<HeroProps> & { variant?: 'home' | 'page' | 'minimal' } = {}) {
  const t = useTranslations('hero');
  const tCommon = useTranslations('common');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true });
  const prefersReducedMotion = useReducedMotion();
  
  const isHome = variant === 'home';
  const isMinimal = variant === 'minimal';

  const displayTitle = title || t('title');
  const displaySubtitle = subtitle || tagline || t('subtitle');
  const displayDescription = coreStatement || description || t('coreStatement');
  const displayCtaText = ctaText || cta?.label || tCommon('exploreCTA');
  const displayCtaHref = ctaHref || cta?.href || '/capabilities';

  return (
    <section
      ref={sectionRef}
      className={cn(
        'relative flex items-center justify-center overflow-hidden',
        isHome && 'min-h-screen',
        !isHome && !isMinimal && 'min-h-[60vh] pt-32 pb-20',
        isMinimal && 'pt-32 pb-16'
      )}
    >
      {/* Background Image (Home only) */}
      {isHome && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/hc.png)' }}
        />
      )}
      
      {/* Dark overlay for readability */}
      {isHome && (
        <div className="absolute inset-0 bg-background/50" />
      )}
      
      {/* Animated grid background (Home only) */}
      {isHome && (
        <div className="absolute inset-0 grid-pattern opacity-20" />
      )}
      
      {/* Gradient overlay */}
      {isHome && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-surface" />
      )}
      
      {/* Glow orb effect (Home only) */}
      {isHome && (
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-glow pointer-events-none" />
      )}
      
      {/* Content */}
      <motion.div
        initial="hidden"
        animate={isInView && !prefersReducedMotion ? "visible" : "hidden"}
        variants={container}
        className={cn(
          'relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12',
          isHome && 'text-center',
          !isHome && 'text-left'
        )}
      >
        {/* Subtitle (overline) */}
        {displaySubtitle && (
          <motion.p 
            variants={item}
            className={cn(
              'uppercase tracking-[0.2em] text-foreground-secondary mb-6',
              isHome && 'text-sm md:text-base',
              !isHome && 'text-sm'
            )}
          >
            {displaySubtitle}
          </motion.p>
        )}
        
        {/* Main title */}
        <motion.h1 
          variants={item}
          className={cn(
            'font-bold text-gradient mb-8',
            isHome && 'text-display-md md:text-display-lg',
            !isHome && 'text-display-sm md:text-display-md'
          )}
        >
          {displayTitle}
        </motion.h1>
        
        {/* Core statement */}
        {displayDescription && (
          <motion.p 
            variants={item}
            className={cn(
              'text-foreground-secondary leading-relaxed mb-12',
              isHome && 'text-body-lg md:text-heading-md max-w-4xl mx-auto',
              !isHome && 'text-body md:text-body-lg max-w-2xl'
            )}
          >
            {displayDescription}
          </motion.p>
        )}
        
        {/* CTA */}
        {displayCtaText && displayCtaHref && (
          <motion.div 
            variants={item}
            className={cn(
              'flex gap-4',
              isHome && 'justify-center',
              !isHome && 'justify-start'
            )}
          >
            <Button 
              href={displayCtaHref}
              size="lg" 
              variant="default"
              className="group"
              rightIcon={
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              }
            >
              {displayCtaText}
            </Button>
            
            {secondaryCta && (
              <Button 
                href={secondaryCta.href}
                size="lg" 
                variant="outline"
              >
                {secondaryCta.label}
              </Button>
            )}
          </motion.div>
        )}
      </motion.div>
      
      {/* Bottom fade (Home only) */}
      {isHome && (
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface to-transparent pointer-events-none" />
      )}

      {/* Scroll Indicator (Home only) */}
      {isHome && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-foreground-muted">
            <span className="text-caption uppercase tracking-wider">Scroll</span>
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
