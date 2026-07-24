# Contributing to GiftMatch

Thanks for considering a contribution. This project follows the
architecture described in [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md)
— please skim it before making structural changes.

## Before you start

- For anything beyond a small fix, open an issue first to discuss the
  approach. Saves everyone a rewritten PR.
- Check `docs/ARCHITECTURE.md` for where new code should live — in
  particular, business logic belongs in `src/utils/`, not in page
  components or JSX.

## Setup

See [`docs/INSTALLATION.md`](./docs/INSTALLATION.md).

## Branch naming

```
feat/short-description       new feature
fix/short-description        bug fix
docs/short-description       documentation only
refactor/short-description   no behavior change
```

## Commit messages

This repo loosely follows [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add gift filtering by price range
fix: correct budget tier boundary at $50
docs: clarify installation steps for Windows
refactor: extract useQuizNavigation from QuizPage
```

## Before opening a pull request

Run all three — a PR won't be merged if any of these fail:

```bash
npm run build          # type-checks and builds
npm run lint            # 0 errors, 0 warnings
npm run format:check    # all files match Prettier formatting
```

If you touched `src/utils/recommendationEngine.ts` or anything it depends
on, please also manually verify a few quiz combinations still return
sensible results — there's no test suite yet (see "Known gaps" below).

## Code style

- TypeScript strict mode is on — don't add `any` casts without a comment
  explaining why.
- Absolute imports (`@/...`) instead of relative `../../..` chains.
- Keep files small and single-purpose. If a component is doing two
  unrelated things, split it.
- No business logic in page components (`src/pages/`) — see
  `docs/ARCHITECTURE.md`.

## Known gaps / good first contributions

- No automated test suite yet — Vitest + React Testing Library would be a
  natural fit given the existing pure-function architecture.
- No SSR/prerendering, so shared result links don't get dynamic Open Graph
  previews (see `docs/ARCHITECTURE.md`'s "What's deliberately not here").
- No CI beyond lint/build (see `.github/workflows/ci.yml`) — no test job
  yet, since there's nothing to run.

## Code of Conduct

By participating, you agree to abide by the
[Code of Conduct](./CODE_OF_CONDUCT.md).
