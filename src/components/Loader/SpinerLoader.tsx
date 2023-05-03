import { Spinner, Flex } from '@chakra-ui/react'
import { SpinnerProps } from '@chakra-ui/spinner/dist/types/spinner'
import { ReactElement } from 'react'

const SpinnerLoader = (props: SpinnerProps): ReactElement => {
  return (
    <Flex align={'center'} justify={'center'} px={6} py={6}>
      <Spinner
        thickness={'4px'}
        speed={'0.65s'}
        emptyColor={'gray.200'}
        color={'primary.500'}
        size={'xl'}
        {...props}
      />
    </Flex>
  )
}

export default SpinnerLoader
