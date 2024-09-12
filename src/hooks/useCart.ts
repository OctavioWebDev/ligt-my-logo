import { useState, useEffect } from 'react';

export const useCart = <T>() => {
  const [cart, setCart] = useState<T[]>([]);

  const removeFromCart = (itemToRemove: T) => {
    setCart(cart.filter(item => item !== itemToRemove));
  };

  const addToCart = (item: T) => {
    setCart([...cart, item]);
  };

  return { cart, removeFromCart, addToCart };
};

