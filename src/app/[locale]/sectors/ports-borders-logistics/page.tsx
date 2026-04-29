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
  title: 'Ports, Borders & Logistics | HMH',
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
      <SectorCTA sector="portsLogistics" />
    </>
  );
}
