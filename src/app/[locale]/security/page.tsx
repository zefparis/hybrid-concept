import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Hero } from '@/components/sections';

export const metadata: Metadata = {
  title: 'Security',
  description:
    'Security practices, policies, and responsible disclosure information for Hybrid Concept.',
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function SecurityPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('securityPage');

  return (
    <>
      <Hero
        title={t('hero.title')}
        tagline={t('hero.tagline')}
        description={t('hero.description')}
        variant="page"
      />

      <section className="py-20 md:py-32">
        <div className="container max-w-4xl">
          <div className="prose prose-invert max-w-none">
            
            {/* Introduction */}
            <div className="mb-12">
              <p className="text-lg text-foreground-secondary leading-relaxed">
                {t('intro')}
              </p>
            </div>

            {/* Our Security Commitment */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('commitment.title')}
              </h2>
              <p className="text-foreground-secondary mb-4">
                {t('commitment.content')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-surface border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {t('commitment.items.proactive.title')}
                  </h3>
                  <p className="text-sm text-foreground-secondary">
                    {t('commitment.items.proactive.desc')}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-surface border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {t('commitment.items.compliance.title')}
                  </h3>
                  <p className="text-sm text-foreground-secondary">
                    {t('commitment.items.compliance.desc')}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-surface border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {t('commitment.items.transparency.title')}
                  </h3>
                  <p className="text-sm text-foreground-secondary">
                    {t('commitment.items.transparency.desc')}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-surface border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {t('commitment.items.continuous.title')}
                  </h3>
                  <p className="text-sm text-foreground-secondary">
                    {t('commitment.items.continuous.desc')}
                  </p>
                </div>
              </div>
            </div>

            {/* Data Protection Measures */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('protection.title')}
              </h2>
              <p className="text-foreground-secondary mb-4">
                {t('protection.content')}
              </p>
              
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-surface border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {t('protection.encryption.title')}
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-foreground-secondary ml-4">
                    <li>{t('protection.encryption.items.transit')}</li>
                    <li>{t('protection.encryption.items.rest')}</li>
                    <li>{t('protection.encryption.items.protocols')}</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-surface border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {t('protection.access.title')}
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-foreground-secondary ml-4">
                    <li>{t('protection.access.items.principle')}</li>
                    <li>{t('protection.access.items.authentication')}</li>
                    <li>{t('protection.access.items.authorization')}</li>
                    <li>{t('protection.access.items.monitoring')}</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-surface border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {t('protection.infrastructure.title')}
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-foreground-secondary ml-4">
                    <li>{t('protection.infrastructure.items.firewalls')}</li>
                    <li>{t('protection.infrastructure.items.detection')}</li>
                    <li>{t('protection.infrastructure.items.segmentation')}</li>
                    <li>{t('protection.infrastructure.items.redundancy')}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Security Practices */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('practices.title')}
              </h2>
              <p className="text-foreground-secondary mb-4">
                {t('practices.content')}
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground-secondary ml-4">
                <li>{t('practices.items.development')}</li>
                <li>{t('practices.items.testing')}</li>
                <li>{t('practices.items.reviews')}</li>
                <li>{t('practices.items.updates')}</li>
                <li>{t('practices.items.training')}</li>
                <li>{t('practices.items.audits')}</li>
              </ul>
            </div>

            {/* Incident Response */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('incident.title')}
              </h2>
              <p className="text-foreground-secondary mb-4">
                {t('incident.content')}
              </p>
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-surface border border-border border-l-4 border-l-accent">
                  <h3 className="font-semibold text-foreground">{t('incident.steps.detection')}</h3>
                  <p className="text-sm text-foreground-secondary mt-1">{t('incident.steps.detectionDesc')}</p>
                </div>
                <div className="p-4 rounded-lg bg-surface border border-border border-l-4 border-l-accent">
                  <h3 className="font-semibold text-foreground">{t('incident.steps.containment')}</h3>
                  <p className="text-sm text-foreground-secondary mt-1">{t('incident.steps.containmentDesc')}</p>
                </div>
                <div className="p-4 rounded-lg bg-surface border border-border border-l-4 border-l-accent">
                  <h3 className="font-semibold text-foreground">{t('incident.steps.investigation')}</h3>
                  <p className="text-sm text-foreground-secondary mt-1">{t('incident.steps.investigationDesc')}</p>
                </div>
                <div className="p-4 rounded-lg bg-surface border border-border border-l-4 border-l-accent">
                  <h3 className="font-semibold text-foreground">{t('incident.steps.remediation')}</h3>
                  <p className="text-sm text-foreground-secondary mt-1">{t('incident.steps.remediationDesc')}</p>
                </div>
                <div className="p-4 rounded-lg bg-surface border border-border border-l-4 border-l-accent">
                  <h3 className="font-semibold text-foreground">{t('incident.steps.notification')}</h3>
                  <p className="text-sm text-foreground-secondary mt-1">{t('incident.steps.notificationDesc')}</p>
                </div>
              </div>
            </div>

            {/* Responsible Disclosure */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('disclosure.title')}
              </h2>
              <p className="text-foreground-secondary mb-4">
                {t('disclosure.content')}
              </p>
              
              <div className="p-6 rounded-lg bg-surface border border-border border-l-4 border-l-accent mb-4">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {t('disclosure.reporting.title')}
                </h3>
                <p className="text-foreground-secondary mb-3">
                  {t('disclosure.reporting.content')}
                </p>
                <div className="space-y-2">
                  <p className="text-foreground-secondary">
                    <strong>{t('disclosure.reporting.email')}:</strong>{' '}
                    <a href="mailto:security@hybridconc.com" className="text-accent hover:text-accent-hover">
                      security@hybridconc.com
                    </a>
                  </p>
                  <p className="text-sm text-foreground-muted">
                    {t('disclosure.reporting.note')}
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
                {t('disclosure.include.title')}
              </h3>
              <ul className="list-disc list-inside space-y-2 text-foreground-secondary ml-4">
                <li>{t('disclosure.include.items.description')}</li>
                <li>{t('disclosure.include.items.steps')}</li>
                <li>{t('disclosure.include.items.impact')}</li>
                <li>{t('disclosure.include.items.evidence')}</li>
                <li>{t('disclosure.include.items.contact')}</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
                {t('disclosure.commitment.title')}
              </h3>
              <ul className="list-disc list-inside space-y-2 text-foreground-secondary ml-4">
                <li>{t('disclosure.commitment.items.acknowledge')}</li>
                <li>{t('disclosure.commitment.items.investigate')}</li>
                <li>{t('disclosure.commitment.items.updates')}</li>
                <li>{t('disclosure.commitment.items.credit')}</li>
                <li>{t('disclosure.commitment.items.legal')}</li>
              </ul>
            </div>

            {/* Compliance & Certifications */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('compliance.title')}
              </h2>
              <p className="text-foreground-secondary mb-4">
                {t('compliance.content')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-surface border border-border">
                  <h3 className="font-semibold text-foreground">{t('compliance.items.popia')}</h3>
                  <p className="text-sm text-foreground-secondary mt-1">{t('compliance.items.popiaDesc')}</p>
                </div>
                <div className="p-4 rounded-lg bg-surface border border-border">
                  <h3 className="font-semibold text-foreground">{t('compliance.items.iso')}</h3>
                  <p className="text-sm text-foreground-secondary mt-1">{t('compliance.items.isoDesc')}</p>
                </div>
                <div className="p-4 rounded-lg bg-surface border border-border">
                  <h3 className="font-semibold text-foreground">{t('compliance.items.gdpr')}</h3>
                  <p className="text-sm text-foreground-secondary mt-1">{t('compliance.items.gdprDesc')}</p>
                </div>
                <div className="p-4 rounded-lg bg-surface border border-border">
                  <h3 className="font-semibold text-foreground">{t('compliance.items.standards')}</h3>
                  <p className="text-sm text-foreground-secondary mt-1">{t('compliance.items.standardsDesc')}</p>
                </div>
              </div>
            </div>

            {/* Contact Security Team */}
            <div className="p-6 rounded-2xl bg-surface border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('contact.title')}
              </h2>
              <p className="text-foreground-secondary mb-4">
                {t('contact.content')}
              </p>
              <div className="space-y-2 text-foreground-secondary">
                <p><strong>{t('contact.security')}:</strong> <a href="mailto:security@hybridconc.com" className="text-accent hover:text-accent-hover">security@hybridconc.com</a></p>
                <p><strong>{t('contact.general')}:</strong> <a href="mailto:info@hybridconc.com" className="text-accent hover:text-accent-hover">info@hybridconc.com</a></p>
                <p><strong>{t('contact.address')}:</strong> 114 West Street c/o Katherine and West 6th Floor, Suite 43 Sandton 2196, South Africa</p>
              </div>
            </div>

            {/* Last Updated */}
            <div className="mt-12 text-sm text-foreground-muted text-center">
              <p>{t('updated')}: {new Date().toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
