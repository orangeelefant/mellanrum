// node --test worker/test: Workern utan nätverk. Turnstiles svar styrs av stubben.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src/index.js';

const sent = [];
const env = {
  SITE_URL: 'https://mellanrumpsykoterapi.se',
  ALLOWED_HOSTS: 'mellanrumpsykoterapi.se',
  FROM_ADDRESS: 'formular@mellanrumpsykoterapi.se',
  TURNSTILE_SECRET: 'test',
  EMAIL: { send: async (m) => { sent.push(m); } },
};
const post = () => new Request('https://w.example/', {
  method: 'POST',
  headers: { Origin: 'https://mellanrumpsykoterapi.se' },
  body: new URLSearchParams({ name: 'Anna', email: 'a@example.se', message: 'Hej', 'cf-turnstile-response': 'tok' }),
});

test('ett nätverksfel mot Turnstile ger sidans felbesked, inte ett kraschat anrop', async () => {
  globalThis.fetch = async () => { throw new TypeError('fetch failed'); };
  const res = await worker.fetch(post(), env);
  assert.equal(res.status, 303);
  assert.match(res.headers.get('location'), /\?fel=skicka#kontakt$/);
});

test('ett svar som inte är JSON ger också felbeskedet', async () => {
  globalThis.fetch = async () => new Response('<html>502</html>', { status: 502 });
  const res = await worker.fetch(post(), env);
  assert.match(res.headers.get('location'), /\?fel=skicka#kontakt$/);
});

test('godkänd kontroll skickar och går till /tack/', async () => {
  globalThis.fetch = async () => Response.json({ success: true });
  const res = await worker.fetch(post(), env);
  assert.match(res.headers.get('location'), /\/tack\/$/);
});

test('mejlet byggs med mejlkitet: ämne, html, text, reply-to och inga kopior', async () => {
  sent.length = 0;
  globalThis.fetch = async () => Response.json({ success: true });
  await worker.fetch(post(), env);
  const [m] = sent;
  assert.match(m.subject, /^Ny förfrågan: Anna/);
  assert.match(m.html, /Hej/);
  assert.match(m.text, /Hej/);
  assert.deepEqual(m.replyTo, { email: 'a@example.se', name: 'Anna' });
  assert.equal(m.bcc, undefined);
  assert.equal(m.cc, undefined);
  assert.equal(sent.length, 1);
});
