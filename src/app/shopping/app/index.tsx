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
import { Inbox, Routing, User, Home, Mobile, Pen, Identity } from '@assets';

import {
  // methodsPayments,
  schema,
  schemaProps
} from './schema';
import {
  Container,
  Content,
  Result,
  // MethodPayment,
  // Methods,
  // Result
} from './styles';

type ZipCodeProps = {
  bairro: string;//"Eldorado"
  cep: string;//"32310-370"
  complemento: string;//""
  ddd: string;//"31"
  estado: string;//"Minas Gerais"
  gia: string;//""
  ibge: string;//"3118601"
  localidade: string;//"Contagem"
  logradouro: string;//"Rua Acácias"
  regiao: string;//"Sudeste"
  siafi: string;//"4371"
  uf: string;//"MG"
  unidade: string;//""
};

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

  const { city, neighborhood, street, state, zip_code } = watch();

  const processForm: SubmitHandler<schemaProps> = async data => {
    setLoading(true);

    const result = await api.paid_market.create({
      email: data.email,
      full_name: data.full_name,
      phone: data.phone,
      products: storage,
      cpf: data.cpf,
      street: data.street,
      city: data.city,
      state: data.state,
      number: data.number,
      neighborhood: data.neighborhood,
      description: data.description ?? '',
      zip_code: data.zip_code
    });

    return route.push(result.initPoint);
  };

  async function calcularFrete(data: { cep: string }) {
    const params = new URLSearchParams({
      sCepOrigem: "01001-000", // CEP de origem (loja)
      sCepDestino: data.cep,
      nVlPeso: "1",
      nCdFormato: "1",
      nVlComprimento: "20",
      nVlAltura: "5",
      nVlLargura: "15",
      nCdServico: "04510", // PAC = 04510 | SEDEX = 04014
      nVlDiametro: "0",
      sCdMaoPropria: "n",
      nVlValorDeclarado: "0",
      sCdAvisoRecebimento: "n",
      StrRetorno: "xml",
      nCdEmpresa: "",
      sDsSenha: "",
    });

    const url = `https://cors-anywhere.herokuapp.com/https://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?${params.toString()}`;

    const response = await fetch(url);
    const text = await response.text();

    // Extrair valor do frete do XML
    const match = text.match(/<Valor>([^<]*)<\/Valor>/);
    if (match && match[1]) {
      const valorFrete = parseFloat(match[1].replace(",", "."));
      console.log({ valorFrete });
    // console.log(produtoPreco + valorFrete);

      // setFrete(valorFrete);
      // setTotal(produtoPreco + valorFrete);
    } else {
      alert("Não foi possível calcular o frete.");
    }
  }

  // const Icons = ({ id }: { id: string }) => {
  //   if (id === 'clyp6mut5000ay4iw0rcg2vve')
  //     return <Cards width={25} height={25} strokeWidth={1.5} stroke="#dedede" />

  //   return <Pix width={25} height={25} fill="#dedede" />;
  // };

  useEffect(() => {
    if (zip_code?.length === 8) {
      api.correio.get(zip_code)
        .then((res) => {
          const { logradouro, localidade, uf, bairro, cep } = res as ZipCodeProps;

          calcularFrete({ cep });

          setValue("street", logradouro);
          setValue("city", localidade);
          setValue("state", uf);
          setValue("neighborhood", bairro);
        });
    } else if (street && neighborhood && city && state) {
      setValue("street", '');
      setValue("city", '');
      setValue("state", '');
      setValue("neighborhood", '');
    };
  }, [zip_code]);

  useEffect(() => {
    initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY!);
  }, []);

  return (
    <Suspense fallback={<Splash />}>
      <Container>
        <Shopping.SavedProducts storage={storage} setEditStorage={setEditStorage} setRemoveStorage={setRemoveStorage} />

        <Shopping.Form disabled={storage.length === 0 || !isValid} currentStep={0} onSubmit={handleSubmit(processForm)} loadingButton={loading}>
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
          </MethodPayment> */}

          <h4 style={{ margin: '20px 0' }}>Informação do pagamento</h4>

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
                  <Input.Root variant="checkout" border='0 9px 0 0'>
                    <Input.Icon icon={Routing} width={20} height={20} stroke='#FA0B5B' strokeWidth={1.8} />
                    <Input.Input value={formats.cep(value)} name='cep' type='text' placeholder='CEP' onChange={onChange} />
                  </Input.Root>
                )
              }}
            />

            {
              street && neighborhood && city && state && (
                <>
                  <div style={{ height: 2 }} />
                  <Controller
                    name='full_street'
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Input.Root variant="checkout" border='0'>
                        <Input.Icon icon={Home} width={20} height={20} stroke='#FA0B5B' strokeWidth={1.5} />
                        <Input.Input
                          disabled
                          defaultValue={`${street} • ${neighborhood} • ${city} • ${state}`}
                          onChange={onChange}
                        />
                      </Input.Root>
                    )}
                  />
                  <div style={{ height: 2 }} />
                  <Controller
                    name='number'
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Input.Root variant="checkout" border='0'>
                        <Input.Icon icon={Home} width={20} height={20} stroke='#FA0B5B' strokeWidth={1.5} />
                        <Input.Input placeholder='Número da Residencia' onChange={onChange} />
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