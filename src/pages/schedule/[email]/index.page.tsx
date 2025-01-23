import {
  Heading,
  ProfilePhoto,
  Text,
  Button,
} from "@marcos-vinicius-design-system/react";
import {
  Accordion,
  AccordionItem,
  AccordionWrapper,
  Consultas,
  Container,
  ContainerLogin,
  DoctorHeader,
  PanelProfile,
  Panel,
  ProfileHeader,
  UserHeader,
} from "./styles";
import { GetStaticProps } from "next";

import { GetServerSideProps } from 'next'
import { getServerSession, unstable_getServerSession } from 'next-auth'
import { prisma } from "@/lib/prisma";
import { ScheduleForm } from "./ScheduleForm";
import { NextSeo } from "next-seo";
import { Header } from "@/pages/home/components/Header";
import { ToastContainer } from "react-toastify";
import { buildNextAuthOptions } from "@/pages/api/auth/[...nextauth].api"
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

import { set, get, remove } from "local-storage";
import { destroyCookie, parseCookies } from "nookies";
import { Door, Pencil } from "phosphor-react";
import { getSession, useSession } from "next-auth/react";
import { env } from "@/env/env";
interface ScheduleProps {
  user: {
    name: string;
    email: string;
    bio: string;
    profileImgUrl: string;
  };
}

export interface ClientProps {
  email: string;
  name: string;
}

interface Schedulings {
  id: string;
  date: Date;
  observations: string | null;
}
[];

export default function Schedule({ user }: ScheduleProps) {
  const router = useRouter();
const session = useSession()
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const { "dental-clinic:client": userOnCookies } = parseCookies();

  const userJSON = JSON.parse(userOnCookies);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  const { data: schedulings } = useQuery<Schedulings[]>({
    queryKey: ["schedulings"],
    queryFn: async () => {
      const response = await api.get(`/users/get-schedulings`);
      return response.data;
    },
  });


  async function updateProfile() {
    router.push("/register/update-profile");
  }

  function logout() {
    try {
      destroyCookie(null, "dental-clinic:client", {
        path: "/",
      });
      remove("client");
      router.push("/sign-in");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <NextSeo title={`Agendar com ${"Dental Clinic"}| Dental Clinic`} />

      <Header />
      <Container>
        <UserHeader>
            <div key={1}>
              <ProfileHeader
                onClick={() => toggleAccordion(1)}
                isOpen={openIndex === 1}
              >
                <Text size="sm">{userJSON.name}</Text>
               
              </ProfileHeader>
              <PanelProfile isOpen={openIndex === 1}>
              <Text size="sm">{userJSON.email}</Text>
                <Button  style={{background: '#121214'}}  size="sm" onClick={logout}>
                  <Door />
                  Sair
                </Button>
                <Button style={{background: '#121214'}}  size="sm" onClick={updateProfile}>
                  <Pencil />
                  Editar Perfil
                </Button>
              </PanelProfile>
            </div>
          <Consultas>
            <Heading>Suas consultas:</Heading>
            {schedulings ? (
              schedulings.map((scheduling) => (
                <div key={scheduling.id}>
                  <Text>
                    Data da consulta:{" "}
                    {new Date(scheduling.date).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                  <Text>Consulta:{scheduling.observations}</Text>
                </div>
              ))
            ) : (
              <Text>Você ainda não possui agendamentos.</Text>
            )}
          </Consultas>
          <DoctorHeader>
            <ProfilePhoto src={user.profileImgUrl} />
            <Heading>Dental Clinic</Heading>
            <Text>{user.bio}</Text>
            <Text>{user.email}</Text>
          </DoctorHeader>
        </UserHeader>
        <ScheduleForm />
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
      </Container>
      <ToastContainer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )
  console.log(session)
  const email = env.NEXT_EMAIL

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return { notFound: true };
  }

  return {
    props: {
      user: {
        email: user.email,
        name: user.name,
        bio: user.bio,
        profileImgUrl: user.profile_img_url,
      },
      session,
    },
  };
};
