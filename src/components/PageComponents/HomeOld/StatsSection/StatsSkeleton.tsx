import { ReactElement } from 'react'
import { SimpleGrid, SimpleGridProps, Skeleton } from '@chakra-ui/react'

import StatCard from './StatCard'

const StatSkeleton = () => (
  <StatCard spacing={4}>
    <Skeleton h={4} w={'50%'} />
    <Skeleton h={3} />
  </StatCard>
)

export default function StatsSkeleton (props: SimpleGridProps): ReactElement {
  return (
    <SimpleGrid {...props}>
      <StatSkeleton />
      <StatSkeleton />
      <StatSkeleton />
      <StatSkeleton />
    </SimpleGrid>
  )
}
