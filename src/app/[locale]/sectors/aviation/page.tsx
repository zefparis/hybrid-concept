import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { SectorHero, SectorCTA } from '@/components/sections/sector';

export const metadata: Metadata = {
  title: 'Aviation | HC-1',
  description: 'HC-1 secures aviation operations: cognitive authentication, drone anti-spoofing, post-quantum communications.',
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AviationPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SectorHero sector="aviation" />
      <SectorCTA sector="aviation" />
    </>
  );
}
