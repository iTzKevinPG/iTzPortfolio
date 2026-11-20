/**
 * Captura la portada de cada proyecto de src/data/live.ts → src/assets/live/<id>.jpg (1440×900).
 * Astro la convierte a AVIF/WebP al compilar.
 *
 *   npm run live:shots              → todos
 *   npm run live:shots -- lumacars  → solo esos ids
 *
 * Usa el Edge o Chrome instalado (variable BROWSER_PATH para otra ruta).
 */
import { mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import puppeteer from 'puppeteer-core';
import { liveProjects } from '../src/data/live.ts';

const candidates = [
	process.env.BROWSER_PATH,
	'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
	'C:/Program Files/Google/Chrome/Application/chrome.exe',
	'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
	'/usr/bin/google-chrome',
	'/usr/bin/chromium'
].filter(Boolean);
const executablePath = candidates.find((p) => existsSync(p));
if (!executablePath) {
	console.error('No encontré Edge ni Chrome. Indica la ruta con BROWSER_PATH.');
	process.exit(1);
}

const only = process.argv.slice(2);
const projects = liveProjects.filter((p) => only.length === 0 || only.includes(p.id));
const outDir = new URL('../src/assets/live/', import.meta.url);
await mkdir(outDir, { recursive: true });

const browser = await puppeteer.launch({ executablePath, headless: true });
try {
	for (const p of projects) {
		const page = await browser.newPage();
		await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
		// Los sitios con aviso de edad u otros modales: se marca como ya aceptado antes de cargar.
		await page.evaluateOnNewDocument(() => {
			try {
				localStorage.setItem('gyp-mayor-de-edad', 'si');
			} catch {}
		});
		try {
			await page.goto(p.url, { waitUntil: 'networkidle2', timeout: 45000 });
			if (p.shotDismiss) {
				await page
					.click(p.shotDismiss, { timeout: 8000 })
					.catch(() => console.warn(`  (no encontré ${p.shotDismiss})`));
			}
			await new Promise((r) => setTimeout(r, 3500)); // deja terminar la animación de entrada
			const path = new URL(`${p.id}.jpg`, outDir);
			await page.screenshot({ path: path.pathname.replace(/^\/([A-Za-z]:)/, '$1'), type: 'jpeg', quality: 82 });
			console.log(`✓ ${p.id}`);
		} catch (err) {
			console.error(`✗ ${p.id}: ${err.message}`);
		} finally {
			await page.close();
		}
	}
} finally {
	await browser.close();
}
