import { CommonModule } from '@angular/common';
import { Component, effect, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { LightboxService } from '../../services/lightbox.service';

@Component({
	selector: 'app-lightbox',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './lightbox.component.html',
	styleUrl: './lightbox.component.scss'
})
export class LightboxComponent {
	readonly lightbox = inject(LightboxService);

	@ViewChild('closeBtn') private closeBtn?: ElementRef<HTMLButtonElement>;
	private previousFocus: HTMLElement | null = null;

	constructor() {
		// Bloquea el scroll de fondo y gestiona el foco al abrir/cerrar.
		effect(() => {
			const image = this.lightbox.current();
			if (typeof document === 'undefined') {
				return;
			}
			document.body.classList.toggle('lightbox-open', !!image);

			if (image) {
				this.previousFocus = document.activeElement as HTMLElement;
				setTimeout(() => this.closeBtn?.nativeElement.focus(), 0);
			} else if (this.previousFocus) {
				this.previousFocus.focus();
				this.previousFocus = null;
			}
		});
	}

	@HostListener('document:keydown.escape')
	onEscape(): void {
		this.close();
	}

	close(): void {
		this.lightbox.close();
	}
}
