import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { AECGatewayPage } from '@/components/divisions/AECGatewayPage';

export const metadata: Metadata = {
  title: 'AEC Gateway — Infrastructure Finance Platform | HMH',
  description: 'AEC Gateway connects African infrastructure projects to 80+ DFIs. INFRAGATE VS/BS standard.',
};

type Props = { params: Promise<{ locale: string }> };

export default async function AECGatewaySectorPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AECGatewayPage />;
}
