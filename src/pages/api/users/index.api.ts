import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'nookies'

import { sign } from "jsonwebtoken"
import { authConfig } from '@/configs/auth'
import dayjs from 'dayjs'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { name, email, password } = req.body

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      name: false,
      email: true,
      password: false,
      created_at: false,
      bio: false,
      profile_img_url: false
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
      email,
      password
    },
  })

  const { secret, expiresIn } = authConfig.jwt

  const token = sign({}, secret, {
    subject: String(user.id),
    expiresIn
  })

  const currentDate = dayjs().startOf('day')
  const nextWeek = currentDate.add(1, 'week')
  const userJSON = JSON.stringify(user)

  setCookie({ res }, 'dental-clinic:token', token, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })
  
  setCookie({ res }, 'dental-clinic:client', userJSON, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })

  await prisma.session.create({
    data: {
      user_id: user.id,
      session_token: token,
      expires: nextWeek.toDate()
    },
  })

  return res.status(201).json(user)
}
