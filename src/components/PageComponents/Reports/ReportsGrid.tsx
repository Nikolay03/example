import { ReactElement, ReactNode } from 'react'
import { isEmpty } from 'ramda'
import { Center, SimpleGrid, SimpleGridProps } from '@chakra-ui/react'

import ReportsSkeleton from './ReportsSkeleton'

import { TAccountReport, TReport } from '~/types/reports'
import { useTranslate } from '~/utils/translate'

interface Props extends SimpleGridProps {
  children: ReactNode
  list: TReport[] | TAccountReport[]
  isLoading: boolean
}

export default function ReportsGrid (props: Props): ReactElement {
  const { children, list, isLoading, ...restProps } = props

  const { t } = useTranslate()

  const gridProps = {
    columns: { base: 1, md: 2 },
    spacingX: 6,
    spacingY: { base: 6, md: 4 }
  }

  if (isLoading) {
    return (
      <ReportsSkeleton {...gridProps} {...restProps} />
    )
  }

  if (isEmpty(list)) {
    return (
      <Center>
        {t('reports_empty_list')}
      </Center>
    )
  }

  return (
    <SimpleGrid {...gridProps} {...restProps}>
      {children}
    </SimpleGrid>
  )
}
