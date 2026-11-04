// Receives the contact form as a plain HTML POST, checks Turnstile, e-mails Anna and redirects the visitor.
// The message only lives in memory for the duration of the request: no storage, no logging of content.

const LIMITS = { name: 120, email: 200, message: 3000 };

export default {
  async fetch(request, env) {
    const site = env.SITE_URL;
    if (request.method !== 'POST') return Response.redirect(`${site}/#kontakt`, 303);

    const referer = request.headers.get('Origin') || request.headers.get('Referer') || '';
    let origin;
    try {
      origin = new URL(referer);
    } catch {
      return new Response('Ogiltig förfrågan', { status: 400 });
    }
    const allowed = env.ALLOWED_HOSTS.split(',');
    if (!allowed.some((h) => origin.hostname === h || origin.hostname.endsWith(`.${h}`))) {
      return new Response('Ogiltig förfrågan', { status: 403 });
    }
    const back = origin.origin;

    const form = await request.formData();
    const field = (k) => String(form.get(k) ?? '').trim().slice(0, LIMITS[k]);
    const name = field('name');
    const email = field('email');
    const message = field('message');
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message) {
      return Response.redirect(`${back}/?fel=uppgifter#kontakt`, 303);
    }

    // Ett nätverksfel eller ett svar som inte är JSON ger sidans felbesked i stället för Cloudflares felsida.
    let verify;
    try {
      verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: new URLSearchParams({
          secret: env.TURNSTILE_SECRET,
          response: String(form.get('cf-turnstile-response') ?? ''),
          remoteip: request.headers.get('CF-Connecting-IP') ?? '',
        }),
      }).then((r) => r.json());
    } catch {
      return Response.redirect(`${back}/?fel=skicka#kontakt`, 303);
    }
    if (!verify.success) return Response.redirect(`${back}/?fel=kontroll#kontakt`, 303);

    try {
      await env.EMAIL.send({
        to: 'anna.b.hoglund@gmail.com',
        from: { email: env.FROM_ADDRESS, name: 'Mellanrum, kontaktformulär' },
        replyTo: { email, name },
        subject: `Ny förfrågan från ${name}`,
        text: `Namn: ${name}\nE-post: ${email}\n\n${message}\n\nSvara direkt på det här mejlet för att svara ${name}.`,
      });
    } catch (e) {
      console.log('send failed', e.code);
      return Response.redirect(`${back}/?fel=skicka#kontakt`, 303);
    }
    return Response.redirect(`${back}/tack/`, 303);
  },
};
