import { ThemeComponentProps, CSSObject } from '@chakra-ui/react'

export default {
  baseStyle: {
    th: {
      letterSpacing: 'normal',
      textTransform: 'unset'
    }
  },
  sizes: {
    md: {
      th: {
        fontSize: 'md',
        py: 4,
        px: 3
      },
      td: {
        lineHeight: 'normal',
        fontSize: 'sm',
        px: 3
      }
    }
  },
  variants: {
    simple: ({ colorScheme }: ThemeComponentProps): CSSObject => ({
      th: {
        borderColor: `${colorScheme}.200`
      },
      td: {
        borderColor: `${colorScheme}.200`
      }
    })
  }
}
