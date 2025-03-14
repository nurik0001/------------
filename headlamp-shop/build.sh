#!/bin/bash
set -e

# Установка зависимостей и сборка бэкенда
echo "Installing backend dependencies..."
cd backend
npm install
npx prisma generate

# Установка зависимостей и сборка фронтенда
echo "Installing frontend dependencies..."
cd ../frontend
npm install
echo "Building frontend..."
npm run build

# Копирование собранного фронтенда в папку public бэкенда
echo "Copying frontend build to backend/public..."
mkdir -p ../backend/public
cp -r dist/* ../backend/public/

# Возвращаемся в корневую директорию
cd ..
echo "Build completed successfully!" 