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
import { prisma } from "@/lib/prisma";
import { ScheduleForm } from "./ScheduleForm";
import { NextSeo } from "next-seo";
import { Header } from "@/pages/home/components/Header";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { useState } from "react";
import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

import { destroyCookie } from "nookies";
import { Clock, Door, Pencil, Trash } from "phosphor-react";
import { signOut, useSession } from "next-auth/react";
import { env } from "@/env/env";
import { AxiosError } from "axios";
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
  const session = useSession();
  const isSignedId = session.status === "authenticated";
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const [openIndexProfile, setOpenIndexProfile] = useState<number | null>(null);

  const toggleAccordionProfile = (indexProfile: number) => {
    setOpenIndexProfile(
      openIndexProfile === indexProfile ? null : indexProfile
    );
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

  async function timeIntervals() {
    router.push("/register/time-intervals");
  }

  function logout() {
    try {
      destroyCookie(null, "dental-clinic+:client", {
        path: "/",
      });
      signOut({ redirect: false });

      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteAccount() {
    try {
      const confirm = window.confirm(
        "Tem certeza que deseja excluir sua conta?"
      );
      if (!confirm) return;

      const response = await api.delete("/users/delete-account");
      if (response.status === 200) {
        toast.success("Conta excluída com sucesso!");
        destroyCookie(null, "dental-clinic+:client", {
          path: "/",
        });

        router.replace("/");
      }
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        toast.error(err.response.data.message);
        return;
      }

      console.error(err);
    }
  }

  return (
    <>
      <NextSeo title={`Agendar com ${"Dental Clinic+"}| Dental Clinic+`} />

      <Header />
      {isSignedId ? (
        <Container>
          <UserHeader>
            <div key={session.data.user?.id}>
              <ProfileHeader onClick={() => toggleAccordionProfile(1)}>
                <Text size="sm">{session.data.user?.name}</Text>
              </ProfileHeader>
              <PanelProfile isOpen={openIndexProfile === 1}>
                <Text size="sm">{session.data?.user.email}</Text>
                {session.data.user?.email === env.NEXT_EMAIL_OWNER && (
                  <Button
                    style={{ background: "#007BFF" }}
                    size="sm"
                    onClick={timeIntervals}
                  >
                    <Clock />
                    Gerenciar horários
                  </Button>
                )}
                <Button
                  style={{ background: "#007BFF" }}
                  size="sm"
                  onClick={updateProfile}
                >
                  <Pencil />
                  Editar Perfil
                </Button>
                <Button
                  style={{ background: "#ff0606" }}
                  size="sm"
                  onClick={deleteAccount}
                >
                  <Trash />
                  Excluir conta
                </Button>

                <Button
                  style={{ background: "#121214" }}
                  size="sm"
                  onClick={logout}
                >
                  <Door />
                  Sair
                </Button>
              </PanelProfile>
            </div>
            <Consultas key={session.data.user?.name}>
              <Heading>Suas consultas:</Heading>
              {schedulings && schedulings.length > 0 ? (
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
              <Heading>Dental Clinic+</Heading>
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
      ) : (
        <>
          <NextSeo title="Não autorizado | Dental Clinic+" noindex />

          <ContainerLogin>
            <Heading>Você precisa fazer login para acessar essa página</Heading>
            <a href="/sign-in" style={{ textDecoration: "none" }}>
              <Button>Fazer Login</Button>
            </a>
          </ContainerLogin>
        </>
      )}

      <ToastContainer />
    </>
  );
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const email = env.NEXT_EMAIL_OWNER;

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
    },
    revalidate: 60 * 60 * 24,
  };
};
