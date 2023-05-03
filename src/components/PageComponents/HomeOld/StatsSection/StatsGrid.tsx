import { ReactElement, ReactNode } from 'react'
import { SimpleGrid } from '@chakra-ui/react'

import StatSkeleton from './StatsSkeleton'

interface Props {
  isLoading: boolean
  children: ReactNode
}

export default function StatsGrid (props: Props): ReactElement {
  const { children, isLoading } = props

  const gridProps = {
    columns: { base: 1, md: 2, lg: 4 },
    spacing: 6
  }

  if (isLoading) {
    return (
      <StatSkeleton {...gridProps} />
    )
  }

  return (
    <SimpleGrid {...gridProps}>
      {children}
    </SimpleGrid>
  )
}
