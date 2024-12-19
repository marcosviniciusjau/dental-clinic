import { styled } from '@marcos-vinicius-design-system/react'

export const HeaderContainer = styled('header', {
  '@media(min-width: 600px)': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    padding: '0 $10',
  },
  '@media(max-width: 600px)': {
    display: 'flex',
    flexDirection: 'row',

    padding: '0 $5',
  },
})

export const HeaderText = styled('header', {
  display: 'inherit',
  marginTop: '$10',
  gap: '$6',
})
