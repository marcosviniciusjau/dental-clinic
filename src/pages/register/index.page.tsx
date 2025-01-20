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
import Cookies from "js-cookie";

import { ToastContainer, toast } from "react-toastify";
import { setCookie } from "nookies";
import { hash } from "bcryptjs";
import { env } from "@/@types/env";
const registerFormSchema = z.object({
  email: z.string().email({ message: "Digite um e-mail válido" }),
  name: z.string().min(3, { message: "Mínimo 3 caracteres" }),
  password: z.string().min(6, { message: "Mínimo 6 caracteres" }),
});

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  const router = useRouter();
  const emailOwner = env.NEXT_PUBLIC_EMAIL;
  useEffect(() => {
    if (router.query.email) {
      setValue("email", String(router.query.email));
    }
  }, [router.query?.email, setValue]);

  async function handleRegister(data: RegisterFormData) {
    try {
      const passwordHashed = await hash(data.password, 6);
      const response = await api.post("/users", {
        name: data.name,
        email: data.email,
        password: passwordHashed,
      });
      if (data.email !== emailOwner) {
        await router.push(`/schedule/${emailOwner}`);
      } else {
        await router.push("/register/connect-calendar");
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
      <NextSeo title="Crie uma conta | Dental Clinic" />

      <Container>
        <Header>
          <Heading as="strong">Bem-vindo a Dental Clinic!</Heading>
          <Text>
            Precisamos de algumas informações para criar seu perfil! Ah, você
            pode editar essas informações depois.
          </Text>
          <MultiStep size={2} currentStep={1} />
        </Header>

        <Form as="form" onSubmit={handleSubmit(handleRegister)}>
          <label>
            <Text size="sm">Nome completo</Text>
            <TextInput placeholder="Seu nome" {...register("name")} />
            {errors.name && (
              <FormError size="sm">{errors.name.message}</FormError>
            )}
          </label>
          <label>
            <Text size="sm">Seu email</Text>
            <TextInput placeholder="Seu email" {...register("email")} />
            {errors.email && (
              <FormError size="sm">{errors.email.message}</FormError>
            )}
          </label>
          <label>
            <Text size="sm">Senha</Text>
            <TextInput placeholder="Senha" {...register("password")} />
            {errors.password && (
              <FormError size="sm">{errors.password.message}</FormError>
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
