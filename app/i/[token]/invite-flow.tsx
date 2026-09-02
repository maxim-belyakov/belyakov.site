// The invitation is a four step flow with local state, a hearts animation and a
// fetch at the end, so it is a Client Component. Nothing here is prerendered:
// the page above it is dynamic because the slug lives in an env var.
'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FOOD_OPTIONS, INVITE_COPY, INVITE_IMAGES, foodById } from '@/lib/invite'

type Step = 'ask' | 'confirm' | 'what' | 'done' | 'declined'

// The progress dots follow the yes path only. A decline is an ending, not a
// step along the way, so it does not get a dot.
const STEPS: Step[] = ['ask', 'confirm', 'what', 'done']

type Heart = { id: number; left: number; delay: number; scale: number }

export default function InviteFlow() {
  const [step, setStep] = useState<Step>('ask')
  const [noCount, setNoCount] = useState(0)
  const [food, setFood] = useState<string | null>(null)
  const [hearts, setHearts] = useState<Heart[]>([])
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle')
  const heartSeed = useRef(0)
  const sentRef = useRef(false)

  const burst = useCallback(() => {
    const batch: Heart[] = Array.from({ length: 14 }, () => {
      heartSeed.current += 1
      return {
        id: heartSeed.current,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        scale: 0.6 + Math.random() * 0.9,
      }
    })
    setHearts((current) => [...current, ...batch])
    window.setTimeout(() => {
      setHearts((current) => current.filter((heart) => !batch.includes(heart)))
    }, 2600)
  }, [])

  // The answer is sent once, when the last screen mounts. sentRef guards against
  // React running the effect twice in development Strict Mode.
  useEffect(() => {
    if ((step !== 'done' && step !== 'declined') || sentRef.current) return
    sentRef.current = true
    setStatus('sending')
    fetch('/api/invite', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ answer: step === 'done' ? 'yes' : 'no', food, noCount }),
    })
      .then((response) => {
        setStatus(response.ok ? 'sent' : 'failed')
      })
      .catch(() => setStatus('failed'))
  }, [step, food, noCount])

  const noLabel = INVITE_COPY.noLabels[Math.min(noCount, INVITE_COPY.noLabels.length - 1)]
  const yesScale = 1 + noCount * 0.06
  const chosen = food ? foodById(food) : undefined
  const stepIndex = STEPS.indexOf(step)

  return (
    <main id="main" className="invite-shell">
      <div className="invite-hearts" aria-hidden="true">
        {hearts.map((heart) => (
          <span
            key={heart.id}
            className="invite-heart"
            style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.delay}s`,
              transform: `scale(${heart.scale})`,
            }}
          >
            ❤️
          </span>
        ))}
      </div>

      <div className="invite-frame">
        <div className="invite-card">
          {step === 'ask' && (
            <>
              <Image
                src={INVITE_IMAGES.ask}
                alt=""
                width={200}
                height={200}
                className="invite-art"
                priority
              />
              <h1 className="invite-title">{INVITE_COPY.askTitle}</h1>
              <p className="invite-subtitle">{INVITE_COPY.askSubtitle}</p>
              <button
                type="button"
                className="invite-yes"
                style={{ transform: `scale(${yesScale})` }}
                onClick={() => {
                  burst()
                  setStep('confirm')
                }}
              >
                {INVITE_COPY.yesLabel}
              </button>
              <button
                type="button"
                className="invite-no"
                onClick={() => {
                  // First press asks once more, second press is the answer.
                  setNoCount((count) => count + 1)
                  if (noCount >= 1) setStep('declined')
                }}
              >
                {noLabel}
              </button>
            </>
          )}

          {step === 'confirm' && (
            <>
              <Image
                src={INVITE_IMAGES.confirm}
                alt=""
                width={220}
                height={180}
                className="invite-art"
              />
              <h1 className="invite-title">{INVITE_COPY.confirmTitle}</h1>
              <p className="invite-subtitle">{INVITE_COPY.confirmSubtitle}</p>
              <button
                type="button"
                className="invite-yes"
                onClick={() => {
                  burst()
                  setStep('what')
                }}
              >
                {INVITE_COPY.confirmButton}
              </button>
            </>
          )}

          {step === 'what' && (
            <>
              <h1 className="invite-title">{INVITE_COPY.whatTitle}</h1>
              <p className="invite-subtitle">{INVITE_COPY.whatSubtitle}</p>
              <div className="invite-grid">
                {FOOD_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className={option.id === food ? 'invite-tile invite-tile-on' : 'invite-tile'}
                    aria-pressed={option.id === food}
                    onClick={() => setFood(option.id)}
                  >
                    <span className="invite-tile-emoji">{option.emoji}</span>
                    <span className="invite-tile-label">{option.label}</span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="invite-yes"
                disabled={!food}
                onClick={() => {
                  burst()
                  setStep('done')
                }}
              >
                {INVITE_COPY.whatButton}
              </button>
            </>
          )}

          {step === 'declined' && (
            <>
              <Image
                src={INVITE_IMAGES.declined}
                alt=""
                width={220}
                height={180}
                className="invite-art"
              />
              <h1 className="invite-title">{INVITE_COPY.declinedTitle}</h1>
              <p className="invite-subtitle">{INVITE_COPY.declinedSubtitle}</p>
              <p className="invite-status">
                {status === 'sending' && INVITE_COPY.sendingNote}
                {status === 'sent' && INVITE_COPY.sentNote}
                {status === 'failed' && INVITE_COPY.failedNote}
              </p>
            </>
          )}

          {step === 'done' && (
            <>
              <Image
                src={INVITE_IMAGES.done}
                alt=""
                width={150}
                height={150}
                className="invite-art"
              />
              <h1 className="invite-title">{INVITE_COPY.finalTitle}</h1>
              <p className="invite-subtitle">{INVITE_COPY.finalSubtitle}</p>
              {chosen && (
                <p className="invite-choice">
                  {chosen.emoji} {chosen.label}
                </p>
              )}
              <p className="invite-status">
                {status === 'sending' && INVITE_COPY.sendingNote}
                {status === 'sent' && INVITE_COPY.sentNote}
                {status === 'failed' && INVITE_COPY.failedNote}
              </p>
            </>
          )}
        </div>
      </div>

      <div className="invite-dots" aria-hidden="true">
        {step !== 'declined' &&
          STEPS.map((name, index) => (
            <span
              key={name}
              className={index <= stepIndex ? 'invite-dot invite-dot-on' : 'invite-dot'}
            />
          ))}
      </div>
    </main>
  )
}
