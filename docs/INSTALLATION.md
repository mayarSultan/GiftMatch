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

Output goes to `dist/`. Preview it locally with:

```bash
npm run preview
```

`dist/` is a static site — no server-side rendering, no API. It can be
hosted on any static host (Vercel, Netlify, GitHub Pages, Cloudflare Pages,
S3 + CloudFront, etc.). Since it uses client-side routing
(`react-router-dom`'s `BrowserRouter`), your host needs to rewrite unknown
paths back to `index.html` — most static hosts do this automatically for
SPAs, but check your host's docs if deep links (e.g. sharing a `/results?...`
link) 404 on refresh.

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

## No environment variables required

GiftMatch has no backend, no API keys, and no `.env` file — everything runs
client-side against the local gift catalog in `src/data/gifts.json`.
