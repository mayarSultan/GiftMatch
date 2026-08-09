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

## Version 2: the AI layer (in progress)

Version 1 is fully client-side. Version 2 adds an optional free-text entry
point — "My sister loves books, coffee, and plants" — as an alternative to
the five-question quiz. The design goal: **the existing
`recommendationEngine.ts` never changes.** AI only produces the same kind
of structured input the quiz already produces; scoring stays exactly as
described above.

```
free text  →  /api/parse-description  →  AiExtractedProfile  →  recommendationEngine (unchanged)
```

### Why a serverless function, not a direct client-side API call

An LLM call needs an API key. A key can never live in client-side code —
anyone can read it from the browser's network tab or bundled JS. So a
minimal serverless proxy is required: the frontend calls `/api/parse-description`
(same origin, no key needed client-side), and that function — which holds
the real key server-side — is the only thing that will eventually talk to
an LLM provider. This is a new architectural layer for GiftMatch, deployed
on Vercel (`api/` folder convention, `vercel.json` for SPA + API routing).

### Current state: real extraction, with a safety net

`api/parse-description.ts` now tries `api/_lib/geminiExtractor.ts` first —
a real call to Google's Gemini API (free tier, no credit card). If that
fails for _any_ reason (no `GEMINI_API_KEY` configured, network error,
rate limit, malformed response), it falls back to
`parseDescriptionMock.ts` instead of failing the request. This means the
feature degrades gracefully rather than breaking: worst case, someone
gets keyword-matching instead of real AI extraction, not an error page.
This fallback path is verified directly (calling the handler with no key
set returns a working `200` response); the real Gemini success path needs
a live key to test, which this environment doesn't have.

**Why Gemini and not Claude/Anthropic:** Anthropic's API has no ongoing
free tier — just a small one-time trial credit. Gemini's free tier is
actually ongoing (rate-limited, not credit-limited), which matters for a
side project that shouldn't need a payment method to keep working.

### Tags feed scoring too, not just display

`recommendationEngine.ts` accepts an optional `tags` array alongside the
usual `QuizAnswers` — each matching tag between a search and a gift adds
points (`POINTS_PER_TAG`, currently 6 — smaller than a full question
category's 15-20, since one interest tag carries less signal than a
direct quiz answer). This means a `/describe` search isn't just
`recipient`/`style` mapped onto the quiz's shape — the actual interests
someone typed ("coffee", "plants") genuinely influence ranking.

Tags travel through the same URL-based mechanism as everything else
(`quizAnswersSerializer.ts` encodes them as a `tags=coffee,plants` param
alongside the existing answer params), so a `/describe` result is exactly
as shareable and bookmarkable as a quiz result — no special-casing needed
anywhere downstream.

**A known, honest limitation:** with a 33-item catalog, some real
searches will correctly find _zero_ tag overlap — e.g. "sister who loves
coffee and plants" scores fully on `recipient` but zero on tags, because
nothing tagged `coffee` or `plants` also lists `sibling` as a valid
recipient. That's not a scoring bug, it's the catalog's current size
showing through — the fix is the same one already planned (real products,
richer tag coverage), not a change to the scoring logic itself.

### Product images: a build-time script, not a runtime dependency

`gifts.json`'s `image` field holds plain static URLs — there's no live
image API call anywhere in the deployed app. `scripts/generate-unsplash-images.cjs`
is a one-time local script: run it once with a free Unsplash API key
(`UNSPLASH_ACCESS_KEY`), it searches Unsplash for each gift's keyword and
writes the resulting photo URL directly into `gifts.json`. From that point
on, those URLs are just data — no key, no API call, no attack surface in
production.

This is deliberately simpler than the Gemini integration: because it only
ever needs to run on a developer's machine (not in response to a live
user request), it doesn't need a serverless proxy at all — the "don't
expose API keys client-side" problem that shaped the whole `/api` layer
for Gemini simply doesn't apply here.

Unsplash's terms require attribution wherever their photos are used;
`Footer.tsx` carries a sitewide "Product photos via Unsplash" credit to
satisfy that. A fully compliant production app would credit each photo's
individual photographer — worth revisiting if this becomes a real
commercial deployment; the sitewide credit is a reasonable good-faith
step for where the project is now.

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
