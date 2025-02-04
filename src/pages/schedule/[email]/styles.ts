import { Box, Heading, Text, styled } from '@marcos-vinicius-design-system/react'

export const Container = styled('div', {
  maxWidth: 852,
  padding: '0 $4',

  margin: '$16 auto $4',
  '@media(max-width: 600px)': {
    padding: '0 $4',
  },
  '@media(min-width: 600px)': {
    margin: '$5 auto $4',
  },
})

export const ContainerLogin = styled('div', {
  '@media(min-width: 600px)': {
    marginLeft: '$40',
    width: '80vh',
    height: '80vh',
    display: 'grid',
    placeContent: 'center',
    gap: '$8',
  },
  '@media(max-width: 600px)': {
    marginTop: '30vh',
    [`> ${Heading}`]: {
      fontSize: 'md',
    },

  }
})

export const UserHeader = styled('div', {
  '@media(min-width: 600px)': {
    marginTop: '$5',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 150px',
    gridTemplateAreas: `'agendamentos doctor profile'`,
    gap: '19rem',
    alignItems: 'start',
  },
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
  cursor: 'pointer',
  '@media(max-width: 600px)': {
    marginTop: '-$10',
  },

  [`> ${Heading}`]: {
    lineHeight: '$base',
  },

  [`> ${Text}`]: {
    color: '$gray100',
    textAlign: 'center',
    marginBottom: '$4',
    marginLeft: '-$20'
  },

  variants: {
    isOpen: {
      true: {
        backgroundColor: '$gray900',
      },
    },
  },
});

export const Consultas = styled('div', {
  gridArea: 'agendamentos',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  marginLeft: '$5',
  '@media(min-width: 600px)': {
    marginLeft: '-10rem',
    maxHeight: '200px',
  },
  '@media(max-width: 600px)': {
  maxHeight: 'auto',
    width: '80%',
    marginTop: '$10',
    marginBottom: '$10',
  },

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
  marginLeft: '$8',
  '@media(max-width: 600px)': {
    width: '80%',
    marginBottom: '$10',
  },
  '@media(min-width: 600px)': {
    marginLeft: '8rem',
  },

  width: '70%',
  [`> ${Heading}`]: {
    color: '$gray100',
    marginBottom: '$4',
  },
});

export const AccordionItem = styled('div', {
  marginBottom: '$2',
});

export const Accordion = styled(Box, {
  cursor: 'pointer',
  padding: '18px',
  width: '100%',
  textAlign: 'left',
  border: 'none',
  outline: 'none',
  transition: '0.4s',

  marginBottom: '$5',
  variants: {
    isOpen: {
      true: {
        backgroundColor: '$gray500'
      },
    },
  },
});

export const PanelProfile = styled('div', {
  overflow: 'hidden',
  height: 0,
  transition: 'height 0.4s ease-out',
  variants: {
    isOpen: {
      true: {
        '@media(min-width: 600px)': {
          marginLeft: '-$12',
        },
        height: 'auto',
      },
    },
  },
});

export const Panel = styled('div', {
  overflow: 'hidden',
  height: 0,
  marginTop: '$5',
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
