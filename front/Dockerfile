FROM node:22.16.0-alpine as builder

# Создаем рабочую директорию и копируем package.json первым
WORKDIR /app
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm ci --silent

# Копируем остальные файлы
COPY . .

# Собираем приложение
RUN npm run build && touch dist/favicon.ico