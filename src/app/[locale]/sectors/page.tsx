import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Hero, SectorGrid } from '@/components/sections';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'sectorsPage.hero' });
  
  return {
    title: t('title'),
    description: t('description'),
  };
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function SectorsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const tHero = await getTranslations({ locale, namespace: 'sectorsPage.hero' });
  const tPage = await getTranslations({ locale, namespace: 'sectorsPage' });

  return (
    <>
      <Hero
        title={tHero('title')}
        tagline={tHero('tagline')}
        description={tHero('description')}
        variant="page"
      />
      <SectorGrid title={tPage('gridTitle')} />
    </>
  );
}
