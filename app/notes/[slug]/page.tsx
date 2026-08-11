import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import SiteFooter from '@/components/site-footer'
import { formatNoteDate, loadNote, noteSlugs } from '@/lib/notes'
import { CONTACTS } from '@/lib/site'

// Every note is known at build time, so all of them are prerendered and any
// other slug is a 404 handled by the router before this file runs. There is no
// loading.tsx above this segment on purpose: see app/notes/(index)/loading.tsx.
export const dynamicParams = false

export function generateStaticParams(): { slug: string }[] {
  return noteSlugs().map((slug) => ({ slug }))
}

type PageProps = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const note = await loadNote(slug)
  if (!note) return {}

  const url = `/notes/${note.meta.slug}`

  return {
    title: note.meta.title,
    description: note.meta.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: note.meta.title,
      description: note.meta.description,
      publishedTime: note.meta.published,
      authors: ['Maksim Beliakov'],
    },
  }
}

export default async function NotePage({ params }: PageProps) {
  const { slug } = await params
  const note = await loadNote(slug)

  // Unreachable while dynamicParams is false. Kept so that flipping that flag
  // later cannot turn a bad slug into a crash.
  if (!note) notFound()

  const { default: Body, meta } = note

  return (
    <>
      <main id="main" className="mx-auto w-full max-w-2xl px-5 pt-16 pb-24 sm:px-8 sm:pt-24">
        <Link href="/notes" className="font-mono text-sm text-ink-faint hover:text-ink">
          &lt;- Notes
        </Link>

        <article className="mt-8">
          <header>
            <p className="font-mono text-xs text-ink-faint tabular-nums">
              {formatNoteDate(meta.published)}
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              {meta.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{meta.description}</p>
          </header>

          <div className="prose-note mt-12">
            <Body />
          </div>
        </article>

        <p className="mt-16 border-t border-rule pt-6 text-sm text-ink-soft">
          Written by Maksim Beliakov.{' '}
          <a href={CONTACTS.linkedin} className="text-accent underline underline-offset-4">
            LinkedIn
          </a>{' '}
          or{' '}
          <a
            href={`mailto:${CONTACTS.email}`}
            className="text-accent underline underline-offset-4"
          >
            email
          </a>{' '}
          if you want the longer version.
        </p>
      </main>
      <SiteFooter />
    </>
  )
}
