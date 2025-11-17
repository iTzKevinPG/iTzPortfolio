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

# Build the SPA using the provided base href
RUN npm run build -- --configuration production --base-href ${APP_BASE_HREF}

# Stage 2: serve the compiled assets with nginx
FROM nginx:1.25-alpine

ENV PORT=80 \
    SERVER_NAME=_ \
    NGINX_ENVSUBST_TEMPLATE_SUFFIX=.template \
    NGINX_ENVSUBST_OUTPUT_DIR=/etc/nginx/conf.d

# Template for nginx that will be rendered with envsubst on container start
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Copy compiled browser assets
COPY --from=build /app/dist/i-tz-portfolio/browser /usr/share/nginx/html

# Expose the internal port used by nginx
EXPOSE 80

# Build: docker build -t itzportfolio .
# Run (local test): docker run -d -p 80:80 itzportfolio
