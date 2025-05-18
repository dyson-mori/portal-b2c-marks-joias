import { Product } from "@prisma/client";

export type ProductProps = Product & {
  files: string[]; // improve this
};

export type StorageProps = {
  id: number;
  product_id: string;
  price_id: string;
  title: string;
  price: number;
  maxQuantity: number;
  thumbnail: string;
  quantity: number;
  unit_amount: number;
  description: string;
};

export type PaidMarketProps = {
  full_name: string;
  email: string;
  cep: string;
  description: string;
  phone: string;
  cpf: string;

  external_reference_id: string;
  client_id: string;
  products: StorageProps[];
  // last_name: string;
};

export type GetPaymentWebhookResponse = {
  accounts_info: null,
  acquirer_reconciliation: [],
  additional_info: {
    ip_address: string; // '177.55.231.177',
    items: StorageProps[],
    payer: PaidMarketProps; // It will depend on what I send!
    tracking_id: string; // 'platform:v1-whitelabel,so:ALL,type:N/A,security:none'
  },
  authorization_code: string; //'182283', --> IMPORTANT <--
  card: {
    bin: string; // '48938900',
    cardholder: {
      // identification: [Object],
      name: string; // 'viviane morao'
    },
    country: string; // 'BRA',
    date_created: string; // '2025-05-16T14:18:21.000-04:00',
    date_last_updated: string; // '2025-05-16T14:18:21.000-04:00',
    expiration_month: 12,
    expiration_year: 2029,
    first_six_digits: string; // '489389',
    id: null,
    last_four_digits: string; // '9395',
    tags: string[]
  },
  payer: {
    email: string; // 'vivianecarvalhomorao@hotmail.com',
    entity_type: null,
    first_name: null,
    id: string; // '1850029315',
    identification: {
      number: null,
      type: null
    },
    last_name: null,
    operator_id: null,
    phone: {
      number: null,
      extension: null,
      area_code: null
    },
    type: null
  },
  // charges_details: [
  //   {
  //     // accounts: [Object],
  //     // amounts: [Object],
  //     client_id: 0,
  //     date_created: string; // '2025-05-16T14:18:21.000-04:00',
  //     id: string; // '111383868117-001',
  //     last_updated: string; // '2025-05-16T14:18:21.000-04:00',
  //     // metadata: [Object],
  //     name: string; // 'mercadopago_fee',
  //     refund_charges: [],
  //     reserve_id: null,
  //     type: string; // 'fee'
  //   }
  // ],
  // charges_execution_info: {
  //   internal_execution: {
  //     date: string; // '2025-05-16T14:18:21.103-04:00',
  //     execution_id: string; // '01JVD534FMJCBR20GY8H1MT69K'
  //   }
  // },
  // collector_id: 2437907601,
  // corporation_id: null,
  // counter_currency: null,
  // coupon_amount: 0,
  // currency_id: string; // 'BRL',
  // date_approved: string; // '2025-05-16T14:18:23.000-04:00',
  // date_created: string; // '2025-05-16T14:18:21.000-04:00',
  // date_last_updated: string; // '2025-05-16T14:18:27.000-04:00',
  // date_of_expiration: null,
  // deduction_schema: null,
  // description: string; // 'Colar Pavão Real Multicolor',
  // differential_pricing_id: null,
  // external_reference: string; // 'pedido-6',
  // fee_details: [
  //   {
  //     amount: 0.05, fee_payer: string; // 'collector', type: string; // 'mercadopago_fee'
  //   }
  // ],
  // financing_group: null,
  // id: 111383868117,
  // installments: 1,
  // integrator_id: null,
  // issuer_id: string; // '12749',
  // live_mode: true,
  // marketplace_owner: null,
  // merchant_account_id: null,
  // merchant_number: null,
  // metadata: {
  //   client_email: string; // 'supp.programming@gmail.com',
  //   client_id: string; // 'client-id-4'
  // },
  // money_release_date: string; // '2025-05-16T14:18:23.000-04:00',
  // money_release_schema: null,
  // money_release_status: string; // 'released',
  // notification_url: string; // 'https://portal-b2c-marks-joias-cyan.vercel.app/api/mercado-pago/webhook',
  // operation_type: string; // 'regular_payment',
  // order: {
  //   id: string; // '31080403168'
  //   type: string; // 'mercadopago'
  // },
  // payment_method: {
  //   // data: { routing_data: [Object] },
  //   id: string; // 'visa',
  //   issuer_id: string; // '12749',
  //   type: string; // 'credit_card'
  // },
  // payment_method_id: string; // 'visa',
  // payment_type_id: string; // 'credit_card',
  // platform_id: null,
  // point_of_interaction: {
  //   application_data: {
  //     name: string; // 'checkout-off', operating_system: null, version: string; // 'v2'
  //   },
  //   business_info: {
  //     branch: string; // 'Merchant Services',
  //     sub_unit: string; // 'checkout_pro',
  //     unit: string; // 'online_payments'
  //   },
  //   transaction_data: {
  //     e2e_id: null, ticket_id: string; // '51286072450_7573797d737e657d7d79_A' },
  //     type: string; // 'CHECKOUT'
  //   },
  //   pos_id: null,
  //   processing_mode: string; // 'aggregator',
  //   refunds: [],
  //   release_info: null,
  //   shipping_amount: 0,
  //   sponsor_id: null,
  //   statement_descriptor: string; // 'MP*JS20250514182',
  //   status: string; // 'approved',
  //   status_detail: string; // 'accredited',
  //   store_id: null,
  //   tags: null,
  //   taxes_amount: 0,
  //   transaction_amount: 1,
  //   transaction_amount_refunded: 0,
  //   transaction_details: {
  //     acquirer_reference: null,
  //     external_resource_url: null,
  //     financial_institution: null,
  //     installment_amount: 1,
  //     net_received_amount: 0.95,
  //     overpaid_amount: 0,
  //     payable_deferral_period: null,
  //     payment_method_reference_id: null,
  //     total_paid_amount: 1
  //   },
  //   api_response: {
  //     status: number; // 200
  //   }
  // }
};