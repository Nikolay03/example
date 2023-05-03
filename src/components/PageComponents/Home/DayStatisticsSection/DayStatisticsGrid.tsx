import { ReactElement, ReactNodeArray } from 'react'
import { SimpleGrid, SimpleGridProps } from '@chakra-ui/react'

import { useTranslate } from '~/utils/translate'
import StatSkeleton from '~/components/PageComponents/HomeOld/StatsSection/StatsSkeleton'

interface Props extends SimpleGridProps {
  children: ReactNodeArray
  isLoading: boolean
}

export default function DayStatisticsGrid (props: Props): ReactElement {
  const { children, isLoading, ...restProps } = props

  const { t } = useTranslate()

  const gridProps = {
    columns: { base: 1, md: 2, lg: 4 },
    spacingX: 10,
    spacingY: 8,
    ...restProps
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
