import { ReactElement } from 'react'
import { Text, TextProps } from '@chakra-ui/react'

export default function ModalDescription (props: TextProps): ReactElement {
  return (
    <Text align={'center'} color={'gray.500'} {...props} />
  )
}
