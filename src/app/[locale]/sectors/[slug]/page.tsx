import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections';
import { Button } from '@/components/ui';
import { SECTORS, CAPABILITIES } from '@/lib/constants';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return SECTORS.map((sector) => ({
    slug: sector.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const sector = SECTORS.find((s) => s.slug === slug);

  if (!sector) {
    return {
      title: 'Sector Not Found',
    };
  }

  return {
    title: sector.metadata.title,
    description: sector.metadata.description,
    keywords: sector.metadata.keywords,
  };
}

export default async function SectorPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  
  const sector = SECTORS.find((s) => s.slug === slug);

  if (!sector) {
    notFound();
  }

  const relatedCapabilities = CAPABILITIES.filter((cap) =>
    sector.capabilities.includes(cap.slug)
  );

  return (
    <>
      <Hero
        title={sector.title}
        tagline="Sector Focus"
        description={sector.longDescription}
        variant="page"
      />

      {/* Challenges Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">
                Key Challenges
              </h2>
              <p className="text-lg text-foreground-secondary mb-8">
                Organizations in this sector face unique security and operational challenges that require specialized expertise.
              </p>
              <ul className="space-y-4">
                {sector.challenges.map((challenge) => (
                  <li key={challenge} className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 text-accent shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-foreground-secondary">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">
                Outcomes We Deliver
              </h2>
              <p className="text-lg text-foreground-secondary mb-8">
                Our solutions are designed to achieve measurable outcomes that matter to your organization.
              </p>
              <ul className="space-y-4">
                {sector.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 text-green-500 shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-foreground-secondary">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Related Capabilities */}
      <section className="py-20 md:py-32 bg-surface">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-12">
            Relevant Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedCapabilities.map((capability) => (
              <a
                key={capability.id}
                href={`/${locale}/capabilities/${capability.slug}`}
                className="block p-6 rounded-2xl bg-surface-elevated border border-border hover:border-accent transition-colors"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {capability.name}
                </h3>
                <p className="text-sm text-foreground-muted mb-3">
                  {capability.tagline}
                </p>
                <p className="text-sm text-foreground-secondary">
                  {capability.description.slice(0, 120)}...
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Ready to Discuss Your Requirements?
          </h2>
          <p className="text-lg text-foreground-secondary mb-8 max-w-2xl mx-auto">
            Our sector specialists are ready to understand your challenges and design solutions that deliver results.
          </p>
          <Button href={`/${locale}/contact`} size="lg">
            Contact Our Team
          </Button>
        </div>
      </section>
    </>
  );
}
