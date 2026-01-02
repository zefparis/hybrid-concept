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
  title: 'Cyber Resilience | HC-1',
  description: 'Zero-trust architecture and threat prevention.',
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
      <CapabilitiesIntegration />
      <SectorCTA sector="cyberResilience" />
    </>
  );
}
