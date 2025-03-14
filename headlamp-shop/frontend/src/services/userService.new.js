import api from './api';

const userService = {
  // Регистрация нового пользователя
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  },

  // Авторизация пользователя
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  // Выход пользователя
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Получить текущего пользователя из localStorage
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Проверить, авторизован ли пользователь
  isAuthenticated: () => {
    return true; // Временно всегда возвращаем true для тестирования
  },

  // Проверить, является ли пользователь администратором
  isAdmin: () => {
    return true; // Временно всегда возвращаем true для тестирования
  },

  // Получить профиль пользователя с сервера
  getProfile: async () => {
    // Временная заглушка
    return {
      id: 1,
      email: 'admin@demo.com',
      name: 'Admin User',
      role: 'ADMIN'
    };
  },

  // Обновить профиль пользователя
  updateProfile: async (userData) => {
    // Временная заглушка
    return userData;
  },

  // Изменить пароль
  changePassword: async () => {
    // Временная заглушка
    return { success: true };
  },

  // Получить историю заказов пользователя
  getOrders: async () => {
    // Временная заглушка
    return [];
  },

  // Получить детали заказа по ID
  getOrderById: async (orderId) => {
    // Временная заглушка
    return {
      id: orderId,
      status: 'PENDING',
      total: 0,
      items: []
    };
  },

  // Запрос на сброс пароля
  requestPasswordReset: async () => {
    // Временная заглушка
    return { success: true };
  },

  // Сброс пароля с использованием токена
  resetPassword: async () => {
    // Временная заглушка
    return { success: true };
  }
};

export default userService; 