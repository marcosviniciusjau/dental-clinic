import {
  Heading,
  ProfilePhoto,
  Text,
} from '@marcos-vinicius-design-system/react'
import { Container, UserHeader } from './styles'
import { GetStaticProps } from 'next'
import { prisma } from '@/src/lib/prisma'
import { ScheduleForm } from './ScheduleForm'
import { NextSeo } from 'next-seo'
interface ScheduleProps {
  user: {
    name: string
    email: string
    bio: string
    profileImgUrl: string
  }
}
export default function Schedule({ user }: ScheduleProps) {
  return (
    <>
      <NextSeo title={`Agendar com ${'Dental Clinic'}| Dental Clinic`} />

      <Container>
        <UserHeader>
          <ProfilePhoto src="https://avatars.githubusercontent.com/u/82465988?s=400&u=1a1e57c5c28568093ab8cebcf3ff6ffa2c006641&v=4" />
          <Heading>Dental Clinic</Heading>
          <Text>{user.bio}</Text>
        </UserHeader>
        <ScheduleForm />
      </Container>
    </>
  )
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const email = String(params?.email)

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    return { notFound: true }
  }

  return {
    props: {
      user: {
        email: user.email,
        name: user.name,
        bio: user.bio,
        profileImgUrl: user.profile_img_url,
      },
    },
    revalidate: 60 * 60 * 24,
  }
}
