import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession, unstable_getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { parseCookies } from 'nookies'

const updateProfileBodySchema = z.object({
  name: z.string(),
  bio: z.string(),
  email: z.string().email(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'PUT') {
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
  const { name,email,bio } = updateProfileBodySchema.parse(req.body)

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      name,
      email,
      bio
    },
  })
  return res.status(204).end()
}
