import { setRequestLocale, getTranslations } from 'next-intl/server';
import {
  WhatWeDo,
  TrustSignals,
  CTASection,
  DivisionsSection,
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
        className="relative pt-28 pb-20 text-center overflow-hidden"
        style={{
          backgroundImage: 'url(/images/New_York_City_skyline_banner.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-background/70 pointer-events-none" />
        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-background to-transparent pointer-events-none" />

        <div className="relative z-10">
          <p className="uppercase tracking-[0.2em] text-xs mb-4 text-foreground-secondary">
            {t('eyebrow')}
          </p>
          <h1 className="text-display-lg md:text-display-xl font-bold text-gradient mb-6">
            {t('title')}
          </h1>
          <p className="text-body-lg text-foreground-secondary max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>
      </section>
      <DivisionsSection />
      <WhatWeDo />
      <TrustSignals />
      <CTASection />
    </>
  );
}
