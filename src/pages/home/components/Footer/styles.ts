import { styled, Text } from '@marcosvinicius-ignite-ui/react'

export const Container = styled('div', {
  height: 100,
  marginLeft: 'auto',
  display: 'flex',
  backgroundColor: '#289DD2',
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
