import { Heading, Text } from '@marcosvinicius-ignite-ui/react'
import Image from 'next/image'
import { Container, Hero, Preview } from './styles'

import previewImage from '../../assets/dentista.png'

import { UserForm } from './components/UserForm.ts'
import { NextSeo } from 'next-seo'
import { Header } from './components/Header'
import { Do } from './components/Do'
export default function Home() {
  return (
    <>
      <NextSeo
        title="Dental Clinic"
        description="Dental Clinic. Agende seu horário e tenha o melhor sorriso."
      />
      <Header />
      <Container>
        <Hero>
          <Heading size="4xl"> O melhor para o seu sorriso </Heading>
          <Text size="xl">
            {' '}
            Agende agora mesmo para sempre ter o melhor sorriso{' '}
          </Text>
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
      <Do />
      <UserForm />
    </>
  )
}
