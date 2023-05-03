import { ReactElement } from 'react'
import { Container as ChakraContainer, ContainerProps } from '@chakra-ui/react'

export default function BigContainer (props: ContainerProps): ReactElement {
  return (
    <ChakraContainer
      maxW={'container.xl'}
      mx={'auto'}
      px={{ base: 4, lg: '130px' }}
      w={'full'}
      maxWidth={{
        sm: '640px',
        md: '768px',
        lg: '1250px',
        xl: '1600px'
      }}
      {...props}
    />
  )
}
