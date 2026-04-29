import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SectorHero, SectorCTA } from '@/components/sections/sector';

export const metadata: Metadata = {
  title: 'Modern Agriculture | HMH',
  description: 'HMH enables technology-driven, sustainable farming: precision agriculture, traceability and cooperative networks.',
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ModernAgriculturePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SectorHero sector="modernAgriculture" />
      <SectorCTA sector="modernAgriculture" />
    </>
  );
}
