"use client"

import React, { Suspense, useContext, useState } from 'react';

import { useRouter } from 'next/navigation';

import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { CartContext } from '@context/shopping';

import { api } from '@services/api';
import { Shopping, Splash } from '@components';

import { schema, schemaProps, steps, methodsPayments } from './schema';
import { Container } from './styles';

export default function ShoppingCard() {
  const route = useRouter();

  const { storage, setRemoveStorage, setEditStorage } = useContext(CartContext);

  const [loading, setLoading] = useState(false);

  const totalCentavos = storage
    .map(v => Math.round(Number(v.price) * 100))
    .reduce((acc, val) => acc + val, 0);

  const sumPrices = totalCentavos / 100;

  const { control, handleSubmit, watch } = useForm<schemaProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      price: sumPrices,
      quantity: 1
    }
  });

  const { method } = watch();

  const processForm: SubmitHandler<schemaProps> = async data => {
    setLoading(true);

    if (data.method === "clyp6mut5000ay4iw0rcg2vve") {
      const result = await api.gateway.create({ ...data, products: storage });

      if (result) {
        route.push(result);
      };
    };
  };

  return (
    <Suspense fallback={<Splash />}>
      <Container>
        <Shopping.SavedProducts storage={storage} setEditStorage={setEditStorage} setRemoveStorage={setRemoveStorage} />

        <Shopping.Form disabled={storage.length === 0} currentStep={0} onSubmit={handleSubmit(processForm)} loadingButton={loading}>
          <Shopping.Header currentStep={0} method={method!} steps={steps} />
          <Shopping.FirstStage storage={storage} control={control} methodsPayments={methodsPayments} sumPrices={sumPrices} />
        </Shopping.Form>
      </Container>
    </Suspense>
  )
}