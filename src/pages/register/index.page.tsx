import {
  Button,
  Heading,
  MultiStep,
  Text,
  TextInput,
} from '@marcosvinicius-ignite-ui/react'
import { Container, Form, FormError, Header } from './styles'

import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { ArrowRight } from 'phosphor-react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { api } from '@/src/lib/axios'
import { AxiosError } from 'axios'
import { NextSeo } from 'next-seo'
import InputMask from 'react-input-mask'

const phoneNumberRegex = /^\(?\d{2}\)? ?9?\d{4}-?\d{4}$/

const registerFormSchema = z.object({
  email: z.string().email({ message: 'Digite um e-mail válido' }),
  phone_number: z.string().regex(phoneNumberRegex, {
    message: 'Número de telefone inválido',
  }),
  name: z.string().min(3, { message: 'Mínimo 3 caracteres' }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register() {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  const router = useRouter()

  useEffect(() => {
    if (router.query.email) {
      setValue('email', String(router.query.email))
    }
  }, [router.query?.email, setValue])

  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post('/users', {
        name: data.name,
        phone_number: data.phone_number,
        email: data.email,
      })
      if (data.email === 'mvaraujowebsites@gmail.com') {
        await router.push('/register/connect-calendar')
      }
      await router.push(`/schedule/mvaraujowebsites@gmail.com`)
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        alert(err.response.data.message)
        return
      }
      console.error(err)
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
            <TextInput placeholder="Seu nome" {...register('name')} />
            {errors.name && (
              <FormError size="sm">{errors.name.message}</FormError>
            )}
          </label>
          <label>
            <Text size="sm">Telefone</Text>
            <Controller
              name="phone_number"
              control={control}
              render={({ field }) => (
                <InputMask
                  mask="(99) 99999-9999"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                >
                  {(inputProps) => (
                    <TextInput
                      prefix="+55"
                      placeholder="(99) 99999-9999"
                      type="tel"
                      {...inputProps}
                    />
                  )}
                </InputMask>
              )}
            />
            {errors.phone_number && (
              <FormError size="sm">{errors.phone_number.message}</FormError>
            )}
          </label>
          <label>
            <Text size="sm">Seu email</Text>
            <TextInput placeholder="Seu email" {...register('email')} />
            {errors.email && (
              <FormError size="sm">{errors.email.message}</FormError>
            )}
          </label>
          <Button type="submit" disabled={isSubmitting}>
            Próximo passo
            <ArrowRight />
          </Button>
        </Form>
      </Container>
    </>
  )
}
