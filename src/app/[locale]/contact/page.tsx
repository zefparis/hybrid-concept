import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Connect with HC-1 to discuss your security, integration, and operational continuity requirements.',
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero
        title="Contact Us"
        tagline="Get in Touch"
        description="Connect with our team to discuss how HC-1 can address your strategic security and integration requirements."
        variant="page"
      />

      <section className="py-20 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                Send Us a Message
              </h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-foreground-secondary mb-2"
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-foreground placeholder-foreground-muted focus:outline-none focus:border-accent transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground-secondary mb-2"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-foreground placeholder-foreground-muted focus:outline-none focus:border-accent transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="organization"
                    className="block text-sm font-medium text-foreground-secondary mb-2"
                  >
                    Organization
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-foreground placeholder-foreground-muted focus:outline-none focus:border-accent transition-colors"
                    placeholder="Your organization"
                  />
                </div>

                <div>
                  <label
                    htmlFor="inquiry"
                    className="block text-sm font-medium text-foreground-secondary mb-2"
                  >
                    Inquiry Type *
                  </label>
                  <select
                    id="inquiry"
                    name="inquiry"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-foreground focus:outline-none focus:border-accent transition-colors"
                  >
                    <option value="">Select an option</option>
                    <option value="general">General Inquiry</option>
                    <option value="partnership">Partnership</option>
                    <option value="media">Media</option>
                    <option value="careers">Careers</option>
                    <option value="security">Security Concern</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground-secondary mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-foreground placeholder-foreground-muted focus:outline-none focus:border-accent transition-colors resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    required
                    className="mt-1 w-4 h-4 rounded border-border bg-surface text-accent focus:ring-accent"
                  />
                  <label
                    htmlFor="consent"
                    className="text-sm text-foreground-muted"
                  >
                    I consent to HC-1 processing my data in accordance with the
                    Privacy Policy.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent-hover transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                Other Ways to Reach Us
              </h2>

              <div className="space-y-8">
                <div className="p-6 rounded-2xl bg-surface border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    General Inquiries
                  </h3>
                  <p className="text-foreground-secondary">
                    info@hc-1.com
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-surface border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Media Relations
                  </h3>
                  <p className="text-foreground-secondary">
                    media@hc-1.com
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-surface border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Security Concerns
                  </h3>
                  <p className="text-foreground-secondary">
                    security@hc-1.com
                  </p>
                  <p className="text-sm text-foreground-muted mt-2">
                    For responsible disclosure of security vulnerabilities.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-surface border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Headquarters
                  </h3>
                  <p className="text-foreground-secondary">
                    Location disclosed upon engagement
                  </p>
                  <p className="text-sm text-foreground-muted mt-2">
                    We maintain a global presence with regional offices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
