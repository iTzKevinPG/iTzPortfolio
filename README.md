# iTzPortfolio ✨

Road to Expose My Skills - V1.0 🚀

Este repositorio contiene el código de mi landing personal **itzkevindev.tech**, donde concentro mis habilidades, experiencia, proyectos destacados y enlaces de contacto.

## Características 💡

- **Angular 17** con Angular CLI.
- **Diseño responsive** y UI personalizada.
- **Automatización**: Docker multi-stage listo para CI/CD hacia DigitalOcean.
- **Infra orientada a contenedores** para convivir con otros proyectos detrás de un reverse proxy (Traefik/Nginx).

## Scripts principales ⚙️

| Script              | Descripción                                                                 |
| ------------------- | --------------------------------------------------------------------------- |
| `npm start`         | Servidor local de desarrollo (`ng serve`).                                  |
| `npm run build`     | Build estándar (SPA) usando la configuración activa en `angular.json`.      |
| `npm run prerender` | (Opcional) compila y prerenderiza rutas SSG para pruebas locales.           |
| `npm run build:ssg` | Alias del comando anterior.                                                 |
| `npm run test`      | Pruebas unitarias con Karma + Jasmine.                                      |
| `npm run lint`      | Linter mediante `@angular-eslint`.                                          |

## Desarrollo local 💻

```bash
npm install
npm start
# abre http://localhost:4200
```

## Docker 🐳

El `Dockerfile` compila Angular (Node 20 Alpine) como SPA y sirve el contenido
estático con Nginx 1.25 Alpine (gzip habilitado).

- `APP_BASE_HREF` (build arg, default `/`): ajusta el base href si se sirve bajo un subpath.
- `PORT` (env, default `80`): puerto interno donde escucha Nginx.
- `SERVER_NAME` (env, default `_`): se inyecta en `server_name` por si necesitas logging/host matching.

```bash
docker build -t itzportfolio --build-arg APP_BASE_HREF=/ .
docker run -d --rm -p 80:80 -e PORT=80 -e SERVER_NAME=itzkevindev.tech itzportfolio
```

## Verificación

```bash
npm run lint
npm run test
npm run build -- --configuration production
npx http-server dist/i-tz-portfolio/browser -p 4201   # smoke test estático
```

## Pipeline CI/CD 🚢

### Resumen del flujo

1. **Build**: `npm ci`, `npm run lint`, `npm run build -- --configuration production`.
2. **Imagen Docker**: `docker build -t itzportfolio-nodejs .` empaqueta el SPA con Nginx.
3. **Entrega**: la imagen se exporta (`docker save`) y se transfiere al droplet vía `scp`.
4. **Deploy**: `appleboy/ssh-action` carga la imagen, detiene el contenedor previo y lanza `docker run -d -p 80:80 itzportfolio-nodejs`.

### Secrets / variables usados

| Tipo     | Nombre              | Descripción                                                                 |
| -------- | ------------------- | --------------------------------------------------------------------------- |
| Secret   | `DO_HOST`         | IP pública del droplet destino.                                         |
| Secret   | `DO_SSH_USERNAME` | Usuario SSH (ej. `root` o `deploy`).                                    |
| Secret   | `DO_SSH_KEY`      | Clave privada OpenSSH para el droplet.                                  |
| Variable | `APP_BASE_HREF`             | Base href usado en el build (por defecto `/`).                          |

### Infraestructura actual

- Droplet Docker pequeño (1 vCPU / 1 GB) que expone el puerto 80.
- Un único contenedor `itzportfolio-container` manejado por el workflow (stop/remove/run).
- El pipeline GitHub Actions reconstruye y reemplaza ese contenedor en cada push a `main`.

---

<p align="center">
  <img src="IconoITzKEvin.png" alt="iTzKevin logo">
</p>
