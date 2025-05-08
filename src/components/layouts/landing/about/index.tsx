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
        <Image width={width / 4} height={width / 4} src="https://i.pinimg.com/736x/c1/aa/ef/c1aaef2f1f69e9df51c16eaac1a083e9.jpg" alt='photo' />
        <div className='middle' style={{ height: width / 4 }}>
          <img src="https://i.pinimg.com/736x/c4/b3/1d/c4b31d1f1e2631d4c89a28318d3c1046.jpg" alt='photo' />
          {/* <img src="https://i.pinimg.com/736x/8d/05/f8/8d05f8f80f985ba3239998ec2cd694bf.jpg" alt='photo' /> */}
          {/* <div className='under'>
            <img src="https://i.pinimg.com/736x/2c/4c/96/2c4c96161a0d6387684b9542034a1471.jpg" alt='photo' />
            <span />
            <img src="https://i.pinimg.com/736x/c0/93/7b/c0937b370b136f69016ce04aafea2c3f.jpg" alt='photo' />
          </div> */}
        </div>
        <Image width={width / 4} height={width / 4} src="https://i.pinimg.com/736x/c1/aa/ef/c1aaef2f1f69e9df51c16eaac1a083e9.jpg" alt='photo' />
      </Images>
    </Container>
  )
}