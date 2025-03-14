import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Bars3Icon, 
  XMarkIcon, 
  HomeIcon, 
  ShoppingBagIcon, 
  UsersIcon, 
  CubeIcon, 
  ChartBarIcon,
  CogIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const handleLogout = () => {
    // Здесь будет логика выхода из админ-панели
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-30 h-full w-64 bg-dark text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
          <Link to="/admin" className="text-xl font-bold">HeadlampShop Admin</Link>
          <button 
            className="p-1 rounded-md lg:hidden hover:bg-gray-700"
            onClick={closeSidebar}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-4 px-2">
          <ul className="space-y-1">
            <li>
              <Link
                to="/admin"
                className={`flex items-center px-4 py-2 rounded-md ${
                  isActive('/admin') && !isActive('/admin/products') && !isActive('/admin/orders') && !isActive('/admin/users') && !isActive('/admin/settings')
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-700'
                }`}
              >
                <HomeIcon className="h-5 w-5 mr-3" />
                Дашборд
              </Link>
            </li>
            <li>
              <Link
                to="/admin/products"
                className={`flex items-center px-4 py-2 rounded-md ${
                  isActive('/admin/products')
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-700'
                }`}
              >
                <CubeIcon className="h-5 w-5 mr-3" />
                Товары
              </Link>
            </li>
            <li>
              <Link
                to="/admin/orders"
                className={`flex items-center px-4 py-2 rounded-md ${
                  isActive('/admin/orders')
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-700'
                }`}
              >
                <ShoppingBagIcon className="h-5 w-5 mr-3" />
                Заказы
              </Link>
            </li>
            <li>
              <Link
                to="/admin/users"
                className={`flex items-center px-4 py-2 rounded-md ${
                  isActive('/admin/users')
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-700'
                }`}
              >
                <UsersIcon className="h-5 w-5 mr-3" />
                Пользователи
              </Link>
            </li>
            <li>
              <Link
                to="/admin/analytics"
                className={`flex items-center px-4 py-2 rounded-md ${
                  isActive('/admin/analytics')
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-700'
                }`}
              >
                <ChartBarIcon className="h-5 w-5 mr-3" />
                Аналитика
              </Link>
            </li>
            <li>
              <Link
                to="/admin/settings"
                className={`flex items-center px-4 py-2 rounded-md ${
                  isActive('/admin/settings')
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-700'
                }`}
              >
                <CogIcon className="h-5 w-5 mr-3" />
                Настройки
              </Link>
            </li>
          </ul>

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-red-400 hover:bg-gray-700 rounded-md"
            >
              <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-3" />
              Выйти
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4">
          <button
            className="p-1 rounded-md lg:hidden hover:bg-gray-100"
            onClick={toggleSidebar}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

          <div className="flex items-center ml-auto">
            <div className="relative">
              <div className="flex items-center cursor-pointer">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-2">
                  <UsersIcon className="h-4 w-4 text-primary" />
                </div>
                <span className="font-medium">Администратор</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 