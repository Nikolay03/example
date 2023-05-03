
import { ReactElement } from 'react'

import { useTranslate } from '~/utils/translate'
import { TStatisticsExport } from '~/types/statistics'

interface Props {
  data: TStatisticsExport[]
}
const StatisticsExportChart = ({ data }: Props): ReactElement => {
  const { t } = useTranslate()
  return (
    <div />
  )
}

export default StatisticsExportChart
