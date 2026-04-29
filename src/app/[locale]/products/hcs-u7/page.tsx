import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ProductHero, ProductCTA } from '@/components/products';

export const metadata: Metadata = {
  title: 'HCS-U7 | HMH',
  description:
    "The world's first post-quantum cognitive authentication system — combining neuropsychological tests, celestial entropy and NIST FIPS 203/204.",
};

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }, { locale: 'pt' }];
}

export default async function HcsU7ProductPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ProductHero
        title="HCS-U7"
        subtitle="Cognitive Authentication Platform"
        description="The world's first post-quantum cognitive authentication system — combining neuropsychological tests, celestial entropy and NIST FIPS 203/204."
        backgroundImage="/images/hero-bg.jpg"
        locale={locale}
        stats={[
          { value: '<3ms', label: 'Latency' },
          { value: '100%', label: 'Anti-spoofing' },
          { value: '3', label: 'French patents' },
          { value: 'FIPS 203/204', label: 'PQC standard' },
        ]}
      />
      <ProductCTA locale={locale} />
    </>
  );
}
