import { defineConfig } from 'astro/config';

export default defineConfig({
	site: 'https://www.itzkevindev.tech',
	trailingSlash: 'ignore',
	build: { inlineStylesheets: 'auto' },
	image: { responsiveStyles: false },
	vite: {
		resolve: { alias: { '@': '/src' } }
	}
});
