# Mellanrum

Anna Höglund's one-page site for psychotherapy, supervision and training in Stockholm. It is a fixed-price job: 4 000 kr (excluding VAT), lowered from 4 999 on 2026-10-26. The booking button is included. At delivery, the repo moves to Anna's GitHub (AnnaHoglund12).

## Stack
- Astro 7, static output, no browser-side framework. All copy is in `src/data/site.json`.
- Sveltia CMS at `/admin` (`public/admin/config.yml`). The GitHub login uses Sveltia CMS Authenticator (a Worker in Anna's Cloudflare account).
- Cloudflare Pages project `mellanrum` (https://mellanrum-9ac.pages.dev, account 7b54f66e2589fa8ebaba4496dcc765dd). `.github/workflows/deploy.yml` deploys it on each push to main (wrangler pages deploy).
- Contact form: `worker/` (Worker `mellanrum-kontakt`). It does a Turnstile check and sends with the `send_email` binding to anna.b.hoglund@gmail.com. It stores nothing. Observability is off.
- No cookies, no analytics, system fonts.

## Commands
- `npm run dev` / `npm run build` / `npm run preview` / `npm test` (Worker, no network)
- Worker: `cd worker && npx wrangler deploy`. Set `CLOUDFLARE_API_TOKEN=$CLOUDFLARE_MELLANRUM_TOKEN` and `CLOUDFLARE_ACCOUNT_ID=7b54f66e2589fa8ebaba4496dcc765dd` (the default account ID in the shell is for another account). Unset `CLOUDFLARE_API_KEY` and `CLOUDFLARE_EMAIL` (the global key points at another account). The secret is `TURNSTILE_SECRET`. The URL is https://mellanrum-kontakt.mellanrum-hoglund.workers.dev.

## Rules
- The mockup (`docs/forlaga.html`) is the spec. Write each visual deviation in the list at the end of `DESIGN.md`.
- The copy is Anna's. Never invent facts about her education, license or prices.
- The endpoint and the Turnstile site key are in `src/config.ts`.

## Done means
The build passes locally, the Pages preview shows the change, `/admin` can edit a price and the change deploys.
