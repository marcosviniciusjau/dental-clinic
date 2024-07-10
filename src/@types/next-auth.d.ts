import NextAuth from 'next-auth'

declare module 'next-auth' {
  export interface User {
    id: string
    name: string
    email: string
    profile_img_url: string
  }

  interface Session {
    user: User
  }
}