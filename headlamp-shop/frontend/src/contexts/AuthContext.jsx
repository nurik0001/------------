import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../services/userService';

// Создаем контекст
const AuthContext = createContext();

// Хук для использования контекста аутентификации
export const useAuth = () => {
  return useContext(AuthContext);
};

// Провайдер контекста аутентификации
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Инициализация: проверяем, есть ли сохраненный пользователь
  useEffect(() => {
    const user = userService.getCurrentUser();
    setCurrentUser(user);
    setLoading(false);
    
    // Убираем автоматическое перенаправление
    // if (user) {
    //   navigate('/admin');
    // }
  }, []);

  // Функция для регистрации
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await userService.register(userData);
      // После успешной регистрации перенаправляем на страницу входа
      navigate('/login', { state: { message: 'Регистрация успешна! Теперь вы можете войти.' } });
      return result;
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка при регистрации');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Функция для входа
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const result = await userService.login(email, password);
      setCurrentUser(result.user);
      // После успешного входа перенаправляем в админ-панель
      navigate('/admin');
      return result;
    } catch (err) {
      setError(err.response?.data?.message || 'Неверный email или пароль');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Функция для выхода
  const logout = () => {
    userService.logout();
    setCurrentUser(null);
    navigate('/');
  };

  // Функция для обновления профиля
  const updateProfile = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedUser = await userService.updateProfile(userData);
      setCurrentUser(prevUser => ({ ...prevUser, ...updatedUser }));
      return updatedUser;
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка при обновлении профиля');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Функция для изменения пароля
  const changePassword = async (currentPassword, newPassword) => {
    setLoading(true);
    setError(null);
    try {
      return await userService.changePassword(currentPassword, newPassword);
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка при изменении пароля');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Функция для запроса сброса пароля
  const requestPasswordReset = async (email) => {
    setLoading(true);
    setError(null);
    try {
      return await userService.requestPasswordReset(email);
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка при запросе сброса пароля');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Функция для сброса пароля
  const resetPassword = async (token, newPassword) => {
    setLoading(true);
    setError(null);
    try {
      return await userService.resetPassword(token, newPassword);
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка при сбросе пароля');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Значение контекста
  const value = {
    currentUser,
    loading,
    error,
    isAuthenticated: userService.isAuthenticated,
    isAdmin: userService.isAdmin,
    register,
    login,
    logout,
    updateProfile,
    changePassword,
    requestPasswordReset,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 