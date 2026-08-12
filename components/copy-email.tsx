'use client'
// Client component: it calls navigator.clipboard and holds the "copied" flag
// in local state. Everything else on the page stays a Server Component.

import { useState } from 'react'

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard access can be denied or unavailable over plain http. The
      // mailto link next to this button still works, so there is nothing to
      // recover from and nothing worth showing the reader.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="rounded border border-rule px-2 py-1 text-xs text-ink-soft transition-colors hover:border-ink hover:text-ink"
    >
      <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
      <span className="sr-only"> email address</span>
    </button>
  )
}
