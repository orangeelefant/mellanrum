# Changelog

## [Unreleased]
- Första versionen: startsida efter Annas förlaga, porträtt, integritetssida, tacksida, sitemap, robots.txt och llms.txt.
- Sveltia CMS på /admin för texter, priser och porträtt.
- Kontaktformulär via Worker med Turnstile och send_email, inget sparas.
- Deploy till Cloudflare Pages via GitHub Actions.
- Formulärets endpoint och Turnstile-nyckel ifyllda, förhandsadress mellanrum-9ac.pages.dev.
- CI bygger med Node 24.
- /admin loggar in via sveltia-cms-auth.mellanrum-hoglund.workers.dev.
- Ny title och description, og:image (public/og.jpg) och twitter:card.
- Egen 404-sida, okända adresser svarar 404.
- SRI-hash på CMS-skriptet, X-Frame-Options och frame-ancestors.
- Turnstile (~760 KiB) laddas när formuläret närmar sig.
- Integritetssidan kompletterad enligt GDPR art. 13 (utom lagringstid).
- DESIGN.md och TODO uppdaterade efter SEO-audit.
- Innehåll enligt Annas förlaga v2: sex tjänster, nya priser, KBT/PDT, sexologi och SAPU, varumärket Mellanrum
- Bokningsknapp i hero och kontakt, styrs av fältet Bokning i /admin (dold när länken är tom)
- Delningsbilden visar Mellanrum; DESIGN.md avvikelse 13-14 mot förlaga v2; pris 4 000 kr i CLAUDE.md
- Krisrad i kontakt, Leg.-etiketten länkar till HOSP, avbokningsregel 24 h, lagringstid 12 mån på integritetssidan (Anna godkände 26/10)
- Psykoterapikortet har Annas text om KBT/PDT, trauma, ångest och depression samt präst- och sjuksköterskebakgrund.
