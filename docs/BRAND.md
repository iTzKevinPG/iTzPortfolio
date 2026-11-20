# Planos vivos — Sistema de marca del portafolio (v1, 19/11/2026)

> Documento maestro. Los valores viven en `src/styles/tokens.css`; este archivo explica **cómo usarlos**.
> Si algo aquí contradice el código, manda el código y se corrige este documento.

## Frase guía

**"Arquitecto de sistemas que también los hace sentir bien."** El backend y la arquitectura son la columna
vertebral; el detalle de interfaz es la firma.

## Motivo: el nodo y la conexión

Todo sale de un diagrama de arquitectura: **retícula de plano** de fondo, **líneas** que se dibujan con el
scroll y **nodos** (círculos con borde) que se encienden. Aparece en el riel de navegación, la línea de
experiencia, la órbita del retrato, las etiquetas sin logo y el favicon. Antes de inventar un adorno nuevo,
pregunta si puede ser un nodo o una línea.

## Reglas de oro

1. **La noche violeta es la casa.** Fondo `--bg` (tinta casi negra con tinte violeta). Nunca gris.
2. **El violeta es luz, no pintura.** Acentos, líneas, nodos, estados. Nunca rellenos grandes (la excepción
   es el botón primario).
3. **La chispa lima (`--live`) es una por pantalla.** Indica "vivo / ahora / foco": el pulso del rol, el nodo
   actual, el foco del teclado. Si ves dos chispas en la misma pantalla, sobra una.
4. **Un solo nivel de tarjeta.** Dentro de una tarjeta: texto, líneas y etiquetas. Nunca otra tarjeta.
5. **Resaltar 2–3 palabras por párrafo como máximo** (`**texto**` en `site.ts`). Si todo resalta, nada resalta.
6. **Datos en monoespaciada**: años, periodos, etiquetas de tecnología, contadores, rótulos de navegación.
7. **Las marcas ajenas van en monocromo.** El color de una empresa o tecnología solo aparece como acento
   pequeño (`--acc`: nombre de la empresa, punto del grupo), nunca como fondo.
8. **Un momento de movimiento por sección**, no diez (ver "Movimiento").
9. **Sin sobretítulos pequeños** encima de los títulos ni métricas de relleno.

## Paleta

| Token | Valor | Uso |
|---|---|---|
| `--ink` / `--bg` | `#0b0714` | Fondo |
| `--ink-2` / `--surface` | `#120c1f` | Tarjetas |
| `--ink-3` / `--surface-hi` | `#1a1230` | Superficie elevada |
| `--line` / `--border` | `#2a2140` | Bordes, retícula, divisores |
| `--line-strong` | `#3d3160` | Bordes con hover, anillos |
| `--mist` / `--text-muted` | `#a9a1c2` | Texto secundario (8.1:1 sobre `--ink`) |
| `--paper` / `--text` | `#f3f0fa` | Texto (17.7:1) |
| `--violet` / `--accent` | `#a36bfd` | Acento: líneas, nodos, títulos grandes (5.8:1) |
| `--violet-soft` / `--accent-text` | `#c7a6ff` | Texto resaltado sobre oscuro (9.8:1) |
| `--violet-deep` | `#440c97` | Botón primario (texto `--paper` encima: 10.7:1), selección |
| `--spark` / `--live` | `#c8f560` | Chispa: "vivo / ahora / foco" |

Los componentes usan siempre los **semánticos** (`--text`, `--accent`…), nunca los HEX.

## Tipografía

| Rol | Familia | Uso |
|---|---|---|
| Display | Space Grotesk (variable) | Títulos, nombres, párrafo de "Sobre mí", enlaces de contacto |
| Texto | Inter (variable) | Párrafos, botones, listas |
| Datos | JetBrains Mono (variable) | Periodos, etiquetas, rótulos, navegación |

Autoalojadas con `@fontsource-variable` (sin Google Fonts). Escala en `tokens.css`: `--text-xs` … `--text-2xl`,
`--text-hero`. Párrafos ≤ ~65 caracteres por línea (`max-width: 34rem`).

## Espacio, forma y capas

- Escala de 4: `--space-1` (4 px) … `--space-24` (96 px). Entre secciones: `--section-gap`.
- Ancho de contenido `--content` (72rem) con `.wrap`; márgenes laterales `--gutter` (16 px en móvil).
- Radios: `--radius-sm` 6 px (pequeños), `--radius` 12 px (tarjetas, capturas), `--radius-full` (pastillas, botones).
- Capas: `--z-bg` fondo < contenido < `--z-nav` 40 < `--z-progress` 45 < `--z-dialog` 100.

## Componentes base (`src/components/ui`)

