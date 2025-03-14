import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import ProductCard from '../components/product/ProductCard';

// Временные данные для демонстрации
const featuredProducts = [
  {
    id: 1,
    name: 'LED Headlight Assembly',
    price: 199.99,
    oldPrice: 249.99,
    image: 'https://via.placeholder.com/300x300',
    inStock: true,
    rating: 4.5
  },
  {
    id: 2,
    name: 'Halogen Headlight Kit',
    price: 89.99,
    image: 'https://via.placeholder.com/300x300',
    inStock: true,
    rating: 4.2
  },
  {
    id: 3,
    name: 'Xenon HID Conversion Kit',
    price: 129.99,
    image: 'https://via.placeholder.com/300x300',
    inStock: false,
    rating: 4.7
  },
  {
    id: 4,
    name: 'LED Fog Light Kit',
    price: 79.99,
    oldPrice: 99.99,
    image: 'https://via.placeholder.com/300x300',
    inStock: true,
    rating: 4.3
  }
];

const categories = [
  {
    id: 1,
    name: 'Headlights',
    image: 'https://via.placeholder.com/300x200',
    count: 24
  },
  {
    id: 2,
    name: 'Tail Lights',
    image: 'https://via.placeholder.com/300x200',
    count: 18
  },
  {
    id: 3,
    name: 'Fog Lights',
    image: 'https://via.placeholder.com/300x200',
    count: 12
  },
  {
    id: 4,
    name: 'LED Bulbs',
    image: 'https://via.placeholder.com/300x200',
    count: 36
  },
  {
    id: 5,
    name: 'Light Accessories',
    image: 'https://via.placeholder.com/300x200',
    count: 15
  }
];

const HomePage = () => {
  return (
    <div>
      {/* Hero Banner */}
      <section className="bg-white text-dark py-8">
        <div className="container mx-auto px-4">
          {/* Текст вверху */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Автомобильные фары и запчасти для тюнинга оптики
            </h1>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              Широкий выбор качественных запчастей для тюнинга фар вашего автомобиля.
              Доставка по всему Казахстану и странам СНГ.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/catalog" className="btn bg-primary text-white hover:bg-primary-dark">
                Перейти в каталог
              </Link>
              <Link to="/about" className="btn border border-primary text-primary hover:bg-primary/10">
                О компании
              </Link>
              <Link to="/admin" className="btn border border-gray-300 text-gray-700 hover:bg-gray-100">
                Админ-панель
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Популярные категории</h2>
            <Link to="/catalog" className="text-primary flex items-center hover:underline">
              Все категории <ChevronRightIcon className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {categories.map(category => (
              <Link 
                key={category.id} 
                to={`/catalog/${category.id}`}
                className="group"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg group-hover:-translate-y-1">
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-lg mb-1">{category.name}</h3>
                    <p className="text-gray-500 text-sm">{category.count} товаров</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Новинки</h2>
            <Link to="/catalog" className="text-primary flex items-center hover:underline">
              Все товары <ChevronRightIcon className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Banner */}
      <section className="py-12 bg-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Доставка по Казахстану</h2>
          <p className="text-xl text-gray-300 mb-8">и странам СНГ</p>
          <Link to="/delivery" className="btn bg-white text-dark hover:bg-gray-100">
            Подробнее о доставке
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Почему выбирают нас</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Гарантия качества</h3>
              <p className="text-gray-600">Мы предлагаем только проверенные товары от надежных производителей.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Быстрая доставка</h3>
              <p className="text-gray-600">Отправляем заказы в день оформления. Доставка по всему Казахстану.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.5 9.5v5M14.5 9.5v5" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Техническая поддержка</h3>
              <p className="text-gray-600">Наши специалисты всегда готовы помочь с выбором и установкой.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 