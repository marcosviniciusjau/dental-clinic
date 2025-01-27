import {
  Button,
  TextInput,
  Text,
  Heading,
} from "@marcos-vinicius-design-system/react";
import { Container, Form, FormAnnotation, Imagem, Vazio } from "./styles";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import agenda from "@/assets/agenda.jpg";
import Image from "next/image";
import { FormError } from "@/pages/register/styles";

const emailFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Digite um e-mail válido" })
    .min(3, { message: "Mínimo 3 caracteres" }),
});

type UserFormData = z.infer<typeof emailFormSchema>;
export function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(emailFormSchema),
  });

  const router = useRouter();
  async function handlePreRegister(data: UserFormData) {
    const { email } = data;

    await router.push(`/register?email=${email}`);
  }

  return (
    <Container>
      <Imagem>
        <Image
          src={agenda}
          height={300}
          quality={100}
          alt="Imagem de wavebreakmedia_micro no Freepik"
        />
      </Imagem>
      <Vazio></Vazio>

      <Form as="form" onSubmit={handleSubmit(handlePreRegister)}>
        <Heading>
          Preparado para ter o melhor sorriso?
          <br/>
          Agende agora mesmo!
        </Heading>
        <label>Digite seu email para começar</label>
        <TextInput
          containerProps={{ size: "sm" }}
          placeholder="seu-email"
          {...register("email")}
        />
        <Button size="sm" type="submit" disabled={isSubmitting}>
          Reservar
          <ArrowRight />
        </Button>
        <FormAnnotation>
          <Text size="sm">
            {errors.email && (
              <FormError size="sm">{errors.email.message}</FormError>
            )}
          </Text>
        </FormAnnotation>
      </Form>
    </Container>
  );
}
