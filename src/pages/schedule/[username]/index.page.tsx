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
    bio: string
    profileImgUrl: string
  }
}
export default function Schedule({ user }: ScheduleProps) {
  return (
    <>
      <NextSeo title={`Agendar com ${user.name}| Dental Clinic`} />

      <Container>
        <UserHeader>
          <ProfilePhoto src={user.profileImgUrl} />
          <Heading>{user.name}</Heading>
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
        name: user.name,
        bio: user.bio,
        profileImgUrl: user.profile_img_url,
      },
    },
    revalidate: 60 * 60 * 24,
  }
}
