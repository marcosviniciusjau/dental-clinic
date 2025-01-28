import {
  Box,
  Text,
  Heading,
  styled,
  Button,
} from '@marcos-vinicius-design-system/react'

export const Container = styled('main', {
  padding: '0 $4',
})

export const Header = styled('div', {
  padding: '0 $6',

  [`> ${Heading}`]: {
    lineHeight: '$base',
  },

  [`> ${Text}`]: {
    color: '$gray200',
    marginBottom: '$6',
  },
})

export const Form = styled('div', {
  maxWidth: 572,
  margin: '$20 auto $4',
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
  '@media(max-width: 600px)': {
    marginTop: '20vh',
    [`> ${Heading}`]: {
      fontSize: 'md',
    },
    },
  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },

  [`> ${Button}`]: {
    marginBottom: '$6',
  },
})

export const FormError = styled(Text, {
  color: '#f75a68',
})

export const FormAnnotation = styled('div', {
  marginTop: '$2',

  [`> ${Text}`]: {
    color: '$gray400',
  },
})
