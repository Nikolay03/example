
import { ReactElement } from 'react'
import { Box } from '@chakra-ui/react'

import HeaderTop from './HeaderTop'
import NavBar from './NavBar'

import { useDOM } from '~/components/Utils/Contexts'

interface Props {
  themeType?: 'azure'
}
export default function Header ({ themeType }: Props): ReactElement {
  const { headerRef } = useDOM()
  const isAzure = themeType === 'azure'
  return (
    <Box
      ref={headerRef}
      as={'header'}
      bg={{ base: isAzure ? 'linear-gradient(to right, #C4EBE8 0% 64%, #14AFA6 64% 100%)' : 'white' }}
      borderBottom={'1px'}
      borderColor={isAzure ? 'transparent' : 'gray.200'}
      pos={'fixed'}
      top={0}
      left={0}
      right={0}
      zIndex={'100'}>
      <HeaderTop themeType={themeType} />
      <NavBar themeType={themeType} />
    </Box>
  )
}
