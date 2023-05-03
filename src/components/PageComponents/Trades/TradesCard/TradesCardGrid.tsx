import { ReactNode, ReactElement } from 'react'
import { isEmpty } from 'ramda'
import { Center, SimpleGrid } from '@chakra-ui/react'

import TradesCardSkeleton from './TradesCardSkeleton'

import { useTranslate } from '~/utils/translate'

interface Props {
  children: ReactNode,
  isLoading: boolean
}

export default function TradesCardGrid (props: Props): ReactElement {
  const { children, isLoading } = props

  const { t } = useTranslate()

  const gridProps = {
    columns: { base: 1, md: 2 },
    spacing: 6
  }

  if (isLoading) {
    return (
      <TradesCardSkeleton {...gridProps} />
    )
  }

  if (isEmpty(children)) {
    return (
      <Center>
        {t('table_no_data')}
      </Center>
    )
  }

  return (
    <SimpleGrid {...gridProps}>
      {children}
    </SimpleGrid>
  )
}
