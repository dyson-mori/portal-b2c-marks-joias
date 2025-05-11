import * as yup from 'yup';

export const schema = yup.object().shape({
  /* step 1 */
  method: yup.string().required(),
  price: yup.number().required(),
  quantity: yup.number().required(),

  /* step 2 */
  // full_name: yup.string().min(6, 'Too short'),
  // phone: yup.string(),
  // email: yup.string(),
  // cpf: yup.string(),
  // address: yup.string(),
  // description: yup.string(),
  // cep: yup
  //   .string()
  //   .test('address', 'address not found', async (value) => {
  //     return true
  //   }),
});

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
    id: 'clyp5g9v30000y4iwb6dw4wfn',
    name: 'Método de Pagamento',
    // name: 'Payment Method',
    fields: [
      'method',
      'price'
    ]
  },
  {
    id: 'clyp5wne60009y4iwjkfeobj5',
    name: 'Endereço',
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
    id: 'clyrlct24000ka4h0qjmxm39i',
    name: 'Pix',
    fields: []
  }
];
