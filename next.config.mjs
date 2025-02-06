/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["page.tsx", "api.ts", "api.tsx"],
  env: {
    NEXT_DATABASE_DIRECT_URL: process.env.NEXT_DATABASE_DIRECT_URL,
    NEXT_DATABASE_URL: process.env.NEXT_DATABASE_URL,
    NEXT_GOOGLE_CLIENT_ID: process.env.NEXT_GOOGLE_CLIENT_ID,
    NEXT_GOOGLE_CLIENT_SECRET: process.env.NEXT_GOOGLE_CLIENT_SECRET,
    NEXT_AUTH_SECRET: process.env.NEXT_AUTH_SECRET,
    NEXT_EMAIL_OWNER: process.env.NEXT_EMAIL_OWNER,

    NEXT_USERNAME: process.env.NEXT_USERNAME,
    NEXT_EMAIL_SERVER_USER: process.env.NEXT_EMAIL_SERVER_USER,
    NEXT_API_KEY: process.env.NEXT_API_KEY,
    NEXT_EMAIL_SERVER_HOST: process.env.NEXT_EMAIL_SERVER_HOST,
    NEXT_EMAIL_FROM: process.env.NEXT_EMAIL_FROM,
    NEXT_EMAIL_SERVER_PORT: process.env.NEXT_EMAIL_SERVER_PORT,

    NEXT_JWT_SECRET: process.env.NEXT_JWT_SECRET,
  },
};

export default nextConfig;
