import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Hero, SectorGrid } from '@/components/sections';

export const metadata: Metadata = {
  title: 'Sectors',
  description:
    'HC-1 delivers specialized security and integration solutions across government, critical infrastructure, energy, logistics, cyber, and AI sectors.',
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function SectorsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero
        title="Sectors We Serve"
        tagline="Domain Expertise"
        description="We bring deep sector knowledge to every engagement, understanding the unique challenges, regulations, and operational requirements of each domain."
        variant="page"
      />
      <SectorGrid title="Our Focus Areas" />
    </>
  );
}
