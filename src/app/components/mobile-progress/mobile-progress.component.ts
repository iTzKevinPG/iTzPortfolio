import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { NavSection } from '../section-nav/section-nav.component';

/**
 * Barra de progreso superior para móvil (reemplaza al nav lateral, oculto <960px).
 * Presentacional: consume `activeId`/`trail` que Home ya calcula (single source of truth).
 */
@Component({
	selector: 'app-mobile-progress',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './mobile-progress.component.html',
	styleUrl: './mobile-progress.component.scss'
})
export class MobileProgressComponent {
	readonly sections = input.required<NavSection[]>();
	readonly activeId = input<string | null>(null);
	readonly trail = input(0);

	readonly activeLabel = computed(() => {
		const id = this.activeId();
		const section = this.sections().find(item => item.id === id);
		return section ? section.label : this.sections()[0]?.label ?? '';
	});

	readonly percent = computed(() => Math.round(this.trail() * 100));
}
