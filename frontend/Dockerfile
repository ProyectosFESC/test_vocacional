# Etapa de construcción
FROM node:22-alpine AS builder

# Establecer directorio de trabajo en el contenedor
WORKDIR /app

ARG VITE_API_URL
ARG VITE_API_KEY

# Copiar archivos package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar los archivos del proyecto
COPY . .

# Usar las variables de entorno pasadas por ARG al hacer el build
RUN VITE_API_URL=$VITE_API_URL VITE_API_KEY=$VITE_API_KEY npm run build

# Etapa de producción: usar nginx para servir los archivos estáticos
FROM nginx:alpine

# Copiar la configuración personalizada de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos estáticos generados en /app/dist
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponer el puerto 80 para el tráfico HTTP
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]