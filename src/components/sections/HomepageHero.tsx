import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BRAND } from '@/lib/brand';

type Props = {
  locale: string;
};

/**
 * HomepageHero — server component.
 * Headline: "Anticipate. Secure. Operate."
 * Background: NY skyline image with gradient overlay for legibility.
 */
export async function HomepageHero({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'hero' });

  return (
    <section
      className="relative pt-32 pb-24 md:pt-40 md:pb-32 text-center overflow-hidden px-6"
      style={{
        backgroundImage: 'url(/images/New_York_City_skyline_banner.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Light gradient overlay — keeps the skyline visible while preserving legibility */}
      <div className="absolute inset-0 bg-linear-to-b from-background/30 via-background/15 to-background/60 pointer-events-none" />
      {/* Vignette behind title for contrast without darkening the whole image */}
      <div className="absolute inset-0 bg-radial from-black/40 via-transparent to-transparent pointer-events-none" />
      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <h1
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-[1.05]"
          style={{ textShadow: '0 2px 12px rgba(0,0,0,0.55), 0 1px 2px rgba(0,0,0,0.6)' }}
        >
          {BRAND.tagline}
        </h1>
        <p
          className="text-base sm:text-lg md:text-xl text-foreground-muted max-w-2xl mx-auto leading-relaxed mb-10"
          style={{ textShadow: '0 1px 6px rgba(0,0,0,0.55)' }}
        >
          {t('subtitle')}
        </p>

        {/* Dual CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href={`/${locale}/products/hcs-u7`}
            className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm sm:text-base font-semibold text-white transition-all duration-300 hover:gap-3"
            style={{
              background: 'rgba(0, 194, 255, 0.18)',
              border: '1px solid var(--accent)',
              boxShadow: '0 8px 32px rgba(0, 194, 255, 0.18)',
            }}
          >
            <span>{t('ctaPrimary')}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm sm:text-base font-semibold text-white/90 hover:text-white transition-colors duration-300"
            style={{
              border: '1px solid rgba(255,255,255,0.25)',
              background: 'rgba(255,255,255,0.04)',
            }}
          >
            {t('ctaSecondary')}
          </Link>
        </div>
      </div>
    </section>
  );
}
