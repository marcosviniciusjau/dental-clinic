import { NextApiRequest, NextApiResponse, NextPageContext } from 'next';
import NextAuth, { NextAuthOptions, Theme } from 'next-auth';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from '@/lib/auth/prisma-adapter';
import { env } from '@/env/env';
import { createTransport } from "nodemailer";
import { prisma } from '@/lib/prisma';
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
          host: 'smtp.gmail.com',
          port: 587,
          auth: {
            user: env.NEXT_EMAIL_OWNER,
            pass: env.NEXT_EMAIL_PASSWORD,
          },
        },
        from: env.NEXT_EMAIL_OWNER,
        sendVerificationRequest({
          identifier: email,
          url,
          provider: { server, from },
        }) {
          from = env.NEXT_EMAIL_OWNER,
            sendVerificationRequest({ identifier: email, url, provider: { server, from } })
        },
      }
      ),
    ],
    pages: {
      verifyRequest: "/auth/verify-request",
    },

    callbacks: {
      async signIn({ account }) {
        if (account?.provider != 'google') {
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

async function sendVerificationRequest(params) {
const { identifier, url, provider, theme } = params
  const userExists = await prisma.user.findUnique({
    where: {
      email: identifier,
    },
  })
  if (!userExists) {
    throw new Error(`User not found`)
  }
  const { host } = new URL(url)
  const transport = createTransport(provider.server)
  const result = await transport.sendMail({
    to: identifier,
    from: provider.from,
    subject: `Acesse a agenda de Dental Clinic`,
    text: text(),
    html: html({ url, host, theme }),
  })
  console.log(result)
  const failed = result.rejected.concat(result.rejected).filter(Boolean)
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`)
  }
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
  //const customUrl = "https://www.google.com"
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
<p style="font-size: 8px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">Copyright © ${new Date().getFullYear()} Dental Clinic </p>
</footer>
</body>
`
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text() {
  return `Acesse a agenda de Dental Clinic`
}
