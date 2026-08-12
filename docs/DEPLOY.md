# Deploying belyakov.site to Vercel

Written down so it does not have to be remembered. The site was previously a static export uploaded over FTP to shared hosting from GitHub Actions; that workflow is deleted and Vercel replaces it.

## Order matters

Vercel picks the production branch in this order: `main`, then `master`, then the repository default. This repository has `master`, so the first production build after import is the **old** site. That is harmless while no domain is attached, and the steps below are ordered around it.

1. Push the branch and open the pull request.
2. Import the project into Vercel. First production build is `master`, on a `*.vercel.app` URL.
3. Vercel builds the branch automatically as a preview. Verify everything there.
4. Merge into `master`. That becomes the production deployment.
5. Attach the domain last.

## 1. Create the project

1. Go to [vercel.com/new](https://vercel.com/new), or the **New Project** button at the top right of the dashboard.
2. Vercel lists the repositories the connected GitHub account can write to. If `belyakov.site` is missing, switch namespace with the dropdown at the top left; if it is still missing, the Vercel GitHub App does not have access to it, which is fixed with **Adjust GitHub App Permissions** on the same screen.
3. Press **Import** next to the repository.

## 2. Configure before the first deploy

On the configuration screen:

- **Framework Preset**: should auto-detect as Next.js. Set it manually if it does not.
- **Root Directory**: `./`
- **Build and Output Settings**: leave the defaults. `output: 'export'` is gone from `next.config.ts`, so Vercel builds a full application rather than a static export.
- **Environment Variables**: add these two before the first build. They are `NEXT_PUBLIC_`, which means they are inlined into the client bundle at build time and must exist before a build, not after it.

```
NEXT_PUBLIC_POSTHOG_KEY
NEXT_PUBLIC_POSTHOG_HOST
```

Values are in the local `.env.local`. Set them for Production, Preview and Development, otherwise preview builds lose analytics silently.

Press **Deploy**.

## 3. Verify on the preview URL

Every non-production branch gets its own preview deployment, listed under **Deployments** and posted as a comment on the pull request. Check on the preview, not on localhost:

- `/`, `/notes`, and both notes render.
- `/opengraph-image` returns a PNG, and each note returns its own card at `/notes/<slug>/opengraph-image/card`.
- `/cv-maksim-beliakov.pdf` downloads.
- `/sitemap.xml`, `/robots.txt` and `/manifest.webmanifest` are served.
- `/portfolio` returns 308 to `/#work`, and an unknown URL returns a real 404 rather than a 200.

## 4. Promote to production

Merge the branch into `master` and the production deployment follows automatically.

To run production from a different branch instead: **Settings** then **Environments**, open the **Production** environment, **Branch Tracking**, change the branch name, **Save**.

## 5. Attach the domain

**Settings** then **Domains** then **Add Domain**, enter `belyakov.site`. Vercel offers to add `www` as well; accept, it configures the redirect.

Vercel then shows the DNS records to create. The domain's DNS is at Namecheap, so the records are created there:

- Apex (`belyakov.site`): an **A** record, with the value shown on that screen. Read the value off the dashboard rather than copying an address from anywhere else; Vercel changes them.
- `www`: a **CNAME** to the project-specific value shown on the same screen, of the form `<hash>.vercel-dns-017.com`.

Vercel also offers verification by moving the domain to its nameservers. Avoid that if the domain carries email: changing nameservers means every record, MX included, has to be recreated inside Vercel, and mail stops until that is done. The A and CNAME method only touches web traffic.

Once DNS propagates, the old shared host simply stops receiving traffic. Nothing needs to be deleted there, and the files can stay as a fallback. The FTP workflow is already removed from this repository, so nothing can overwrite the old host by accident.

## After the domain is live

LinkedIn caches link previews. Run the home page and both note URLs through the [Post Inspector](https://www.linkedin.com/post-inspector/) once, before pasting any of them into a message or into Featured, so the first person to see the link sees the card.

## A note on CI

`npm run typecheck` is `next typegen && tsc --noEmit`, not bare `tsc`. `next-env.d.ts` carries the module declarations for static image imports and is generated rather than committed, so on a clean checkout, which is what CI is, plain `tsc` fails on `import portrait from '@/public/maksim-beliakov.jpg'` before anything has generated that file. Running `next typegen` first makes the check independent of whether a build has already happened in that working copy. This is worth remembering as a class of bug: a check that passes locally only because of a generated artefact left over from an earlier run.
