import { PrismaAdapter } from '@/lib/auth/prisma-adapter';
import { NextApiRequest, NextApiResponse, NextPageContext } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

import { prisma } from "@/lib/prisma";
import { AppError } from '@/utils/app-error';
import { compare } from 'bcryptjs';
import { authConfig } from '@/configs/auth';
import { sign } from 'jsonwebtoken';
import dayjs from 'dayjs';
import { setCookie } from 'nookies';
import { env } from '@/env/env';
export function buildNextAuthOptions(
  req: NextApiRequest | NextPageContext['req'],
  res: NextApiResponse | NextPageContext['res'],
): NextAuthOptions {
  const emailOwner = env.NEXT_EMAIL
  return {
    debug: true,
    adapter: PrismaAdapter(req, res),
    providers: [
      GoogleProvider({
        clientId: process.env.NEXT_GOOGLE_CLIENT_ID ?? '',
        clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET ?? '',

        authorization: {
          params: {
            prompt: 'consent',
            access_type: 'offline',
            response_type: 'code',
            scope:
              'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar',
          },
        },
        profile(profile: GoogleProfile) {
          return {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            profile_img_url: profile.picture,
          };
        },
      }),
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: 'Email', type: 'text' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
          try {
            console.log('Iniciando autenticação com credenciais:', credentials);

            if (!credentials?.email || !credentials?.password) {
              throw new Error('Email e senha são obrigatórios.');
            }

            const user = await prisma.user.findFirst({
              where: {
                email: credentials.email,
              },
            });

            if (!user) {
              throw new AppError('Email ou senha incorretos');
            }


            if (!user.password) {
              throw new AppError('Email ou senha incorretos');
            }

            const passwordMatch = await compare(credentials.password, user.password);
            if (!passwordMatch) {
              throw new AppError('Email ou senha incorretos');
            }

            const currentDate = dayjs().startOf('day');
            const nextWeek = currentDate.add(1, 'week');

            setCookie({ res }, 'dental-clinic:client', user.id, {
              maxAge: 60 * 60 * 24 * 7, // 7 days
              path: `/`,
              expires: nextWeek.toDate(),
            });

            return {
              id: user.id,
              email: user.email,
              name: user.name,
              profile_img_url: user.profile_img_url || '',
              is_admin: user.is_admin
            };
          } catch (error) {
            console.error('Erro na autenticação:', error);
            return null;
          }
        },
      })
    ],
    callbacks: {
      async signIn() {
        return true
      },
      async jwt({ token, user, account }) {
        if (account) {
          token.provider = account.provider; // Identifica o provedor usado
        }
        if (user) {
          token.id = user.id;
          token.email = user.email;
          token.name = user.name;
          if (account?.provider === 'credentials') {
            token.role = 'user'; // Por exemplo, definir um papel para o usuário
          }
        }
        return token;
      },

      async session({ session, user }) {
        return {
          ...session,
          user,
        }
        },
        
    },
    cookies: {
      sessionToken: {
        name: 'next-auth.session-token',
        options: {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', // HTTPS apenas em produção
          sameSite: 'lax', // Compatível com redirecionamentos internos
          path: '/', // Disponível em toda a aplicação
        },
      },
      
    },
    
    pages: {
      signIn: '/sign-in',
    },
  };
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, buildNextAuthOptions(req, res));
}

