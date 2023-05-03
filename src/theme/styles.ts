export default {
  global: {
    body: {
      bg: 'white',
      color: 'palette.text.default',
      fontFamily: 'body',
      fontWeight: 'medium',
      lineHeight: 'initial',
      height: 'auto',
      margin: 0,
      minHeight: '100%',
      width: '100%'
    },
    '*::placeholder': {
      color: 'gray.500'
    },
    'b, strong': {
      fontWeight: 'bold'
    },
    '.chakra-button__icon svg': {
      h: '20px',
      minW: '20px',
      w: '20px'
    },
    '.grecaptcha-badge': {
      visibility: 'hidden'
    }
  }
}
