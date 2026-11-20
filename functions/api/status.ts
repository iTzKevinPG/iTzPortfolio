/**
 * GET /api/status — Cloudflare Pages Function.
 *
 * Comprueba en paralelo los sitios y APIs de `src/data/live.ts` (lista blanca: nunca recibe URLs del cliente)
 * y responde con código HTTP y latencia. Caché de 30 s en el borde para no martillar los proyectos.
 *
 * Descubrimiento opcional: si el proyecto de Pages tiene las variables CF_API_TOKEN (permiso Zone → DNS → Read)
 * y CF_ZONE_ID, también lista los CNAME de la zona y devuelve en `discovered` los subdominios públicos que aún no
 * tienen ficha. Así un subdominio nuevo aparece en /en-vivo sin tocar código.
 */
import { liveDomain, liveProjects, liveTargets, type Probe, type StatusPayload } from '../../src/data/live';

type Env = { CF_API_TOKEN?: string; CF_ZONE_ID?: string };
type Ctx = { request: Request; env: Env; waitUntil: (p: Promise<unknown>) => void };

const TIMEOUT_MS = 6000;
const CACHE_SECONDS = 30;

// Subdominios técnicos que nunca son "proyectos": APIs, correo, medios, verificación, www.
const INTERNAL = /(^|[-.])api$|api$|^www$|^r?send(\.|$)|^media(\.|$)|_|^s\d+$|^mail|^autodiscover/;

async function probe(url: string, check: 'site' | 'health' | 'reachable'): Promise<Probe> {
	const started = Date.now();
	try {
		const res = await fetch(url, {
			method: 'GET',
			redirect: 'follow',
			signal: AbortSignal.timeout(TIMEOUT_MS),
			headers: { 'user-agent': 'itzkevindev-status/1.0 (+https://itzkevindev.tech/en-vivo)' },
			cf: { cacheTtl: 0 }
		} as RequestInit);
		const ms = Date.now() - started;
		// No necesitamos el cuerpo; liberarlo evita que el runtime lo retenga.
		void res.body?.cancel();
		const ok = check === 'reachable' ? res.status < 500 : res.status >= 200 && res.status < 400;
		return { ok, status: res.status, ms };
	} catch {
		return { ok: false, status: 0, ms: Date.now() - started };
	}
}

async function discover(env: Env): Promise<string[]> {
	if (!env.CF_API_TOKEN || !env.CF_ZONE_ID) return [];
	try {
		const res = await fetch(
			`https://api.cloudflare.com/client/v4/zones/${env.CF_ZONE_ID}/dns_records?type=CNAME&per_page=200`,
			{ headers: { authorization: `Bearer ${env.CF_API_TOKEN}` }, signal: AbortSignal.timeout(TIMEOUT_MS) }
		);
		if (!res.ok) return [];
		const data = (await res.json()) as { result?: { name: string; proxied?: boolean }[] };
		const known = new Set(liveTargets().map((t) => new URL(t.url).hostname));
		return (data.result ?? [])
			.map((r) => r.name)
			.filter((name) => name.endsWith(`.${liveDomain}`))
			.filter((name) => {
				const sub = name.slice(0, -(liveDomain.length + 1));
				return !sub.includes('.') && !INTERNAL.test(sub) && !known.has(name);
			});
	} catch {
		return [];
	}
}

export const onRequestGet = async (ctx: Ctx): Promise<Response> => {
	const cache = (caches as unknown as { default: Cache }).default;
	const key = new Request(new URL('/api/status', ctx.request.url).toString(), { method: 'GET' });
	const hit = await cache.match(key);
	if (hit) return hit;

	const targets = liveTargets();
	const [probes, hosts] = await Promise.all([
		Promise.all(targets.map((t) => probe(t.url, t.check))),
		discover(ctx.env)
	]);

	const results: StatusPayload['results'] = Object.fromEntries(liveProjects.map((p) => [p.id, {}]));
	targets.forEach((t, i) => {
		results[t.id][t.kind] = probes[i];
	});

	const discovered = await Promise.all(
		hosts.map(async (host) => ({ host, site: await probe(`https://${host}/`, 'site') }))
	);

	const body: StatusPayload = {
		checkedAt: new Date().toISOString(),
		results,
		discovered: discovered.filter((d) => d.site.status !== 0)
	};

	const res = new Response(JSON.stringify(body), {
		headers: {
			'content-type': 'application/json; charset=utf-8',
			'cache-control': `public, max-age=${CACHE_SECONDS}`,
			'x-content-type-options': 'nosniff'
		}
	});
	ctx.waitUntil(cache.put(key, res.clone()));
	return res;
};
