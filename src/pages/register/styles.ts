import {
  Box,
  Text,
  Heading,
  styled,
  Button,
} from '@marcos-vinicius-design-system/react'

export const Container = styled('main', {
  maxWidth: 572,
  margin: '$10 auto $4',
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

export const Form = styled(Box, {
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

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
