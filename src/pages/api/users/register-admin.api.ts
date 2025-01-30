import { env } from '@/env/env'
import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'nookies'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { name, username } = req.body

  const userExists = await prisma.user.findUnique({
    where: {
      username,
    }
  })

  if (userExists) {
    return res
      .status(400)
      .json({ message: 'Ocorreu um erro ao cadastrar. Tente novamente.' })
  }

  if (username != env.NEXT_USERNAME) {
    return res
      .status(401)
      .json({ message: 'Não autorizado!' })
  }

  const user = await prisma.user.create({
    data: {
      name,
      username,
      email: '',
      is_admin: true
    },
  })

  setCookie({ res }, 'dental-clinic:client', user.id, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })

  return res.status(201).json(user)
}
