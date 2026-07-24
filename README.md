# GiftMatch

**Find the perfect gift in under a minute.**

GiftMatch is a quiz-driven gift recommendation app. Answer five quick
questions — occasion, recipient, age, budget, style — and a scoring engine
matches you against a catalog of gift ideas, ranked and explained.

No account. No backend. No tracking. Everything runs in the browser.

## Features

- **Five-question quiz** with a progress bar, animated transitions, and full
  keyboard support (arrow keys navigate options, same as native radio inputs)
- **Scoring-based recommendation engine** — pure, framework-independent
  TypeScript, unit-testable without React
- **Shareable results** — the quiz answers live in the URL
  (`/results?occasion=birthday&recipient=friend&...`), so a shared link
  reproduces the exact same matches for whoever opens it
- **Favorites & recent searches**, persisted locally — no account required
- **Dark mode**, with no flash of the wrong theme on load
- **Route-level code splitting** — every page ships as its own chunk

See [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) for how it's built.

## Tech stack

React · TypeScript · Vite · Tailwind CSS v4 · shadcn/ui conventions ·
React Router · Zustand · Framer Motion · Lucide icons

## Quick start

```bash
git clone https://github.com/mayarSultan/GiftMatch.git
cd GiftMatch
npm install
npm run dev
```

Full setup instructions, requirements, and troubleshooting:
[`docs/INSTALLATION.md`](./docs/INSTALLATION.md).

## Scripts

| Command                | What it does                             |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start the dev server with hot reload     |
| `npm run build`        | Type-check and build for production      |
| `npm run preview`      | Preview the production build locally     |
| `npm run lint`         | Run ESLint                               |
| `npm run format`       | Format the codebase with Prettier        |
| `npm run format:check` | Check formatting without writing changes |

## Project structure

```
src/
├── components/    # Reusable UI (ui/, quiz/, results/, shared/)
├── pages/         # Route-level components — composition only, no logic
├── layouts/       # MarketingLayout (nav+footer) / FocusedLayout (quiz funnel)
├── hooks/         # Reusable stateful logic, one concern per hook
├── store/         # Zustand stores — quiz progress, favorites, recent searches, theme
├── utils/         # Framework-independent pure functions
├── data/          # Static content, including the gift catalog (gifts.json)
├── types/         # Shared TypeScript types
└── styles/        # Design tokens (globals.css)
```

Full breakdown of _why_ it's organized this way, including the
recommendation engine's design: [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md).

## Contributing

Contributions are welcome — see [`CONTRIBUTING.md`](./CONTRIBUTING.md) for
branch naming, commit conventions, and the checklist to run before opening
a PR. Please also read the [Code of Conduct](./CODE_OF_CONDUCT.md).

## Security

No accounts, no backend, no sensitive data leaves the browser. See
[`SECURITY.md`](./SECURITY.md) for how to report a vulnerability.

## License

[MIT](./LICENSE) © Mayar Sultan
