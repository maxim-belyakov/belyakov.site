import { NextResponse } from 'next/server'
import { foodById } from '@/lib/invite'

// The bot token never reaches the browser: the answer is posted here and this
// handler talks to the Telegram API server side. Both values are Vercel
// environment variables, so nothing secret is committed.
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Payload = {
  answer?: unknown
  food?: unknown
  noCount?: unknown
}

// A speed bump, not a wall: the URL is unguessable, and a serverless instance
// forgets this map when it recycles. It exists so a discovered link cannot be
// turned into an unbounded stream of notifications from one place.
const seen = new Map<string, number[]>()
const WINDOW_MS = 60 * 60 * 1000
const MAX_PER_WINDOW = 12

function rateLimited(key: string): boolean {
  const now = Date.now()
  const hits = (seen.get(key) ?? []).filter((at) => now - at < WINDOW_MS)
  hits.push(now)
  seen.set(key, hits)
  return hits.length > MAX_PER_WINDOW
}

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    return NextResponse.json({ error: 'not configured' }, { status: 500 })
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'too many' }, { status: 429 })
  }

  let payload: Payload
  try {
    payload = (await request.json()) as Payload
  } catch {
    return NextResponse.json({ error: 'bad json' }, { status: 400 })
  }

  // The food id is only ever echoed back through the known options list, so
  // nothing a caller types can reach the message text.
  const food = typeof payload.food === 'string' ? foodById(payload.food) : undefined
  const declined = payload.answer === 'no'
  const noCount =
    typeof payload.noCount === 'number' && Number.isFinite(payload.noCount)
      ? Math.max(0, Math.min(99, Math.trunc(payload.noCount)))
      : 0

  function buildLines(): string[] | null {
    if (declined) {
      return ['💌 Алёна ответила: не сегодня', '', '🤍 Сказала нет, уточнение не помогло']
    }
    if (!food) return null
    return [
      '💌 Алёна сказала ДА',
      '',
      `${food.emoji} Выбрала: ${food.label}`,
      noCount > 0 ? '🙈 Один раз ткнула в "нет" перед этим' : '😌 Сразу да, без раздумий',
    ]
  }

  const lines = buildLines()

  if (!lines) {
    return NextResponse.json({ error: 'bad payload' }, { status: 400 })
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: lines.join('\n') }),
    cache: 'no-store',
  })

  if (!response.ok) {
    return NextResponse.json({ error: 'telegram rejected the message' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
