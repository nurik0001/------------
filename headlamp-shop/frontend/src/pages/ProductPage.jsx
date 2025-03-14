import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ShoppingCartIcon, 
  HeartIcon, 
  ArrowLeftIcon,
  CheckIcon,
  TruckIcon,
  ShieldCheckIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import ProductCard from '../components/product/ProductCard';

// Временные данные для демонстрации
const products = [
  {
    id: 1,
    name: 'BiLed GTR-G40 0101 (VIOLET)',
    category: 'BILED',
    price: 65000,
    oldPrice: 75000,
    discount: 13,
    inStock: true,
    description: 'Светодиодный модуль BiLed GTR-G40 0101 с фиолетовой подсветкой. Идеально подходит для тюнинга фар различных автомобилей. Высокая яркость и долгий срок службы.',
    specifications: [
      { name: 'Тип', value: 'BiLed модуль' },
      { name: 'Размер', value: '2.5 дюйма' },
      { name: 'Мощность', value: '40 Вт' },
      { name: 'Цветовая температура', value: '5500K' },
      { name: 'Подсветка', value: 'Фиолетовая' },
      { name: 'Срок службы', value: '50 000 часов' }
    ],
    compatibility: ['Audi', 'BMW', 'Mercedes', 'Toyota', 'Lexus'],
    images: [
      '/images/25742_1393411164_77423x329849.jpg',
      '/images/bf886944134c773a1b1649a9d68b200f.jpg',
      '/images/blfl0tizq839mole28oeja7ocyuwncyh.jpg',
      '/images/fara_1.jpg',
      '/images/kak-ustroeny-fary-novogo-pokoleniya-matrichnye-i-lazernye__239993-620x0.jpg',
      '/images/svet_ot_led_fari.jpg',
      '/images/Без названия.jpg',
      '/images/Без названия (1).jpg'
    ]
  },
  {
    id: 2,
    name: 'Стекло Фары Toyota LC300 2021- Lh',
    category: 'Стекло для фары',
    price: 50000,
    inStock: true,
    description: 'Оригинальное стекло для фары Toyota Land Cruiser 300 2021 года и новее. Левая сторона. Высокое качество материала, точное соответствие оригинальным размерам.',
    specifications: [
      { name: 'Тип', value: 'Стекло фары' },
      { name: 'Модель автомобиля', value: 'Toyota Land Cruiser 300' },
      { name: 'Год выпуска', value: '2021+' },
      { name: 'Сторона', value: 'Левая' },
      { name: 'Материал', value: 'Поликарбонат' }
    ],
    compatibility: ['Toyota Land Cruiser 300'],
    images: [
      '/images/fara_1.jpg',
      '/images/kak-ustroeny-fary-novogo-pokoleniya-matrichnye-i-lazernye__239993-620x0.jpg',
      '/images/blfl0tizq839mole28oeja7ocyuwncyh.jpg'
    ]
  },
  {
    id: 3,
    name: 'Универсальная переходная рамка/Ch №63',
    category: 'Переходные рамки',
    price: 12000,
    inStock: true,
    description: 'Универсальная переходная рамка для установки линз в фары. Подходит для большинства моделей автомобилей. Прочная конструкция, легкая установка.',
    specifications: [
      { name: 'Тип', value: 'Переходная рамка' },
      { name: 'Модель', value: 'Ch №63' },
      { name: 'Материал', value: 'Алюминий' },
      { name: 'Совместимость', value: 'Универсальная' }
    ],
    compatibility: ['Универсальная'],
    images: [
      '/images/bf886944134c773a1b1649a9d68b200f.jpg',
      '/images/25742_1393411164_77423x329849.jpg',
      '/images/Без названия.jpg'
    ]
  },
  {
    id: 4,
    name: 'Стекло Фары Volkswagen Passat CC 08-12 Lh',
    category: 'Стекло для фары',
    price: 25000,
    oldPrice: 30000,
    discount: 17,
    inStock: false,
    description: 'Стекло для фары Volkswagen Passat CC 2008-2012 годов выпуска. Левая сторона. Высокое качество, точное соответствие оригинальным размерам.',
    specifications: [
      { name: 'Тип', value: 'Стекло фары' },
      { name: 'Модель автомобиля', value: 'Volkswagen Passat CC' },
      { name: 'Год выпуска', value: '2008-2012' },
      { name: 'Сторона', value: 'Левая' },
      { name: 'Материал', value: 'Поликарбонат' }
    ],
    compatibility: ['Volkswagen Passat CC'],
    images: [
      '/images/svet_ot_led_fari.jpg',
      '/images/Без названия (1).jpg',
      '/images/kak-ustroeny-fary-novogo-pokoleniya-matrichnye-i-lazernye__239993-620x0.jpg'
    ]
  },
  {
    id: 5,
    name: 'Линза Bi-LED X-Bright V3 3.0" 5500K',
    category: 'BILED',
    price: 42000,
    oldPrice: 48000,
    discount: 12,
    inStock: true,
    description: 'Светодиодная линза Bi-LED X-Bright V3 с диаметром 3.0 дюйма и цветовой температурой 5500K. Обеспечивает яркий и равномерный световой поток. Идеально подходит для модернизации фар.',
    specifications: [
      { name: 'Тип', value: 'Bi-LED линза' },
      { name: 'Диаметр', value: '3.0 дюйма' },
      { name: 'Мощность', value: '35 Вт' },
      { name: 'Цветовая температура', value: '5500K' },
      { name: 'Световой поток', value: '4200 лм' },
      { name: 'Срок службы', value: '30 000 часов' }
    ],
    compatibility: ['Универсальная', 'Toyota', 'Lexus', 'BMW'],
    images: [
      '/images/blfl0tizq839mole28oeja7ocyuwncyh.jpg',
      '/images/25742_1393411164_77423x329849.jpg',
      '/images/fara_1.jpg'
    ]
  },
  {
    id: 6,
    name: 'Переходная рамка для BMW 3 Series F30 (2012-2018)',
    category: 'Переходные рамки',
    price: 15000,
    inStock: true,
    description: 'Переходная рамка для установки линз в фары BMW 3 Series F30 (2012-2018). Высококачественный материал, точная подгонка, простая установка.',
    specifications: [
      { name: 'Тип', value: 'Переходная рамка' },
      { name: 'Модель автомобиля', value: 'BMW 3 Series F30' },
      { name: 'Год выпуска', value: '2012-2018' },
      { name: 'Материал', value: 'Алюминий' },
      { name: 'Совместимость с линзами', value: '2.5" и 3.0"' }
    ],
    compatibility: ['BMW 3 Series F30'],
    images: [
      '/images/bf886944134c773a1b1649a9d68b200f.jpg',
      '/images/Без названия.jpg',
      '/images/kak-ustroeny-fary-novogo-pokoleniya-matrichnye-i-lazernye__239993-620x0.jpg'
    ]
  },
  {
    id: 7,
    name: 'Комплект LED ламп H7 Philips ZES 6500K',
    category: 'BILED',
    price: 18000,
    oldPrice: 22000,
    discount: 18,
    inStock: true,
    description: 'Комплект светодиодных ламп H7 с чипами Philips ZES и цветовой температурой 6500K. Обеспечивают яркий белый свет и отличную видимость на дороге.',
    specifications: [
      { name: 'Тип', value: 'LED лампы' },
      { name: 'Цоколь', value: 'H7' },
      { name: 'Мощность', value: '50 Вт' },
      { name: 'Цветовая температура', value: '6500K' },
      { name: 'Световой поток', value: '10000 лм' },
      { name: 'Срок службы', value: '50 000 часов' }
    ],
    compatibility: ['Универсальная'],
    images: [
      '/images/svet_ot_led_fari.jpg',
      '/images/25742_1393411164_77423x329849.jpg',
      '/images/Без названия (1).jpg'
    ]
  },
  {
    id: 8,
    name: 'Стекло фары Mercedes-Benz W222 S-Class (2013-2020) Rh',
    category: 'Стекло для фары',
    price: 35000,
    inStock: false,
    description: 'Оригинальное стекло для фары Mercedes-Benz W222 S-Class (2013-2020). Правая сторона. Высокое качество материала, точное соответствие оригинальным размерам.',
    specifications: [
      { name: 'Тип', value: 'Стекло фары' },
      { name: 'Модель автомобиля', value: 'Mercedes-Benz W222 S-Class' },
      { name: 'Год выпуска', value: '2013-2020' },
      { name: 'Сторона', value: 'Правая' },
      { name: 'Материал', value: 'Поликарбонат' }
    ],
    compatibility: ['Mercedes-Benz S-Class'],
    images: [
      '/images/fara_1.jpg',
      '/images/kak-ustroeny-fary-novogo-pokoleniya-matrichnye-i-lazernye__239993-620x0.jpg',
      '/images/Без названия.jpg'
    ]
  },
  {
    id: 9,
    name: 'Набор инструментов для ретрофита фар',
    category: 'Переходные рамки',
    price: 8500,
    oldPrice: 10000,
    discount: 15,
    inStock: true,
    description: 'Профессиональный набор инструментов для ретрофита фар. Включает все необходимое для разборки, модификации и сборки автомобильных фар.',
    specifications: [
      { name: 'Тип', value: 'Набор инструментов' },
      { name: 'Количество предметов', value: '15' },
      { name: 'Материал', value: 'Хром-ванадиевая сталь' },
      { name: 'Применение', value: 'Ретрофит фар' }
    ],
    compatibility: ['Универсальная'],
    images: [
      '/images/bf886944134c773a1b1649a9d68b200f.jpg',
      '/images/blfl0tizq839mole28oeja7ocyuwncyh.jpg',
      '/images/Без названия (1).jpg'
    ]
  }
];

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    // Имитация загрузки данных с сервера
    setLoading(true);
    
    setTimeout(() => {
      const foundProduct = products.find(p => p.id === parseInt(productId));
      setProduct(foundProduct || null);
      
      // Получение похожих товаров
      if (foundProduct) {
        const related = products
          .filter(p => p.id !== foundProduct.id && p.category === foundProduct.category)
          .slice(0, 4);
        setRelatedProducts(related);
      }
      
      setLoading(false);
    }, 500);
  }, [productId]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const addToCart = () => {
    // Implement add to cart functionality
    console.log('Adding to cart:', { product, quantity });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-8"></div>
          <div className="h-64 bg-gray-200 rounded mb-8"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Товар не найден</h1>
        <p className="text-gray-600 mb-8">Запрашиваемый товар не существует или был удален.</p>
        <Link to="/catalog" className="btn btn-primary">
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="text-gray-600 hover:text-primary">
                Главная
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <Link to="/catalog" className="text-gray-600 hover:text-primary">
                  Каталог
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <Link to={`/catalog/${product.category.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-600 hover:text-primary">
                  {product.category}
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-500">{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {/* Back Button */}
      <div className="mb-6">
        <button 
          onClick={() => window.history.back()} 
          className="flex items-center text-gray-600 hover:text-primary"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Назад
        </button>
      </div>

      {/* Product Details */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="mb-4 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center" style={{ height: '400px' }}>
              <img 
                src={product.images ? product.images[activeImage] : product.image} 
                alt={product.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {product.images.map((image, index) => (
                  <div 
                    key={index}
                    className={`cursor-pointer rounded-md overflow-hidden border-2 ${activeImage === index ? 'border-primary' : 'border-transparent'} bg-gray-100 flex items-center justify-center`}
                    onClick={() => setActiveImage(index)}
                    style={{ height: '80px' }}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} ${index + 1}`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <div className="text-sm text-gray-500 mb-2">{product.category}</div>
              <h1 className="text-2xl md:text-3xl font-bold mb-4">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-dark mr-3">
                  {product.price.toLocaleString()} ₸
                </span>
                {product.oldPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    {product.oldPrice.toLocaleString()} ₸
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="ml-3 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
                    -{product.discount}%
                  </span>
                )}
              </div>

              <div className="mb-6">
                {product.inStock ? (
                  <span className="text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full">
                    В наличии
                  </span>
                ) : (
                  <span className="text-sm text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                    Под заказ
                  </span>
                )}
              </div>
            </div>

            {/* Add to Cart */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="flex border border-gray-300 rounded-md overflow-hidden mr-4">
                  <button 
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
                    onClick={decrementQuantity}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-16 text-center border-x border-gray-300 py-2"
                  />
                  <button 
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
                    onClick={incrementQuantity}
                  >
                    +
                  </button>
                </div>
                
                <button 
                  className="btn btn-primary flex-1 flex items-center justify-center"
                  onClick={addToCart}
                >
                  <ShoppingCartIcon className="h-5 w-5 mr-2" />
                  В корзину
                </button>
                
                <button 
                  className="ml-3 p-2 border border-gray-300 rounded-md hover:bg-gray-100"
                  onClick={toggleFavorite}
                >
                  {isFavorite ? (
                    <HeartIconSolid className="h-6 w-6 text-red-500" />
                  ) : (
                    <HeartIcon className="h-6 w-6 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="border-t border-gray-200 pt-6 mb-6">
              <h3 className="font-bold mb-4">Информация о доставке</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <TruckIcon className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Доставка по Казахстану</p>
                    <p className="text-sm text-gray-600">2-5 рабочих дней</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <ShieldCheckIcon className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Гарантия</p>
                    <p className="text-sm text-gray-600">12 месяцев</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CreditCardIcon className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Оплата</p>
                    <p className="text-sm text-gray-600">Наличными, картой, переводом</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Compatibility */}
            {product.compatibility && (
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-bold mb-4">Совместимость</h3>
                <div className="flex flex-wrap gap-2">
                  {product.compatibility.map((car, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                      {car}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Description and Specifications */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Description */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-4">Описание</h2>
            <div className="prose max-w-none">
              <p>{product.description || 'Описание товара отсутствует.'}</p>
            </div>
          </div>

          {/* Specifications */}
          {product.specifications && (
            <div>
              <h2 className="text-xl font-bold mb-4">Характеристики</h2>
              <table className="w-full">
                <tbody>
                  {product.specifications.map((spec, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="py-2 px-3 text-gray-600">{spec.name}</td>
                      <td className="py-2 px-3 font-medium">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Похожие товары</h2>
          <div className="product-grid">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage; 