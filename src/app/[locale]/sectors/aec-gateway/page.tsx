import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { AECGatewayPage } from '@/components/divisions/AECGatewayPage';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aecGatewayPage' });
  return { title: t('metaTitle'), description: t('metaDesc') };
}

export default async function AECGatewaySectorPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AECGatewayPage />;
}
