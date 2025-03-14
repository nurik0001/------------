FROM node:18-alpine

# Создаем рабочую директорию
WORKDIR /app

# Копируем package.json файлы для установки зависимостей
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# Устанавливаем зависимости бэкенда
WORKDIR /app/backend
RUN npm install

# Устанавливаем зависимости фронтенда
WORKDIR /app/frontend
RUN npm install

# Копируем исходный код
WORKDIR /app
COPY . .

# Генерируем Prisma клиент
WORKDIR /app/backend
RUN npx prisma generate

# Собираем фронтенд
WORKDIR /app/frontend
RUN npm run build

# Копируем собранный фронтенд в папку public бэкенда
RUN mkdir -p /app/backend/public
RUN cp -r dist/* /app/backend/public/

# Возвращаемся в директорию бэкенда для запуска
WORKDIR /app/backend

# Открываем порт
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "start"] 