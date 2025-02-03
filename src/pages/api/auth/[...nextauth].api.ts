import { NextApiRequest, NextApiResponse, NextPageContext } from 'next';
import NextAuth, { NextAuthOptions, Theme } from 'next-auth';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from '@/lib/auth/prisma-adapter';
import { env } from '@/env/env';
import { createTransport } from "nodemailer";
import { prisma } from '@/lib/prisma';
import { AppError } from '@/utils/app-error';
import { useRouter } from 'next/router';
import Error from 'next/error';
import { setCookie } from 'nookies';
import { compare } from 'bcryptjs';
import dayjs from 'dayjs';
import { AdapterUser } from 'next-auth/adapters';
export function buildNextAuthOptions(
  req: NextApiRequest | NextPageContext['req'],
  res: NextApiResponse | NextPageContext['res'],
): NextAuthOptions {
  debugger
  interface User {
    id: string;
    name: string;
    email: string;
    profile_img_url?: string;
    is_admin?: boolean;
  }
  return {
    adapter: PrismaAdapter(req, res),
    debug: true,
    providers: [
      GoogleProvider({
        clientId: env.NEXT_GOOGLE_CLIENT_ID ?? '',
        clientSecret: env.NEXT_GOOGLE_CLIENT_SECRET ?? '',
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
          }
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
            if (!credentials?.email || !credentials?.password) {
              throw new AppError('Email e senha são obrigatórios.');
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

            const passwordMatch = compare(credentials.password, user.password);
            if (!passwordMatch) {
              throw new AppError('Email ou senha incorretos');
            }

            const currentDate = dayjs().startOf('day');
            const nextWeek = currentDate.add(1, 'week');

            setCookie({ res }, 'dental-clinic:client', user.id, {
              maxAge: 60 * 60 * 24 * 7, // 7 days
              path: '/',
              expires: nextWeek.toDate(),
            });
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              profile_img_url: user.profile_img_url || "", // 🔹 Garantindo que seja string
              is_admin: user.is_admin,
            } satisfies User;
            
          } catch (error) {
            console.error('Erro na autenticação:', error);
            return null;
          }
        },
      })

    ],
    secret: env.NEXT_AUTH_SECRET,
    pages: {
      signIn: "/sign-in", // Página de login
      error: "/sign-in",
    }, 
    session: {
      strategy: 'jwt'
    }
,
    callbacks: {
      async signIn({ account }) {
        if (account?.provider != 'google') {
          console.log("deu certo aqui no signin")
          return true;
        }
        if (
          !account?.scope?.includes('https://www.googleapis.com/auth/calendar')
        ) {
          return '/register/connect-calendar?error=permissions'
        }
        return true
      },
      jwt: async ({ token, user, account, profile, isNewUser }) => {
        if (typeof user !== typeof undefined) token.user = user;
  
        return token
      },
      session: async ({ session, token }) => {
        return {
          ...session,
          user: token.user as AdapterUser, // 👈 Garante que `user` tem o tipo correto
          expires: session.expires, 
        };
      },
      

      redirect: async ({ url, baseUrl }) => {
        const emailOwner = env.NEXT_EMAIL_OWNER
        url = `/schedule/${emailOwner}`
        return baseUrl + url
      },
    },
   
  }
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, buildNextAuthOptions(req, res))
}



/**
 * Email HTML body
 * Insert invisible space into domains from being turned into a hyperlink by email
 * clients like Outlook and Apple mail, as this is confusing because it seems
 * like they are supposed to click on it to sign in.
 *
 * @note We don't add the email address to avoid needing to escape it, if you do, remember to sanitize it!
 */
function html(params: { url: string, host: string, theme: Theme }) {
  const { url } = params
  const emailOwner = env.NEXT_EMAIL_OWNER
  const customUrl = url.replace('sign-in', `schedule/${emailOwner}`)
  const brandColor = "#346df1"
  const color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: "#fff",
  }

  return `
<body style="background: ${color.background};">
<table width="100%" border="0" cellspacing="20" cellpadding="0"
style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">

<tr align="center"
style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
<td>
<img src="https://dental-clinic-two-gamma.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.9c598bf7.png&w=128&q=75" alt="Logo de Dente da Dental Clinic"/>
<h2>Dental Clinic</h2>
</td>
</tr>

<tr>
<td align="center"
style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
Olá, para acessar a agenda e ver os horários disponíveis clique nesse link:
</td>
</tr>
<tr>
<td align="center" style="padding: 20px 0;">
<table border="0" cellspacing="0" cellpadding="0">
<tr>
  <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${customUrl}"
      target="_blank"
      style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Acessar agenda</a></td>
</tr>
</table>
</td>
</tr>
<tr>
<td align="center"
style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
Se você não solicitou esse link, por favor apenas ignore
</td>
</tr>
</table>
<footer>
<p style="font-size: 14px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">Copyright © ${new Date().getFullYear()} Dental Clinic </p>
</footer>
</body>
`
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text() {
  return `Acesse a agenda de Dental Clinic`
}
