import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import InviteFlow from './invite-flow'

// The invitation is private. The slug is read from INVITE_SLUG at request time
// rather than baked into a folder name: this repository is public, so a literal
// path would publish the link to anyone browsing the sources. Any other token
// is a 404, and the route is excluded from robots.txt and the sitemap.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Приглашение',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
}

export default async function InvitePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const expected = process.env.INVITE_SLUG ?? 'preview'

  if (token !== expected) notFound()

  return <InviteFlow />
}
