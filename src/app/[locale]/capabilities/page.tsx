import type { Metadata } from 'next';
import Link from 'next/link';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Hero } from '@/components/sections';
import { getTranslatedCapabilities } from '@/lib/get-translated-capabilities';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'capabilitiesPage.hero' });
  
  return {
    title: t('title'),
    description: t('description'),
  };
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CapabilitiesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const tHero = await getTranslations({ locale, namespace: 'capabilitiesPage.hero' });
  const capabilities = await getTranslatedCapabilities(locale);

  return (
    <>
      <Hero
        title={tHero('title')}
        tagline={tHero('tagline')}
        description={tHero('description')}
        variant="page"
      />

      <section className="py-20 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((capability) => (
              <Link
                key={capability.id}
                href={`/${locale}/capabilities/${capability.slug}`}
                className="group block p-8 rounded-2xl bg-surface border border-border hover:border-accent transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-accent font-medium mb-1">
                      {capability.tagline}
                    </p>
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground group-hover:text-accent transition-colors">
                      {capability.name}
                    </h3>
                  </div>
                  <svg
                    className="w-6 h-6 text-foreground-muted group-hover:text-accent group-hover:translate-x-1 transition-all"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
                <p className="text-foreground-secondary mb-6">
                  {capability.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {capability.features.slice(0, 3).map((feature) => (
                    <span
                      key={feature.title}
                      className="px-3 py-1 text-xs font-medium text-foreground-muted bg-surface-elevated rounded-full"
                    >
                      {feature.title}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
