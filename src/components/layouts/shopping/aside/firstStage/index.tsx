import { Control, Controller } from "react-hook-form";

import { Cards, Pix } from "@assets";

import { formats } from "@helpers/format";
import { ProductProps } from "@global/interfaces";

import CheckOuts from "../checkouts";
import { Container, MethodPayment, Methods, Result } from "./styles";

type Props = {
  storage: ProductProps[];

  control: Control<{
    method: string;
    price: number;
    quantity: number;
  }, object, {
    method: string;
    price: number;
    quantity: number;
  }>;
  methodsPayments: {
    id: string;
    title: string;
  }[];
  sumPrices: number;
};

const Icons = ({ id }: { id: string }) => {
  if (id === 'clyp6mut5000ay4iw0rcg2vve')
    return <Cards width={25} height={25} strokeWidth={1.5} stroke="#dedede" />

  return <Pix width={25} height={25} fill="#dedede" />;
};

export default function Body({ storage, control, methodsPayments, sumPrices }: Props) {
  return (
    <Container>
      <MethodPayment>
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
                onClick={() => onChange(meth.id)}
                $selected={meth.id === value}
              >
                <Icons id={meth.id} />
                <p>{meth.title}</p>
              </Methods>
            )}
          />
        ))}
      </MethodPayment>

      <CheckOuts storage={storage} />

      <Result>
        <p>Total a Pagar</p>
        <p id='price'>{formats.money(sumPrices)}</p>
      </Result>
    </Container>
  )
};