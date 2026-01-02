import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections';

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Strategic analysis, technology perspectives, and thought leadership from HC-1 experts.',
};

const SAMPLE_INSIGHTS = [
  {
    id: '1',
    title: 'The Evolution of Critical Infrastructure Protection',
    excerpt:
      'How converging threats are reshaping security strategies for essential services.',
    category: 'Strategic Analysis',
    date: '2024-12-15',
    readingTime: 8,
  },
  {
    id: '2',
    title: 'AI in National Security: Opportunities and Governance',
    excerpt:
      'Balancing innovation with responsible deployment in sensitive environments.',
    category: 'Technology',
    date: '2024-12-01',
    readingTime: 12,
  },
  {
    id: '3',
    title: 'Building Cyber Resilience in the Energy Sector',
    excerpt:
      'Lessons learned from securing operational technology in complex environments.',
    category: 'Case Study',
    date: '2024-11-20',
    readingTime: 10,
  },
];

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function InsightsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero
        title="Insights"
        tagline="Thought Leadership"
        description="Strategic perspectives on security, technology, and operational resilience from our team of experts."
        variant="page"
      />

      <section className="py-20 md:py-32">
        <div className="container">
          {/* Featured Article */}
          <div className="mb-16">
            <div className="p-8 md:p-12 rounded-3xl bg-surface border border-border">
              <span className="inline-block px-3 py-1 text-xs font-medium text-accent bg-accent-muted rounded-full mb-4">
                Featured
              </span>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                {SAMPLE_INSIGHTS[0].title}
              </h2>
              <p className="text-lg text-foreground-secondary mb-6 max-w-2xl">
                {SAMPLE_INSIGHTS[0].excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-foreground-muted">
                <span>{SAMPLE_INSIGHTS[0].category}</span>
                <span>•</span>
                <span>{SAMPLE_INSIGHTS[0].readingTime} min read</span>
              </div>
            </div>
          </div>

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SAMPLE_INSIGHTS.map((insight) => (
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
                  <span>{insight.readingTime} min read</span>
                </div>
              </article>
            ))}
          </div>

          {/* Coming Soon Notice */}
          <div className="mt-16 text-center">
            <p className="text-foreground-muted">
              More insights coming soon. Connect with us to receive updates.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
