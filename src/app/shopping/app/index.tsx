"use client"

import React, { Suspense, useContext, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { initMercadoPago } from '@mercadopago/sdk-react';

import { ShoppingContext } from '@context/shopping';

import { api } from '@services/api';
import { formats } from '@helpers/format';
import { CheckBox, Input, Shopping, Splash } from '@components';
import { Inbox, Routing, User, Home, Mobile, Pen, Identity, Pix, Cards } from '@assets';

import {
  schema,
  schemaProps,
  ZipCodeProps
} from './schema';

import {
  Container,
  Content,
  MethodPayment,
  Result,
} from './styles';

export default function ShoppingCard() {
  const route = useRouter();

  const { storage, setRemoveStorage, setEditStorage } = useContext(ShoppingContext);

  const [loading, setLoading] = useState(false);
  const [loadingZipCode, setLoadingZipCode] = useState(false);
  const [isZipCodeValid, setIsZipCodeValid] = useState(false);

  const totalCentavos = storage
    .reduce((soma, item) => {
      const quantity = parseFloat(String(item.remove_quantity));
      const price = parseFloat(String(item.unit_amount));
      return soma + (quantity * price);
    }, 0);

  const sumPrices = totalCentavos / 100;

  const { control, handleSubmit, watch, setValue, formState: { isValid }, } = useForm<schemaProps>({
    resolver: yupResolver(schema),
    defaultValues: {
      price: sumPrices,
    },
    mode: 'onChange'
  });

  const { pick_up_in_store } = watch();

  const processForm: SubmitHandler<schemaProps> = async data => {
    setLoading(true);

    const result = await api.paid_market.create({
      method_payment: data.method_payment,
      email: data.email,
      full_name: data.full_name,
      phone: data.phone,
      products: storage,
      cpf: data.cpf,
      price: data.price,
      zip_code: data.zip_code,
      street: data.street,
      city: data.city,
      state: data.state,
      number: data.number,
      neighborhood: data.neighborhood,

      description: data.description ?? '',
      pick_up_in_store: data.pick_up_in_store,
    });

    if (!result) {
      return setLoading(false);
    }

    if (data.method_payment === 'pix') {
      return console.log(result);
    };

    return route.push(result.initPoint);
  };

  async function onSearchZipCode(value: React.ChangeEvent<HTMLInputElement>) {
    if (value.target.value.length !== 8) {
      setIsZipCodeValid(false);
      setLoadingZipCode(false);
      return;
    };

    setLoadingZipCode(true);

    try {
      const data = await api.correio.get(value.target.value);
      const { logradouro, localidade, uf, bairro } = data as ZipCodeProps;

      setValue("street", logradouro);
      setValue("city", localidade);
      setValue("state", uf);
      setValue("neighborhood", bairro);
      setValue("full_street", `${logradouro} • ${bairro} • ${localidade} • ${uf}`)

      setLoadingZipCode(false);
      setIsZipCodeValid(true);
    } catch (error) {
      console.log({ error });
      setIsZipCodeValid(false);
      setLoadingZipCode(false);
    }
  };

  useEffect(() => {
    initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY!);
  }, []);

  return (
    <Suspense fallback={<Splash />}>
      <Container>
        <Shopping.SavedProducts storage={storage} setEditStorage={setEditStorage} setRemoveStorage={setRemoveStorage} />

        <Shopping.Form disabled={storage.length === 0 || !isValid} currentStep={0} onSubmit={handleSubmit(processForm)} loadingButton={loading}>
          <h4 style={{ margin: '20px 0 10px 0', textAlign: 'center' }}>Informação do Pagamento</h4>
          <Controller
            name='method_payment'
            control={control}
            render={({ field: { value, onChange } }) => (
              <MethodPayment $selected={value}>
                <button style={{ backgroundColor: value === 'cards' ? '#5CB85C5a' : 'transparent' }} onClick={() => onChange('cards')}>
                  <Cards width={25} height={25} stroke='#5CB85C' />
                </button>
                <button style={{ backgroundColor: value === 'pix' ? '#5CB85C5a' : 'transparent' }} onClick={() => onChange('pix')}>
                  <Pix width={25} height={25} fill='#5CB85C' />
                </button>
              </MethodPayment>
            )}
          />

          <div className='space' />

          <Content>
            <h5>Email</h5>
            <Controller
              name='email'
              control={control}
              render={({ field: { onChange } }) => (
                <Input.Root variant="checkout" border='0 9px 9px 9px'>
                  <Input.Icon icon={Inbox} width={20} height={20} stroke='#FA0B5B' strokeWidth={1.8} />
                  <Input.Input name='email' type='email' placeholder='email@exemplo.com' onChange={onChange} />
                </Input.Root>
              )}
            />

            <div className='space' />

            <h5>Infirmações Básicas</h5>
            <Controller
              name='full_name'
              control={control}
              render={({ field: { onChange } }) => {
                return (
                  <Input.Root variant="checkout" border='0 9px 0 0'>
                    <Input.Icon icon={User} width={20} height={20} stroke='#FA0B5B' strokeWidth={2} />
                    <Input.Input name='name' placeholder='Nome Completo' onChange={onChange} />
                  </Input.Root>
                )
              }}
            />

            <div style={{ height: 2 }} />
            <Controller
              name='cpf'
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <Input.Root variant="checkout" border='0'>
                    <Input.Icon icon={Identity} width={20} height={20} stroke='#FA0B5B' strokeWidth={1.5} />
                    <Input.Input value={formats.cpf(value)} placeholder='CPF' onChange={onChange} />
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
                    <Input.Icon icon={Mobile} width={20} height={20} stroke='#FA0B5B' strokeWidth={1.5} />
                    <Input.Input value={formats.phoneNumber(value)} placeholder='Telefone' onChange={onChange} />
                  </Input.Root>
                )
              }}
            />

            <div className='space' />
            <h5>Endereço</h5>
            <Controller
              name='zip_code'
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <Input.Root variant="checkout" border='0 9px 0 0' disabled={pick_up_in_store}>
                    <Input.Icon icon={Routing} width={20} height={20} stroke='#FA0B5B' strokeWidth={1.8} />
                    <Input.Input
                      disabled={pick_up_in_store}
                      value={formats.cep(value)}
                      name='cep'
                      type='text'
                      placeholder='CEP'
                      onChange={event => {
                        onSearchZipCode(event);
                        onChange(event);
                      }}
                    />
                  </Input.Root>
                )
              }}
            />

            {
              (loadingZipCode || isZipCodeValid) && (
                <>
                  <div style={{ height: 2 }} />
                  <Controller
                    name='full_street'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Input.Root variant="checkout" border='0' isLoading={loadingZipCode}>
                        <Input.Icon icon={Home} width={20} height={20} stroke='#FA0B5B' strokeWidth={1.5} />
                        <Input.Input
                          disabled
                          value={value ?? ''}
                          onChange={onChange}
                        />
                      </Input.Root>
                    )}
                  />
                  <div style={{ height: 2 }} />
                  <Controller
                    name='number'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Input.Root variant="checkout" border='0' isLoading={loadingZipCode}>
                        <Input.Icon icon={Home} width={20} height={20} stroke='#FA0B5B' strokeWidth={1.5} />
                        <Input.Input defaultValue={value} placeholder='Número da Residencia' onChange={onChange} />
                      </Input.Root>
                    )}
                  />
                </>
              )
            }

            <div style={{ height: 2 }} />
            <Controller
              name='description'
              control={control}
              render={({ field: { onChange } }) => (
                <Input.Root variant="checkout" border='0 0 9px 9px'>
                  <Input.Icon icon={Pen} width={20} height={20} stroke='#FA0B5B' strokeWidth={1.5} />
                  <Input.Input placeholder='Descrição (Opcional)' onChange={onChange} />
                </Input.Root>
              )}
            />

            <div style={{ height: 2 }} />
            <Controller
              name='pick_up_in_store'
              control={control}
              render={({ field: { onChange } }) => (
                <CheckBox title='Desejo retirar no local!' onChange={onChange} />
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