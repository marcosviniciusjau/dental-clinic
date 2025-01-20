import {
  Button,
  Heading,
  MultiStep,
  Text,
} from '@marcos-vinicius-design-system/react'
import { Container, Header } from '../styles'

import { signIn, useSession } from 'next-auth/react'

import { ArrowRight, Check } from 'phosphor-react'
import { AuthError, ConnectBox, ConnectItem } from './styles'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { env } from '@/env/env'

export default function CreateAccountGoogle() {
  const session = useSession()

  const router = useRouter()

  const emailOwner = env.NEXT_PUBLIC_EMAIL;
  const hasAuthError = !!router.query.error
  const isSignedId = session.status === 'authenticated'

  async function handleCreateAccount() {
    await signIn('google', { callbackUrl: '/register/create-account-google' })
  }


  async function handleNextStep() {
    await router.push(`/schedule/${emailOwner}`);
  }

  return (
    <>
      <NextSeo title="Crie  sua conta com o Google | Dental Clinic" noindex />

      <Container>
        <Header>
          <Heading as="strong">Crie sua conta!</Heading>
          <Text>
            Crie sua conta!
          </Text>
          <MultiStep size={4} currentStep={2} />
        </Header>
        <ConnectBox>
          <ConnectItem>
            <Text>Google</Text>
            {isSignedId ? (
              <Button size="sm" disabled>
                Conectado
                <Check />
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleCreateAccount}
              >
                Conectar
                <ArrowRight />
              </Button>
            )}
          </ConnectItem>
          {hasAuthError && (
            <AuthError size="sm">
              Falha ao se conectar ao Google
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
