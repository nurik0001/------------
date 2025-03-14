import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ShoppingCartIcon, 
  UserIcon, 
  MagnifyingGlassIcon, 
  Bars3Icon, 
  XMarkIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { currentUser, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);

  // Основные категории для горизонтального меню
  const mainCategories = [
    { 
      id: 'all', 
      name: 'Все каталоги',
      subcategories: [
        { id: 'general', name: 'Общий каталог' },
        { id: 'original', name: 'Оригинальные каталоги' },
        { id: 'accessories', name: 'Аксессуары' },
        { id: 'parts', name: 'Запчасти для ТО' },
        { id: 'moto', name: 'Мотокаталоги' },
        { id: 'domestic', name: 'Отечественные марки, мотоциклы' }
      ]
    },
    { 
      id: 'oils', 
      name: 'Масла и автохимия',
      subcategories: [
        { id: 'motor-oils', name: 'Масла моторные' },
        { id: 'transmission-oils', name: 'Масла трансмиссионные' },
        { id: 'washer-fluids', name: 'Жидкости для омывателя' },
        { id: 'brake-fluids', name: 'Жидкости тормозные' },
        { id: 'coolants', name: 'Жидкости охлаждающие' },
        { id: 'all-chemistry', name: 'Вся автохимия' }
      ]
    },
    { 
      id: 'tires', 
      name: 'Шины, диски',
      subcategories: [
        { id: 'summer-tires', name: 'Шины летние' },
        { id: 'winter-tires', name: 'Шины зимние' },
        { id: 'cast-discs', name: 'Диски колесные, литые' },
        { id: 'stamped-discs', name: 'Диски колесные, штампованные' },
        { id: 'motorcycle-tires', name: 'Шины мотоциклетные' },
        { id: 'other-tires', name: 'Прочее' }
      ]
    },
    { 
      id: 'electronics', 
      name: 'Автоэлектроника',
      subcategories: [
        { id: 'headlights', name: 'Лампы' },
        { id: 'batteries', name: 'Аккумуляторы' },
        { id: 'rear-view-cameras', name: 'Камеры заднего вида' },
        { id: 'fuses', name: 'Предохранители' },
        { id: 'parking-sensors', name: 'Парковочные радары' },
        { id: 'all-electronics', name: 'Вся автоэлектроника' }
      ]
    },
    { 
      id: 'other', 
      name: 'Остальное',
      subcategories: [
        { id: 'electrical-equipment', name: 'Электрооборудование' },
        { id: 'tools', name: 'Инструмент' },
        { id: 'accessories', name: 'Автоаксессуары' },
        { id: 'service', name: 'Все для автосервиса' },
        { id: 'wipers', name: 'Щетки стеклоочистителя' },
        { id: 'clothes', name: 'Одежда и экипировка' }
      ]
    }
  ];

  // Категории товаров для мобильного меню
  const categories = [
    {
      id: 'led-modules',
      name: 'Светодиодные модули',
      icon: '🔆',
      hasSubcategories: false
    },
    {
      id: 'xenon-modules',
      name: 'Ксеноновые модули',
      icon: '💡',
      hasSubcategories: false
    },
    {
      id: 'masks',
      name: 'Маски для модулей',
      icon: '🎭',
      hasSubcategories: false
    },
    {
      id: 'frames',
      name: 'Переходные рамки',
      icon: '🔲',
      hasSubcategories: true,
      subcategories: [
        { id: 'universal', name: 'Универсальные рамки' },
        { id: 'acura', name: 'Acura' },
        { id: 'audi', name: 'AUDI' },
        { id: 'bmw', name: 'BMW' },
        { id: 'cadillac', name: 'CADILLAC' },
        { id: 'chevrolet', name: 'CHEVROLET' },
        { id: 'chrysler', name: 'Chrysler' },
        { id: 'citroen', name: 'Citroen' },
        { id: 'daewoo', name: 'Daewoo' }
      ]
    },
    {
      id: 'led-products',
      name: 'Светодиодная продукция',
      icon: '💫',
      hasSubcategories: false
    },
    {
      id: 'angel-eyes',
      name: 'Обманки',
      icon: '👁️',
      hasSubcategories: false
    },
    {
      id: 'glass',
      name: 'Стекла фар',
      icon: '🔍',
      hasSubcategories: false
    },
    {
      id: 'sealant',
      name: 'Герметик',
      icon: '🧴',
      hasSubcategories: false
    },
    {
      id: 'accessories',
      name: 'Комплектующие',
      icon: '🔧',
      hasSubcategories: false
    },
    {
      id: 'retrofit-tools',
      name: 'Инструмент для ретрофита',
      icon: '🔨',
      hasSubcategories: false
    }
  ];

  // Закрытие меню категорий при клике вне его
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setExpandedCategory(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setExpandedCategory(null);
  };

  const toggleCategory = (categoryId, e) => {
    e.preventDefault(); // Предотвращаем переход по ссылке при клике
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const handleCategoryClick = (categoryId, subcategoryId = null) => {
    setExpandedCategory(null);
    
    // Для категории "Переходные рамки" без подкатегории перенаправляем на страницу с марками
    if (categoryId === 'frames' && !subcategoryId) {
      navigate('/catalog/frames/brands');
      return;
    }
    
    // Для "Общий каталог" перенаправляем на страницу со всеми товарами
    if (subcategoryId === 'general') {
      navigate('/catalog');
      return;
    }
    
    const path = subcategoryId 
      ? `/catalog/${categoryId}/${subcategoryId}` 
      : `/catalog/${categoryId}`;
    
    navigate(path);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  // Функция для определения активной категории на основе текущего пути
  const isActiveCategory = (categoryId) => {
    if (categoryId === 'all') {
      // Для "Все каталоги" активно, если мы на странице /catalog без подкатегории
      // или если мы на главной странице
      return location.pathname === '/catalog' || location.pathname === '/';
    } else {
      // Для других категорий активно, если путь содержит ID категории
      return location.pathname.includes(`/catalog/${categoryId}`);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center mr-8">
            <span className="text-2xl font-bold text-primary -ml-2">HeadlampShop</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-dark hover:text-primary transition-colors">Главная</Link>
            <Link to="/about" className="text-dark hover:text-primary transition-colors">О компании</Link>
            <Link to="/contacts" className="text-dark hover:text-primary transition-colors">Контакты</Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center relative flex-1 mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <input
                type="text"
                placeholder="Поиск товаров..."
                className="input pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </button>
            </form>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <div className="relative group">
                <Link to="/account" className="text-dark hover:text-primary transition-colors flex items-center">
                  <UserIcon className="h-6 w-6 mr-1" />
                  <span className="hidden md:inline text-sm">{currentUser.firstName}</span>
                </Link>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                  <Link to="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Личный кабинет
                  </Link>
                  <button 
                    onClick={logout} 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Выйти
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="text-dark hover:text-primary transition-colors">
                <UserIcon className="h-6 w-6" />
              </Link>
            )}
            <Link to="/cart" className="text-dark hover:text-primary transition-colors relative">
              <ShoppingCartIcon className="h-6 w-6" />
              {cart.items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.items.length}
                </span>
              )}
            </Link>
            <button className="md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-dark hover:text-primary transition-colors">Главная</Link>
              
              {/* Мобильный каталог */}
              <div>
                <button 
                  className="flex items-center justify-between w-full text-left text-dark hover:text-primary transition-colors"
                  onClick={() => toggleCategory('mobile-catalog')}
                >
                  <span>Каталог</span>
                  <ChevronDownIcon className={`h-4 w-4 transition-transform ${expandedCategory === 'mobile-catalog' ? 'rotate-180' : ''}`} />
                </button>
                
                {expandedCategory === 'mobile-catalog' && (
                  <ul className="mt-2 ml-4 space-y-2">
                    {categories.map((category) => (
                      <li key={category.id}>
                        <div className="flex flex-col">
                          <button 
                            className="flex items-center justify-between text-left text-gray-700 hover:text-primary"
                            onClick={() => category.hasSubcategories ? toggleCategory(category.id) : handleCategoryClick(category.id)}
                          >
                            <div className="flex items-center">
                              <span className="mr-2">{category.icon}</span>
                              <span>{category.name}</span>
                            </div>
                            {category.hasSubcategories && (
                              <ChevronRightIcon 
                                className={`h-4 w-4 transition-transform ${expandedCategory === category.id ? 'rotate-90' : ''}`} 
                              />
                            )}
                          </button>
                          
                          {category.hasSubcategories && expandedCategory === category.id && (
                            <ul className="mt-2 ml-6 space-y-2">
                              {category.subcategories.map((subcat) => (
                                <li key={subcat.id}>
                                  <button 
                                    className="text-left text-gray-600 hover:text-primary"
                                    onClick={() => handleCategoryClick(category.id, subcat.id)}
                                  >
                                    {subcat.name}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              
              <Link to="/about" className="text-dark hover:text-primary transition-colors">О компании</Link>
              <Link to="/contacts" className="text-dark hover:text-primary transition-colors">Контакты</Link>
              {!currentUser && (
                <Link to="/login" className="text-dark hover:text-primary transition-colors">Войти</Link>
              )}
            </div>
            <form onSubmit={handleSearch} className="mt-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Поиск товаров..."
                  className="input pr-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Горизонтальное меню каталога */}
      <div className="hidden md:block bg-blue-900 text-white">
        <div className="container mx-auto" ref={menuRef}>
          <div className="flex">
            {/* Основные категории */}
            {mainCategories.map((category) => (
              <div 
                key={category.id} 
                className="relative"
              >
                <a 
                  href="#"
                  onClick={(e) => toggleCategory(category.id, e)}
                  className={`flex items-center px-4 py-3 hover:bg-blue-700 transition-colors ${isActiveCategory(category.id) ? 'bg-blue-800' : ''} ${expandedCategory === category.id ? 'bg-blue-700' : ''}`}
                >
                  {category.name}
                  <ChevronDownIcon className={`h-4 w-4 ml-1 transition-transform ${expandedCategory === category.id ? 'rotate-180' : ''}`} />
                </a>
                
                {/* Подкатегории для каждой категории */}
                {expandedCategory === category.id && category.subcategories && (
                  <div className="absolute left-0 mt-0 w-64 bg-white text-gray-800 shadow-lg z-20 border-t-2 border-indigo-600">
                    <div className="py-4 px-6">
                      <h3 className="font-bold text-indigo-600 mb-3">{category.name}</h3>
                      <ul className="space-y-2">
                        {category.subcategories.map((subcat) => (
                          <li key={subcat.id}>
                            <Link 
                              to={subcat.id === 'general' ? '/catalog' : (category.id === 'all' ? `/catalog/${subcat.id}` : `/catalog/${category.id}/${subcat.id}`)}
                              className="block text-gray-700 hover:text-indigo-600 transition-colors"
                              onClick={() => setExpandedCategory(null)}
                            >
                              {subcat.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 