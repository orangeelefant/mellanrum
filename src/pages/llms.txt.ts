import type { APIRoute } from 'astro';
import site from '../data/site.json';

export const GET: APIRoute = ({ site: url }) => {
  const { hero, services, about, pricing, contact } = site;
  const text = [
    `# ${site.brand.name}`,
    '',
    `> ${site.meta.description}`,
    '',
    hero.lead,
    '',
    '## Tjänster',
    ...services.items.map((s) => `- ${s.title} (${s.audience.toLowerCase()}): ${s.text}`),
    '',
    '## Om mig',
    ...about.paragraphs,
    '',
    '## Priser',
    ...pricing.items.map((p) => `- ${p.title}: ${p.price}. ${p.text}`),
    '',
    '## Kontakt',
    `${contact.location}. Kontaktformulär: ${new URL('/#kontakt', url).href}`,
    '',
  ].join('\n');
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
