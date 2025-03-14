import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    categoryId: '',
    image: ''
  });

  useEffect(() => {
    const fetchProductAndCategories = async () => {
      try {
        // Загружаем категории
        const categoriesResponse = await fetch('/api/categories');
        if (!categoriesResponse.ok) {
          throw new Error('Не удалось загрузить категории');
        }
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        // Загружаем данные товара
        const productResponse = await fetch(`/api/products/${id}`);
        if (!productResponse.ok) {
          throw new Error('Не удалось загрузить данные товара');
        }
        const productData = await productResponse.json();
        
        setFormData({
          name: productData.name,
          description: productData.description || '',
          price: productData.price.toString(),
          stock: productData.stock.toString(),
          categoryId: productData.categoryId || '',
          image: productData.image || ''
        });
      } catch (err) {
        console.error('Ошибка при загрузке данных:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndCategories();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Преобразуем данные в нужный формат
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock, 10),
        categoryId: formData.categoryId || null
      };
      
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      });
      
      if (!response.ok) {
        throw new Error('Не удалось обновить товар');
      }
      
      // Перенаправляем на страницу со списком товаров с сообщением об успехе
      navigate('/admin/products', { 
        state: { message: 'Товар успешно обновлен!' } 
      });
    } catch (err) {
      console.error('Ошибка при обновлении товара:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading && !error) {
    return <div className="text-center py-8">Загрузка...</div>;
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/admin/products')}
          className="mr-4 p-2 rounded-full hover:bg-gray-100"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-bold">Редактирование товара</h1>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Название товара*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Цена*
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                  Количество на складе*
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
                  Категория
                </label>
                <select
                  id="categoryId"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                >
                  <option value="">Выберите категорию</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                  URL изображения
                </label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Описание
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                ></textarea>
              </div>

              {formData.image && (
                <div>
                  <p className="block text-sm font-medium text-gray-700 mb-1">Предпросмотр изображения</p>
                  <img 
                    src={formData.image} 
                    alt="Предпросмотр товара" 
                    className="h-32 w-32 object-cover rounded-md border border-gray-300" 
                  />
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="px-4 py-2 mr-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50"
            >
              {loading ? 'Сохранение...' : 'Сохранить изменения'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductPage; 