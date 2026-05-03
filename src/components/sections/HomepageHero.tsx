import { CognitiveFragmentsHero } from './CognitiveFragmentsHero';

type Props = {
  locale: string;
};

/**
 * HomepageHero — thin wrapper around the client-side CognitiveFragmentsHero.
 * Keeps the page.tsx import stable (`<HomepageHero locale={locale} />`).
 */
export function HomepageHero(_props: Props) {
  return <CognitiveFragmentsHero />;
}
