# Plan — Renovación del portafolio (mantenimiento, marca, movimiento y peso)

_Creado el 19/11/2026. Estado: **HECHO** el mismo día — Kevin eligió la opción B (Astro), marca "Planos vivos" con chispa lima y todo el paquete. Lo que queda está en `PENDIENTES.md`._

## Contexto rápido

- Sitio: itzkevindev.tech. Angular 17.3 standalone + SCSS, SPA en Cloudflare Pages (CI solo compila).
- Referencias internas usadas: `C:\personal-projects\` → goldem-chips, el-fogon-del-papi, licorera-new-page
  (Guaro & Pola), lumacars-spain, ekou-landing.
- Preferencias vigentes: personalidad y movimiento vivos; paleta púrpura; emojis cálidos en el hero; Space Grotesk;
  nada de patrones de IA ni sobretítulos de relleno; **no** heredar `prefers-reduced-motion` del sistema → botón propio.

## Diagnóstico (medido el 19/11/2026)

Capturas: escritorio 1440×900, tablet 820×1180 y móvil 390×844 (puppeteer-core + Edge).

### Peso
| Qué | Hoy | Nota |
|---|---|---|
| JS inicial | 91 KB gzip + 14 KB del home | Angular + zone.js + `@angular/animations` + `HttpClientModule` (no se usa) |
| Primera carga total | **~2,1 MB** | 1,4 MB son imágenes |
| Tras recorrer la página | **~3,4 MB** | |
| `src/assets` | **9,3 MB** | |
| Íconos SVG | hasta 330 KB c/u (react, node, sass, postman…) | traen PNG incrustados; un SVG limpio pesa 1–3 KB |
| Avatar | 4634×4634 px (245 KB AVIF) | se muestra a 160 px |
| PNG de respaldo | ~4 MB | nunca se descargan en navegadores actuales (AVIF/WebP) |
| `Pragma.webp` | 609 KB | el AVIF pesa 105 KB |
| `RiskmentSuite.png` | 80 KB | no se usa |

### Arquitectura
- **El scroll vive en `.main-container` (`overflow:auto; height:100dvh`), no en el documento.** Esto rompe el scroll
  suave (Lenis), la barra del navegador en móvil, la restauración de scroll y obliga a tres sistemas de observación
  distintos (Home, nav, directiva de reveal). Es la causa raíz de que el scroll no se sienta fluido.
- Tres sistemas de animación mezclados: `@angular/animations` (entra de lado con `translateX(100%)`), directiva
  `appReveal` (un IntersectionObserver por elemento) y transiciones CSS sueltas.
- Contenido repartido: experiencias en TS, skills en TS, **proyectos escritos a mano en HTML con `style=""`**,
  educación en el Home. No hay un solo lugar para editar textos.
- Critical CSS duplicado en `index.html` + truco `app-prehydrated` que ya no aporta (no hay SSR).
- `user-select: none` en todo el sitio: no se puede copiar texto (ni el correo, ni nombres de tecnologías).
- Restos: `src/assets/i18n` en `angular.json`, Karma/Jasmine sin un solo test, README habla de Docker, SSG y
  Digital Ocean (ya no aplica).

### Diseño (capturas)
- **Tarjeta dentro de tarjeta dentro de tarjeta** (sección → card de experiencia → chips con fondo). En móvil se
  come ~25 % del ancho en paddings anidados.
- Fondo gris (`hsl(h 10% 15%)`) apagado; el púrpura solo aparece en la esquina inferior derecha.
- Íconos flotantes aleatorios y borrosos detrás del texto: distraen, cambian en cada visita y son lo más pesado.
- Chips de tecnología con colores de marca ajenos y **texto blanco sobre cian/verde claro** (React, MUI, Figma):
  contraste insuficiente y ruido visual.
- Badges de rol con degradados (Architect, Full Stack) se ven de otra época.
- El hero es una tarjeta más; no hay jerarquía de "portada". La cita va en 12 px y casi no se lee.
- "Sobre mí" usa `<h3>` para un párrafo largo y resalta 12 palabras en morado: cuando todo resalta, nada resalta.
- "Extras" mezcla la recomendación y los proyectos; el nombre no dice qué hay.
- Educación en móvil: la columna del año empuja el texto y cada fila queda con una sangría distinta.
- **No hay cierre**: la página termina en un fondo vacío, sin contacto ni pie.
- Varios `<h1>` en la página.

### Textos con errores
`dia a dia` → día a día · `ultimo` → último · `Nacio` → Nació · `friccion` → fricción · `Cuide`/`mejore` → Cuidé/mejoré ·
`Diseno` → Diseño · `Aplicacion`/`sismica`/`ultimo mes`/`Reforce` → con tilde · `Penol` → Peñol ·
`"Sí puedes imaginarlo"` → **"Si** puedes imaginarlo" (condicional, sin tilde) · `CV Resume` → "Ver CV" o "Descargar CV".
La tarjeta del portafolio dice "SSR/SSG y Digital Ocean": desactualizado.

---

## Decisiones para Kevin

### 1. Stack
- **A. Quedarse en Angular, subir a 22** (17→18→19→20→21→22 con `ng update`). Zoneless, `@for`/`@if`, signals,
  sin `@angular/animations` ni zone.js. JS inicial estimado ~60–70 KB gzip. Conserva el "laboratorio Angular".
- **B. Migrar a Astro 7** (recomendado). Mismo stack que Goldem, Fogón, Guaro & Pola y LUMAcars: se reutilizan
  tal cual `motion.ts` (GSAP + ScrollTrigger + Lenis), `site.ts`, `tokens.css`, el botón de movimiento y el flujo de
  capturas. HTML estático = 0 KB de framework (solo GSAP ~48 KB + Lenis ~5 KB, diferidos), SEO y Open Graph por
  página, y crear páginas nuevas (casos de estudio, la sección ambiciosa) es copiar una plantilla.
  Coste: reescribir ~6 componentes (es poco código: ~3 000 líneas en total, la mitad SCSS).

### 2. Dirección de marca (propuesta abajo) — aprobar, ajustar o pedir alternativas.

### 3. Alcance de esta ronda — todo el paquete, o por fases.

---

## Propuesta de marca: "Planos vivos"

**Frase guía:** _"Arquitecto de sistemas que también los hace sentir bien."_ Backend y arquitectura como columna
vertebral; el detalle de interfaz como firma.

**Motivo gráfico:** el **nodo y la conexión** de un diagrama de arquitectura. Ya existe en el sitio sin estar
nombrado (puntos del nav, nodos del timeline). Lo convertimos en el sistema: retícula de plano tenue de fondo,
líneas que se dibujan con el scroll, nodos que se encienden. Sustituye a los íconos flotantes (más ligero y propio).

**Reglas de oro (borrador):**
1. La noche violeta es la casa: fondo tinta casi negra con tinte violeta, no gris.
2. El violeta es luz, no pintura: acentos, líneas, nodos y estados. Nunca rellenos grandes.
3. Un solo nivel de tarjeta. Dentro de una tarjeta, solo texto, líneas y etiquetas.
4. Resaltar como máximo 2–3 palabras por párrafo.
5. Datos (años, versiones, contadores, etiquetas) en monoespaciada.
6. Las tecnologías van en monocromo con un punto de color pequeño; el color de marca ajena nunca es fondo.
7. Cada sección tiene un "momento" de movimiento, no diez.

**Paleta (a validar con contraste):**
| Token | Valor | Uso |
|---|---|---|
| `--ink` | `#0B0714` | fondo |
| `--ink-2` | `#140D22` | superficie / tarjeta |
| `--line` | `#2A2140` | bordes, retícula |
| `--mist` | `#A79FBF` | texto secundario |
| `--paper` | `#F3F0FA` | texto |
| `--violet` | `#A36BFD` | acento principal (se conserva) |
| `--violet-deep` | `#440C97` | botón primario, brillos (se conserva) |
| `--spark` | por definir (lima `#C8F560` o coral `#FF7A59`) | **un** punto de energía por pantalla |

