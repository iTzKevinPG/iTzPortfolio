/**
 * Movimiento del sitio — "Planos vivos" (GSAP + ScrollTrigger + Lenis, mismo stack que Goldem,
 * El Fogón, Guaro & Pola y LUMAcars). Un momento por sección, no diez:
 *
 * - Portada: el nombre sube letra a letra; el retrato y su diagrama de nodos se inclinan con el puntero.
 * - Fondo: el resplandor violeta sigue al puntero (solo con ratón).
 * - Sobre mí: el texto se enciende palabra a palabra con el scroll.
 * - Títulos: suben detrás de una cortina (clip del h2).
 * - Experiencia: la línea del tiempo se dibuja con el scroll y cada nodo se enciende al pasar.
 * - Capturas: se destapan de arriba abajo y tienen un parallax leve.
 * - Proyectos: reflejo que sigue al cursor en cada tarjeta.
 * - Skills: las cintas corren más rápido y cambian de sentido según el scroll.
 *
 * Reglas: solo transform / opacity / clip-path; los estados ocultos los pone este script (sin JS todo
 * se ve); el botón "Reducir animaciones" (MotionToggle) apaga todo en vivo. No se lee el ajuste del SO.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { MOV_EVENT, movReducido } from './motion-pref';

gsap.registerPlugin(ScrollTrigger);

const root = document.documentElement;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
let teardown: (() => void) | null = null;

export function initMotion(): void {
	window.__itzMotion = true;
	start();
	window.addEventListener(MOV_EVENT, () => {
		teardown?.();
		start();
	});
	void document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

function start(): void {
	const reduced = movReducido();
	root.classList.toggle('mov-reducido', reduced);
	root.classList.toggle('motion', !reduced);

	if (reduced) {
		root.classList.remove('intro');
		teardown = null;
		return;
	}

	const lenis = smoothScroll();
	const offPointer = pointer();
	const offBelts = belts();
	const ctx = gsap.context(() => {
		heroIntro();
		heads();
		litWords();
		timeline();
		shots();
		reveals();
	});

	teardown = () => {
		ctx.revert();
		offPointer();
		offBelts();
		lenis.destroy();
		window.__lenis = undefined;
		ScrollTrigger.refresh();
	};
}

/* ---------------------------------------------------------------- scroll suave */

function smoothScroll(): Lenis {
	const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
	window.__lenis = lenis;
	lenis.on('scroll', ScrollTrigger.update);
	const tick = (time: number): void => lenis.raf(time * 1000);
	gsap.ticker.add(tick);
	gsap.ticker.lagSmoothing(0);

	const onClick = (e: MouseEvent): void => {
		const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
		const id = a?.getAttribute('href');
		if (!a || !id || id === '#') return;
		const target = document.querySelector<HTMLElement>(id);
		if (!target) return;
		e.preventDefault();
		lenis.scrollTo(target, { offset: -24 });
		history.replaceState(null, '', id);
	};
	document.addEventListener('click', onClick);

	const destroy = lenis.destroy.bind(lenis);
	lenis.destroy = () => {
		gsap.ticker.remove(tick);
		document.removeEventListener('click', onClick);
		destroy();
	};
	return lenis;
}

/* ---------------------------------------------------------------- portada */

function heroIntro(): void {
	const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
	tl.fromTo(
		'[data-hero-char]',
		{ yPercent: 115, rotate: 8, opacity: 1 },
		{ yPercent: 0, rotate: 0, duration: 1.3, stagger: 0.035 },
		0.1
	)
		.fromTo('[data-hero-visual]', { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 1.6 }, 0.25)
		.fromTo('[data-hero-in]', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1, stagger: 0.08 }, 0.55);
	root.classList.remove('intro');
}

/* ---------------------------------------------------------------- puntero */

function pointer(): () => void {
	if (!finePointer) return () => {};
	const glow = document.querySelector<HTMLElement>('[data-glow]');
	const visual = document.querySelector<HTMLElement>('[data-hero-visual]');
	const gx = glow ? gsap.quickTo(glow, 'x', { duration: 1.2, ease: 'power3.out' }) : null;
	const gy = glow ? gsap.quickTo(glow, 'y', { duration: 1.2, ease: 'power3.out' }) : null;
	if (glow) gsap.set(glow, { x: window.innerWidth * 0.7, y: window.innerHeight * 0.2 });

	let frame = 0;
	let px = 0;
	let py = 0;
	const apply = (): void => {
		frame = 0;
		if (visual) {
			const r = visual.getBoundingClientRect();
			const tx = ((px - (r.left + r.width / 2)) / window.innerWidth) * 18;
			const ty = ((py - (r.top + r.height / 2)) / window.innerHeight) * -18;
			visual.style.setProperty('--tx', tx.toFixed(2));
			visual.style.setProperty('--ty', ty.toFixed(2));
		}
	};

	const onMove = (e: PointerEvent): void => {
		px = e.clientX;
		py = e.clientY;
		gx?.(px);
		gy?.(py);
		const card = (e.target as HTMLElement).closest<HTMLElement>('[data-card]');
		if (card) {
			const r = card.getBoundingClientRect();
			card.style.setProperty('--px', `${px - r.left}px`);
			card.style.setProperty('--py', `${py - r.top}px`);
		}
		if (!frame) frame = requestAnimationFrame(apply);
	};

	window.addEventListener('pointermove', onMove, { passive: true });
	return () => {
		window.removeEventListener('pointermove', onMove);
		cancelAnimationFrame(frame);
		visual?.style.removeProperty('--tx');
		visual?.style.removeProperty('--ty');
		if (glow) gsap.set(glow, { clearProps: 'transform' });
	};
}

