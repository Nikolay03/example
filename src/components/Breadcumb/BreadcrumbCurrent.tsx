import { ReactElement } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

export default function BreadcrumbCurrent (props: BoxProps): ReactElement {
  return (
    <Box as={'span'} color={'gray.500'} {...props} />
  )
}
