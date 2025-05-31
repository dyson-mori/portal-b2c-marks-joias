"use client"

import React, { startTransition, Suspense, useState } from 'react';
import Image from 'next/image';

import { Product as PrismaProduct } from '@prisma/client';

import { DotLottiePlayer } from '@dotlottie/react-player';

import { CategoryProps } from '@global/interfaces';
import { Button, Product, Splash } from '@components';
import { useWindowDimensions } from '@hooks';

import { Container, SectionProducts, ProductEmpty, Banner, Categories, LoadingProducts } from './styles';
import { api } from '@services/api';

type MaybeArray<T> = T | T[];

type Props = {
  products: PrismaProduct[];
  categories: MaybeArray<CategoryProps>;
};

function addUrlParam(key: 'title' | 'sub', value: string) {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.pushState({}, '', url);
};

function removeUrlParam(key: string) {
  const url = new URL(window.location.href);
  url.searchParams.delete(key);
  window.history.pushState({}, '', url);
}

export default function Products({ products, categories }: Props) {
  const { width, height } = useWindowDimensions();

  const url = new URL(window.location.href);
  const category_title = url.searchParams.get('title');
  // const sub_category_title = url.searchParams.get('sub');

  const [label] = useState('');
  const [productsData, setProducts] = useState(products);
  const [loading, setLoading] = useState(false);
  // const [sub, setSub] = useState<string[]>([]);

  const lottie_styles = {
    display: 'flex',
    maxWidth: "300px"
  };

  function handleFilterUpdate(newTitle: string, newSub?: string) {
    setLoading(true);

    if (category_title === newTitle) {
      removeUrlParam('title')
      return startTransition(async () => {
        const data = await api.products.list('/products');
        setProducts(data);
        setLoading(false);
      });
    };

    startTransition(async () => {
      const params = new URLSearchParams();
      if (newTitle) params.set('title', newTitle);
      if (newSub) params.set('sub', newSub);

      if (category_title === newTitle) {
        removeUrlParam(newTitle)
      } else {
        addUrlParam('title', newTitle);
      }

      const url = category_title === newTitle ? '/products' : `/products?${params.toString()}`;

      const data = await api.products.list(url);
      setProducts(data);
      setLoading(false);
    });
  }

  return (
    <Suspense fallback={<Splash />}>
      <Container>

        <Banner>
          <Image src="https://res.cloudinary.com/doo9pfft1/image/upload/v1747150929/IMG_7085_etrci0.jpg" width={width} height={height / 2} alt='banner' />
        </Banner>

        {Array.isArray(categories) && (
          <Categories>
            {categories.map(category => (
              <Button
                key={category.title}
                $variant={category_title === category.title ? 'selected' : 'select'}
                onClick={() => handleFilterUpdate(category.title)}
              >
                {category.title}
              </Button>
            ))}
          </Categories>
        )}

        {/* {sub.length !== 0 && (
          <Categories>
            <Button
              $variant={sub_category_title === 'all' ? 'selected' : 'select'}
              onClick={() => onSelect('sub', 'all', [])}
            >
              Todos
            </Button>
            {sub.map(title => (
              <Button
                key={title}
                $variant={sub_category_title === title ? 'selected' : 'select'}
                onClick={() => onSelect('sub', title, [])}
              >
                {title}
              </Button>
            ))}
          </Categories>
        )} */}

        {productsData.filter(e => e.title.toLowerCase().includes(label.toLowerCase())).length === 0 && (
          <ProductEmpty>
            <DotLottiePlayer style={lottie_styles} src="/lottie/marks-empty-card.lottie" autoplay />
            <p>Product Not Found</p>
          </ProductEmpty>
        )}

        {
          productsData.filter(e => e.title.toLowerCase().includes(label.toLowerCase())).length !== 0 && (
            <SectionProducts $isLoading={loading}>
              {
                loading && (
                  <LoadingProducts>
                    <DotLottiePlayer style={lottie_styles} src="/lottie/marks-loading.lottie" autoplay loop />
                  </LoadingProducts>
                )
              }
              {
                productsData
                  .filter(pro => pro.title.toLowerCase().includes(label.toLowerCase()))
                  .map((item, index) =>
                    <Product key={index.toString()} product={item} href={`/product?product_id=${item.id}`} />
                  )}
            </SectionProducts>
          )}
      </Container>
    </Suspense>
  )
};