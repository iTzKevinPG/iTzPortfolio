import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';

export interface NavSection {
	id: string;
	label: string;
}

@Component({
	selector: 'app-section-nav',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './section-nav.component.html',
	styleUrl: './section-nav.component.scss'
})
export class SectionNavComponent {
	// Componente presentacional: la detección de sección activa y progreso vive en Home.
	readonly sections = input.required<NavSection[]>();
	readonly activeId = input<string | null>(null);
	readonly trail = input(0);

	/** Alto de cada fila en rem (debe coincidir con el SCSS) para posicionar el thumb. */
	readonly step = 2.25;

	readonly activeIndex = computed(() => {
		const id = this.activeId();
		const idx = this.sections().findIndex(section => section.id === id);
		return idx < 0 ? 0 : idx;
	});

	/** Índice del último punto "encendido": hasta donde la línea ya pintó. */
	readonly litIndex = computed(() => {
		const total = this.sections().length;
		if (total <= 1) {
			return 0;
		}
		return Math.floor(this.trail() * (total - 1) + 0.0001);
	});

	scrollTo(event: Event, id: string): void {
		event.preventDefault();
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
}
