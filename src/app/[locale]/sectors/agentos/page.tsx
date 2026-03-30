import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { AgentOSPage } from '@/components/divisions/AgentOSPage';

export const metadata: Metadata = {
  title: 'AgentOS — From Call to Closing | HMH PropTech',
  description: 'AgentOS is the operating platform for South African real estate agents.',
};

type Props = { params: Promise<{ locale: string }> };

export default async function AgentOSSectorPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AgentOSPage />;
}
