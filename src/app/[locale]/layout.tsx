import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Header, Footer } from '@/components/layout';
import { locales, type Locale } from '@/i18n/config';

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
    en: 'HC-1 | Strategic Command & Integration Authority',
    fr: 'HC-1 | Autorité de Commandement Stratégique et d\'Intégration',
    pt: 'HC-1 | Autoridade de Comando Estratégico e Integração',
  };

  const descriptions: Record<Locale, string> = {
    en: 'HC-1 anticipates and secures systems upstream to prevent disruption, reduce operational risk, and protect revenue through assured continuity.',
    fr: 'HC-1 anticipe et sécurise les systèmes en amont pour prévenir les perturbations, réduire les risques opérationnels et protéger les revenus.',
    pt: 'A HC-1 antecipa e protege sistemas a montante para prevenir perturbações, reduzir riscos operacionais e proteger receitas.',
  };

  return {
    title: {
      default: titles[locale as Locale] || titles.en,
      template: '%s | HC-1',
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
      <main className="min-h-screen">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
