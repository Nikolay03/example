import { Box, Button, SimpleGrid, Stack } from '@chakra-ui/react'
import { ReactElement } from 'react'

import { DatePicker, HookForm, SelectField } from '~/components/HookForm'
import { filterSelectedEndDate } from '~/utils/datePicker'
import { useTranslate } from '~/utils/translate'
import { useWizard } from '~/components/Utils/Contexts'
import * as API from '~/constants/api'
import { TRefetchList } from '~/types/hooks'
import { statisticsExportSerializer } from '~/hooks/form/useSubmitStatistics'

interface Props {
  refetch: TRefetchList
  tab: string
}

const StatisticsExportFilter = ({ tab, refetch }: Props): ReactElement => {
  const { t } = useTranslate()

  const { state, dispatch } = useWizard()
  function onSubmit (values) {
    refetch(statisticsExportSerializer({ tab, ...values }))
    dispatch(values)
  }

  return (
    <>
      <HookForm
        defaultValues={state}
        isPromise={false}
        onSubmit={onSubmit}
        render={({ onSubmitForm, watch }) => {
          const startDate = watch('from')

          function filterEndDate (date) {
            return filterSelectedEndDate(startDate, date, { allowSameDay: true })
          }

          function filterEndTime (date) {
            return filterSelectedEndDate(startDate, date)
          }

          return (
            <Box as={'form'} onSubmit={onSubmitForm}>
              <Stack spacing={6}>
                <SimpleGrid columns={{ base: 1 }} spacing={6}>
                  <SelectField
                    api={API.PRODUCT_TRADE_COUNTRY_LIST}
                    name={'country'}
                    label={t('input_country_label')}
                    size={'lg'}
                    variant={'outline'}
                    isMultiLang={false}
                    isRequired={true}
                    rules={{ required: true }}
                  />
                  <SelectField
                    api={API.PRODUCT_TRADE_SELECT_LIST}
                    name={'commodityGroupClassifier'}
                    label={t('input_product_culture_label')}
                    size={'lg'}
                    variant={'outline'}
                    isMultiLang={false}
                    parent={tab}
                    isRequired={true}
                    rules={{ required: true }}
                    params={{ type: tab }}
                  />
                  <DatePicker
                    name={'from'}
                    label={t('input_statistics_start_date_label')}
                    isRequired={true}
                    rules={{ required: true }}
                    size={'xl'}
                  />
                  <DatePicker
                    name={'to'}
                    label={t('input_statistics_end_date_label')}
                    isRequired={true}
                    filterDate={filterEndDate}
                    filterTime={filterEndTime}
                    size={'xl'}
                  />
                  <Button
                    bg={'gray.500'}
                    color={'white'}
                    colorScheme={'gray'}
                    flexBasis={'100%'}
                    size={'lg'}
                    type={'submit'}
                    _hover={{ bg: 'gray.600' }}
                    _active={{ bg: 'gray.700' }}>
                    {t('statistics_button_submit')}
                  </Button>
                </SimpleGrid>
              </Stack>
            </Box>
          )
        }}
      />
    </>
  )
}

export default StatisticsExportFilter
