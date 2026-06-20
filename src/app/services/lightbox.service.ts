import { Injectable, signal } from '@angular/core';

export interface LightboxImage {
	src: string;
	alt: string;
}

@Injectable({ providedIn: 'root' })
export class LightboxService {
	readonly current = signal<LightboxImage | null>(null);

	open(image: LightboxImage): void {
		this.current.set(image);
	}

	close(): void {
		this.current.set(null);
	}
}
