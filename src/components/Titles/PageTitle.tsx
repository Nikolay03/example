import { ReactElement, ReactNode } from 'react'
import { Box, BoxProps, Text } from '@chakra-ui/react'

import PageHeading from './PageHeading'

interface Props extends BoxProps {
  children: ReactNode
  description?: string
}

export default function PageTitle (props: Props): ReactElement {
  const { children, description, ...restProps } = props

  return (
    <Box
      maxW={'container.sm'}
      mb={{ base: 10, md: 16 }}
      mx={'auto'}
      textAlign={'center'}
      {...restProps}>
      <PageHeading>
        {children}
      </PageHeading>
      {description && (
        <Text
          color={'gray.500'}
          fontSize={'lg'}
          fontWeight={'medium'}
          mt={6}>
          {description}
        </Text>
      )}
    </Box>
  )
}
