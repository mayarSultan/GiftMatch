# Changelog

All notable changes to this project are documented here. Format loosely
follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased] — Version 2: Real Product Images

### Added

- `scripts/generate-unsplash-images.cjs` — one-time local script that
  fetches real, curated photos from Unsplash's free API and writes them
  into `gifts.json`. Runs once on a developer's machine, not from the
  deployed app — no API key ever reaches production
- Sitewide photo attribution credit in `Footer.tsx`, per Unsplash's terms
- `eslint.config.js` now has a dedicated block for `scripts/**/*.cjs`,
  recognizing Node.js globals (`__dirname`, `process`, `console`) that the
  app-code config didn't know about

### Removed

- `scripts/generate-placeholder-images.cjs` — fully superseded by the
  Unsplash version above

### Fixed

- `vercel.json`'s catch-all SPA rewrite (`"/(.*)" → "/"`) was silently
  breaking `vercel dev` locally (Vite asset requests like `/src/main.tsx`
  returned 404) — Vercel auto-detects Vite projects and handles this
  itself, so the explicit rule was actively conflicting with it. Removed;
  only the `/api/*` passthrough rule remains

## [Unreleased] — Version 2, Phase 4: Integration

### Added

- `recommendationEngine.ts` now accepts an optional `tags` array —
  AI-extracted interests genuinely influence gift ranking, not just
  `recipient`/`style`
- `formatMatchReason.ts` mentions matched interests in the reason text
  (e.g. "fits their interest in coffee")
- `quizAnswersSerializer.ts` encodes/decodes tags via the URL too, so
  `/describe` results are exactly as shareable as quiz results
- Recent searches now remember tags, so revisiting one reproduces the
  same tag-influenced results

### Changed

- `ExtractedProfileSummary`'s copy updated — tags are no longer labeled
  "coming soon," since they now actually affect matching

## [Unreleased] — Version 2, Phase 3: Free-Text Input UI

### Added

- `/describe` route — a free-text alternative to the five-question quiz
- `DescribeForm`, `ExtractedProfileSummary` components;
  `useDescribeGift` hook managing the async request lifecycle
- Real loading and error states for the AI request (a legitimate use of a
  loading state, unlike Version 1's synchronous engine — this is a real
  network call)
- A secondary link from the home page Hero pointing to `/describe`

## [Unreleased] — Version 2, Phase 2: Real AI Extraction (Gemini)

### Added

- `api/_lib/geminiExtractor.ts` — real LLM extraction via Google's Gemini
  API (free tier, no credit card required), replacing the Phase 1 mock as
  the primary path
- `src/utils/aiVocabulary.ts` — single source of truth for allowed
  recipient/style/tag values, shared by both the mock and the real
  extractor. For Gemini, these are passed as a JSON Schema `enum`, so the
  model's output is constrained at generation time — it cannot return a
  value `recommendationEngine` wouldn't understand

### Changed

- `api/parse-description.ts` now tries the real Gemini call first and
  falls back to `parseDescriptionMock` on any failure — missing API key,
  network error, rate limit, malformed response. Verified directly: with
  `GEMINI_API_KEY` unset, the handler still returns `200` with a working
  mock-derived profile instead of failing the request
