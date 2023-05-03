import { ReactElement } from 'react'
import { Box } from '@chakra-ui/react'

import FooterCopyright from './FooterCopyright'

export default function FooterSimple (): ReactElement {
  return (
    <Box as={'footer'}>
      <FooterCopyright />
    </Box>
  )
}
