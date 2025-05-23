## Docker
  <!-- docker build -t marks-joias . <br /> -->
  docker compose up -d <br />

## note <br />
  - remover o "export const dynamic = 'force-dynamic';"# portal-b2c-marks-joias

## Icons
  - ✏️ :pencil2:
  - 📦 :package: add new package
  - 🛠️ :hammer_and_wrench:
  - 🧪 :test_tube:
  - ✨ :sparkles: new feature
  - ♻️ :recycle: refactor
  - 💥 :boom:
  - 🚧 :construction:

## Success Payment Links <br />
  - http://localhost:3000/success?session_id=cs_test_b1ViffhKeVPpgC1ntCuZur8jNxeYnlIixLqO47sSCLFiVDjo0LA8nW9iS6
  - https://portal-b2c-marks-joias-cyan.vercel.app/success?session_id=cs_test_b1ViffhKeVPpgC1ntCuZur8jNxeYnlIixLqO47sSCLFiVDjo0LA8nW9iS6


fazer uma logistica por revendedora, caso o cliente more perto de uma revendedora, faremos a logistica.

```json

{
  "accounts_info": null,
  "acquirer_reconciliation": [],
  "additional_info": {
    "ip_address": "177.55.231.177",
    "items": [
      {
        "description": "O Colar Pavão Real Multicolor é uma peça vibrante e cheia de personalidade. Com um pingente em formato de pavão, cravejado com zircônias coloridas que remetem à beleza das penas dessa ave majestosa, ele transmite elegância e originalidade. O corpo ",      
        "id": "120005",
        "quantity": "1",
        "title": "Colar Pavão Real Multicolor",
        "unit_price": "1"
      }
    ],
    "payer": {
      "first_name": "Sergio Junio Leal"
    },
    "tracking_id": "platform:v1-whitelabel,so:ALL,type:N/A,security:none"
  },
  "authorization_code": "182283",
  "binary_mode": false,
  "brand_id": null,
  "build_version": "3.105.0-rc-8",
  "call_for_authorize_id": null,
  "captured": true,
  "card": {
    "bin": "48938900",
    "cardholder": {
      "identification": {
        "number": "14212204665",
        "type": "CPF"
      },
      "name": "viviane morao"
    },
    "country": "BRA",
    "date_created": "2025-05-16T14:18:21.000-04:00",
    "date_last_updated": "2025-05-16T14:18:21.000-04:00",
    "expiration_month": 12,
    "expiration_year": 2029,
    "first_six_digits": "489389",
    "id": null,
    "last_four_digits": "9395",
    "tags": [
      "debit"
    ]
  },
  "charges_details": [
    {
      "accounts": {
        "from": "collector",
        "to": "mp"
      },
      "amounts": {
        "original": 0.05,
        "refunded": 0
      },
      "client_id": 0,
      "date_created": "2025-05-16T14:18:21.000-04:00",
      "id": "111383868117-001",
      "last_updated": "2025-05-16T14:18:21.000-04:00",
      "metadata": {
        "reason": "",
        "source": "rule-engine"
      },
      "name": "mercadopago_fee",
      "refund_charges": [],
      "reserve_id": null,
      "type": "fee"
    }
  ],
  "charges_execution_info": {
    "internal_execution": {
      "date": "2025-05-16T14:18:21.103-04:00",
      "execution_id": "01JVD534FMJCBR20GY8H1MT69K"
    }
  },
  "collector_id": 2437907601,
  "corporation_id": null,
  "counter_currency": null,
  "coupon_amount": 0,
  "currency_id": "BRL",
  "date_approved": "2025-05-16T14:18:23.000-04:00",
  "date_created": "2025-05-16T14:18:21.000-04:00",
  "date_last_updated": "2025-05-16T14:18:27.000-04:00",
  "date_of_expiration": null,
  "deduction_schema": null,
  "description": "Colar Pavão Real Multicolor",
  "differential_pricing_id": null,
  "external_reference": "pedido-6",
  "fee_details": [
    {
      "amount": 0.05,
      "fee_payer": "collector",
      "type": "mercadopago_fee"
    }
  ],
  "financing_group": null,
  "id": 111383868117,
  "installments": 1,
  "integrator_id": null,
  "issuer_id": "12749",
  "live_mode": true,
  "marketplace_owner": null,
  "merchant_account_id": null,
  "merchant_number": null,
  "metadata": {
    "client_email": "supp.programming@gmail.com",
    "client_id": "client-id-4"
  },
  "money_release_date": "2025-05-16T14:18:23.000-04:00",
  "money_release_schema": null,
  "money_release_status": "released",
  "notification_url": "https://portal-b2c-marks-joias-cyan.vercel.app/api/mercado-pago/webhook",
  "operation_type": "regular_payment",
  "order": {
    "id": "31080403168",
    "type": "mercadopago"
  },
  "payer": {
    "email": "vivianecarvalhomorao@hotmail.com",
    "entity_type": null,
    "first_name": null,
    "id": "1850029315",
    "identification": {
      "number": null,
      "type": null
    },
    "last_name": null,
    "operator_id": null,
    "phone": {
      "number": null,
      "extension": null,
      "area_code": null
    },
    "type": null
  },
  "payment_method": {
    "data": {
      "routing_data": {
        "merchant_account_id": "2011"
      }
    },
    "id": "visa",
    "issuer_id": "12749",
    "type": "credit_card"
  },
  "payment_method_id": "visa",
  "payment_type_id": "credit_card",
  "platform_id": null,
  "point_of_interaction": {
    "application_data": {
      "name": "checkout-off",
      "operating_system": null,
      "version": "v2"
    },
    "business_info": {
      "branch": "Merchant Services",
      "sub_unit": "checkout_pro",
      "unit": "online_payments"
    },
    "transaction_data": {
      "e2e_id": null,
      "ticket_id": "51286072450_7573797d737e657d7d79_A"
    },
    "type": "CHECKOUT"
  },
  "pos_id": null,
  "processing_mode": "aggregator",
  "refunds": [],
  "release_info": null,
  "shipping_amount": 0,
  "sponsor_id": null,
  "statement_descriptor": "MP*JS20250514182",
  "status": "approved",
  "status_detail": "accredited",
  "store_id": null,
  "tags": null,
  "taxes_amount": 0,
  "transaction_amount": 1,
  "transaction_amount_refunded": 0,
  "transaction_details": {
    "acquirer_reference": null,
    "external_resource_url": null,
    "financial_institution": null,
    "installment_amount": 1,
    "net_received_amount": 0.95,
    "overpaid_amount": 0,
    "payable_deferral_period": null,
    "payment_method_reference_id": null,
    "total_paid_amount": 1
  },
  "api_response": {
    "status": 200,
    "headers": {
      "date": [
        "Tue, 20 May 2025 17:54:21 GMT"
      ],
      "content-type": [
        "application/json;charset=UTF-8"
      ],
      "transfer-encoding": [
        "chunked"
      ],
      "connection": [
        "keep-alive"
      ],
      "vary": [
        "Accept-Encoding, Accept,Accept-Encoding"
      ],
      "cache-control": [
        "max-age=0"
      ],
      "x-content-type-options": [
        "nosniff"
      ],
      "x-request-id": [
        "3fa8f016-bdca-4a39-963e-1910c695f2e2"
      ],
      "x-xss-protection": [
        "1; mode=block"
      ],
      "strict-transport-security": [
        "max-age=16070400; includeSubDomains; preload"
      ],
      "access-control-allow-origin": [
        "*"
      ],
      "access-control-allow-headers": [
        "Content-Type"
      ],
      "access-control-allow-methods": [
        "PUT, GET, POST, DELETE, OPTIONS"
      ],
      "access-control-max-age": [
        "86400"
      ],
      "timing-allow-origin": [
        "*"
      ],
      "content-encoding": [
        "gzip"
      ]
    }
  }
}

```