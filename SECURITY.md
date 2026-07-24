# Security Policy

## Scope

GiftMatch is a static, client-only web app: no accounts, no backend, no
database, no API keys. All state (favorites, recent searches, theme) is
stored in the browser's `localStorage` and never leaves the device. This
significantly limits the attack surface compared to a typical web app, but
a few classes of issue are still relevant:

- Cross-site scripting (XSS) via unsanitized data rendered into the DOM
- Dependency vulnerabilities (`npm audit`)
- Clickjacking or other framing-based attacks on the deployed site
- Issues in the build/deploy pipeline

## Reporting a Vulnerability

If you find a security issue, please **do not open a public issue**.
Instead, use GitHub's private vulnerability reporting
(Security tab → "Report a vulnerability") on this repository, or contact
the maintainer directly. Please include:

- A description of the issue and its potential impact
- Steps to reproduce
- Affected version/commit

We'll acknowledge reports within a reasonable timeframe and keep you
updated as the issue is investigated.

## Supported Versions

As a single-branch project without formal releases yet, only the latest
commit on `main` is supported.
