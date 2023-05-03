import { Box, SimpleGrid, Stack } from '@chakra-ui/react'
import { isEmpty, prop } from 'ramda'
import { ReactElement } from 'react'

import StatisticsExportFilter
  from '~/components/PageComponents/HomeOld/StatisticsSection/StatisticsExport/StatisticsExportFilter'
import { TabTitle } from '~/components/Titles'
import { StatisticsTypes } from '~/types/enums'
import StatisticsExportChart from
  '~/components/PageComponents/HomeOld/StatisticsSection/StatisticsExport/StatisticsExportChart'
import { TRefetchList } from '~/types/hooks'
import { TableEmptyData } from '~/components/Table'
import { useWizard } from '~/components/Utils/Contexts'
import SpinnerLoader from '~/components/Loader'
import { TStatisticsExport } from '~/types/statistics'

const tradesStatusList = [
  { value: StatisticsTypes.EXPORT, title: `home_section_statistics_chart_line_${StatisticsTypes.EXPORT}_title` },
  { value: StatisticsTypes.IMPORT, title: `home_section_statistics_chart_line_${StatisticsTypes.IMPORT}_title` }
]
interface Props {
  tab: string
  onChangeTab: (value: string) => void,
  data: TStatisticsExport[]
  isLoading: boolean
  refetch: TRefetchList
}
const StatisticsExportGrid = ({
  tab,
  isLoading,
  onChangeTab,
  refetch,
  data
}: Props): ReactElement => {
  const { state } = useWizard()
  const commodityGroupClassifier = prop('commodityGroupClassifier', state)
  const commodityGroupClassifierName = prop('name', commodityGroupClassifier)
  return (
    <Stack textAlign={{ base: 'center', md: 'unset' }} spacing={6} id={'2'}>
      <Box fontSize={'xl'} fontWeight={'semibold'}>
        <TabTitle
          tabs={tradesStatusList}
          value={tab}
          onChange={onChangeTab}
          size={'sm'}
        />
      </Box>
      <SimpleGrid columns={{ base: 1 }} spacing={12}>
        <StatisticsExportFilter tab={tab} refetch={refetch} />
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
                <StatisticsExportChart data={data} />
              )}
        </SimpleGrid>
      </SimpleGrid>
    </Stack>
  )
}

export default StatisticsExportGrid
