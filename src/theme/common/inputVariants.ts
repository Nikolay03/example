import { ThemeComponentProps, CSSObject } from '@chakra-ui/react'

export const outline = ({ colorScheme }: ThemeComponentProps): CSSObject => ({
  bg: 'white',
  border: '1px solid',
  borderColor: 'transparent',
  color: 'palette.text.default',
  _placeholder: {
    color: 'gray.500'
  },
  _hover: {
    borderColor: 'gray.300'
  },
  _focus: {
    bg: 'white',
    borderColor: `${colorScheme}.500`
  }
})

export const filled = ({ colorScheme }: ThemeComponentProps): CSSObject => ({
  _focus: {
    bg: 'white',
    borderColor: `${colorScheme}.500`
  }
})
