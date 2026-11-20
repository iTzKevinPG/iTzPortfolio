# iTzPortfolio

Portafolio personal de Kevin Useche — [itzkevindev.tech](https://itzkevindev.tech).

Sitio estático en **Astro 7**, con movimiento en **GSAP + ScrollTrigger + Lenis** y despliegue en
**Cloudflare Pages**. Sistema de marca "Planos vivos" documentado en [`docs/BRAND.md`](docs/BRAND.md).

## Scripts

| Script | Qué hace |
|---|---|
| `npm run dev` | Servidor local en http://localhost:4321 |
| `npm run build` | Build estático en `dist/` (genera AVIF/WebP de las imágenes) |
| `npm run preview` | Sirve `dist/` para revisarlo |
| `npm run check` | Chequeo de tipos de Astro y TypeScript |
| `npm run format` | Prettier |
| `npm run live:shots` | Captura la portada de cada proyecto en vivo (usa Edge o Chrome local) |
| `npx wrangler pages dev dist` | Sirve el build **con** la función `/api/status` (tras `npm run build`) |

Requiere Node ≥ 22.23 (`.node-version` fija 24 para Cloudflare).

## Estructura

```
src/
  data/site.ts          ← TODO el contenido (textos, experiencia, proyectos, skills, enlaces)
  assets/img/           ← imágenes fuente; Astro las optimiza al compilar (no se publican tal cual)
  components/
    sections/           ← una por sección de la página (Hero, About, Experience, …)
    ui/                 ← piezas reutilizables (SectionHead, TechList, Shot, Icon, Sprite)
    chrome/             ← fijos de la página (Backdrop, SectionNav, MotionToggle, Lightbox)
  layouts/BaseLayout.astro  ← <head>, SEO, Open Graph, JSON-LD, carga de scripts
  scripts/              ← motion.ts (GSAP, carga diferida), nav.ts, motion-pref.ts
  styles/               ← tokens.css (marca) y global.css (base)
  pages/                ← index, en-vivo, 404, sitemap.xml
  data/live.ts          ← registro de proyectos en vivo (subdominios, APIs, etapa)
  components/live/      ← mapa (LiveMap) y ficha (LiveCard) de /en-vivo
functions/api/status.ts ← Pages Function: estado y latencia de los proyectos (caché 30 s)
scripts/live-shots.mjs  ← capturas de los proyectos en vivo (npm run live:shots)
public/                 ← _headers (seguridad y caché), _redirects, robots.txt, favicon, og.jpg
docs/BRAND.md           ← reglas de marca y cómo crear secciones, módulos y páginas
```

Para editar textos solo hace falta tocar `src/data/site.ts`.

## Despliegue (Cloudflare Pages)

El proyecto de Pages está conectado a GitHub: cada push a `main` publica producción y cada rama genera una
vista previa. Configuración en el panel de Pages → *Settings → Build*:

- **Framework preset:** Astro
- **Build command:** `npm run build`
- **Build output directory:** `dist` (también declarado en `wrangler.toml`)
- **Node:** lo toma de `.node-version`

Cabeceras de seguridad y caché en `public/_headers`. `/home` (la URL de la versión Angular) redirige a `/`.
