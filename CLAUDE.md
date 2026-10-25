# Mellanrum Höglund

Anna Höglund's one-page site for psychotherapy, supervision and training in Stockholm. Fixed-price job (4 999 kr exkl. moms). The repo moves to Anna's GitHub (AnnaHoglund12) at delivery.

## Stack
- Astro 7, static output, no client framework. All copy in `src/data/site.json`.
- Sveltia CMS at `/admin` (`public/admin/config.yml`), GitHub login via Sveltia CMS Authenticator (Worker in Anna's Cloudflare account).
- Cloudflare Pages project `mellanrum` (https://mellanrum-9ac.pages.dev, account 7b54f66e2589fa8ebaba4496dcc765dd), deployed by `.github/workflows/deploy.yml` on push to main (wrangler pages deploy).
- Contact form: `worker/` (Worker `mellanrum-kontakt`), Turnstile check, sends with the `send_email` binding to anna.b.hoglund@gmail.com. Nothing stored, observability off.
- No cookies, no analytics, system fonts.

## Commands
- `npm run dev` / `npm run build` / `npm run preview`
- Worker: `cd worker && npx wrangler deploy` with `CLOUDFLARE_API_TOKEN=$CLOUDFLARE_MELLANRUM_TOKEN` and `CLOUDFLARE_API_KEY`/`CLOUDFLARE_EMAIL` unset (the global key points at another account). Secret `TURNSTILE_SECRET`. URL https://mellanrum-kontakt.mellanrum-hoglund.workers.dev.

## Rules
- The mockup (`docs/forlaga.html`) is the spec. Any visual deviation goes in the list at the end of `DESIGN.md`.
- Copy is Anna's. Never invent facts about her education, license or prices.
- Endpoint and Turnstile site key live in `src/config.ts`.

## Done means
Build passes locally, the Pages preview shows the change, `/admin` can edit a price and the change deploys.
