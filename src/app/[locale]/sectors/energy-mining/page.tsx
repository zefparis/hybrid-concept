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
  title: 'Energy & Mining | National Revenue Systems Protection',
  description:
    'HC-1 protects production continuity, secures export corridors, and strengthens national revenue through upstream systems integration and operational assurance.',
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function EnergyMiningPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SectorHero sector="energyMining" />
      <SectorOverview sector="energyMining" />
      <RiskLandscape sector="energyMining" />
      <ApproachSection sector="energyMining" />
      <ValueProposition sector="energyMining" />
      <UseCases sector="energyMining" />
      <CapabilitiesIntegration />
      <SectorCTA sector="energyMining" />
    </>
  );
}
