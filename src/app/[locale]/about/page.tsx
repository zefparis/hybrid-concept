import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections';

export const metadata: Metadata = {
  title: 'About HC-1',
  description:
    'Learn about HC-1, the Strategic Command & Integration Authority delivering sovereign security and operational continuity worldwide.',
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero
        title="About HC-1"
        tagline="Strategic Command & Integration Authority"
        description="We are the trusted partner for governments and enterprises navigating complex security landscapes. Our mission is to architect resilient systems that protect nations and enable progress."
        variant="page"
      />

      {/* Mission Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-foreground-secondary leading-relaxed mb-6">
                HC-1 exists to protect the systems that societies depend on. We combine deep domain expertise with advanced technology to deliver security solutions that are both comprehensive and pragmatic.
              </p>
              <p className="text-lg text-foreground-secondary leading-relaxed">
                Our approach is rooted in understanding—understanding the threats our clients face, the constraints they operate under, and the outcomes they need to achieve.
              </p>
            </div>
            <div className="space-y-8">
              <div className="p-6 rounded-2xl bg-surface border border-border">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Sovereign by Design
                </h3>
                <p className="text-foreground-secondary">
                  We build solutions that respect national sovereignty and data residency requirements, ensuring our clients maintain full control.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-surface border border-border">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Integration Excellence
                </h3>
                <p className="text-foreground-secondary">
                  We connect disparate systems into unified operational fabrics, eliminating silos and enabling coordinated response.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-surface border border-border">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Operational Continuity
                </h3>
                <p className="text-foreground-secondary">
                  We ensure our clients can operate effectively under any conditions, from routine operations to crisis response.
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
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Integrity',
                description: 'We operate with the highest ethical standards, earning trust through transparency and accountability.',
              },
              {
                title: 'Excellence',
                description: 'We pursue excellence in everything we do, from strategic planning to technical execution.',
              },
              {
                title: 'Partnership',
                description: 'We work alongside our clients as true partners, sharing their mission and commitment.',
              },
              {
                title: 'Innovation',
                description: 'We continuously advance our capabilities to stay ahead of evolving threats and challenges.',
              },
            ].map((value) => (
              <div key={value.title} className="text-center">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-foreground-secondary">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
