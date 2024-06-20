import { CalendarBlank, Clock } from 'phosphor-react'
import { ConfirmForm, FormActions, FormError, FormHeader } from './styles'
import {
  Button,
  Text,
  TextArea,
  TextInput,
} from '@marcosvinicius-ignite-ui/react'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const confirmFormSchema = z.object({
  name: z.string().min(3, { message: 'Mínimo 3 caracteres' }),
  email: z.string().email({ message: 'Formato de e-mail inválido' }),
  observations: z.string().nullable(),
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>
export function ConfirmStep() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmFormData>({
    resolver: zodResolver(confirmFormSchema),
  })

  function handleConfirmSchedule(data: ConfirmFormData) {
    console.log(data)
  }

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmSchedule)}>
      <FormHeader>
        <Text size="sm">
          <CalendarBlank /> 20 de março de 2022
        </Text>
        <Text size="sm">
          <Clock /> 18:00
        </Text>
      </FormHeader>
      <label>
        <Text size="sm">Nome completo</Text>
        <TextInput placeholder="Seu nome" {...register('name')} />
        {errors.name && <FormError size="sm">{errors.name.message}</FormError>}
      </label>
      <label>
        <Text size="sm">Endereço de e-mail</Text>
        <TextInput placeholder="seuemail@email" {...register('email')} />
        {errors.email && (
          <FormError size="sm">{errors.email.message}</FormError>
        )}
      </label>
      <label>
        <Text size="sm">Observações</Text>
        <TextArea />
      </label>
      <FormActions>
        <Button type="button" variant="tertiary">
          Cancelar
        </Button>

        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
      </FormActions>
    </ConfirmForm>
  )
}
