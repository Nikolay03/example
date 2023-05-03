import { ReactElement } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

export default function HomeSection (props: BoxProps): ReactElement {
  return (
    <Box as={'section'} pt={20} pb={20} {...props} />
  )
}
