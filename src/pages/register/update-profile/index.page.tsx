/* eslint-disable react-hooks/rules-of-hooks */
import {
  Button,
  Heading,
  Text,
  TextArea,
} from "@marcos-vinicius-design-system/react";
import { Container, Header } from "../styles";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { ArrowRight } from "phosphor-react";
import { ProfileBox, FormAnnotation } from "./styles";
import { api } from "@/lib/axios";
import router from "next/router";

import { NextSeo } from "next-seo";
import { ContainerLogin } from "@/pages/schedule/[email]/styles";
import { env } from "@/env/env";

import { useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { ToastContainer, toast } from "react-toastify";
import { buildNextAuthOptions } from "@/pages/api/auth/[...nextauth].api";
const updateProfileSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  bio: z.string(),
});

type UpdateProfileData = z.infer<typeof updateProfileSchema>;

export default function updateProfile() {
  const session = useSession();
  const emailOwner = env.NEXT_EMAIL_OWNER;
  const isSignedId = session.status === "authenticated";

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: session.data?.user.name,
      email: session.data?.user.email,
    },
  });

  async function handleUpdateProfile(data: UpdateProfileData) {
    await api.put("/users/update-profile", {
      name: data.name,
      bio: data.bio,
      email: data.email,
    });
    session.update(data);
    toast.success("Perfil atualizado com sucesso!");
    await router.push(`/schedule/${emailOwner}`);
  }

  return (
    <>
      <NextSeo title="Atualize seu perfil | Dental Clinic+" noindex />
      {isSignedId ? (
        <Container>
          <Header>
            <Heading as="strong">Editar Perfil</Heading>
          </Header>

          <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
            <label>
              <Text size="sm">Nome</Text>
              <TextArea {...register("name")} />
              <FormAnnotation size="sm"></FormAnnotation>
            </label>
            {session.data.user.email === env.NEXT_EMAIL_OWNER && (
              <label>
                <Text size="sm">Bio</Text>
                <TextArea {...register("bio")} />
                <FormAnnotation size="sm"></FormAnnotation>
              </label>
            )}

            <label>
              <Text size="sm">Email</Text>
              <TextArea {...register("email")} />
              <FormAnnotation size="sm"></FormAnnotation>
            </label>
            <Button type="submit" disabled={isSubmitting}>
              Finalizar
              <ArrowRight />
            </Button>

            <ToastContainer />
          </ProfileBox>
        </Container>
      ) : (
        <ContainerLogin>
          <Heading>Você precisa fazer login para acessar essa página</Heading>
          <a href="/sign-in" style={{ textDecoration: "none" }}>
            <Button>Fazer Login</Button>
          </a>
        </ContainerLogin>
      )}
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res)
  );

  return {
    props: {
      session,
    },
  };
};
