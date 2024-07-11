import { Heading, Text, styled } from '@marcos-vinicius-design-system/react'

export const Container = styled('div', {
  marginLeft: 'auto',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gridTemplateAreas: '"image1 text text1" "image2 text2 text3"',
  alignItems: 'center',
  gap: '$16',
  overflow: 'hidden',
  padding: '0 $10',
})

export const Hero = styled('div', {
  [`> ${Heading}`]: {
    '@media(max-width: 600px)': {
      fontSize: '$6xl',
    },
  },

  [`> ${Text}`]: {
    marginTop: '$2',
    color: '$gray200',
  },
})

export const Implantes = styled('div', {
  maxWidth: 315,
  gridArea: 'image1',
  display: 'flex',
  marginTop: '$20',
  flexDirection: 'column',
  gap: '$4',
  overflow: 'hidden',
})

export const Aparelhos = styled('div', {
  maxWidth: 315,
  display: 'flex',

  gridArea: 'text1',
  flexDirection: 'column',
  gap: '$4',
  marginTop: '$20',
  overflow: 'hidden',
})

export const Consultas = styled('div', {
  gridArea: 'text3',
  maxWidth: 315,
  marginBottom: '$20',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
  overflow: 'hidden',
})
export const Limpezas = styled('div', {
  gridArea: 'image2',
  maxWidth: 315,
  marginBottom: '$20',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
  overflow: 'hidden',
})
