import { Box, Button, Heading, Text, styled } from '@marcos-vinicius-design-system/react'

export const Container = styled('div', {
  maxWidth: 852,
  padding: '0 $4',
  '@media screen and (max-width: 48rem)': {
    padding: '0 $4',
  },
  '@media(min-width: 48rem)': {
    margin: '$5 auto $4',
  },
})

export const ContainerLogin = styled('div', {
  '@media(min-width: 48rem)': {
    marginLeft: '$40',
    width: '80vh',
    height: '80vh',
    display: 'grid',
    placeContent: 'center',
    gap: '$8',
  },
  '@media screen and (max-width: 48rem)': {
    marginTop: '30vh',
    [`> ${Heading}`]: {
      fontSize: 'md',
    },

  }
})

export const UserHeader = styled('div', {
  '@media(min-width: 48rem)': {
    marginTop: '$5',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 12.5rem',
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
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
  marginTop: '$6',
  '@media screen and (max-width: 48rem)': {
    width: '100%',
    marginLeft: '$6',
  },

});
export const PanelProfile = styled('div', {
  overflow: 'hidden',
  height: 0,
  transition: 'height 0.4s ease-out',
  variants: {
    isOpen: {
      true: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        '@media screen and (max-width: 768px)': {
          marginLeft: '$6',
        },
        width: '100%',
        height: 'auto',
      },
    },
  },

  [`> ${Button}`]: {
    width: '90%',
    maxWidth: '300px',
    textAlign: 'center',
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

export const Consultas = styled('div', {
  gridArea: 'agendamentos',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  marginLeft: '$5',
  '@media(min-width: 48rem)': {
    marginLeft: '-10rem',
    maxHeight: '10rem',
  },
  '@media screen and (max-width: 48rem)': {
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
  '@media screen and (max-width: 48rem)': {
    width: '80%',
    marginBottom: '$10',
  },
  '@media(min-width: 48rem)': {
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

