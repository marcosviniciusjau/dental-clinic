import { NextApiRequest, NextApiResponse, NextPageContext } from 'next';
import NextAuth, { NextAuthOptions, Theme } from 'next-auth';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from '@/lib/auth/prisma-adapter';
import { env } from '@/env/env';
import { createTransport } from "nodemailer";
import { prisma } from '@/lib/prisma';
import { AppError } from '@/utils/app-error';
import { useRouter } from 'next/router';
import Error from 'next/error';
import { Resend } from 'resend';

const resend = new Resend(env.NEXT_API_KEY);

export function buildNextAuthOptions(
  req: NextApiRequest | NextPageContext['req'],
  res: NextApiResponse | NextPageContext['res'],
): NextAuthOptions {
  debugger
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
      EmailProvider({
        server: {
          host: env.NEXT_EMAIL_SERVER_HOST,
          port: env.NEXT_EMAIL_SERVER_PORT,
          auth: {
            user: env.NEXT_EMAIL_SERVER_USER,
            pass: env.NEXT_API_KEY,
          },
        },
        from: `Dental Clinic+ <dentalclinicplus-noreply@${env.NEXT_EMAIL_FROM}>`,
        sendVerificationRequest({
          identifier: email,
          url,
          provider: { server, from },
        }) {
          sendVerificationRequest({ identifier: email, url, provider: { server, from } })
          async function sendVerificationRequest(params) {
            try {
              const { identifier, url, provider, theme } = params
              const userExists = await prisma.user.findUnique({
                where: {
                  email: identifier,
                },
              })
              if (!userExists) {
                throw new AppError(`User not found next auth email`, 404)
              }
              const { host } = new URL(url)
              const emailResponse = await resend.emails.send({
                to: identifier,
                from: provider.from,
                subject: `Acesse a agenda de Dental Clinic+`,
                text: text(),
                html: html({ url, host, theme }),
              })
              console.log(emailResponse)
              if (emailResponse.error) {
                throw new AppError(`Erro ao enviar email: ${emailResponse.error.message}`, 400);
              }

              console.log(`Email enviado para ${identifier}`);
            } catch (error) {
              console.error(error);
            }

          }
        },
      }
      ),
    ],
    secret: env.NEXT_AUTH_SECRET,
    pages: {
      signIn: "/sign-in",
      error: "/sign-in",
      verifyRequest: "/auth/verify-request",
    },
    logger: {
      error: (message) => {
        console.error(message);
      },
    },

    callbacks: {
      async signIn({ account, user, email }) {
        const userExists = await prisma.user.findUnique({
          where: {
            email: user.email,
          },
        })
        const googleProvider = account?.provider == 'google'

        if (!userExists && !googleProvider) {
          return '/sign-in?error=email-invalid'
        }
        if (userExists && googleProvider) {
          return '/register/connect-calendar'
        }
        if (!googleProvider) {
          return true;
        }
        if (
          !account?.scope?.includes('https://www.googleapis.com/auth/calendar')
        ) {
          return '/register/connect-calendar?error=permissions'
        }
        return true
      },


      async session({ session, user }) {
        return {
          ...session,
          user,
        }
      },

    },
  }
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, buildNextAuthOptions(req, res))
}

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
style="background: ${color.mainBackground}; max-width: 48rem; margin: auto; border-radius: 10px;">

<tr align="center"
style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
<td>
<img src="https://dental-clinic-two-gamma.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.b500b2f4.png&w=128&q=75" alt="Logo de Dente da Dental Clinic+"/>
<h2>Dental Clinic+</h2>
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
<p style="font-size: 14px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">Copyright © ${new Date().getFullYear()} Dental Clinic+ </p>
</footer>
</body>
`
}

function text() {
  return `Acesse a agenda de Dental Clinic+`
}
