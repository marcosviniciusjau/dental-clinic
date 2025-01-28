import { Heading, Text } from "@marcos-vinicius-design-system/react";
import Image from "next/image";
import { Container, Hero, Preview, Contacts, Imagem, Gmail } from "./styles";

import previewImage from "../../assets/dentista.png";

import { UserForm } from "./components/UserForm.ts";
import { NextSeo } from "next-seo";
import { Header } from "./components/Header";
import { Do } from "./components/Do";
import { Footer } from "./components/Footer";
import LogoGmail from "@/assets/logo_gmail.svg";

import {
  Accordion,
  AccordionItem,
  AccordionWrapper,
  Panel,
} from "@/pages/schedule/[email]/styles";
import { useState } from "react";


export default function Home() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <NextSeo
        title="Dental Clinic"
        description="Dental Clinic. Agende seu horário e tenha o melhor sorriso."
      />
      <Header />
      <Container>
        <Preview>
          <Imagem src={previewImage} quality={100} priority alt="" />
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
      <Contacts>
        <AccordionWrapper>
          <Heading size="lg">Perguntas frequentes</Heading>
          {[
            {
              question: "Qual o preço médio das consultas?",
              answer: "A partir de 150",
            },
            {
              question: "Qual o horário de funcionamento?",
              answer: "De segunda a sexta, das 8h às 18h.",
            },
            {
              question: "Posso cancelar minha consulta?",
              answer: "Sim, com até 24h de antecedência.",
            },
          ].map((item, index) => (
            <AccordionItem key={index}>
              <Accordion
                onClick={() => toggleAccordion(index)}
                isOpen={openIndex === index}
              >
                <Text>{item.question}</Text>
              </Accordion>
              <Panel isOpen={openIndex === index}>
                <Text>{item.answer}</Text>
              </Panel>
            </AccordionItem>
          ))}
        </AccordionWrapper>
        <div>
          <Heading>Tem alguma dúvida?</Heading>
          <Text>Então envie um email para:</Text>
          <Gmail>
          <Image
            src={LogoGmail}
            width={80}
            quality={100}
            priority
            style={{ borderRadius: "4px" }}
            alt="logo Gmail"
          />

          <a
            href="mailto:mvaraujowebsites@gmail.com"
            style={{ textDecoration: "none" }}
            target="_parent"
          >
            <Text size="xl">dentalclinic@gmail.com</Text>
          </a>
          </Gmail>
        </div>
      </Contacts>
      <UserForm />
      <Footer />
    </>
  );
}
