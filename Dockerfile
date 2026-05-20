FROM node:24-alpine AS build

WORKDIR /var/www

COPY package*.json ./
RUN npm install

EXPOSE 3000

# Для dev-режима обязательно заставляем Nuxt слушать все интерфейсы
ENV HOST=0.0.0.0

CMD ["npm", "run", "dev"]