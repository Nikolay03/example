import { ReactElement } from 'react'
import { Flex, Skeleton, SkeletonText, Stack } from '@chakra-ui/react'

const DetailValueSkeleton = () => (
  <Flex align={'center'} justify={'space-between'}>
    <Skeleton h={3} w={'15%'} />
    <Skeleton h={3} w={'35%'} />
  </Flex>
)

const ValueMessageSkeleton = () => (
  <Stack spacing={4}>
    <Skeleton h={3} w={'15%'} />
    <SkeletonText noOfLines={4} spacing={3} />
  </Stack>
)

export default function FeedbackDetailSkeleton (): ReactElement {
  return (
    <Stack spacing={8}>
      <DetailValueSkeleton />
      <DetailValueSkeleton />
      <DetailValueSkeleton />
      <DetailValueSkeleton />
      <ValueMessageSkeleton />
    </Stack>
  )
}
