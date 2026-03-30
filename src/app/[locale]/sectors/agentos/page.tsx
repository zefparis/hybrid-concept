import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { AgentOSPage } from '@/components/divisions/AgentOSPage';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'agentOSPage' });
  return { title: t('metaTitle'), description: t('metaDesc') };
}

export default async function AgentOSSectorPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AgentOSPage />;
}
