FROM node:18-alpine

# Создаем рабочую директорию
WORKDIR /app

# Копируем все файлы проекта
COPY . .

# Устанавливаем зависимости и собираем бэкенд
WORKDIR /app/backend
RUN npm install
RUN npx prisma generate

# Устанавливаем зависимости и собираем фронтенд
WORKDIR /app/frontend
RUN npm install
RUN npm run build

# Копируем собранный фронтенд в папку public бэкенда
RUN mkdir -p /app/backend/public
RUN cp -r /app/frontend/dist/* /app/backend/public/

# Возвращаемся в директорию бэкенда для запуска
WORKDIR /app/backend

# Открываем порт
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "start"] 