**Tipografía:** Space Grotesk (display, se conserva) · Inter (texto, sustituye a Roboto) · JetBrains Mono
(datos y etiquetas). Autoalojadas con `@fontsource` (sin Google Fonts, subconjunto latino).

**Tono:** cercano, en primera persona, frases cortas; los emojis se quedan en el saludo del hero y en ningún otro
sitio. Afirmaciones concretas ("llevé X de MVP a producto") en vez de adjetivos ("soluciones sólidas").

Entregable: `docs/BRAND.md` (documento maestro, patrón Goldem/Guaro & Pola) + `tokens` + sección
**"Cómo crear una sección, módulo o página"** (plantilla, cabecera de sección, espaciado, qué momento de
movimiento elegir, checklist responsive y de peso).

---

## Propuesta por sección

| Sección | Hoy | Propuesta |
|---|---|---|
| **Hero** | Tarjeta con foto, título y cita pequeña | Portada a pantalla completa, sin tarjeta. Nombre grande con entrada letra a letra, "Software Engineer · Backend & Arquitectura", foto con anillo de nodos que reacciona al ratón, CTAs "Ver CV" + LinkedIn/GitHub aquí (no abajo). La cita pasa a ser una línea visible. |
| **Sobre mí** | Párrafo en `<h3>` con 12 resaltados | Texto que se enciende palabra a palabra con el scroll (patrón Fogón "E"), 2–3 resaltados, y una tira de 3 datos reales (años, empresas, sector) solo si aportan. |
| **Experiencia** | Timeline con tarjetas anidadas | La línea del timeline se dibuja con el scroll y cada nodo se enciende al pasar. Captura con revelado por cortina y parallax leve; texto a la izquierda, imagen a la derecha en escritorio. Chips monocromo. |
| **Proyectos** (antes "Extras") | HTML a mano con `style=""` | Datos en un archivo; tarjetas con captura grande, reflejo que sigue al cursor (patrón LUMAcars) y enlaces (demo / repo) cuando existan. Base para futuros "casos de estudio". |
| **Recomendación** | Botón dentro de "Extras" | Bloque de cita propio (frase destacada de la carta + enlace al PDF). |
| **Skills** | 3 carruseles de logos + 6 tarjetas | Un solo carrusel que reacciona a la velocidad del scroll (patrón Fogón "G") + grupos en lista limpia, sin tarjeta por grupo. |
| **Educación & más** | Dos tarjetas | Timeline compacto con el mismo lenguaje que experiencia, alineado en móvil; idiomas e intereses como línea de texto. |
| **Cierre** (nuevo) | No existe | Contacto (correo copiable, LinkedIn, GitHub, CV), botón de movimiento y pie. |

