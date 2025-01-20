import { env } from "@/env/env"

export const authConfig = {
  jwt: {
    secret: env.NEXT_PUBLIC_JWT_SECRET,
    expiresIn: "7d",
  }
}