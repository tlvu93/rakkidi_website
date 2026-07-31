# Rakkidi Website

A personal site and a small collection of in-house tools. The dashboard shows a
card per project, sourced from Sanity; the other routes are self-contained
tools.

## Routes

| Route                          | What it is                                                                  |
| ------------------------------ | --------------------------------------------------------------------------- |
| `/`                            | Landing page. `/` redirects to `/dashboard` (see `next.config.js`).          |
| `/dashboard`                   | Project cards grouped by category, statically generated from Sanity.        |
| `/contract-calculator`         | Builds an invoice from dropped artwork; derives dimensions from images, PDFs and EPS files and exports a PDF. |
| `/pdf-extractor`               | Define a template over a PDF, then batch-extract those fields to CSV.       |
| `/pdf-extractor/template/[id]` | The template editor (PDF viewer + draggable field rectangles).              |
| `/wmd-scraper`                 | Front-end for an external scraper service that downloads WMD invoices.      |
| `/sign-in`, `/sign-up`         | Auth screens. **Not wired to a backend** - they only echo the form data.    |
| `/siteplan`, `/sticker-maker`  | Placeholders. Not built yet.                                                |

## Stack

- **Next.js 16** (Pages Router, Turbopack, React 19)
- **Material UI 9** + **MUI X 9** (Data Grid, Date Pickers) with Emotion
- **Redux Toolkit** + `next-redux-wrapper` for the contract calculator's state
- **Apollo Client 4** against Sanity's GraphQL API
- **react-pdf / pdf.js** and **react-konva** for the PDF extractor
- **Storybook 10** (Vite-based `@storybook/nextjs-vite`)
- **TypeScript**, **ESLint 9** (flat config), **Prettier**

## Getting started

```bash
yarn install
yarn dev          # http://localhost:3000
```

Node 20.9+ is required (Next.js 16). Development and production builds both use
Turbopack.

### Scripts

| Script                 | Does                                          |
| ---------------------- | --------------------------------------------- |
| `yarn dev`             | Dev server                                    |
| `yarn build`           | Production build                              |
| `yarn start`           | Serve the production build                    |
| `yarn typecheck`       | `tsc --noEmit`                                |
| `yarn lint`            | ESLint over the repo                          |
| `yarn lint:fix`        | ESLint with `--fix`                           |
| `yarn format`          | Prettier write                                |
| `yarn format:check`    | Prettier check                                |
| `yarn storybook`       | Storybook dev server on :6006                 |
| `yarn build-storybook` | Static Storybook build into `storybook-static` |

## Notes for contributors

**SVGs are React components.** Files under `src/assets` are compiled by SVGR -
`import Logo from '@assets/logo.svg'` gives you a component, not a URL. This is
configured twice, once per bundler: `turbopack.rules` in `next.config.js` for
the app, and `vite-plugin-svgr` plus `framework.options.image.excludeFiles` in
`.storybook/main.ts` for Storybook.

**pdf.js and konva are client-only.** Both reference browser globals at module
scope (`DOMMatrix`) or require the native `canvas` package under Node, so they
would crash Next's page-data collection if imported eagerly. They are pulled in
through `next/dynamic` with `ssr: false`, and pdf.js specifically through
`loadPdfjs()` in `src/features/pdf-extractor/utils/pdfjs-loader.ts`, which also
configures the worker exactly once. Keep new imports of these libraries lazy.

**`pdfjs-dist` is pinned.** `react-pdf` depends on an exact version; the pin in
`package.json` must match it, otherwise two copies end up in the tree and their
types stop being assignable to each other.

**`resolutions` are security pins, not preferences.** Each entry in
`package.json` exists to pull a transitive dependency onto a patched release,
and each stays inside that dependency's own major. Some are deliberately
narrowly scoped: a blanket `brace-expansion` or `minimatch` pin breaks either
ESLint or the tools using their v10 line. Drop an entry once the parent package
ships the fix itself.

**Path aliases** are declared in `tsconfig.json`: `@assets/*`, `@shared/*`,
`@pages/*`, `@styles/*`, `@layouts/*`, plus `src` as `baseUrl` (so
`features/...`, `services/...`, `config/...` resolve bare).

## Known gaps

- No test runner is configured. Storybook stories are the only component-level
  coverage.
- Sign-in / sign-up are UI only.
- The Sanity GraphQL endpoint is hardcoded in
  `src/services/sanity/apollo-client.ts` rather than read from the environment.
- `src/pages/sign-in` renders `<Link href="#">Forgot password?</Link>`, a link
  that goes nowhere.

## References

- [Vercel project](https://vercel.com/tlvu93/rakkidi-website)
- [Sanity Desk](https://rakkidi.sanity.studio/desk)
- [Sanity backend repo](https://github.com/tlvu93/sanity-rakkidi-de)
