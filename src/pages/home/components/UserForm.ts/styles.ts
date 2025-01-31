import { Box, Button, Text, styled } from '@marcos-vinicius-design-system/react'
import Image from 'next/image'

export const Container = styled('div', {
  maxWidth: 'calc(100vw - (100vw - 1160px) / 2)',
  display: 'grid',
  gap: '$20',
  marginLeft: '$16',
  marginRight: '$16',
  gridTemplateColumns: '1fr 1fr 1fr',
  gridTemplateAreas: 'image vazio form',
  alignItems: 'center',
  overflow: 'hidden',
  '@media(max-width: 600px)': {
    display: 'block',
    marginLeft: '$10',
    marginRight: '$6',
  },
})
export const Vazio = styled('div', {
  griArea: 'vazio',
})

export const Imagem = styled('div', {
  griArea: 'image',
  marginBottom: '$6',
  marginTop: '$6',
})

export const Form = styled(Box, {
  griArea: 'form',
  display: 'flex',
  flexDirection: 'column',
  gap: '$6',
  '@media(max-width: 600px)': {
    width: '95%'
  },
  [`> ${Button}`]: {
    color: '$white',
    '&:disabled': {
      cursor: 'default',
      opacity: 0.5,
    },
    '&:not(:disabled):hover': {
      backgroundColor: '$blue300',
    },
    
  },
})

export const FormAnnotation = styled('div', {
  marginTop: '$2',

  [`> ${Text}`]: {
    color: '$gray400',
  },
})
