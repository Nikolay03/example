import { ReactElement } from 'react'
import { Box, Flex } from '@chakra-ui/react'

import Languages from './HeaderTop/Languages'

import { ROOT_URL } from '~/constants/routes'
import Container from '~/components/Container'
import Logo from '~/components/Logo'
import Link from '~/components/Link'

export default function HeaderSimple (): ReactElement {
  return (
    <Box as={'header'} bgColor={'transparent'} pt={'22px'} pb={'4px'}>
      <Container>
        <Flex align={'center'} justify={'space-between'}>
          <Link href={ROOT_URL}>
            <Logo />
          </Link>

          <Languages />
        </Flex>
      </Container>
    </Box>
  )
}
