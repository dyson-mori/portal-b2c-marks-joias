import * as yup from 'yup';

export const schema = yup.object().shape({
  /* step 1 */
  method: yup.string().required().nullable(),
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
  // cpf: yup
  //   .string()
  //   .test('cpf', (value) => {
  //     const digits = value?.replaceAll('.', '').replace('-', '');
  //     return digits!.length === 11
  //   })
  //   .required(),
  // address: yup.string(),
  description: yup.string().required(),
  cep: yup
    .string()
    .test('cpf', (value) => {
      const digits = value?.replaceAll('.', '').replace('-', '');
      return digits!.length === 8
    })
    .required(),

  street: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
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
