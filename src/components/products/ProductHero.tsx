import Link from 'next/link';

export interface ProductStat {
  value: string;
  label: string;
}

export interface ProductHeroProps {
  title: string;
  subtitle: string;
  description: string;
  backgroundImage?: string;
  stats: ProductStat[];
  locale?: string;
}

/**
 * Server component hero for product pages.
 * Visual parity with SectorHero but prop-driven (no i18n, no client motion).
 */
export function ProductHero({
  title,
  subtitle,
  description,
  backgroundImage,
  stats,
  locale,
}: ProductHeroProps) {
  const homeHref = locale ? `/${locale}` : '/';
  const productsHref = locale ? `/${locale}/products` : '/products';

  return (
    <section className="relative min-h-[60vh] flex items-center overflow-hidden">
      {/* Background image + dark overlay */}
      {backgroundImage && (
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-background/80 via-background/70 to-background" />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pb-12">
        {/* Breadcrumb */}
        <nav className="text-body-sm text-foreground-secondary mb-8">
          <Link
            href={homeHref}
            className="hover:text-foreground transition-colors"
          >
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={productsHref}
            className="hover:text-foreground transition-colors"
          >
            Products
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{title}</span>
        </nav>

        {/* Title block */}
        <div>
          <p className="text-body uppercase tracking-[0.2em] text-accent mb-4">
            {subtitle}
          </p>
          <h1 className="text-display-md md:text-display-lg font-extrabold text-foreground mb-6">
            {title}
          </h1>
          <p className="text-body-lg md:text-heading-md text-foreground-secondary max-w-3xl leading-relaxed">
            {description}
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mt-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass p-4 sm:p-6 rounded-lg border border-border min-w-0"
            >
              <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground mb-1 sm:mb-2 leading-tight wrap-break-word">
                {stat.value}
              </p>
              <p className="text-xs sm:text-body-sm text-foreground-secondary leading-tight wrap-break-word">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
