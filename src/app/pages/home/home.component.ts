import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { afterNextRender, Component, DestroyRef, inject, signal } from '@angular/core';
import { BackgroundComponent } from '../../components/background/background.component';
import { ExperiencesComponent } from '../../components/experiences/experiences.component';
import { ProjectsComponent } from '../../components/projects/projects.component';
import { SectionNavComponent, NavSection } from '../../components/section-nav/section-nav.component';
import { SkillsComponent } from '../../components/skills/skills.component';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';

interface Education {
	period: string;
	institution: string;
	degree: string;
	place: string;
}

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [
		CommonModule,
		BackgroundComponent,
		ExperiencesComponent,
		SkillsComponent,
		ProjectsComponent,
		SectionNavComponent,
		RevealOnScrollDirective
	],
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	animations: [
		trigger('slideInOut', [
			transition(':enter', [
				style({ transform: 'translateY(100%)', opacity: 0, zIndex: 2 }),
				animate('1s ease-in-out', style({ transform: 'translateY(0%)', opacity: 1 }))
			])
		]),
		trigger('slideInOutLeft', [
			transition(':enter', [
				style({ transform: 'translateX(100%)', opacity: 0, zIndex: 2 }),
				animate('1s ease-in-out', style({ transform: 'translateX(0%)', opacity: 1 }))
			])
		]),
		trigger('slideInOutRight', [
			transition(':enter', [
				style({ transform: 'translateX(-100%)', opacity: 0, zIndex: 2 }),
				animate('1s ease-in-out', style({ transform: 'translateX(0%)', opacity: 1 }))
			])
		])
	]
})
export class HomeComponent {
	links: { [key: string]: string } = {
		['cv']: 'https://drive.google.com/file/d/164XeeSSt13x7djqbxHrIFwzGuDvOV50x/view?usp=sharing',
		['in']: 'https://www.linkedin.com/in/iitzcopkevinii/',
		['git']: 'https://github.com/iTzKevinPG',
		['rec']: 'https://drive.google.com/file/d/1KB3hV4iiHr1KauKO4HCy1MAwGqC191qd/view?usp=sharing'
	};

	navSections: NavSection[] = [
		{ id: 'inicio', label: 'Inicio' },
		{ id: 'sobre-mi', label: 'Sobre mí' },
		{ id: 'experiencia', label: 'Experiencia' },
		{ id: 'skills', label: 'Skills' },
		{ id: 'extras', label: 'Extras' },
		{ id: 'educacion', label: 'Educación' }
	];

	// Orden cronologico ascendente, consistente con el timeline de experiencia.
	education: Education[] = [
		{
			period: '2018',
			institution: 'Institución Educativa Técnica Ciudad Luz',
			degree: 'Bachillerato Técnico — énfasis en Sistemas',
			place: 'Ibagué'
		},
		{
			period: '2019 — 2020',
			institution: 'SENA',
			degree: 'Análisis y Desarrollo de Sistemas de Información',
			place: 'Ibagué'
		},
		{
			period: '2021 — 2025',
			institution: 'Universidad Cooperativa de Colombia',
			degree: 'Ingeniería de Software',
			place: 'Medellín'
		}
	];

	languages: string[] = ['Español · Nativo', 'Inglés · Intermedio'];

	interests: string[] = ['Tecnología', 'Arquitectura de Software', 'Aprendizaje continuo'];

	// Estado del nav lateral: Home posee `.main-container`, así que detecta sección activa y
	// progreso aquí y se los pasa al nav como inputs (el nav queda presentacional).
	readonly activeSectionId = signal<string | null>(null);
	readonly navTrail = signal(0);

	private readonly destroyRef = inject(DestroyRef);
	private navFrame = 0;

	constructor() {
		// IntersectionObserver(root:null) dispara ante cualquier scroll/layout sin depender de
		// eventos JS de scroll (robusto). El binding (scroll) del template añade suavidad.
		afterNextRender(() => {
			const observer = new IntersectionObserver(() => this.scheduleNavUpdate(), {
				root: null,
				threshold: Array.from({ length: 21 }, (_, i) => i / 20)
			});

			this.navSections.forEach(section => {
				const el = document.getElementById(section.id);
				if (el) {
					observer.observe(el);
				}
			});

			const onResize = (): void => this.scheduleNavUpdate();
			window.addEventListener('resize', onResize, { passive: true });
			this.scheduleNavUpdate();

			this.destroyRef.onDestroy(() => {
				observer.disconnect();
				window.removeEventListener('resize', onResize);
				if (this.navFrame) {
					cancelAnimationFrame(this.navFrame);
				}
			});
		});
	}

	onContainerScroll(): void {
		this.scheduleNavUpdate();
	}

	private scheduleNavUpdate(): void {
		if (!this.navFrame) {
			this.navFrame = requestAnimationFrame(() => {
				this.navFrame = 0;
				this.recomputeNav();
			});
		}
	}

	private recomputeNav(): void {
		const total = this.navSections.length;
		if (total === 0) {
			return;
		}

		// Línea de referencia: ~40% del alto del viewport.
		const reference = window.innerHeight * 0.4;
		const rects = this.navSections.map(section => document.getElementById(section.id)?.getBoundingClientRect());

		let index = 0;
		for (let k = 0; k < total; k++) {
			const rect = rects[k];
			if (rect && rect.top <= reference) {
				index = k;
			}
		}

		const current = rects[index];
		const intra = current ? Math.min(1, Math.max(0, (reference - current.top) / Math.max(1, current.height))) : 0;
		const trail = total > 1 ? Math.min(1, Math.max(0, (index + intra) / (total - 1))) : 0;

		this.navTrail.set(trail);
		this.activeSectionId.set(this.navSections[index].id);
	}
}
