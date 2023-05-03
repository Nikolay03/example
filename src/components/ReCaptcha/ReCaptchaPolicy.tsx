import { ReactElement } from 'react'
import { Box, BoxProps, Link } from '@chakra-ui/react'

export default function ReCaptchaPolicy (props: BoxProps): ReactElement {
  const linkProps = {
    color: 'primary.500',
    isExternal: true
  }

  return (
    <Box color={'gray.500'} {...props}>
      This site is protected by reCAPTCHA and the Google
      <Link {...linkProps} href={'https://policies.google.com/privacy'}> Privacy Policy</Link> and
      <Link {...linkProps} href={'https://policies.google.com/terms'}> Terms of Service</Link> apply.
    </Box>
  )
}
