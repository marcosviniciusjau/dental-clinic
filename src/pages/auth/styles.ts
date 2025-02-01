import { Heading, styled, Text } from "@marcos-vinicius-design-system/react";

export const Container = styled('div', {
  maxWidth: 572,
  margin: '$10 auto $4',
  padding: '0 $4',
  [`> ${Heading}`]: {
    marginBottom: '$6',
  },
  [`> ${Text}`]: {
    color: '$gray100',
    marginBottom: '$6',
  },
})
