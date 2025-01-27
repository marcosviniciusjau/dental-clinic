import { Heading, Text } from "@marcos-vinicius-design-system/react";
import Image from "next/image";
import { Container, Hero, Imagem, Preview } from "./styles";

import previewImage from "../../assets/dentista.png";

import { UserForm } from "../home/components/UserForm.ts";
import { NextSeo } from "next-seo";
import { Header } from "../home/components/Header";
import { Do } from "../home/components/Do";
import { Footer } from "../home/components/Footer";
import { SocialMedia } from "./components/SocialMedia";
import { useSession } from "next-auth/react";
export default function Contact() {
  return (
      <Container>
        <Hero>
          <Heading size="lg"> Para mais perguntas acesse nossas redes sociais </Heading>
          <SocialMedia />
        </Hero>
      </Container>
  
  );
}
