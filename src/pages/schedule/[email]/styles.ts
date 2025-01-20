import { Box, Button, Heading, Text, styled } from '@marcos-vinicius-design-system/react'

export const Container = styled('div', {
  maxWidth: 852,
  padding: '0 $4',
  margin: '0 auto $4',
  
  '@media(max-width: 600px)': {
    padding: '0 $4',
  },
  
})

export const ContainerLogin = styled('div', {
  '@media(min-width: 600px)': {
      '&:last-child':{
        width: '100vh',
        height: '100vh',
        display: 'grid',
        placeContent: 'center',
        marginLeft: '$40',
        gap: '$8',
      }
    
  },
  '@media(max-width: 600px)': {
    '&:last-child':{
        display: 'grid',
        placeContent: 'center',
        marginLeft: '$40',
      }
    
  },
  
})

export const UserHeader = styled('div', {
  marginTop: '$6',
  display: 'grid',
  gridTemplateColumns: '1fr 2fr 1fr',
  gridTemplateAreas: `'agendamentos doctor profile'`,
  gap: '19rem',
  alignItems: 'start',
});

export const DoctorHeader = styled('div', {
  gridArea: 'doctor',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [`> ${Heading}`]: {
    lineHeight: '$base',
    marginTop: '$2',
  },

  [`> ${Text}`]: {
    color: '$gray100',
    textAlign: 'center',
  },
});

export const ProfileHeader = styled('div', {
  gridArea: 'profile',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '0',

  [`> ${Heading}`]: {
    lineHeight: '$base',
    marginTop: '$2',
  },

  [`> ${Text}`]: {
    color: '$gray100',
    textAlign: 'center',
  },
});
export const Consultas = styled('div', {
  gridArea: 'agendamentos',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  marginLeft: '-10rem',
  maxHeight: '400px',
  [`> div`]: {
    padding: '1rem',
    backgroundColor: '$gray800',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',

    [`> ${Text}`]: {
      color: '$gray100',
    },
  },
});


export const AccordionWrapper = styled('div', {
  marginTop: '$10',
});

export const AccordionItem = styled('div', {
  marginBottom: '$2',
});

export const Accordion = styled(Box, {
  backgroundColor: '#eee',
  color: '#444',
  cursor: 'pointer',
  padding: '18px',
  width: '100%',
  textAlign: 'left',
  border: 'none',
  outline: 'none',
  transition: '0.4s',

  variants: {
    isOpen: {
      true: {
        backgroundColor: '$gray500'
      },
    },
  },
});

export const Panel = styled('div', {
  padding: '0 18px',
  backgroundColor: 'white',
  overflow: 'hidden',
  height: 0,
  transition: 'height 0.4s ease-out',

  variants: {
    isOpen: {
      true: {
        height: 'auto',
        padding: '18px',
      },
    },
  },
});
