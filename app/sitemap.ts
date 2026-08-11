import type { MetadataRoute } from 'next'
import { noteSlugs } from '@/lib/notes'
import { SITE_URL } from '@/lib/site'

// File-convention sitemap instead of a hand-maintained public/sitemap.xml.
// Adding a note to the registry adds it here with no second edit.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/notes`, changeFrequency: 'monthly', priority: 0.8 },
    ...noteSlugs().map((slug) => ({
      url: `${SITE_URL}/notes/${slug}`,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
  ]
}
