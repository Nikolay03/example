import { ReactElement } from 'react'
import { Container as ChakraContainer, ContainerProps } from '@chakra-ui/react'

export default function Container (props: ContainerProps): ReactElement {
  return (
    <ChakraContainer
      maxW={'container.xl'}
      mx={'auto'}
      px={{ base: 4, xl: '30px' }}
      w={'full'}
      {...props}
    />
  )
}
