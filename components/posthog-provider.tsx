'use client'
// Client component: PostHog needs `window`, and pageviews are captured from
// usePathname, which only exists on the client.

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST

export default function PostHogProvider() {
  const pathname = usePathname()

  useEffect(() => {
    if (!KEY || !HOST) return
    let cancelled = false

    // Imported inside the effect rather than at module scope. A static import
    // puts the whole library, around 75 KB, into the first-load bundle of every
    // route and parses it before the page can become interactive, which cost
    // 240 ms of blocking time and 15 Lighthouse points on the home page.
    // Analytics does not need to be there that early.
    void import('posthog-js').then(({ default: posthog }) => {
      if (cancelled) return
      if (!posthog.__loaded) {
        posthog.init(KEY, {
          api_host: HOST,
          // The App Router fires no route events, so pageviews are sent from
          // the capture below instead of by the library's own history listener.
          capture_pageview: false,
        })
      }
      posthog.capture('$pageview', { $current_url: window.location.href })
    })

    // The import resolves after a route change may already have happened.
    // Without this the pageview for the page just left gets sent late.
    return () => {
      cancelled = true
    }
  }, [pathname])

  return null
}
