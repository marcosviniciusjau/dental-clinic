import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Text,
  TextArea,
  TextInput,
} from '@marcos-vinicius-design-system/react'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { CalendarBlank, Clock } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '@/src/lib/axios'
import { ConfirmForm, FormActions, FormError, FormHeader } from './styles'

import Cookies from 'js-cookie'
import { ToastContainer, toast } from 'react-toastify';
import { useCallback } from 'react'

const confirmFormSchema = z.object({
  name: z.string().min(3, { message: 'O nome precisa no mínimo 3 caracteres' }),
  email: z.string().email({ message: 'Digite um e-mail válido' }),
  observations: z.string().nullable(),
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>

interface ConfirmStepProps {
  schedulingDate: Date
  onCancelConfirmation: () => void
}

export function ConfirmStep({
  schedulingDate,
  onCancelConfirmation,
}: ConfirmStepProps) {
  const router = useRouter()
  const emailOwner = String(router.query.email)
  const cookie = Cookies.get('@dentalclinic:newClient')
  if(!cookie){
    return 403
  }
  const clientData = JSON.parse(cookie);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm<ConfirmFormData>({
    defaultValues: {
      name: clientData.name,
      email: clientData.email,
      observations: '',
    },
    resolver: zodResolver(confirmFormSchema),
  })

  async function handleConfirmScheduling(data: ConfirmFormData) {
      const { name, email, observations } = data

      try{
        const response = await api.post(`/users/${emailOwner}/schedule`, {
        name,
        email,
        observations,
        date: schedulingDate,
      })
      toast.success('Agendamento realizado com sucesso!')
      router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  const describedDate = dayjs(schedulingDate).format('DD[ de ]MMMM[ de ]YYYY')
  const describedTime = dayjs(schedulingDate).format('HH:mm[h]')

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          {describedDate}
        </Text>
        <Text>
          <Clock />
          {describedTime}
        </Text>
      </FormHeader>

      <label>
        <Text size="sm">Nome completo</Text>
        <TextInput placeholder="Seu nome" {...register('name')} />
        {errors.name && <FormError size="sm">{errors.name.message}</FormError>}
      </label>

      <label>
        <Text size="sm">Endereço de e-mail</Text>
        <TextInput
          type="email"
          placeholder="johndoe@example.com"
          {...register('email')}
        />
        {errors.email && (
          <FormError size="sm">{errors.email.message}</FormError>
        )}
      </label>

      <label>
        <Text size="sm">Observações</Text>
        <TextArea {...register('observations')} />
      </label>

      <FormActions>
        <Button type="button" variant="tertiary" onClick={onCancelConfirmation}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirmar
        </Button>
        
      <ToastContainer />
      </FormActions>
      
    </ConfirmForm>
  )
}
