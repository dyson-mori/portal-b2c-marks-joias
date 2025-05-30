"use client"

import React, { Suspense, useState } from 'react';
import Image from 'next/image';

import { Product as PrismaProduct } from '@prisma/client';

import { DotLottiePlayer } from '@dotlottie/react-player';

import { CategoryProps } from '@global/interfaces';
import { Button, Product, Splash } from '@components';
import { useWindowDimensions } from '@hooks';

import { Container, SectionProducts, ProductEmpty, Banner, Categories } from './styles';
// import { useRouter, useSearchParams } from 'next/navigation';

type MaybeArray<T> = T | T[];

type Props = {
  products: PrismaProduct[];
  categories: MaybeArray<CategoryProps>;
};

export default function Products({ products, categories }: Props) {
  // const route = useRouter();
  // const searchParams = useSearchParams();

  const { width, height } = useWindowDimensions();

  const [label] = useState('');
  const [select, setSelect] = useState({ category: '', sub: '' });
  const [sub, setSub] = useState<string[]>([]);

  const lottie_styles = {
    display: 'flex',
    maxWidth: "300px"
  };

  function onSelect(type: 'category' | 'sub', value: string, el: string[]) {
    if (type === 'category') {
      setSub(el);
      return setSelect({ category: value, sub: '' });
    };

    return setSelect(prev => ({ ...prev, sub: value }));
  };

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
                $variant={select.category === category.title ? 'selected' : 'select'}
                onClick={() => onSelect('category', category.title, category.sub)}
              >
                {category.title}
              </Button>
            ))}
          </Categories>
        )}

        {sub.length !== 0 && (
          <Categories>
            {sub.map(title => (
              <Button
                key={title}
                $variant={select.sub === title ? 'selected' : 'select'}
                onClick={() => onSelect('sub', title, [])}
              >
                {title}
              </Button>
            ))}
          </Categories>
        )}

        {products.filter(e => e.title.toLowerCase().includes(label.toLowerCase())).length === 0 && (
          <ProductEmpty>
            <DotLottiePlayer style={lottie_styles} src="/lottie/marks-empty-card.lottie" autoplay />
            <p>Product Not Found</p>
          </ProductEmpty>
        )}

        {
          products.filter(e => e.title.toLowerCase().includes(label.toLowerCase())).length !== 0 && (
            <SectionProducts>
              {
                products.filter(pro => pro.title.toLowerCase().includes(label.toLowerCase())
                  // products.filter(pro =>
                  //   label.length > 0
                  //     ? pro.name.toLowerCase().includes(label.toLowerCase())
                  //     : selects.every(eve => pro.categories.some(cat => cat.id === eve.id))
                )
                  .map((item, index) =>
                    <Product key={index.toString()} product={item} href={`/product?product_id=${item.id}`} />
                  )}
            </SectionProducts>
          )}
      </Container>
    </Suspense>
  )
};