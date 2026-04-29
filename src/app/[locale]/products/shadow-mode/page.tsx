import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ProductHero, ProductCTA } from '@/components/products';

export const metadata: Metadata = {
  title: 'Shadow Mode | HMH',
  description:
    'Real-time domain monitoring, automated threat mapping and PDF reports — zero integration required, free entry tier.',
};

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }, { locale: 'pt' }];
}

export default async function ShadowModeProductPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ProductHero
        title="Shadow Mode"
        subtitle="Passive Threat Intelligence"
        description="Real-time domain monitoring, automated threat mapping and PDF reports — zero integration required, free entry tier."
        backgroundImage="/images/hero-bg.jpg"
        locale={locale}
        stats={[
          { value: '0', label: 'Integration required' },
          { value: 'Live', label: 'Threat map' },
          { value: 'PDF', label: 'Auto reports' },
          { value: 'Free', label: 'Entry tier' },
        ]}
      />
      <ProductCTA locale={locale} />
    </>
  );
}
