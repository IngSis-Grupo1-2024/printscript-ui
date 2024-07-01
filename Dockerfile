FROM node:20-slim AS build

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm ci

COPY . /app

ARG FRONTEND_URL
ARG BACKEND_URL
ARG AUTH0_DOMAIN
ARG AUTH0_CLIENT_ID
ARG AUTH0_AUDIENCE
ARG AUTH0_SCOPE
ARG MANAGER_URL
ARG CONFIGURATIONS_URL

ENV FRONTEND_URL=${FRONTEND_URL}
ENV BACKEND_URL=${BACKEND_URL}
ENV AUTH0_DOMAIN=${AUTH0_DOMAIN}
ENV AUTH0_CLIENT_ID=${AUTH0_CLIENT_ID}
ENV AUTH0_AUDIENCE=${AUTH0_AUDIENCE}
ENV AUTH0_SCOPE=${AUTH0_SCOPE}
ENV MANAGER_URL=${MANAGER_URL}
ENV PERMISSIONS_URL=${PERMISSIONS_URL}


RUN npm run build

FROM nginx:alpine

COPY --from=build /app/.nginx/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /app/dist .

ENTRYPOINT ["nginx", "-g", "daemon off;"]