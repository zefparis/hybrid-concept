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
  backgroundImage,
  backgroundVideo,
  showCta = true,
}: Partial<HeroProps> & { variant?: 'home' | 'page' | 'minimal'; backgroundImage?: string; backgroundVideo?: string; showCta?: boolean } = {}) {
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
  const displayCtaHref = ctaHref || cta?.href || '/sectors';

  return (
    <section
      ref={sectionRef}
      className={cn(
        'relative flex items-center justify-center overflow-hidden',
        isHome && 'min-h-screen',
        !isHome && !isMinimal && (backgroundImage || backgroundVideo) && 'min-h-[90vh] pt-20 pb-20',
        !isHome && !isMinimal && !backgroundImage && 'min-h-[60vh] pt-16 pb-20',
        isMinimal && 'pt-16 pb-16'
      )}
    >
      {/* Background Image */}
      {isHome && !backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(/images/hc.png)` }}
        />
      )}
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-no-repeat"
          style={{ 
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center center'
          }}
        />
      )}
      {backgroundVideo && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover -z-10"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      )}
      
      {/* Dark overlay for readability */}
      {(isHome || backgroundImage || backgroundVideo) && (
        <div className={cn('absolute inset-0', isHome ? 'bg-background/50' : 'bg-black/60')} />
      )}
      
      {/* Animated grid background (Home only) */}
      {isHome && (
        <div className="absolute inset-0 grid-pattern opacity-20" />
      )}
      
      {/* Gradient overlay */}
      {isHome && (
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/30 to-surface" />
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
          !isHome && 'text-left',
          backgroundImage && 'mt-20 md:mt-32 mr-auto ml-0 md:pl-8'
        )}
      >
        {/* Subtitle (overline) */}
        {displaySubtitle && (
          <motion.p 
            variants={item}
            className={cn(
              'uppercase tracking-[0.2em] mb-6',
              backgroundImage ? 'text-white drop-shadow-lg text-lg md:text-xl' : 'text-foreground-secondary text-sm md:text-base',
              isHome && !backgroundImage && 'text-base md:text-lg',
              !isHome && !backgroundImage && 'text-sm'
            )}
          >
            {displaySubtitle}
          </motion.p>
        )}
        
        {/* Main title */}
        <motion.h1 
          variants={item}
          className={cn(
            'font-bold mb-8',
            backgroundImage ? 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-display-lg md:text-display-xl' : 'text-gradient',
            isHome && !backgroundImage && 'text-display-lg md:text-display-xl',
            !isHome && !backgroundImage && 'text-display-sm md:text-display-md'
          )}
        >
          {displayTitle}
        </motion.h1>
        
        {/* Core statement */}
        {displayDescription && (
          <motion.p 
            variants={item}
            className={cn(
              'leading-relaxed mb-12',
              backgroundImage ? 'text-white/95 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] text-heading-md md:text-heading-lg max-w-3xl' : 'text-foreground-secondary',
              isHome && !backgroundImage && 'text-heading-md md:text-heading-lg max-w-4xl mx-auto',
              !isHome && !backgroundImage && 'text-body md:text-body-lg max-w-2xl'
            )}
          >
            {displayDescription}
          </motion.p>
        )}
        
        {/* CTA */}
        {showCta && displayCtaText && displayCtaHref && (
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
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-surface to-transparent pointer-events-none" />
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
