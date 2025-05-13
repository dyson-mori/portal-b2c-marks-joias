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
    console.log(product);

    const productExists = state.find((item) => item.code === product.code);

    let updatedCart: StorageProps[];

    if (productExists) {
      // Remove produto se já existe
      updatedCart = state.filter((item) => item.code !== product.code);
    } else {
      // Adiciona produto
      updatedCart = [...state, {
        code: product.code,
        title: product.title,
        price: product.price,
        thumbnail: product.files[0],
        price_id: product.defaultPriceId as string,
        quantity: 1,
        unit_amount: product.price,
        maxQuantity: 10,
        description: product.description,
      }];
    }

    setState(updatedCart);
    localStorage.setItem('@marks:cart', JSON.stringify(updatedCart));
  };

  const setEditStorage = (updatedProduct: StorageProps) => {
    const updated = state.map((product) =>
      product.code === updatedProduct.code ? updatedProduct : product
    );
    setState(updated);
    localStorage.setItem('@marks:cart', JSON.stringify(updated));
  };

  const setRemoveStorage = (removeProduct: StorageProps) => {
    const updated = state.filter((product) => product.code !== removeProduct.code);
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
