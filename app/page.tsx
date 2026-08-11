import Link from 'next/link'
import CopyEmail from '@/components/copy-email'
import SiteFooter from '@/components/site-footer'
import { EXPERIENCE } from '@/lib/experience'
import { allNoteMeta } from '@/lib/notes'
import { CONTACTS, CV_PATH } from '@/lib/site'

export default async function HomePage() {
  const notes = await allNoteMeta()

  return (
    <>
      <main id="main" className="mx-auto w-full max-w-3xl px-5 pt-16 pb-24 sm:px-8 sm:pt-24">
        <section aria-labelledby="intro">
          <h1
            id="intro"
            className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
          >
            Maksim Beliakov
          </h1>
          <p className="mt-3 text-lg text-ink-soft sm:text-xl">
            Senior AI &amp; Full-Stack Engineer in Warsaw. 10+ years in enterprise SaaS.
          </p>

          <div className="mt-8 space-y-5 text-[1.0625rem] leading-relaxed">
            <p>
              For the past three years I have been the largest contributor to the core product at
              Omnito:{' '}
              <strong className="font-medium">
                <span className="font-mono tabular-nums">5,954</span> of{' '}
                <span className="font-mono tabular-nums">12,483</span> commits
              </strong>
              , where the next contributor has{' '}
              <span className="font-mono tabular-nums">1,725</span>, and I merged three quarters of
              everything else the team shipped. A Java backend on AWS Lambda and a{' '}
              <span className="font-mono tabular-nums">236,000</span>-line React 18 / TypeScript
              client.
            </p>
            <p>
              The part I go deepest on is production AI: a multi-step assistant that routes intent
              across 13 skills, a RAG layer built by hand on pgvector, and an LLM-as-judge harness
              for regression-testing a non-deterministic system.
            </p>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={CV_PATH}
              className="rounded-md bg-ink px-4 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-85"
            >
              Download CV (PDF)
            </a>
            <a
              href={CONTACTS.linkedin}
              className="rounded-md border border-rule px-4 py-2.5 text-sm transition-colors hover:border-ink"
            >
              LinkedIn
            </a>
            <a
              href={CONTACTS.github}
              className="rounded-md border border-rule px-4 py-2.5 text-sm transition-colors hover:border-ink"
            >
              GitHub
            </a>
          </div>
        </section>

        <section aria-labelledby="notes-heading" className="mt-20 border-t border-rule pt-10">
          <h2
            id="notes-heading"
            className="font-mono text-xs tracking-[0.18em] text-ink-faint uppercase"
          >
            Technical notes
          </h2>
          <ul className="mt-6 space-y-4">
            {notes.map((note) => (
              <li key={note.slug}>
                <Link
                  href={`/notes/${note.slug}`}
                  className="group block rounded-lg border border-rule p-5 transition-colors hover:border-ink"
                >
                  <h3 className="text-lg font-medium group-hover:underline group-hover:underline-offset-4">
                    {note.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
                    {note.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section
          id="work"
          aria-labelledby="work-heading"
          className="mt-20 scroll-mt-8 border-t border-rule pt-10"
        >
          <h2
            id="work-heading"
            className="font-mono text-xs tracking-[0.18em] text-ink-faint uppercase"
          >
            Work
          </h2>
          <div className="mt-6 space-y-14">
            {EXPERIENCE.map((role) => (
              <article key={role.company}>
                <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-xl font-semibold tracking-tight">
                    {role.company}
                    {role.companyNote ? (
                      <span className="ml-2 text-sm font-normal text-ink-faint">
                        {role.companyNote}
                      </span>
                    ) : null}
                  </h3>
                  <p className="font-mono text-sm text-ink-faint tabular-nums">{role.period}</p>
                </header>
                <p className="mt-1 text-[0.9375rem] text-ink-soft">
                  {role.titles.join(' · ')}
                  <span className="text-ink-faint"> · {role.location}</span>
                </p>

                <ul className="mt-4 space-y-3 text-[0.9375rem] leading-relaxed">
                  {role.bullets.map((bullet) => (
                    <li key={bullet} className="relative pl-5">
                      <span
                        aria-hidden="true"
                        className="absolute top-[0.6em] left-0 h-1 w-1 rounded-full bg-ink-faint"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {role.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded border border-rule bg-paper-alt px-2 py-0.5 font-mono text-xs text-ink-soft"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                {role.link ? (
                  <p className="mt-4 text-sm">
                    <a
                      href={role.link.href}
                      className="text-accent underline underline-offset-4"
                      rel="noreferrer"
                    >
                      {role.link.label}
                    </a>
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="mt-20 scroll-mt-8 border-t border-rule pt-10"
        >
          <h2
            id="contact-heading"
            className="font-mono text-xs tracking-[0.18em] text-ink-faint uppercase"
          >
            Contact
          </h2>
          <p className="mt-6 text-[1.0625rem] leading-relaxed">
            I work from Warsaw, remote or hybrid. Ten years across enterprise SaaS in Russia,
            Ukraine, Israel and Poland, the last three of them on AI features that ship to paying
            tenants.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-[0.9375rem]">
            <a href={`mailto:${CONTACTS.email}`} className="text-accent underline underline-offset-4">
              {CONTACTS.email}
            </a>
            <CopyEmail email={CONTACTS.email} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
