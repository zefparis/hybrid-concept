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
  title: 'AI Fusion & Intelligence | HC-1',
  description: 'Decision intelligence and predictive systems.',
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AIFusionPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SectorHero sector="aiFusion" />
      <SectorOverview sector="aiFusion" />
      <RiskLandscape sector="aiFusion" />
      <ApproachSection sector="aiFusion" />
      <ValueProposition sector="aiFusion" />
      <UseCases sector="aiFusion" />
      <CapabilitiesIntegration />
      <SectorCTA sector="aiFusion" />
    </>
  );
}
