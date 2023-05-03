import { ReactElement } from 'react'
import { Flex, FlexProps } from '@chakra-ui/react'

export default function TabTitleWrap (props: FlexProps): ReactElement {
  return (
    <Flex
      align={'center'}
      gridColumnGap={{ base: 4, md: 'unset' }}
      gridRowGap={{ base: 4, md: 'unset' }}
      justify={'space-between'}
      wrap={{ base: 'wrap', md: 'unset' }}
      {...props}
    />
  )
}
