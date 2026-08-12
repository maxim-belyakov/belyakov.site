import { ImageResponse } from 'next/og'
import {
  INK,
  INK_FAINT,
  INK_SOFT,
  loadOgAssets,
  OG_CONTENT_TYPE,
  OG_SIZE,
  OgFrame,
  RULE,
} from '@/lib/og'

/**
 * Root card. Sits at the root of app/, so every route inherits it unless the
 * segment declares its own. /notes/[slug] declares its own.
 *
 * Rendered at build time from the same strings the page uses, so the social
 * card cannot go stale against the copy the way a checked-in JPEG would.
 */

export const alt = 'Maksim Beliakov, AI and Full-Stack Engineer in Warsaw'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function OpengraphImage() {
  const { fonts, portraitSrc } = await loadOgAssets()

  return new ImageResponse(
    (
      <OgFrame>
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
      </OgFrame>
    ),
    { ...size, fonts },
  )
}
