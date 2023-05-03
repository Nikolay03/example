import { Box, SimpleGrid, Stack } from '@chakra-ui/react'
import { isEmpty, prop } from 'ramda'
import { ReactElement } from 'react'

import { useTranslate } from '~/utils/translate'
import StatisticsTradeFilter
  from '~/components/PageComponents/HomeOld/StatisticsSection/StatisticsTrade/StatisticsTradeFilter'
import { TableEmptyData } from '~/components/Table'
import { useDateFormat } from '~/utils/date'
import { TRefetchList } from '~/types/hooks'
import { useWizard } from '~/components/Utils/Contexts'
import * as ENUMS from '~/types/enums'
import SpinnerLoader from '~/components/Loader'
import { TStatisticsTrade } from '~/types/statistics'

interface Props {
  data: TStatisticsTrade[]
  isLoading: boolean
  refetch: TRefetchList
}

const StatisticsTradeGrid = ({ isLoading, data, refetch }: Props): ReactElement => {
  const { dateFormat } = useDateFormat()
  const { t, translateData } = useTranslate()
  const { state } = useWizard()
  const commodityGroupClassifier = prop('commodityGroupClassifier', state)
  const commodityGroupClassifierName = translateData(commodityGroupClassifier, 'name')
  const periodType = state?.periodType?.id === ENUMS.StatisticsPeriodTypes.YEAR
    // @ts-ignore
    ? dateFormat(new Date(), 'yyyy')
    // @ts-ignore
    : dateFormat(new Date(), 'MMMM')
  return (
    <Stack textAlign={{ base: 'center', md: 'unset' }} spacing={6} id={'3'}>
      <Box fontSize={'xl'} fontWeight={'semibold'} lineHeight={'26px'}>
        {t('home_section_statistics_chart_bar_title')} {periodType}
      </Box>
      <SimpleGrid columns={{ base: 1 }} spacing={12}>
        <StatisticsTradeFilter refetch={refetch} />
        <SimpleGrid spacing={6}>
          <Box fontSize={'xl'} fontWeight={'semibold'} lineHeight={'26px'} textAlign={'center'}>
            {commodityGroupClassifierName}
          </Box>
          {isLoading
            ? (
              <SpinnerLoader />
            )
            : (isEmpty(data) || !data)
              ? (
                <TableEmptyData />
              )
              : (
                <div />
              )}
        </SimpleGrid>
      </SimpleGrid>

    </Stack>
  )
}

export default StatisticsTradeGrid
