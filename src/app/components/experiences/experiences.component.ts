import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
	selector: 'app-experiences',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './experiences.component.html',
	styleUrl: './experiences.component.scss',
	animations: [
		trigger('slideInOut', [
			transition(':enter', [
				style({ transform: 'translateY(100%)', opacity: 0, zIndex: 2 }),
				animate('2s ease-in-out', style({ transform: 'translateY(0%)', opacity: 1 }))
			])
		])
	]
})
export class ExperiencesComponent {}
