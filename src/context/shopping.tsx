'use client';

import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { ProductProps, StorageProps } from '@global/interfaces';

interface CartProps {
  storage: StorageProps[];
  setStorage: (product: ProductProps) => void;
  setEditStorage: (product: StorageProps) => void;
  setRemoveStorage: (product: StorageProps) => void;
}

export const ShoppingContext = createContext({} as CartProps);

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<StorageProps[]>([]);
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

    let updatedCart: StorageProps[];

    if (productExists) {
      // Remove produto se já existe
      updatedCart = state.filter((item) => item.id !== product.id);
    } else {
      // Adiciona produto
      updatedCart = [...state, {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        price_id: product.defaultPriceId as string,
        quantity: 1,
        unit_amount: product.unit_amount,
        maxQuantity: product.maxQuantity,
      }];
    }

    setState(updatedCart);
    localStorage.setItem('@marks:cart', JSON.stringify(updatedCart));
  };

  const setEditStorage = (updatedProduct: StorageProps) => {
    const updated = state.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setState(updated);
    localStorage.setItem('@marks:cart', JSON.stringify(updated));
  };

  const setRemoveStorage = (removeProduct: StorageProps) => {
    const updated = state.filter((product) => product.id !== removeProduct.id);
    setState(updated);
    localStorage.setItem('@marks:cart', JSON.stringify(updated));
  };

  const value = {
    storage: state,
    setStorage,
    setEditStorage,
    setRemoveStorage
  };

  if (!isClient) return null; // ou um <Loading /> para evitar problemas de renderização SSR

  return (
    <ShoppingContext.Provider value={value}>
      {children}
    </ShoppingContext.Provider>
  );
};

export default CartProvider;
