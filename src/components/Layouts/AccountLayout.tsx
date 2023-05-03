import { ReactNode, ReactElement } from 'react'
import { Box, Flex } from '@chakra-ui/react'

import LayoutContent from './LayoutContent'

import { useDimensions } from '~/hooks/index'
import { useDOM } from '~/components/Utils/Contexts'
import Container from '~/components/Container'
import Header from '~/components/Header'
import Footer from '~/components/Footer'

interface Props {
  children: ReactNode
}

export default function AccountLayout (props: Props): ReactElement {
  const { headerRef } = useDOM()
  const { height: headerHeight } = useDimensions(headerRef)

  return (
    <Flex
      bgColor={'gray.100'}
      direction={'column'}
      minH={'100vh'}>
      <Header />

      <Box
        as={'main'}
        flexGrow={1}
        pt={`${headerHeight}px`}
        transition={'all 200ms'}>
        <LayoutContent>
          <Container flexGrow={1}>
            <Box pt={8} pb={{ base: 8, md: 20 }}>
              {props.children}
            </Box>
          </Container>
        </LayoutContent>
      </Box>

      <Footer bgColor={'transparent'} />
    </Flex>
  )
}
