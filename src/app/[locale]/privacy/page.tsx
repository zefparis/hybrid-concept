import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy policy and data protection information for Hybrid Mobility Holdings in compliance with POPIA.',
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('privacyPage');

  return (
    <>
      <section className="py-20 md:py-32">
        <div className="container max-w-4xl">
          <div className="prose prose-invert max-w-none">
            
            {/* Introduction */}
            <div className="mb-12">
              <p className="text-lg text-foreground-secondary leading-relaxed">
                {t('intro')}
              </p>
            </div>

            {/* Information We Collect */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('collection.title')}
              </h2>
              <p className="text-foreground-secondary mb-4">
                {t('collection.content')}
              </p>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-surface border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {t('collection.personal.title')}
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-foreground-secondary ml-4">
                    <li>{t('collection.personal.items.name')}</li>
                    <li>{t('collection.personal.items.contact')}</li>
                    <li>{t('collection.personal.items.company')}</li>
                    <li>{t('collection.personal.items.job')}</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-surface border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {t('collection.technical.title')}
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-foreground-secondary ml-4">
                    <li>{t('collection.technical.items.ip')}</li>
                    <li>{t('collection.technical.items.browser')}</li>
                    <li>{t('collection.technical.items.device')}</li>
                    <li>{t('collection.technical.items.location')}</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-surface border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {t('collection.usage.title')}
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-foreground-secondary ml-4">
                    <li>{t('collection.usage.items.pages')}</li>
                    <li>{t('collection.usage.items.time')}</li>
                    <li>{t('collection.usage.items.interactions')}</li>
                    <li>{t('collection.usage.items.referral')}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('usage.title')}
              </h2>
              <p className="text-foreground-secondary mb-4">
                {t('usage.content')}
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground-secondary ml-4">
                <li>{t('usage.items.respond')}</li>
                <li>{t('usage.items.services')}</li>
                <li>{t('usage.items.improve')}</li>
                <li>{t('usage.items.communicate')}</li>
                <li>{t('usage.items.security')}</li>
                <li>{t('usage.items.comply')}</li>
              </ul>
            </div>

            {/* Legal Basis (POPIA) */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('legal.title')}
              </h2>
              <p className="text-foreground-secondary mb-4">
                {t('legal.content')}
              </p>
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-surface border border-border">
                  <h3 className="font-semibold text-foreground">{t('legal.items.consent.title')}</h3>
                  <p className="text-sm text-foreground-secondary mt-1">{t('legal.items.consent.desc')}</p>
                </div>
                <div className="p-4 rounded-lg bg-surface border border-border">
                  <h3 className="font-semibold text-foreground">{t('legal.items.contract.title')}</h3>
                  <p className="text-sm text-foreground-secondary mt-1">{t('legal.items.contract.desc')}</p>
                </div>
                <div className="p-4 rounded-lg bg-surface border border-border">
                  <h3 className="font-semibold text-foreground">{t('legal.items.legitimate.title')}</h3>
                  <p className="text-sm text-foreground-secondary mt-1">{t('legal.items.legitimate.desc')}</p>
                </div>
                <div className="p-4 rounded-lg bg-surface border border-border">
                  <h3 className="font-semibold text-foreground">{t('legal.items.compliance.title')}</h3>
                  <p className="text-sm text-foreground-secondary mt-1">{t('legal.items.compliance.desc')}</p>
                </div>
              </div>
            </div>

            {/* Your Rights Under POPIA */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('rights.title')}
              </h2>
              <p className="text-foreground-secondary mb-4">
                {t('rights.content')}
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground-secondary ml-4">
                <li><strong>{t('rights.items.access.title')}:</strong> {t('rights.items.access.desc')}</li>
                <li><strong>{t('rights.items.correction.title')}:</strong> {t('rights.items.correction.desc')}</li>
                <li><strong>{t('rights.items.deletion.title')}:</strong> {t('rights.items.deletion.desc')}</li>
                <li><strong>{t('rights.items.objection.title')}:</strong> {t('rights.items.objection.desc')}</li>
                <li><strong>{t('rights.items.portability.title')}:</strong> {t('rights.items.portability.desc')}</li>
                <li><strong>{t('rights.items.complaint.title')}:</strong> {t('rights.items.complaint.desc')}</li>
              </ul>
            </div>

            {/* Data Security */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('security.title')}
              </h2>
              <p className="text-foreground-secondary mb-4">
                {t('security.content')}
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground-secondary ml-4">
                <li>{t('security.items.encryption')}</li>
                <li>{t('security.items.access')}</li>
                <li>{t('security.items.monitoring')}</li>
                <li>{t('security.items.training')}</li>
              </ul>
            </div>

            {/* Data Retention */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('retention.title')}
              </h2>
              <p className="text-foreground-secondary">
                {t('retention.content')}
              </p>
            </div>

            {/* International Transfers */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('international.title')}
              </h2>
              <p className="text-foreground-secondary">
                {t('international.content')}
              </p>
            </div>

            {/* Cookies */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('cookies.title')}
              </h2>
              <p className="text-foreground-secondary mb-4">
                {t('cookies.content')}
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground-secondary ml-4">
                <li><strong>{t('cookies.types.essential')}:</strong> {t('cookies.types.essentialDesc')}</li>
                <li><strong>{t('cookies.types.analytics')}:</strong> {t('cookies.types.analyticsDesc')}</li>
                <li><strong>{t('cookies.types.functional')}:</strong> {t('cookies.types.functionalDesc')}</li>
              </ul>
            </div>

            {/* Third-Party Services */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('thirdParty.title')}
              </h2>
              <p className="text-foreground-secondary">
                {t('thirdParty.content')}
              </p>
            </div>

            {/* Children's Privacy */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('children.title')}
              </h2>
              <p className="text-foreground-secondary">
                {t('children.content')}
              </p>
            </div>

            {/* Changes to Policy */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('changes.title')}
              </h2>
              <p className="text-foreground-secondary">
                {t('changes.content')}
              </p>
            </div>

            {/* Contact Information */}
            <div className="p-6 rounded-2xl bg-surface border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('contact.title')}
              </h2>
              <p className="text-foreground-secondary mb-4">
                {t('contact.content')}
              </p>
              <div className="space-y-2 text-foreground-secondary">
                <p><strong>{t('contact.company')}:</strong> Hybrid Mobility Holdings</p>
                <p><strong>{t('contact.address')}:</strong> 114 West Street c/o Katherine and West 6th Floor, Suite 43 Sandton 2196, South Africa</p>
                <p><strong>{t('contact.email')}:</strong> <a href="mailto:info@hybridconc.com" className="text-accent hover:text-accent-hover">info@hybridconc.com</a></p>
                <p><strong>{t('contact.phone')}:</strong> <a href="tel:+27112455900" className="text-accent hover:text-accent-hover">+27-11 245 5900</a></p>
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
