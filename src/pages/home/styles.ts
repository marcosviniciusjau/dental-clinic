import { Heading, Text, styled } from '@marcosvinicius-ignite-ui/react'

export const Container = styled('div', {
  marginLeft: 'auto',
  display: 'flex',
  alignItems: 'center',
  gap: '$20',
  overflow: 'hidden',
  backgroundColor: '#289DD2',
})

export const Hero = styled('div', {
  maxWidth: 480,
  padding: '0 $10',

  [`> ${Heading}`]: {
    '@media(max-width: 600px)': {
      fontSize: '$6xl',
    },
  },

  [`> ${Text}`]: {
    marginTop: '$2',
    color: '$gray300',
  },
})

export const Preview = styled('div', {
  paddingRight: '$8',
  overflow: 'hidden',
  '@media(max-width: 600px)': {
    display: 'none',
  },
})
