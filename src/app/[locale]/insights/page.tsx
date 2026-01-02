import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Hero } from '@/components/sections';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'insightsPage.hero' });
  
  return {
    title: t('title'),
    description: t('description'),
  };
}


type Props = {
  params: Promise<{ locale: string }>;
};

export default async function InsightsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const tHero = await getTranslations({ locale, namespace: 'insightsPage.hero' });
  const t = await getTranslations({ locale, namespace: 'insightsPage' });
  const tInsights = await getTranslations({ locale, namespace: 'insightsPage.sampleInsights' });
  
  const sampleInsights = [
    {
      id: '1',
      title: tInsights('infrastructure.title'),
      excerpt: tInsights('infrastructure.excerpt'),
      category: tInsights('infrastructure.category'),
      date: '2024-12-15',
      readingTime: 8,
    },
    {
      id: '2',
      title: tInsights('aiSecurity.title'),
      excerpt: tInsights('aiSecurity.excerpt'),
      category: tInsights('aiSecurity.category'),
      date: '2024-12-01',
      readingTime: 12,
    },
    {
      id: '3',
      title: tInsights('cyberResilience.title'),
      excerpt: tInsights('cyberResilience.excerpt'),
      category: tInsights('cyberResilience.category'),
      date: '2024-11-20',
      readingTime: 10,
    },
  ];

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
          {/* Featured Article */}
          <div className="mb-16">
            <div className="p-8 md:p-12 rounded-3xl bg-surface border border-border">
              <span className="inline-block px-3 py-1 text-xs font-medium text-accent bg-accent-muted rounded-full mb-4">
                {t('featured')}
              </span>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                {sampleInsights[0].title}
              </h2>
              <p className="text-lg text-foreground-secondary mb-6 max-w-2xl">
                {sampleInsights[0].excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-foreground-muted">
                <span>{sampleInsights[0].category}</span>
                <span>•</span>
                <span>{sampleInsights[0].readingTime} {t('minRead')}</span>
              </div>
            </div>
          </div>

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleInsights.map((insight) => (
              <article
                key={insight.id}
                className="group p-6 rounded-2xl bg-surface border border-border hover:border-accent transition-colors cursor-pointer"
              >
                <span className="inline-block px-3 py-1 text-xs font-medium text-foreground-muted bg-surface-elevated rounded-full mb-4">
                  {insight.category}
                </span>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors mb-3">
                  {insight.title}
                </h3>
                <p className="text-sm text-foreground-secondary mb-4">
                  {insight.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-foreground-muted">
                  <span>{insight.date}</span>
                  <span>{insight.readingTime} {t('minRead')}</span>
                </div>
              </article>
            ))}
          </div>

          {/* Coming Soon Notice */}
          <div className="mt-16 text-center">
            <p className="text-foreground-muted">
              {t('comingSoon')}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
