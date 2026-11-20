# Seguridad de la sección "En vivo"

> Este repositorio es **público**. Aquí solo van las reglas de diseño de la sección. Los hallazgos concretos de cada
> proyecto se documentan fuera de cualquier repositorio.

## Qué publica `/en-vivo` y por qué es seguro

| Se publica | Por qué no da ventaja a un atacante |
|---|---|
| Nombres de los subdominios | Ya son públicos: cada certificado TLS queda registrado en los logs de *Certificate Transparency* (crt.sh) y el DNS responde a cualquiera. |
| Si el sitio responde, código HTTP y latencia | Es lo que ve cualquier visitante del sitio. |
| Que un proyecto tiene API y que su ruta de salud es `/health` | La ruta solo devuelve `{"status":"ok"}`: sin versión, base de datos ni dependencias. |
| Stack general (NestJS, Astro, React…) | Sin versiones. Es lo mismo que se ve en una oferta de trabajo o un CV. |

## Qué NO se publica nunca

- **Hosts de las APIs y URLs** en la respuesta de `/api/status`: solo viajan ids, códigos y latencias.
- **Destinos CNAME** ni IPs: revelarían los servidores de origen (Railway, Vercel…) y permitirían saltarse Cloudflare.
- **Versiones** de frameworks o librerías.
- **Subdominios descubiertos que no pasan por el proxy de Cloudflare** (nube gris).
- **Subdominios con nombres sensibles** (`admin`, `panel`, `staging`, `dev`, `test`, `preview`, `db`, `vpn`, `auth`…,
  comparados como palabras completas) ni los listados en `liveHidden` (`src/data/live.ts`).

## Protecciones de la función `/api/status`

- **Lista blanca:** solo comprueba las URLs de `src/data/live.ts`. Nunca acepta una URL del cliente (sin SSRF).
- **Caché de 30 s** en el borde: muchas visitas no se traducen en muchas peticiones a los proyectos.
- **Timeout de 6 s** por comprobación y cuerpo de la respuesta descartado.
- **Token de Cloudflare** de solo lectura (DNS), guardado como *Secret* en Pages. Si falla, la página muestra
  "revisa el token" y la función deja de descubrir: no rompe nada.

## Antes de añadir un proyecto a `src/data/live.ts`

- [ ] El subdominio pasa por Cloudflare (nube naranja) y tiene HTTPS.
- [ ] Si tiene API: `GET /health` responde solo `{"status":"ok"}`, sin datos internos.
- [ ] La API restringe CORS a su dominio y limita la tasa de peticiones (con `trust proxy` si está detrás de un proxy).
- [ ] Los paneles de administración piden autenticación y llevan `noindex`.
- [ ] El repositorio, si es público, no tiene `.env` ni secretos en su historial.
- [ ] Las claves de servicios de pago (OpenAI, pasarelas, correo) tienen límite de gasto configurado en el proveedor.
