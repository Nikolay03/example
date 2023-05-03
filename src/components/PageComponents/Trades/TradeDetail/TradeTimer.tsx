import { ReactElement } from 'react'
import { isAfter } from 'date-fns'

import { useDateFormat } from '~/utils/date'
import { useTranslate } from '~/utils/translate'
import StatusTag from '~/components/StatusTag'

interface Props {
  endDate: string
}

export default function TradeTimer (props: Props): ReactElement {
  const { endDate } = props

  const { t } = useTranslate()

  const { getDurationFromInterval } = useDateFormat()

  const currentDate = new Date()
  const timeLeft = getDurationFromInterval(currentDate, endDate, {
    format: ['days', 'hours', 'minutes']
  })
  const timeLeftLabel = t('trades_detail_time_left', { timeLeft })
  const isExpired = isAfter(currentDate, new Date(endDate))

  if (isExpired) return null

  return (
    <StatusTag color={'palette.common.orange'} fontWeight={'medium'}>
      {timeLeftLabel}
    </StatusTag>
  )
}
