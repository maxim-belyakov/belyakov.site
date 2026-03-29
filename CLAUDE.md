# CLAUDE.md

## Project Overview

**belyakov-site** — personal portfolio website showcasing professional skills and projects. Built with Next.js (Pages Router). Analytics via PostHog. Priority: stability, performance, and test coverage for components.

## Tech Stack

- **Framework:** Next.js 14 (Pages Router)
- **React:** 18
- **Styling:** SCSS Modules (`*.module.scss`), global CSS, styled-components
- **Carousel:** Embla Carousel, pure-react-carousel
- **Icons:** FontAwesome, react-social-icons
- **Analytics:** PostHog (`posthog-js`)
- **Utilities:** classnames
- **Package Manager:** Yarn
- **Node.js:** 20

## Architecture

```
pages/              # Next.js pages (routing)
  _app.js           # App wrapper (PostHog init, global providers)
  _document.js      # Custom document (HTML structure)
  index.js          # Home page
  portfolio/        # Portfolio page
  api/              # API routes
components/         # Reusable UI components
  embla-slider/     # Image carousel with thumbnails and nav buttons
  transition-layout/# Page transition wrapper
  window-size/      # Window size utility hook/component
JSON/               # Static data (projects list, social icons)
styles/             # Global styles and SCSS variables
public/             # Static assets (images, favicon, manifest)
out/                # Static export output (generated, do not edit)
```

## Key Conventions

- **Styling:** CSS/SCSS Modules colocated with components (`component.module.scss`). Global variables in `styles/variables.scss`. Some legacy styled-components usage exists.
- **Components:** Plain JS (no TypeScript). Functional components.
- **Naming:** Component directories use kebab-case. Component files match directory name.
- **Data:** Project content and social links stored as JSON in `JSON/` directory, not hardcoded in components.
- **Static assets:** Images organized by project in `public/projects/` and `public/buttons/`.

## Commands

```bash
yarn dev        # Start dev server (http://localhost:3000)
yarn build      # Production build
yarn start      # Start production server
yarn lint       # Run ESLint (next lint)
yarn static     # Static export build (alias for next build)
```

## Configuration

- `next.config.js` — Next.js config (includes `trailingSlash: true` based on recent commits)
- ESLint uses `eslint-config-next`
- Babel plugin for styled-components (`babel-plugin-styled-components`)

## Testing

No test framework is currently configured. The project goal is to add component tests. When adding tests:
- Prefer React Testing Library + Jest (standard for Next.js projects)
- Focus on component-level tests for `components/` directory
- Test data-driven rendering using JSON fixtures from `JSON/`

## Analytics

PostHog is initialized in the app for tracking user interactions. When modifying pages or components, preserve PostHog event tracking. Do not remove or break analytics integration.

## Important Notes

- The `out/` directory is generated build output — never edit manually.
- No TypeScript — the project uses plain JavaScript throughout.
- Performance and stability are top priorities — avoid heavy dependencies or complex patterns.
- When making changes, ensure the static export (`yarn static`) still works correctly.