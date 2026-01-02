import type { Metadata } from 'next';
import { Hero, SectorGrid } from '@/components/sections';

export const metadata: Metadata = {
  title: 'Sectors',
  description:
    'HC-1 delivers specialized security and integration solutions across government, critical infrastructure, energy, logistics, cyber, and AI sectors.',
};

export default function SectorsPage() {
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
