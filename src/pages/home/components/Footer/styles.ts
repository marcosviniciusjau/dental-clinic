import { styled, Text } from '@marcos-vinicius-design-system/react'

export const Container = styled('div', {
  height: 100,
  marginLeft: 'auto',
  display: 'flex',
  alignItems: 'center',
  gap: '$20',
  overflow: 'hidden',

  [`> ${Text}`]: {
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: '$lg',
    color: '$white',
  },
})
