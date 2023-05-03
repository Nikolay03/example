import { defaultProps, sizes } from '../common/checkboxStyles'

export default {
  defaultProps,
  baseStyle: {
    container: {
      cursor: 'pointer'
    },
    control: {
      position: 'relative',
      '&[aria-checked=true]::before, &[data-checked]::before': {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: 'calc(100% - 4px)',
        width: 'calc(100% - 4px)'
      },
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
