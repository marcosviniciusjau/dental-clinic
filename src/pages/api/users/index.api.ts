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

  const { name, email } = req.body

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    }
  })

  if (userExists) {
    return res
      .status(400)
      .json({ message: 'Ocorreu um erro ao cadastrar. Tente novamente.' })
  }

  const user = await prisma.user.create({
    data: {
      name,
      username: "user" + Math.floor(Math.random() * 1000),
      email
    },
  })

  setCookie({ res }, 'dental-clinic:client', user.id, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })

  return res.status(201).json(user)
}
