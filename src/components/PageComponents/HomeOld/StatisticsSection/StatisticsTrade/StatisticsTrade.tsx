import { path } from 'ramda'

import { WizardFormProvider } from '~/components/Utils/Contexts'
import { useRequest } from '~/hooks/api'
import { STATISTICS_TRADE } from '~/constants/api'
import { useHomeData } from '~/components/PageComponents/HomeOld'
import * as ENUMS from '~/types/enums'
import StatisticsTradeGrid
  from '~/components/PageComponents/HomeOld/StatisticsSection/StatisticsTrade/StatisticsTradeGrid'
import { TProductGroupAttributeName } from '~/types/products'
import { TStatisticsTrade } from '~/types/statistics'

const StatisticsTrade = props => {
  const { statisticsProductsData } = useHomeData()
  const defaultProduct = path(['results', '0'], statisticsProductsData) as TProductGroupAttributeName
  const initialState = {
    periodType: { id: ENUMS.StatisticsPeriodTypes.YEAR },
    commodityGroupClassifier: defaultProduct
  }
  const { isLoading, data, refetch } = useRequest<TStatisticsTrade>(STATISTICS_TRADE, {
    disableLocale: false,
    disableUrlParams: true,
    params: {
      commodity_group_classifier: defaultProduct?.id,
      period_type: ENUMS.StatisticsPeriodTypes.YEAR
    }
  })
  return (
    <WizardFormProvider initialState={initialState}>
      {/* @ts-ignore */}
      <StatisticsTradeGrid isLoading={isLoading} refetch={refetch} data={data as TStatisticsTrade[]} />
    </WizardFormProvider>
  )
}

export default StatisticsTrade
