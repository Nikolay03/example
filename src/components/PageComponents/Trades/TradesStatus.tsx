import { ReactElement } from 'react'

import { TradeStatuses } from '~/types/enums'
import { useTranslate } from '~/utils/translate'
import StatusTag from '~/components/StatusTag'

const statusColors = {
  [TradeStatuses.ACTIVE]: 'primary.500',
  [TradeStatuses.CLOSED]: 'palette.common.red',
  [TradeStatuses.CANCELED]: 'palette.common.red',
  [TradeStatuses.DRAFT]: 'palette.common.orange'
}

interface Props {
  status: TradeStatuses
}

export default function TradesStatus (props: Props): ReactElement {
  const { status } = props

  const { t } = useTranslate()

  const statusName = t(`trades_table_status_${status}`)

  return (
    <StatusTag color={statusColors[status]}>
      {statusName}
    </StatusTag>
  )
}
