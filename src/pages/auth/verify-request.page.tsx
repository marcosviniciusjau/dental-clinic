import { Heading, Text } from "@marcos-vinicius-design-system/react";
import { Container } from "./styles";
import { Header } from "../home/components/Header";

export default function VerifyRequestPage() {
  return (
    <>
    <Header/>
    <Container>
      <Heading>Verifique seu email</Heading>
      <Text>Enviamos um link de login para o seu email.</Text>
      <Text>Por favor, acesse sua caixa de entrada e clique no link para acessar a agenda e ver os horários disponíveis.</Text>
    </Container>
    </>
  );
}
