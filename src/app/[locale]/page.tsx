import { setRequestLocale } from 'next-intl/server';
import {
  Hero,
  WhatWeDo,
  SectorGrid,
  OperatingModel,
  TrustSignals,
  CTASection,
} from '@/components/sections';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  
  // Enable static rendering
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <WhatWeDo />
      <SectorGrid />
      <OperatingModel />
      <TrustSignals />
      <CTASection />
    </>
  );
}
