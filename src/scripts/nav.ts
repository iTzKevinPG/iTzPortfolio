/**
 * Estado de la navegación: sección activa, puntos "encendidos" y progreso (--trail 0..1).
 * Funciona con o sin movimiento: lee el scroll nativo (Lenis también lo mueve).
 */
export function initNav(): void {
	const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')];
	const sections = links
		.map((a) => document.getElementById(a.dataset.navLink ?? ''))
		.filter((el): el is HTMLElement => !!el);
	const holders = document.querySelectorAll<HTMLElement>('[data-nav]');
	const label = document.querySelector<HTMLElement>('[data-nav-label]');
	const mbar = document.querySelector<HTMLElement>('.mbar');
	if (!sections.length) return;

	let frame = 0;

	const update = (): void => {
		frame = 0;
		// Línea de referencia al 40 % del alto: una sección está "activa" cuando su borde superior la cruza.
		const ref = window.innerHeight * 0.4;
		let index = 0;
		const rects = sections.map((s) => s.getBoundingClientRect());
		rects.forEach((r, i) => {
			if (r.top <= ref) index = i;
		});

		const current = rects[index];
		const intra = Math.min(1, Math.max(0, (ref - current.top) / Math.max(1, current.height)));
		const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
		const trail = atEnd ? 1 : Math.min(1, (index + intra) / (sections.length - 1));
		if (atEnd) index = sections.length - 1;

		holders.forEach((h) => h.style.setProperty('--trail', trail.toFixed(4)));
		links.forEach((a, i) => {
			a.classList.toggle('is-active', i === index);
			a.classList.toggle('is-lit', i <= index);
			if (i === index) a.setAttribute('aria-current', 'true');
			else a.removeAttribute('aria-current');
		});
		if (label) label.textContent = links[index].querySelector('.snav__label')?.textContent ?? '';
		mbar?.classList.toggle('is-shown', window.scrollY > window.innerHeight * 0.5);
	};

	const schedule = (): void => {
		if (!frame) frame = requestAnimationFrame(update);
	};

	window.addEventListener('scroll', schedule, { passive: true });
	window.addEventListener('resize', schedule, { passive: true });
	update();
}
