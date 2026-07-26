# Changelog

All notable changes to this project are documented here. Format loosely
follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

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
