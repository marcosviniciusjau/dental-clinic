import {
  Heading,
  ProfilePhoto,
  Text,
} from '@marcos-vinicius-design-system/react'
import { Container, DoctorHeader, UserHeader } from './styles'
import { GetStaticProps } from 'next'
import { prisma } from '@/src/lib/prisma'
import { ScheduleForm } from './ScheduleForm'
import { NextSeo } from 'next-seo'

import { ToastContainer, toast } from 'react-toastify';

import Cookies from 'js-cookie'

import { useRouter } from 'next/router'
interface ScheduleProps {
  user: {
    name: string
    email: string
    bio: string
    profileImgUrl: string
  }
}
export default function Schedule({ user }: ScheduleProps) {
    const router = useRouter()
    const cookie = Cookies.get('dental-clinic:newClient')
    if(!cookie){
      return 403
    }

  return (
    <>
      <NextSeo title={`Agendar com ${'Dental Clinic'}| Dental Clinic`} />
      <Container>
        <DoctorHeader>
          <ProfilePhoto src={user.profileImgUrl} />
          <Heading>Dental Clinic</Heading>
          <Text>{user.bio}</Text>
        </DoctorHeader>
        <ScheduleForm />
      </Container>
      <ToastContainer/>
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
