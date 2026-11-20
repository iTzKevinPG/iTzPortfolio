/**
 * Estado en vivo de los proyectos (lee /api/status, la Pages Function).
 *
 * Convención de marcado (sin acoplarse a ningún componente):
 * - `data-live-probe="<id>:site|api"` → recibe `data-state` = checking | ok | down | unknown.
 *   Dentro, `[data-live-code]` y `[data-live-ms]` reciben el código HTTP y la latencia.
 * - `data-live-count="sites|apis|down"` → contadores. `data-live-avg` → latencia media.
 * - `data-live-checked` → "hace 12 s". `data-live-refresh` → botón para comprobar ya.
 * - `data-live-discovered` (+ <template data-live-discovered-tpl>) → subdominios nuevos sin ficha.
 *
 * Sin la función (p. ej. `astro dev`) todo queda en "unknown" y el texto lo explica: nunca rompe la página.
 */
import type { Probe, StatusPayload } from '@/data/live';

const REFRESH_MS = 60_000;

export function initLive(): void {
	const probes = document.querySelectorAll<HTMLElement | SVGElement>('[data-live-probe]');
	if (!probes.length) return;

	let checkedAt = 0;
	let timer = 0;
	let busy = false;

	const setState = (el: Element, state: string, p?: Probe): void => {
		el.setAttribute('data-state', state);
		const code = el.querySelector('[data-live-code]');
		const ms = el.querySelector('[data-live-ms]');
		if (code) code.textContent = p ? (p.status ? String(p.status) : 'sin respuesta') : '—';
		if (ms) ms.textContent = p && p.status ? `${p.ms} ms` : '';
	};

	const paint = (data: StatusPayload): void => {
		let sitesUp = 0;
		let apisUp = 0;
		let apisTotal = 0;
		let down = 0;
		const latencies: number[] = [];

		for (const r of Object.values(data.results)) {
			if (r.site) {
				if (r.site.ok) {
					sitesUp++;
					latencies.push(r.site.ms);
				} else down++;
			}
			if (r.api) {
				apisTotal++;
				if (r.api.ok) apisUp++;
				else down++;
			}
		}

		probes.forEach((el) => {
			const [id, kind] = (el.getAttribute('data-live-probe') ?? '').split(':') as [string, 'site' | 'api'];
			const p = data.results[id]?.[kind];
			setState(el, p ? (p.ok ? 'ok' : 'down') : 'unknown', p);
		});

		const set = (sel: string, text: string): void =>
			document.querySelectorAll(sel).forEach((el) => (el.textContent = text));
		set('[data-live-count="sites"]', String(sitesUp));
		set('[data-live-count="apis"]', `${apisUp}/${apisTotal}`);
		set('[data-live-count="down"]', String(down));
		set(
			'[data-live-avg]',
			latencies.length ? `${Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length)} ms` : '—'
		);
		document.documentElement.toggleAttribute('data-live-ready', true);
		document.documentElement.toggleAttribute('data-live-incident', down > 0);

		renderDiscovered(data.discovered);
		checkedAt = Date.parse(data.checkedAt) || Date.now();
		tick();
	};

	const renderDiscovered = (items: StatusPayload['discovered']): void => {
		const box = document.querySelector<HTMLElement>('[data-live-discovered]');
		const tpl = document.querySelector<HTMLTemplateElement>('[data-live-discovered-tpl]');
		if (!box || !tpl) return;
		box.replaceChildren();
		items.forEach((d) => {
			const node = tpl.content.firstElementChild?.cloneNode(true) as HTMLElement | undefined;
			if (!node) return;
			const link = node.querySelector<HTMLAnchorElement>('[data-d-link]');
			if (link) link.href = `https://${d.host}/`;
			node.querySelectorAll('[data-d-host]').forEach((el) => (el.textContent = d.host));
			setState(node, d.site.ok ? 'ok' : 'down', d.site);
			box.append(node);
		});
		box.closest<HTMLElement>('[data-live-discovered-wrap]')?.toggleAttribute('hidden', items.length === 0);
	};

	const unknown = (): void => {
		probes.forEach((el) => setState(el, 'unknown'));
		document.querySelectorAll('[data-live-checked]').forEach((el) => (el.textContent = 'estado no disponible'));
	};

	const tick = (): void => {
		if (!checkedAt) return;
		const s = Math.max(0, Math.round((Date.now() - checkedAt) / 1000));
		const text = s < 5 ? 'ahora mismo' : s < 60 ? `hace ${s} s` : `hace ${Math.floor(s / 60)} min`;
		document.querySelectorAll('[data-live-checked]').forEach((el) => (el.textContent = text));
	};

	const load = async (): Promise<void> => {
		if (busy) return;
		busy = true;
		document.documentElement.toggleAttribute('data-live-loading', true);
		try {
			const res = await fetch('/api/status', { headers: { accept: 'application/json' } });
			if (!res.ok) throw new Error(String(res.status));
			paint((await res.json()) as StatusPayload);
		} catch {
			unknown();
		} finally {
			busy = false;
			document.documentElement.toggleAttribute('data-live-loading', false);
		}
	};

	const schedule = (): void => {
		window.clearInterval(timer);
		timer = window.setInterval(() => {
			if (document.visibilityState === 'visible') void load();
		}, REFRESH_MS);
	};

	probes.forEach((el) => el.setAttribute('data-state', 'checking'));
	document.querySelectorAll('[data-live-refresh]').forEach((b) =>
		b.addEventListener('click', () => {
			void load();
			schedule();
		})
	);
	document.addEventListener('visibilitychange', () => {
		if (document.visibilityState === 'visible' && Date.now() - checkedAt > REFRESH_MS) void load();
	});
	window.setInterval(tick, 1000);

	void load();
	schedule();
}
