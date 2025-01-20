import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { parseCookies } from 'nookies'
import { FastForwardCircle } from 'phosphor-react'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }
  const { 'dental-clinic:client': userIdOnCookies } = parseCookies({ req })

  const user = await prisma.$queryRaw`SELECT name, email FROM users WHERE id = ${userIdOnCookies}`

  return res.status(200).send(user)
}
