import { zodResolver } from '@hookform/resolvers/zod'
import { DialogDescription } from '@radix-ui/react-dialog'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { useSession } from 'next-auth/react'
import { api } from '@/lib/axios'
import router from 'next/router'
import { env } from '@/env/env'
import { FormAnnotation, ProfileBox } from '@/pages/register/update-profile/styles'
import { TextArea, Text, Button } from '@marcos-vinicius-design-system/react'
import { ToastContainer } from 'react-toastify'

const storeProfileSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
})

type StoreProfileSchema = z.infer<typeof storeProfileSchema>
export function UpdateProfileDialog() {
  const queryClient = useQueryClient()
  const emailOwner = env.NEXT_EMAIL_OWNER
  const session = useSession()
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: session.data?.user.name ?? '',
      email: session.data?.user.email ?? '',
    },
  })

  async function handleUpdateProfile(data: StoreProfileSchema) {
    try {
      await api.put("/users/update-profile", {
        name: data.name,
        email: data.email,
      });
      session.update(data)
      toast.success("Perfil atualizado com sucesso!");
      await router.push(`/schedule/${emailOwner}`);

      toast.success('Perfil atualizado com sucesso')
    } catch (error) {
      toast.error('Erro ao atualizar perfil')
    }
  }
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Seu perfil</DialogTitle>
      </DialogHeader>
      <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
            <label>
              <Text size="sm">Nome</Text>
              <TextArea {...register("name")} />
              <FormAnnotation size="sm"></FormAnnotation>
            </label>
            <label>
              <Text size="sm">Email</Text>
              <TextArea {...register("email")} />
              <FormAnnotation size="sm"></FormAnnotation>
            </label>
            
            <ToastContainer />
          </ProfileBox>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" disabled={isSubmitting}>
            Salvar
          </Button>
        </DialogFooter>
    </DialogContent>
  )
}
