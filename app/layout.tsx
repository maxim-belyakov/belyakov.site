import type { Metadata } from 'next'
import localFont from 'next/font/local'
import PostHogProvider from '@/components/posthog-provider'
import { CONTACTS, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from '@/lib/site'
import './globals.css'

// next/font/local rather than next/font/google. Both families are variable
// woff2 files committed to the repository, so the build never reaches out to
// fonts.googleapis.com and produces the same output offline. next/font still
// does the work that matters: it emits the @font-face rules, hashes and
// preloads the files, and supplies size-adjust metrics for the fallback so
// swapping the font in causes no layout shift.
const inter = localFont({
  src: './fonts/inter-latin-variable.woff2',
  weight: '100 900',
  display: 'swap',
  variable: '--font-inter',
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
})

const jetbrainsMono = localFont({
  src: './fonts/jetbrains-mono-latin-variable.woff2',
  weight: '100 800',
  display: 'swap',
  variable: '--font-jetbrains-mono',
  fallback: ['ui-monospace', 'monospace'],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: '%s - Maksim Beliakov',
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
  },
  openGraph: {
    type: 'profile',
    siteName: SITE_NAME,
    locale: 'en_US',
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    firstName: 'Maksim',
    lastName: 'Beliakov',
  },
  manifest: '/manifest.webmanifest',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Maksim Beliakov',
  alternateName: 'Maxim Belyakov',
  url: SITE_URL,
  jobTitle: 'AI & Full-Stack Engineer',
  description: SITE_DESCRIPTION,
  email: `mailto:${CONTACTS.email}`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Warsaw',
    addressCountry: 'PL',
  },
  knowsAbout: [
    'Retrieval-augmented generation',
    'LLM evaluation',
    'React',
    'TypeScript',
    'Java',
    'AWS Lambda',
    'PostgreSQL',
  ],
  sameAs: [CONTACTS.linkedin, CONTACTS.github],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <PostHogProvider />
        {children}
        <script
          type="application/ld+json"
          // JSON-LD has no other insertion point in React. The payload is a
          // local literal built above, never user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  )
}
