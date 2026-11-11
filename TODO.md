# Task list

## Now
- [x] Sveltia CMS Authenticator and GitHub OAuth app. Fill in `base_url`. _Checked 2026-11-02: `base_url` is in admin/config.yml. The CMS commits "Update Hemsidans innehåll" are 3 days old._

## Next
- [x] Anna changes the nameservers at Loopia to houston.ns.cloudflare.com and kami.ns.cloudflare.com. _Checked 2026-11-02: dig NS mellanrumpsykoterapi.se answers houston and kami.ns.cloudflare.com._
- [x] Own domain on the Pages project. Remove noindex for pages.dev hosts (happens automatically through _headers). _Checked 2026-11-02: mellanrumpsykoterapi.se answers 200 without noindex. www goes to the apex._


## Later

## Done (recent)
- [x] API token in Anna's account, Pages project (mellanrum-9ac.pages.dev), Actions secrets
- [x] Turnstile widget, Worker mellanrum-kontakt.mellanrum-hoglund.workers.dev, src/config.ts filled in
- [x] Zone mellanrumpsykoterapi.se created (NS houston/kami.ns.cloudflare.com). It waits for the NS change at Loopia.

## Needs Christoffer or the customer

- [ ] Email Routing: make sure anna.b.hoglund@gmail.com is verified. Test the form. Reason: MX points at Cloudflare. Anna's verification and a live form test remain. The test sends an email. _2026-11-03: Cloudflare API: anna.b.hoglund@gmail.com verified 2026-10-29, routing enabled and ready, the rule kontakt@ to Anna's Gmail is active. Remaining: one live form test (sends an email to Anna), Christoffer._
- [x] SEO audit 2026-10-26 (65/100): questions to Anna, crisis line, retention time on the privacy page, HSTS and www at the DNS change. Plan: ~/Claude/work/audits/mellanrum-2026-10-26/mellanrumpsykoterapi.se-audit/ACTION-PLAN.md Reason: questions to Anna, crisis line and retention time. HSTS is on. _Checked 2026-11-03: crisis line (site.json, 90101 in dist). Retention time 12 months on /integritet (commit 8cccd63, Anna's answer). HSTS max-age=31536000 and www 301 to the apex (curl). Plan items without Anna's facts that are live: title, og:image, X-Frame-Options, CSP frame-ancestors, 404 noindex, SRI, Turnstile on scroll. The other questions are on their own line below._
- [ ] Anna's open questions from the audit plan. Topics: address or district, therapy method and couples, Google business profile, org.nr and VAT. _2026-11-03: Places Text Search finds no profile. It searched Mellanrum and Anna Höglund. Open: Anna's answers. Christoffer asks at the review._
- [ ] Transfer the repo to AnnaHoglund12. Change `repo` in admin/config.yml. Reason: the transfer needs Anna's account and Christoffer's decision. _2026-11-03: not tested. The transfer is Christoffer's decision. Remaining: after the decision, run `gh api repos/orangeelefant/mellanrum/transfer -f new_owner=AnnaHoglund12`, then change `repo` in admin/config.yml, Christoffer._
- [ ] Link to a booking service, if Anna wants it. Reason: Anna's choice. _2026-11-03: nothing to build until Anna chooses a service. Remaining: Anna's choice, Christoffer asks._
