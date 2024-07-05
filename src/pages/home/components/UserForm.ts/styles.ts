import { Box, Button, Text, styled } from '@marcosvinicius-ignite-ui/react'

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
})
export const Vazio = styled('div', {
  griArea: 'vazio',
})

export const Imagem = styled('div', {
  griArea: 'image',
  marginBottom: '$6',
})

export const Form = styled(Box, {
  griArea: 'form',
  display: 'flex',
  flexDirection: 'column',
  gap: '$6',

  '@media(max-width: 600px)': {
    gridTemplateColumns: '1fr',
  },
  [`> ${Button}`]: {
    backgroundColor: '#289DD2',
    color: '$white',
    '&:disabled': {
      cursor: 'default',
      opacity: 0.5,
    },
    '&:not(:disabled):hover': {
      backgroundColor: '$green300',
    },
  },
})

export const FormAnnotation = styled('div', {
  marginTop: '$2',

  [`> ${Text}`]: {
    color: '$gray400',
  },
})
