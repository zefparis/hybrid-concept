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
        tagline={hero.tagline}
        description={hero.description}
        cta={hero.cta}
        secondaryCta={hero.secondaryCta}
        variant="home"
      />
      <WhatWeDo />
      <SectorGrid
        title="Sectors We Serve"
        description="HC-1 delivers specialized solutions across critical sectors where security, integration, and continuity are paramount."
      />
      <OperatingModel />
      <TrustSignals />
      <CTASection />
    </>
  );
}
