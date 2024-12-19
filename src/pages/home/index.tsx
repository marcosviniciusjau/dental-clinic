import { Heading, Text } from "@marcos-vinicius-design-system/react";
import Image from "next/image";
import { Container, Hero, Preview } from "./styles";

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
        <Hero>
          <Heading size="4xl"> O melhor para o seu sorriso </Heading>
          <Text size="xl">
            {" "}
            Agende agora mesmo para sempre ter o melhor sorriso{" "}
          </Text>
        </Hero>
        <Preview>
          <Image
            src={previewImage}
            quality={100}
            priority
            alt=""
            style={{
              display: 'flex',
              margin: 'auto',
              width: '50vh',
              height: '50vh',
            }}
          />
        </Preview>
      </Container>
      <Do />
      <UserForm />
      <Footer />
    </>
  );
}
