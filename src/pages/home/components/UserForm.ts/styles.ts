import { Box, Button, Text, styled } from '@marcosvinicius-ignite-ui/react'

export const Form = styled(Box, {
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gap: '$2',
  marginTop: '$2',
  padding: '$4',

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
