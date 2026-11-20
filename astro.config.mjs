import { defineConfig } from 'astro/config';

export default defineConfig({
	// Dominio principal (www todavía no apunta a Pages: ver PENDIENTES.md).
	site: 'https://itzkevindev.tech',
	trailingSlash: 'ignore',
	// en-vivo.html en lugar de en-vivo/index.html: Pages sirve /en-vivo sin redirigir a /en-vivo/.
	build: { inlineStylesheets: 'auto', format: 'file' },
	image: { responsiveStyles: false },
	vite: {
		resolve: { alias: { '@': '/src' } }
	}
});
