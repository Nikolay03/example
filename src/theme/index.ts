import { extendTheme } from '@chakra-ui/react'

import colors from './colors'
import components from './components'
import styles from './styles'

/*

"breakpoints": ["0em","30em","48em","62em","80em","96em"]

xs (0 - 480px) 0 - 30em
sm (480px - 768px) 30em - 48em
md (768px - 992px) 48em - 62em
lg (992px - 1280px) 62em - 80em
xl (1280px - 1536px) 80em - 96em

*/
const textStyles = {
  primary: {
    fontFamily: '"Gilroy", sans-serif'
  },
  secondary: {
    fontFamily: '"Montserrat", sans-serif'
  }
}
const fonts = {
  body: '"Gilroy", sans-serif',
  heading: '"Gilroy", sans-serif'
}

const sizes = {
  container: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1230px'
  }
}

export default extendTheme({
  colors,
  components,
  fonts,
  sizes,
  styles,
  textStyles
})
