# Agent instructions

- Read `CLAUDE.md` and `DESIGN.md` before any change.
- Run `npm run build` before every push. Push to `main`; the GitHub Action deploys to Cloudflare Pages.
- Every change to behavior, copy, config or dependencies adds a line under `[Unreleased]` in `CHANGELOG.md` in the same commit.
- Secrets (Cloudflare token, Turnstile secret, GitHub OAuth secret) live in GitHub Actions secrets or Worker secrets, never in the repo.
- The contact Worker must never store or log message content.

<!-- sync-webraketen-shared:start -->
## Synced files (do not edit here)

These files are owned by `webraketen-starter-1` (the `arbetsyta` design files by
webraketentwodotzero `v3/design-system/arbetsyta/`). `~/Claude/scripts/sync-webraketen-shared.sh`
overwrites them. Edit the source, push it, run the script with `--apply`, then build and
commit here. This section is written by the script.

- `src/components/WebraketenCredit.astro`
<!-- sync-webraketen-shared:end -->
