import { CommonModule } from '@angular/common';
import { afterNextRender, Component, DestroyRef, ElementRef, inject, signal, ViewChild } from '@angular/core';

/**
 * Recorta el contenido proyectado a unas líneas en móvil y muestra "Ver más / Ver menos".
 * El botón solo aparece si el texto realmente se recorta (mide overflow tras render y en resize).
 * En desktop el contenido se muestra completo y el botón se oculta por CSS.
 */
@Component({
	selector: 'app-expandable',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './expandable.component.html',
	styleUrl: './expandable.component.scss'
})
export class ExpandableComponent {
	@ViewChild('content', { static: true }) private content!: ElementRef<HTMLElement>;

	readonly expanded = signal(false);
	readonly canExpand = signal(false);

	private readonly destroyRef = inject(DestroyRef);

	constructor() {
		afterNextRender(() => {
			const measure = (): void => {
				const el = this.content.nativeElement;
				// Si está expandido no podemos medir el recorte; asumimos que sí podía.
				if (this.expanded()) {
					return;
				}
				this.canExpand.set(el.scrollHeight - el.clientHeight > 2);
			};

			measure();
			const onResize = (): void => measure();
			window.addEventListener('resize', onResize, { passive: true });
			this.destroyRef.onDestroy(() => window.removeEventListener('resize', onResize));
		});
	}

	toggle(): void {
		this.expanded.update(value => !value);
	}
}
