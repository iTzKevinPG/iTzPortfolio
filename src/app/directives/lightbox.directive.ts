import { Directive, HostListener, inject, Input } from '@angular/core';
import { LightboxService } from '../services/lightbox.service';

/**
 * Abre la imagen completa en el lightbox al hacer click/tap.
 * Uso: <div appLightbox [lightboxSrc]="ruta" [lightboxAlt]="alt"> … </div>
 */
@Directive({
	selector: '[appLightbox]',
	standalone: true
})
export class LightboxDirective {
	@Input({ required: true }) lightboxSrc = '';
	@Input() lightboxAlt = '';

	private readonly lightbox = inject(LightboxService);

	@HostListener('click')
	onClick(): void {
		if (this.lightboxSrc) {
			this.lightbox.open({ src: this.lightboxSrc, alt: this.lightboxAlt });
		}
	}
}
