import type { APIRoute } from 'astro';

const pages = ['/', '/integritet/'];

export const GET: APIRoute = ({ site }) => {
  const urls = pages.map((p) => `<url><loc>${new URL(p, site).href}</loc></url>`).join('');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
};
