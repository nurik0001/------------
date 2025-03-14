FROM node:18-alpine AS backend-builder

WORKDIR /app/backend

# Копируем файлы package.json и package-lock.json
COPY backend/package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код бэкенда
COPY backend/ ./

# Генерируем Prisma клиент
RUN npx prisma generate

# Этап сборки фронтенда
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend

# Копируем файлы package.json и package-lock.json
COPY frontend/package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код фронтенда
COPY frontend/ ./

# Собираем фронтенд
RUN npm run build

# Финальный этап
FROM node:18-alpine

WORKDIR /app

# Копируем собранный бэкенд
COPY --from=backend-builder /app/backend ./backend
# Копируем собранный фронтенд
COPY --from=frontend-builder /app/frontend/dist ./backend/public

# Устанавливаем рабочую директорию для запуска
WORKDIR /app/backend

# Открываем порт
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "start"] 