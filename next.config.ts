import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // Performance optimizations
  poweredByHeader: false,
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.hybrid-concept.vercel.app',
      },
    ],
  },

  // Permanent redirects — capabilities/* → products/hcs-u7, divisions/* → home,
  // and the two division-masquerading-as-sector routes are nuked.
  async redirects() {
    const locales = ['en', 'fr', 'pt'];
    const out: { source: string; destination: string; permanent: boolean }[] = [];
    for (const l of locales) {
      out.push(
        { source: `/${l}/capabilities/hybrid-vector`, destination: `/${l}/products/hcs-u7`, permanent: true },
        { source: `/${l}/capabilities/:path*`, destination: `/${l}/products/hcs-u7`, permanent: true },
        { source: `/${l}/divisions/:path*`, destination: `/${l}`, permanent: true },
        { source: `/${l}/sectors/aec-gateway`, destination: `/${l}`, permanent: true },
        { source: `/${l}/sectors/agentos`, destination: `/${l}`, permanent: true },
        { source: `/${l}/sectors/ai-fusion-intelligence`, destination: `/${l}`, permanent: true },
      );
    }
    return out;
  },

  // Security headers (additional to vercel.json)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
