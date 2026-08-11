# belyakov.site

Personal site of Maksim Beliakov. Next.js 16 App Router, TypeScript in strict mode, Tailwind v4, MDX for the technical notes. Deployed on Vercel.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build, prints the route table below
npm run typecheck  # tsc --noEmit
npm run lint
npm run check:dashes   # fails if a long dash sneaks into the sources or content
```

## Routes and caching strategy

This is the cheat sheet. Every route on this site is prerendered at build time, and the reason is the same for all of them: there is no data source anywhere in this project that can change without a commit. Note bodies are MDX files in the repository, work history is a TypeScript array, contacts are constants. A `revalidate` window would be asking the server to re-check something that cannot have moved.

| Route | Rendering | `revalidate` | Why |
|---|---|---|---|
| `/` | Static, prerendered at build | none | Content lives in `lib/experience.ts` and `lib/notes.ts`. It changes on deploy, so the build is the correct cache boundary. |
| `/notes` | Static, prerendered at build | none | Index built from the note registry. Same argument. |
| `/notes/[slug]` | SSG via `generateStaticParams`, `dynamicParams = false` | none | Slugs are known at build. `dynamicParams = false` means an unknown slug is a router-level 404 and no server work happens for it. |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` | Static, generated from `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts` | none | Derived from the same registry as the routes, so adding a note updates the sitemap without a second edit. |
| `/opengraph-image` | Static PNG rendered at build by `next/og` | none | Built from the same strings as the page, so the social card cannot go stale against the copy. Sits at the root of `app/`, so every route inherits it. |
| `/portfolio` | Permanent redirect to `/#work` | n/a | The old site's second page is now a section of the home page. The URL is indexed, so it gets a 308 rather than a 404. |
| 404 | Static `app/not-found.tsx` | n/a | Served with a real 404 status. See the note on `loading.tsx` below. |

**On ISR.** Nothing here uses `revalidate: N`. It would be a number chosen to look thoughtful while changing nothing, and that is worse than not having it: it invites the reader to believe there is a moving data source when there is not. If this site later pulls something live, for example GitHub activity or a reading list from an API, that route is where ISR belongs, and the `revalidate` window should be set from how fast the upstream actually moves.

**Why Vercel and not the old FTP host.** The previous deploy was `output: 'export'` plus an FTP upload from GitHub Actions to shared hosting. That works for files, but it rules out `next/image` optimisation, real redirect status codes, streaming, and any future route that is not static. Vercel is used for those, not for ISR.

## `loading.tsx` and the 404 status code

There is exactly one `loading.tsx`, at `app/notes/(index)/loading.tsx`, and the route group around it is the whole point.

Putting the file at `app/notes/loading.tsx` would have created a Suspense boundary over the `/notes` segment **and everything nested under it**, including `/notes/[slug]`. Streaming flushes the HTTP status with the first chunk. If a nested segment then calls `notFound()`, the 200 has already gone out and the "not found" page is served with a success status: wrong for crawlers, wrong for monitoring, wrong for anything that checks status codes rather than page text.

Scoping the boundary to the `(index)` route group keeps it over the notes index, which never calls `notFound()`, and leaves `/notes/[slug]` without one. Combined with `dynamicParams = false`, an unknown slug is rejected by the router before any rendering happens and returns a genuine 404. Verified with `curl -o /dev/null -w '%{http_code}' /notes/does-not-exist`.

## Server and Client Components

Server Components are the default. Two files carry `"use client"`, each with a one-line comment stating why:

- `components/posthog-provider.tsx` needs `window` and `usePathname` to send a pageview per navigation.
- `components/copy-email.tsx` needs `navigator.clipboard` and a piece of local state.

Everything else, including the whole home page, the work list, the notes index and the note bodies, renders on the server and ships no component JavaScript.

## Content

- Technical notes: `content/notes/*.mdx`. Each file exports a `meta` object (slug, title, description, published) that feeds `generateMetadata`, the notes index and the sitemap. Registered in `lib/notes.ts`.
- Work history: `lib/experience.ts`.
- Site-wide strings, URLs and contacts: `lib/site.ts`.

## Fonts and images

`next/font/local` with variable woff2 files committed under `app/fonts`. Self-hosted rather than `next/font/google` so the build has no network dependency and produces identical output offline. `next/font` still emits the `@font-face` rules, hashes and preloads the files, and generates fallback metrics so there is no layout shift when the font swaps in.

There is one image on the site, the portrait in the hero. It is a static import, so `next/image` knows the intrinsic dimensions at build time, reserves the box, generates the blur placeholder and emits a srcset. It carries `priority` because it is the largest element above the fold and should not wait for the lazy-loading observer.

The Open Graph card is generated rather than stored: `app/opengraph-image.tsx` renders it with `next/og` at build time. The fonts it uses are subset TTFs under `app/og`, because satori cannot read woff2 and the full face is far larger than the card needs.

## House rules for this repository

- Short hyphens only. No em dash and no en dash, anywhere: copy, code, comments, metadata. `npm run check:dashes` enforces it and the check runs in CI.
- No rounded numbers. `5,954 commits`, not "about 6,000".
- Every claim on this site has to survive a follow-up question at a technical interview.
