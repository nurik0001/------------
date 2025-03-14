import { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';
import cartService from '../services/cartService';

// Создаем контекст
const CartContext = createContext();

// Хук для использования контекста корзины
export const useCart = () => {
  return useContext(CartContext);
};

// Провайдер контекста корзины
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser, isAuthenticated } = useAuth();

  // Инициализация корзины
  useEffect(() => {
    const initCart = async () => {
      setLoading(true);
      try {
        if (isAuthenticated()) {
          // Если пользователь авторизован, получаем корзину с сервера
          const serverCart = await cartService.getCart();
          setCart(serverCart);
        } else {
          // Если пользователь не авторизован, используем локальную корзину
          const localCart = cartService.local.getCart();
          setCart(localCart);
        }
      } catch (err) {
        console.error('Error initializing cart:', err);
        setError('Не удалось загрузить корзину');
      } finally {
        setLoading(false);
      }
    };

    initCart();
  }, [currentUser, isAuthenticated]);

  // Добавление товара в корзину
  const addToCart = async (product, quantity = 1) => {
    setLoading(true);
    setError(null);
    try {
      if (isAuthenticated()) {
        // Если пользователь авторизован, добавляем товар на сервер
        const updatedCart = await cartService.addToCart(product.id, quantity);
        setCart(updatedCart);
      } else {
        // Если пользователь не авторизован, добавляем товар в локальную корзину
        const updatedCart = cartService.local.addToCart(product, quantity);
        setCart(updatedCart);
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
      setError('Не удалось добавить товар в корзину');
    } finally {
      setLoading(false);
    }
  };

  // Обновление количества товара в корзине
  const updateCartItem = async (itemId, quantity) => {
    setLoading(true);
    setError(null);
    try {
      if (isAuthenticated()) {
        // Если пользователь авторизован, обновляем товар на сервере
        const updatedCart = await cartService.updateCartItem(itemId, quantity);
        setCart(updatedCart);
      } else {
        // Если пользователь не авторизован, обновляем товар в локальной корзине
        const updatedCart = cartService.local.updateCartItem(itemId, quantity);
        setCart(updatedCart);
      }
    } catch (err) {
      console.error('Error updating cart item:', err);
      setError('Не удалось обновить товар в корзине');
    } finally {
      setLoading(false);
    }
  };

  // Удаление товара из корзины
  const removeFromCart = async (itemId) => {
    setLoading(true);
    setError(null);
    try {
      if (isAuthenticated()) {
        // Если пользователь авторизован, удаляем товар на сервере
        const updatedCart = await cartService.removeFromCart(itemId);
        setCart(updatedCart);
      } else {
        // Если пользователь не авторизован, удаляем товар из локальной корзины
        const updatedCart = cartService.local.removeFromCart(itemId);
        setCart(updatedCart);
      }
    } catch (err) {
      console.error('Error removing from cart:', err);
      setError('Не удалось удалить товар из корзины');
    } finally {
      setLoading(false);
    }
  };

  // Очистка корзины
  const clearCart = async () => {
    setLoading(true);
    setError(null);
    try {
      if (isAuthenticated()) {
        // Если пользователь авторизован, очищаем корзину на сервере
        const updatedCart = await cartService.clearCart();
        setCart(updatedCart);
      } else {
        // Если пользователь не авторизован, очищаем локальную корзину
        const updatedCart = cartService.local.clearCart();
        setCart(updatedCart);
      }
    } catch (err) {
      console.error('Error clearing cart:', err);
      setError('Не удалось очистить корзину');
    } finally {
      setLoading(false);
    }
  };

  // Значение контекста
  const value = {
    cart,
    loading,
    error,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    itemCount: cart.items.reduce((total, item) => total + item.quantity, 0)
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext; 