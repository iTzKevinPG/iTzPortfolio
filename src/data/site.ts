/**
 * Todo el contenido del sitio vive aquí. Las secciones solo leen de este archivo.
 *
 * Convenciones:
 * - `**texto**` resalta (máximo 2–3 por párrafo; ver docs/BRAND.md → "Texto").
 * - Las imágenes se importan desde `src/assets/img` para que Astro genere AVIF/WebP a varios anchos.
 * - `icon` es el slug de simple-icons (https://simpleicons.org). Si la marca no existe allí, se omite
 *   y la etiqueta se pinta con el nodo de la marca.
 */
import type { ImageMetadata } from 'astro';
import avatar from '@/assets/img/avatar.webp';
import pragma from '@/assets/img/Pragma.png';
import pirani from '@/assets/img/PiraniRisk.png';
import dynaudit from '@/assets/img/Dynaudit.png';
import metro from '@/assets/img/MetroCivica.png';
import fairsplit from '@/assets/img/FairSplit.png';
import juliana from '@/assets/img/Juliana.png';
import glamping from '@/assets/img/Glamping.png';
import sismos from '@/assets/img/ProjectSesismes.png';
import portfolio from '@/assets/img/Portfolio.png';

export type Tech = { name: string; icon?: string };
export type Shot = { src: ImageMetadata; alt: string };

export const links = {
	cv: 'https://drive.google.com/file/d/164XeeSSt13x7djqbxHrIFwzGuDvOV50x/view?usp=sharing',
	linkedin: 'https://www.linkedin.com/in/iitzcopkevinii/',
	github: 'https://github.com/iTzKevinPG',
	recommendation: 'https://drive.google.com/file/d/1KB3hV4iiHr1KauKO4HCy1MAwGqC191qd/view?usp=sharing'
};

export const meta = {
	title: 'Kevin Useche · Software Engineer — Backend & Arquitectura',
	description:
		'Portafolio de Kevin Useche, Software Engineer con +5 años en backend, arquitectura de microservicios y despliegues cloud.',
	locale: 'es_CO'
};

export const nav = [
	{ id: 'inicio', label: 'Inicio' },
	{ id: 'sobre-mi', label: 'Sobre mí' },
	{ id: 'en-vivo', label: 'En vivo' },
	{ id: 'experiencia', label: 'Experiencia' },
	{ id: 'proyectos', label: 'Proyectos' },
	{ id: 'skills', label: 'Skills' },
	{ id: 'educacion', label: 'Educación' },
	{ id: 'contacto', label: 'Contacto' }
] as const;

export const hero = {
	greeting: 'Hola, soy Kevin Useche 👋',
	name: ['Software', 'Engineer'],
	role: 'Backend & Arquitectura',
	tagline: 'Apasionado por la tecnología y el desarrollo de software 👾',
	quote: 'Si puedes imaginarlo, puedes programarlo.',
	avatar: { src: avatar, alt: 'Retrato de Kevin Useche' }
};

export const about = {
	title: 'Sobre mí',
	text: 'Me encanta aprender y enfrentar desafíos. Llevo más de **5 años como Software Engineer** diseñando soluciones técnicas y construyendo arquitecturas que perduren, con el abanico de tecnologías que pida cada problema. Quienes trabajan conmigo o aprenden de mí me describen como un buen **líder** y un buen **profesor**.',
	now: { label: 'Ahora', text: 'Backend & Arquitectura en Metro de Medellín' }
};

export type Experience = {
	company: string;
	role: string;
	period: string;
	accent: string;
	current?: boolean;
	paragraphs: string[];
	tech: Tech[];
	shot: Shot;
};

