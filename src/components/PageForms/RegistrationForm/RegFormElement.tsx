import { ReactElement } from 'react'
import { Flex, FlexProps } from '@chakra-ui/react'

export default function RegFormElement (props: FlexProps): ReactElement {
  return (
    <Flex
      direction={'column'}
      justify={'space-between'}
      h={'full'}
      {...props}
    />
  )
}
