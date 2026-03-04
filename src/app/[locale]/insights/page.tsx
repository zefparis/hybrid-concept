import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import Link from 'next/link';

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
      title: tInsights('cognitiveAuth.title'),
      excerpt: tInsights('cognitiveAuth.excerpt'),
      category: tInsights('cognitiveAuth.category'),
      href: `/${locale}/sectors/cyber-resilience`,
      date: '2025-02-28',
      readingTime: 12,
    },
    {
      id: '2',
      title: tInsights('pqcReadiness.title'),
      excerpt: tInsights('pqcReadiness.excerpt'),
      category: tInsights('pqcReadiness.category'),
      href: `/${locale}/sectors/cyber-resilience`,
      date: '2025-02-15',
      readingTime: 15,
    },
    {
      id: '3',
      title: tInsights('criticalInfra.title'),
      excerpt: tInsights('criticalInfra.excerpt'),
      category: tInsights('criticalInfra.category'),
      href: `/${locale}/sectors/critical-infrastructure`,
      date: '2025-01-30',
      readingTime: 10,
    },
    {
      id: '4',
      title: tInsights('antiMimicry.title'),
      excerpt: tInsights('antiMimicry.excerpt'),
      category: tInsights('antiMimicry.category'),
      href: `/${locale}/sectors/cyber-resilience`,
      date: '2025-01-15',
      readingTime: 18,
    },
    {
      id: '5',
      title: tInsights('sovereignAI.title'),
      excerpt: tInsights('sovereignAI.excerpt'),
      category: tInsights('sovereignAI.category'),
      href: `/${locale}/sectors/ai-fusion-intelligence`,
      date: '2024-12-20',
      readingTime: 14,
    },
    {
      id: '6',
      title: tInsights('supplyChain.title'),
      excerpt: tInsights('supplyChain.excerpt'),
      category: tInsights('supplyChain.category'),
      href: `/${locale}/sectors/ports-borders-logistics`,
      date: '2024-12-05',
      readingTime: 11,
    },
  ];

  const featured = sampleInsights[0];
  const rest = sampleInsights.slice(1);

  const categoryColors: Record<string, string> = {
    'Technology': 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    'Technologie': 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    'Strategic Analysis': 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    'Analyse Stratégique': 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    'Whitepaper': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'Livre Blanc': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'Governance': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    'Gouvernance': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  };

  return (
    <>
      {/* Video Hero Section */}
      <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video/edge.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-12 text-left pt-16">
          <p className="uppercase tracking-[0.15em] md:tracking-[0.2em] mb-4 md:mb-6 text-white drop-shadow-lg text-sm md:text-lg lg:text-xl">
            {tHero('tagline')}
          </p>
          <h1 className="font-bold mb-6 md:mb-8 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-3xl sm:text-4xl md:text-5xl lg:text-display-lg xl:text-display-xl">
            {tHero('title')}
          </h1>
          <p className="leading-relaxed text-white/95 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] text-base md:text-heading-md lg:text-heading-lg max-w-3xl">
            {tHero('description')}
          </p>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="container">
          {/* Featured Article */}
          <div className="mb-20">
            <Link href={featured.href} className="block relative p-8 md:p-12 lg:p-16 rounded-3xl bg-surface-card border border-white/8 hover:border-white/10 transition-all duration-500 overflow-hidden group">
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-sky-500/5 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-sky-500 via-violet-500 to-transparent opacity-60" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase text-sky-400 bg-sky-500/10 border border-sky-500/20 rounded-full">
                    {t('featured')}
                  </span>
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${categoryColors[featured.category] || 'bg-white/5 text-white/60 border-white/10'}`}>
                    {featured.category}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6 group-hover:text-sky-400 transition-colors leading-snug md:leading-tight">
                  {featured.title}
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-white/60 mb-6 md:mb-8 max-w-4xl leading-relaxed line-clamp-4 md:line-clamp-none">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-6 text-sm text-white/40">
                  <span>{featured.date}</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span>{featured.readingTime} {t('minRead')}</span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="text-sky-400/70 font-medium">{t('readMore')} →</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Latest Label */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-foreground-secondary">{t('latest')}</h3>
          </div>

          {/* Article Grid — 2 large + 3 medium */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {rest.slice(0, 2).map((insight) => (
              <Link
                key={insight.id}
                href={insight.href}
                className="group relative block p-8 rounded-2xl bg-surface-card border border-white/8 hover:border-white/10 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-br from-violet-500/3 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative z-10">
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full border mb-5 ${categoryColors[insight.category] || 'bg-white/5 text-white/60 border-white/10'}`}>
                    {insight.category}
                  </span>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white group-hover:text-sky-400 transition-colors mb-3 md:mb-4 leading-snug md:leading-tight">
                    {insight.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/50 mb-4 md:mb-6 line-clamp-3 md:line-clamp-4 leading-relaxed">
                    {insight.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-white/30">
                    <span>{insight.date}</span>
                    <span className="w-1 h-1 rounded-full bg-white/15" />
                    <span>{insight.readingTime} {t('minRead')}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rest.slice(2).map((insight) => (
              <Link
                key={insight.id}
                href={insight.href}
                className="group relative block p-6 rounded-2xl bg-surface-card border border-white/8 hover:border-white/10 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-br from-sky-500/3 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative z-10">
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full border mb-4 ${categoryColors[insight.category] || 'bg-white/5 text-white/60 border-white/10'}`}>
                    {insight.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-sky-400 transition-colors mb-2 md:mb-3 leading-snug md:leading-tight">
                    {insight.title}
                  </h3>
                  <p className="text-xs text-white/50 mb-3 md:mb-5 line-clamp-2 md:line-clamp-3 leading-relaxed">
                    {insight.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-white/30">
                    <span>{insight.date}</span>
                    <span className="w-1 h-1 rounded-full bg-white/15" />
                    <span>{insight.readingTime} {t('minRead')}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Coming Soon Notice */}
          <div className="mt-20 text-center py-12 rounded-2xl border border-white/5 bg-surface-card/50">
            <p className="text-white/40 text-sm">
              {t('comingSoon')}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
