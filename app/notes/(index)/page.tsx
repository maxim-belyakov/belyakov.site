import type { Metadata } from 'next'
import Link from 'next/link'
import SiteFooter from '@/components/site-footer'
import { allNoteMeta, formatNoteDate } from '@/lib/notes'

export const metadata: Metadata = {
  title: 'Technical notes',
  description:
    'Notes on building and testing production AI: routing a multi-step assistant across 13 skills, and regression-testing a non-deterministic system with an LLM-as-judge harness.',
  alternates: { canonical: '/notes' },
  openGraph: {
    type: 'website',
    url: '/notes',
    title: 'Technical notes - Maksim Beliakov',
    description:
      'Notes on building and testing production AI: routing a multi-step assistant across 13 skills, and regression-testing a non-deterministic system with an LLM-as-judge harness.',
  },
}

export default async function NotesIndexPage() {
  const notes = await allNoteMeta()

  return (
    <>
      <main id="main" className="mx-auto w-full max-w-3xl px-5 pt-16 pb-24 sm:px-8 sm:pt-24">
        <Link href="/" className="font-mono text-sm text-ink-faint hover:text-ink">
          &lt;- Maksim Beliakov
        </Link>

        <h1 className="mt-8 text-3xl font-semibold tracking-tight sm:text-4xl">Technical notes</h1>
        <p className="mt-3 max-w-xl text-ink-soft">
          Architecture decisions from production AI work, written out at the level of detail I would
          use to answer a follow-up question.
        </p>

        <ul className="mt-12 space-y-4">
          {notes.map((note) => (
            <li key={note.slug}>
              <Link
                href={`/notes/${note.slug}`}
                className="group block rounded-lg border border-rule p-5 transition-colors hover:border-ink"
              >
                <p className="font-mono text-xs text-ink-faint tabular-nums">
                  {formatNoteDate(note.published)}
                </p>
                <h2 className="mt-2 text-lg font-medium group-hover:underline group-hover:underline-offset-4">
                  {note.title}
                </h2>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
                  {note.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </>
  )
}
