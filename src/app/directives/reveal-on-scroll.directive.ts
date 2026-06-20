import { afterNextRender, DestroyRef, Directive, ElementRef, inject, Input } from '@angular/core';

/**
 * Revela un elemento cuando entra en el viewport del contenedor scrollable (`.main-container`).
 * Uso: <div class="reveal" appReveal [revealDelay]="80">…</div>
 * La clase base `.reveal` (opacity/translate) y `.is-visible` viven en styles.scss.
 */
@Directive({
	selector: '[appReveal]',
	standalone: true
})
export class RevealOnScrollDirective {
	/** Stagger en milisegundos antes de añadir `is-visible`. */
	@Input() revealDelay = 0;

	private readonly el = inject(ElementRef<HTMLElement>);
	private readonly destroyRef = inject(DestroyRef);

	constructor() {
		afterNextRender(() => {
			const node = this.el.nativeElement;

			// Fallback: si no hay IntersectionObserver, mostrar de inmediato (nunca dejar el contenido oculto).
			if (typeof IntersectionObserver === 'undefined') {
				node.classList.add('is-visible');
				return;
			}

			const root = document.querySelector('.main-container');
			const observer = new IntersectionObserver(
				entries => {
					for (const entry of entries) {
						if (entry.isIntersecting) {
							window.setTimeout(() => node.classList.add('is-visible'), this.revealDelay);
							observer.unobserve(entry.target);
						}
					}
				},
				{ root, rootMargin: '0px 0px -10% 0px', threshold: 0.15 }
			);

			observer.observe(node);
			this.destroyRef.onDestroy(() => observer.disconnect());
		});
	}
}
