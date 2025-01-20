import { authConfig } from "@/configs/auth";
import { prisma } from "@/lib/prisma";
import { AppError } from "@/utils/app-error";
import { compare } from "bcryptjs";
import dayjs from "dayjs";
import { sign } from "jsonwebtoken"
import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "nookies";
import {set} from 'local-storage'
interface SignInBody {
  email: string;
  password: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const email = String(req.body.email)
  const password = String(req.body.password)
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      name: true,
    }
  })
  if (!user) {
    throw new AppError('Email or password incorrect')
  }
  if (!password) {
    throw new AppError('Email or password incorrect')
  }
  const passwordMatch = compare(password, user.password)

  if (!passwordMatch) {
    throw new AppError('Email or password incorrect')
  }

  const { secret, expiresIn } = authConfig.jwt

  const token = sign({}, secret, {
    subject: String(user.id),
    expiresIn
  })
  const currentDate = dayjs().startOf('day')
  const nextWeek = currentDate.add(1, 'week')
  
  setCookie({ res }, 'dental-clinic:client', user.id, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
    expires:  nextWeek.toDate()
  })


  await prisma.session.create({
    data: {
      user_id: user.id,
      session_token: token,
      expires: nextWeek.toDate()
    },
  })

  return res.status(200).end()
  
}
