import { ReactElement } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

export default function TableContainer (props: BoxProps): ReactElement {
  const { children, ...restProps } = props

  return (
    <Box
      bgColor={'gray.100'}
      borderRadius={{ base: 'lg', md: '2xl' }}
      py={{ base: 6, md: 8 }}
      px={{ base: 4, md: 8 }}
      {...restProps}>
      {children}
    </Box>
  )
}
