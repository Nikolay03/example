import { ReactElement } from 'react'
import { Box, Center } from '@chakra-ui/react'

import CopyrightText from './CopyrightText'

import Container from '~/components/Container'

export default function FooterCopyright (): ReactElement {
  return (
    <Box py={6} borderTop={'1px'} borderColor={'gray.200'}>
      <Container>
        <Center>
          <CopyrightText />
        </Center>
      </Container>
    </Box>
  )
}
