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

---

<p align="center">
  <img src="IconoITzKEvin.png" alt="iTzKevin logo">
</p>
