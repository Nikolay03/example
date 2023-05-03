import { Box, Flex } from '@chakra-ui/react'
import { ReactNode, ReactElement } from 'react'

import LayoutContent from './LayoutContent'

import { useDOM } from '~/components/Utils/Contexts'
import { useDimensions } from '~/hooks/index'
import Header from '~/components/Header'
import Footer from '~/components/Footer'

interface Props {
  children: ReactNode
  themeType?: 'azure'
}

export default function BaseLayout (props: Props): ReactElement {
  const { children, themeType, ...restProps } = props

  const { headerRef } = useDOM()
  const { height: headerHeight } = useDimensions(headerRef)

  const isAzure = themeType === 'azure'

  return (
    <Flex direction={'column'} minH={'100vh'} {...restProps}>
      <Header themeType={themeType} />

      <Box
        as={'main'}
        flexGrow={1}
        pt={`${headerHeight}px`}
        transition={'all 200ms'}
        textStyle={isAzure && 'secondary'}
      >
        <LayoutContent>
          {children}
        </LayoutContent>
      </Box>

      <Footer themeType={themeType} />
    </Flex>
  )
}
