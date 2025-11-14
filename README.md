# iTzPortfolio ✨

Road to Expose My Skills - V1.0 🚀

Este repositorio contiene el código de mi landing personal **itzkevindev.tech**, donde concentro mis habilidades, experiencia, proyectos destacados y enlaces de contacto.

## Características 💡

- **Angular 17** con Angular CLI.
- **Diseño responsive** y UI personalizada.
- **Automatización**: Docker multi-stage listo para CI/CD hacia DigitalOcean.
- **Infra orientada a contenedores** para convivir con otros proyectos detrás de un reverse proxy (Traefik/Nginx).

## Scripts principales ⚙️

| Script          | Descripción                                      |
| --------------- | ------------------------------------------------ |
| `npm start`     | Servidor local de desarrollo (`ng serve`).       |
| `npm run build` | Build de producción (`angular.json`).            |
| `npm run test`  | Pruebas unitarias con Karma + Jasmine.           |
| `npm run lint`  | Linter mediante `@angular-eslint`.               |

## Desarrollo local 💻

```bash
npm install
npm start
# abre http://localhost:4200
```

## Docker 🐳

El `Dockerfile` compila Angular (Node 20 Alpine) y sirve los artefactos con Nginx 1.25 Alpine.

- `APP_BASE_HREF` (build arg, default `/`): ajusta el base href si se sirve bajo un subpath.
- `PORT` (env, default `8080`): puerto interno donde escucha Nginx.
- `SERVER_NAME` (env, default `_`): se inyecta en `server_name` por si necesitas logging/host matching.

```bash
docker build -t itzportfolio --build-arg APP_BASE_HREF=/ .
docker run -d --rm -p 8080:8080 -e PORT=8080 -e SERVER_NAME=itzkevindev.tech itzportfolio
```

## Pipeline CI/CD 🚢

### Resumen del flujo

1. **Build**: `npm ci`, `npm run lint`, `npm run build --configuration production`.
2. **Artefacto**: `dist/` se guarda 7 días para inspección/rollback manual.
3. **Imagen Docker**: `docker buildx build` con `APP_BASE_HREF` desde variables del repo, etiqueta `ghcr.io/itzkevinpg/itzportfolio:{sha|latest}` y push a GHCR usando `REGISTRY_USERNAME`/`REGISTRY_TOKEN`.
4. **Deploy**: `appleboy/ssh-action` entra al droplet, hace `docker compose --project-name platform_portfolio pull/up portfolio` en `/opt/platform`.

### Secrets / variables usados

| Tipo     | Nombre              | Descripción                                                                 |
| -------- | ------------------- | --------------------------------------------------------------------------- |
| Secret   | `REGISTRY_USERNAME` | Usuario de GitHub con acceso a GHCR.                                        |
| Secret   | `REGISTRY_TOKEN`    | PAT con scopes `read:packages` y `write:packages`.                          |
| Secret   | `DO_HOST`           | IP pública del droplet.                                                     |
| Secret   | `DO_SSH_USER`       | Usuario SSH (actualmente `root`).                                           |
| Secret   | `DO_SSH_KEY`        | Clave privada OpenSSH para el droplet.                                      |
| Secret   | `DO_SSH_PORT`       | Puerto SSH (22).                                                            |
| Secret   | `COMPOSE_PROJECT`   | Nombre del proyecto Compose (`platform_portfolio`).                         |
| Variable | `APP_BASE_HREF`     | Base href usado en el build (por defecto `/`).                              |
| Variable | `TRAEFIK_NETWORK`   | Nombre de la red externa compartida (`reverse-proxy`).                      |

### Infraestructura actual (provisional)

- Droplet Docker (1 vCPU / 1 GB) con carpeta `/opt/platform`.
- Red externa Docker `reverse-proxy`.
- `docker-compose.yml` minimal con:
  - `traefik` (entradas 80/443, certificados Let’s Encrypt).
  - `portfolio` apuntando a `ghcr.io/itzkevinpg/itzportfolio:latest`, labels Traefik para `itzkevindev.tech`, y `.env.portfolio` con `PORT=8080`, `SERVER_NAME=itzkevindev.tech`.
- Pipeline GitHub Actions despliega directamente contra este stack mientras preparamos el repo de plataforma/Terraform.

---

<p align="center">
  <img src="IconoITzKEvin.png" alt="iTzKevin logo">
</p>
