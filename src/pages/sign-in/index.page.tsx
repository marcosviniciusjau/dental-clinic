import { Form, FormError, Container } from "./styles";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Button,
  Heading,
  Text,
  TextInput,
} from "@marcos-vinicius-design-system/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/axios";
import { useRouter } from "next/router";
import { Header } from "../home/components/Header";
import { env } from "@/env/env";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { AxiosError } from "axios";
import { AuthError } from "../register/connect-calendar/styles";
import { startTransition, useEffect } from "react";
import { redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const SignInFormSchema = z.object({
  email: z.string().email({ message: "Digite um e-mail válido" }),  
   password: z
  .string()
  .min(6, { message: "Mínimo 6 caracteres" })
  .regex(/[A-Z]/, { message: "Deve conter ao menos uma letra maiúscula" })
  .regex(/[a-z]/, { message: "Deve conter ao menos uma letra minúscula" })
  .regex(/[0-9]/, { message: "Deve conter ao menos um número" })
  .regex(/[^a-zA-Z0-9]/, {
    message: "Deve conter ao menos um caractere especial (!@#$%^&*)",
  })
});

type SignInFormData = z.infer<typeof SignInFormSchema>;

export default function SignIn() {
  const router = useRouter();
  const session = useSession();
  console.log(session)
  const emailOwner = env.NEXT_EMAIL_OWNER;
  const hasAuthError = !!router.query.error;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(SignInFormSchema),
  });
  async function handleSignIn(data: SignInFormData) {
    try {
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: `/schedule/${emailOwner}`,
      });
    } catch (error) {
      toast.error("Erro ao fazer login, tente novamente");
    }
  }

  return (
    <Container>
      <Header />
      <ToastContainer />
      <Form as="form" onSubmit={handleSubmit(handleSignIn)}>
        <Heading>Fazer Login</Heading>
        {hasAuthError && <AuthError size="sm">Email ou senha inválidos</AuthError>}
        <label>
          <Text size="sm">Seu email</Text>
          <TextInput placeholder="Seu email" {...register("email")} />
          {errors.email && (
            <FormError size="sm">{errors.email.message}</FormError>
          )}
        </label>

        <label>
          <Text size="sm">Senha</Text>
          <TextInput
            placeholder="Senha"
            {...register("password")}
            type="password"
          />
          {errors.password && (
            <FormError size="sm">{errors.password.message}</FormError>
          )}
        </label>
        <ToastContainer />
        <Button type="submit" disabled={isSubmitting}>
          Fazer login
        </Button>
      </Form>
    </Container>
  );
}
