import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import {
  SectorHero,
  SectorOverview,
  RiskLandscape,
  ApproachSection,
  ValueProposition,
  UseCases,
  CapabilitiesIntegration,
  SectorCTA,
} from '@/components/sections/sector';

export const metadata: Metadata = {
  title: 'HCS-U7 Cognitive Cybersecurity | Patented Human Authentication',
  description: 'HCS-U7: patented cognitive authentication with 11-layer anti-mimicry, Brain ML v2.0, and post-quantum cryptography. 99.5% attack rejection rate.',
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CyberResiliencePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SectorHero sector="cyberResilience" />
      <SectorOverview sector="cyberResilience" />
      <RiskLandscape sector="cyberResilience" />
      <ApproachSection sector="cyberResilience" />
      <ValueProposition sector="cyberResilience" />
      <UseCases sector="cyberResilience" />
      <CapabilitiesIntegration sector="cyberResilience" />
      <SectorCTA sector="cyberResilience" />
    </>
  );
}
