import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { parseCookies } from 'nookies'
const updateProfileBodySchema = z.object({
  bio: z.string(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }
  const { 'dental-clinic:client': userIdOnCookies } = parseCookies({ req })

  const scheduling = await prisma.$queryRaw`SELECT 
  schedulings.id AS scheduling_id,
  schedulings.date,
  schedulings.observations AS observations,
  users.id AS user_id,
  users.email AS user_email
FROM 
  schedulings
INNER JOIN 
  users
ON 
  schedulings.email = users.email
WHERE 
  users.id = ${userIdOnCookies};`
  return res.status(200).send(scheduling)
}
