import type { ComponentType } from 'react'

export type NoteMeta = {
  /** URL segment. Must match the key in the registry below. */
  slug: string
  title: string
  /** Used verbatim as the meta description and as the card summary on /notes. */
  description: string
  /**
   * Optional shorter line for the Open Graph card, which is read at thumbnail
   * size. Set it when the description would have to be cut mid-sentence.
   */
  cardSummary?: string
  /** ISO date. Rendered with a fixed locale so server and client agree. */
  published: string
}

type NoteModule = {
  meta: NoteMeta
  default: ComponentType<Record<string, unknown>>
}

/**
 * Explicit registry rather than a filesystem glob. There are two notes; the
 * registry is also the display order, and a wrong slug fails at build as a
 * type error instead of at runtime as a 404. Swap it for a glob when the
 * number of notes makes hand-maintaining this list annoying.
 */
const NOTES: Record<string, () => Promise<NoteModule>> = {
  'multi-step-ai-assistant': () =>
    import('@/content/notes/multi-step-ai-assistant.mdx') as Promise<NoteModule>,
  'testing-a-non-deterministic-system': () =>
    import('@/content/notes/testing-a-non-deterministic-system.mdx') as Promise<NoteModule>,
}

export function noteSlugs(): string[] {
  return Object.keys(NOTES)
}

export function isNoteSlug(slug: string): boolean {
  return Object.hasOwn(NOTES, slug)
}

export async function loadNote(slug: string): Promise<NoteModule | null> {
  const load = NOTES[slug]
  if (!load) return null
  return load()
}

export async function allNoteMeta(): Promise<NoteMeta[]> {
  const modules = await Promise.all(Object.values(NOTES).map((load) => load()))
  return modules.map((mod) => mod.meta)
}

export function formatNoteDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
