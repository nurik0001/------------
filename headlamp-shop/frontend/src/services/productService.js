import api from './api';

const productService = {
  // Получить все продукты с возможностью фильтрации и пагинации
  getProducts: async (params = {}) => {
    try {
      const response = await api.get('/products', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Получить продукт по ID
  getProductById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product with id ${id}:`, error);
      throw error;
    }
  },

  // Получить продукты по категории
  getProductsByCategory: async (category, params = {}) => {
    try {
      const response = await api.get(`/products/category/${category}`, { params });
      return response.data;
    } catch (error) {
      console.error(`Error fetching products in category ${category}:`, error);
      throw error;
    }
  },

  // Поиск продуктов
  searchProducts: async (query, params = {}) => {
    try {
      const response = await api.get('/products/search', { 
        params: { query, ...params } 
      });
      return response.data;
    } catch (error) {
      console.error(`Error searching products with query "${query}":`, error);
      throw error;
    }
  },

  // Создать новый продукт (только для админа)
  createProduct: async (productData) => {
    try {
      const response = await api.post('/products', productData);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  // Обновить продукт (только для админа)
  updateProduct: async (id, productData) => {
    try {
      const response = await api.put(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error(`Error updating product with id ${id}:`, error);
      throw error;
    }
  },

  // Удалить продукт (только для админа)
  deleteProduct: async (id) => {
    try {
      const response = await api.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting product with id ${id}:`, error);
      throw error;
    }
  },

  // Получить все категории
  getCategories: async () => {
    try {
      const response = await api.get('/products/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
};

export default productService; 