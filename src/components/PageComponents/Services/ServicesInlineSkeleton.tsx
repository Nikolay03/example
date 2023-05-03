import { ReactElement } from 'react'
import { Skeleton, SkeletonText, Stack, StackProps } from '@chakra-ui/react'

function ServiceCardSkeleton (): ReactElement {
  return (
    <Stack direction={'row'} spacing={6}>
      <Skeleton
        borderRadius={'2xl'}
        h={'110px'}
        minW={'175px'}
      />

      <Stack flexGrow={1} spacing={4}>
        <Skeleton h={3} w={20} />
        <Skeleton h={4} w={'50%'} />
        <SkeletonText noOfLines={3} spacing={3} />
      </Stack>
    </Stack>
  )
}

export default function ServicesInlineSkeleton (props: StackProps): ReactElement {
  return (
    <Stack {...props}>
      <ServiceCardSkeleton />
      <ServiceCardSkeleton />
      <ServiceCardSkeleton />
    </Stack>
  )
}
