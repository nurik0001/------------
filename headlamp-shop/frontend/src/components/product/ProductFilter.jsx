import { useState } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const ProductFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    brands: [],
    types: [],
    priceMin: '',
    priceMax: '',
    inStock: false,
  });
  
  const [expandedSections, setExpandedSections] = useState({
    brands: true,
    types: true,
    price: true,
  });

  // Список марок автомобилей для фильтра
  const carBrands = [
    'Audi', 'BMW', 'Mercedes', 'Toyota', 'Lexus', 'Volkswagen', 'Land Cruiser 300', 
    'Passat CC', 'Универсальная', 'Mercedes-Benz S-Class', 'BMW 3 Series F30'
  ];

  // Список типов товаров для фильтра
  const productTypes = [
    'BILED', 'Стекло для фары', 'Переходные рамки'
  ];

  // Функция для переключения состояния секции (свернута/развернута)
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Обработчик изменения фильтра по кнопкам (марки авто, типы товаров)
  const handleButtonFilter = (category, value) => {
    setFilters(prev => {
      const currentValues = [...prev[category]];
      const index = currentValues.indexOf(value);
      
      if (index === -1) {
        // Добавляем значение, если его нет
        currentValues.push(value);
      } else {
        // Удаляем значение, если оно уже есть
        currentValues.splice(index, 1);
      }
      
      const newFilters = {
        ...prev,
        [category]: currentValues
      };
      
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  // Обработчик изменения диапазона цен
  const handlePriceChange = (type, value) => {
    setFilters(prev => {
      const newFilters = { ...prev, [type]: value };
      
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  // Обработчик изменения чекбокса "В наличии"
  const handleToggleChange = (field) => {
    setFilters(prev => {
      const newFilters = { ...prev, [field]: !prev[field] };
      
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  // Применение всех фильтров
  const applyFilters = () => {
    onFilterChange(filters);
  };

  // Сброс всех фильтров
  const resetFilters = () => {
    const resetFiltersState = {
      brands: [],
      types: [],
      priceMin: '',
      priceMax: '',
      inStock: false,
    };
    
    setFilters(resetFiltersState);
    onFilterChange(resetFiltersState);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-4">Фильтры</h2>
        
        {/* Кнопки применения и сброса фильтров */}
        <div className="flex space-x-2 mb-4">
          <button 
            className="btn btn-primary flex-1"
            onClick={applyFilters}
          >
            Применить
          </button>
          <button 
            className="btn btn-outline flex-1"
            onClick={resetFilters}
          >
            Сбросить
          </button>
        </div>
        
        {/* Фильтр "В наличии" */}
        <div className="mb-4">
          <label className="flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="form-checkbox h-5 w-5 text-primary" 
              checked={filters.inStock}
              onChange={() => handleToggleChange('inStock')}
            />
            <span className="ml-2 text-gray-700">Только в наличии</span>
          </label>
        </div>
      </div>
      
      {/* Фильтр по марке автомобиля */}
      <div className="border-t border-gray-200 py-4">
        <button 
          className="flex items-center justify-between w-full text-left font-medium"
          onClick={() => toggleSection('brands')}
        >
          <span>Марка автомобиля</span>
          {expandedSections.brands ? (
            <ChevronUpIcon className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDownIcon className="h-5 w-5 text-gray-500" />
          )}
        </button>
        
        {expandedSections.brands && (
          <div className="mt-3">
            <div className="flex flex-wrap gap-2">
              {carBrands.map(brand => (
                <button
                  key={brand}
                  className={`px-3 py-1 text-sm rounded-full border ${
                    filters.brands.includes(brand)
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
                  }`}
                  onClick={() => handleButtonFilter('brands', brand)}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Фильтр по типу товара */}
      <div className="border-t border-gray-200 py-4">
        <button 
          className="flex items-center justify-between w-full text-left font-medium"
          onClick={() => toggleSection('types')}
        >
          <span>Тип товара</span>
          {expandedSections.types ? (
            <ChevronUpIcon className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDownIcon className="h-5 w-5 text-gray-500" />
          )}
        </button>
        
        {expandedSections.types && (
          <div className="mt-3">
            <div className="flex flex-wrap gap-2">
              {productTypes.map(type => (
                <button
                  key={type}
                  className={`px-3 py-1 text-sm rounded-full border ${
                    filters.types.includes(type)
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
                  }`}
                  onClick={() => handleButtonFilter('types', type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Фильтр по цене */}
      <div className="border-t border-gray-200 py-4">
        <button 
          className="flex items-center justify-between w-full text-left font-medium"
          onClick={() => toggleSection('price')}
        >
          <span>Цена, ₸</span>
          {expandedSections.price ? (
            <ChevronUpIcon className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDownIcon className="h-5 w-5 text-gray-500" />
          )}
        </button>
        
        {expandedSections.price && (
          <div className="mt-3">
            <div className="flex space-x-2">
              <div className="flex-1">
                <input
                  type="number"
                  placeholder="От"
                  className="input"
                  value={filters.priceMin}
                  onChange={(e) => handlePriceChange('priceMin', e.target.value)}
                />
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  placeholder="До"
                  className="input"
                  value={filters.priceMax}
                  onChange={(e) => handlePriceChange('priceMax', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductFilter; 