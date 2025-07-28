# Etapa 1: Build de la app
FROM node:20-alpine AS build
WORKDIR /app

# Definir argumentos de build
ARG VITE_API_URL
ARG VITE_API_PORT

# Convertir argumentos en variables de entorno
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_API_PORT=$VITE_API_PORT

COPY package.json package-lock.json* ./
RUN npm install --frozen-lockfile || npm install
COPY . .
RUN npm run build

# Etapa 2: Servir con nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]