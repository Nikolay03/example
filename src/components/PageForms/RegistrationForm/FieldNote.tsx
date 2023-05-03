import { ReactElement } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

export default function FieldNote (props: BoxProps): ReactElement {
  return (
    <Box color={'gray.500'} fontSize={'xs'} {...props} />
  )
}
