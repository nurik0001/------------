import api from './api';

const cartService = {
  // Получить корзину текущего пользователя
  getCart: async () => {
    try {
      const response = await api.get('/cart');
      return response.data;
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  },

  // Добавить товар в корзину
  addToCart: async (productId, quantity = 1) => {
    try {
      const response = await api.post('/cart/items', { productId, quantity });
      return response.data;
    } catch (error) {
      console.error(`Error adding product ${productId} to cart:`, error);
      throw error;
    }
  },

  // Обновить количество товара в корзине
  updateCartItem: async (itemId, quantity) => {
    try {
      const response = await api.put(`/cart/items/${itemId}`, { quantity });
      return response.data;
    } catch (error) {
      console.error(`Error updating cart item ${itemId}:`, error);
      throw error;
    }
  },

  // Удалить товар из корзины
  removeFromCart: async (itemId) => {
    try {
      const response = await api.delete(`/cart/items/${itemId}`);
      return response.data;
    } catch (error) {
      console.error(`Error removing item ${itemId} from cart:`, error);
      throw error;
    }
  },

  // Очистить корзину
  clearCart: async () => {
    try {
      const response = await api.delete('/cart');
      return response.data;
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  },

  // Локальное управление корзиной (для неавторизованных пользователей)
  local: {
    // Получить корзину из localStorage
    getCart: () => {
      const cart = localStorage.getItem('cart');
      return cart ? JSON.parse(cart) : { items: [], totalPrice: 0 };
    },

    // Сохранить корзину в localStorage
    saveCart: (cart) => {
      localStorage.setItem('cart', JSON.stringify(cart));
    },

    // Добавить товар в локальную корзину
    addToCart: (product, quantity = 1) => {
      const cart = cartService.local.getCart();
      const existingItem = cart.items.find(item => item.productId === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity
        });
      }

      // Пересчитываем общую стоимость
      cart.totalPrice = cart.items.reduce(
        (total, item) => total + item.price * item.quantity, 
        0
      );

      cartService.local.saveCart(cart);
      return cart;
    },

    // Обновить количество товара в локальной корзине
    updateCartItem: (productId, quantity) => {
      const cart = cartService.local.getCart();
      const item = cart.items.find(item => item.productId === productId);

      if (item) {
        item.quantity = quantity;
        
        // Пересчитываем общую стоимость
        cart.totalPrice = cart.items.reduce(
          (total, item) => total + item.price * item.quantity, 
          0
        );

        cartService.local.saveCart(cart);
      }

      return cart;
    },

    // Удалить товар из локальной корзины
    removeFromCart: (productId) => {
      const cart = cartService.local.getCart();
      cart.items = cart.items.filter(item => item.productId !== productId);
      
      // Пересчитываем общую стоимость
      cart.totalPrice = cart.items.reduce(
        (total, item) => total + item.price * item.quantity, 
        0
      );

      cartService.local.saveCart(cart);
      return cart;
    },

    // Очистить локальную корзину
    clearCart: () => {
      const emptyCart = { items: [], totalPrice: 0 };
      cartService.local.saveCart(emptyCart);
      return emptyCart;
    },

    // Синхронизировать локальную корзину с серверной (при авторизации)
    syncWithServer: async () => {
      try {
        const localCart = cartService.local.getCart();
        
        if (localCart.items.length > 0) {
          // Для каждого товара в локальной корзине делаем запрос на сервер
          for (const item of localCart.items) {
            await cartService.addToCart(item.productId, item.quantity);
          }
          
          // Очищаем локальную корзину после синхронизации
          cartService.local.clearCart();
        }
        
        // Получаем актуальную корзину с сервера
        return await cartService.getCart();
      } catch (error) {
        console.error('Error syncing cart with server:', error);
        throw error;
      }
    }
  }
};

export default cartService; 