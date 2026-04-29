import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import {
  SectorHero,
  SectorOverview,
  RiskLandscape,
  ApproachSection,
  ValueProposition,
  UseCases,
  SectorCTA,
} from '@/components/sections/sector';

export const metadata: Metadata = {
  title: 'Critical Infrastructure | HMH',
  description: 'Protection of essential services and national assets.',
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CriticalInfraPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SectorHero sector="criticalInfra" />
      <SectorOverview sector="criticalInfra" />
      <RiskLandscape sector="criticalInfra" />
      <ApproachSection sector="criticalInfra" />
      <ValueProposition sector="criticalInfra" />
      <UseCases sector="criticalInfra" />
      <SectorCTA sector="criticalInfra" />
    </>
  );
}
