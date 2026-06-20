import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RevealOnScrollDirective } from '../../directives/reveal-on-scroll.directive';

interface HighlightGroup {
	title: string;
	accent: string;
	items: string[];
}

@Component({
	selector: 'app-skills',
	standalone: true,
	imports: [CommonModule, RevealOnScrollDirective],
	templateUrl: './skills.component.html',
	styleUrl: './skills.component.scss'
})
export class SkillsComponent {
	readonly slideCopies = [0, 1];

	frontLogos = [
		{ src: 'assets/icons/angular.svg', title: 'Angular' },
		{ src: 'assets/icons/react.svg', title: 'React Js' },
		{ src: 'assets/icons/js.svg', title: 'Javascript' },
		{ src: 'assets/icons/ts.svg', title: 'Typescript' },
		{ src: 'assets/icons/css.svg', title: 'Css' },
		{ src: 'assets/icons/sass.svg', title: 'Sass' },
		{ src: 'assets/icons/html.svg', title: 'HTML5' }
	];

	backLogos = [
		{ src: 'assets/icons/java.svg', title: 'Java' },
		{ src: 'assets/icons/csharp.svg', title: 'C#' },
		{ src: 'assets/icons/kotlin.svg', title: 'Kotlin' },
		{ src: 'assets/icons/aws.svg', title: 'AWS Services' },
		{ src: 'assets/icons/mysql.svg', title: 'MySql' },
		{ src: 'assets/icons/sql.svg', title: 'Sql Server' }
	];

	toolsLogos = [
		{ src: 'assets/icons/dotnet.svg', title: '.Net' },
		{ src: 'assets/icons/docker.svg', title: 'Docker' },
		{ src: 'assets/icons/git.svg', title: 'Git Hub' },
		{ src: 'assets/icons/gitlab.svg', title: 'GitLab' },
		{ src: 'assets/icons/azure.svg', title: 'Azure' },
		{ src: 'assets/icons/kubernetes.svg', title: 'Kubernetes' },
		{ src: 'assets/icons/vsc.svg', title: 'Visual Studio Code' },
		{ src: 'assets/icons/vs.svg', title: 'Visual Studio' },
		{ src: 'assets/icons/workbench.svg', title: 'MySql Workbench' },
		{ src: 'assets/icons/manage.svg', title: 'Sql Server Management' },
		{ src: 'assets/icons/figma.svg', title: 'Figma' },
		{ src: 'assets/icons/jira.svg', title: 'Jira' },
		{ src: 'assets/icons/insomnia.svg', title: 'Insomnia' },
		{ src: 'assets/icons/postman.svg', title: 'Postman' }
	];

	highlightGroups: HighlightGroup[] = [
		{
			title: 'Front-end',
			accent: '#453a94',
			items: ['JavaScript / TypeScript', 'Angular (JS / 8+)', 'React', 'RXJs', 'Redux', 'MUI', 'CSS / Sass']
		},
		{
			title: 'Back-end',
			accent: '#f43b47',
			items: ['Java / Kotlin', 'C# / .NET', 'Node.js', 'REST APIs', 'MySQL', 'SQL Server', 'MongoDB', 'Redis']
		},
		{
			title: 'Arquitectura',
			accent: '#a36bfd',
			items: [
				'Arquitectura Hexagonal',
				'Microservicios (RESTful APIs)',
				'Monorepos',
				'Microfrontends (Federation)',
				'Arquitectura Limpia',
				'Lineamientos técnicos / C4'
			]
		},
		{
			title: 'Cloud & DevOps',
			accent: '#2d7dd2',
			items: [
				'AWS (AppSync, Cognito, Serverless, ECS, CloudFormation)',
				'Azure (App Services, Functions, Storage, DevOps)',
				'CI/CD (GitLab & GitHub Actions)',
				'Docker / Kubernetes',
				'Nginx'
			]
		},
		{
			title: 'Testing & Mobile',
			accent: '#55ad47',
			items: ['JUnit / Karma', 'TDD', 'Android (Kotlin)', 'AppSync + Datastore (offline-first)']
		},
		{
			title: 'Productividad',
			accent: '#f27c45',
			items: ['Git / Jira', 'Codex / MCPs', 'IA Models (apoyo a flujos)']
		}
	];
}
