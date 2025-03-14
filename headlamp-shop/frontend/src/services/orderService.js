import api from './api';

const orderService = {
  // Создать новый заказ
  createOrder: async (orderData) => {
    try {
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Получить заказ по ID
  getOrderById: async (orderId) => {
    try {
      const response = await api.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching order ${orderId}:`, error);
      throw error;
    }
  },

  // Отменить заказ
  cancelOrder: async (orderId) => {
    try {
      const response = await api.put(`/orders/${orderId}/cancel`);
      return response.data;
    } catch (error) {
      console.error(`Error cancelling order ${orderId}:`, error);
      throw error;
    }
  },

  // Оплатить заказ (имитация)
  payOrder: async (orderId, paymentData) => {
    try {
      const response = await api.post(`/orders/${orderId}/pay`, paymentData);
      return response.data;
    } catch (error) {
      console.error(`Error paying for order ${orderId}:`, error);
      throw error;
    }
  },

  // Получить все заказы (только для админа)
  getAllOrders: async (params = {}) => {
    try {
      const response = await api.get('/admin/orders', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching all orders:', error);
      throw error;
    }
  },

  // Обновить статус заказа (только для админа)
  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await api.put(`/admin/orders/${orderId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error(`Error updating status for order ${orderId}:`, error);
      throw error;
    }
  },

  // Получить статистику по заказам (только для админа)
  getOrderStats: async (period = 'month') => {
    try {
      const response = await api.get(`/admin/orders/stats?period=${period}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching order statistics for period ${period}:`, error);
      throw error;
    }
  },

  // Получить доступные методы доставки
  getDeliveryMethods: async () => {
    try {
      const response = await api.get('/orders/delivery-methods');
      return response.data;
    } catch (error) {
      console.error('Error fetching delivery methods:', error);
      throw error;
    }
  },

  // Получить доступные методы оплаты
  getPaymentMethods: async () => {
    try {
      const response = await api.get('/orders/payment-methods');
      return response.data;
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      throw error;
    }
  },

  // Рассчитать стоимость доставки
  calculateShipping: async (address, items) => {
    try {
      const response = await api.post('/orders/calculate-shipping', { address, items });
      return response.data;
    } catch (error) {
      console.error('Error calculating shipping cost:', error);
      throw error;
    }
  }
};

export default orderService; 