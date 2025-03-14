import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const location = useLocation();

  const productsPerPage = 10;

  useEffect(() => {
    // Проверяем, есть ли сообщение об успешном добавлении/редактировании товара
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Очищаем сообщение через 5 секунд
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Не удалось загрузить товары');
        }
        const data = await response.json();
        setProducts(data);
        setTotalPages(Math.ceil(data.length / productsPerPage));
      } catch (err) {
        console.error('Ошибка при загрузке товаров:', err);
        setError('Не удалось загрузить товары. Пожалуйста, попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProducts(paginatedProducts.map(product => product.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!window.confirm('Вы уверены, что хотите удалить этот товар?')) {
      return;
    }

    try {
      const response = await fetch(`/api/products/${productToDelete.id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Не удалось удалить товар');
      }

      // Обновляем список товаров после удаления
      setProducts(products.filter(product => product.id !== productToDelete.id));
      setSelectedProducts(selectedProducts.filter(id => id !== productToDelete.id));
      setShowDeleteModal(false);
      setProductToDelete(null);
      setSuccessMessage('Товар успешно удален!');
    } catch (err) {
      console.error('Ошибка при удалении товара:', err);
      setError('Не удалось удалить товар. Пожалуйста, попробуйте позже.');
    }
  };

  const handleBulkDelete = () => {
    // Здесь будет логика массового удаления товаров
    setProducts(products.filter(product => !selectedProducts.includes(product.id)));
    setSelectedProducts([]);
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="h-12 bg-gray-200 rounded mb-6"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Управление товарами</h1>
        <Link 
          to="/admin/products/add" 
          className="btn btn-primary flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Добавить товар
        </Link>
      </div>

      {successMessage && (
        <div className="bg-green-50 text-green-700 p-4 rounded-md mb-6">
          {successMessage}
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <input
                type="text"
                placeholder="Поиск товаров..."
                className="input pl-10 w-full"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
          
          <div>
            <select className="input">
              <option value="">Все категории</option>
              <option value="biled">BILED</option>
              <option value="glass">Стекло для фары</option>
              <option value="frames">Переходные рамки</option>
              <option value="led">Лед лампочки</option>
            </select>
          </div>
          
          <div>
            <select className="input">
              <option value="">Наличие</option>
              <option value="inStock">В наличии</option>
              <option value="outOfStock">Нет в наличии</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {selectedProducts.length > 0 && (
          <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
            <span>Выбрано товаров: {selectedProducts.length}</span>
            <button 
              className="btn btn-outline text-red-500 border-red-500 hover:bg-red-50"
              onClick={handleBulkDelete}
            >
              <TrashIcon className="h-5 w-5 mr-2" />
              Удалить выбранные
            </button>
          </div>
        )}
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 text-left">
                  <input 
                    type="checkbox" 
                    onChange={handleSelectAll}
                    checked={selectedProducts.length === paginatedProducts.length && paginatedProducts.length > 0}
                  />
                </th>
                <th className="py-3 px-4 text-left">Фото</th>
                <th className="py-3 px-4 text-left">Название</th>
                <th className="py-3 px-4 text-left">Категория</th>
                <th className="py-3 px-4 text-left">Цена</th>
                <th className="py-3 px-4 text-left">Наличие</th>
                <th className="py-3 px-4 text-right">Действия</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map(product => (
                <tr key={product.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <input 
                      type="checkbox" 
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleSelectProduct(product.id)}
                    />
                  </td>
                  <td className="py-3 px-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="py-3 px-4 font-medium">
                    <Link to={`/admin/products/${product.id}`} className="hover:text-primary">
                      {product.name}
                    </Link>
                  </td>
                  <td className="py-3 px-4">{product.category}</td>
                  <td className="py-3 px-4">{product.price.toLocaleString()} ₸</td>
                  <td className="py-3 px-4">
                    {product.inStock ? (
                      <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">В наличии</span>
                    ) : (
                      <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs">Нет в наличии</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <Link 
                        to={`/admin/products/${product.id}/edit`}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </Link>
                      <button 
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                        onClick={() => handleDeleteClick(product)}
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {paginatedProducts.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-gray-500">
                    Товары не найдены
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {filteredProducts.length > productsPerPage && (
          <div className="flex justify-between items-center p-4 border-t">
            <div className="text-sm text-gray-500">
              Показано {(currentPage - 1) * productsPerPage + 1} - {Math.min(currentPage * productsPerPage, filteredProducts.length)} из {filteredProducts.length}
            </div>
            <div className="flex space-x-1">
              <button 
                className={`p-2 rounded ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button 
                  key={i}
                  className={`w-8 h-8 rounded ${currentPage === i + 1 ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              
              <button 
                className={`p-2 rounded ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Подтверждение удаления</h3>
            <p className="mb-6">
              Вы уверены, что хотите удалить товар "{productToDelete.name}"? Это действие нельзя отменить.
            </p>
            <div className="flex justify-end space-x-3">
              <button 
                className="btn btn-outline"
                onClick={() => setShowDeleteModal(false)}
              >
                Отмена
              </button>
              <button 
                className="btn bg-red-600 text-white hover:bg-red-700"
                onClick={handleDeleteConfirm}
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage; 