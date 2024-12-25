import { Heading, Text } from "@marcos-vinicius-design-system/react";
import Image from "next/image";
import { Container, Hero, Imagem, Preview } from "./styles";

import previewImage from "../../assets/dentista.png";

import { UserForm } from "./components/UserForm.ts";
import { NextSeo } from "next-seo";
import { Header } from "./components/Header";
import { Do } from "./components/Do";
import { Footer } from "./components/Footer";
export default function Home() {
  return (
    <>
      <NextSeo
        title="Dental Clinic"
        description="Dental Clinic. Agende seu horário e tenha o melhor sorriso."
      />
      <Header />
      <Container>
      <Preview>
          <Imagem
            src={previewImage}
            quality={100}
            priority
            alt=""
          />
        </Preview>
        <Hero>
          <Heading size="4xl"> O melhor para o seu sorriso </Heading>
          <Text size="xl">
            {" "}
            Agende agora mesmo para sempre ter o melhor sorriso{" "}
          </Text>
        </Hero>
      
      </Container>
      <Do />
      <UserForm />
      <Footer />
    </>
  );
}
