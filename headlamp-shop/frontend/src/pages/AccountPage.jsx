import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserIcon, ShoppingBagIcon, CogIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Здесь будет загрузка данных пользователя и заказов с сервера
    // Временные данные для демонстрации
    const mockUser = {
      id: 1,
      firstName: 'Иван',
      lastName: 'Иванов',
      email: 'ivan@example.com',
      phone: '+7 (777) 123-45-67',
      city: 'Алматы',
      address: 'ул. Примерная, 123'
    };

    const mockOrders = [
      {
        id: 'ORD-12345',
        date: '2023-05-15',
        status: 'delivered',
        total: 77000,
        items: [
          {
            id: 1,
            name: 'BiLed GTR-G40 0101 (VIOLET)',
            price: 65000,
            quantity: 1
          },
          {
            id: 2,
            name: 'Универсальная переходная рамка/Ch №63',
            price: 12000,
            quantity: 1
          }
        ]
      },
      {
        id: 'ORD-12346',
        date: '2023-04-20',
        status: 'delivered',
        total: 50000,
        items: [
          {
            id: 3,
            name: 'Стекло Фары Toyota LC300 2021- Lh',
            price: 50000,
            quantity: 1
          }
        ]
      },
      {
        id: 'ORD-12347',
        date: '2023-06-01',
        status: 'processing',
        total: 25000,
        items: [
          {
            id: 4,
            name: 'Стекло Фары Volkswagen Passat CC 08-12 Lh',
            price: 25000,
            quantity: 1
          }
        ]
      }
    ];

    setUser(mockUser);
    setOrders(mockOrders);
    setLoading(false);
  }, []);

  const getStatusText = (status) => {
    switch (status) {
      case 'processing':
        return 'В обработке';
      case 'shipped':
        return 'Отправлен';
      case 'delivered':
        return 'Доставлен';
      case 'cancelled':
        return 'Отменен';
      default:
        return 'Неизвестно';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'processing':
        return 'bg-blue-100 text-blue-600';
      case 'shipped':
        return 'bg-yellow-100 text-yellow-600';
      case 'delivered':
        return 'bg-green-100 text-green-600';
      case 'cancelled':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Личный кабинет</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                <UserIcon className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="font-bold text-lg">{user.firstName} {user.lastName}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>

            <nav>
              <ul className="space-y-2">
                <li>
                  <button
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center ${activeTab === 'profile' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                    onClick={() => setActiveTab('profile')}
                  >
                    <UserIcon className="h-5 w-5 mr-2" />
                    Профиль
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center ${activeTab === 'orders' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                    onClick={() => setActiveTab('orders')}
                  >
                    <ShoppingBagIcon className="h-5 w-5 mr-2" />
                    История заказов
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center ${activeTab === 'settings' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                    onClick={() => setActiveTab('settings')}
                  >
                    <CogIcon className="h-5 w-5 mr-2" />
                    Настройки
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left px-4 py-2 rounded-md flex items-center text-red-500 hover:bg-red-50"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                    Выйти
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-6">Личные данные</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-gray-500 text-sm mb-1">Имя</h3>
                  <p>{user.firstName}</p>
                </div>
                <div>
                  <h3 className="text-gray-500 text-sm mb-1">Фамилия</h3>
                  <p>{user.lastName}</p>
                </div>
                <div>
                  <h3 className="text-gray-500 text-sm mb-1">Email</h3>
                  <p>{user.email}</p>
                </div>
                <div>
                  <h3 className="text-gray-500 text-sm mb-1">Телефон</h3>
                  <p>{user.phone}</p>
                </div>
                <div>
                  <h3 className="text-gray-500 text-sm mb-1">Город</h3>
                  <p>{user.city}</p>
                </div>
                <div>
                  <h3 className="text-gray-500 text-sm mb-1">Адрес</h3>
                  <p>{user.address}</p>
                </div>
              </div>
              
              <button className="btn btn-primary">
                Редактировать профиль
              </button>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-6">История заказов</h2>
              
              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBagIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">У вас пока нет заказов</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map(order => (
                    <div key={order.id} className="border rounded-lg overflow-hidden">
                      <div className="bg-gray-50 p-4 flex flex-wrap justify-between items-center">
                        <div>
                          <p className="font-medium">Заказ {order.id}</p>
                          <p className="text-sm text-gray-500">от {new Date(order.date).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(order.status)}`}>
                            {getStatusText(order.status)}
                          </span>
                          <Link to={`/order/${order.id}`} className="ml-4 text-primary hover:underline">
                            Подробнее
                          </Link>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="mb-4">
                          {order.items.map(item => (
                            <div key={item.id} className="flex justify-between py-2 border-b last:border-0">
                              <div>
                                <span className="font-medium">{item.quantity} × </span>
                                <span>{item.name}</span>
                              </div>
                              <span>{item.price.toLocaleString()} ₸</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between font-bold">
                          <span>Итого:</span>
                          <span>{order.total.toLocaleString()} ₸</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-6">Настройки</h2>
              
              <div className="mb-6">
                <h3 className="font-medium mb-4">Изменить пароль</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="currentPassword" className="block text-gray-700 mb-1">Текущий пароль</label>
                    <input
                      type="password"
                      id="currentPassword"
                      className="input w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="newPassword" className="block text-gray-700 mb-1">Новый пароль</label>
                    <input
                      type="password"
                      id="newPassword"
                      className="input w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-gray-700 mb-1">Подтвердите пароль</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      className="input w-full"
                    />
                  </div>
                </div>
                <button className="btn btn-primary mt-4">
                  Сохранить изменения
                </button>
              </div>
              
              <div className="border-t pt-6">
                <h3 className="font-medium mb-4">Настройки уведомлений</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      defaultChecked
                    />
                    <span>Получать уведомления о статусе заказа</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      defaultChecked
                    />
                    <span>Получать новости и специальные предложения</span>
                  </label>
                </div>
                <button className="btn btn-primary mt-4">
                  Сохранить настройки
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPage; 