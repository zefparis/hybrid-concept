import { setRequestLocale, getTranslations } from 'next-intl/server';
import {
  SectorGrid,
  TrustSignals,
  CTASection,
  DivisionGrid,
  BackboneSection,
} from '@/components/sections';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'homepageHero' });
  return (
    <>
      <section
        className="relative pt-32 pb-24 md:pt-40 md:pb-32 text-center overflow-hidden px-6"
        style={{
          backgroundImage: 'url(/images/New_York_City_skyline_banner.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Light gradient overlay — keeps the skyline visible while preserving legibility (text uses textShadow) */}
        <div className="absolute inset-0 bg-linear-to-b from-background/30 via-background/15 to-background/60 pointer-events-none" />
        {/* Vignette behind title only, for contrast without darkening the whole image */}
        <div className="absolute inset-0 bg-radial from-black/40 via-transparent to-transparent pointer-events-none" />
        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-[1.05]"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.55), 0 1px 2px rgba(0,0,0,0.6)' }}
          >
            {t('title')}
          </h1>
          <p
            className="text-base sm:text-lg md:text-xl text-foreground-muted max-w-2xl mx-auto leading-relaxed"
            style={{ textShadow: '0 1px 6px rgba(0,0,0,0.55)' }}
          >
            {t('subtitle')}
          </p>
        </div>
      </section>
      <DivisionGrid />
      <BackboneSection />
      <SectorGrid />
      <TrustSignals />
      <CTASection />
    </>
  );
}
