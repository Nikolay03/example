import { ReactElement } from 'react'
import { isEmpty, path } from 'ramda'
import { Stack } from '@chakra-ui/react'

import StatisticsChart from './StatisticsChart'

import { TStatisticsChart } from '~/types/statistics'
import { TStateListData } from '~/types/state'
import { TObject } from '~/types/constants'
import { TableEmptyData } from '~/components/Table'
import SpinnerLoader from '~/components/Loader'
import * as ENUMS from '~/types/enums'
import { useWizard } from '~/components/Utils/Contexts'
import ReportBanner from '~/components/PageComponents/HomeOld/ReportsSection/ReportBanner'

interface Props {
  data: TStateListData<TStatisticsChart> & TObject
  results: TStatisticsChart[]
  category: string,
  type: string,
  isLoading: boolean
}
const StatisticsContent = ({ isLoading, data, results, category, type }: Props): ReactElement => {
  const isPeriod = category === ENUMS.StatisticsCompareTypes.PERIOD
  const { state } = useWizard()
  const country = path(['country', 'name'], state)
  const region = path(['region', 'name'], state)
  const superMarket = path(['superMarket', 'name'], state)

  const commodityGroupClassifier = path<string>(['commodityGroupClassifier', 'name'], state)
  const chartTitle = country || region || superMarket || commodityGroupClassifier
  return (
    <Stack spacing={8}>
      {isLoading
        ? (
          <SpinnerLoader />
        )
        : !chartTitle
          ? null
          : (isEmpty(isPeriod ? data : results))
            ? (
              <TableEmptyData />
            )
            : (
              <StatisticsChart
                data={data}
                results={results}
                category={category}
                type={type}
              />
            )}
      <ReportBanner />
    </Stack>
  )
}

export default StatisticsContent
