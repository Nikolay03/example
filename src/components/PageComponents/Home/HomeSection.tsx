import { ReactElement } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

export default function HomeSection (props: BoxProps): ReactElement {
  return (
    <Box as={'section'} pt={{ base: 8, md: 20 }} pb={{ base: 8, md: 20 }} {...props} />
  )
}
