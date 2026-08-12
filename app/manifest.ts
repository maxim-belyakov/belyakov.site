import type { MetadataRoute } from 'next'
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE } from '@/lib/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_TITLE,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#fbfbf9',
    theme_color: '#14161a',
    icons: [
      { src: '/favicon.ico', sizes: '64x64 32x32 24x24 16x16', type: 'image/x-icon' },
      { src: '/logo192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/logo512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    ],
  }
}
