declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_DATABASE_URL: string;
    NEXT_PUBLIC_API_KEY: string;
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: string;
    NEXT_PUBLIC_GOOGLE_CLIENT_SECRET: string;
    NEXT_PUBLIC_NEXTAUTH_SECRET: string;
    NEXT_PUBLIC_EMAIL: string;
    NEXT_PUBLIC_JWT_SECRET: string;
    // Adicione outras variáveis conforme necessário
  }
}
