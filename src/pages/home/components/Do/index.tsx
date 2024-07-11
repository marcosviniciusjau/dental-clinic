import aparelho from '@/src/assets/aparelho.jpg'
import implante from '@/src/assets/implante.jpg'
import consulta from '@/src/assets/consulta.jpg'
import limpeza from '@/src/assets/4.png'
import { Heading, Text } from '@marcos-vinicius-design-system/react'
import {
  Container,
  Hero,
  Implantes,
  Aparelhos,
  Consultas,
  Limpezas,
} from './styles'
import Image from 'next/image'

export function Do() {
  return (
    <Container>
      <Hero style={{ marginTop: '380px' }}>
        <Heading size="3xl">o que fazemos</Heading>
      </Hero>

      <Implantes>
        <Image
          src={implante}
          height={200}
          quality={100}
          priority
          style={{ borderRadius: '4px' }}
          alt="Imagem de wavebreakmedia_micro no Freepik"
        />
        <Text size="xl">Implantes</Text>
        <Text size="sm">
          Oferecemos implantes dentários de alta qualidade para substituir
          dentes perdidos, proporcionando um sorriso mais natural e funcional.
        </Text>
      </Implantes>

      <Aparelhos>
        <Image
          src={aparelho}
          height={200}
          quality={100}
          style={{ borderRadius: '4px' }}
          priority
          alt="Imagem de pvproductions no Freepik"
        />
        <Text size="lg">Aparelhos dentais</Text>
        <Text size="sm">
          Nossos aparelhos ortodônticos são personalizados para corrigir a
          posição dos dentes, melhorando a estética e a funcionalidade do seu
          sorriso.
        </Text>
      </Aparelhos>

      <Consultas>
        <Image
          src={consulta}
          height={200}
          quality={100}
          style={{ borderRadius: '4px' }}
          priority
          alt="Imagem do Freepik"
        />
        <Text size="xl">Consultas</Text>
        <Text size="sm">
          Realizamos consultas regulares para avaliar a saúde bucal e oferecer
          os melhores tratamentos preventivos e corretivos.
        </Text>
      </Consultas>
      <Limpezas>
        <Image
          src={limpeza}
          height={200}
          quality={100}
          style={{ borderRadius: '4px' }}
          priority
          alt="Imagem de Freepik"
        />
        <Text size="xl">Limpezas</Text>
        <Text size="sm">
          Nossas limpezas dentais profissionais ajudam a manter seus dentes e
          gengivas saudáveis, prevenindo cáries e doenças periodontais.
        </Text>
      </Limpezas>
    </Container>
  )
}
