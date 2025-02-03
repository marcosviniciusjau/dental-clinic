import { NextApiRequest, NextApiResponse, NextPageContext } from 'next'
import { Adapter, VerificationToken } from 'next-auth/adapters'
import { parseCookies, destroyCookie } from 'nookies'
import { prisma } from '../prisma'
import { authConfig } from '@/configs/auth'
import { AppError } from '@/utils/app-error'

export function PrismaAdapter(
  req: NextApiRequest | NextPageContext['req'],
  res: NextApiResponse | NextPageContext['res'],
): Adapter {
  debugger
  return {
    async createUser(user) {
      const { 'dental-clinic:client': userIdOnCookies } = parseCookies({ req })
      if (!userIdOnCookies) {
        throw new Error('User ID not found on cookies.')
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

      destroyCookie({ res }, 'dental-clinic:client', {
        path: '/',
      })

      return {
        id: prismaUser.id,
        name: prismaUser.name,
        email: prismaUser.email!,
        emailVerified: null,
        profile_img_url: prismaUser.profile_img_url!,
      }
    },
    async getUser(id) {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      })

      if (!user) {
        return null
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email!,
        emailVerified: null,
        profile_img_url: user.profile_img_url!,
      }
    },
    async getUserByEmail(email) {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (!user) {
        console.error('User not found')
        return null
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email!,
        emailVerified: null,
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
        emailVerified: null,
        profile_img_url: user.profile_img_url!,
      }
    },
    async createVerificationToken(verificationToken){
      const user = await prisma.user.findUnique({
        where: {
          email:verificationToken.identifier,
        },
      })

      if (!user) {
        console.error('User not found')
        return null
      }

      const token = await prisma.verificationRequest.create({
        data: {
          identifier: verificationToken.identifier,
          token: verificationToken.token,
          expires: verificationToken.expires,
        },
      });
      return token;
    },
    async useVerificationToken({identifier, token} ){
      const verificationToken = await prisma.verificationRequest.findUnique({
        where: { token },
      });
    
      if (!verificationToken || verificationToken.identifier !== identifier) {
        return null; 
      }
    
      await prisma.verificationRequest.delete({
        where: { token },
      });
    
      return verificationToken;
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
      const prismaSession = await prisma.session.findUnique({
        where: {
          session_token: sessionToken,
        },
        include: {
          user: true,
        },
      })
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
