import { Box, Heading, Text, styled } from '@marcos-vinicius-design-system/react'
import Image from 'next/image'

export const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$20',
  overflow: 'hidden',
  paddingBottom: '$10',
  '@media(min-width: 600px)': {
    padding: '0 $10',
  },
  '@media(max-width: 600px)': {
    display: 'block',
    padding: '0',
    marginLeft: '$2',
  },
})

export const Hero = styled('div', {
  maxWidth: 480,
  padding: '0 $8',
  paddingBottom: '$10',
  [`> ${Heading}`]: {
    '@media(max-width: 600px)': {
      fontSize: '$2xl',
    },
  },

  [`> ${Text}`]: {
    marginTop: '$2',
    color: '$gray300',
  },
})
export const Imagem = styled(Image, {
  display: "flex",
  width: "40vh",
  height: "40vh",
  borderRadius: "4px",

  marginLeft: "$8",
  '@media(max-width: 600px)': {
    padding: 0,

    width: "30vh",
    height: "30vh",
    marginLeft: "$8",
  }
})

export const Preview = styled('div', {
  '@media(min-width: 600px)': {
    marginLeft: '5vh',
  },

  overflow: 'hidden',
  paddingBottom: '$10',
})
export const Contacts = styled('div', {
  '@media(min-width: 600px)': {
    marginLeft: '$16',
    display: 'flex',
    gap: '$20',
  },
  '@media(max-width: 600px)': {
  marginLeft: '$8',
  }
}
)

export const AccordionWrapper = styled('div', {
  '@media(max-width: 600px)': {
    marginBottom: '$10',
    width: '85%',
  },

  marginTop: '$10',
  '@media(min-width: 600px)': {
    width: '50%',
  },
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
export const Questions = styled('div', {
  '@media(min-width: 600px)': {
    marginTop: '4rem',
    marginBottom: '4rem',
  },
  [`> ${Heading}`]: {
    marginBottom: '$4',
  },
})

export const Gmail = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',

  marginBottom: '$4',
  [`> ${Text}`]: {
    marginTop: '$6',
    color: '$gray300',
  },
})

export const Whatsapp = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$4',

  marginTop: '$4',
  
  marginBottom: '$4',
  [`> ${Text}`]: {
    marginTop: '$6',
    color: '$gray300',
  },
})