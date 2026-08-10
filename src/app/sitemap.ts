import type { MetadataRoute } from 'next';
import { NAV_LINKS, SITE } from '@/constants/site';

/**
 * Single-page site: the root URL plus every in-page section as a fragment.
 * Fragments are not separately indexable, but listing them helps crawlers
 * understand the page structure.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE.url,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...NAV_LINKS.filter((link) => link.id !== 'home').map((link) => ({
      url: `${SITE.url}/${link.href}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
