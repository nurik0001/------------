import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, CheckIcon } from '@heroicons/react/24/outline';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    address: '',
    paymentMethod: 'card',
    deliveryMethod: 'courier',
    comment: ''
  });
  const [errors, setErrors] = useState({});
  const [orderSubmitted, setOrderSubmitted] = useState(false);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'Введите имя';
    if (!formData.lastName.trim()) newErrors.lastName = 'Введите фамилию';
    if (!formData.email.trim()) {
      newErrors.email = 'Введите email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Некорректный email';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Введите телефон';
    } else if (!/^\+?[0-9]{10,12}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Некорректный телефон';
    }
    if (!formData.city.trim()) newErrors.city = 'Введите город';
    if (!formData.address.trim()) newErrors.address = 'Введите адрес';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Здесь будет отправка заказа на сервер
    console.log('Order submitted:', { items: cartItems, customer: formData, total: totalPrice });
    
    // Имитация успешного оформления заказа
    setOrderSubmitted(true);
    
    // Перенаправление на страницу успешного оформления заказа через 2 секунды
    setTimeout(() => {
      navigate('/order-success', { state: { orderId: 'ORD-' + Date.now() } });
    }, 2000);
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

  if (orderSubmitted) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse">
          <div className="h-16 w-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <CheckIcon className="h-8 w-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Оформляем ваш заказ...</h2>
          <p className="text-gray-600">Пожалуйста, подождите. Вы будете перенаправлены на страницу с информацией о заказе.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/cart" className="flex items-center text-gray-600 hover:text-primary">
          <ChevronLeftIcon className="h-5 w-5 mr-1" />
          Вернуться в корзину
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">Оформление заказа</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Личные данные</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="firstName" className="block text-gray-700 mb-1">Имя *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`input w-full ${errors.firstName ? 'border-red-500' : ''}`}
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-gray-700 mb-1">Фамилия *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`input w-full ${errors.lastName ? 'border-red-500' : ''}`}
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`input w-full ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-gray-700 mb-1">Телефон *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+7 (___) ___-__-__"
                    className={`input w-full ${errors.phone ? 'border-red-500' : ''}`}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>
            
            {/* Delivery Information */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Доставка</h2>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Способ доставки</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="courier"
                      checked={formData.deliveryMethod === 'courier'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span>Курьером</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="pickup"
                      checked={formData.deliveryMethod === 'pickup'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span>Самовывоз</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="post"
                      checked={formData.deliveryMethod === 'post'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span>Почта Казахстана</span>
                  </label>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="city" className="block text-gray-700 mb-1">Город *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`input w-full ${errors.city ? 'border-red-500' : ''}`}
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-gray-700 mb-1">Адрес *</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`input w-full ${errors.address ? 'border-red-500' : ''}`}
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>
              </div>
            </div>
            
            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Способ оплаты</h2>
              
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span>Банковской картой онлайн</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === 'cash'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span>Наличными при получении</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="transfer"
                    checked={formData.paymentMethod === 'transfer'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span>Банковским переводом</span>
                </label>
              </div>
            </div>
            
            {/* Comment */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Комментарий к заказу</h2>
              
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleInputChange}
                rows="3"
                className="input w-full"
                placeholder="Дополнительная информация к заказу"
              ></textarea>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <h2 className="text-xl font-bold mb-4">Ваш заказ</h2>
            
            <div className="mb-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between py-2 border-b">
                  <div className="flex items-center">
                    <span className="font-medium">{item.quantity} × </span>
                    <span className="ml-2 text-sm">{item.name}</span>
                  </div>
                  <span>{(item.price * item.quantity).toLocaleString()} ₸</span>
                </div>
              ))}
            </div>
            
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
            
            <button 
              type="submit"
              onClick={handleSubmit}
              className="btn btn-primary w-full"
            >
              Подтвердить заказ
            </button>
            
            <p className="text-sm text-gray-500 mt-4">
              Нажимая кнопку "Подтвердить заказ", вы соглашаетесь с условиями 
              <Link to="/terms" className="text-primary hover:underline ml-1">
                пользовательского соглашения
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 