import { Items } from "mercadopago/dist/clients/commonTypes";

export const formats = {
  money: (value: number) => {
    let v = String(value).replace(/\D/g, '');
    if (!v) return 'R$ 0,00';

    v = (parseInt(v) / 100).toFixed(2);
    v = v.replace('.', ',');
    v = v.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return `R$ ${v}`;
  },

  cpf: (e: string) => {
    const digits = e?.replace(/\D/g, '') || '';
    return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  },

  cep: (e: string) => {
    const digits = e?.replace(/\D/g, '') || '';
    return digits.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2-$3');
  },

  formatDecimal(value: string) {
    let v = value.replace(/\D/g, '');
    v = `${(Number(v) / 100).toFixed(2)}`;
    v = v.replace(/(\d)(\d{3}),/g, '$1.$2');
    return v;
  },

  phoneNumber: (e: string) => {
    const digits = e?.replace(/\D/g, '') || '';

    if (digits.length === 10) {
      return digits.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    };

    return digits.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  },

  document_number: (e: string) => {
    const digits = e?.replace(/\D/g, '') || '';

    if (digits.length === 16) {
      return digits.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1-$2-$3-$4');
    };

    return e;
  },
  date_hours: (isoString: string) => {
    const data = new Date(isoString);

    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // meses começam em 0
    const ano = data.getFullYear();

    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    const segundos = String(data.getSeconds()).padStart(2, '0');

    return `${dia}/${mes}/${ano} às ${horas}:${minutos}:${segundos}`;
  },
  calculate_total: (items: Items[]) => {
    const total = items.reduce((soma, item) => {
      const quantity = parseFloat(String(item.quantity));
      const price = parseFloat(String(item.unit_price));
      return soma + (quantity * price);
    }, 0);

    return total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
};

/*
  fetch(`https://api.postmon.com.br/v1/cep/${evt.target.value}`)
    .then(jsn => jsn.json())
    .then((success: any) => setCep({ ...cep, ...success }))
  }}
*/