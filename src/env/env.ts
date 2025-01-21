import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();
const envSchema = z.object({
  NEXT_DATABASE_URL: z.string(),
  NEXT_DATABASE_DIRECT_URL: z.string(),
  NEXT_GOOGLE_CLIENT_ID: z.string(),
  NEXT_GOOGLE_CLIENT_SECRET: z.string(),
  NEXT_NEXTAUTH_SECRET: z.string(),
  NEXT_EMAIL: z.string(),
  NEXT_JWT_SECRET: z.string(),
})
const parsedEnv = {
  NEXT_DATABASE_URL: process.env.NEXT_DATABASE_URL,
  NEXT_DATABASE_DIRECT_URL: process.env.NEXT_DATABASE_DIRECT_URL,
  NEXT_GOOGLE_CLIENT_ID: process.env.NEXT_GOOGLE_CLIENT_ID,
  NEXT_GOOGLE_CLIENT_SECRET: process.env.NEXT_GOOGLE_CLIENT_SECRET,
  NEXT_NEXTAUTH_SECRET: process.env.NEXT_NEXTAUTH_SECRET,
  NEXT_EMAIL: process.env.NEXT_EMAIL,
  NEXT_JWT_SECRET: process.env.NEXT_JWT_SECRET,
};
export const env = envSchema.parse(parsedEnv)