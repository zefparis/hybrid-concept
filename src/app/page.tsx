import {
  Hero,
  WhatWeDo,
  SectorGrid,
  OperatingModel,
  TrustSignals,
  CTASection,
} from '@/components/sections';
import { HOMEPAGE_CONTENT } from '@/lib/constants';

export default function Home() {
  const { hero } = HOMEPAGE_CONTENT;

  return (
    <>
      <Hero
        title={hero.title}
        subtitle={hero.subtitle}
        coreStatement={hero.coreStatement}
        ctaText={hero.cta.label}
        ctaHref={hero.cta.href}
        variant="home"
      />
      <WhatWeDo />
      <SectorGrid title="Sectors" />
      <OperatingModel />
      <TrustSignals />
      <CTASection />
    </>
  );
}
