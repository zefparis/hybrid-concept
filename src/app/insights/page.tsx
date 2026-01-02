import type { Metadata } from 'next';
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

export default function InsightsPage() {
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
            <div className="p-8 md:p-12 rounded-3xl bg-[var(--surface)] border border-[var(--border)]">
              <span className="inline-block px-3 py-1 text-xs font-medium text-[var(--accent)] bg-[var(--accent-muted)] rounded-full mb-4">
                Featured
              </span>
              <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-primary)] mb-4">
                {SAMPLE_INSIGHTS[0].title}
              </h2>
              <p className="text-lg text-[var(--text-secondary)] mb-6 max-w-2xl">
                {SAMPLE_INSIGHTS[0].excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
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
                className="group p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-accent)] transition-colors cursor-pointer"
              >
                <span className="inline-block px-3 py-1 text-xs font-medium text-[var(--text-muted)] bg-[var(--surface-elevated)] rounded-full mb-4">
                  {insight.category}
                </span>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-3">
                  {insight.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  {insight.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                  <span>{insight.date}</span>
                  <span>{insight.readingTime} min read</span>
                </div>
              </article>
            ))}
          </div>

          {/* Coming Soon Notice */}
          <div className="mt-16 text-center">
            <p className="text-[var(--text-muted)]">
              More insights coming soon. Connect with us to receive updates.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
