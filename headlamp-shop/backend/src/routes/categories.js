const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// Получить все категории
router.get('/', async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    console.error('Ошибка при получении категорий:', error);
    res.status(500).json({ error: 'Не удалось получить категории' });
  }
});

// Получить категорию по ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
      include: {
        products: true
      }
    });
    
    if (!category) {
      return res.status(404).json({ error: 'Категория не найдена' });
    }
    
    res.json(category);
  } catch (error) {
    console.error('Ошибка при получении категории:', error);
    res.status(500).json({ error: 'Не удалось получить категорию' });
  }
});

// Создать новую категорию
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Название категории обязательно' });
    }
    
    const category = await prisma.category.create({
      data: {
        name,
        description
      }
    });
    
    res.status(201).json(category);
  } catch (error) {
    console.error('Ошибка при создании категории:', error);
    res.status(500).json({ error: 'Не удалось создать категорию' });
  }
});

// Обновить категорию
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Название категории обязательно' });
    }
    
    const category = await prisma.category.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description
      }
    });
    
    res.json(category);
  } catch (error) {
    console.error('Ошибка при обновлении категории:', error);
    
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Категория не найдена' });
    }
    
    res.status(500).json({ error: 'Не удалось обновить категорию' });
  }
});

// Удалить категорию
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Проверяем, есть ли товары в этой категории
    const productsCount = await prisma.product.count({
      where: { categoryId: parseInt(id) }
    });
    
    if (productsCount > 0) {
      return res.status(400).json({ 
        error: 'Невозможно удалить категорию, содержащую товары. Сначала удалите или переместите товары из этой категории.' 
      });
    }
    
    await prisma.category.delete({
      where: { id: parseInt(id) }
    });
    
    res.status(204).send();
  } catch (error) {
    console.error('Ошибка при удалении категории:', error);
    
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Категория не найдена' });
    }
    
    res.status(500).json({ error: 'Не удалось удалить категорию' });
  }
});

module.exports = router; 