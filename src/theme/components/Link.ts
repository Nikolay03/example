import { CSSObject, ThemeComponentProps } from '@chakra-ui/react'

function getLinkColor (colorScheme, colorValue) {
  if (!colorScheme) return undefined
  return `${colorScheme}.${colorValue}`
}

export default {
  baseStyle: {
    _focus: {
      boxShadow: 'none'
    }
  },
  defaultProps: {
    variant: 'primary'
  },
  variants: {
    primary: ({ colorScheme }: ThemeComponentProps): CSSObject => ({
      color: getLinkColor(colorScheme, 500),
      _hover: {
        color: getLinkColor(colorScheme, 600)
      },
      _active: {
        color: getLinkColor(colorScheme, 700)
      }
    })
  }
}
