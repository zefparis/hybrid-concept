import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Header, Footer } from '@/components/layout';
import { locales, type Locale } from '@/i18n/config';
import { HCSWidgetScript } from '@/components/ui/HCSWidgetScript';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  
  const titles: Record<Locale, string> = {
    en: 'HMH | Hybrid Mobility Holdings — Africa Infrastructure & Technology',
    fr: 'HMH | Hybrid Mobility Holdings — Infrastructure Afrique',
    pt: 'HMH | Hybrid Mobility Holdings — Infraestrutura África',
  };

  const descriptions: Record<Locale, string> = {
    en: 'HMH connects real estate professionals, infrastructure financiers, and sovereign institutions on a single platform secured by post-quantum authentication.',
    fr: "HMH connecte les professionnels de l'immobilier, les financeurs d'infrastructure et les institutions souveraines sur une seule plateforme sécurisée.",
    pt: 'A HMH conecta profissionais do setor imobiliário, financiadores de infraestrutura e instituições soberanas numa única plataforma protegida.',
  };

  return {
    title: {
      default: titles[locale as Locale] || titles.en,
      template: '%s | HMH',
    },
    description: descriptions[locale as Locale] || descriptions.en,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        fr: '/fr',
        pt: '/pt',
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  
  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Load translations
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Header />
      <main className="min-h-screen pt-16 md:pt-20">{children}</main>
      <Footer />
      <HCSWidgetScript />
    </NextIntlClientProvider>
  );
}
