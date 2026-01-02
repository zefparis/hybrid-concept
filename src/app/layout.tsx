import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Header, Footer } from '@/components/layout';
import { SITE_METADATA } from '@/lib/constants';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_METADATA.siteUrl),
  title: {
    default: SITE_METADATA.defaultTitle,
    template: `%s | ${SITE_METADATA.siteName}`,
  },
  description: SITE_METADATA.defaultDescription,
  keywords: [
    'security',
    'systems integration',
    'critical infrastructure',
    'cyber resilience',
    'government security',
    'operational continuity',
  ],
  authors: [{ name: SITE_METADATA.siteName }],
  creator: SITE_METADATA.siteName,
  openGraph: {
    type: 'website',
    locale: SITE_METADATA.locale,
    url: SITE_METADATA.siteUrl,
    siteName: SITE_METADATA.siteName,
    title: SITE_METADATA.defaultTitle,
    description: SITE_METADATA.defaultDescription,
    images: [
      {
        url: SITE_METADATA.defaultOgImage,
        width: 1200,
        height: 630,
        alt: SITE_METADATA.siteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_METADATA.defaultTitle,
    description: SITE_METADATA.defaultDescription,
    images: [SITE_METADATA.defaultOgImage],
    creator: SITE_METADATA.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
