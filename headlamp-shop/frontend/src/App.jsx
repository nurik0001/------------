import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AccountPage from './pages/AccountPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import AboutPage from './pages/AboutPage';
import ContactsPage from './pages/ContactsPage';
import CarBrandsPage from './pages/CarBrandsPage';

// Админ-панель
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/pages/Dashboard';
import ProductsPage from './admin/pages/ProductsPage';
import AddProductPage from './admin/pages/AddProductPage';
import EditProductPage from './admin/pages/EditProductPage';

function App() {
  return (
    <Routes>
      {/* Страницы аутентификации */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      
      {/* Клиентская часть */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="catalog" element={<CatalogPage />} />
        <Route path="catalog/:categoryId" element={<CatalogPage />} />
        <Route path="catalog/frames/brands" element={<CarBrandsPage />} />
        <Route path="product/:productId" element={<ProductPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contacts" element={<ContactsPage />} />
      </Route>
      
      {/* Админ-панель */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/add" element={<AddProductPage />} />
        <Route path="products/edit/:id" element={<EditProductPage />} />
        {/* Здесь будут другие маршруты админ-панели */}
      </Route>
    </Routes>
  );
}

export default App;
