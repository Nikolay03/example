import { path, pick, pipe, prop } from 'ramda'
import startOfMonth from 'date-fns/startOfMonth'
import { ReactElement } from 'react'

import { WizardFormProvider } from '~/components/Utils/Contexts'
import { useTabTitle } from '~/components/Titles'
import { StatisticsTypes } from '~/types/enums'
import { useRequest } from '~/hooks/api'
import { STATISTICS_EXPORT } from '~/constants/api'
import StatisticsExportGrid
  from '~/components/PageComponents/HomeOld/StatisticsSection/StatisticsExport/StatisticsExportGrid'
import { DATE_FORMATS, useDateFormat } from '~/utils/date'
import { formatDateValues } from '~/utils/formValues'
import { TProductGroupAttributeNameTrade } from '~/types/products'
import { TStatisticsExport } from '~/types/statistics'
import { TStateListData } from '~/types/state'

enum DateFields {
  from = 'from',
  to = 'to',
}

export interface Props {
  statisticsExportProductsData: TStateListData<TProductGroupAttributeNameTrade>
}

const StatisticsExport = ({ statisticsExportProductsData }: Props): ReactElement => {
  const defaultTab = StatisticsTypes.EXPORT
  const { tab, onChangeTab } = useTabTitle({
    initialTab: defaultTab
  })
  const defaultProduct = path(['results', '0'], statisticsExportProductsData) as TProductGroupAttributeNameTrade
  const { dateFormat } = useDateFormat()
  const initialState = {
    // @ts-ignore
    from: dateFormat(startOfMonth(new Date()), DATE_FORMATS.DATE_FORMAT_SERVER),
    // @ts-ignore
    to: dateFormat(new Date(), DATE_FORMATS.DATE_FORMAT_SERVER)
  }
  const dateValues = pipe(
    pick(Object.values(DateFields)),
    (values) => formatDateValues(values)
  )(initialState)
  const { results, isLoading, refetch } = useRequest<TStatisticsExport>(STATISTICS_EXPORT, {
    disableLocale: false,
    disableUrlParams: true,
    params: {
      type: defaultTab,
      name: prop('name', defaultProduct),
      ...initialState
    }
  })
  return (
    <WizardFormProvider initialState={{ commodityGroupClassifier: defaultProduct, ...dateValues }}>
      <StatisticsExportGrid
        tab={tab}
        data={results}
        refetch={refetch}
        isLoading={isLoading}
        onChangeTab={onChangeTab}
      />
    </WizardFormProvider>
  )
}

export default StatisticsExport
