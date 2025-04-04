import { Button } from "@marcos-vinicius-design-system/react";
import { Heading } from "@marcos-vinicius-design-system/react";
import { NextSeo } from "next-seo";
import { ContainerLogin } from "./schedule/[email]/styles";
import { Header } from "./home/components/Header";

export default function Custom404() {
  return (
    <>
      <NextSeo title="Página Não encontrada | Advogado" noindex />
      <Header />
      <ContainerLogin>
        <Heading>Pagina não encontrada</Heading>
        <a href="/sign-in" style={{ textDecoration: "none" }}>
          <Button>Voltar para a tela inicial</Button>
        </a>
      </ContainerLogin>
    </>
  );
}
