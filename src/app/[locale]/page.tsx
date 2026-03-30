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
      <section className="pt-28 pb-12 text-center">
        <p className="uppercase tracking-[0.2em] text-xs mb-4 text-foreground-secondary">
          {t('eyebrow')}
        </p>
        <h1 className="text-display-lg md:text-display-xl font-bold text-gradient mb-6">
          {t('title')}
        </h1>
        <p className="text-body-lg text-foreground-secondary max-w-2xl mx-auto leading-relaxed">
          {t('subtitle')}
        </p>
      </section>
      <DivisionsSection />
      <WhatWeDo />
      <TrustSignals />
      <CTASection />
    </>
  );
}
