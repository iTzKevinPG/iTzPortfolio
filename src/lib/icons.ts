/**
 * Íconos como paths SVG (viewBox 0 0 24 24), resueltos al compilar: cero peticiones extra.
 * Marcas: simple-icons (CC0). Propios: los de la interfaz y los que simple-icons no incluye.
 */
import * as si from 'simple-icons';

const own: Record<string, string> = {
	linkedin:
		'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z',
	cv: 'M6 2h8.6L20 7.4V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm8 1.5V8h4.5L14 3.5ZM8 12v1.6h8V12H8Zm0 3.4V17h8v-1.6H8Zm0-6.8v1.6h4V8.6H8Z',
	arrow: 'M13.2 5.3 19.9 12l-6.7 6.7-1.4-1.4 4.3-4.3H4v-2h12.1l-4.3-4.3 1.4-1.4Z',
	external:
		'M14 3h7v7h-2V6.4l-9.3 9.3-1.4-1.4L17.6 5H14V3ZM5 5h6v2H5v12h12v-6h2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z',
	expand:
		'M4 4h6v2H7.4l4 4L10 11.4l-4-4V10H4V4Zm16 0v6h-2V7.4l-4 4L12.6 10l4-4H14V4h6ZM4 20v-6h2v2.6l4-4 1.4 1.4-4 4H10v2H4Zm16 0h-6v-2h2.6l-4-4 1.4-1.4 4 4V14h2v6Z',
	close: 'M6.4 5 12 10.6 17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4L12 13.4 6.4 19 5 17.6 10.6 12 5 6.4 6.4 5Z',
	pause: 'M7 5h3.6v14H7V5Zm6.4 0H17v14h-3.6V5Z',
	play: 'M8 5.5v13a1 1 0 0 0 1.5.86l10.4-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z'
};

export function iconPath(slug: string): string | undefined {
	if (own[slug]) return own[slug];
	const key = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}` as keyof typeof si;
	const icon = si[key] as { path: string } | undefined;
	return icon?.path;
}
