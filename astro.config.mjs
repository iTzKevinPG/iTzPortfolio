import { defineConfig } from 'astro/config';

export default defineConfig({
	// Dominio principal (www todavía no apunta a Pages: ver PENDIENTES.md).
	site: 'https://itzkevindev.tech',
	trailingSlash: 'ignore',
	build: { inlineStylesheets: 'auto' },
	image: { responsiveStyles: false },
	vite: {
		resolve: { alias: { '@': '/src' } }
	}
});
