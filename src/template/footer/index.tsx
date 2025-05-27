import React from 'react';

import { Instagram, TikTok, WhiteLogo } from '@assets';

import { Container, Contents, Rows } from './styles';

export default function Footer({ hide }: { hide: boolean }) {
  if (hide) {
    return null;
  };

  return (
    <Container>
      <Contents>
        <Rows>
          <WhiteLogo width={100} height={100} />
          <div style={{ marginTop: 10 }}>
            <Instagram width={25} height={25} stroke='#fff' strokeWidth={2} />
            <span style={{ margin: '0 5px' }} />
            <TikTok width={25} height={25} />
          </div>
        </Rows>
        <Rows>
          <div style={{ display: 'flex', margin: 15 }}>
            <p>Consignados</p>
            <span style={{ width: 20 }} />
            <p>Contate-nos</p>
          </div>
        </Rows>
        <Rows>
          <div style={{ width: 280, margin: 5 }}>
            <p><strong>Endereço:</strong> Avenida José Faria da Rocha  </p>
          </div>
          <div style={{ width: 280, margin: 5 }}>
            <p><strong>Email:</strong> marksjoias@gmail.com</p>
          </div>
          <div style={{ width: 280, margin: 5 }}>
            <p><strong>Telefone:</strong> +55 31 991819932</p>
          </div>
        </Rows>
      </Contents>
      {/* <Copyright>
        <p>Copyright © 1992 - 2025 todos os direitos reservados.</p>
      </Copyright> */}
    </Container>
  );
}
