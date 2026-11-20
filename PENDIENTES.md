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

## Por hacer

- [ ] **Cloudflare Pages:** confirmar en el panel que *Build command* = `npm run build` y *Output* = `dist`
      (antes apuntaba al build de Angular). Ver README → Despliegue.
- [ ] Probar en un móvil real de gama media (scroll suave, cintas, línea de experiencia).
- [ ] Correr Lighthouse en la URL publicada (meta: ≥ 90 en móvil).
- [ ] Decidir si se publica un correo de contacto (hoy solo LinkedIn, GitHub y CV).
- [ ] Enlaces a demo/repositorio de FairSplit, Sismicidad y Glamping si son públicos (`href` en `site.ts`).
- [ ] Opcional: activar Cloudflare Web Analytics (la CSP ya permite su script).
- [ ] **Siguiente fase:** la sección ambiciosa, sobre la base de `docs/BRAND.md`.
