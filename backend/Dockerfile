# Usar una imagen oficial de Node.js como base
FROM node:22-alpine

# Establecer directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar los archivos package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install --production

# Copiar el resto de los archivos de la aplicación
COPY . .

# Exponer el puerto en el que corre tu aplicación (ajusta si usas otro)
EXPOSE 3006

# Definir el comando para correr la aplicación
CMD ["node", "app.js"]
