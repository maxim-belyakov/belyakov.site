import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

/**
 * Generated at build time by next/og, not checked in as a JPEG. The card is
 * built from the same strings the page uses, so a change to the positioning
 * cannot leave a stale image behind in public/.
 *
 * Sits at the root of app/, so every route inherits it unless a segment
 * declares its own. Fonts are subset TTFs: satori cannot read woff2, and
 * subsetting keeps the two faces at roughly 20 KB each.
 */

export const alt = 'Maksim Beliakov, AI and Full-Stack Engineer in Warsaw'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const PAPER = '#fbfbf9'
const INK = '#14161a'
const INK_SOFT = '#4a5058'
const INK_FAINT = '#767c85'
const RULE = '#dedcd5'

async function asset(name: string): Promise<Buffer> {
  return readFile(join(process.cwd(), 'app', 'og', name))
}

export default async function OpengraphImage() {
  const [regular, semibold, portrait] = await Promise.all([
    asset('inter-regular.ttf'),
    asset('inter-semibold.ttf'),
    asset('portrait.jpg'),
  ])

  const portraitSrc = `data:image/jpeg;base64,${portrait.toString('base64')}`

  return new ImageResponse(
    (
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {/* Plain img: satori renders its own subset of HTML and next/image does not exist inside ImageResponse. */}
          <img
            src={portraitSrc}
            alt=""
            width={132}
            height={132}
            style={{ borderRadius: 66, objectFit: 'cover' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 64, fontWeight: 600, letterSpacing: '-0.02em' }}>
              Maksim Beliakov
            </div>
            <div style={{ fontSize: 30, color: INK_SOFT, marginTop: 8 }}>
              AI &amp; Full-Stack Engineer in Warsaw
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontSize: 30, lineHeight: 1.4, color: INK }}>
            5,954 of 12,483 commits on the core product at Omnito.
          </div>
          <div style={{ fontSize: 30, lineHeight: 1.4, color: INK_SOFT }}>
            Production AI: a 13-skill assistant, RAG on pgvector, and an LLM-as-judge harness.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            borderTop: `2px solid ${RULE}`,
            paddingTop: 24,
            fontSize: 26,
            color: INK_FAINT,
          }}
        >
          belyakov.site
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Inter', data: regular, weight: 400, style: 'normal' },
        { name: 'Inter', data: semibold, weight: 600, style: 'normal' },
      ],
    },
  )
}
