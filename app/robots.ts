import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    // /i/ holds the private invitation. It is unlisted rather than secret, so
    // the page also sends its own noindex header; this keeps well behaved
    // crawlers from following a shared link into the index.
    rules: [{ userAgent: '*', allow: '/', disallow: '/i/' }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
