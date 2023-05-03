import { ReactElement } from 'react'
import { Flex, FlexProps } from '@chakra-ui/react'

export default function TableActions (props: FlexProps): ReactElement {
  const { children } = props

  return (
    <Flex align={'center'} justify={'space-between'} mb={2}>
      {children}
    </Flex>
  )
}
