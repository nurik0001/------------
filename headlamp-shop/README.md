# HeadlampShop

Интернет-магазин автозапчастей для тюнинга оптики.

## Деплой на Railway

1. Создайте аккаунт на [Railway](https://railway.app)
2. Создайте новый проект
3. Подключите GitHub репозиторий
4. Добавьте PostgreSQL базу данных
5. Настройте переменные окружения:
   - `JWT_SECRET` - секретный ключ для JWT
   - `DATABASE_URL` - URL базы данных (автоматически настроится Railway)
   - `NODE_ENV=production`
   - `CORS_ORIGIN=*`

## Локальная разработка

1. Клонируйте репозиторий
2. Установите зависимости:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
3. Создайте файл `.env` в директории backend на основе `.env.example`
4. Запустите базу данных:
   ```bash
   docker-compose up -d db
   ```
5. Примените миграции:
   ```bash
   cd backend && npx prisma migrate deploy
   ```
6. Запустите приложение:
   ```bash
   # В директории backend
   npm run dev
   
   # В директории frontend
   npm run dev
   ``` 
