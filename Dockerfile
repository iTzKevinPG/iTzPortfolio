# syntax=docker/dockerfile:1.6

ARG NODE_VERSION=20

# Stage 1: build the Angular app
FROM node:${NODE_VERSION}-alpine AS build
WORKDIR /app

# Copy lockfiles first for better caching
COPY package*.json ./

# Install dependencies needed for the build
RUN npm ci

# Copy the rest of the source
COPY . .

# Allow overriding the Angular base href at build time
ARG APP_BASE_HREF=/
ENV APP_BASE_HREF=${APP_BASE_HREF}

# Build using the provided base href and prerender the routes
RUN npm run prerender -- --base-href ${APP_BASE_HREF}

# Stage 2: serve the compiled assets with nginx
FROM nginx:1.25-alpine

RUN apk add --no-cache nginx-mod-http-brotli brotli \
  && mkdir -p /etc/nginx/modules-enabled \
  && printf 'load_module modules/ngx_http_brotli_filter_module.so;\nload_module modules/ngx_http_brotli_static_module.so;\n' \
    > /etc/nginx/modules-enabled/50-brotli.conf \
  && sed -i '1iinclude /etc/nginx/modules-enabled/*.conf;' /etc/nginx/nginx.conf

ENV PORT=8080 \
    SERVER_NAME=_ \
    NGINX_ENVSUBST_TEMPLATE_SUFFIX=.template \
    NGINX_ENVSUBST_OUTPUT_DIR=/etc/nginx/conf.d

# Template for nginx that will be rendered with envsubst on container start
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Copy prerendered browser assets
COPY --from=build /app/dist/i-tz-portfolio/browser /usr/share/nginx/html

# Expose the internal port used by nginx
EXPOSE 8080

# Build: docker build -t itzportfolio .
# Run (local test): docker run -d -p 8080:8080 -e PORT=8080 itzportfolio
