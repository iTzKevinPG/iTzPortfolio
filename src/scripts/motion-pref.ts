/**
 * Preferencia de movimiento del sitio (sin dependencias: la usan el botón y el script inline).
 * Ojo: la clave también está escrita a mano en el script inline de BaseLayout.astro.
 */
import type Lenis from 'lenis';

export const MOV_KEY = 'itz-movimiento';
export const MOV_EVENT = 'itz:movimiento';

export function movReducido(): boolean {
	try {
		return localStorage.getItem(MOV_KEY) === 'reducido';
	} catch {
		return false;
	}
}

declare global {
	interface Window {
		__lenis?: Lenis;
		__itzMotion?: boolean;
	}
}
