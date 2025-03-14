const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { PrismaClient } = require('@prisma/client');
const authRoutes = require('./routes/auth');
const productsRoutes = require('./routes/products');
const categoriesRoutes = require('./routes/categories');
// const orderRoutes = require('./routes/orders');

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Временная заглушка для авторизации
app.post('/api/auth/login', (req, res) => {
  // Принимаем любые учетные данные
  res.json({
    token: 'fake-jwt-token',
    user: {
      id: 1,
      email: req.body.email || 'admin@demo.com',
      name: 'Admin User',
      role: 'ADMIN'
    }
  });
});

// Маршруты
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/categories', categoriesRoutes);
// app.use('/api/orders', orderRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Временная заглушка для получения категорий
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении категорий' });
  }
});

// Временная заглушка для получения продуктов
app.get('/api/products', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: { category: true }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении продуктов' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 