import { Heading, Text, styled } from '@marcos-vinicius-design-system/react'
import Image from 'next/image'

export const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$20',
  overflow: 'hidden',
  paddingBottom: '$10',
  '@media(min-width: 600px)': {
    padding: '0 $10',
  },
  '@media(max-width: 600px)': {
    display: 'block',
    padding: '0',
  },
})

export const Hero = styled('div', {
  maxWidth: 480,
  padding: '0 $8',
  paddingBottom: '$10',
  [`> ${Heading}`]: {
    '@media(max-width: 600px)': {
      fontSize: '$2xl',
    },
  },

  [`> ${Text}`]: {
    marginTop: '$2',
    color: '$gray300',
  },
})
export const Imagem = styled(Image,{
  display: "flex",
  width: "40vh",
  height: "40vh",
  borderRadius: "4px",
  
  '@media(max-width: 600px)': {
    padding: 0,
    marginLeft: "$8",
  }
})

export const Preview = styled('div', {
  '@media(min-width: 600px)': {
    marginLeft: '5vh',
  },

  overflow: 'hidden',
  paddingBottom: '$10',
})
