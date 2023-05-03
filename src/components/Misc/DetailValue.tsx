import { ReactElement, ReactNode } from 'react'
import { Box, Stack, SimpleGrid, StackProps, SimpleGridProps } from '@chakra-ui/react'

import { HtmlContent } from '~/components/Utils'

interface Props extends StackProps, Omit<SimpleGridProps, 'spacing'> {
  label: string
  value: ReactNode
  labelColor?: string
  variant?: 'block' | 'inline'
}

function DetailValue (props: Props): ReactElement {
  const { label, labelColor, value, variant, ...restProps } = props

  if (variant === 'block') {
    return (
      <Stack spacing={6} {...restProps}>
        <Box color={labelColor}>
          <HtmlContent html={label} />
        </Box>
        <Box fontWeight={'medium'}>{value}</Box>
      </Stack>
    )
  }

  return (
    <SimpleGrid columns={2} spacing={4} {...restProps}>
      <Box color={labelColor || 'gray.500'}>
        <HtmlContent html={label} />
      </Box>
      <Box fontWeight={'medium'} textAlign={'right'} ml={'auto'}>{value}</Box>
    </SimpleGrid>
  )
}

DetailValue.defaultProps = {
  variant: 'inline'
}

export default DetailValue
