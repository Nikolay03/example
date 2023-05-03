import { ReactElement } from 'react'
import { Box, SimpleGrid, SimpleGridProps, Skeleton, SkeletonText, Stack } from '@chakra-ui/react'

function ReportSkeleton (): ReactElement {
  return (
    <Box mb={4}>
      <Stack direction={'row'} spacing={5}>
        <Skeleton h={9} w={7} />
        <SkeletonText
          noOfLines={2}
          spacing={3}
          width={'65%'}
        />
      </Stack>
    </Box>
  )
}

export default function ReportsSkeleton (props: SimpleGridProps): ReactElement {
  return (
    <SimpleGrid {...props}>
      <ReportSkeleton />
      <ReportSkeleton />
      <ReportSkeleton />
      <ReportSkeleton />
    </SimpleGrid>
  )
}
