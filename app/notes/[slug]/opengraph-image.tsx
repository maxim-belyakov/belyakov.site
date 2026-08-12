import { ImageResponse } from 'next/og'
import { notFound } from 'next/navigation'
import {
  clamp,
  INK,
  INK_FAINT,
  loadOgAssets,
  OG_CONTENT_TYPE,
  OG_SIZE,
  OgByline,
  OgFrame,
} from '@/lib/og'
import { loadNote, noteSlugs } from '@/lib/notes'

/**
 * One card per note, so a link to a single note unfurls with that note's own
 * title rather than the site-wide card. Both notes go into LinkedIn Featured
 * separately, which is the whole reason this file exists.
 *
 * generateStaticParams matches the page, so every card is a PNG produced at
 * build time and served as a static asset.
 */

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export function generateStaticParams(): { slug: string }[] {
  return noteSlugs().map((slug) => ({ slug }))
}

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const note = await loadNote(slug)
  return [{ id: 'card', size: OG_SIZE, contentType: OG_CONTENT_TYPE, alt: note?.meta.title ?? '' }]
}

export default async function NoteOpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const note = await loadNote(slug)
  if (!note) notFound()

  const { fonts, portraitSrc } = await loadOgAssets()

  return new ImageResponse(
    (
      <OgFrame>
        <div style={{ display: 'flex', fontSize: 24, letterSpacing: '0.14em', color: INK_FAINT }}>
          TECHNICAL NOTE
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 60,
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: INK,
            }}
          >
            {note.meta.title}
          </div>
          <div style={{ fontSize: 28, lineHeight: 1.45, color: '#4a5058' }}>
            {note.meta.cardSummary ?? clamp(note.meta.description, 155)}
          </div>
        </div>

        <OgByline portraitSrc={portraitSrc} eyebrow="belyakov.site/notes" />
      </OgFrame>
    ),
    { ...size, fonts },
  )
}
