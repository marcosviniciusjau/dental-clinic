/* eslint-disable react-hooks/rules-of-hooks */
import { NextApiRequest, NextApiResponse, NextPageContext } from 'next'
import { Adapter } from 'next-auth/adapters'
import { prisma } from '../prisma'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { env } from '@/env/env'

export function PrismaAdapter(
  req: NextApiRequest | NextPageContext['req'],
  res: NextApiResponse | NextPageContext['res'],
): Adapter {
  return {
    async createUser(user) {
      const { 'dental-clinic:client': userIdOnCookies } = parseCookies({ req })

      if (!userIdOnCookies) {
        throw new Error('User not found on cookies.')
      }
      if (user.email === env.NEXT_EMAIL) {
        await prisma.user.update({
          where: {
            id: userIdOnCookies,
          },
          data: {
            name: user.name,
            email: user.email,
            is_admin: true,
            profile_img_url: user.profile_img_url,
          },
        })
      }
      const prismaUser = await prisma.user.update({
        where: {
          id: userIdOnCookies,
        },
        data: {
          name: user.name,
          email: user.email,
          profile_img_url: user.profile_img_url,
        },
      })

      destroyCookie({ res }, 'dental-clinic:userId', {
        path: '/',
      })

      return {
        id: prismaUser.id,
        name: prismaUser.name,
        email: prismaUser.email!,
        is_admin: prismaUser.is_admin,
        emailVerified: null,
        profile_img_url: prismaUser.profile_img_url!,
      }
    },

    async getUser(id) {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          is_admin: true,
          profile_img_url: true
        }
      })

      if (!user) {
        return null
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email!,
        is_admin: user.is_admin,
        emailVerified: null,
        profile_img_url: user.profile_img_url!,
      }
    },
    async getUserByEmail(email) {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
          name: true,
          email: true,
          is_admin: true,
          profile_img_url: true
        }
      })

      if (!user) {
        return null
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email!,
        emailVerified: null,
        is_admin: user.is_admin,
        profile_img_url: user.profile_img_url!,
      }
    },
    async getUserByAccount({ providerAccountId, provider }) {
      const account = await prisma.account.findUnique({
        where: {
          provider_provider_account_id: {
            provider,
            provider_account_id: providerAccountId,
          },
        },
        include: {
          user: true,
        },
      })
      if (!account) {
        return null
      }

      const { user } = account

      return {
        id: user.id,
        name: user.name,
        email: user.email!,
        is_admin: user.is_admin,
        emailVerified: null,
        profile_img_url: user.profile_img_url!,
      }
    },

    async updateUser(user) {
      const prismaUser = await prisma.user.update({
        where: {
          id: user.id!,
        },
        data: {
          name: user.name,
          email: user.email,
          profile_img_url: user.profile_img_url,
        },
      })

      return {
        id: prismaUser.id,
        name: prismaUser.name,
        email: prismaUser.email!,
        emailVerified: null,
        profile_img_url: prismaUser.profile_img_url!,
      }
    },

    async linkAccount(account) {
      await prisma.account.create({
        data: {
          user_id: account.userId,
          type: account.type,
          provider: account.provider,
          provider_account_id: account.providerAccountId,
          refresh_token: account.refresh_token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          token_type: account.token_type,
          scope: account.scope,
          id_token: account.id_token,
          session_state: account.session_state,
        },
      })
    },

    async createSession({ sessionToken, userId, expires }) {
      await prisma.session.create({
        data: {
          user_id: userId,
          expires,
          session_token: sessionToken,
        },
      })

      return {
        userId,
        sessionToken,
        expires,
      }
    },

    async getSessionAndUser(sessionToken) {
      const { 'dental-clinic:client': userIdOnCookies } = parseCookies({ req })

      const prismaSession = await prisma.session.findUnique({
        where: {
          session_token: sessionToken,
        },
        include: {
          user: true,
        },
      })
      // eslint-disable-next-line react-hooks/rules-of-hooks

      const currentDate = dayjs().startOf('day');
      const nextWeek = currentDate.add(1, 'week');
      if (!prismaSession) {
        return null
      }

      const { user, ...session } = prismaSession
      return {
        session: {
          userId: session.user_id,
          expires: session.expires,
          sessionToken: session.session_token,
        },
        user: {
          id: user.id,
          name: user.name,
          email: user.email!,
          is_admin: user.is_admin,
          emailVerified: null,
          profile_img_url: user.profile_img_url!,
        },
      }
    },

    async updateSession({ sessionToken, userId, expires }) {
      const prismaSession = await prisma.session.update({
        where: {
          session_token: sessionToken,
        },
        data: {
          expires,
          user_id: userId,
        },
      })
      return {
        sessionToken: prismaSession.session_token,
        userId: prismaSession.user_id,
        expires: prismaSession.expires,
      }
    },

    async deleteSession(sessionToken) {
      await prisma.session.delete({
        where: {
          session_token: sessionToken,
        },
      })
    },
  }
}
