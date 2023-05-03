import { ReactElement } from 'react'
import { Box, Skeleton, SkeletonCircle, SkeletonText, Stack } from '@chakra-ui/react'

function CardSkeleton () {
  return (
    <Stack direction={'row'} spacing={4}>
      <SkeletonCircle size={'9'} />
      <Box flexGrow={1}>
        <SkeletonText noOfLines={2} spacing={3} w={'75%'} />
      </Box>
    </Stack>
  )
}

function DateGroupSkeleton () {
  return (
    <Stack spacing={4}>
      <Skeleton h={4} w={20} />

      <Stack spacing={6}>
        <CardSkeleton />
        <CardSkeleton />
      </Stack>
    </Stack>
  )
}

export default function NotificationsSkeleton (): ReactElement {
  return (
    <>
      <DateGroupSkeleton />
      <DateGroupSkeleton />
    </>
  )
}
