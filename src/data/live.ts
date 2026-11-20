/**
 * Registro de proyectos en vivo (subdominios de itzkevindev.tech).
 *
 * Datos puros, sin imports de Astro: lo leen la página /en-vivo, la banda del home y la Pages Function
 * `functions/api/status.ts` (que SOLO comprueba las URLs de este archivo: es su lista blanca).
 *
 * Añadir un proyecto:
 *   1. Una entrada aquí (el `id` es el nombre del archivo de su captura).
 *   2. `npm run live:shots` → guarda la captura en src/assets/live/<id>.jpg.
 *   3. Commit + push. El estado (en línea, latencia, API) se calcula solo en cada visita.
 * Ver docs/BRAND.md → "Proyectos en vivo".
 */

export type LiveStage = 'produccion' | 'construccion';
export type LiveKind = 'Cliente' | 'Personal' | 'Proyecto fan';

export type LiveProject = {
	id: string;
	name: string;
	/** URL pública del sitio. */
	url: string;
	kind: LiveKind;
	stage: LiveStage;
	/** Una frase: qué es y para quién. */
	summary: string;
	/** Lo que tiene de interesante técnicamente (1–2 frases). */
	detail: string;
	stack: { name: string; icon?: string }[];
	/** API propia, si la tiene. `health`: espera 2xx. `reachable`: basta con que responda (<500). */
	api?: { url: string; check: 'health' | 'reachable' };
	/** Color de acento del proyecto (su marca), solo para detalles pequeños. */
	accent: string;
	/** Selector que el script de capturas pulsa antes de fotografiar (p. ej. cerrar un modal de bienvenida). */
	shotDismiss?: string;
};

export const liveDomain = 'itzkevindev.tech';

/**
 * Subdominios que el descubrimiento automático nunca debe anunciar (nombre completo o solo el subdominio).
 * Úsalo para algo en pruebas que aún no quieras mostrar. Los nombres sensibles (admin, staging, dev…) ya se
 * filtran solos en functions/api/status.ts.
 */
export const liveHidden: string[] = [];

