import { Form, FormError, Container } from "./styles";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Text, TextInput } from "@marcos-vinicius-design-system/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/axios";
import { useRouter } from "next/router";
import { Header } from "../home/components/Header";
import { env } from "@/env/env";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { AxiosError } from "axios";
import { ToastContainer, toast } from "react-toastify";
const SignInFormSchema = z.object({
  email: z.string().email({ message: "Digite um e-mail válido" }),
  password: z.string().min(6, { message: "Mínimo 6 caracteres" }),
});

type SignInFormData = z.infer<typeof SignInFormSchema>;


export default function SignIn() {
  const router = useRouter();
  const session = useSession()
  console.log(session)
  const emailOwner = env.NEXT_EMAIL;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(SignInFormSchema),
  });
  if(session.status === 'authenticated'){
     router.push(`/schedule/${emailOwner}`);
    }
  async function handleSignIn(data: SignInFormData) {
    try {
    await signIn("credentials", {
        email: data.email,
        password: data.password,
      }); 
     
    } catch (error) {
      console.error(error)
    }
   
    }
    
  return (
    <Container>
      <Header />
      <Form as="form" onSubmit={handleSubmit(handleSignIn)}>
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
        <Button type="submit" disabled={isSubmitting}>
          Fazer login
        </Button>
        <ToastContainer/>
      </Form>
    </Container>
  );
}
