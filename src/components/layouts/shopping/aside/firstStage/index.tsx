import { Control, Controller } from "react-hook-form";

import { Cards, Pix } from "@assets";

import { formats } from "@helpers/format";
import { ProductProps } from "@global/interfaces";

import { Container, Methods, Result } from "./styles";
import CheckOuts from "../checkouts";

type Props = {
  storage: ProductProps[];

  control: Control<{
    method: string;
    price: number;
  }, object, {
    method: string;
    price: number;
  }>;
  methodsPayments: {
    id: string;
    title: string;
  }[];
  sumPrices: number;
};


const Icons = ({ id }: { id: string }) => {
  if (id === 'clyp6mut5000ay4iw0rcg2vve')
    return <Cards width={20} height={20} strokeWidth={1.5} stroke="#FA0B5B" />

  return <Pix width={20} height={20} />;
};

export default function Body({ storage, control, methodsPayments, sumPrices }: Props) {
  return (
    <Container>
      <p style={{ fontSize: 12, fontWeight: 500 }}>Choose payment method</p>
      {methodsPayments.map((meth, i) => (
        <Controller
          key={i}
          name='method'
          control={control}
          render={({ field: { value, onChange } }) => (
            <Methods
              key={i}
              $selected={!!methodsPayments.find(el => el.id === value)}
              type='button'
              disabled={storage?.length === 0}
              onClick={() => onChange(meth.id)}
            >
              <Icons id={meth.id} />
              <p>{meth.title}</p>
            </Methods>
          )}
        />
      ))}

      <CheckOuts storage={storage} />

      <Result>
        <p>Total a Pagar</p>
        <p id='price'>{formats.money(sumPrices)}</p>
      </Result>
    </Container>
  )
};