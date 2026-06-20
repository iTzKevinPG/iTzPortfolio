import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ExpandableComponent } from '../expandable/expandable.component';
import { LightboxDirective } from '../../directives/lightbox.directive';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';

interface ExperienceTech {
	name: string;
	color: string;
}

interface ExperienceRole {
	label: string;
	variant: 'a' | 'b' | 'e' | 'f';
}

interface ExperienceSegment {
	text: string;
	highlight: boolean;
}

interface Experience {
	company: string;
	/** Mapea a la clase de color de empresa en el SCSS (`<span class="...">`). */
	accentClass: 'm' | 'd' | 'p' | 'g';
	/** Color del nodo del timeline (acento de la empresa). */
	accentColor: string;
	roleTitle: string;
	period: string;
	paragraphs: ExperienceSegment[][];
	technologies: ExperienceTech[];
	roles: ExperienceRole[];
	/** Ruta base de la imagen sin extension; el template arma .avif/.webp/.png. */
	image: string;
	alt: string;
	width: number;
	height: number;
}

/** Helper para construir parrafos: las cadenas planas son texto normal,
 *  los objetos {h} son fragmentos resaltados (equivalen a los `<span>` del HTML original). */
function p(...parts: (string | { h: string })[]): ExperienceSegment[] {
	return parts.map(part => (typeof part === 'string' ? { text: part, highlight: false } : { text: part.h, highlight: true }));
}

@Component({
	selector: 'app-experiences',
	standalone: true,
	imports: [CommonModule, RevealOnScrollDirective, ExpandableComponent, LightboxDirective],
	templateUrl: './experiences.component.html',
	styleUrl: './experiences.component.scss'
})
export class ExperiencesComponent {
	// Orden cronologico ascendente (Pragma 2020 -> Metro 2025): el timeline se lee de arriba hacia abajo.
	readonly experiences: Experience[] = [
		{
			company: 'Pragma',
			accentClass: 'g',
			accentColor: '#55ad47',
			roleTitle: 'Desarrollador',
			period: '2020',
			paragraphs: [
				p(
					'Desarrollo ',
					{ h: 'frontend' },
					' con ',
					{ h: 'React' },
					' y ',
					{ h: 'Angular' },
					' para productos internos, ajuste y mejora de servicios ',
					{ h: 'backend Java' },
					' y capacitación en fundamentos de programación y buenas prácticas.'
				)
			],
			technologies: [
				{ name: 'Java', color: '#d75138' },
				{ name: 'React', color: '#61dafb' },
				{ name: 'Angular', color: '#c40935' },
				{ name: 'TypeScript', color: '#007acc' }
			],
			roles: [
				{ label: 'Front-End', variant: 'e' },
				{ label: 'Back-End', variant: 'b' }
			],
			image: 'assets/img/Pragma',
			alt: 'Vista de Pragma',
			width: 1367,
			height: 768
		},
		{
			company: 'Pirani',
			accentClass: 'p',
			accentColor: '#32805b',
			roleTitle: 'Backend & Frontend',
			period: '2020 — 2023',
			paragraphs: [
				p(
					'Desarrollo de microservicios ',
					{ h: 'REST' },
					' bajo ',
					{ h: 'arquitectura hexagonal' },
					' para claridad y mantenibilidad. Migración de aplicaciones desde ',
					{ h: 'ASP.NET' },
					' hacia ',
					{ h: 'AngularJS/Angular 8+' },
					' reduciendo deuda técnica.'
				),
				p(
					'Optimización de servicios backend y consultas para rendimiento, integrando ',
					{ h: 'AWS' },
					' (S3, Cognito) e infraestructura en ',
					{ h: 'Kubernetes' },
					'.'
				)
			],
			technologies: [
				{ name: 'Java', color: '#d75138' },
				{ name: 'Kotlin', color: '#df7468' },
				{ name: 'C#', color: '#603493' },
				{ name: 'Angular', color: '#c40935' },
				{ name: 'MySQL', color: '#08668e' },
				{ name: 'MongoDB', color: '#55ad47' },
				{ name: 'AWS', color: '#ff9900' },
				{ name: 'Kubernetes', color: '#2c8ebb' },
				{ name: 'Arquitectura Hexagonal', color: '#603493' }
			],
			roles: [
				{ label: 'Backend', variant: 'b' },
				{ label: 'Front-End', variant: 'e' }
			],
			image: 'assets/img/PiraniRisk',
			alt: 'Vista de plataforma Pirani',
			width: 1367,
			height: 768
		},
		{
			company: 'Dynaudit',
			accentClass: 'd',
			accentColor: '#2d7dd2',
			roleTitle: 'Software Engineer',
			period: '2023 — 2025',
			paragraphs: [
				p(
					'Mejoras en plataforma ',
					{ h: 'multi-tenant' },
					' con ',
					{ h: 'arquitectura limpia' },
					' y diseño por capas, creando servicios ',
					{ h: '.NET' },
					' con modularidad y separación de responsabilidades.'
				),
				p(
					'Integración de componentes y despliegues en ',
					{ h: 'Azure' },
					' para estandarizar procesos cloud y ambientes, más desarrollo de interfaces ',
					{ h: 'React + MUI' },
					' con componentes reutilizables y patrones consistentes.'
				)
			],
			technologies: [
				{ name: '.NET', color: '#603493' },
				{ name: 'React', color: '#61dafb' },
				{ name: 'Azure', color: '#0078d4' },
				{ name: 'MUI', color: '#0acf83' },
				{ name: 'Arquitectura Limpia', color: '#453a94' }
			],
			roles: [
				{ label: 'Backend', variant: 'b' },
				{ label: 'Front-End', variant: 'e' }
			],
			image: 'assets/img/Dynaudit',
			alt: 'Vista de Dynaudit',
			width: 1367,
			height: 768
		},
		{
			company: 'Metro de Medellín',
			accentClass: 'm',
			accentColor: '#f27c45',
			roleTitle: 'Backend & Arquitectura',
			period: '2025 — Presente',
			paragraphs: [
				p(
					'Implementación de modelo ',
					{ h: 'offline-first' },
					' para mejorar disponibilidad de datos y experiencia en móvil. Diseño de arquitecturas ',
					{ h: 'backend' },
					' con criterios para ',
					{ h: 'servicios distribuidos' },
					' y ',
					{ h: 'monorepos' },
					', alineando lineamientos técnicos y prácticas de equipo.'
				),
				p(
					'Optimización de flujos ',
					{ h: 'DevOps' },
					' para estandarizar despliegues e integraciones cloud, y acompañamiento técnico para consolidar decisiones de ',
					{ h: 'arquitectura' },
					' y ',
					{ h: 'microservicios' },
					'.'
				)
			],
			technologies: [
				{ name: 'Node.js', color: '#68a063' },
				{ name: 'Kotlin', color: '#df7468' },
				{ name: 'Android', color: '#0b65a2' },
				{ name: 'React Federation', color: '#61dafb' },
				{ name: 'AWS', color: '#232f3e' },
				{ name: 'AppSync/Serverless', color: '#8a90ff' },
				{ name: 'GitLab CI/CD', color: '#005c8a' },
				{ name: 'Arquitectura Hexagonal', color: '#603493' },
				{ name: 'Monorepos', color: '#342a80' }
			],
			roles: [
				{ label: 'Backend', variant: 'b' },
				{ label: 'Architect', variant: 'a' }
			],
			image: 'assets/img/MetroCivica',
			alt: 'Vista de Metro de Medellín',
			width: 1367,
			height: 768
		}
	];
}
