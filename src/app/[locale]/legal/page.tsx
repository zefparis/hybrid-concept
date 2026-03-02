import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Hero } from '@/components/sections';

export const metadata: Metadata = {
  title: 'Legal Notices',
  description:
    'Legal notices, terms of use, and privacy policy for Hybrid Concept.',
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function LegalPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('legal');

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
            
            {/* Company Information */}
            <div className="mb-12 p-6 rounded-2xl bg-surface border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('company.title')}
              </h2>
              <div className="space-y-2 text-foreground-secondary">
                <p><strong>{t('company.name')}:</strong> Hybrid Concept</p>
                <p><strong>{t('company.address')}:</strong> 114 West Street c/o Katherine and West 6th Floor, Suite 43 Sandton 2196, South Africa</p>
                <p><strong>{t('company.email')}:</strong> <a href="mailto:info@hybridconc.com" className="text-accent hover:text-accent-hover">info@hybridconc.com</a></p>
                <p><strong>{t('company.phone')}:</strong> <a href="tel:+27112455900" className="text-accent hover:text-accent-hover">+27-11 245 5900</a></p>
              </div>
            </div>

            {/* Terms of Use */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('terms.title')}
              </h2>
              <div className="space-y-4 text-foreground-secondary">
                <p>{t('terms.intro')}</p>
                
                <h3 className="text-xl font-semibold text-foreground mt-6">
                  {t('terms.acceptance.title')}
                </h3>
                <p>{t('terms.acceptance.content')}</p>

                <h3 className="text-xl font-semibold text-foreground mt-6">
                  {t('terms.services.title')}
                </h3>
                <p>{t('terms.services.content')}</p>

                <h3 className="text-xl font-semibold text-foreground mt-6">
                  {t('terms.intellectual.title')}
                </h3>
                <p>{t('terms.intellectual.content')}</p>

                <h3 className="text-xl font-semibold text-foreground mt-6">
                  {t('terms.liability.title')}
                </h3>
                <p>{t('terms.liability.content')}</p>
              </div>
            </div>

            {/* Privacy Policy - POPIA Compliance */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('privacy.title')}
              </h2>
              <div className="space-y-4 text-foreground-secondary">
                <p>{t('privacy.intro')}</p>

                <h3 className="text-xl font-semibold text-foreground mt-6">
                  {t('privacy.collection.title')}
                </h3>
                <p>{t('privacy.collection.content')}</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>{t('privacy.collection.items.contact')}</li>
                  <li>{t('privacy.collection.items.technical')}</li>
                  <li>{t('privacy.collection.items.usage')}</li>
                  <li>{t('privacy.collection.items.communications')}</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mt-6">
                  {t('privacy.purpose.title')}
                </h3>
                <p>{t('privacy.purpose.content')}</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>{t('privacy.purpose.items.respond')}</li>
                  <li>{t('privacy.purpose.items.services')}</li>
                  <li>{t('privacy.purpose.items.improve')}</li>
                  <li>{t('privacy.purpose.items.comply')}</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mt-6">
                  {t('privacy.legal.title')}
                </h3>
                <p>{t('privacy.legal.content')}</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>{t('privacy.legal.items.consent')}</li>
                  <li>{t('privacy.legal.items.contract')}</li>
                  <li>{t('privacy.legal.items.legitimate')}</li>
                  <li>{t('privacy.legal.items.compliance')}</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mt-6">
                  {t('privacy.rights.title')}
                </h3>
                <p>{t('privacy.rights.content')}</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>{t('privacy.rights.items.access')}</li>
                  <li>{t('privacy.rights.items.correction')}</li>
                  <li>{t('privacy.rights.items.deletion')}</li>
                  <li>{t('privacy.rights.items.objection')}</li>
                  <li>{t('privacy.rights.items.portability')}</li>
                  <li>{t('privacy.rights.items.complaint')}</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mt-6">
                  {t('privacy.security.title')}
                </h3>
                <p>{t('privacy.security.content')}</p>

                <h3 className="text-xl font-semibold text-foreground mt-6">
                  {t('privacy.retention.title')}
                </h3>
                <p>{t('privacy.retention.content')}</p>

                <h3 className="text-xl font-semibold text-foreground mt-6">
                  {t('privacy.international.title')}
                </h3>
                <p>{t('privacy.international.content')}</p>

                <h3 className="text-xl font-semibold text-foreground mt-6">
                  {t('privacy.cookies.title')}
                </h3>
                <p>{t('privacy.cookies.content')}</p>
              </div>
            </div>

            {/* POPIA Compliance */}
            <div className="mb-12 p-6 rounded-2xl bg-surface border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('popia.title')}
              </h2>
              <div className="space-y-4 text-foreground-secondary">
                <p>{t('popia.intro')}</p>
                <p><strong>{t('popia.officer.title')}:</strong> {t('popia.officer.contact')}</p>
                <p><strong>{t('popia.regulator.title')}:</strong> {t('popia.regulator.name')}</p>
                <p><strong>{t('popia.regulator.website')}:</strong> <a href="https://inforegulator.org.za" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-hover">inforegulator.org.za</a></p>
              </div>
            </div>

            {/* Contact for Legal Matters */}
            <div className="p-6 rounded-2xl bg-surface border border-border">
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                {t('contact.title')}
              </h2>
              <p className="text-foreground-secondary mb-4">
                {t('contact.content')}
              </p>
              <div className="space-y-2 text-foreground-secondary">
                <p><strong>{t('contact.email')}:</strong> <a href="mailto:info@hybridconc.com" className="text-accent hover:text-accent-hover">info@hybridconc.com</a></p>
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
