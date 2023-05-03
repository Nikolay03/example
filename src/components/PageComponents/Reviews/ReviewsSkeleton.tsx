import { ReactElement } from 'react'
import { Skeleton, SkeletonText, Stack, StackProps } from '@chakra-ui/react'

import RatingStar from '~/components/RatingStar'

function ReviewSkeleton () {
  return (
    <Stack borderColor={'gray.200'} borderRadius={'xl'} borderWidth={1} p={8}>
      <Skeleton h={3} w={'35%'} />
      <RatingStar isReadOnly={true} value={0} />
      <SkeletonText noOfLines={4} spacing={3} />
    </Stack>
  )
}

export default function ReviewsSkeleton (props: StackProps): ReactElement {
  return (
    <Stack {...props}>
      <ReviewSkeleton />
      <ReviewSkeleton />
    </Stack>
  )
}
