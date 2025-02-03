import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'nookies'

import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'

import { destroyCookie } from 'nookies'
import { signOut } from 'next-auth/react'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'DELETE') {
    return res.status(405).end()
  }
 
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )
  if (!session) {
    return res.status(401).end()
  }

  const user = await prisma.user.delete({
    where:{
      id: session.user.id
    }
  })
  if(!user){
    return res.status(400).json({ message: 'Ocorreu um erro ao deletar o usuário. Tente novamente.' })
  }
  return res.status(200).json(user)
}