/* ---------------------------------------------------------------- títulos y bloques */

function heads(): void {
	gsap.utils.toArray<HTMLElement>('[data-head] > span').forEach((el) => {
		gsap.fromTo(
			el,
			{ yPercent: 105 },
			{
				yPercent: 0,
				duration: 1.1,
				ease: 'expo.out',
				scrollTrigger: { trigger: el.parentElement, start: 'top 88%', once: true }
			}
		);
	});
}

function reveals(): void {
	const items = gsap.utils.toArray<HTMLElement>('[data-reveal]');
	gsap.set(items, { opacity: 0, y: 28 });
	ScrollTrigger.batch(items, {
		start: 'top 90%',
		once: true,
		onEnter: (batch) =>
			gsap.to(batch, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.08, overwrite: true })
	});
}

function litWords(): void {
	document.querySelectorAll<HTMLElement>('[data-words]').forEach((block) => {
		const words = block.querySelectorAll('.w');
		gsap.fromTo(
			words,
			{ opacity: 0.16 },
			{
				opacity: 1,
				ease: 'none',
				stagger: 0.1,
				scrollTrigger: { trigger: block, start: 'top 82%', end: 'bottom 50%', scrub: 0.6 }
			}
		);
	});
}

/* ---------------------------------------------------------------- experiencia */

function timeline(): void {
	const tl = document.querySelector<HTMLElement>('[data-timeline]');
	const fill = tl?.querySelector('[data-timeline-fill]');
	if (!tl || !fill) return;

	gsap.fromTo(
		fill,
		{ scaleY: 0 },
		{ scaleY: 1, ease: 'none', scrollTrigger: { trigger: tl, start: 'top 60%', end: 'bottom 60%', scrub: 0.5 } }
	);

	tl.querySelectorAll<HTMLElement>('[data-tl-item]').forEach((item) => {
		ScrollTrigger.create({
			trigger: item,
			start: 'top 60%',
			onEnter: () => item.classList.add('is-lit'),
			onLeaveBack: () => item.classList.remove('is-lit')
		});
	});
}

function shots(): void {
	gsap.utils.toArray<HTMLElement>('[data-shot]').forEach((shot) => {
		const frame = shot.querySelector('[data-shot-frame]');
		const img = shot.querySelector('img');
		if (frame) {
			gsap.fromTo(
				frame,
				{ clipPath: 'inset(0% 0% 100% 0%)' },
				{
					clipPath: 'inset(0% 0% 0% 0%)',
					duration: 1.3,
					ease: 'expo.inOut',
					scrollTrigger: { trigger: shot, start: 'top 85%', once: true }
				}
			);
		}
		if (img) {
			gsap.fromTo(
				img,
				{ yPercent: -2.5 },
				{
					yPercent: 2.5,
					ease: 'none',
					scrollTrigger: { trigger: shot, start: 'top bottom', end: 'bottom top', scrub: true }
				}
			);
		}
	});
}

/* ---------------------------------------------------------------- skills */

function belts(): () => void {
	const tracks = gsap.utils.toArray<HTMLElement>('[data-belt-track]');
	if (!tracks.length) return () => {};
	const wrap = gsap.utils.wrap(0, 1);
	const state = tracks.map((track) => ({
		track,
		dir: Number(track.closest<HTMLElement>('[data-belt]')?.dataset.dir ?? 1),
		pos: Math.random()
	}));

	// Vueltas por segundo en reposo; el scroll multiplica la velocidad y decide el sentido.
	const base = 1 / 55;
	let boost = 1;
	let sign = 1;

	const tick = (_t: number, delta: number): void => {
		const dt = delta / 1000;
		boost += (1 - boost) * Math.min(1, dt * 2.5);
		state.forEach((s) => {
			s.pos = wrap(s.pos + base * boost * sign * s.dir * dt);
			gsap.set(s.track, { xPercent: -50 * s.pos });
		});
	};
	gsap.ticker.add(tick);

	const st = ScrollTrigger.create({
		trigger: tracks[0].closest('section'),
		start: 'top bottom',
		end: 'bottom top',
		onUpdate: (self) => {
			sign = self.direction;
			boost = Math.max(boost, 1 + Math.min(Math.abs(self.getVelocity()) / 250, 7));
		}
	});

	return () => {
		gsap.ticker.remove(tick);
		st.kill();
		gsap.set(tracks, { clearProps: 'transform' });
	};
}
