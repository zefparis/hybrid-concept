import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Hero } from '@/components/sections';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about.hero' });
  
  return {
    title: t('title'),
    description: t('description'),
  };
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const tHero = await getTranslations({ locale, namespace: 'about.hero' });
  const tMission = await getTranslations({ locale, namespace: 'about.mission' });
  const tValues = await getTranslations({ locale, namespace: 'about.values' });

  return (
    <>
      <Hero
        title={tHero('title')}
        tagline={tHero('tagline')}
        description={tHero('description')}
        variant="page"
      />

      {/* Mission Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">
                {tMission('heading')}
              </h2>
              <p className="text-lg text-foreground-secondary leading-relaxed mb-6">
                {tMission('intro')}
              </p>
              <p className="text-lg text-foreground-secondary leading-relaxed">
                {tMission('approach')}
              </p>
            </div>
            <div className="space-y-8">
              <div className="p-6 rounded-2xl bg-surface border border-border">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {tMission('sovereign.title')}
                </h3>
                <p className="text-foreground-secondary">
                  {tMission('sovereign.description')}
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-surface border border-border">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {tMission('integration.title')}
                </h3>
                <p className="text-foreground-secondary">
                  {tMission('integration.description')}
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-surface border border-border">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {tMission('continuity.title')}
                </h3>
                <p className="text-foreground-secondary">
                  {tMission('continuity.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-32 bg-surface">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-12 text-center">
            {tValues('heading')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { key: 'integrity' },
              { key: 'excellence' },
              { key: 'partnership' },
              { key: 'innovation' },
            ].map((value) => (
              <div key={value.key} className="text-center">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {tValues(`${value.key}.title`)}
                </h3>
                <p className="text-foreground-secondary">{tValues(`${value.key}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
