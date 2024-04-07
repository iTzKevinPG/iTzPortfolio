import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-skills',
	standalone: true,
	imports: [],
	templateUrl: './skills.component.html',
	styleUrl: './skills.component.scss'
})
export class SkillsComponent implements OnInit {
	cloneAndAppendSlides() {
		const slideElements = document.querySelectorAll('.skills-container__logos-slide');

		slideElements.forEach((slideElement) => {
			const copy = slideElement.cloneNode(true) as HTMLElement;

			const logosContainer = slideElement.parentElement;

			if (logosContainer) {
				logosContainer.appendChild(copy);
			} else {
				console.error('Logos container not found for the slide', slideElement);
			}
		});
	}

	ngOnInit(): void {
		this.cloneAndAppendSlides();
	}
}
