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
import { Inbox, Routing, User, Home, Mobile, Pen, Identity, Pix, BoldCard } from '@assets';

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

  const [qrCode, setQrCode] = useState(
    undefined
    // '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'
  );
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
      return setQrCode(result.qr_code_base64)
      // return console.log(result);
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

        <Shopping.Form hide={!qrCode} disabled={storage.length === 0 || !isValid} currentStep={0} onSubmit={handleSubmit(processForm)} loadingButton={loading}>
          <h4 style={{ margin: '20px 0 10px 0', textAlign: 'center' }}>Informação do Pagamento</h4>
          <Controller
            name='method_payment'
            control={control}
            render={({ field: { value, onChange } }) => (
              <MethodPayment $selected={value}>
                <button style={{ backgroundColor: value === 'cards' ? '#5CB85C5a' : 'transparent' }} onClick={() => onChange('cards')}>
                  <BoldCard width={30} height={30} fill='#5CB85C' />
                </button>
                <button style={{ backgroundColor: value === 'pix' ? '#5CB85C5a' : 'transparent' }} onClick={() => onChange('pix')}>
                  <Pix width={30} height={30} fill='#5CB85C' />
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

        <Shopping.Pix loading={true} qr_code={qrCode} />
      </Container>
    </Suspense>
  )
}