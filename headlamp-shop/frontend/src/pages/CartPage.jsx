import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrashIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Здесь будет загрузка товаров из корзины с сервера
    // Временные данные для демонстрации
    const mockCartItems = [
      {
        id: 1,
        productId: 1,
        name: 'BiLed GTR-G40 0101 (VIOLET)',
        price: 65000,
        quantity: 1,
        image: 'https://via.placeholder.com/100x100?text=BiLed+GTR-G40'
      },
      {
        id: 2,
        productId: 3,
        name: 'Универсальная переходная рамка/Ch №63',
        price: 12000,
        quantity: 2,
        image: 'https://via.placeholder.com/100x100?text=Рамка+63'
      }
    ];

    setCartItems(mockCartItems);
    calculateTotal(mockCartItems);
    setLoading(false);
  }, []);

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotalPrice(total);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedItems = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedItems);
    calculateTotal(updatedItems);
  };

  const removeItem = (id) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    calculateTotal(updatedItems);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-8"></div>
          <div className="h-64 bg-gray-200 rounded mb-8"></div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mb-8">
          <ShoppingBagIcon className="h-16 w-16 mx-auto text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Ваша корзина пуста</h1>
        <p className="text-gray-600 mb-8">Добавьте товары в корзину, чтобы оформить заказ.</p>
        <Link to="/catalog" className="btn btn-primary">
          Перейти в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Корзина</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-2">Товар</th>
                    <th className="text-center py-4 px-2">Цена</th>
                    <th className="text-center py-4 px-2">Количество</th>
                    <th className="text-center py-4 px-2">Сумма</th>
                    <th className="text-center py-4 px-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(item => (
                    <tr key={item.id} className="border-b">
                      <td className="py-4 px-2">
                        <div className="flex items-center">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded mr-4"
                          />
                          <div>
                            <Link 
                              to={`/product/${item.productId}`}
                              className="font-medium hover:text-primary"
                            >
                              {item.name}
                            </Link>
                          </div>
                        </div>
                      </td>
                      <td className="text-center py-4 px-2">
                        {item.price.toLocaleString()} ₸
                      </td>
                      <td className="text-center py-4 px-2">
                        <div className="flex justify-center">
                          <div className="flex border border-gray-300 rounded-md overflow-hidden">
                            <button 
                              className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                              className="w-12 text-center border-x border-gray-300 py-1"
                            />
                            <button 
                              className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="text-center py-4 px-2 font-medium">
                        {(item.price * item.quantity).toLocaleString()} ₸
                      </td>
                      <td className="text-center py-4 px-2">
                        <button 
                          className="text-red-500 hover:text-red-700"
                          onClick={() => removeItem(item.id)}
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-between mb-8">
            <Link to="/catalog" className="btn btn-outline">
              Продолжить покупки
            </Link>
            <button className="btn btn-outline text-red-500 border-red-500 hover:bg-red-50">
              Очистить корзину
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <h2 className="text-xl font-bold mb-4">Сумма заказа</h2>
            
            <div className="border-t border-b py-4 mb-4">
              <div className="flex justify-between mb-2">
                <span>Товары ({cartItems.length})</span>
                <span>{totalPrice.toLocaleString()} ₸</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Доставка</span>
                <span>Бесплатно</span>
              </div>
            </div>
            
            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Итого</span>
              <span>{totalPrice.toLocaleString()} ₸</span>
            </div>
            
            <Link to="/checkout" className="btn btn-primary w-full">
              Оформить заказ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 