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

// -----------------------------------------------------------------------------
// Fonts
// -----------------------------------------------------------------------------

// `display: swap` keeps text visible while fonts are loading.
// This helps avoid unnecessary layout shifts and improves perceived performance.
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

// -----------------------------------------------------------------------------
// Metadata
// -----------------------------------------------------------------------------

// `src/app/icon.png` is automatically detected by Next.js App Router
// and exposed as the website favicon.
//
// We explicitly keep the icon configuration here as a fallback/guarantee
// for metadata generation.
export const metadata: Metadata = {
  ...siteMetadata,

  icons: {
    icon: [
      {
        url: '/icon.png',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/icon.png',
        type: 'image/png',
      },
    ],
  },
};

// -----------------------------------------------------------------------------
// Viewport
// -----------------------------------------------------------------------------

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,

  themeColor: [
    {
      media: '(prefers-color-scheme: light)',
      color: '#f7f8fb',
    },
    {
      media: '(prefers-color-scheme: dark)',
      color: '#09090b',
    },
  ],

  colorScheme: 'dark light',
};

// -----------------------------------------------------------------------------
// Google Analytics
// -----------------------------------------------------------------------------

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// -----------------------------------------------------------------------------
// Root Layout
// -----------------------------------------------------------------------------

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrains.variable}`}
    >
      <head>
        {/* -----------------------------------------------------------------
            Google Search Console Verification
            ----------------------------------------------------------------- */}
        {process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? (
          <meta
            name="google-site-verification"
            content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
          />
        ) : null}

        {/* -----------------------------------------------------------------
            Structured Data / JSON-LD
            Helps search engines understand the portfolio, person,
            website and profile page.
            ----------------------------------------------------------------- */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildJsonLd()),
          }}
        />
      </head>

      <body>
        <ThemeProvider>
          {/* -----------------------------------------------------------------
              Accessibility
              ----------------------------------------------------------------- */}
          <a
            href="#main"
            className="sr-focusable z-999 rounded-lg bg-brand-600 px-4 py-2 text-white"
          >
            Skip to main content
          </a>

          {/* -----------------------------------------------------------------
              Global UI
              ----------------------------------------------------------------- */}
          <Preloader />
          <ScrollProgress />
          <CustomCursor />
          <Spotlight />

          <Navbar />

          {/* -----------------------------------------------------------------
              Main Content
              ----------------------------------------------------------------- */}
          <main id="main" className="relative">
            {children}
          </main>

          <Footer />
          <BackToTop />
        </ThemeProvider>

        {/* -----------------------------------------------------------------
            Vercel Analytics
            No-ops outside Vercel deployments.
            ----------------------------------------------------------------- */}
        <Analytics />
        <SpeedInsights />

        {/* -----------------------------------------------------------------
            Google Analytics
            Only loaded when a measurement ID exists.
            ----------------------------------------------------------------- */}
        {GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />

            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];

                function gtag() {
                  dataLayer.push(arguments);
                }

                gtag('js', new Date());

                gtag('config', '${GA_ID}', {
                  anonymize_ip: true
                });
              `}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}