## Sistema de movimiento

- **Scroll en el documento**, no en un contenedor. Lenis para el scroll suave y anclas.
- **Un solo módulo** (`motion`) con GSAP + ScrollTrigger y `gsap.matchMedia()` (escritorio / móvil / reducido).
  Fuera `@angular/animations`, la directiva de reveal por elemento y los observadores duplicados.
- **Botón propio "Reducir animaciones"** guardado en `localStorage` (patrón Guaro & Pola). No se lee el ajuste del SO.
- Sin JS el contenido siempre es visible (los estados iniciales los pone el script, no el CSS).
- Solo se anima `transform`, `opacity` y `clip-path`. Nada de `filter: blur` ni `drop-shadow` animados.
- Barra de scroll con el violeta de la marca (`scrollbar-color`).
- Nav lateral y barra de móvil se conservan, alimentadas por ScrollTrigger.

## Ligereza y orden

- Íconos: reemplazar los 31 SVG por versiones limpias (Simple Icons o redibujados) → de ~4 MB a <60 KB.
- Imágenes: borrar PNG de respaldo, rehacer avatar a 480 px, recomprimir `Pragma.webp`, borrar `RiskmentSuite.png`,
  `srcset` con 2 anchos para capturas. Imagen OG 1200×630 propia.
- Dependencias: fuera Karma, Jasmine, `@angular/animations`, `HttpClientModule`, zone.js (opción A) o todo Angular (B).
- Estructura: `data/` (perfil, experiencia, proyectos, skills, educación) · `sections/` · `ui/` (chip, botón,
  cabecera de sección) · `styles/` (tokens, base) · `docs/BRAND.md` · `PENDIENTES.md`.
- SEO e infra: canonical a `/` (no `/home`), `robots.txt`, `sitemap.xml`, cabeceras de seguridad (CSP) en `_headers`,
  README al día.

**Metas:** primera carga < 400 KB total (hoy 2,1 MB) · JS inicial < 70 KB gzip · Lighthouse móvil ≥ 90 ·
sin desbordes en 360, 390, 768, 1024, 1440 y 1920 px.

## Fases

0. Limpieza y peso (assets, dependencias, restos). Se puede hacer ya, no depende de las decisiones.
1. Base: stack elegido, scroll en documento, contenido en `data/`, tokens.
2. Marca: `docs/BRAND.md` + tokens + fuentes.
3. Rediseño por sección.
4. Sistema de movimiento.
5. QA responsive con capturas en los 6 anchos + medición de peso.
6. SEO, cabeceras, README, `PENDIENTES.md`.
7. **Después:** la sección ambiciosa (sobre la base de marca y movimiento ya definida).
