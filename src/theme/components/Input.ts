import { ThemeComponentProps, CSSObject } from '@chakra-ui/react'

import { defaultProps, sizes } from '../common/inputStyles'
import { outline, filled } from '../common/inputVariants'

export default {
  defaultProps,
  sizes,
  variants: {
    filled: (props: ThemeComponentProps): CSSObject => ({
      field: filled(props)
    }),
    outline: (props: ThemeComponentProps): CSSObject => ({
      field: outline(props)
    })
  }
}
