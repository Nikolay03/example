import { pick, pipe } from 'ramda'
import subMonths from 'date-fns/subMonths'
import { useRouter } from 'next/router'
import { useState } from 'react'

import StatisticsFilter, { STATISTICS_CATEGORY_TWO } from './StatisticsFilter'
import StatisticsContent from './StatisticsContent'

import { WizardFormProvider } from '~/components/Utils/Contexts'
import { useRequest } from '~/hooks/api'
import { TStatisticsExport } from '~/types/statistics'
import { DATE_FORMATS, useDateFormat } from '~/utils/date'
import { formatDateValues } from '~/utils/formValues'
import { statisticsChartApi } from '~/hooks/form/useSubmitStatistics'

enum DateFields {
  from = 'from',
  to = 'to',
}

const StatisticsGrid = () => {
  const { dateFormat } = useDateFormat()
  const initialState = {
    // @ts-ignore
    from: dateFormat(subMonths(new Date(), 6), DATE_FORMATS.DATE_FORMAT_SERVER),
    // @ts-ignore
    to: dateFormat(new Date(), DATE_FORMATS.DATE_FORMAT_SERVER)
  }
  const { query } = useRouter()
  const categoryQuery = query?.[STATISTICS_CATEGORY_TWO] as string
  const typeQuery = query?.category as string
  const [category, setCategory] = useState<string>(categoryQuery)
  const [type, setType] = useState<string>(typeQuery)
  const api = statisticsChartApi({ type: type, compare: category })
  const { data, results, isLoading, refetch } = useRequest<TStatisticsExport>(
    api, {
      disableLocale: false,
      disableUrlParams: true,
      params: {
        ...initialState
      }
    })
  const dateValues = pipe(
    pick(Object.values(DateFields)),
    (values) => formatDateValues(values)
  )(initialState)
  return (
    <>
      <WizardFormProvider initialState={{ ...dateValues }}>
        <StatisticsFilter refetch={refetch} dateValues={dateValues} />
        <StatisticsContent
          category={category}
          type={type}
          data={data}
          results={results}
          isLoading={isLoading}
        />
      </WizardFormProvider>
    </>
  )
}

export default StatisticsGrid
