import { outline, filled } from '../common/inputVariants'

export default {
  defaultProps: {
    colorScheme: 'primary',
    errorBorderColor: 'palette.common.red',
    focusBorderColor: 'primary.500',
    variant: 'filled'
  },
  baseStyle: {
    display: 'block'
  },
  sizes: {
    md: {
      borderRadius: 'lg',
      fontWeight: 'inherit',
      minH: '105px',
      px: 4,
      py: 3
    },
    lg: {
      borderRadius: 'xl',
      fontSize: 'md',
      fontWeight: 'inherit',
      minH: '150px',
      px: 6,
      py: 4
    }
  },
  variants: {
    filled,
    outline
  }
}
