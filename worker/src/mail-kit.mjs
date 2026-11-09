// Webraketens mejlkit. Källa: webraketen-starter-1. Synkas till alla sajter; ändra bara här.
// Varje mall returnerar { subject, preheader, html, text, replyTo, headers }.
// Inga beroenden. Inga kopior (bcc/cc) till Webraketen: beslut 2026-11-09.

export const SVARSTID = 'inom en arbetsdag';

// ---------- Tema ----------
// Tema byggs ur sajtens DESIGN.md och ligger i netlify/functions/_mail-theme.mjs (export default { ... }).
// logo/logoDark: { src (absolut PNG-url), width, height }. logoDark visas i mörkt läge där klienten stöder det.
const BAS = {
  name: 'Webraketen', brand: '#2b50ff', ink: '#141414', muted: '#5f5f5a', bg: '#f4f4f2',
  surface: '#ffffff', line: '#e3e3df', fontBody: 'Arial, Helvetica, sans-serif',
  fontHead: null, fontHref: null, logo: null, phone: '', email: '', web: '', orgnr: '', lang: 'sv', valuta: 'SEK',
};

export function tema(t = {}) {
  const x = { ...BAS, ...t };
  x.fontHead = x.fontHead || x.fontBody;
  x.onBrand = kontrast(x.brand, '#ffffff') >= 4.5 ? '#ffffff' : x.ink;
  x.brandDark = blanda(x.brand, '#ffffff', kontrast(x.brand, '#161616') >= 4.5 ? 0 : 0.45);
  return x;
}

function hex(c) { const h = c.replace('#', ''); const f = h.length === 3 ? [...h].map((v) => v + v).join('') : h; return [0, 2, 4].map((i) => parseInt(f.slice(i, i + 2), 16)); }
function lum(c) { return hex(c).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }).reduce((a, v, i) => a + v * [0.2126, 0.7152, 0.0722][i], 0); }
export function kontrast(a, b) { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); }
function blanda(a, b, t) { const [p, q] = [hex(a), hex(b)]; return '#' + p.map((v, i) => Math.round(v + (q[i] - v) * t).toString(16).padStart(2, '0')).join(''); }

