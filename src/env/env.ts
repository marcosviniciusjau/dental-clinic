import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();

const envSchema = z.object({
  NEXT_DATABASE_URL: z.string(),
  NEXT_DATABASE_DIRECT_URL: z.string(),
  NEXT_GOOGLE_CLIENT_ID: z.string(),
  NEXT_GOOGLE_CLIENT_SECRET: z.string(),
  NEXT_AUTH_SECRET: z.string(),
  NEXT_EMAIL_OWNER: z.string().email(),
  NEXT_USERNAME: z.string(),
  NEXT_JWT_SECRET: z.string(),

  NEXT_EMAIL_SERVER_USER: z.string(),
  NEXT_API_KEY: z.string(),
  NEXT_EMAIL_SERVER_HOST: z.string(),
  NEXT_EMAIL_FROM: z.string(),
  NEXT_EMAIL_SERVER_PORT: z.coerce.number()
})

const parsedEnv = {
  NEXT_DATABASE_URL: process.env.NEXT_DATABASE_URL,
  NEXT_DATABASE_DIRECT_URL: process.env.NEXT_DATABASE_DIRECT_URL,
  NEXT_GOOGLE_CLIENT_ID: process.env.NEXT_GOOGLE_CLIENT_ID,
  NEXT_GOOGLE_CLIENT_SECRET: process.env.NEXT_GOOGLE_CLIENT_SECRET,
  NEXT_AUTH_SECRET: process.env.NEXT_AUTH_SECRET,
  NEXT_EMAIL_OWNER: process.env.NEXT_EMAIL_OWNER,
  NEXT_USERNAME: process.env.NEXT_USERNAME,

  NEXT_API_KEY: process.env.NEXT_API_KEY,
  NEXT_EMAIL_SERVER_HOST: process.env.NEXT_EMAIL_SERVER_HOST,
  NEXT_EMAIL_FROM: process.env.NEXT_EMAIL_FROM,
  NEXT_EMAIL_SERVER_PORT: process.env.NEXT_EMAIL_SERVER_PORT,
  NEXT_EMAIL_SERVER_USER: process.env.NEXT_EMAIL_SERVER_USER,
  NEXT_JWT_SECRET: process.env.NEXT_JWT_SECRET,
};
export const env = envSchema.parse(parsedEnv)