// Orden cronológico ascendente: la línea se dibuja de arriba (2020) hacia abajo (hoy).
export const experience: Experience[] = [
	{
		company: 'Pragma',
		role: 'Desarrollador',
		period: '2020',
		accent: '#55ad47',
		paragraphs: [
			'Desarrollo **frontend** con React y Angular para productos internos, ajuste y mejora de servicios **backend Java** y capacitación en fundamentos de programación y buenas prácticas.'
		],
		tech: [
			{ name: 'Java', icon: 'openjdk' },
			{ name: 'React', icon: 'react' },
			{ name: 'Angular', icon: 'angular' },
			{ name: 'TypeScript', icon: 'typescript' }
		],
		shot: { src: pragma, alt: 'Sitio web de Pragma' }
	},
	{
		company: 'Pirani',
		role: 'Backend & Frontend',
		period: '2020 — 2023',
		accent: '#32a06b',
		paragraphs: [
			'Desarrollo de microservicios REST bajo **arquitectura hexagonal** para claridad y mantenibilidad. Migración de aplicaciones desde ASP.NET hacia AngularJS/Angular 8+, reduciendo **deuda técnica**.',
			'Optimización de servicios backend y consultas para rendimiento, integrando AWS (S3, Cognito) e infraestructura en Kubernetes.'
		],
		tech: [
			{ name: 'Java', icon: 'openjdk' },
			{ name: 'Kotlin', icon: 'kotlin' },
			{ name: 'C#' },
			{ name: 'Angular', icon: 'angular' },
			{ name: 'MySQL', icon: 'mysql' },
			{ name: 'MongoDB', icon: 'mongodb' },
			{ name: 'AWS' },
			{ name: 'Kubernetes', icon: 'kubernetes' }
		],
		shot: { src: pirani, alt: 'Mapa de calor de riesgos en la plataforma Pirani' }
	},
	{
		company: 'Dynaudit',
		role: 'Software Engineer',
		period: '2023 — 2025',
		accent: '#2d7dd2',
		paragraphs: [
			'Mejoras en una plataforma **multi-tenant** con arquitectura limpia y diseño por capas, creando servicios .NET con modularidad y separación de responsabilidades.',
			'Integración de componentes y despliegues en **Azure** para estandarizar procesos cloud y ambientes, más interfaces React + MUI con componentes reutilizables.'
		],
		tech: [
			{ name: '.NET', icon: 'dotnet' },
			{ name: 'React', icon: 'react' },
			{ name: 'Azure' },
			{ name: 'MUI', icon: 'mui' }
		],
		shot: { src: dynaudit, alt: 'Gestión de recursos en Dynaudit' }
	},
	{
		company: 'Metro de Medellín',
		role: 'Backend & Arquitectura',
		period: '2025 — hoy',
		accent: '#f27c45',
		current: true,
		paragraphs: [
			'Implementación de un modelo **offline-first** para mejorar la disponibilidad de datos y la experiencia en móvil. Diseño de arquitecturas backend para **servicios distribuidos** y monorepos, alineando lineamientos técnicos y prácticas de equipo.',
			'Optimización de flujos **DevOps** para estandarizar despliegues e integraciones cloud, y acompañamiento técnico en decisiones de arquitectura y microservicios.'
		],
		tech: [
			{ name: 'Node.js', icon: 'nodedotjs' },
			{ name: 'Kotlin', icon: 'kotlin' },
			{ name: 'Android', icon: 'android' },
			{ name: 'React Federation', icon: 'react' },
			{ name: 'AWS AppSync' },
			{ name: 'GitLab CI/CD', icon: 'gitlab' }
		],
		shot: { src: metro, alt: 'Vista de la plataforma de Metro de Medellín' }
	}
];

export const recommendation = {
	text: 'Carta de recomendación de **Pirani**, donde trabajé de 2020 a 2023.',
	cta: 'Leer la carta'
};

export type Project = {
	name: string;
	kind: 'Personal' | 'Profesional' | 'Universitario';
	role: string;
	accent: string;
	paragraphs: string[];
	tech: Tech[];
	shot: Shot;
	href?: string;
};

export const projects: Project[] = [
	{
		name: 'FairSplit',
		kind: 'Personal',
		role: 'Diseño y desarrollo',
		accent: '#61dafb',
		paragraphs: [
			'Plataforma para dividir gastos en grupo, con **balances al instante** y transferencias sugeridas. Nació para acabar con el "¿quién me debe?" y cerrar cuentas sin fricción, en modo local o con perfil en la nube.',
			'Cuidé la experiencia entre el detalle y la vista general para cargar el evento sin perder contexto.'
		],
		tech: [
			{ name: 'React', icon: 'react' },
			{ name: 'TypeScript', icon: 'typescript' },
			{ name: 'Vite', icon: 'vite' },
			{ name: 'Tailwind', icon: 'tailwindcss' },
			{ name: 'Zustand' }
		],
		shot: { src: fairsplit, alt: 'Interfaz de FairSplit con balances del grupo' }
	},
	{
		name: 'Juliana Cloud',
		kind: 'Profesional',
		role: 'Arquitectura · Full Stack',
		accent: '#2b8fe0',
		paragraphs: [
			'Plataforma de nómina en evolución. Trabajé en **microservicios** y en el front Angular para llevar un MVP a un producto robusto, con mejor UX y flujos afinados.'
		],
		tech: [
			{ name: 'Angular', icon: 'angular' },
			{ name: '.NET Core', icon: 'dotnet' },
			{ name: 'MySQL', icon: 'mysql' },
			{ name: 'AWS' },
			{ name: 'Figma', icon: 'figma' }
		],
		shot: { src: juliana, alt: 'Pantalla de inicio de sesión de Juliana Cloud' }
	},
	{
		name: 'Glamping',
		kind: 'Universitario',
		role: 'Líder de diseño y desarrollo',
		accent: '#55ad47',
		paragraphs: [
			'La experiencia de un glamping cercano a El Peñol (Antioquia). Dirigí el diseño y la construcción del front en **React** y el back en **Go**, con un equipo pequeño y diseños en Figma.'
		],
		tech: [
			{ name: 'React', icon: 'react' },
			{ name: 'Go', icon: 'go' },
			{ name: 'MySQL', icon: 'mysql' }
		],
		shot: { src: glamping, alt: 'Diseño del sitio del proyecto Glamping' }
	},
	{
		name: 'Sismicidad global',
		kind: 'Personal',
		role: 'Full Stack',
		accent: '#e5484d',
		paragraphs: [
			'Lista la actividad sísmica global del último mes con filtros y paginación. Back en **Ruby on Rails** y front en React con Redux y Atomic Design.'
		],
		tech: [
			{ name: 'Ruby on Rails', icon: 'rubyonrails' },
			{ name: 'React', icon: 'react' },
			{ name: 'Redux', icon: 'redux' }
		],
		shot: { src: sismos, alt: 'Panel de datos sísmicos globales' }
	},
	{
		name: 'Este portafolio',
		kind: 'Personal',
		role: 'Diseño y desarrollo',
		accent: '#a36bfd',
		paragraphs: [
			'Mi laboratorio permanente. Empezó en Angular y hoy es **Astro** estático con movimiento en GSAP, imágenes optimizadas al compilar y despliegue en **Cloudflare Pages**.'
		],
		tech: [{ name: 'Astro', icon: 'astro' }, { name: 'GSAP' }, { name: 'TypeScript', icon: 'typescript' }],
		shot: { src: portfolio, alt: 'Portada de este portafolio' },
		href: 'https://github.com/iTzKevinPG/iTzPortfolio'
	}
];

