# Pendientes

_Actualizado el 19/11/2026, tras la migración a Astro._

## Hecho en la migración

- [x] Angular 17 → Astro 7 estático; fuera Angular, zone.js, Karma/Jasmine, Docker y restos de SSR.
- [x] Contenido centralizado en `src/data/site.ts`, con ortografía corregida.
- [x] Marca "Planos vivos" (`docs/BRAND.md` + `src/styles/tokens.css`), fuentes autoalojadas.
- [x] Movimiento con GSAP + ScrollTrigger + Lenis, botón propio para reducirlo (sin leer el ajuste del SO).
- [x] Imágenes optimizadas al compilar (AVIF + WebP, varios anchos); íconos SVG del sprite en lugar de 31 archivos.
- [x] SEO: canonical en `/`, Open Graph con `og.jpg` 1200×630, JSON-LD, `sitemap.xml`, `robots.txt`,
      redirección `/home` → `/`.
- [x] Cabeceras de seguridad (CSP, X-Frame-Options, etc.) y caché inmutable para `/_astro/*`.
- [x] Responsive revisado con capturas en 360, 390, 768, 1024, 1440 y 1920 px.

## Hecho: proyectos en vivo (20/11/2026)

- [x] Página `/en-vivo`: mapa de nodos, tablero con estado y latencia de cada sitio y API, refresco cada 60 s.
- [x] Pages Function `/api/status` con lista blanca y caché de 30 s; descubrimiento de subdominios por DNS (opcional).
- [x] Banda en el home, entrada "En vivo" en la navegación, pastilla en el hero y enlace en el pie.
- [x] Capturas de los 6 proyectos (`npm run live:shots`).

## Por hacer

- [ ] **www.itzkevindev.tech da error 522.** En Pages → itzportfolio → *Custom domains* añadir
      `www.itzkevindev.tech` y luego una regla de redirección www → apex (el canónico ya es el apex).
- [ ] Descubrimiento automático de subdominios: crear un token de Cloudflare con *Zone → DNS → Read* para la zona
      y añadir `CF_API_TOKEN` y `CF_ZONE_ID` en Pages → *Settings → Variables* (producción y vista previa).
- [ ] API de MitiMiti: exponer `GET /health` y cambiar su `check` a `'health'` en `src/data/live.ts`.
- [ ] Confirmar la etapa real de cada proyecto (`stage` en `src/data/live.ts`): hoy solo Goldem está como producción.
- [ ] ¿FairSplit (en Proyectos) es MitiMiti? Si sí, unificar o enlazar las dos fichas.

- [ ] **Cloudflare Pages:** confirmar en el panel que *Build command* = `npm run build` y *Output* = `dist`
      (antes apuntaba al build de Angular). Ver README → Despliegue.
- [ ] Probar en un móvil real de gama media (scroll suave, cintas, línea de experiencia).
- [ ] Correr Lighthouse en la URL publicada (meta: ≥ 90 en móvil).
- [ ] Decidir si se publica un correo de contacto (hoy solo LinkedIn, GitHub y CV).
- [ ] Enlaces a demo/repositorio de FairSplit, Sismicidad y Glamping si son públicos (`href` en `site.ts`).
- [ ] Opcional: activar Cloudflare Web Analytics (la CSP ya permite su script).
