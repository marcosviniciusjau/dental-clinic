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
    marginLeft: '$2',
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
export const Imagem = styled(Image, {
  display: "flex",
  width: "40vh",
  height: "40vh",
  borderRadius: "4px",

  marginLeft: "$8",
  '@media(max-width: 600px)': {
    padding: 0,

    width: "30vh",
    height: "30vh",
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
export const Contacts = styled('div', {
  '@media(min-width: 600px)': {
    display: 'flex',
    '& > div': {
      display: 'grid',
      placeContent: 'center',
    },
  },

  '& > div': {
  },
}
)

export const Gmail = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',

  marginTop: '$4',
  [`> ${Text}`]: {
    marginTop: '$6',
    color: '$gray300',
  },
})