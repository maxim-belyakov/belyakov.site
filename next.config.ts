import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  reactStrictMode: true,
  // The old site lived at /portfolio/ and is indexed under that URL. Portfolio
  // is now a section of the home page, so the old route redirects permanently
  // instead of being left to 404. Only the slashless form is listed: with the
  // default trailingSlash: false, Next already normalises /portfolio/ to
  // /portfolio before the redirect rules run.
  async redirects() {
    return [{ source: '/portfolio', destination: '/#work', permanent: true }]
  },
  // The invitation at /i/ is unlisted. robots.txt disallows it and the page
  // sets its own noindex metadata; this header covers the case where a crawler
  // reaches the URL without reading either of those.
  async headers() {
    return [
      {
        source: '/i/:token*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' }],
      },
    ]
  },
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
