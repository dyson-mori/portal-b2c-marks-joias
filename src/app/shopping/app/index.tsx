"use client"

import React, { Suspense, useContext, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { initMercadoPago } from '@mercadopago/sdk-react';

import { ShoppingContext } from '@context/shopping';

import { api } from '@services/api';
import { Cards, Pix } from '@assets';
import { formats } from '@helpers/format';
import { Shopping, Splash } from '@components';

import { schema, schemaProps, steps, methodsPayments } from './schema';
import { Container, Content, MethodPayment, Methods, Result } from './styles';

export default function ShoppingCard() {
  const route = useRouter();

  const { storage, setRemoveStorage, setEditStorage } = useContext(ShoppingContext);

  const [loading, setLoading] = useState(false);

  const totalCentavos = storage
    .map(v => Math.round(v.price * 100))
    .reduce((acc, val) => acc + val, 0);

  const sumPrices = totalCentavos / 100;

  const { control, handleSubmit, watch, setValue } = useForm<schemaProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      price: sumPrices,
      quantity: 1,
      method: null
    }
  });

  const { method } = watch();

  const processForm: SubmitHandler<schemaProps> = async data => {
    setLoading(true);

    const result = await api.paid_market.create({
      testeId: "123",
      userEmail: "ssergiojunioleal@gmail.com",
    });

    return route.push(result.initPoint);
  };

  const Icons = ({ id }: { id: string }) => {
    if (id === 'clyp6mut5000ay4iw0rcg2vve')
      return <Cards width={25} height={25} strokeWidth={1.5} stroke="#dedede" />

    return <Pix width={25} height={25} fill="#dedede" />;
  };

  useEffect(() => {
    initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY!);
  }, []);

  return (
    <Suspense fallback={<Splash />}>
      <Container>
        <Shopping.SavedProducts storage={storage} setEditStorage={setEditStorage} setRemoveStorage={setRemoveStorage} />

        <Shopping.Form disabled={storage.length === 0 || !method} currentStep={0} onSubmit={handleSubmit(processForm)} loadingButton={loading}>
          <Shopping.Header currentStep={0} method={method!} steps={steps} />

          <Content>
            <MethodPayment>
              {methodsPayments.map((meth, i) => (
                <Controller
                  key={i}
                  name='method'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Methods
                      key={i}
                      type='button'
                      disabled={storage?.length === 0}
                      onClick={() => {
                        onChange(meth.id);
                        setValue('method', meth.id)
                      }}
                      $selected={meth.id === value}
                    >
                      <Icons id={meth.id} />
                      <p>{meth.title}</p>
                    </Methods>
                  )}
                />
              ))}
            </MethodPayment>

            <Shopping.Checkouts storage={storage} />

            <Result>
              <p>Total a Pagar</p>
              <p id='price'>{formats.money(sumPrices)}</p>
            </Result>
          </Content>

        </Shopping.Form>
      </Container>
    </Suspense>
  )
}