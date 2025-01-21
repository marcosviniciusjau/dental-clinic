/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["page.tsx", "api.ts", "api.tsx"],
  env: {
    NEXT_DATABASE_URL: process.env.NEXT_DATABASE_URL,
    NEXT_API_KEY: process.env.NEXT_API_KEY,
    NEXT_GOOGLE_CLIENT_ID: process.env.NEXT_GOOGLE_CLIENT_ID,
    NEXT_GOOGLE_CLIENT_SECRET: process.env.NEXT_GOOGLE_CLIENT_SECRET,
    NEXT_NEXTAUTH_SECRET: process.env.NEXT_NEXTAUTH_SECRET,
    NEXT_EMAIL: process.env.NEXT_EMAIL,
    NEXT_JWT_SECRET: process.env.NEXT_JWT_SECRET,
  },
};

export default nextConfig;
