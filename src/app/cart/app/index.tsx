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

  const { storage, setStorage } = useContext(CartContext);

  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const totalCentavos = storage
    .map(v => Math.round(Number(v.unit_amount) * 100))
    .reduce((acc, val) => acc + val, 0);

  const sumPrices = totalCentavos / 100;

  const { control, handleSubmit, watch } = useForm<schemaProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      price: sumPrices,
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

  async function prev(n: number) {
    return setCurrentStep(n);
  };

  return (
    <Suspense fallback={<Splash />}>
      <Container>
        <Shopping.SavedProducts storage={storage} setStorage={setStorage} />

        <Shopping.Form currentStep={currentStep} onSubmit={handleSubmit(processForm)} loadingButton={loading}>
          <Shopping.Header currentStep={currentStep} method={method!} steps={steps} setStep={prev} />

          {currentStep === 0 &&
            <Shopping.FirstStage storage={storage} control={control} methodsPayments={methodsPayments} sumPrices={sumPrices} />
          }

          {/* {currentStep === 1 &&
            <Shopping.SecondStage control={control} />
          } */}

        </Shopping.Form>
      </Container>
    </Suspense>
  )
}

// https://checkout.stripe.com/c/pay/cs_test_a1XRAGiWLW4t7MRQ3ZnDnbX8YSyPJOAJ7pQnM1zXIDQ6fWGoMggiGUXp6V#fidkdWxOYHwnPyd1blpxYHZxWjA0V0k2V2lVcVxyZ0YwRHBxQEB8dlBGXGg2a1dxdWY3NHVKTFJ%2FYFNORk1rQmlsT0E3RzxmV0hxcGtwTk5CPHFcdWtXb2dSa0RxYEBDUU5DM3VVdnA0fHJRNTVBQFVIQ1NBdScpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl