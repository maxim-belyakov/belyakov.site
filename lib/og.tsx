import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

/**
 * Shared pieces for the Open Graph cards. The root card at
 * app/opengraph-image.tsx covers the home page and anything that does not
 * override it; app/notes/[slug]/opengraph-image.tsx renders one card per note
 * so a link to a single note unfurls with that note's own title.
 *
 * Fonts are subset TTFs rather than the woff2 the site itself uses: satori
 * cannot read woff2. The subset covers printable ASCII plus a few typographic
 * marks, which keeps each face around 32 KB.
 */

export const OG_SIZE = { width: 1200, height: 630 } as const
export const OG_CONTENT_TYPE = 'image/png'

export const PAPER = '#fbfbf9'
export const INK = '#14161a'
export const INK_SOFT = '#4a5058'
export const INK_FAINT = '#6b7078'
export const RULE = '#dedcd5'

type OgAssets = {
  fonts: { name: string; data: Buffer; weight: 400 | 600; style: 'normal' }[]
  portraitSrc: string
}

export async function loadOgAssets(): Promise<OgAssets> {
  const dir = join(process.cwd(), 'app', 'og')
  const [regular, semibold, portrait] = await Promise.all([
    readFile(join(dir, 'inter-regular.ttf')),
    readFile(join(dir, 'inter-semibold.ttf')),
    readFile(join(dir, 'portrait.jpg')),
  ])

  return {
    fonts: [
      { name: 'Inter', data: regular, weight: 400, style: 'normal' },
      { name: 'Inter', data: semibold, weight: 600, style: 'normal' },
    ],
    portraitSrc: `data:image/jpeg;base64,${portrait.toString('base64')}`,
  }
}

/**
 * Cards are read at thumbnail size in a feed, so the title has a hard budget.
 * Cutting on a word boundary keeps a long description from ending mid-word.
 */
export function clamp(text: string, limit: number): string {
  if (text.length <= limit) return text
  const cut = text.slice(0, limit)
  const lastSpace = cut.lastIndexOf(' ')
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : limit).replace(/[.,;:]$/, '')}...`
}

export function OgFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: PAPER,
        color: INK,
        padding: '72px 80px',
        fontFamily: 'Inter',
      }}
    >
      {children}
    </div>
  )
}

export function OgByline({
  portraitSrc,
  eyebrow,
}: {
  portraitSrc: string
  eyebrow?: string | undefined
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        borderTop: `2px solid ${RULE}`,
        paddingTop: 26,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- satori renders its own subset of HTML; next/image does not exist inside ImageResponse. */}
      <img
        src={portraitSrc}
        alt=""
        width={64}
        height={64}
        style={{ borderRadius: 32, objectFit: 'cover' }}
      />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 28, fontWeight: 600, color: INK }}>Maksim Beliakov</div>
        <div style={{ fontSize: 24, color: INK_FAINT, marginTop: 2 }}>
          {eyebrow ?? 'belyakov.site'}
        </div>
      </div>
    </div>
  )
}