| Componente | Para qué |
|---|---|
| `SectionHead` | Título de sección (con cortina animada) + lead opcional |
| `TechList` | Etiquetas de tecnología monocromo (logo o nodo) |
| `Shot` | Captura con AVIF/WebP responsivo, revelado y botón de ampliar |
| `Icon` + `Sprite` | Íconos por referencia a un sprite único |
| `.btn`, `.btn--primary`, `.btn--icon` | Botones (en `global.css`) |

## Texto y tono

Primera persona, cercano, frases cortas. Concreto antes que adjetivos ("llevé un MVP a producto" mejor que
"soluciones sólidas"). Emojis solo en el saludo del hero. Ortografía revisada: tildes siempre.

## Movimiento

Stack: GSAP + ScrollTrigger + Lenis en `src/scripts/motion.ts` (se descarga solo si el movimiento está activo).

- **Reducir animaciones** es un botón propio (pie de página) que guarda `itz-movimiento` en localStorage.
  **No** se lee `prefers-reduced-motion` del sistema (decisión de Kevin).
- Solo se anima `transform`, `opacity` y `clip-path`. Nada de `filter` o sombras animadas.
- Sin JS todo se ve: los estados ocultos los pone el script (`gsap.set` / `fromTo`), no el CSS. La única
  excepción es `html.intro [data-intro]`, que se retira a los 4 s si el JS no llega.
- Curvas: `expo.out` para entradas, `expo.inOut` para revelados, `none` para todo lo que va con scrub.

| Atributo | Efecto |
|---|---|
| `data-reveal` | Sube y aparece al entrar en pantalla (en lote, con escalonado) |
| `data-head` (con `<span>` dentro) | Título que sube detrás de una cortina |
| `data-words` (+ `words()` de `lib/text.ts`) | Texto que se enciende palabra a palabra con el scroll |
| `data-shot` | Captura que se destapa y tiene parallax leve (lo pone `Shot`) |
| `data-card` | Reflejo que sigue al cursor (`--px`/`--py`) |
| `data-timeline` / `data-tl-item` | Línea que se dibuja y nodos que se encienden |
| `data-belt` / `data-belt-track` | Cinta infinita que responde a la velocidad del scroll |

## Cómo crear una sección nueva

1. **Contenido** en `src/data/site.ts` (un objeto exportado). Nada de texto escrito en el componente.
2. **Componente** en `src/components/sections/MiSeccion.astro`:

   ```astro
   ---
   import SectionHead from '@/components/ui/SectionHead.astro';
   import { miSeccion } from '@/data/site';
   import { rich } from '@/lib/text';
   ---

   <section id="mi-seccion" class="section" aria-labelledby="mi-seccion-title">
     <div class="wrap">
       <SectionHead id="mi-seccion-title" title={miSeccion.title} lead={miSeccion.lead} />
       <p data-reveal set:html={rich(miSeccion.text)} />
     </div>
   </section>

   <style>
     /* Solo tokens. Móvil primero no es obligatorio, pero prueba 360 px. */
   </style>
   ```

3. **Montarla** en `src/pages/index.astro` y añadirla a `nav` en `site.ts` (riel y barra móvil la toman solas).
4. **Elegir un momento de movimiento** de la tabla de arriba. Si necesitas uno nuevo, va como función en
   `motion.ts` dentro de `gsap.context` (para que el botón de reducir lo revierta).
5. **Checklist:** un nivel de tarjeta · ≤ 3 resaltados por párrafo · una chispa lima como máximo · imágenes con
   `Shot` o `<Picture>` (nunca `<img>` a un PNG) · funciona sin JS · sin desborde en 360, 390, 768, 1024, 1440 y
   1920 px.

## Cómo crear un módulo (componente reutilizable)

Va en `src/components/ui/`, recibe datos por props (tipados con los tipos de `site.ts`), no lee `site.ts`
directamente y no trae márgenes externos (el espacio lo decide quien lo usa).

## Cómo crear una página nueva

1. `src/pages/mi-pagina.astro` con `<BaseLayout title="… · Kevin Useche" description="…">`.
2. Añadir la ruta a `pages` en `src/pages/sitemap.xml.ts`.
3. Si tiene secciones, reutiliza las de `sections/` o crea nuevas con la receta de arriba.
4. Si no debe indexarse: `<BaseLayout noindex>`.

## Qué evitar

Fondos grises · degradados de colores de marca ajenos · íconos flotando sin sentido · tarjetas anidadas ·
glassmorphism por todas partes (solo en la cita y la barra móvil) · más de un botón primario por pantalla ·
textos en `<h3>` que no son títulos · PNG pesados en `public/`.