export const liveProjects: LiveProject[] = [
	{
		id: 'goldemchips',
		name: "Goldem Chip's",
		url: 'https://goldemchips.itzkevindev.tech',
		kind: 'Cliente',
		stage: 'produccion',
		summary: 'Marca y tienda de papas artesanales: sabores, pedidos por WhatsApp y página para vendedores.',
		detail: 'Sitio Astro con islas de React y una API NestJS + Prisma para pedidos, panel y correo transaccional.',
		stack: [
			{ name: 'Astro', icon: 'astro' },
			{ name: 'React', icon: 'react' },
			{ name: 'NestJS', icon: 'nestjs' },
			{ name: 'Prisma', icon: 'prisma' },
			{ name: 'PostgreSQL', icon: 'postgresql' }
		],
		api: { url: 'https://goldemchips-api.itzkevindev.tech/health', check: 'health' },
		accent: '#e6b422'
	},
	{
		id: 'lumacars',
		name: 'LUMAcars',
		url: 'https://lumacars.itzkevindev.tech',
		kind: 'Cliente',
		stage: 'construccion',
		summary: 'Compra-venta de vehículos en España: catálogo, ficha por coche y panel para publicar lotes.',
		detail: 'Portada con carril horizontal fijado al scroll, panel de administración propio y fotos servidas desde R2.',
		stack: [
			{ name: 'Astro', icon: 'astro' },
			{ name: 'React', icon: 'react' },
			{ name: 'NestJS', icon: 'nestjs' },
			{ name: 'Cloudflare R2', icon: 'cloudflare' },
			{ name: 'GSAP', icon: 'greensock' }
		],
		api: { url: 'https://lumacars-api.itzkevindev.tech/health', check: 'health' },
		accent: '#f5a524'
	},
	{
		id: 'guaroypola',
		name: 'Guaro & Pola',
		url: 'https://guaroypola.itzkevindev.tech',
		kind: 'Cliente',
		stage: 'construccion',
		summary: 'Licorera 100 % virtual en Antioquia: combos, catálogo, carrito y seguimiento del pedido.',
		detail:
			'Checkout con cobertura por zonas, estados del pedido en vivo y panel de administración sobre la misma API.',
		stack: [
			{ name: 'Astro', icon: 'astro' },
			{ name: 'React', icon: 'react' },
			{ name: 'NestJS', icon: 'nestjs' },
			{ name: 'Prisma', icon: 'prisma' }
		],
		api: { url: 'https://guaroypola-api.itzkevindev.tech/health', check: 'health' },
		accent: '#c9a227'
	},
	{
		id: 'elfogondelpapi',
		name: 'El Fogón del Papi',
		url: 'https://elfogondelpapi.itzkevindev.tech',
		kind: 'Cliente',
		stage: 'construccion',
		summary: 'Marca y web de chorizo paisa ahumado en Orihuela, con pedidos armados para WhatsApp.',
		detail: 'Sin API: humo y brasas en canvas, "entrar al barril" con ScrollTrigger y un termómetro de scroll.',
		stack: [{ name: 'Astro', icon: 'astro' }, { name: 'GSAP', icon: 'greensock' }, { name: 'Canvas' }],
		accent: '#d98a4e'
	},
	{
		id: 'mitimiti',
		name: 'MitiMiti',
		url: 'https://mitimiti.itzkevindev.tech',
		kind: 'Personal',
		stage: 'produccion',
		summary: 'App para dividir gastos entre amigos: eventos, facturas, balances y transferencias sugeridas.',
		detail:
			'Proyecto de aprendizaje (antes FairSplit). React + Zustand en el front; API NestJS con colas BullMQ para escanear facturas y almacenamiento S3.',
		stack: [
			{ name: 'React', icon: 'react' },
			{ name: 'Vite', icon: 'vite' },
			{ name: 'NestJS', icon: 'nestjs' },
			{ name: 'BullMQ' },
			{ name: 'Redis', icon: 'redis' }
		],
		api: { url: 'https://mitimitiapi.itzkevindev.tech/', check: 'reachable' },
		accent: '#38bdf8',
		shotDismiss: '::-p-text(Explorar por mi cuenta)'
	},
	{
		id: 'stream-fighters',
		name: 'Stream Fighters 5 · Pixel Edition',
		url: 'https://stream-fighters.itzkevindev.tech',
		kind: 'Proyecto fan',
		stage: 'produccion',
		summary: 'Juego de peleas en pixel art para el navegador, homenaje sin ánimo de lucro al evento Stream Fighters.',
		detail:
			'Proyecto de aprendizaje hecho por gusto. Motor propio en TypeScript: render, HUD, efectos y laboratorio de pruebas. Arte, audio y código originales.',
		stack: [{ name: 'TypeScript', icon: 'typescript' }, { name: 'Canvas' }, { name: 'Vitest', icon: 'vitest' }],
		accent: '#ff4d6d'
	}
];

/** Todas las URLs que la función puede comprobar (lista blanca). */
export function liveTargets(): {
	id: string;
	kind: 'site' | 'api';
	url: string;
	check: 'site' | 'health' | 'reachable';
}[] {
	return liveProjects.flatMap((p) => [
		{ id: p.id, kind: 'site' as const, url: p.url, check: 'site' as const },
		...(p.api ? [{ id: p.id, kind: 'api' as const, url: p.api.url, check: p.api.check }] : [])
	]);
}

/** Forma de la respuesta de /api/status (compartida con el cliente). */
export type Probe = { ok: boolean; status: number; ms: number };
export type StatusPayload = {
	checkedAt: string;
	results: Record<string, { site?: Probe; api?: Probe }>;
	/** Subdominios en DNS que aún no tienen ficha (solo si la función tiene token de Cloudflare). */
	discovered: { host: string; site: Probe }[];
	/** Estado del descubrimiento por DNS: off (sin token), on (leyó `records` CNAME), error (token inválido o caducado). */
	discovery: { state: 'off' | 'on' | 'error'; records: number };
};
