# Agent instructions

- Read `CLAUDE.md` and `DESIGN.md` before each change.
- Before each push, run `npm run build`. Push to `main`. The GitHub Action deploys to Cloudflare Pages.
- Each change to behavior, copy, config or dependencies adds one line under `[Unreleased]` in `CHANGELOG.md`. Put it in the same commit.
- Keep secrets (Cloudflare token, Turnstile secret, GitHub OAuth secret) in GitHub Actions secrets or Worker secrets. Never put them in the repo.
- The contact Worker must never store or log message content.
