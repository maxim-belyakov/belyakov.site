'use client'
// Client component: PostHog needs `window`, and pageviews are captured from
// usePathname, which only exists on the client.

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import posthog from 'posthog-js'

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST

export default function PostHogProvider() {
  const pathname = usePathname()

  useEffect(() => {
    if (!KEY || !HOST) return

    if (!posthog.__loaded) {
      posthog.init(KEY, {
        api_host: HOST,
        // The App Router fires no route events, so pageviews are sent from the
        // effect below instead of by the library's own history listener.
        capture_pageview: false,
      })
    }

    posthog.capture('$pageview', { $current_url: window.location.href })
  }, [pathname])

  return null
}
