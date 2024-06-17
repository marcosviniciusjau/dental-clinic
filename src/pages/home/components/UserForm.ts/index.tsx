import { Button, TextInput, Text } from '@marcosvinicius-ignite-ui/react'
import { Form, FormAnnotation } from './styles'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
const userNameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Mínimo 3 caracteres' })
    .regex(/^([a-z\\\\-]+)$/i, { message: 'Apenas letras e hifens' })
    .transform((username) => username.toLowerCase()),
})

type UserFormData = z.infer<typeof userNameFormSchema>
export function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userNameFormSchema),
  })

  function handlePreRegister(data: UserFormData) {
    console.log(data.username)
  }
  return (
    <Form as="form" onSubmit={handleSubmit(handlePreRegister)}>
      <TextInput
        containerProps={{ size: 'sm' }}
        prefix="ignite.com/"
        placeholder="seu-usuario"
        {...register('username')}
      />
      <Button size="sm" type="submit">
        Reservar
        <ArrowRight />
      </Button>
      <FormAnnotation>
        <Text size="sm">
          {errors.username
            ? errors.username.message
            : 'Digite o nome do usuário'}
        </Text>
      </FormAnnotation>
    </Form>
  )
}
