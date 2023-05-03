import { ReactElement } from 'react'
import { groupBy, pipe, prop, toPairs, map, path, propOr, uniqBy, propEq, find, pathOr } from 'ramda'
import { Box, Stack } from '@chakra-ui/react'
import Highcharts from 'highcharts'

import { useTranslate } from '~/utils/translate'
import { TStatisticsChart } from '~/types/statistics'
import { useWizard } from '~/components/Utils/Contexts'
import * as ENUMS from '~/types/enums'
import { TStateListData } from '~/types/state'
import { TObject } from '~/types/constants'
import { useDateFormat } from '~/utils/date'
import Chart from '~/components/Charts/Chart'

interface Props {
  data: TStateListData<TStatisticsChart> & TObject
  results: TStatisticsChart[]
  category: string
  type: string
}
const chartProps = {
  connectNulls: true,
  yAxis: {
    title: {
      text: 'Средняя цена'
    }
  },
  credits: {
    enabled: false
  },
  title: {
    text: '',
    style: {
      display: 'none'
    }
  },
  tooltip: {
    shared: true
  },
  plotOptions: {
    series: {
      connectNulls: true,
      label: {
        connectorAllowed: false
      }
    },
    spline: {
      marker: {
        radius: 4,
        lineColor: '#666666',
        lineWidth: 1
      }
    }
  },
  navigation: {
    buttonOptions: {
      enabled: false
    }
  }
}

const getLabels = (arr = []) => {
  return pipe(
    uniqBy(prop('date')),
    map(i => i.date)
  )(arr)
}
const StatisticsChart = ({ data, results, category, type }: Props): ReactElement => {
  const { t } = useTranslate()
  const firstPeriod = pathOr([], ['firstPeriod'], data)
  const secondPeriod = pathOr([], ['secondPeriod'], data)

  const isCountry = category === ENUMS.StatisticsCompareTypes.COUNTRY
  const isBozor = category === ENUMS.StatisticsCompareTypes.REGION
  const isSuperMarket = category === ENUMS.StatisticsCompareTypes.SUPERMARKETS
  const isPeriod = category === ENUMS.StatisticsCompareTypes.PERIOD

  const { dateFormat } = useDateFormat()
  // @ts-ignore
  const labels = getLabels(results)

  // @ts-ignore
  const labelsFirstPeriod = getLabels(firstPeriod)

  // @ts-ignore
  const labelsSecondPeriod = getLabels(secondPeriod)
  // @ts-ignore
  const arrGroup = pipe(
    groupBy(prop(isCountry
      ? ENUMS.StatisticsCompareTypes.COUNTRY
      : isBozor
        ? ENUMS.StatisticsCompareTypes.REGION
        : isSuperMarket
          ? ENUMS.StatisticsCompareTypes.SUPERMARKETS
          : 'name')),
    toPairs,
    map(arr => ({
      name: arr[0],
      data: labels.map(i => {
        const item = pipe(
          find(propEq('date', i)),
          (val) => propOr(null, 'avr', val) || propOr(null, 'price', val)
          // @ts-ignore
        )(arr[1])
        return item
      })
    }))
  )(results)
  const { state } = useWizard()
  const country = path(['country', 'name'], state)
  const region = path(['region', 'name'], state)
  const superMarket = path(['superMarket', 'name'], state)

  const commodityGroupClassifier = path<string>(['commodityGroupClassifier', 'name'], state)

  const chartTitle = country || region || superMarket || commodityGroupClassifier

  const from = path<string>(['from'], state)
  const to = path<string>(['to'], state)
  const secondFrom = path<string>(['secondFrom'], state)
  const secondTo = path<string>(['secondTo'], state)
  const options: Highcharts.Options = {
    // @ts-ignore
    series: arrGroup.map(s => ({
      name: s.name,
      data: s.data
    })),
    xAxis: {
      categories: labels as string[],
      title: {
        text: '',
        style: {
          display: 'none'
        }
      }
    },
    ...chartProps
  }

  const optionsFirstPeriod: Highcharts.Options = {
    // @ts-ignore
    series: [{
      // @ts-ignore
      name: commodityGroupClassifier,
      // @ts-ignore
      data: firstPeriod.map(i => i.avr)
    }],
    xAxis: {
      categories: labelsFirstPeriod as string[],
      title: {
        text: '',
        style: {
          display: 'none'
        }
      }
    },
    ...chartProps
  }

  const optionsSecondPeriod: Highcharts.Options = {
    // @ts-ignore
    series: [{
      // @ts-ignore
      name: commodityGroupClassifier,
      // @ts-ignore
      data: secondPeriod.map(i => i.avr)
    }],
    xAxis: {
      categories: labelsSecondPeriod as string[],
      title: {
        text: '',
        style: {
          display: 'none'
        }
      }
    },
    ...chartProps
  }

  return (
    <Stack spacing={6} mt={6}>
      <Box fontSize={'xl'} fontWeight={'semibold'} lineHeight={'26px'} textAlign={'center'}>
        {isCountry
          ? commodityGroupClassifier
          : isPeriod
            ? t('statistics_chart_title', {
              name: `${commodityGroupClassifier} (${chartTitle})`,
              period: `${dateFormat(from)} - ${dateFormat(to)}`
            })
            : chartTitle}
      </Box>
      {isPeriod
        ? (
          <>
            <Chart options={optionsFirstPeriod} />
            <Box fontSize={'xl'} fontWeight={'semibold'} lineHeight={'26px'} textAlign={'center'}>
              {t('statistics_chart_title', {
                name: `${commodityGroupClassifier} (${chartTitle})`,
                period: `${dateFormat(secondFrom)} - ${dateFormat(secondTo)}`
              })}
            </Box>
            <Chart options={optionsSecondPeriod} />
          </>
        )
        : (
          <Chart options={options} />
        )}
    </Stack>
  )
}

export default StatisticsChart
