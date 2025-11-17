import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BackgroundComponent } from '../../components/background/background.component';
import { ExperiencesComponent } from '../../components/experiences/experiences.component';
import { SkillsComponent } from '../../components/skills/skills.component';
import { ProjectsComponent } from '../../components/projects/projects.component';
import { PLATFORM_ID } from '@angular/core';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [CommonModule, BackgroundComponent, ExperiencesComponent, SkillsComponent, ProjectsComponent],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
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

	constructor(@Inject(PLATFORM_ID) private readonly platformId: object) {}

	openLink(url: string): void {
		if (!this.links[url] || !isPlatformBrowser(this.platformId)) {
			return;
		}

		window.open(this.links[url], '_blank', 'noopener');
	}
}
