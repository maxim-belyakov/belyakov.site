<!--
  GitHub PROFILE README.
  Lives at the root of the repository named exactly "maxim-belyakov",
  as README.md. GitHub renders it on https://github.com/maxim-belyakov
-->

### Maksim Beliakov

AI & Full-Stack Engineer in Warsaw. For the past three years I have worked on production AI inside an enterprise SaaS product: a multi-step assistant, a retrieval layer built by hand on pgvector, and an evaluation harness for a system whose output is not deterministic. Ten years of React, TypeScript and Java underneath that.

Largest contributor to the core product at Omnito: 5,954 of 12,483 commits over three years, where the next contributor has 1,725.

---

### Technical notes

That AI work belongs to my employer, so it is written up rather than open-sourced. These two are the long version:

- **[Architecture of a multi-step AI assistant](https://belyakov.site/notes/multi-step-ai-assistant)** - an LLM classifier routes intent across 13 skills, context fetches go out speculatively and in parallel so turn latency is the slowest fetch rather than their sum, and the answer streams over WebSocket.
- **[Testing a non-deterministic system](https://belyakov.site/notes/testing-a-non-deterministic-system)** - deterministic checks at the bottom, an LLM-as-judge harness above them, human review on a sample, and the production metrics that say when it slipped.

---

### What is here

- **[belyakov.site](https://github.com/maxim-belyakov/belyakov.site)** - the site the notes above live on. Next.js App Router, TypeScript in strict mode, Tailwind, notes in MDX, every route prerendered.
- **[compile-time-guidelines](https://github.com/maxim-belyakov/compile-time-guidelines)** - a platform's community guidelines modelled in the TypeScript type system, so a post that is known at authoring time and breaks a rule does not typecheck. The same rules run at runtime for text that only exists at runtime, and both paths converge on one branded type that the publish sink is the only consumer of.
- **[cocoon.city](https://github.com/maxim-belyakov/cocoon.city)** - a coliving site in React 18, TypeScript, Redux Toolkit and Vite: booking flow, EN and PL localisation, tests in Jest and React Testing Library.

---

### Tech

**Frontend** React 18 · TypeScript · Redux + redux-saga · PrimeReact · browser extensions (MV3) · Outlook add-ins (Office.js)

**Backend and cloud** Java 21 · Node.js · AWS Lambda · API Gateway · DynamoDB · PostgreSQL / pgvector · AppSync GraphQL · Cognito · SAML SSO · OpenAPI-driven codegen

**AI** LangChain4j · GPT-4o · RAG on pgvector · LLM-as-judge evaluation · Langfuse tracing · prompt and context engineering

**Testing and process** JUnit 5 integration tests · CI/CD · code review

---

### Reach me

[Website](https://belyakov.site) · [LinkedIn](https://www.linkedin.com/in/maksim-a-beliakov) · [Telegram](https://t.me/beliakovm)
