const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Начало заполнения базы данных...');

  // Очистка существующих данных
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('База данных очищена');

  // Создание пользователей
  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@demo.com',
      password: adminPassword,
      name: 'Администратор',
      role: 'ADMIN'
    }
  });

  const user = await prisma.user.create({
    data: {
      email: 'user@demo.com',
      password: userPassword,
      name: 'Пользователь',
      role: 'USER'
    }
  });

  console.log('Пользователи созданы:', { admin, user });

  // Создание категорий
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'BILED',
        description: 'Биксеноновые линзы и модули'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Стекло для фары',
        description: 'Стекла для различных моделей фар'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Переходные рамки',
        description: 'Рамки для установки линз'
      }
    }),
    prisma.category.create({
      data: {
        name: 'Лед лампочки',
        description: 'Светодиодные лампы для автомобилей'
      }
    })
  ]);

  console.log('Категории созданы:', categories);

  // Создание товаров
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'BiLed GTR-G40 0101 (VIOLET)',
        description: 'Биксеноновая линза с фиолетовым свечением',
        price: 65000,
        stock: 10,
        categoryId: categories[0].id,
        image: 'https://via.placeholder.com/300x300?text=BiLed+GTR-G40'
      }
    }),
    prisma.product.create({
      data: {
        name: 'Стекло Фары Toyota LC300 2021- Lh',
        description: 'Стекло для левой фары Toyota Land Cruiser 300',
        price: 50000,
        stock: 5,
        categoryId: categories[1].id,
        image: 'https://via.placeholder.com/300x300?text=Toyota+LC300'
      }
    }),
    prisma.product.create({
      data: {
        name: 'Универсальная переходная рамка/Ch №63',
        description: 'Универсальная рамка для установки линз',
        price: 12000,
        stock: 20,
        categoryId: categories[2].id,
        image: 'https://via.placeholder.com/300x300?text=Рамка+63'
      }
    }),
    prisma.product.create({
      data: {
        name: 'Стекло Фары Volkswagen Passat CC 08-12 Lh',
        description: 'Стекло для левой фары Volkswagen Passat CC 2008-2012',
        price: 25000,
        stock: 0,
        categoryId: categories[1].id,
        image: 'https://via.placeholder.com/300x300?text=VW+Passat+CC'
      }
    }),
    prisma.product.create({
      data: {
        name: 'Стекло Фары KIA Optima 3 K5 16-18 Rh',
        description: 'Стекло для правой фары KIA Optima 3 K5 2016-2018',
        price: 30000,
        stock: 8,
        categoryId: categories[1].id,
        image: 'https://via.placeholder.com/300x300?text=KIA+Optima'
      }
    }),
    prisma.product.create({
      data: {
        name: 'BiLed X-LED Y6 3.0"',
        description: 'Биксеноновая линза X-LED Y6 диаметром 3.0 дюйма',
        price: 55000,
        stock: 15,
        categoryId: categories[0].id,
        image: 'https://via.placeholder.com/300x300?text=X-LED+Y6'
      }
    }),
    prisma.product.create({
      data: {
        name: 'Переходная рамка BMW 5 F10/F11 10-16',
        description: 'Рамка для установки линз в фары BMW 5 серии F10/F11 2010-2016',
        price: 15000,
        stock: 0,
        categoryId: categories[2].id,
        image: 'https://via.placeholder.com/300x300?text=BMW+F10'
      }
    }),
    prisma.product.create({
      data: {
        name: 'LED лампа H7 6000K',
        description: 'Светодиодная лампа H7 с цветовой температурой 6000K',
        price: 8000,
        stock: 30,
        categoryId: categories[3].id,
        image: 'https://via.placeholder.com/300x300?text=LED+H7'
      }
    })
  ]);

  console.log(`Создано ${products.length} товаров`);
  console.log('Заполнение базы данных завершено!');
}

main()
  .catch((e) => {
    console.error('Ошибка при заполнении базы данных:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 