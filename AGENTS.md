# Agent instructions

- Read `CLAUDE.md` and `DESIGN.md` before any change.
- Run `npm run build` before every push. Push to `main`; the GitHub Action deploys to Cloudflare Pages.
- Every change to behavior, copy, config or dependencies adds a line under `[Unreleased]` in `CHANGELOG.md` in the same commit.
- Secrets (Cloudflare token, Turnstile secret, GitHub OAuth secret) live in GitHub Actions secrets or Worker secrets, never in the repo.
- The contact Worker must never store or log message content.

