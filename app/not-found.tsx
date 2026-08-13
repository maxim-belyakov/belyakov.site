import type { Metadata } from 'next'
import Link from 'next/link'
import SiteFooter from '@/components/site-footer'

// Root not-found boundary. Served with a real 404 status, which is why no
// loading.tsx is allowed to sit above a segment that can call notFound().
// The title flows through the root layout's template, giving
// "404 Not Found - Maksim Beliakov" instead of the site-wide default that every
// unmatched URL would otherwise show. robots is restated because the root
// layout sets index: true; without this the page would carry Next's automatic
// noindex and the layout's "index, follow" at the same time, which is a
// contradiction to leave in front of a crawler.
export const metadata: Metadata = {
  title: '404 Not Found',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <>
      <main
        id="main"
        className="mx-auto flex w-full max-w-2xl flex-col px-5 pt-24 pb-24 sm:px-8 sm:pt-32"
      >
        <p className="font-mono text-sm text-ink-faint">404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          This page does not exist
        </h1>
        <p className="mt-4 text-ink-soft">
          The old site had a few more URLs than this one does. The two places worth going are below.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-md bg-ink px-4 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-85"
          >
            Home
          </Link>
          <Link
            href="/notes"
            className="rounded-md border border-rule px-4 py-2.5 text-sm transition-colors hover:border-ink"
          >
            Technical notes
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
