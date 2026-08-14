import type { Metadata } from 'next';
import { SEO_KEYWORDS, SITE, SOCIALS } from '@/constants/site';

const TITLE = `${SITE.name} — ${SITE.headline}`;

/**
 * Root metadata. `metadataBase` makes every relative OG/Twitter/canonical URL
 * resolve to an absolute one, which crawlers require.
 */
export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: TITLE,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  keywords: SEO_KEYWORDS,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  applicationName: `${SITE.name} Portfolio`,
  category: 'technology',

  alternates: {
    canonical: '/',
  },

  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: SITE.url,
    siteName: `${SITE.name} — Portfolio`,
    title: TITLE,
    description: SITE.description,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${SITE.name} — ${SITE.headline}`,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: SITE.description,
    images: ['/opengraph-image'],
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

  icons: {
  icon: [
    {
      url: '/favicon-48x48.png',
      type: 'image/png',
      sizes: '48x48',
    },
    {
      url: '/icon.svg',
      type: 'image/svg+xml',
    },
  ],
  apple: [
    {
      url: '/favicon-48x48.png',
    },
  ],
},

  manifest: '/manifest.webmanifest',

  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
};

/**
 * schema.org JSON-LD graph: a Person, the WebSite that describes them, and the
 * ProfilePage itself. Gives search engines an entity to attach the site to.
 */
export function buildJsonLd() {
  const personId = `${SITE.url}/#person`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: SITE.name,
        givenName: SITE.firstName,
        familyName: SITE.lastName,
        jobTitle: SITE.headline,
        description: SITE.description,
        email: `mailto:${SITE.email}`,
        telephone: SITE.phone,
        url: SITE.url,
        image: `${SITE.url}${SITE.profileImage}`,
        sameAs: [SOCIALS.linkedin, SOCIALS.github],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'jalore',
          addressRegion: 'rajasthan',
          addressCountry: 'IN',
        },
        worksFor: {
          '@type': 'Organization',
          name: 'VasyERP Solutions Pvt. Ltd.',
        },
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'MOHANLAL SUKHADIYA UNIVERSITY UDAIPUR',
        },
        knowsAbout: [
          
          'MySQL',
          
        ],
        knowsLanguage: ['English', 'Hindi',],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE.url}/#website`,
        url: SITE.url,
        name: `${SITE.name} — Portfolio`,
        description: SITE.description,
        inLanguage: 'en',
        publisher: { '@id': personId },
      },
     {
  '@type': 'ProfilePage',
  '@id': `${SITE.url}/#profilepage`,
  url: SITE.url,
  name: TITLE,
  isPartOf: { '@id': `${SITE.url}/#website` },
  mainEntity: { '@id': personId },
  about: { '@id': personId },
  inLanguage: 'en',
},
    ],
  };
}
