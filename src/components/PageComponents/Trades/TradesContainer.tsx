import { ReactElement } from 'react'

import TradesTable from './TradesTable'
import { TradesCardGrid, TradesCard } from './TradesCard'

import { TTradesTable } from '~/types/trades'
import { useMediaBreakpoint } from '~/hooks/index'
import { ClientRender } from '~/components/Utils'

interface Props {
  results: TTradesTable[]
  isLoading?: boolean
  withSorting?: boolean
}

export default function TradesContainer (props: Props): ReactElement {
  const { results, isLoading } = props

  const isLargerThanLG = useMediaBreakpoint({ breakpoint: 'lg' })

  if (isLargerThanLG) {
    return (
      <ClientRender>
        <TradesTable {...props} />
      </ClientRender>
    )
  }

  return (
    <ClientRender>
      <TradesCardGrid isLoading={isLoading}>
        {results.map(item => (
          <TradesCard key={item.id} data={item} />
        ))}
      </TradesCardGrid>
    </ClientRender>
  )
}
