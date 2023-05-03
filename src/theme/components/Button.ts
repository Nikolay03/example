import { ThemeComponentProps, CSSObject } from '@chakra-ui/react'

export default {
  defaultProps: {
    colorScheme: 'primary'
  },
  baseStyle: {
    borderRadius: 'lg',
    _focus: {
      boxShadow: 'none'
    }
  },
  sizes: {
    xs: {
      borderRadius: 'base',
      fontSize: 'sm',
      h: '28px',
      px: 3
    },
    sm: {
      h: '42px',
      minW: '42px',
      px: 4
    },
    md: {
      h: '44px',
      px: 6
    },
    lg: {
      fontSize: 'md',
      h: '48px',
      px: 7
    },
    xl: {
      borderRadius: 'xl',
      fontSize: 'lg',
      h: '60px',
      px: 8
    }
  },
  variants: {
    pagination: ({ colorScheme, isActive }: ThemeComponentProps): CSSObject => ({
      border: '1px solid',
      borderColor: isActive ? 'transparent' : 'gray.100',
      bg: isActive ? `${colorScheme}.100` : 'white',
      pointerEvents: isActive ? 'none' : 'all',
      _hover: {
        bg: `${colorScheme}.50`,
        borderColor: `${colorScheme}.300`
      },
      _active: {
        bg: `${colorScheme}.100`
      }
    }),
    secondary: (): CSSObject => ({
      bg: 'white',
      border: '1px solid',
      borderColor: 'gray.200',
      color: 'gray.500',
      _hover: { bg: 'gray.50' },
      _active: { bg: 'gray.100' }
    }),
    social: (): CSSObject => ({
      bg: 'gray.100',
      _hover: { bg: 'gray.200' },
      _active: { bg: 'gray.300' }
    }),
    white: (): CSSObject => ({
      bg: 'white',
      color: 'inherit',
      _hover: { bg: 'blackAlpha.50' },
      _active: { bg: 'blackAlpha.200' }
    }),
    whiteSecond: (): CSSObject => ({
      bg: 'white',
      color: 'inherit',
      _hover: { bg: 'white', color: 'orange.300' },
      _active: { bg: 'white' }
    })
  }
}
