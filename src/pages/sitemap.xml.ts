import type { APIRoute } from 'astro';

// Una sola página indexable por ahora. Al sumar páginas, añadirlas aquí (ver docs/BRAND.md).
const pages = ['/'];

export const GET: APIRoute = ({ site }) => {
	const today = new Date().toISOString().slice(0, 10);
	const urls = pages.map((p) => `<url><loc>${new URL(p, site).href}</loc><lastmod>${today}</lastmod></url>`).join('');
	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
		{ headers: { 'Content-Type': 'application/xml; charset=utf-8' } }
	);
};
