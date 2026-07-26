# Installation Guide

## Requirements

- **Node.js** 18.18 or newer (Vite 8 and the ESLint flat config both require
  this). Check with `node -v`.
- **npm** 9+ (ships with Node). `pnpm`/`yarn` will also work but the lockfile
  in this repo is `package-lock.json`.

## 1. Clone the repository

```bash
git clone https://github.com/mayarSultan/GiftMatch.git
cd GiftMatch
```

## 2. Install dependencies

```bash
npm install
```

## 3. Run the dev server

```bash
npm run dev
```

Vite will print a local URL (typically `http://localhost:5173`). Open it in
a browser — hot module reload is on, so most edits appear instantly.

**Note:** this only runs the frontend. The `api/parse-description.ts`
serverless function (added in Version 2) won't respond under plain
`npm run dev` — Vite doesn't run serverless functions. To exercise the API
locally, use the Vercel CLI instead:

```bash
npm install -g vercel
vercel dev
```

This runs both the frontend and the `api/` functions together, matching
production behavior.

## 4. Verify your setup

Before making changes, confirm the toolchain is healthy:

```bash
npm run build         # type-checks and builds — should exit with no errors
npm run lint           # should report 0 problems
npm run format:check   # should report all files formatted
```

If any of these fail on a fresh clone, please open an issue.

## Building for production

```bash
npm run build
```

Output goes to `dist/`. Preview the frontend locally with:

```bash
npm run preview
```

(`npm run preview` won't serve `api/` functions either — same caveat as
`npm run dev` above; use `vercel dev` if you need to test the API.)

This app is built for **Vercel** specifically as of Version 2 — the
`api/` folder is Vercel's serverless function convention, and `vercel.json`
handles SPA routing (so deep links like `/results?occasion=...` don't 404
on refresh) alongside API routing. Deploying elsewhere would mean either
porting `api/parse-description.ts` to that host's function format, or
running it as a separate small backend service.

## Troubleshooting

**`git bash` says `fatal: not a git repository`**
You're not inside the project folder. Right-click the folder in your file
explorer and choose "Git Bash Here," or `cd` to the correct path.

**`pip`/`npm install --break-system-packages` errors, permission errors**
Not applicable — this is a pure Node/npm project, no Python involved.

**Port 5173 already in use**
Another Vite dev server is running. Either stop it, or run
`npm run dev -- --port 5174`.

**Dark mode flashes light before switching**
This means `localStorage` is unavailable (private browsing, or storage
blocked) — the app falls back to light mode in that case, which is expected.

**Calling `/api/parse-description` returns a 404 or HTML instead of JSON**
You're running `npm run dev` instead of `vercel dev` — see step 3 above.

## Environment variables

Version 1 needed none. Version 2 introduces `api/parse-description.ts`,
which as of Phase 1 uses a deterministic mock and _still_ needs no
environment variables. `.env.example` documents `ANTHROPIC_API_KEY` ahead
of Phase 2, which will make it required — copy it to `.env.local` and fill
in a real key once that lands. Never commit a real `.env` file; `.gitignore`
already excludes them.
