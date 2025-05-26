import * as yup from 'yup';

export const schema = yup.object().shape({
  method_payment: yup.string().required(),
  price: yup.number().required(),
  email: yup.string().required(),
  full_name: yup.string().min(6, 'Too short').required(),
  phone: yup
    .string()
    .test('isValidPhone', (value) => {
      const digits = value?.replace(/[\[\]&]+/g, '');
      return digits!.length >= 10
    })
    .required(),
  cpf: yup
    .string()
    .test('cpf', (value) => {
      const digits = value?.replaceAll('.', '').replace('-', '');
      return digits!.length === 11
    })
    .required(),

  zip_code: yup
    .string()
    .when('pick_up_in_store', {
      is: true,
      then: (schema) => schema.notRequired(),
      otherwise: (schema) =>
        schema
          .test('zip_code', (value) => {
            const digits = value?.replaceAll('.', '').replace('-', '');
            return digits!.length === 8;
          })
          .required(),
    }).default(''),

  street: yup.string().when('pick_up_in_store', {
    is: true,
    then: (schema) => schema.notRequired(),
    otherwise: (schema) => schema.required(),
  }).default(''),

  city: yup.string().when('pick_up_in_store', {
    is: true,
    then: (schema) => schema.notRequired(),
    otherwise: (schema) => schema.required(),
  }).default(''),

  state: yup.string().when('pick_up_in_store', {
    is: true,
    then: (schema) => schema.notRequired(),
    otherwise: (schema) => schema.required(),
  }).default(''),

  number: yup.string().when('pick_up_in_store', {
    is: true,
    then: (schema) => schema.notRequired(),
    otherwise: (schema) => schema.required(),
  }).default(''),

  neighborhood: yup.string().when('pick_up_in_store', {
    is: true,
    then: (schema) => schema.notRequired(),
    otherwise: (schema) => schema.required(),
  }).default(''),

  full_street: yup.string().nullable().default(''),
  description: yup.string().notRequired().default(''),

  pick_up_in_store: yup.boolean().required().default(false),
}).required();

export type schemaProps = yup.InferType<typeof schema>;

export const steps = [
  {
    id: 'clyp5wne60009y4iwjkfeobj5',
    name: 'Informação do pagamento',
    // name: 'Address',
    fields: [
      'full_name',
      'phone',
      'cpf',
      'cep',
      'address',
      'description'
    ]
  },
  {
    id: 'clyp5g9v30000y4iwb6dw4wfn',
    name: 'Método de Pagamento',
    // name: 'Payment Method',
    fields: [
      'method',
      'price'
    ]
  },
  {
    id: 'clyrlct24000ka4h0qjmxm39i',
    name: 'Pix',
    fields: []
  }
];

export type ZipCodeProps = {
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