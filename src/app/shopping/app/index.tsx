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
import { Inbox, Routing, User, Home, Mobile, Cards, Pix } from '@assets';

import { methodsPayments, schema, schemaProps } from './schema';
import { Container, Content, MethodPayment, Methods, Result } from './styles';

export default function ShoppingCard() {
  const route = useRouter();

  const { storage, setRemoveStorage, setEditStorage } = useContext(ShoppingContext);

  const [loading, setLoading] = useState(false);

  const totalCentavos = storage
    .map(v => Math.round(v.price * 100))
    .reduce((acc, val) => acc + val, 0);

  const sumPrices = totalCentavos / 100;

  const { control, handleSubmit, watch, setValue, formState: { isValid }, } = useForm<schemaProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      price: sumPrices,
      quantity: 1,
      method: 'cartão',
    },
    mode: 'onChange'
  });

  const { cep } = watch();

  const processForm: SubmitHandler<schemaProps> = async data => {
    setLoading(true);

    const result = await api.paid_market.create({
      email: data.email,
      full_name: data.full_name,
      cep: data.cep,
      description: data.description,
      phone: data.phone,
      client_id: `client-id-${Math.floor(Math.random() * 50)}`,
      external_reference_id: `pedido-${Math.floor(Math.random() * 10)}`,
      products: storage
    });

    return route.push(result.initPoint);
  };

  const Icons = ({ id }: { id: string }) => {
    if (id === 'clyp6mut5000ay4iw0rcg2vve')
      return <Cards width={25} height={25} strokeWidth={1.5} stroke="#dedede" />

    return <Pix width={25} height={25} fill="#dedede" />;
  };

  useEffect(() => {
    if (cep?.length === 8) {
      api.correio.get(cep)
        .then((res) => {
          const { logradouro, localidade, uf } = res;
          setValue("street", logradouro);
          setValue("city", localidade);
          setValue("state", uf);
        });
    }
  }, [cep]);

  useEffect(() => {
    initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY!);
  }, []);

  return (
    <Suspense fallback={<Splash />}>
      <Container>
        <Shopping.SavedProducts storage={storage} setEditStorage={setEditStorage} setRemoveStorage={setRemoveStorage} />

        <Shopping.Form disabled={storage.length === 0 || !isValid} currentStep={0} onSubmit={handleSubmit(processForm)} loadingButton={loading}>
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
                    {/* <p>{meth.title}</p> */}
                  </Methods>
                )}
              />
            ))}
          </MethodPayment>

          <h4 style={{ margin: '5px 0' }}>Informação do pagamento</h4>

          <Content>
            <h5>Email</h5>
            <Controller
              name='email'
              control={control}
              render={({ field: { onChange } }) => (
                <Input.Root variant="checkout" border='0 9px 9px 9px'>
                  <div className='svg-container'>
                    <Inbox width={20} height={20} stroke='#FA0B5B' strokeWidth={1.8} />
                  </div>
                  <Input.Input name='email' type='email' placeholder='email@exemplo.com' onChange={onChange} />
                </Input.Root>
              )}
            />

            <div className='space' />

            <h5>Infirmações Básicas</h5>
            <Controller
              name='full_name'
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <Input.Root variant="checkout" border='0 9px 0 0'>
                    <div className='svg-container'>
                      <User width={22} height={22} stroke='#FA0B5B' strokeWidth={2} />
                    </div>
                    <Input.Input value={value} name='name' placeholder='Nome Completo' onChange={onChange} />
                  </Input.Root>
                )
              }}
            />

            <div style={{ height: 2 }} />
            <Controller
              name='phone'
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <Input.Root variant="checkout" border='0 0 9px 9px'>
                    <div className='svg-container'>
                      <Mobile width={20} height={20} stroke='#FA0B5B' strokeWidth={1.5} />
                    </div>
                    <Input.Input value={formats.phoneNumber(value)} placeholder='Telefone' onChange={onChange} />
                  </Input.Root>
                )
              }}
            />

            <div className='space' />
            <h5>Endereço</h5>
            <Controller
              name='cep'
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <Input.Root variant="checkout" border='0 9px 0 0'>
                    <div className='svg-container'>
                      <Routing width={20} height={20} stroke='#FA0B5B' strokeWidth={1.8} />
                    </div>
                    <Input.Input value={formats.cep(value)} name='cep' type='text' placeholder='CEP' onChange={onChange} />
                  </Input.Root>
                )
              }}
            />

            <div style={{ height: 2 }} />
            <Controller
              name='street'
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <Input.Root variant="checkout" border='0 0 0 0'>
                    <div className='svg-container'>
                      <Mobile width={20} height={20} stroke='#FA0B5B' strokeWidth={1.5} />
                    </div>
                    <Input.Input value={value} placeholder='Rua' onChange={onChange} />
                  </Input.Root>
                )
              }}
            />

            <div style={{ height: 2 }} />
            <Controller
              name='city'
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <Input.Root variant="checkout" border='0 0 0 0'>
                    <div className='svg-container'>
                      <Mobile width={20} height={20} stroke='#FA0B5B' strokeWidth={1.5} />
                    </div>
                    <Input.Input value={value} placeholder='Cidade' onChange={onChange} />
                  </Input.Root>
                )
              }}
            />

            <div style={{ height: 2 }} />
            <Controller
              name='state'
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <Input.Root variant="checkout" border='0 0 0 0'>
                    <div className='svg-container'>
                      <Mobile width={20} height={20} stroke='#FA0B5B' strokeWidth={1.5} />
                    </div>
                    <Input.Input value={value} placeholder='Estado' onChange={onChange} />
                  </Input.Root>
                )
              }}
            />

            <div style={{ height: 2 }} />
            <Controller
              name='description'
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input.Root variant="checkout" border='0 0 9px 9px'>
                  <div className='svg-container'>
                    <Home width={20} height={20} stroke='#FA0B5B' strokeWidth={1.5} />
                  </div>
                  <Input.Input value={value} placeholder='Descrição e Numero da Residência' onChange={onChange} />
                </Input.Root>
              )}
            />

            <div style={{ height: 10 }} />

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