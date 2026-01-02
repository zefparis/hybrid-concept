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
  title: 'Government & National Programs | HC-1',
  description: 'Sovereign infrastructure and national security systems protection.',
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function GovernmentPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SectorHero sector="governmentPrograms" />
      <SectorOverview sector="governmentPrograms" />
      <RiskLandscape sector="governmentPrograms" />
      <ApproachSection sector="governmentPrograms" />
      <ValueProposition sector="governmentPrograms" />
      <UseCases sector="governmentPrograms" />
      <CapabilitiesIntegration />
      <SectorCTA sector="governmentPrograms" />
    </>
  );
}
