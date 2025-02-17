# Establece la imagen base de Node.js
FROM node:22.14.0-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json (si existe) a la carpeta de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto al contenedor
COPY . .

# Instala TypeScript globalmente
RUN npm install -g typescript

# Instala dependencias necesarias para el desarrollo
RUN npm install -D typescript ts-node @types/node @types/express

# Compila el código TypeScript
RUN tsc

# Expon el puerto donde se ejecutará el servidor (por defecto, Express en el puerto 3000)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "dev"]
