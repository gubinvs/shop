# === Stage 1: Build React App ===
FROM node:20-slim AS build
WORKDIR /app

# Обновляем системные пакеты
RUN apt-get update && apt-get upgrade -y && apt-get clean

# Установка зависимостей
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Копируем проект и делаем сборку
COPY . .
RUN yarn build

# === Stage 2: Serve with Nginx ===
FROM nginx:stable-slim

# Удаляем дефолтный конфиг
RUN rm /etc/nginx/conf.d/default.conf

# Копируем наш конфиг
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем React build
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
