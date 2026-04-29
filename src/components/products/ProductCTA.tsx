import { Button } from '@/components/ui';

export interface ProductCTAProps {
  title?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  locale?: string;
}

/**
 * Server component CTA for product pages.
 * Visual parity with SectorCTA but prop-driven (no i18n, no client motion).
 * If `locale` is provided, default hrefs are prefixed with the locale.
 */
export function ProductCTA({
  title = 'Ready to secure your operations?',
  primaryLabel = 'Request a demo',
  primaryHref,
  secondaryLabel = 'Learn more',
  secondaryHref,
  locale,
}: ProductCTAProps) {
  const defaultContact = locale ? `/${locale}/contact` : '/contact';
  const finalPrimary = primaryHref ?? defaultContact;
  const finalSecondary = secondaryHref ?? defaultContact;

  return (
    <section className="py-20 md:py-32 px-6 md:px-12 bg-surface">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-display-sm md:text-display-md font-bold mb-6">
          {title}
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href={finalPrimary} size="lg">
            {primaryLabel}
          </Button>
          <Button href={finalSecondary} size="lg" variant="outline">
            {secondaryLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
