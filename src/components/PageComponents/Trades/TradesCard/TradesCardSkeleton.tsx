import { ReactElement } from 'react'
import { Box, Flex, SimpleGrid, SimpleGridProps, Skeleton, Stack } from '@chakra-ui/react'

const TradeValue = () => (
  <Flex justify={'space-between'}>
    <Skeleton h={3} w={'35%'} />
    <Skeleton h={3} w={'45%'} />
  </Flex>
)

const TradeCardSkeleton = () => (
  <Box bgColor={'gray.100'} borderRadius={'xl'} p={8}>
    <Skeleton h={4} w={'70%'} mb={6} />
    <Stack spacing={4}>
      <TradeValue />
      <TradeValue />
      <TradeValue />
      <TradeValue />
      <TradeValue />
      <TradeValue />
      <TradeValue />
    </Stack>
  </Box>
)

export default function TradesCardSkeleton (props: SimpleGridProps): ReactElement {
  return (
    <SimpleGrid {...props}>
      <TradeCardSkeleton />
      <TradeCardSkeleton />
      <TradeCardSkeleton />
      <TradeCardSkeleton />
    </SimpleGrid>
  )
}