export const skills = {
	title: 'Skills',
	lead: 'Las tecnologías y herramientas con las que trabajo día a día.',
	marquee: [
		[
			{ name: 'Java', icon: 'openjdk' },
			{ name: 'Kotlin', icon: 'kotlin' },
			{ name: 'C#' },
			{ name: '.NET', icon: 'dotnet' },
			{ name: 'Node.js', icon: 'nodedotjs' },
			{ name: 'AWS' },
			{ name: 'Azure' },
			{ name: 'Docker', icon: 'docker' },
			{ name: 'Kubernetes', icon: 'kubernetes' },
			{ name: 'MySQL', icon: 'mysql' },
			{ name: 'SQL Server' },
			{ name: 'MongoDB', icon: 'mongodb' },
			{ name: 'Redis', icon: 'redis' }
		],
		[
			{ name: 'Angular', icon: 'angular' },
			{ name: 'React', icon: 'react' },
			{ name: 'TypeScript', icon: 'typescript' },
			{ name: 'JavaScript', icon: 'javascript' },
			{ name: 'Sass', icon: 'sass' },
			{ name: 'HTML5', icon: 'html5' },
			{ name: 'Git', icon: 'git' },
			{ name: 'GitHub Actions', icon: 'githubactions' },
			{ name: 'GitLab', icon: 'gitlab' },
			{ name: 'Figma', icon: 'figma' },
			{ name: 'Jira', icon: 'jira' },
			{ name: 'Postman', icon: 'postman' },
			{ name: 'Insomnia', icon: 'insomnia' }
		]
	] satisfies Tech[][],
	groups: [
		{
			title: 'Back-end',
			accent: '#f43b47',
			items: ['Java / Kotlin', 'C# / .NET', 'Node.js', 'REST APIs', 'MySQL', 'SQL Server', 'MongoDB', 'Redis']
		},
		{
			title: 'Arquitectura',
			accent: '#a36bfd',
			items: [
				'Arquitectura hexagonal',
				'Arquitectura limpia',
				'Microservicios',
				'Microfrontends (Federation)',
				'Monorepos',
				'Lineamientos técnicos / C4'
			]
		},
		{
			title: 'Cloud & DevOps',
			accent: '#2d7dd2',
			items: [
				'AWS (AppSync, Cognito, Serverless, ECS, CloudFormation)',
				'Azure (App Services, Functions, Storage, DevOps)',
				'CI/CD (GitLab y GitHub Actions)',
				'Docker / Kubernetes',
				'Nginx'
			]
		},
		{
			title: 'Front-end',
			accent: '#7c6cf0',
			items: ['TypeScript', 'Angular (JS / 8+)', 'React', 'RxJS', 'Redux', 'MUI', 'CSS / Sass']
		},
		{
			title: 'Testing & Mobile',
			accent: '#55ad47',
			items: ['JUnit / Karma', 'TDD', 'Android (Kotlin)', 'AppSync + DataStore (offline-first)']
		},
		{
			title: 'Productividad',
			accent: '#f27c45',
			items: ['Git / Jira', 'Codex / MCPs', 'Modelos de IA en flujos de trabajo']
		}
	]
};

export const education = {
	title: 'Educación',
	// Ascendente, igual que la experiencia.
	items: [
		{
			period: '2018',
			institution: 'I. E. Técnica Ciudad Luz',
			degree: 'Bachillerato técnico con énfasis en sistemas',
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
	],
	languages: ['Español — nativo', 'Inglés — intermedio'],
	interests: ['Tecnología', 'Arquitectura de software', 'Aprendizaje continuo']
};

export const contact = {
	title: '¿Construimos algo?',
	lead: 'Si tienes un reto de backend, arquitectura o un producto que quiere crecer, hablemos.',
	channels: [
		{ label: 'LinkedIn', href: links.linkedin, icon: 'linkedin' },
		{ label: 'GitHub', href: links.github, icon: 'github' },
		{ label: 'Ver CV', href: links.cv, icon: 'cv' }
	]
};