// ---------- Språk ----------
// Svenska är standard. lang: 'en' används av makeeuropesafeagain, uaehandbook och webrocket-ae.
const ORD = {
  sv: { svarstid: SVARSTID_SV(), tack: 'Tack', tackFor: (v) => `Tack för din ${v}`, fatt: (v, om) => `Vi har fått din ${v}${om}`, svarar: 'och svarar', sa: 'Så går det till', skickade: 'Det här skickade du', andra: 'Vill du ändra något? Svara på det här mejlet', ring: 'eller ring', varfor: (v, w) => `Du får mejlet för att du skickade en ${v} på ${w}`, arende: 'ärende', steg: (tel) => ['Vi läser igenom det du skickat.', tel ? `Vi svarar på mejl eller ringer från ${tel}.` : 'Vi svarar på mejl.', 'Behöver vi veta mer frågar vi i svaret.'], svarPre: (x) => `Du får svar ${x}.`, ordfragor: 'Frågor om ordern? Svara på det här mejlet.', st: 'st', summa: 'Summa', frakt: 'Frakt', rabatt: 'Rabatt', att: 'Att betala', moms: 'Varav moms', leverans: 'Leverans', giltig: 'giltig till', Giltig: 'Giltig till', for: 'för', kopiera: 'Fungerar inte knappen? Kopiera länken:', avreg: (u, c) => `Vill du inte få fler mejl från oss? <a href="${u}" style="color:${c}">Avregistrera dig</a> så slutar vi.`, avregText: 'Avregistrera dig', org: 'Org.nr' },
  en: { svarstid: 'within one working day', tack: 'Thank you', tackFor: (v) => `Thank you for your ${v}`, fatt: (v, om) => `We have received your ${v}${om}`, svarar: 'and will reply', sa: 'What happens next', skickade: 'What you sent', andra: 'Want to change something? Reply to this email', ring: 'or call', varfor: (v, w) => `You get this email because you sent a ${v} on ${w}`, arende: 'reference', steg: (tel) => ['We read what you sent.', tel ? `We reply by email or call from ${tel}.` : 'We reply by email.', 'If we need more details, we ask in the reply.'], svarPre: (x) => `You will hear from us ${x}.`, ordfragor: 'Questions about your order? Reply to this email.', st: 'pcs', summa: 'Subtotal', frakt: 'Shipping', rabatt: 'Discount', att: 'Total', moms: 'Incl. VAT', leverans: 'Delivery', giltig: 'valid until', Giltig: 'Valid until', for: 'for', kopiera: 'Button not working? Copy the link:', avreg: (u, c) => `Don't want more emails from us? <a href="${u}" style="color:${c}">Unsubscribe</a> and we stop.`, avregText: 'Unsubscribe', org: 'Company no.' },
};
function SVARSTID_SV() { return 'inom en arbetsdag'; }
const L = (t) => ORD[t.lang] || ORD.sv;
const LOC = (t) => (t.lang === 'en' ? 'en-GB' : 'sv-SE');
// Belopp i temats valuta. SEK skrivs "1 057 kr", andra valutor med Intl (t.ex. €29.00).
export function pengar(t, n) {
  if (!t.valuta || t.valuta === 'SEK') return sv.kr(n);
  return new Intl.NumberFormat(LOC(t), { style: 'currency', currency: t.valuta }).format(n);
}
const datumL = (t, d) => (t.lang === 'en' ? new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Europe/Stockholm' }).format(new Date(d)) : sv.datum(d));

// ---------- Svensk formatering ----------
const TZ = 'Europe/Stockholm';
export const sv = {
  datum: (d) => new Intl.DateTimeFormat('sv-SE', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', timeZone: TZ }).format(new Date(d)).replace('.', ''),
  tid: (d) => { const t = new Date(d); return `${sv.datum(t)} kl. ${new Intl.DateTimeFormat('sv-SE', { hour: '2-digit', minute: '2-digit', timeZone: TZ }).format(t)}`; },
  tal: (n, dec = 0) => new Intl.NumberFormat('sv-SE', { minimumFractionDigits: dec, maximumFractionDigits: dec }).format(n).replace(/[\u00a0\u202f]/g, ' ').replace('−', '-'),
  kr: (n) => `${sv.tal(n, Number.isInteger(n) ? 0 : 2)} kr`,
  procent: (n) => `${sv.tal(n, Math.abs(n) < 10 && !Number.isInteger(n) ? 1 : 0)} %`,
  telefon(raw) {
    const d = String(raw || '').replace(/[^\d+]/g, '');
    if (!d) return null;
    const nat = d.startsWith('+46') ? '0' + d.slice(3) : d.startsWith('0046') ? '0' + d.slice(4) : d;
    const e164 = nat.startsWith('0') ? '+46' + nat.slice(1) : d;
    let vis = nat;
    if (/^07\d{8}$/.test(nat)) vis = `${nat.slice(0, 3)}-${nat.slice(3, 6)} ${nat.slice(6, 8)} ${nat.slice(8)}`;
    else if (/^0\d{8,9}$/.test(nat)) { const r = nat.startsWith('08') ? 2 : 3; const rest = nat.slice(r); vis = `${nat.slice(0, r)}-${rest.replace(/(\d{2,3})(\d{2})(\d{2})$/, '$1 $2 $3')}`; }
    return { vis, href: `tel:${e164}` };
  },
};

// ---------- Fält: etiketter, värden, filter ----------
const DOLJ = /^(cf-turnstile|turnstile|g-recaptcha|h-captcha|token|bot-field|honeypot|website_url|form-name|form_name|steg|step|source|kalla|källa|utm_|gclid|fbclid|msclkid|referrer|consent|samtycke|gdpr|_)/i;
export const ETIKETTER = {
  namn: 'Namn', name: 'Namn', fornamn: 'Förnamn', efternamn: 'Efternamn', telefon: 'Telefon', phone: 'Telefon', tel: 'Telefon',
  epost: 'E-post', email: 'E-post', foretag: 'Företag', company: 'Företag', orgnr: 'Org.nr',
  adress: 'Adress', address: 'Adress', gatuadress: 'Adress', postnummer: 'Postnummer', zip: 'Postnummer', ort: 'Ort', city: 'Ort',
  tjanst: 'Tjänst', service: 'Tjänst', datum: 'Önskat datum', startdate: 'Önskat startdatum', preferreddate: 'Önskat datum', date: 'Önskat datum',
  bostadsyta: 'Bostadsyta', yta: 'Yta', size: 'Bostadsyta', kvm: 'Yta', rum: 'Antal rum', rooms: 'Antal rum',
  frekvens: 'Hur ofta', frequency: 'Hur ofta', frequencyother: 'Hur ofta (annat)', fonster: 'Antal fönster', windows: 'Antal fönster',
  meddelande: 'Meddelande', message: 'Meddelande', ovrigt: 'Övrigt', url: 'Webbplats', budget: 'Budget', antal: 'Antal',
  homesize: 'Bostadsstorlek', streetaddress: 'Adress', postalcode: 'Postnummer', cleaningfrequency: 'Hur ofta', 'project-type': 'Typ av projekt', projekttyp: 'Typ av projekt', area: 'Ungefärlig yta',
};
const VARDEN = {
  'en-gang': 'En gång', 'en-gang-i-veckan': 'Varje vecka', 'varannan-vecka': 'Varannan vecka', 'en-gang-i-manaden': 'En gång i månaden',
  manad: 'En gång i månaden', vecka: 'Varje vecka', on: 'Ja', true: 'Ja', false: 'Nej', yes: 'Ja', no: 'Nej',
};
const TOM = new Set(['', '-', '–', 'null', 'undefined', 'saknas', 'n/a']);
const ISO = /^\d{4}-\d{2}-\d{2}(T[\d:.]+Z?)?$/;

function etikett(nyckel, egna) {
  const k = nyckel.toLowerCase().replace(/[^a-zåäö0-9]/g, '');
  // Object.hasOwn: ett formulärfält som heter constructor eller toString får aldrig Object-prototypens funktion.
  if (egna && Object.hasOwn(egna, nyckel)) return egna[nyckel];
  if (Object.hasOwn(ETIKETTER, k)) return ETIKETTER[k];
  console.warn(`[mail-kit] okänd fältnyckel "${nyckel}", lägg till en etikett`);
  const ord = nyckel.replace(/([a-zåäö])([A-ZÅÄÖ])/g, '$1 $2').replace(/[-_]+/g, ' ').trim().toLowerCase();
  return ord.charAt(0).toUpperCase() + ord.slice(1);
}

function varde(nyckel, v) {
  if (Array.isArray(v)) v = v.filter((x) => !TOM.has(String(x).trim().toLowerCase())).join(', ');
  const s = String(v ?? '').trim();
  if (TOM.has(s.toLowerCase())) return null;
  const k = nyckel.toLowerCase();
  if (ISO.test(s)) return s.length > 10 ? sv.tid(s) : sv.datum(s);
  if (Object.hasOwn(VARDEN, s.toLowerCase())) return VARDEN[s.toLowerCase()];
  if (/yta|size|kvm/.test(k)) {
    const m = s.match(/^(under|over|över)?-?(\d+)(?:-(\d+))?$/i);
    if (m) return m[3] ? `${m[2]}–${m[3]} m²` : `${m[1] ? (m[1].toLowerCase() === 'under' ? 'Under ' : 'Över ') : ''}${m[2]} m²`;
  }
  if (/^[a-z0-9]+(-[a-z0-9]+)+$/.test(s)) { const t = s.replace(/-/g, ' '); return t.charAt(0).toUpperCase() + t.slice(1); }
  return s;
}

// falt: objekt i formulärets ordning. Returnerar [{ etikett, varde, href? }] utan tomma och tekniska rader.
export function rader(falt = {}, egna = {}) {
  const ut = [];
  for (const [k, v] of Object.entries(falt)) {
    if (DOLJ.test(k)) continue;
    const val = varde(k, v);
    if (val == null) continue;
    const rad = { etikett: etikett(k, egna), varde: val };
    if (/^(telefon|phone|tel)$/i.test(k)) { const t = sv.telefon(val); if (t) Object.assign(rad, { varde: t.vis, href: t.href }); }
    if (/^(epost|email)$/i.test(k)) rad.href = `mailto:${val}`;
    ut.push(rad);
  }
  return ut;
}

// ---------- HTML-byggstenar ----------
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const nl2br = (s) => esc(s).replace(/\r?\n/g, '<br>');

function skal(t, { subject, preheader, innehall, fot, enkel = false }) {
  const font = t.fontHref ? `<link href="${esc(t.fontHref)}" rel="stylesheet">` : '';
  const bild = (l, klass, extra = '') => `<img class="${klass}" src="${esc(l.src)}" width="${l.width}" height="${l.height}" alt="${esc(t.name)}" style="display:block;border:0;height:auto;max-width:${l.width}px${extra}">`;
  const logga = t.logo
    ? bild(t.logo, 'wr-logo-ljus') + (t.logoDark ? bild(t.logoDark, 'wr-logo-mork', ';display:none;max-height:0;overflow:hidden;mso-hide:all') : '')
    : `<span class="wr-ink" style="font-family:${t.fontHead};font-size:20px;font-weight:700;color:${t.ink};letter-spacing:-0.01em">${esc(t.name)}</span>`;
  const huvud = enkel ? '' : `<tr><td style="padding:0 4px 20px">${t.web ? `<a href="https://${esc(t.web)}" style="text-decoration:none">${logga}</a>` : logga}</td></tr>`;
  const kort = enkel
    ? `<tr><td class="wr-ink" style="font-family:${t.fontBody};font-size:16px;line-height:1.6;color:${t.ink};padding:4px">${innehall}</td></tr>`
    : `<tr><td class="wr-card" style="background:${t.surface};border:1px solid ${t.line};border-top:3px solid ${t.brand};border-radius:10px;padding:32px 32px 28px;font-family:${t.fontBody};font-size:16px;line-height:1.55;color:${t.ink}">${innehall}</td></tr>`;
  return `<!doctype html><html lang="${t.lang === 'en' ? 'en' : 'sv'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light dark"><meta name="supported-color-schemes" content="light dark"><title>${esc(subject)}</title>${font}
<style>
:root{color-scheme:light dark}
a{color:${t.brand}}
.wr-num{font-variant-numeric:tabular-nums}
@media (max-width:620px){.wr-card{padding:24px 20px!important}.wr-btn{display:block!important;text-align:center!important;margin:0 0 10px!important}.wr-lbl,.wr-val{display:block!important;width:auto!important;padding:0!important}.wr-lbl{padding-top:12px!important}}
@media (prefers-color-scheme:dark){
.wr-bg{background:#121212!important}.wr-card{background:#1c1c1c!important;border-color:#333!important;border-top-color:${t.brandDark}!important}
.wr-ink{color:#ececec!important}.wr-muted{color:#a8a8a8!important}.wr-line{border-color:#333!important}
.wr-soft{background:#262626!important;color:#ececec!important}.wr-logo-ljus{display:none!important}.wr-logo-mork{display:block!important;max-height:none!important}a{color:${t.brandDark}!important}a.wr-btn{color:${t.brandDark}!important}a.wr-btn:first-child{color:${t.onBrand}!important}
}
</style></head>
<body class="wr-bg" style="margin:0;padding:0;background:${enkel ? t.surface : t.bg};-webkit-text-size-adjust:100%">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all">${esc(preheader)}&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;&#8199;&#847;</div>
<table role="presentation" class="wr-bg" width="100%" cellpadding="0" cellspacing="0" style="background:${enkel ? t.surface : t.bg}"><tr><td align="center" style="padding:28px 12px 36px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:${enkel ? 560 : 600}px">
${huvud}${kort}
${fot ? `<tr><td class="wr-muted" style="padding:18px 6px 0;font-family:${t.fontBody};font-size:13px;line-height:1.55;color:${t.muted}">${fot}</td></tr>` : ''}
</table></td></tr></table></body></html>`;
}

const h1 = (t, s) => `<h1 class="wr-ink" style="margin:0 0 8px;font-family:${t.fontHead};font-size:24px;line-height:1.25;font-weight:700;letter-spacing:-0.015em;color:${t.ink}">${s}</h1>`;
const h2 = (t, s) => `<h2 class="wr-ink" style="margin:28px 0 8px;font-family:${t.fontHead};font-size:17px;line-height:1.3;font-weight:700;color:${t.ink}">${s}</h2>`;
const p = (t, s, muted = false) => `<p class="${muted ? 'wr-muted' : 'wr-ink'}" style="margin:0 0 14px;color:${muted ? t.muted : t.ink}">${s}</p>`;

function knappar(t, lista) {
  const a = lista.filter(Boolean).map((k, i) => {
    const prim = i === 0;
    return `<a class="wr-btn" href="${esc(k.href)}" style="display:inline-block;margin:0 8px 10px 0;padding:12px 20px;border-radius:8px;border:1.5px solid ${t.brand};background:${prim ? t.brand : 'transparent'};font-family:${t.fontBody};font-size:16px;font-weight:600;line-height:1.2;color:${prim ? t.onBrand : t.brand};text-decoration:none">${esc(k.text)}</a>`;
  }).join('');
  return `<div style="margin:20px 0 6px">${a}</div>`;
}

function tabell(t, lista) {
  if (!lista.length) return '';
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 4px;border-collapse:collapse">${lista.map((r) => `<tr><td class="wr-lbl wr-muted wr-line" valign="top" style="width:38%;padding:10px 12px 10px 0;border-top:1px solid ${t.line};font-size:14px;color:${t.muted}">${esc(r.etikett)}</td><td class="wr-val wr-ink wr-line wr-num" valign="top" style="padding:10px 0;border-top:1px solid ${t.line};font-size:16px;color:${t.ink}">${r.href ? `<a href="${esc(r.href)}" style="color:${t.brand}">${esc(r.varde)}</a>` : nl2br(r.varde)}</td></tr>`).join('')}</table>`;
}

const citat = (t, s) => `<div class="wr-soft wr-ink" style="white-space:pre-wrap;margin:8px 0 4px;padding:14px 16px;background:${blanda(t.brand, '#ffffff', 0.93)};border-radius:8px;font-size:16px;line-height:1.6;color:${t.ink}">${nl2br(s)}</div>`;

function kontaktFot(t, varfor) {
  const tel = sv.telefon(t.phone);
  const bitar = [esc(t.name), tel && `<a href="${tel.href}" style="color:${t.muted}">${tel.vis}</a>`, t.email && `<a href="mailto:${esc(t.email)}" style="color:${t.muted}">${esc(t.email)}</a>`, t.web && `<a href="https://${esc(t.web)}" style="color:${t.muted}">${esc(t.web)}</a>`].filter(Boolean);
  return `${bitar.join(' · ')}${t.orgnr ? `<br>${L(t).org} ${esc(t.orgnr)}` : ''}${varfor ? `<br>${esc(varfor)}` : ''}`;
}

// Textversion byggd ur samma modell som html.
const textRader = (lista) => lista.map((r) => `${r.etikett}: ${String(r.varde).replace(/\n/g, '\n  ')}`).join('\n');
function textFot(t) { const tel = sv.telefon(t.phone); return ['--', t.name, tel?.vis, t.email, t.web].filter(Boolean).join('\n'); }

// ---------- 1. Ägarnotis: ny förfrågan, beställning eller lead till företaget ----------
// lead: { namn, telefon, epost, tjanst, meddelande, falt:{övriga fält i formulärets ordning}, sida, tid, ref, requestId }
// WROS läser notisen (packages/core/src/lib/leads/parse-resend.ts): ämnet börjar med "Ny förfrågan" eller
// "Ny lead", raden "Request-ID: lead_…" finns i texten, Namn/Telefon/E-post/Tjänst är tabellrader och
// meddelandet ligger i ett pre-wrap-block. Ändra inte de delarna utan att ändra parsern.
export function agarnotis({ tema: tm, lead, etiketter = {}, rubrik = 'Ny förfrågan' }) {
  const t = tema(tm);
  const tel = sv.telefon(lead.telefon);
  const ovriga = rader(lead.falt || {}, etiketter);
  const kontakt = rader({ namn: lead.namn, telefon: lead.telefon, epost: lead.epost, tjanst: lead.tjanst, adress: lead.adress });
  const subject = `${rubrik}: ${lead.tjanst ? `${lead.tjanst} · ` : ''}${lead.namn}`;
  const preheader = [lead.tjanst, tel?.vis, lead.epost].filter(Boolean).join(' · ');
  const innehall = [
    h1(t, esc(lead.namn)),
    p(t, `${esc(lead.tjanst || rubrik)} · inkom ${sv.tid(lead.tid || Date.now())}`, true),
    knappar(t, [tel && { text: `Ring ${tel.vis}`, href: tel.href }, lead.epost && { text: 'Svara på mejlet', href: `mailto:${lead.epost}?subject=${encodeURIComponent('Sv: ' + (lead.tjanst || 'Din förfrågan'))}` }]),
    tabell(t, [...kontakt, ...ovriga]),
    lead.meddelande ? h2(t, 'Meddelande') + citat(t, lead.meddelande) : '',
  ].join('');
  const fot = `Skickat från ${lead.sida ? `<a href="${esc(lead.sida)}" style="color:${t.muted}">${esc(lead.sida.replace(/^https?:\/\//, ''))}</a>` : esc(t.web)}${lead.ref ? ` · Ärende ${esc(lead.ref)}` : ''}. Svara på mejlet så går svaret direkt till ${esc(lead.namn)}.${lead.requestId ? `<br><span style="font-size:11px">Request-ID: ${esc(lead.requestId)}</span>` : ''}`;
  const text = [`${rubrik} från ${lead.namn}`, lead.tjanst, `Inkom ${sv.tid(lead.tid || Date.now())}`, '', textRader([...kontakt, ...ovriga]), lead.meddelande ? `\nMeddelande:\n${lead.meddelande}` : '', '', `Skickat från ${lead.sida || t.web}${lead.ref ? `, ärende ${lead.ref}` : ''}`, lead.requestId ? `Request-ID: ${lead.requestId}` : null].filter((x) => x != null).join('\n');
  return { subject, preheader, html: skal(t, { subject, preheader, innehall, fot }), text, replyTo: lead.epost || undefined, headers: {} };
}

// ---------- 2. Bekräftelse till den som skickade ----------
// kund: { namn, epost }, sammanfattning: { fält som visas }, tjanst, ref, steg: [valfria egna steg]
export function bekraftelse({ tema: tm, kund, tjanst, vad, sammanfattning = {}, ref, steg, etiketter = {}, knappar: lankar = [] }) {
  const t = tema(tm);
  const o = L(t);
  vad = vad || (t.lang === 'en' ? 'request' : 'förfrågan');
  const fornamn = kund.fornamn || (kund.foretag ? null : String(kund.namn || '').split(' ')[0]);
  const tel = sv.telefon(t.phone);
  const om = tjanst ? (t.lang === 'en' ? ` about ${tjanst.toLowerCase()}` : ` ${vad === 'beställning' ? 'av' : 'om'} ${tjanst.toLowerCase()}`) : '';
  const subject = `${o.fatt(vad, om)} · ${t.name}`;
  const preheader = o.svarPre(o.svarstid);
  const lista = steg || o.steg(tel?.vis);
  const sam = rader(sammanfattning, etiketter);
  const rub = fornamn ? `${o.tack}, ${esc(fornamn)}` : o.tackFor(vad);
  const innehall = [
    h1(t, rub),
    p(t, `${o.fatt(vad, esc(om))} ${o.svarar} <strong>${o.svarstid}</strong>.`),
    h2(t, o.sa),
    `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:4px 0 4px">${lista.map((x, i) => `<tr><td valign="top" style="padding:6px 12px 6px 0"><span style="display:inline-block;width:24px;height:24px;line-height:24px;border-radius:12px;background:${t.brand};color:${t.onBrand};font-size:13px;font-weight:700;text-align:center">${i + 1}</span></td><td class="wr-ink" style="padding:7px 0;color:${t.ink}">${esc(x)}</td></tr>`).join('')}</table>`,
    lankar.length ? knappar(t, lankar) : '',
    sam.length ? h2(t, o.skickade) + tabell(t, sam) : '',
    p(t, `<br>${o.andra}${tel ? ` ${o.ring} <a href="${tel.href}" style="color:${t.brand}">${tel.vis}</a>` : ''}.`),
  ].join('');
  const fot = kontaktFot(t, `${o.varfor(vad, t.web || t.name)}${ref ? ` (${o.arende} ${ref})` : ''}.`);
  const text = [fornamn ? `${o.tack}, ${fornamn}` : o.tackFor(vad), '', `${o.fatt(vad, om)} ${o.svarar} ${o.svarstid}.`, '', `${o.sa}:`, ...lista.map((x, i) => `${i + 1}. ${x}`), ...lankar.map((k) => `${k.text}: ${k.href}`), sam.length ? `\n${o.skickade}:\n${textRader(sam)}` : '', '', `${o.andra}${tel ? ` ${o.ring} ${tel.vis}` : ''}.`, '', textFot(t)].join('\n');
  return { subject, preheader, html: skal(t, { subject, preheader, innehall, fot }), text, replyTo: t.email || undefined, headers: {} };
}

// ---------- 3. Order, offert, signerad offert, korrektur, status ----------
// typ: 'order' | 'offert' | 'signerad' | 'korrektur' | 'status'. rader: [{ text, detalj, antal, apris }]. summa: { moms, rut, frakt, rabatt }
// typ 'status' (trycks, skickad, publicerat, avvisat): rubrik och info krävs, rader valfria, knapp t.ex. spårning.
export function order({ tema: tm, typ = 'order', ref, kund = {}, rader: poster = [], summa = {}, knapp, giltigTill, leverans, info, rubrik }) {
  const t = tema(tm);
  const o = L(t);
  const kr = (n) => pengar(t, n);
  const ORDT = t.lang === 'en'
    ? { order: ['Order confirmation', 'Thank you for your order'], offert: ['Quote', 'Here is your quote'], signerad: ['Signed quote', 'The quote is signed'], korrektur: ['Proof', 'Your proof is ready'], status: ['Order', rubrik] }
    : { order: ['Orderbekräftelse', 'Tack för din beställning'], offert: ['Offert', 'Här är din offert'], signerad: ['Signerad offert', 'Offerten är signerad'], korrektur: ['Korrektur', 'Ditt korrektur är klart'], status: ['Order', rubrik] };
  const ord = ORDT[typ];
  if (typ === 'status' && !rubrik) throw new Error('[mail-kit] order typ status kräver rubrik');
  const tot = poster.reduce((x, r) => x + (r.antal ?? 1) * r.apris, 0);
  const att = tot + (summa.frakt || 0) - (summa.rabatt || 0) - (summa.rut || 0);
  const subject = typ === 'status' ? `${rubrik} (${ref}) · ${t.name}` : `${ord[0]} ${ref}${t.name ? ` · ${t.name}` : ''}`;
  const preheader = typ === 'status' ? (info || rubrik) : `${ord[1]}. ${o.att} ${kr(att)}${giltigTill ? `, ${o.giltig} ${datumL(t, giltigTill)}` : ''}.`;
  const rad = (a, v, stark = false, muted = false) => `<tr><td class="${muted ? 'wr-muted' : 'wr-ink'}" style="padding:6px 0;color:${muted ? t.muted : t.ink};font-size:${stark ? 17 : 15}px;${stark ? 'font-weight:700' : ''}">${a}</td><td class="wr-ink wr-num" align="right" style="padding:6px 0;white-space:nowrap;color:${t.ink};font-size:${stark ? 17 : 15}px;${stark ? 'font-weight:700' : ''}">${v}</td></tr>`;
  const postlista = poster.map((r) => `<tr><td class="wr-ink wr-line" style="padding:12px 12px 12px 0;border-top:1px solid ${t.line};color:${t.ink}">${esc(r.text)}${r.detalj ? `<div class="wr-muted" style="font-size:14px;color:${t.muted}">${esc(r.detalj)}</div>` : ''}</td><td class="wr-muted wr-line wr-num" style="padding:12px 12px;border-top:1px solid ${t.line};color:${t.muted};white-space:nowrap">${r.antal ?? 1} ${o.st}</td><td class="wr-ink wr-line wr-num" align="right" style="padding:12px 0;border-top:1px solid ${t.line};color:${t.ink};white-space:nowrap">${kr((r.antal ?? 1) * r.apris)}</td></tr>`).join('');
  const summor = [
    rad(o.summa, kr(tot), false, true),
    summa.frakt ? rad(o.frakt, kr(summa.frakt), false, true) : '',
    summa.rabatt ? rad(o.rabatt, `−${kr(summa.rabatt)}`, false, true) : '',
    summa.rut ? rad('RUT-avdrag', `−${kr(summa.rut)}`, false, true) : '',
    rad(o.att, kr(att), true),
    summa.moms ? rad(o.moms, kr(summa.moms), false, true) : '',
  ].join('');
  const visaSumma = typ !== 'status' && poster.length;
  const innehall = [
    h1(t, esc(ord[1])),
    p(t, `${ord[0]} <strong class="wr-num">${esc(ref)}</strong>${kund.namn ? ` ${o.for} ${esc(kund.namn)}` : ''}${giltigTill ? `. ${o.Giltig} ${datumL(t, giltigTill)}.` : '.'}`, true),
    info ? p(t, esc(info)) : '',
    knapp ? knappar(t, [knapp]) : '',
    poster.length ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0 0;border-collapse:collapse">${postlista}</table>` : '',
    visaSumma ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="wr-line" style="margin:4px 0 0;border-top:2px solid ${t.ink};border-collapse:collapse">${summor}</table>` : '',
    leverans ? h2(t, o.leverans) + tabell(t, rader(leverans)) : '',
  ].join('');
  const fot = kontaktFot(t, o.ordfragor);
  const text = [ord[1], `${ord[0]} ${ref}${giltigTill ? `, ${o.giltig} ${datumL(t, giltigTill)}` : ''}`, info || '', knapp ? `${knapp.text}: ${knapp.href}` : '', '', ...poster.map((r) => `${r.antal ?? 1} × ${r.text}: ${kr((r.antal ?? 1) * r.apris)}`), '', visaSumma ? `${o.summa}: ${kr(tot)}` : '', visaSumma && summa.frakt ? `${o.frakt}: ${kr(summa.frakt)}` : '', visaSumma && summa.rabatt ? `${o.rabatt}: −${kr(summa.rabatt)}` : '', visaSumma && summa.rut ? `RUT-avdrag: −${kr(summa.rut)}` : '', visaSumma ? `${o.att}: ${kr(att)}` : '', visaSumma && summa.moms ? `${o.moms}: ${kr(summa.moms)}` : '', leverans ? `\n${o.leverans}:\n${textRader(rader(leverans))}` : '', '', textFot(t)].filter((x) => x !== '').join('\n');
  return { subject, preheader, html: skal(t, { subject, preheader, innehall, fot }), text, replyTo: t.email || undefined, headers: {}, attBetala: att };
}

// ---------- 4. Rapport (månad, dag, morgon, kampanj) ----------
// nyckeltal: [{ etikett, varde, forra, enhet:'st'|'kr'|'%', battreNar:'upp'|'ned' }]. sektioner: [{ rubrik, rader:[{etikett,varde}] , punkter:[] }]
export function rapport({ tema: tm, titel, period, sammanfattning, nyckeltal = [], sektioner = [], lank, mottagare }) {
  const t = tema(tm);
  const fmt = (v, e) => (e === 'kr' ? sv.kr(v) : e === '%' ? sv.procent(v) : sv.tal(v));
  const subject = `${titel} · ${period}`;
  const preheader = sammanfattning;
  const kt = nyckeltal.map((k) => {
    let andring = '';
    if (k.forra != null && k.enhet === '%') {
      const d = k.varde - k.forra;
      const bra = (k.battreNar || 'upp') === 'upp' ? d >= 0 : d <= 0;
      andring = Math.abs(d) < 0.05 ? `<span class="wr-muted" style="color:${t.muted}">samma som förra perioden</span>` : `<span style="color:${bra ? '#1f7a4d' : '#b3261e'}">${d > 0 ? 'upp' : 'ned'} ${sv.tal(Math.abs(d), 1)} procentenheter</span> <span class="wr-muted" style="color:${t.muted}">mot ${fmt(k.forra, k.enhet)}</span>`;
    } else if (k.forra != null && k.forra !== 0) {
      const d = ((k.varde - k.forra) / Math.abs(k.forra)) * 100;
      const bra = (k.battreNar || 'upp') === 'upp' ? d >= 0 : d <= 0;
      andring = `<span style="color:${bra ? '#1f7a4d' : '#b3261e'}">${d >= 0 ? 'upp' : 'ned'} ${sv.procent(Math.abs(Math.round(d)))}</span> <span class="wr-muted" style="color:${t.muted}">mot ${fmt(k.forra, k.enhet)}</span>`;
    } else if (k.forra === 0) andring = `<span class="wr-muted" style="color:${t.muted}">mot 0</span>`;
    return `<tr><td class="wr-ink wr-line" style="padding:12px 12px 12px 0;border-top:1px solid ${t.line};color:${t.ink}">${esc(k.etikett)}</td><td class="wr-ink wr-line wr-num" align="right" style="padding:12px 0;border-top:1px solid ${t.line};font-size:20px;font-weight:700;color:${t.ink};white-space:nowrap">${fmt(k.varde, k.enhet)}</td></tr><tr><td colspan="2" class="wr-num" style="padding:0 0 12px;font-size:13px">${andring}</td></tr>`;
  }).join('');
  const sek = sektioner.map((s) => h2(t, esc(s.rubrik)) + (s.rader ? tabell(t, s.rader.map((r) => ({ etikett: r.etikett, varde: typeof r.varde === 'number' ? sv.tal(r.varde) : r.varde }))) : '') + (s.punkter ? `<ul style="margin:6px 0 0;padding-left:20px">${s.punkter.map((x) => `<li class="wr-ink" style="margin:0 0 6px;color:${t.ink}">${esc(x)}</li>`).join('')}</ul>` : '')).join('');
  const innehall = [h1(t, esc(titel)), p(t, esc(period), true), p(t, esc(sammanfattning)), kt ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:12px 0 0;border-collapse:collapse">${kt}</table>` : '', sek, lank ? knappar(t, [lank]) : ''].join('');
  const fot = kontaktFot(t, mottagare ? `Rapporten går till ${mottagare}. Svara på mejlet om du har frågor.` : '');
  const text = [titel, period, '', sammanfattning, '', ...nyckeltal.map((k) => `${k.etikett}: ${fmt(k.varde, k.enhet)}${k.forra != null ? ` (förra perioden ${fmt(k.forra, k.enhet)})` : ''}`), ...sektioner.flatMap((s) => ['', `${s.rubrik}:`, ...(s.rader || []).map((r) => `${r.etikett}: ${typeof r.varde === 'number' ? sv.tal(r.varde) : r.varde}`), ...(s.punkter || []).map((x) => `- ${x}`)]), lank ? `\n${lank.text}: ${lank.href}` : '', '', textFot(t)].join('\n');
  return { subject, preheader, html: skal(t, { subject, preheader, innehall, fot }), text, replyTo: t.email || undefined, headers: {} };
}

// ---------- 5. Driftlarm (internt) ----------
// niva: 'akut' | 'varning' | 'info'. Fyra delar: vad, orsak, åtgärd, vad som händer sen.
export function larm({ tema: tm, niva = 'varning', vad, orsak, atgard, sen, lank, kalla }) {
  const t = tema(tm);
  const farg = { akut: '#b3261e', varning: '#a15c00', info: t.muted }[niva];
  const ord = { akut: 'Akut', varning: 'Varning', info: 'Info' }[niva];
  const subject = `[${ord}] ${vad}`;
  const preheader = orsak || vad;
  const del = (rub, s) => (s ? `<tr><td class="wr-muted" valign="top" style="width:96px;padding:8px 12px 8px 0;font-size:14px;color:${t.muted}">${rub}</td><td class="wr-ink" style="padding:8px 0;color:${t.ink}">${esc(s)}</td></tr>` : '');
  const innehall = [`<p style="margin:0 0 6px;font-size:14px;font-weight:700;color:${farg}">${ord}</p>`, h1(t, esc(vad)), `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:10px 0 0">${del('Orsak', orsak)}${del('Gör så här', atgard)}${del('Sen', sen)}</table>`, lank ? knappar(t, [lank]) : ''].join('');
  const fot = `${esc(kalla || 'WROS')} · ${sv.tid(Date.now())}`;
  const text = [`${ord}: ${vad}`, '', orsak && `Orsak: ${orsak}`, atgard && `Gör så här: ${atgard}`, sen && `Sen: ${sen}`, lank && `${lank.text}: ${lank.href}`].filter(Boolean).join('\n');
  return { subject, preheader, html: skal(t, { subject, preheader, innehall, fot }), text, headers: {} };
}

// ---------- 6. Inloggningslänk och bekräftelselänk ----------
// bekrafta: { amne, rubrik, text, knapp } gör samma mall till en bekräftelselänk (prenumeration, recension,
// inbjudan, påminnelser). Utan bekrafta blir det en inloggningslänk.
export function inloggning({ tema: tm, url, giltigMinuter = 15, epost, bekrafta }) {
  const t = tema(tm);
  const o = L(t);
  const en = t.lang === 'en';
  const b = bekrafta || (en
    ? { amne: `Your sign-in link to ${t.name}`, rubrik: 'Sign in', text: `Click the button to sign in${epost ? ` as ${esc(epost)}` : ''}.`, knapp: 'Sign in', inte: 'Did not ask to sign in? Ignore this email. Nobody gets in without the link.' }
    : { amne: `Din inloggningslänk till ${t.name}`, rubrik: 'Logga in', text: `Klicka på knappen för att logga in${epost ? ` som ${esc(epost)}` : ''}.`, knapp: 'Logga in', inte: 'Bad du inte om att logga in? Då kan du strunta i mejlet. Ingen kommer in utan länken.' });
  const inte = b.inte || (en ? 'Did not ask for this? Ignore this email and nothing happens.' : 'Bad du inte om det här? Strunta i mejlet, så händer ingenting.');
  const giltig = giltigMinuter ? (en ? `The link works for ${giltigMinuter >= 120 ? `${Math.round(giltigMinuter / 60)} hours` : `${giltigMinuter} minutes`}.` : `Länken fungerar i ${giltigMinuter >= 120 ? `${Math.round(giltigMinuter / 60)} timmar` : `${giltigMinuter} minuter`}.`) : '';
  const subject = b.amne;
  const preheader = giltig || b.text;
  const innehall = [h1(t, esc(b.rubrik)), p(t, `${b.text} ${giltig}`.trim()), knappar(t, [{ text: b.knapp, href: url }]), p(t, `${o.kopiera}<br><a href="${esc(url)}" style="color:${t.brand};word-break:break-all;font-size:14px">${esc(url)}</a>`, true), p(t, inte, true)].join('');
  const text = [b.rubrik, '', `${b.text} ${giltig}`.trim(), url, '', inte].join('\n');
  return { subject, preheader, html: skal(t, { subject, preheader, innehall, fot: kontaktFot(t) }), text, headers: {} };
}

// ---------- 7. Utskick (första kontakt, uppföljning, pressmeddelande) ----------
// Enkel och personlig: ingen logga, inget kort. Ämnet får aldrig börja med Sv:, Re: eller Fwd: vid första kontakt.
// knappar: [{ text, href }] visas som länkar under texten (t.ex. Läs hela, Ja, Nej, Öppna flyttplanen).
export function utskick({ tema: tm, amne, stycken = [], avsandare, avregUrl, avregMailto, knappar: lankar = [] }) {
  const t = tema(tm);
  if (/^(sv|re|fwd?|vb)\s*:/i.test(amne)) throw new Error(`[mail-kit] utskicksämnet "${amne}" ser ut som ett svar`);
  const subject = amne;
  const preheader = stycken[0]?.slice(0, 110) || '';
  const sign = [avsandare.namn, avsandare.roll && `${avsandare.roll}, ${t.name}`, sv.telefon(avsandare.telefon || t.phone)?.vis, t.web].filter(Boolean);
  const lank = lankar.map((k) => `<p style="margin:0 0 12px"><a href="${esc(k.href)}" style="color:${t.brand};font-weight:600">${esc(k.text)}</a></p>`).join('');
  const innehall = stycken.map((s) => `<p style="margin:0 0 16px">${nl2br(s)}</p>`).join('') + lank + `<p style="margin:24px 0 0">${sign.map(esc).join('<br>')}</p>`;
  const fot = avregUrl ? L(t).avreg(esc(avregUrl), t.muted) : '';
  const text = [...stycken, ...lankar.map((k) => `${k.text}: ${k.href}`), '', ...sign, '', avregUrl ? `${L(t).avregText}: ${avregUrl}` : ''].join('\n\n').replace(/\n{3,}/g, '\n\n');
  const headers = avregUrl ? { 'List-Unsubscribe': `<${avregUrl}>${avregMailto ? `, <mailto:${avregMailto}>` : ''}`, 'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click' } : {};
  return { subject, preheader, html: skal({ ...t, bg: t.surface }, { subject, preheader, innehall, fot, enkel: true }), text, replyTo: t.email || undefined, headers };
}

// ---------- Skicka via Resend ----------
// Inga bcc/cc till Webraketen. tracking stängs av per mejl för allt utom utskick.
export async function skicka({ apiKey, from, to, mejl, tags }) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [].concat(to), subject: mejl.subject, html: mejl.html, text: mejl.text, reply_to: mejl.replyTo, headers: mejl.headers, tags }),
  });
  if (!res.ok) throw new Error(`[mail-kit] Resend ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return res.json();
}
