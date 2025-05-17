import Image from 'next/image';

import { Logo } from '@assets';

import { Container, Description, Images } from "./styles";

export default function About({ width }: { width: number }) {

  const style_landing_about_logo = {
    minWidth: width / 3
  };

  return (
    <Container>
      <Description>
        <div style={style_landing_about_logo} className='landing-about-logo'>
          <Logo width={150} height={150} />
        </div>

        <div className='landing-about-texts'>
          <div className='landing-about-title'>
            <h4>Marks Joias – Tradição, Elegância e Confiança há mais de 25 anos</h4>
            ✨
          </div>
          <p>
            Com mais de duas décadas de história, a Marks Joias é referência em joias e semijoias de alta qualidade. Atendemos com excelência no varejo físico e também por meio de consignação, oferecendo peças selecionadas que unem sofisticação, estilo e significado.
            <br />
            Agora também no digital, seguimos expandindo nosso compromisso com a beleza e a confiança, tornando mais fácil para você encontrar a joia ideal – seja para presentear alguém especial ou celebrar momentos únicos.
            <br />
            Descubra o brilho que combina com você na Marks Joias. 💎
          </p>
        </div>
      </Description>

      <Images>
        <Image
          style={{ objectFit: 'cover' }}
          width={width / 4}
          height={width / 4}
          src="https://res.cloudinary.com/doo9pfft1/image/upload/v1747331634/left_v4zslf.jpg"
          alt='photo-1'
        />
        <Image
          id='middle'
          style={{ objectFit: 'cover' }}
          width={width / 2}
          height={width / 4}
          src="https://res.cloudinary.com/doo9pfft1/image/upload/v1747331486/inside-store_ealsn7.jpg"
          alt='photo-2'
        />
      </Images>
    </Container>
  )
}