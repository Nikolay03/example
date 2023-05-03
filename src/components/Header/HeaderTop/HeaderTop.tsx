import { ReactElement } from 'react'
import { Box, Flex } from '@chakra-ui/react'

import Currencies from './Currencies'
import HeaderInfo from './HeaderInfo'

import Container from '~/components/Container'
import { ClientRender } from '~/components/Utils'

interface Props {
  themeType?: 'azure'
}

export default function HeaderTop ({ themeType }: Props): ReactElement {
  return (
    <Box
      bgColor={'palette.common.darkGray'}
      color={'white'}
      display={{ base: 'none', lg: 'block' }}
      maxH={10}
      py={'10px'}>
      <Flex as={Container} direction={'column'} justify={'center'} h={'100%'}>
        <Flex
          align={'center'}
          lineHeight={'20px'}
          justify={'space-between'}
          wrap={'wrap'}>
          <ClientRender>
            <Currencies />
          </ClientRender>
          <HeaderInfo themeType={themeType} />
        </Flex>
      </Flex>
    </Box>
  )
}
