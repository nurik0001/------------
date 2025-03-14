import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

const CarBrandsPage = () => {
  const navigate = useNavigate();

  // Список марок автомобилей, сгруппированный по первой букве
  const carBrands = {
    'A': [
      { id: 'acura', name: 'Acura' },
      { id: 'audi', name: 'AUDI' },
    ],
    'B': [
      { id: 'baic', name: 'Baic' },
      { id: 'bmw', name: 'BMW' },
    ],
    'C': [
      { id: 'cadillac', name: 'Cadillac' },
      { id: 'changan', name: 'Changan' },
      { id: 'chery', name: 'Chery' },
      { id: 'chevrolet', name: 'Chevrolet' },
      { id: 'citroen', name: 'Citroen' },
    ],
    'D': [
      { id: 'daewoo', name: 'Daewoo' },
    ],
    'F': [
      { id: 'faw', name: 'FAW' },
      { id: 'ford', name: 'Ford' },
    ],
    'G': [
      { id: 'geely', name: 'Geely' },
    ],
    'H': [
      { id: 'haval', name: 'Haval' },
      { id: 'honda', name: 'Honda' },
      { id: 'hyundai', name: 'Hyundai' },
    ],
    'I': [
      { id: 'infiniti', name: 'Infiniti' },
    ],
    'J': [
      { id: 'jac', name: 'JAC' },
      { id: 'jaguar', name: 'Jaguar' },
      { id: 'jeep', name: 'Jeep' },
    ],
    'K': [
      { id: 'kaiyi', name: 'Kaiyi' },
      { id: 'kia', name: 'Kia' },
    ],
    'L': [
      { id: 'land-rover', name: 'Land Rover' },
      { id: 'lexus', name: 'Lexus' },
      { id: 'livan', name: 'Livan' },
      { id: 'lixiang', name: 'Lixiang' },
    ],
    'M': [
      { id: 'mazda', name: 'Mazda' },
      { id: 'mercedes', name: 'Mercedes' },
    ],
    'N': [
      { id: 'nissan', name: 'Nissan' },
    ],
    'O': [
      { id: 'omoda', name: 'Omoda' },
      { id: 'opel', name: 'Opel' },
    ],
    'P': [
      { id: 'peugeot', name: 'Peugeot' },
      { id: 'porsche', name: 'Porsche' },
    ],
    'R': [
      { id: 'renault', name: 'Renault' },
    ],
    'S': [
      { id: 'skoda', name: 'Skoda' },
      { id: 'subaru', name: 'Subaru' },
      { id: 'suzuki', name: 'Suzuki' },
    ],
    'T': [
      { id: 'tank', name: 'Tank' },
      { id: 'toyota', name: 'Toyota' },
    ],
    'V': [
      { id: 'volkswagen', name: 'Volkswagen' },
      { id: 'volvo', name: 'Volvo' },
      { id: 'voyah', name: 'Voyah' },
    ],
  };

  // Обработчик клика по марке автомобиля
  const handleBrandClick = (brandId) => {
    navigate(`/catalog/frames/${brandId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Хлебные крошки */}
      <div className="flex items-center text-sm mb-6">
        <Link to="/" className="text-gray-500 hover:text-primary">Главная</Link>
        <ChevronRightIcon className="h-4 w-4 mx-2 text-gray-400" />
        <Link to="/catalog" className="text-gray-500 hover:text-primary">Каталог</Link>
        <ChevronRightIcon className="h-4 w-4 mx-2 text-gray-400" />
        <Link to="/catalog/frames" className="text-gray-500 hover:text-primary">Переходные рамки</Link>
        <ChevronRightIcon className="h-4 w-4 mx-2 text-gray-400" />
        <span className="text-gray-700">Марки автомобилей</span>
      </div>

      {/* Заголовок */}
      <h1 className="text-2xl font-bold mb-8">Выберите марку автомобиля</h1>

      {/* Информационный блок */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
        <p className="text-blue-700">
          Выберите марку вашего автомобиля, чтобы найти подходящие переходные рамки для установки линз и модулей.
        </p>
      </div>

      {/* Список марок автомобилей */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(carBrands).map(([letter, brands]) => (
            <div key={letter} className="mb-4">
              <h2 className="text-xl font-bold text-primary mb-3">{letter}</h2>
              <ul className="space-y-2">
                {brands.map(brand => (
                  <li key={brand.id}>
                    <button
                      className="text-gray-700 hover:text-primary transition-colors"
                      onClick={() => handleBrandClick(brand.id)}
                    >
                      {brand.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Популярные марки */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-6">Популярные марки</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {['toyota', 'bmw', 'mercedes', 'audi', 'volkswagen', 'honda'].map(brandId => {
            const brand = Object.values(carBrands)
              .flat()
              .find(b => b.id === brandId);
            
            return brand ? (
              <div 
                key={brand.id} 
                className="bg-white rounded-lg shadow-sm p-4 text-center cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleBrandClick(brand.id)}
              >
                <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">{brand.name.charAt(0)}</span>
                </div>
                <p className="font-medium">{brand.name}</p>
              </div>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
};

export default CarBrandsPage; 