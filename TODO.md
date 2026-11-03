# TODO

## Now
- [x] Sveltia CMS Authenticator + GitHub OAuth-app, fyll i `base_url` _Avbockad 2026-11-02: base_url i admin/config.yml, CMS-commits Update Hemsidans innehåll 3 dagar gamla._

## Next
- [x] Anna byter namnservrar hos Loopia till houston.ns.cloudflare.com och kami.ns.cloudflare.com _Avbockad 2026-11-02: dig NS mellanrumpsykoterapi.se svarar houston och kami.ns.cloudflare.com._
- [x] Egen domän på Pages-projektet, ta bort noindex för pages.dev-värdar (sker automatiskt via _headers) _Avbockad 2026-11-02: mellanrumpsykoterapi.se svarar 200 utan noindex, www går till apex._


## Later

## Done (recent)
- [x] API-token i Annas konto, Pages-projekt (mellanrum-9ac.pages.dev), Actions-secrets
- [x] Turnstile-widget, Worker mellanrum-kontakt.mellanrum-hoglund.workers.dev, src/config.ts ifylld
- [x] Zon mellanrumpsykoterapi.se skapad (NS houston/kami.ns.cloudflare.com), väntar på NS-byte hos Loopia

## Kräver Christoffer eller kund

- [ ] Email Routing: verifiera anna.b.hoglund@gmail.com, testa formuläret Skäl: MX pekar på Cloudflare. Annas verifiering och ett skarpt formulärprov är kvar, provet skickar mejl. _2026-11-03: Cloudflare API: anna.b.hoglund@gmail.com verifierad 2026-10-29, routing enabled/ready, regeln kontakt@ till Annas Gmail aktiv. Kvar: ett skarpt formulärprov (skickar mejl till Anna), Christoffer._
- [x] SEO-audit 2026-10-26 (65/100): frågor till Anna, krisrad, lagringstid på integritetssidan, HSTS och www vid DNS-bytet. Plan: ~/Claude/work/audits/mellanrum-2026-10-26/mellanrumpsykoterapi.se-audit/ACTION-PLAN.md Skäl: frågor till Anna, krisrad och lagringstid. HSTS är på. _Avbockad 2026-11-03: krisrad (site.json, 90101 i dist), lagringstid 12 månader på /integritet (commit 8cccd63, Annas svar), HSTS max-age=31536000 och www 301 till apex (curl). Planens punkter utan Annas fakta live: title, og:image, X-Frame-Options, CSP frame-ancestors, 404 noindex, SRI, Turnstile vid scroll. Resten av frågorna på egen rad nedan._
- [ ] Annas återstående frågor ur audit-planen: adress eller stadsdel, terapimetod och par, Google-företagsprofil, org.nr och moms. _2026-11-03: Places Text Search hittar ingen profil för Mellanrum eller Anna Höglund. Kvar: Annas svar, tas vid genomgången, Christoffer._
- [ ] Överför repot till AnnaHoglund12, uppdatera `repo` i admin/config.yml Skäl: överföring kräver Annas konto och Christoffers beslut. _2026-11-03: inget provat, överföringen är Christoffers beslut. Kvar: `gh api repos/orangeelefant/mellanrum/transfer -f new_owner=AnnaHoglund12` efter beslut, sedan `repo` i admin/config.yml, Christoffer._
- [ ] Länk till bokningstjänst om Anna vill Skäl: Annas val. _2026-11-03: inget att bygga förrän Anna valt tjänst. Kvar: Annas val, Christoffer frågar._
