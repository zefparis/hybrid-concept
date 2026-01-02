import type { Metadata } from 'next';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections';
import { CAPABILITIES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Capabilities',
  description:
    'Explore HC-1 capabilities: Hybrid Vector, Hybrid Nexus, Hybrid Axis, Hybrid Cyber, Hybrid Iris, and Centers of Excellence.',
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CapabilitiesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero
        title="Our Capabilities"
        tagline="Technology & Expertise"
        description="HC-1 delivers a comprehensive suite of capabilities designed to address the full spectrum of security, integration, and operational challenges."
        variant="page"
      />

      <section className="py-20 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CAPABILITIES.map((capability) => (
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
