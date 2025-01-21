import { Form, FormError, Container } from "./styles";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Text, TextInput } from "@marcos-vinicius-design-system/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/axios";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { Header } from "../home/components/Header";
import { env } from "@/env/env";

const SignInFormSchema = z.object({
  email: z.string().email({ message: "Digite um e-mail válido" }),
  password: z.string().min(6, { message: "Mínimo 6 caracteres" }),
});

type SignInFormData = z.infer<typeof SignInFormSchema>;

export default function SignIn() {
  const router = useRouter();

  const emailOwner = env.NEXT_EMAIL;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(SignInFormSchema),
  });

  async function handleSignIn(data: SignInFormData) {
    try {
      await api.post("/users/sign-in", data);

      await router.push(`/schedule/${emailOwner}`);
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        toast.error(err.response.data.message);
        return;
      }

      console.error(err);
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
      </Form>
    </Container>
  );
}
