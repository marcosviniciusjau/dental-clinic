import {
  Button,
  Heading,
  MultiStep,
  Text,
} from '@marcos-vinicius-design-system/react'
import { Container, Header } from '../styles'

import { Header as HeaderHome } from "@/pages/home/components/Header";
import { signIn, useSession } from 'next-auth/react'
import {parseCookies} from 'nookies'
import { ArrowRight, Check } from 'phosphor-react'
import { AuthError, ConnectBox, ConnectItem } from './styles'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { env } from '@/env/env';

export default function ConnectCalendar() {
  const session = useSession()

  const router = useRouter()

  const hasAuthError = !!router.query.error 
  
  const { 'dental-clinic:client': userIdOnCookies } = parseCookies()

  const isSignedId = session.status === "authenticated";
  console.log(session)
  async function handleConnectCalendar() {
    await signIn('google')
  }

  async function handleNextStep() {
    await router.push('/register/time-intervals')
  }

  return (
    <>
      <NextSeo title="Conecte sua agenda do Google | Dental Clinic" noindex />
      <HeaderHome/>
      <Container>
        <Header>
          <Heading as="strong">Conecte sua agenda!</Heading>
          <Text>
            Conecte o seu calendário para verificar automaticamente as horas
            ocupadas e os novos eventos à medida em que são agendados.
          </Text>
          <MultiStep size={4} currentStep={2} />
        </Header>
        <ConnectBox>
          <ConnectItem>
            <Text>Google Calendar</Text>
            {isSignedId ? (
              <Button size="sm" disabled>
                Conectado
                <Check />
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleConnectCalendar}
              >
                Conectar
                <ArrowRight />
              </Button>
            )}
          </ConnectItem>
          {hasAuthError && (
            <AuthError size="sm">
              Falha ao se conectar ao Google, verifique se você habilitou as
              permissões de acesso ao Google Calendar
            </AuthError>
          )}

          <Button onClick={handleNextStep} type="submit" disabled={!isSignedId}>
            Próximo passo
            <ArrowRight />
          </Button>
        </ConnectBox>
      </Container>
    </>
  )
}