- `.env.example` now documents `GEMINI_API_KEY` (switched from the
  originally-planned Anthropic key — Gemini has an actual ongoing free
  tier; Anthropic's API is a one-time trial credit only)

### Known limitation

- The real Gemini call itself could only be verified for its request
  construction and JSON-parsing logic — this sandbox has no network
  access to `generativelanguage.googleapis.com`. The fallback path (no
  key / call fails) is fully verified end-to-end; the success path (a
  real key returning real extracted data) needs to be tested by whoever
  has a Gemini API key, via `vercel dev` + a real request

## [Unreleased] — Version 2, Phase 1: AI Backend Foundation

### Added

- `api/parse-description.ts` — a Vercel serverless function establishing the
  contract for free-text gift descriptions. Validates input, returns a
  structured `AiExtractedProfile` (recipient/style/tags)
- `src/utils/parseDescriptionMock.ts` — a deterministic, keyword-based stand-in
  for the real LLM call, so the contract is fully testable before an API key
  exists. Documented as a mock, not natural-language understanding
- `src/utils/aiClient.ts` — typed frontend client for the new endpoint
  (not yet wired into any UI — that's Phase 3)
- `vercel.json` — SPA fallback routing + API passthrough, fixing a
  production-hosting gap that existed since Version 1
- `tsconfig.api.json` — the `api/` folder is now type-checked as part of
  `npm run build`, same as the frontend
- `.env.example` documenting `ANTHROPIC_API_KEY` (unused until Phase 2)

### Changed

- `.gitignore` now excludes real `.env` files and the Vercel CLI's local
  link folder — first time this project has anything secret-bearing
- `src/data/gifts.ts` and `src/utils/parseDescriptionMock.ts` use relative
  imports instead of the `@/` alias, since both are bundled by Vercel's
  separate function build in addition to Vite

### Not yet done (intentionally — see Phase 2+)

- No real LLM call yet — `parseDescriptionMock` is keyword matching, not AI
- No UI for entering a free-text description yet
- Mock output isn't wired into `recommendationEngine.ts` yet

## [0.8.0] — Production Ready

### Added

- README, installation guide, and architecture documentation (`docs/`)
- Professional repo structure: `LICENSE`, `CONTRIBUTING.md`,
  `CODE_OF_CONDUCT.md`, `SECURITY.md`, GitHub issue/PR templates, CI workflow
- Route-level code splitting (`React.lazy` + `Suspense`) — every page ships
  as its own chunk
- Vendor chunk splitting (React and Framer Motion cached separately from
  app code)
- Dynamic import for the confetti library — only fetched when a celebration
  actually happens

### Changed

- Removed a dead `isFavorite` getter from `useFavoritesStore` found during
  cleanup — all consumers already used a direct selector

## [0.7.0] — Startup Features

### Added

- Favorites, persisted locally, with a dedicated `/favorites` page
- Recent searches, shown on the home page, linking back to reproduced results
- Shareable results — quiz answers now live in the results URL, making
  Share and Copy Link actually reproduce the same matches for anyone
- Dark mode with persisted preference and no flash-of-wrong-theme
- Static Open Graph / Twitter Card meta tags, plus per-page `document.title`
  updates
- `MarketingLayout` / `FocusedLayout` — two reusable layouts instead of one
  layout for every route

## [0.6.0] — UX Improvements

### Added

- Route transition animations, confetti on quiz completion, error boundary,
  image-load fallback, skip-to-content link, route-change focus management,
  `aria-live` announcements, reduced-motion support throughout
- Hover/tap micro-interactions on buttons, option cards, and result cards

## [0.5.0] — Results Page

### Added

- Results page: ranked gift cards with match score, match reason, price,
  and tags; empty states; retake-quiz flow

## [0.4.0] — JSON Database

### Added

- `gifts.json` — 33-item gift catalog as a genuine data file, not a
  TypeScript literal

## [0.3.0] — Recommendation Engine

### Added

- `recommendationEngine.ts` — pure, framework-independent scoring engine
  (occasion, recipient, budget, style, age), fully unit-tested at the
  function level outside React

## [0.2.0] — Quiz UI

### Added

- Five-question quiz flow with progress bar, animated transitions, and
  full keyboard (arrow key) navigation between options
- Zustand store for in-progress quiz answers

## [0.1.0] — Project Foundation

### Added

- Initial Vite + React + TypeScript + Tailwind CSS v4 scaffold
- shadcn/ui-convention component primitives, absolute imports, ESLint +
  Prettier, folder architecture
- Home page: navbar, hero, features section, footer
