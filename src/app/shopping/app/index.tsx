"use client"

import React, { Suspense, useContext, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { initMercadoPago } from '@mercadopago/sdk-react';

import { ShoppingContext } from '@context/shopping';

import { api } from '@services/api';
import { formats } from '@helpers/format';
import { Input, Shopping, Splash } from '@components';
import { Inbox, Routing, User, Home, Mobile } from '@assets';

import { schema, schemaProps, steps } from './schema';
import { Container, Content } from './styles';

export default function ShoppingCard() {
  const route = useRouter();

  const { storage, setRemoveStorage, setEditStorage } = useContext(ShoppingContext);

  const [loading, setLoading] = useState(false);

  const totalCentavos = storage
    .map(v => Math.round(v.price * 100))
    .reduce((acc, val) => acc + val, 0);

  const sumPrices = totalCentavos / 100;

  const { control, handleSubmit, watch, formState: { isValid }, } = useForm<schemaProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      price: sumPrices,
      quantity: 1,
      method: 'cartão',
    },
    mode: 'onChange'
  });

  const { method } = watch();

  const processForm: SubmitHandler<schemaProps> = async data => {
    setLoading(true);

    const result = await api.paid_market.create({
      email: data.email,
      full_name: data.full_name,
      cep: data.cep,
      description: data.description,
      phone: data.phone,
      client_id: `client-id-${Math.floor(Math.random() * 5)}`,
      external_reference_id: `pedido-${Math.floor(Math.random() * 10)}`,
      products: storage
    });

    return route.push(result.initPoint);
  };

  // const Icons = ({ id }: { id: string }) => {
  //   if (id === 'clyp6mut5000ay4iw0rcg2vve')
  //     return <Cards width={25} height={25} strokeWidth={1.5} stroke="#dedede" />

  //   return <Pix width={25} height={25} fill="#dedede" />;
  // };

  useEffect(() => {
    initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY!);
  }, []);

  return (
    <Suspense fallback={<Splash />}>
      <Container>
        <Shopping.SavedProducts storage={storage} setEditStorage={setEditStorage} setRemoveStorage={setRemoveStorage} />

        <Shopping.Form disabled={storage.length === 0 || !isValid} currentStep={0} onSubmit={handleSubmit(processForm)} loadingButton={loading}>
          <Shopping.Header currentStep={0} method={method!} steps={steps} />

          <Content>

            <Controller
              name='full_name'
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <Input.Root>
                    <div className='svg-container'>
                      <User width={22} height={22} stroke='#FA0B5B' strokeWidth={2} />
                    </div>
                    <Input.Input value={value} name='name' placeholder='Nome Completo' onChange={onChange} />
                  </Input.Root>
                )
              }}
            />

            <div className='space' />

            <Controller
              name='email'
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input.Root>
                  <div className='svg-container'>
                    <Inbox width={20} height={20} stroke='#FA0B5B' strokeWidth={1.8} />
                  </div>
                  <Input.Input value={value} name='email' type='email' placeholder='Email' onChange={onChange} />
                </Input.Root>
              )}
            />

            <div className='space' />

            <Controller
              name='cep'
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <Input.Root>
                    <div className='svg-container'>
                      <Routing width={20} height={20} stroke='#FA0B5B' strokeWidth={1.8} />
                    </div>
                    <Input.Input value={formats.cep(value)} name='cep' type='text' placeholder='CEP' onChange={onChange} />
                  </Input.Root>
                )
              }}
            />

            <div className='space' />

            <Controller
              name='description'
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input.Root>
                  <div className='svg-container'>
                    <Home width={20} height={20} stroke='#FA0B5B' strokeWidth={1.5} />
                  </div>
                  <Input.Input value={value} placeholder='Descrição e Numero da Residência' onChange={onChange} />
                </Input.Root>
              )}
            />
            <div className='space' />

            <Controller
              name='phone'
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <Input.Root>
                    <div className='svg-container'>
                      <Mobile width={20} height={20} stroke='#FA0B5B' strokeWidth={1.5} />
                    </div>
                    <Input.Input value={formats.phoneNumber(value)} placeholder='Telefone' onChange={onChange} />
                  </Input.Root>
                )
              }}
            />

            {/* <div className='space' />

            <Controller
              name='cpf'
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <Input.Root>
                    <div className='svg-container'>
                      <Identity width={22} height={22} stroke='#FA0B5B' strokeWidth={1.5} />
                    </div>
                    <Input.Input value={formats.cpf(value)} name='cpf' type='text' placeholder='CPF' onChange={onChange} />
                  </Input.Root>
                )
              }}
            /> */}

            {/* <MethodPayment>
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
            </Result> */}


          </Content>

        </Shopping.Form>
      </Container>
    </Suspense>
  )
}