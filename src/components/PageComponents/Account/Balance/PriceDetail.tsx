import { ReactElement } from 'react'
import { Box, Flex, Stack } from '@chakra-ui/react'

import { DashedDivider } from '~/components/Misc'

interface Props {
  label: string
  price: string
}

export default function PriceDetail (props: Props): ReactElement {
  const { label, price } = props

  return (
    <Stack mt={6} spacing={6}>
      <DashedDivider />
      <Flex
        align={'center'}
        fontWeight={'semibold'}
        justify={'space-between'}>
        <Box mr={4}>{label}</Box>
        <Box fontSize={'xl'}>{price}</Box>
      </Flex>
    </Stack>
  )
}
