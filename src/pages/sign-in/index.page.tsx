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
});

type SignInFormData = z.infer<typeof SignInFormSchema>;

export default function SignIn() {
  const router = useRouter();
  const session = useSession()
  const emailOwner = env.NEXT_EMAIL_OWNER
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
       await signIn("email",data, {callbackUrl: `/schedules/${emailOwner}`});
    } catch (error) {
      console.error(error);
      }
    }
    
  return (
    <Container>
      <Header />
      <ToastContainer/>
      <Form as="form" onSubmit={handleSubmit(handleSignIn)}>
        <Heading>Fazer Login</Heading>
        {hasAuthError && (
          <AuthError size="sm">Email ou senha incorretos</AuthError>
        )}
        <label>
          <Text size="sm">Seu email</Text>
          <TextInput placeholder="Seu email" {...register("email")} />
          {errors.email && (
            <FormError size="sm">{errors.email.message}</FormError>
          )}
        </label>
        <Button type="submit" disabled={isSubmitting}>
          Fazer login
        </Button>
      </Form>
    </Container>
  );
}
