import { setRequestLocale } from 'next-intl/server';
import {
  HomepageHero,
  ProductsSection,
  BackboneSection,
  SectorGrid,
  TrustSignals,
  CTASection,
} from '@/components/sections';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HomepageHero locale={locale} />
      <ProductsSection />
      <BackboneSection />
      <SectorGrid />
      <TrustSignals />
      <CTASection />
    </>
  );
}
