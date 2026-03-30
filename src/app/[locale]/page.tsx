import { setRequestLocale } from 'next-intl/server';
import {
  Hero,
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
  return (
    <>
      <Hero showCta={false} />
      <DivisionsSection />
      <WhatWeDo />
      <TrustSignals />
      <CTASection />
    </>
  );
}
