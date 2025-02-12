import { Heading, Text, styled } from '@marcos-vinicius-design-system/react'

export const Container = styled('div', {
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gridTemplateAreas: '"image1 text text1" "image2 text2 text3"',
  alignItems: 'center',
  overflow: 'hidden',
  backgroundColor: '$blue500',
  paddingLeft: '$16',
  '@media screen and (max-width: 48rem)': {
    display: 'block',
    paddingLeft: '$10',
  },
})

export const Hero = styled('div', {
  '@media(min-width: 48rem)': {
    marginTop: '380px',
  },
  [`> ${Heading}`]: {
    '@media screen and (max-width: 48rem)': {
      fontSize: '$4xl',
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
  marginTop: '$10',
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
  marginTop: '$10',
  overflow: 'hidden',
  '@media screen and (max-width: 48rem)': {
    marginBottom: '$16',
    marginTop: '$16',
  },
})

export const Consultas = styled('div', {
  gridArea: 'text3',
  maxWidth: 315,
  marginTop: '$16',
  marginBottom: '$20',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
  overflow: 'hidden',
})
export const Limpezas = styled('div', {
  gridArea: 'image2',
  maxWidth: 315,
  marginTop: '$16',
  marginBottom: '$20',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
  overflow: 'hidden',
})
