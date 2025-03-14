import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBagIcon, 
  UsersIcon, 
  CubeIcon, 
  CurrencyDollarIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0,
    totalRevenue: 0,
    recentOrders: [],
    topProducts: [],
    salesByMonth: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Здесь будет загрузка данных с сервера
    // Временные данные для демонстрации
    const mockStats = {
      totalOrders: 156,
      totalProducts: 89,
      totalUsers: 42,
      totalRevenue: 7850000,
      recentOrders: [
        { id: 'ORD-12350', customer: 'Иван Иванов', date: '2023-06-10', status: 'processing', total: 65000 },
        { id: 'ORD-12349', customer: 'Петр Петров', date: '2023-06-09', status: 'shipped', total: 50000 },
        { id: 'ORD-12348', customer: 'Анна Сидорова', date: '2023-06-08', status: 'delivered', total: 77000 },
        { id: 'ORD-12347', customer: 'Мария Кузнецова', date: '2023-06-07', status: 'delivered', total: 25000 },
        { id: 'ORD-12346', customer: 'Алексей Смирнов', date: '2023-06-06', status: 'delivered', total: 50000 }
      ],
      topProducts: [
        { id: 1, name: 'BiLed GTR-G40 0101 (VIOLET)', sales: 24, revenue: 1560000 },
        { id: 2, name: 'Стекло Фары Toyota LC300 2021- Lh', sales: 18, revenue: 900000 },
        { id: 3, name: 'Универсальная переходная рамка/Ch №63', sales: 32, revenue: 384000 },
        { id: 4, name: 'Стекло Фары Volkswagen Passat CC 08-12 Lh', sales: 15, revenue: 375000 }
      ],
      salesByMonth: [
        { month: 'Янв', sales: 450000 },
        { month: 'Фев', sales: 520000 },
        { month: 'Мар', sales: 680000 },
        { month: 'Апр', sales: 750000 },
        { month: 'Май', sales: 820000 },
        { month: 'Июн', sales: 950000 }
      ]
    };

    setStats(mockStats);
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
      <div className="animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 h-32"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 h-80"></div>
          <div className="bg-white rounded-lg shadow-md p-6 h-80"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Дашборд</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
              <ShoppingBagIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Заказы</p>
              <h3 className="text-2xl font-bold">{stats.totalOrders}</h3>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">12%</span>
            <span className="text-gray-500 ml-2">с прошлого месяца</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mr-4">
              <CubeIcon className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Товары</p>
              <h3 className="text-2xl font-bold">{stats.totalProducts}</h3>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">5%</span>
            <span className="text-gray-500 ml-2">с прошлого месяца</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
              <UsersIcon className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Пользователи</p>
              <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">8%</span>
            <span className="text-gray-500 ml-2">с прошлого месяца</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
              <CurrencyDollarIcon className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Выручка</p>
              <h3 className="text-2xl font-bold">{(stats.totalRevenue / 1000000).toFixed(1)} млн ₸</h3>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-green-500 font-medium">15%</span>
            <span className="text-gray-500 ml-2">с прошлого месяца</span>
          </div>
        </div>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Последние заказы</h2>
            <Link to="/admin/orders" className="text-primary hover:underline text-sm">
              Все заказы
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">ID</th>
                  <th className="text-left py-3 px-2">Клиент</th>
                  <th className="text-left py-3 px-2">Дата</th>
                  <th className="text-left py-3 px-2">Статус</th>
                  <th className="text-right py-3 px-2">Сумма</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map(order => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2">
                      <Link to={`/admin/orders/${order.id}`} className="text-primary hover:underline">
                        {order.id}
                      </Link>
                    </td>
                    <td className="py-3 px-2">{order.customer}</td>
                    <td className="py-3 px-2">{new Date(order.date).toLocaleDateString()}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right font-medium">
                      {order.total.toLocaleString()} ₸
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Популярные товары</h2>
            <Link to="/admin/products" className="text-primary hover:underline text-sm">
              Все товары
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Товар</th>
                  <th className="text-center py-3 px-2">Продажи</th>
                  <th className="text-right py-3 px-2">Выручка</th>
                </tr>
              </thead>
              <tbody>
                {stats.topProducts.map(product => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-2">
                      <Link to={`/admin/products/${product.id}`} className="hover:text-primary">
                        {product.name}
                      </Link>
                    </td>
                    <td className="py-3 px-2 text-center">{product.sales}</td>
                    <td className="py-3 px-2 text-right font-medium">
                      {product.revenue.toLocaleString()} ₸
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-bold mb-4">Продажи по месяцам</h2>
        
        <div className="h-64 flex items-end justify-between">
          {stats.salesByMonth.map((data, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className="bg-primary w-12 rounded-t-md" 
                style={{ height: `${(data.sales / 1000000) * 200}px` }}
              ></div>
              <div className="mt-2 text-sm text-gray-600">{data.month}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 