# Architecture

This document explains how GiftMatch is put together and why, for anyone
picking up the codebase for the first time.

## Guiding principle: separate UI from logic

The rule enforced throughout: **pages compose, hooks/stores hold state,
utils hold pure logic.** A page component should read like a table of
contents, not an implementation. Concretely:

- `src/pages/*.tsx` — route-level composition only. No `useState` beyond
  what's trivially local, no business logic, no fetch/compute calls beyond
  a single hook invocation.
- `src/hooks/*.ts` — derive state a page needs from one or more stores
  (e.g. `useQuizNavigation`, `useQuizResults`). This is where the "which
  category matched" or "can the person click Next" decisions live.
- `src/store/*.ts` — Zustand stores. Each one owns exactly one concern
  (quiz progress, favorites, recent searches, theme). None of them contain
  scoring or matching logic.
- `src/utils/*.ts` — pure, framework-independent functions. No React
  imports. This is where `recommendationEngine.ts` lives, and it's
  deliberately structured so it could be unit-tested or reused outside
  React entirely.

## The recommendation engine

`src/utils/recommendationEngine.ts` is the core of the product and the
one piece of business logic everything else defers to.

- **Input:** `QuizAnswers` (a partial map of question → answer) and the
  gift catalog.
- **Scoring, not branching:** each of the five questions (occasion,
  recipient, style, budget, age) has a point weight and a matcher function,
  both keyed in lookup tables (`CATEGORY_WEIGHTS`, `CATEGORY_MATCHERS`).
  Scoring a gift is one `reduce()` over those tables — not a chain of
  `if/else` per category. Adding a sixth question later means adding one
  entry to each table, not touching the scoring logic.
- **Output:** `ScoredGift[]`, sorted highest-first, including which
  categories matched (`matchedCategories`) — used to generate the
  human-readable "Matches your occasion and budget" reason text on the
  results page.
- **Pure:** same input always produces the same output. No side effects,
  no React, no I/O. This is what makes shareable result links possible —
  see below.

## Results are URL-driven, not store-driven

This is the most important routing decision in the app. When the quiz
finishes, GiftMatch doesn't just show results from in-memory state — it
navigates to `/results?occasion=birthday&recipient=friend&...`
(`src/utils/quizAnswersSerializer.ts` handles the encode/decode). The
results page (`useQuizResults`) reads answers from the URL via
`useSearchParams`, not from the quiz store.

**Why this matters:** because the engine is pure, decoding the same
answers from a URL and recomputing recommendations always reproduces the
exact same results. That's what makes "Share" and "Copy link" actually
work — the link _is_ the state, not a pointer to some server-side session
that will eventually expire.

The quiz-taking flow itself still uses `useQuizStore` (Zustand, not
persisted) for the in-progress answers while someone is clicking through
questions — that's genuinely ephemeral UI state and doesn't belong in the
URL until the quiz is done.

## State management: what lives where, and why

| State                    | Where                    | Persisted?           | Why                                                                                                           |
| ------------------------ | ------------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------- |
| In-progress quiz answers | `useQuizStore`           | No                   | Ephemeral — done once the quiz finishes                                                                       |
| Completed quiz results   | URL search params        | N/A (it's the URL)   | Shareable, bookmarkable, reproducible                                                                         |
| Favorites                | `useFavoritesStore`      | Yes (`localStorage`) | Should survive a refresh; no backend, no auth                                                                 |
| Recent searches          | `useRecentSearchesStore` | Yes (`localStorage`) | Same reasoning; stores only _answers_, not cached results, so they stay accurate if the catalog changes later |
| Theme (light/dark)       | `useThemeStore`          | Yes (`localStorage`) | Preference should persist across visits                                                                       |

All persisted stores use Zustand's `persist` middleware. There's no
authentication anywhere in the app — persistence is per-browser, not
per-account.

## Routing and layouts

Two layouts, sharing one transition/focus primitive:

- **`MarketingLayout`** (`Navbar` + content + `Footer`) — home, favorites, 404. Full chrome, meant for browsing.
- **`FocusedLayout`** (minimal top bar, no footer) — quiz and results.
  Deliberately less chrome, to reduce distraction during the funnel.

Both wrap their `<Outlet />` in `PageTransition`
(`src/components/shared/PageTransition.tsx`), which owns three things in
one place: the app's single `<main>` landmark, the fade/slide transition
between routes, and focus management (`useRouteFocus` moves keyboard focus
to the new page's `<main>` on navigation, skipping only the very first
paint of the whole app — see the comment in that hook for why this needed
a module-scoped flag instead of a per-instance one).

Every page is lazy-loaded (`React.lazy` + `Suspense` in `App.tsx`), so each
route ships as its own JS chunk fetched on navigation, not bundled into
one monolithic file.

## Data: the gift catalog

`src/data/gifts.json` is a flat array of ~33 gift records — genuinely a
static "database" file, not a TypeScript literal, so it could later be
swapped for a real API response without touching its consumers.
`src/data/gifts.ts` is the _only_ file that imports the raw JSON; every
other module imports `giftCatalog` from there. If this ever becomes a real
network call, that's the one file that changes.

## What's deliberately not here

- **No SSR / prerendering** — this is a pure client-rendered SPA. Static
  `index.html` meta tags cover the home-page Open Graph case; per-result
  dynamic OG previews (e.g. a shared results link showing "5 gifts for a
  friend's birthday" in a social preview) would need SSR, since most link
  crawlers don't execute JavaScript. Documented as a known gap, not
  silently glossed over.
- **No backend, no auth, no analytics** — everything here runs in the
  browser against a static catalog. That's a scope decision, not an
  oversight.
