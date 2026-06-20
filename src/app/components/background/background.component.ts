import { afterNextRender, Component, DestroyRef, inject, OnInit } from '@angular/core';

@Component({
	selector: 'app-background',
	standalone: true,
	imports: [],
	templateUrl: './background.component.html',
	styleUrl: './background.component.scss'
})
export class BackgroundComponent implements OnInit {
	images: { [key: number]: string } = {
		1: 'html',
		2: 'css',
		3: 'js',
		4: 'ts',
		5: 'angular',
		6: 'aws',
		7: 'docker',
		8: 'git',
		9: 'dotnet',
		10: 'vsc',
		11: 'sql',
		12: 'kevin',
		13: 'mysql',
		14: 'node',
		15: 'react',
		16: 'figma'
	};

	items: string[] = [];

	private readonly destroyRef = inject(DestroyRef);

	private getRandomImg(): string {
		return this.images[Math.floor(Math.random() * Object.keys(this.images).length) + 1];
	}

	ngOnInit(): void {
		this.items = Array.from({ length: 12 }, () => this.getRandomImg() ?? 'kevin');
	}

	constructor() {
		// Parallax sutil al mouse. Las variables se escriben en :root para que tanto el fondo
		// como el nav lateral puedan reaccionar al mismo movimiento. afterNextRender => navegador.
		afterNextRender(() => {
			const rootStyle = document.documentElement.style;
			let frame = 0;
			let pointerX = 0;
			let pointerY = 0;

			const apply = (): void => {
				frame = 0;
				rootStyle.setProperty('--parallax-x', `${pointerX}`);
				rootStyle.setProperty('--parallax-y', `${pointerY}`);
			};

			const onPointerMove = (event: PointerEvent): void => {
				// Rango ~±18px alrededor del centro del viewport.
				pointerX = (event.clientX / window.innerWidth - 0.5) * 36;
				pointerY = (event.clientY / window.innerHeight - 0.5) * 36;
				if (!frame) {
					frame = requestAnimationFrame(apply);
				}
			};

			window.addEventListener('pointermove', onPointerMove, { passive: true });

			this.destroyRef.onDestroy(() => {
				window.removeEventListener('pointermove', onPointerMove);
				if (frame) {
					cancelAnimationFrame(frame);
				}
				rootStyle.removeProperty('--parallax-x');
				rootStyle.removeProperty('--parallax-y');
			});
		});
	}
}
