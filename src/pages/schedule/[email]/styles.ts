import { Button, Heading, Text, styled } from '@marcos-vinicius-design-system/react'

export const Container = styled('div', {
  maxWidth: 852,
  padding: '0 $4',
  margin: '$20 auto $4',
  '@media(max-width: 600px)': {
    padding: '0 $4',
  },
})

export const UserHeader = styled('div', {
  [`> ${Text}`]: {
    color: '$gray100',
  },
  [`> ${Heading}`]: {
    marginTop: '-$8',
    color: '$gray100',
  display: 'grid',
  justifyItems: 'end',
  [`> ${Button}`]: {
    fontWeight: 'normal',
  },
  },
})

export const Profile = styled('div',{
  marginBlock: 0,  
  display: 'grid',
  alignItems: 'center',
  justifyContent: 'end',
})
export const DoctorHeader = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  [`> ${Heading}`]: {
    lineHeight: '$base',
    marginTop: '$2',
  },

  [`> ${Text}`]: {
    color: '$gray100',
  },
})
