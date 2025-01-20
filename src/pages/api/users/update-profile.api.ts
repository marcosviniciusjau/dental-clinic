import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { parseCookies } from 'nookies'

const updateProfileBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'PUT') {
    return res.status(405).end()
  }
  const { 'dental-clinic:client': userIdOnCookies } = parseCookies({ req })

  const { name,email } = updateProfileBodySchema.parse(req.body)

  await prisma.user.update({
    where: {
      id: userIdOnCookies,
    },
    data: {
      name,
      email,
    },
  })
  return res.status(204).end()
}
