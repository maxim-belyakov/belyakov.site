/**
 * Single source of truth for site-wide constants. Imported by the root layout,
 * by every generateMetadata, by app/sitemap.ts and by the JSON-LD block, so a
 * URL or a title is never written twice.
 */

export const SITE_URL = 'https://belyakov.site'

export const SITE_NAME = 'Maksim Beliakov'

export const SITE_TITLE = 'Maksim Beliakov - AI & Full-Stack Engineer'

export const SITE_DESCRIPTION =
  'Senior AI & Full-Stack Engineer in Warsaw. Production AI on top of a decade in enterprise SaaS: a multi-step assistant routing 13 skills, a hand-built RAG layer on pgvector, and an LLM-as-judge harness for a non-deterministic system.'

export const CV_PATH = '/cv-maksim-beliakov.pdf'

export const CONTACTS = {
  email: 'maksim.a.beliakov@gmail.com',
  linkedin: 'https://www.linkedin.com/in/maksim-a-beliakov',
  github: 'https://github.com/maxim-belyakov',
} as const
