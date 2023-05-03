import { ReactElement } from 'react'
import { Box, Flex } from '@chakra-ui/react'

import Navigation from './Navigation'
import MobileNavigation from './MobileNavigation'
import HeaderAuth from './HeaderAuth'

import Container from '~/components/Container'
import * as ROUTES from '~/constants/routes'
import Logo from '~/components/Logo'
import Link from '~/components/Link'

interface Props {
  themeType?: 'azure'
}
export default function NavBar ({ themeType }: Props): ReactElement {
  const isAzure = themeType === 'azure'

  return (
    <Box py={{ base: 2, lg: 5 }}>
      <Container variant={isAzure && 'azure'}>
        <Flex align={'center'} justify={'space-between'}>
          <Link href={ROUTES.ROOT_URL}>
            <Logo themeType={themeType} />
          </Link>
          <Navigation />

          <MobileNavigation />

          <HeaderAuth themeType={themeType} />
        </Flex>
      </Container>
    </Box>
  )
}
