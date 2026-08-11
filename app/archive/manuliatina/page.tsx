import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import SiteFooter from '@/components/site-footer'
import lake from '@/public/archive/manuliatina.jpg'

// Archived. Not linked from anywhere on the site and excluded from the
// sitemap and from robots.txt, so it stays reachable by direct URL without
// competing for attention with the current work.
export const metadata: Metadata = {
  title: 'Manuliatina, 2019',
  description: 'Archived personal project: a visual novel engine built in React in 2019.',
  robots: { index: false, follow: false },
}

export default function ManuliatinaArchivePage() {
  return (
    <>
      <main id="main" className="mx-auto w-full max-w-2xl px-5 pt-16 pb-24 sm:px-8 sm:pt-24">
        <Link href="/" className="font-mono text-sm text-ink-faint hover:text-ink">
          &lt;- Maksim Beliakov
        </Link>

        <p className="mt-8 font-mono text-xs tracking-[0.18em] text-ink-faint uppercase">
          Archive, 2019
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Manuliatina</h1>

        <div className="mt-8 overflow-hidden rounded-lg border border-rule">
          <Image
            src={lake}
            alt="Screenshot of the Manuliatina visual novel: a lake location rendered in the game engine"
            placeholder="blur"
            sizes="(min-width: 768px) 672px, 100vw"
            className="h-auto w-full"
          />
        </div>

        <div className="mt-8 space-y-5 text-[1.0625rem] leading-relaxed">
          <p>
            A personal project from 2019: a visual novel engine written in React, with
            location-based movement, save and load, an inventory and branching dialogue. Location
            data, background music and navigation paths were loaded from MongoDB at runtime, so
            adding a scene meant adding a document rather than shipping code.
          </p>
          <p>
            It is kept here because it was a real piece of work, and off the main page because it
            says nothing useful about what I do now.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
