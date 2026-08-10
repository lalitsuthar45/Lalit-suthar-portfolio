import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import '@/styles/globals.css';

import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { BackToTop } from '@/components/layout/BackToTop';
import { CustomCursor } from '@/components/layout/CustomCursor';
import { Preloader } from '@/components/layout/Preloader';
import { Spotlight } from '@/components/effects/Spotlight';
import { buildJsonLd, siteMetadata } from '@/lib/seo';

// `display: swap` keeps text visible during font load — good for LCP and CLS.
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
  weight: ['400', '500'],
});

export const metadata: Metadata = siteMetadata;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f8fb' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
  colorScheme: 'dark light',
};

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrains.variable}`}>
      <head>
        {/* Structured data for search engines. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
        />
      </head>
      <body>
        <ThemeProvider>
          {/* Keyboard users land here first. */}
          <a href="#main" className="sr-focusable z-999 rounded-lg bg-brand-600 px-4 py-2 text-white">
            Skip to main content
          </a>

          <Preloader />
          <ScrollProgress />
          <CustomCursor />
          <Spotlight />

          <Navbar />

          <main id="main" className="relative">
            {children}
          </main>

          <Footer />
          <BackToTop />
        </ThemeProvider>

        {/* Vercel analytics — no-ops outside Vercel deployments. */}
        <Analytics />
        <SpeedInsights />

        {/* Google Analytics — only injected when a measurement ID is configured. */}
        {GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { anonymize_ip: true });
              `}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
