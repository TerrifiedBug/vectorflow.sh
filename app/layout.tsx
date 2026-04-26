import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { Provider } from '@/components/provider';
import './global.css';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://vectorflow.sh'),
  title: {
    default: 'VectorFlow — Visual control plane for Vector data pipelines',
    template: '%s · VectorFlow',
  },
  description:
    'Self-hosted control plane for Vector data pipelines. Visual editor, fleet management, alerts. AGPL-3.0.',
  openGraph: {
    title: 'VectorFlow',
    description:
      'Visual control plane for Vector data pipelines. Self-hosted, AGPL-3.0.',
    url: 'https://vectorflow.sh',
    siteName: 'VectorFlow',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VectorFlow',
    description:
      'Visual control plane for Vector data pipelines. Self-hosted, AGPL-3.0.',
    images: ['/og.png'],
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Provider>{children}</Provider>
        <Script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "c5173c8f3f9947578d14239404e22030"}'
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
