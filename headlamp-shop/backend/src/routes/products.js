const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// Получить все товары
router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true
      }
    });
    res.json(products);
  } catch (error) {
    console.error('Ошибка при получении товаров:', error);
    res.status(500).json({ error: 'Не удалось получить товары' });
  }
});

// Получить товар по ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: {
        category: true
      }
    });
    
    if (!product) {
      return res.status(404).json({ error: 'Товар не найден' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Ошибка при получении товара:', error);
    res.status(500).json({ error: 'Не удалось получить товар' });
  }
});

// Создать новый товар
router.post('/', async (req, res) => {
  try {
    const { name, description, price, stock, categoryId, image } = req.body;
    
    if (!name || price === undefined) {
      return res.status(400).json({ error: 'Название и цена товара обязательны' });
    }
    
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: stock ? parseInt(stock) : 0,
        categoryId: categoryId ? parseInt(categoryId) : null,
        image
      }
    });
    
    res.status(201).json(product);
  } catch (error) {
    console.error('Ошибка при создании товара:', error);
    res.status(500).json({ error: 'Не удалось создать товар' });
  }
});

// Обновить товар
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, categoryId, image } = req.body;
    
    if (!name || price === undefined) {
      return res.status(400).json({ error: 'Название и цена товара обязательны' });
    }
    
    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: stock ? parseInt(stock) : 0,
        categoryId: categoryId ? parseInt(categoryId) : null,
        image
      }
    });
    
    res.json(product);
  } catch (error) {
    console.error('Ошибка при обновлении товара:', error);
    
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Товар не найден' });
    }
    
    res.status(500).json({ error: 'Не удалось обновить товар' });
  }
});

// Удалить товар
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await prisma.product.delete({
      where: { id: parseInt(id) }
    });
    
    res.status(204).send();
  } catch (error) {
    console.error('Ошибка при удалении товара:', error);
    
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Товар не найден' });
    }
    
    res.status(500).json({ error: 'Не удалось удалить товар' });
  }
});

module.exports = router; 