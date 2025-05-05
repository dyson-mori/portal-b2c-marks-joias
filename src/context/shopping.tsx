'use client';

import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { ProductProps } from '@global/interfaces';

interface CartProps {
  storage: ProductProps[];
  setStorage: (product: ProductProps) => void;
}

export const CartContext = createContext({} as CartProps);

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ProductProps[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Garante que o código só rode no cliente
  useEffect(() => {
    setIsClient(true);
    const storedCart = localStorage.getItem('@marks:cart');
    if (storedCart) {
      try {
        setState(JSON.parse(storedCart));
      } catch (error) {
        console.error('Erro ao ler o carrinho do localStorage:', error);
      }
    }
  }, []);

  const setStorage = (product: ProductProps) => {
    const productExists = state.find((item) => item.id === product.id);

    let updatedCart;
    if (productExists) {
      // Remove produto se já existe
      updatedCart = state.filter((item) => item.id !== product.id);
    } else {
      // Adiciona produto
      updatedCart = [...state, product];
    }

    setState(updatedCart);
    localStorage.setItem('@marks:cart', JSON.stringify(updatedCart));
  };

  const value = {
    storage: state,
    setStorage,
  };

  if (!isClient) return null; // ou um <Loading /> para evitar problemas de renderização SSR

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
