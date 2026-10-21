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
 * Explicit registry rather than a filesystem glob. The order here is the
 * display order on /notes, newest first, and a wrong slug fails at build as a
 * type error instead of at runtime as a 404. Swap it for a glob plus a sort on
 * `published` when hand-maintaining this list gets annoying.
 */
const NOTES: Record<string, () => Promise<NoteModule>> = {
  'coding-agents-for-a-team-of-eight': () =>
    import('@/content/notes/coding-agents-for-a-team-of-eight.mdx') as Promise<NoteModule>,
  'integration-tests-that-boot-the-real-thing': () =>
    import('@/content/notes/integration-tests-that-boot-the-real-thing.mdx') as Promise<NoteModule>,
  'isolation-you-cannot-forget': () =>
    import('@/content/notes/isolation-you-cannot-forget.mdx') as Promise<NoteModule>,
  'a-vector-store-by-hand': () =>
    import('@/content/notes/a-vector-store-by-hand.mdx') as Promise<NoteModule>,
  'a-reflection-orm-and-28-migrations': () =>
    import('@/content/notes/a-reflection-orm-and-28-migrations.mdx') as Promise<NoteModule>,
  'async-jobs-on-one-topic': () =>
    import('@/content/notes/async-jobs-on-one-topic.mdx') as Promise<NoteModule>,
  'generating-both-sides-of-a-contract': () =>
    import('@/content/notes/generating-both-sides-of-a-contract.mdx') as Promise<NoteModule>,
  'one-lambda-many-routes': () =>
    import('@/content/notes/one-lambda-many-routes.mdx') as Promise<NoteModule>,
  'testing-a-non-deterministic-system': () =>
    import('@/content/notes/testing-a-non-deterministic-system.mdx') as Promise<NoteModule>,
  'multi-step-ai-assistant': () =>
    import('@/content/notes/multi-step-ai-assistant.mdx') as Promise<NoteModule>,
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
