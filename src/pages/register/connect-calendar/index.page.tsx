import {
  Button,
  Heading,
  MultiStep,
  Text,
} from "@marcos-vinicius-design-system/react";
import { Container, Header } from "../styles";

import { Header as HeaderHome } from "@/pages/home/components/Header";
import { signIn, useSession } from "next-auth/react";

import { ContainerLogin } from "@/pages/schedule/[email]/styles";

import { ArrowRight, Check } from "phosphor-react";
import { AuthError, ConnectBox, ConnectItem } from "./styles";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { env } from "@/env/env";

export default function ConnectCalendar() {
  const session = useSession();

  const router = useRouter();

  const hasAuthError = !!router.query.error;

  const emailOwner = env.NEXT_EMAIL_OWNER;
  const isSignedId =
    session.status === "authenticated" &&
    session.data.user.email === emailOwner;
  async function handleConnectCalendar() {
    await signIn("google", { redirect: false });
  }

  async function handleNextStep() {
    await router.push("/register/time-intervals");
  }

  return (
    <>
      <NextSeo title="Conecte sua agenda do Google | Dental Clinic+" noindex />
      <HeaderHome />
      {isSignedId ? (
        <Container>
          <Header>
            <Heading as="strong">Conecte sua agenda!</Heading>
            <Text>
              Conecte o seu calendário para registrar o horário do expediente
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

            <Button
              onClick={handleNextStep}
              type="submit"
              disabled={!isSignedId}
            >
              Próximo passo
              <ArrowRight />
            </Button>
          </ConnectBox>
        </Container>
      ) : (
        <>
          <NextSeo title="Não autorizado | Dental Clinic+" noindex />

          <ContainerLogin>
            <Heading>Você não está autorizado para acessar essa página</Heading>
          </ContainerLogin>
        </>
      )}
    </>
  );
}
