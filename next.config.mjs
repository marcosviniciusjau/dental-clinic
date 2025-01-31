/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["page.tsx", "api.ts", "api.tsx"],
  env: {
    NEXT_DATABASE_DIRECT_URL: process.env.NEXT_DATABASE_DIRECT_URL,
    NEXT_DATABASE_URL: process.env.NEXT_DATABASE_URL,
    NEXT_API_KEY: process.env.NEXT_API_KEY,
    NEXT_GOOGLE_CLIENT_ID: process.env.NEXT_GOOGLE_CLIENT_ID,
    NEXT_GOOGLE_CLIENT_SECRET: process.env.NEXT_GOOGLE_CLIENT_SECRET,
    NEXT_AUTH_SECRET: process.env.NEXT_AUTH_SECRET,

    NEXT_EMAIL_OWNER: process.env.NEXT_EMAIL_OWNER,
    NEXT_EMAIL_SERVER: process.env.NEXT_EMAIL_SERVER,
    NEXT_EMAIL_PASSWORD: process.env.NEXT_EMAIL_PASSWORD,
    NEXT_USERNAME: process.env.NEXT_USERNAME,

    NEXT_JWT_SECRET: process.env.NEXT_JWT_SECRET,
  },
};

export default nextConfig;
