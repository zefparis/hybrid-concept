import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Hero } from '@/components/sections';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'Terms of use and conditions for using Hybrid Concept services and website.',
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('termsPage');

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

            {/* Acceptance of Terms */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('acceptance.title')}
              </h2>
              <p className="text-foreground-secondary mb-4">
                {t('acceptance.content')}
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground-secondary ml-4">
                <li>{t('acceptance.items.binding')}</li>
                <li>{t('acceptance.items.compliance')}</li>
                <li>{t('acceptance.items.capacity')}</li>
                <li>{t('acceptance.items.updates')}</li>
              </ul>
            </div>

            {/* Use of Services */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('services.title')}
              </h2>
              <p className="text-foreground-secondary mb-4">
                {t('services.content')}
              </p>
              
              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
                {t('services.permitted.title')}
              </h3>
              <ul className="list-disc list-inside space-y-2 text-foreground-secondary ml-4">
                <li>{t('services.permitted.items.information')}</li>
                <li>{t('services.permitted.items.contact')}</li>
                <li>{t('services.permitted.items.learn')}</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">
                {t('services.prohibited.title')}
              </h3>
              <ul className="list-disc list-inside space-y-2 text-foreground-secondary ml-4">
                <li>{t('services.prohibited.items.illegal')}</li>
                <li>{t('services.prohibited.items.unauthorized')}</li>
                <li>{t('services.prohibited.items.interference')}</li>
                <li>{t('services.prohibited.items.malicious')}</li>
                <li>{t('services.prohibited.items.impersonate')}</li>
                <li>{t('services.prohibited.items.scraping')}</li>
                <li>{t('services.prohibited.items.reverse')}</li>
              </ul>
            </div>

            {/* Intellectual Property */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('intellectual.title')}
              </h2>
              <p className="text-foreground-secondary mb-4">
                {t('intellectual.content')}
              </p>
              <div className="p-4 rounded-lg bg-surface border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t('intellectual.ownership.title')}
                </h3>
                <p className="text-foreground-secondary">
                  {t('intellectual.ownership.content')}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-surface border border-border mt-4">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t('intellectual.restrictions.title')}
                </h3>
                <ul className="list-disc list-inside space-y-2 text-foreground-secondary ml-4">
                  <li>{t('intellectual.restrictions.items.modify')}</li>
                  <li>{t('intellectual.restrictions.items.reproduce')}</li>
                  <li>{t('intellectual.restrictions.items.distribute')}</li>
                  <li>{t('intellectual.restrictions.items.commercial')}</li>
                </ul>
              </div>
            </div>

            {/* User Content */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('userContent.title')}
              </h2>
              <p className="text-foreground-secondary mb-4">
                {t('userContent.content')}
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground-secondary ml-4">
                <li>{t('userContent.items.responsibility')}</li>
                <li>{t('userContent.items.license')}</li>
                <li>{t('userContent.items.prohibited')}</li>
              </ul>
            </div>

            {/* Disclaimer of Warranties */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('disclaimer.title')}
              </h2>
              <div className="p-6 rounded-lg bg-surface border border-border border-l-4 border-l-accent">
                <p className="text-foreground-secondary mb-4">
                  {t('disclaimer.content')}
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground-secondary ml-4">
                  <li>{t('disclaimer.items.asis')}</li>
                  <li>{t('disclaimer.items.accuracy')}</li>
                  <li>{t('disclaimer.items.availability')}</li>
                  <li>{t('disclaimer.items.errors')}</li>
                </ul>
              </div>
            </div>

            {/* Limitation of Liability */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('liability.title')}
              </h2>
              <div className="p-6 rounded-lg bg-surface border border-border border-l-4 border-l-accent">
                <p className="text-foreground-secondary mb-4">
                  {t('liability.content')}
                </p>
                <ul className="list-disc list-inside space-y-2 text-foreground-secondary ml-4">
                  <li>{t('liability.items.indirect')}</li>
                  <li>{t('liability.items.loss')}</li>
                  <li>{t('liability.items.business')}</li>
                  <li>{t('liability.items.data')}</li>
                </ul>
              </div>
            </div>

            {/* Indemnification */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('indemnification.title')}
              </h2>
              <p className="text-foreground-secondary">
                {t('indemnification.content')}
              </p>
            </div>

            {/* Third-Party Links */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('thirdParty.title')}
              </h2>
              <p className="text-foreground-secondary">
                {t('thirdParty.content')}
              </p>
            </div>

            {/* Governing Law */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('governing.title')}
              </h2>
              <p className="text-foreground-secondary mb-4">
                {t('governing.content')}
              </p>
              <div className="p-4 rounded-lg bg-surface border border-border">
                <ul className="list-disc list-inside space-y-2 text-foreground-secondary ml-4">
                  <li><strong>{t('governing.items.law')}:</strong> {t('governing.items.lawDesc')}</li>
                  <li><strong>{t('governing.items.jurisdiction')}:</strong> {t('governing.items.jurisdictionDesc')}</li>
                  <li><strong>{t('governing.items.disputes')}:</strong> {t('governing.items.disputesDesc')}</li>
                </ul>
              </div>
            </div>

            {/* Modifications */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('modifications.title')}
              </h2>
              <p className="text-foreground-secondary">
                {t('modifications.content')}
              </p>
            </div>

            {/* Severability */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('severability.title')}
              </h2>
              <p className="text-foreground-secondary">
                {t('severability.content')}
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
                <p><strong>{t('contact.company')}:</strong> Hybrid Concept</p>
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
