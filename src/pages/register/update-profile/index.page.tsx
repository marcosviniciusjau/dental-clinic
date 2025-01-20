/* eslint-disable react-hooks/rules-of-hooks */
import {
  Button,
  Heading, Text,
  TextArea
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
import { ClientProps } from "@/pages/schedule/[email]/index.page";
import { get, set } from "local-storage";
import { env } from "@/env/env";

import { ToastContainer, toast } from "react-toastify";
const updateProfileSchema = z.object({
  name: z.string().min(2),
  email: z.string().email()
});

type UpdateProfileData = z.infer<typeof updateProfileSchema>;

export default function updateProfile() {
 let clientStorage = get('client')
 const emailOwner = env.NEXT_PUBLIC_EMAIL
 if(!clientStorage){
   return (
     <ContainerLogin>
     <Heading>Você precisa fazer login para acessar essa página</Heading>
     <a href="/sign-in" style={{textDecoration:'none'}}><Button>Fazer Login</Button></a>
     </ContainerLogin>
   )
 }

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: clientStorage[0].name,
      email: clientStorage[0].email,
    },
  });

  async function handleUpdateProfile(data: UpdateProfileData) {
    const response = await api.put("/users/update-profile", {
      name: data.name,
      email: data.email
    });
    const clientToStorage = response.data
    if(clientStorage != clientToStorage){
      clientStorage = set('client', clientToStorage) as unknown
    }

    toast.success("Perfil atualizado com sucesso!");
    await router.push(`/schedule/${emailOwner}`);	
  }

  return (
    <>
      <NextSeo title="Atualize seu perfil | Dental Clinic" noindex />

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
    </>
  );
}