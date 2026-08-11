/**
 * Work history, newest first. Kept as data rather than JSX so the copy can be
 * edited without touching layout, and so every stack list is reviewable in one
 * place against the CV.
 */

export type Role = {
  company: string
  companyNote?: string
  location: string
  period: string
  titles: string[]
  bullets: string[]
  stack: string[]
  link?: { label: string; href: string }
}

export const EXPERIENCE: Role[] = [
  {
    company: 'Omnito',
    companyNote: 'ex-SUMO Scheduler',
    location: 'Warsaw, Poland',
    period: '2023 - Present',
    titles: ['Full-Stack Engineer & Team Leader'],
    bullets: [
      'Largest contributor to the core product repository: 5,954 of 12,483 commits over three years, where the next contributor has 1,725, and the reviewer who merged three quarters of everything else the team shipped. Led a cross-functional team of 8 on a multi-tenant enterprise SaaS scheduling platform serving 2,563 active tenants.',
      'Shipped a production multi-step AI assistant. An LLM classifier routes intent to 13 skills, and context fetches are issued speculatively in parallel, so turn latency is the slowest fetch rather than the sum of all of them. Answers stream to the browser over WebSocket.',
      'Built its RAG layer by hand: OpenAI embeddings into a pgvector store implemented over JDBC, tenant isolation enforced by table rather than by query filter, fed by a headless-Chromium crawler on ECS Fargate with idempotent re-sync.',
      'Built an LLM-as-judge evaluation harness into the ops console. It replays scripted question sets through the live assistant, generates follow-up turns and compares runs against each other, which is how a non-deterministic system gets regression-tested. Langfuse covers tracing only.',
      'Shipped the LLM meeting-notes pipeline: 2,000+ summaries per quarter at an 11% empty rate, tracked in PostHog. Integrated and customised a forked Chatwoot deployment, and designed agent workflows on a self-hosted Flowise deployment.',
      'Designed the backend: a single-dispatcher architecture routing 280 handlers against a 262-operation OpenAPI contract that generates both the Java and the TypeScript models, so the two sides cannot drift. Around 107,000 lines of Java across 21 Lambdas, a 46-table DynamoDB model, an SNS-based async job framework and SAML SSO over Cognito.',
      'Built and maintained the 236,000-line React 18 / TypeScript client: 93 routes behind role-based guards, 48 Redux modules with redux-saga, extended onto Outlook add-ins and Chrome/Edge extensions, integrated with Salesforce, HubSpot, Microsoft Dynamics, Chargebee and Stripe.',
      'Rolled out Claude Code and Cursor across the team, and set the review standard that holds AI-generated code to the same bar as anything else.',
    ],
    stack: [
      'React 18',
      'TypeScript',
      'Redux/Saga',
      'PrimeReact',
      'Java 21',
      'AWS Lambda',
      'DynamoDB',
      'GraphQL',
      'Cognito',
      'SNS',
      'LangChain4j',
      'GPT-4o',
      'pgvector',
      'Langfuse',
    ],
    link: { label: 'omnito.ai', href: 'https://app.omnito.ai/' },
  },
  {
    company: 'EPAM Systems',
    location: 'Wroclaw, Poland and Kyiv, Ukraine',
    period: '2020 - 2023',
    titles: ['Lead Engineer, 2021 - 2023', 'Senior Frontend Developer, 2020 - 2021'],
    bullets: [
      'Led a team of 3 building high-performance React applications with Redux and TypeScript for enterprise clients, and owned EPIC planning for the following quarter.',
      'Drove code quality through systematic code review, coding standards and CI/CD pipeline work.',
      'Collaborated with backend teams on Java 17 and MongoDB services, designing and integrating the APIs the frontend consumed.',
      'Before that, as Senior Frontend Developer: built data-heavy UIs from scratch, migrated over 100,000 lines from Angular 8 to React, and moved frontend services to Kubernetes as a micro-frontend architecture.',
    ],
    stack: ['React', 'TypeScript', 'Redux', 'Java 17', 'MongoDB', 'Kubernetes'],
    link: { label: 'epam.com', href: 'https://www.epam.com' },
  },
  {
    company: 'InLoop LLC',
    location: 'Tel Aviv, Israel',
    period: '2018 - 2020',
    titles: ['Senior Frontend Developer, 2019 - 2020', 'Frontend Developer, 2018'],
    bullets: [
      'Built product features in React for a news aggregation platform: article management with comments, bookmarking and event tracking.',
      'Built the admin panel on Redux that managers used for content control and client support.',
      'Established the developer workflow: coding standards, code review, local environments and CI. Rebuilt the core product UI on AngularJS, ASP.NET and REST APIs.',
    ],
    stack: ['React', 'Redux', 'AngularJS', 'ASP.NET', 'Webpack'],
    link: { label: 'inloop.com', href: 'https://inloop.com' },
  },
  {
    company: 'Cultural Service Inc.',
    companyNote: 'ponominalu.ru',
    location: 'Moscow, Russia',
    period: '2016 - 2018',
    titles: ['Frontend Team Leader, 2017 - 2018', 'Frontend Developer, 2016 - 2017'],
    bullets: [
      'Led a team of 6 on an event ticketing platform, from architecture design through to production deployment.',
      'Built a progressive web app with Vue.js and React that let organisers and distributors sell tickets through several channels.',
      'Built an adaptive ticket sales platform on Play Framework with Angular, Ajax and PostgreSQL, with graded cross-browser support.',
    ],
    stack: ['Vue.js', 'React', 'Angular', 'PostgreSQL', 'Play Framework'],
    link: { label: 'ponominalu.ru', href: 'https://ponominalu.ru' },
  },
]
