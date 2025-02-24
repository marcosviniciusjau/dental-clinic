import {
  Button,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from "@marcos-vinicius-design-system/react";
import { Container, Form, FormError, Header } from "./styles";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "phosphor-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { api } from "@/lib/axios";
import { AxiosError } from "axios";
import { NextSeo } from "next-seo";

import { Header as HeaderHome } from "@/pages/home/components/Header";
import { ToastContainer, toast } from "react-toastify";
import { hash } from "bcryptjs";
import { env } from "@/env/env";
const registerFormSchema = z.object({
  name: z.string().min(3, { message: "Mínimo 3 caracteres" }),
  username: z.string().min(3, { message: "Mínimo 3 caracteres" }),
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function RegisterAdmin() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const router = useRouter();

  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post("/users/register-admin", {
        username: data.username,
        name: data.name,
      });
      await router.push("/register/connect-calendar");
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
      <NextSeo title="Crie uma conta de Administrador | Dental Clinic+" />

      <HeaderHome />
      <Container>
        <Header>
          <Heading as="strong">Bem-vindo a Dental Clinic+!</Heading>
          <Text>
            Precisamos de algumas informações para criar seu perfil! Ah, você
            pode editar essas informações depois.
          </Text>
          <MultiStep size={4} currentStep={1} />
        </Header>

        <Form as="form" onSubmit={handleSubmit(handleRegister)}>
          <label>
            <Text size="sm">Nome de usuário</Text>
            <TextInput
              placeholder="Seu nome de usuário"
              {...register("username")}
            />
            {errors.username && (
              <FormError size="sm">{errors.username.message}</FormError>
            )}
          </label>
          <label>
            <Text size="sm">Nome completo</Text>
            <TextInput placeholder="Seu nome" {...register("name")} />
            {errors.name && (
              <FormError size="sm">{errors.name.message}</FormError>
            )}
          </label>
          <Button type="submit" disabled={isSubmitting}>
            Próximo passo
            <ArrowRight />
          </Button>
        </Form>
        <ToastContainer />
      </Container>
    </>
  );
}
