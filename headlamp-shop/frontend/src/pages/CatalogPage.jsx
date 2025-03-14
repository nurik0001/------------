import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronRightIcon, 
  ChevronDownIcon, 
  ChevronUpIcon,
  Squares2X2Icon, 
  ListBulletIcon,
  ArrowsUpDownIcon
} from '@heroicons/react/24/outline';
import ProductCard from '../components/product/ProductCard';
import ProductFilter from '../components/product/ProductFilter';

// Импортируем тестовые данные из ProductPage.jsx
// В реальном приложении данные будут загружаться с сервера
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

const CatalogPage = () => {
  const { categoryId } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' или 'list'
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const sortMenuRef = useRef(null);

  // Категории товаров (сохраняем для определения названия текущей категории)
  const categories = [
    {
      id: 'led-modules',
      name: 'Светодиодные модули',
      icon: '🔆',
    },
    {
      id: 'xenon-modules',
      name: 'Ксеноновые модули',
      icon: '💡',
    },
    {
      id: 'masks',
      name: 'Маски для модулей',
      icon: '🎭',
    },
    {
      id: 'frames',
      name: 'Переходные рамки',
      icon: '🔲',
    },
    {
      id: 'led-products',
      name: 'Светодиодная продукция',
      icon: '💫',
    },
    {
      id: 'angel-eyes',
      name: 'Обманки',
      icon: '👁️',
    },
    {
      id: 'glass',
      name: 'Стекла фар',
      icon: '🔍',
    },
    {
      id: 'sealant',
      name: 'Герметик',
      icon: '🧴',
    },
    {
      id: 'accessories',
      name: 'Комплектующие',
      icon: '🔧',
    },
    {
      id: 'retrofit-tools',
      name: 'Инструмент для ретрофита',
      icon: '��',
    }
  ];

  // Варианты сортировки
  const sortOptions = [
    { id: 'popular', label: 'По популярности' },
    { id: 'discount', label: 'По скидке' },
    { id: 'new', label: 'По новизне' },
    { id: 'price_asc', label: 'По возрастанию цены' },
    { id: 'price_desc', label: 'По убыванию цены' },
    { id: 'rating', label: 'По рейтингу' }
  ];

  // Закрытие меню сортировки при клике вне его
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortMenuRef.current && !sortMenuRef.current.contains(event.target)) {
        setSortMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Загрузка товаров
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // В реальном приложении здесь будет запрос к API
        // const response = await productService.getProducts({ 
        //   category: categoryId, 
        //   page: currentPage, 
        //   sort: sortBy,
        //   ...activeFilters 
        // });
        
        // Фильтрация товаров по категории, если указана
        let filteredData = [...products];
        if (categoryId) {
          filteredData = filteredData.filter(product => 
            product.category.toLowerCase().replace(/\s+/g, '-') === categoryId
          );
        }
        
        // Применение фильтров
        if (Object.keys(activeFilters).length > 0) {
          if (activeFilters.priceMin) {
            filteredData = filteredData.filter(product => product.price >= activeFilters.priceMin);
          }
          if (activeFilters.priceMax) {
            filteredData = filteredData.filter(product => product.price <= activeFilters.priceMax);
          }
          if (activeFilters.inStock) {
            filteredData = filteredData.filter(product => product.inStock);
          }
          if (activeFilters.brands && activeFilters.brands.length > 0) {
            filteredData = filteredData.filter(product => 
              product.compatibility && product.compatibility.some(brand => 
                activeFilters.brands.includes(brand)
              )
            );
          }
          if (activeFilters.types && activeFilters.types.length > 0) {
            filteredData = filteredData.filter(product => 
              activeFilters.types.includes(product.category)
            );
          }
        }
        
        // Сортировка товаров
        let sortedProducts = [...filteredData];
        switch (sortBy) {
          case 'price-asc':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
          case 'price-desc':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
          case 'newest':
            // В реальном приложении здесь будет сортировка по дате
            sortedProducts.sort((a, b) => b.id - a.id);
            break;
          case 'popular':
          default:
            // По умолчанию сортировка по популярности (в данном случае просто по ID)
            sortedProducts.sort((a, b) => a.id - b.id);
            break;
        }
        
        // Пагинация
        const itemsPerPage = 8;
        const totalItems = sortedProducts.length;
        const calculatedTotalPages = Math.ceil(totalItems / itemsPerPage);
        setTotalPages(calculatedTotalPages);
        
        // Если текущая страница больше, чем общее количество страниц, сбрасываем на первую
        if (currentPage > calculatedTotalPages && calculatedTotalPages > 0) {
          setCurrentPage(1);
          return;
        }
        
        const startIndex = (currentPage - 1) * itemsPerPage;
        const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);
        
        setFilteredProducts(paginatedProducts);
        setLoading(false);
      } catch (err) {
        setError('Произошла ошибка при загрузке товаров. Пожалуйста, попробуйте позже.');
        setLoading(false);
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, [categoryId, currentPage, sortBy, activeFilters]);

  // Обработчик изменения фильтров
  const handleFilterChange = (newFilters) => {
    // Преобразуем фильтры в формат, который ожидает наш API
    const formattedFilters = {
      brands: newFilters.brands,
      types: newFilters.types,
      priceMin: newFilters.priceMin ? parseInt(newFilters.priceMin) : undefined,
      priceMax: newFilters.priceMax ? parseInt(newFilters.priceMax) : undefined,
      inStock: newFilters.inStock
    };
    
    // Удаляем undefined значения
    Object.keys(formattedFilters).forEach(key => {
      if (formattedFilters[key] === undefined || 
          (Array.isArray(formattedFilters[key]) && formattedFilters[key].length === 0)) {
        delete formattedFilters[key];
      }
    });
    
    setActiveFilters(formattedFilters);
    setCurrentPage(1); // Сбрасываем на первую страницу при изменении фильтров
  };

  // Обработчик изменения сортировки
  const handleSortChange = (value) => {
    setSortBy(value);
    setSortMenuOpen(false);
  };

  // Получить текущую метку сортировки
  const getCurrentSortLabel = () => {
    const option = sortOptions.find(opt => opt.id === sortBy);
    return option ? option.label : 'По популярности';
  };

  // Получаем название текущей категории
  const getCategoryName = () => {
    if (!categoryId) {
      return 'Все товары';
    }
    
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Все товары';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Хлебные крошки */}
      <div className="flex items-center text-sm mb-6">
        <Link to="/" className="text-gray-500 hover:text-primary">Главная</Link>
        <ChevronRightIcon className="h-4 w-4 mx-2 text-gray-400" />
        {!categoryId ? (
          <span className="text-gray-700">Каталог</span>
        ) : (
          <>
            <Link to="/catalog" className="text-gray-500 hover:text-primary">Каталог</Link>
            <ChevronRightIcon className="h-4 w-4 mx-2 text-gray-400" />
            <span className="text-gray-700">{getCategoryName()}</span>
          </>
        )}
      </div>

      {/* Заголовок страницы */}
      <h1 className="text-2xl font-bold mb-6">{getCategoryName()}</h1>

      {/* Основной контент */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Фильтры (слева) */}
        <div className="w-full md:w-1/4">
          <ProductFilter onFilterChange={handleFilterChange} />
        </div>

        {/* Список товаров (справа) */}
        <div className="w-full md:w-3/4">
          {/* Панель сортировки и отображения */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Сортировка */}
              <div className="relative" ref={sortMenuRef}>
                <button 
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary"
                  onClick={() => setSortMenuOpen(!sortMenuOpen)}
                >
                  <ArrowsUpDownIcon className="h-5 w-5" />
                  <span>Сортировка: {getCurrentSortLabel()}</span>
                  <ChevronDownIcon className={`h-4 w-4 transition-transform ${sortMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {sortMenuOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <ul className="py-1">
                      <li>
                        <button 
                          className={`block w-full text-left px-4 py-2 text-sm ${sortBy === 'popular' ? 'bg-gray-100 text-primary' : 'text-gray-700 hover:bg-gray-50'}`}
                          onClick={() => handleSortChange('popular')}
                        >
                          По популярности
                        </button>
                      </li>
                      <li>
                        <button 
                          className={`block w-full text-left px-4 py-2 text-sm ${sortBy === 'price-asc' ? 'bg-gray-100 text-primary' : 'text-gray-700 hover:bg-gray-50'}`}
                          onClick={() => handleSortChange('price-asc')}
                        >
                          По цене (сначала дешевле)
                        </button>
                      </li>
                      <li>
                        <button 
                          className={`block w-full text-left px-4 py-2 text-sm ${sortBy === 'price-desc' ? 'bg-gray-100 text-primary' : 'text-gray-700 hover:bg-gray-50'}`}
                          onClick={() => handleSortChange('price-desc')}
                        >
                          По цене (сначала дороже)
                        </button>
                      </li>
                      <li>
                        <button 
                          className={`block w-full text-left px-4 py-2 text-sm ${sortBy === 'newest' ? 'bg-gray-100 text-primary' : 'text-gray-700 hover:bg-gray-50'}`}
                          onClick={() => handleSortChange('newest')}
                        >
                          По новизне
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              
              {/* Переключатель вида (сетка/список) */}
              <div className="flex items-center space-x-2">
                <button 
                  className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-gray-100 text-primary' : 'text-gray-500 hover:text-primary'}`}
                  onClick={() => setViewMode('grid')}
                  aria-label="Отображение сеткой"
                >
                  <Squares2X2Icon className="h-5 w-5" />
                </button>
                <button 
                  className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-gray-100 text-primary' : 'text-gray-500 hover:text-primary'}`}
                  onClick={() => setViewMode('list')}
                  aria-label="Отображение списком"
                >
                  <ListBulletIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Список товаров */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <p className="text-red-700">{error}</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
              <p className="text-yellow-700">По вашему запросу ничего не найдено. Попробуйте изменить параметры поиска.</p>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'product-grid' : 'space-y-4'}>
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  viewMode={viewMode}
                />
              ))}
            </div>
          )}

          {/* Пагинация */}
          {!loading && !error && filteredProducts.length > 0 && (
            <div className="mt-8 flex justify-center">
              <div className="flex space-x-1">
                {/* Кнопка "Предыдущая страница" */}
                <button 
                  className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &laquo;
                </button>
                
                {/* Номера страниц */}
                {[...Array(totalPages)].map((_, i) => (
                  <button 
                    key={i}
                    className={`px-3 py-1 rounded-md ${currentPage === i + 1 ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                
                {/* Кнопка "Следующая страница" */}
                <button 
                  className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  &raquo;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogPage; 