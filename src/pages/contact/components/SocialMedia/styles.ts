import { Heading, Text, styled } from '@marcos-vinicius-design-system/react'
import { WhatsappLogo } from 'phosphor-react'

export const Container = styled('div', {
  width: '100%',
  alignItems: 'center',
  overflow: 'hidden',
  '@media(max-width: 600px)': {
    display: 'block',
    paddingLeft: '$6',
  },
})

export const Hero = styled('div', {
  '@media(min-width: 600px)': {
    marginTop: '380px',
  },
  [`> ${Heading}`]: {
    '@media(max-width: 600px)': {
      fontSize: '$4xl',
    },
  },

  [`> ${Text}`]: {
    marginTop: '$2',
    color: '$gray200',
  },
})

export const SocialMediaDiv = styled('div', {
  width: '100%',
  display: 'inline-flex',
  marginTop: '$10',
  flexDirection: 'row',
  gap: '$4',
  overflow: 'hidden',
})

export const Imagem = styled('div',{
})

export const Texto = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  alignContent: 'center',
  
  '&:last-child': {
    fontWeight: 'bold',
  },
})

export const Facebook = styled('div', {
  maxWidth: 315,
  display: 'flex',
  marginTop: '$10',
  flexDirection: 'column',
  gap: '$4',
  overflow: 'hidden',
})
export const Pagina = styled('div', {
  maxWidth: 315,
  marginTop: '$16',
  marginBottom: '$20',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
  overflow: 'hidden',
})
export const Instagram = styled('div', {
  maxWidth: 315,
  display: 'flex',
  marginTop: '$10',
  flexDirection: 'column',
  gap: '$4',
  overflow: 'hidden',
})
export const Arroba = styled('div', {
  maxWidth: 315,
  marginTop: '$16',
  marginBottom: '$20',
  display: 'flex',
  gap: '$4',
  overflow: 'hidden',
})
