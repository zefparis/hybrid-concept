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
  title: 'Ports, Borders & Logistics | HC-1',
  description: 'Secure corridors and supply chain integrity.',
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function PortsLogisticsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SectorHero sector="portsLogistics" />
      <SectorOverview sector="portsLogistics" />
      <RiskLandscape sector="portsLogistics" />
      <ApproachSection sector="portsLogistics" />
      <ValueProposition sector="portsLogistics" />
      <UseCases sector="portsLogistics" />
      <CapabilitiesIntegration />
      <SectorCTA sector="portsLogistics" />
    </>
  );
}
