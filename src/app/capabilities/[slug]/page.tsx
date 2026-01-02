import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Hero } from '@/components/sections';
import { Button } from '@/components/ui';
import { CAPABILITIES, SECTORS } from '@/lib/constants';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CAPABILITIES.map((capability) => ({
    slug: capability.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const capability = CAPABILITIES.find((c) => c.slug === slug);

  if (!capability) {
    return {
      title: 'Capability Not Found',
    };
  }

  return {
    title: capability.metadata.title,
    description: capability.metadata.description,
  };
}

export default async function CapabilityPage({ params }: PageProps) {
  const { slug } = await params;
  const capability = CAPABILITIES.find((c) => c.slug === slug);

  if (!capability) {
    notFound();
  }

  const relatedCapabilities = CAPABILITIES.filter(
    (c) => capability.integrations.includes(c.slug) && c.slug !== capability.slug
  );

  return (
    <>
      <Hero
        title={capability.name}
        tagline={capability.tagline}
        description={capability.description}
        variant="page"
      />

      {/* Features Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-semibold text-[var(--text-primary)] mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {capability.features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--accent-muted)] flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-[var(--accent)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[var(--text-secondary)]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      {capability.useCases.length > 0 && (
        <section className="py-20 md:py-32 bg-[var(--surface)]">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-semibold text-[var(--text-primary)] mb-12">
              Use Cases
            </h2>
            <div className="space-y-6">
              {capability.useCases.map((useCase) => {
                const sector = SECTORS.find((s) => s.slug === useCase.sector);
                return (
                  <div
                    key={useCase.title}
                    className="p-8 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border)]"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                          {useCase.title}
                        </h3>
                        {sector && (
                          <p className="text-sm text-[var(--accent)] mt-1">
                            {sector.shortTitle}
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="text-[var(--text-secondary)] mb-4">
                      {useCase.description}
                    </p>
                    <div className="flex items-center gap-2 text-[var(--success)]">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm font-medium">{useCase.outcome}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Integrations Section */}
      {relatedCapabilities.length > 0 && (
        <section className="py-20 md:py-32">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-semibold text-[var(--text-primary)] mb-4">
              Integrates With
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-12 max-w-2xl">
              {capability.name} seamlessly integrates with other HC-1 capabilities to deliver comprehensive solutions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedCapabilities.map((related) => (
                <a
                  key={related.id}
                  href={`/capabilities/${related.slug}`}
                  className="block p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-accent)] transition-colors"
                >
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
                    {related.name}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)]">{related.tagline}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 md:py-32 bg-[var(--surface)]">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-[var(--text-primary)] mb-4">
            Learn More About {capability.name}
          </h2>
          <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
            Connect with our team to discuss how this capability can address your specific requirements.
          </p>
          <Button href="/contact" size="lg">
            Request Information
          </Button>
        </div>
      </section>
    </>
  );
}
