import * as yup from 'yup';

export const schema = yup.object().shape({
  /* step 1 */
  payment_method: yup.string().required().nullable().default(''),
  price: yup.number().required(),
  quantity: yup.number().required(),

  /* step 2 */
  full_name: yup.string().min(6, 'Too short').required(),
  phone: yup
    .string()
    .test('isValidPhone', (value) => {
      const digits = value?.replace(/[\[\]&]+/g, '');
      return digits!.length >= 10
    })
    .required(),
  email: yup.string().required(),
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

export const methodsPayments = [
  {
    id: 'clyp6mut5000ay4iw0rcg2vve',
    title: 'Cartão'
  },
  {
    id: 'clyrlct24000ka4h0qjmxm39i',
    title: 'Pix'
  }
];

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
