import Link from 'next/link'
import { CONTACTS } from '@/lib/site'

// Server Component. It is static markup with no interactivity, so it ships no
// JavaScript to the browser at all.
export default function SiteFooter() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-between gap-4 px-5 py-8 text-sm text-ink-faint sm:px-8">
        <p>Maksim Beliakov, Warsaw</p>
        <nav aria-label="Elsewhere" className="flex flex-wrap gap-4">
          <Link href="/notes" className="hover:text-ink">
            Notes
          </Link>
          <a href={CONTACTS.linkedin} className="hover:text-ink">
            LinkedIn
          </a>
          <a href={CONTACTS.github} className="hover:text-ink">
            GitHub
          </a>
          <a href={`mailto:${CONTACTS.email}`} className="hover:text-ink">
            Email
          </a>
        </nav>
      </div>
    </footer>
  )
}
