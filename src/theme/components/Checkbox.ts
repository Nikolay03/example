import { defaultProps, sizes } from '../common/checkboxStyles'

export default {
  defaultProps,
  baseStyle: {
    control: {
      alignSelf: 'baseline',
      border: '1px solid',
      borderRadius: 'base',
      _focus: {
        boxShadow: null
      }
    },
    label: {
      lineHeight: '18px',
      ml: 3
    }
  },
  sizes
}
