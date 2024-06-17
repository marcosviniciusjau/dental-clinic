import { Heading, Text } from '@marcosvinicius-ignite-ui/react'
import Image from 'next/image'
import { Container, Hero, Preview } from './styles'

import previewImage from '../../assets/app-preview.png'
import { UserForm } from './components/UserForm.ts'
export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading size="4xl"> Agendamento descomplicado </Heading>
        <Text size="xl">
          {' '}
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.{' '}
        </Text>
        <UserForm />
      </Hero>
      <Preview>
        <Image
          src={previewImage}
          height={400}
          quality={100}
          priority
          alt="Calendário simbolizando aplicação em funcionamento"
        />
      </Preview>
    </Container>
  )
}
