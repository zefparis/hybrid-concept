import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ProductHero, ProductCTA, GuardTiersGrid } from '@/components/products';

export const metadata: Metadata = {
  title: 'HV-GUARD | HMH',
  description:
    '9 specialized guard applications — face, voice, cognitive and behavioural layers for education, workplace, payments and access control.',
};

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }, { locale: 'pt' }];
}

export default async function HvGuardProductPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ProductHero
        title="HV-GUARD"
        subtitle="Biometric Access Suite"
        description="9 specialized guard applications — face, voice, cognitive and behavioural layers for education, workplace, payments and access control."
        backgroundImage="/images/hero-bg.jpg"
        locale={locale}
        stats={[
          { value: '9', label: 'Guard apps' },
          { value: '5', label: 'Biometric layers' },
          { value: 'Offline', label: 'Architecture' },
          { value: 'AWS', label: 'Rekognition' },
        ]}
      />
      <GuardTiersGrid />
      <ProductCTA locale={locale} />
    </>
  );
}
