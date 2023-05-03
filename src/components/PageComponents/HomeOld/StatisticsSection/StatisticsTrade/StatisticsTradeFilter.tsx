import { Box, Button, SimpleGrid, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { ReactElement } from 'react'

import { HookForm, SelectField, StaticSelectField } from '~/components/HookForm'
import { useTranslate } from '~/utils/translate'
import { useWizard } from '~/components/Utils/Contexts'
import * as API from '~/constants/api'
import * as CONST from '~/constants/constants'
import { PopModal } from '~/components/Modal'
import ReportOrderForm from '~/components/PageComponents/HomeOld/ReportsSection/ReportOrderForm'
import { TRefetchList } from '~/types/hooks'
import { statisticsTradeSerializer } from '~/hooks/form/useSubmitStatistics'

interface Props {
  refetch: TRefetchList
}
const StatisticsTradeFilter = ({ refetch }: Props): ReactElement => {
  const { t } = useTranslate()

  const { state, dispatch } = useWizard()

  const { isOpen, onOpen, onClose } = useDisclosure()

  function onSubmit (values) {
    refetch(statisticsTradeSerializer(values))
    dispatch(values)
  }

  return (
    <>
      <HookForm
        defaultValues={state}
        isPromise={false}
        onSubmit={onSubmit}
        render={({ onSubmitForm }) => {
          return (
            <Box as={'form'} onSubmit={onSubmitForm}>
              <Stack spacing={6}>
                <SimpleGrid columns={{ base: 1 }} spacing={6}>
                  <SelectField
                    api={API.PRODUCT_SELECT_LIST}
                    detailApi={API.PRODUCT_GROUP_CLASS_LIST}
                    name={'commodityGroupClassifier'}
                    label={t('input_product_culture_label')}
                    size={'lg'}
                    isRequired={true}
                    rules={{ required: true }}
                    variant={'outline'}
                    isMultiLang={true}
                    params={{ levelSpecial: 2 }}
                  />
                  <StaticSelectField
                    name={'periodType'}
                    list={CONST.STATISTICS_PERIOD.list}
                    label={t('input_statistics_period_label')}
                    isRequired={true}
                    rules={{ required: true }}
                    size={'xl'}
                  />
                  <Button
                    mt={'calc(var(--chakra-space-20) - 7px)'}
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
                  <Text fontSize={'md'} fontWeight={'semibold'} mb={0}>
                    {t('statistics_report_text')}
                  </Text>
                  <Button size={'lg'} onClick={onOpen}>
                    {t('reports_order_button')}
                  </Button>
                </SimpleGrid>
              </Stack>
            </Box>
          )
        }}
      />
      <PopModal
        title={t('reports_order_modal_title')}
        isOpen={isOpen}
        onClose={onClose}>
        <ReportOrderForm onSuccess={onClose} />
      </PopModal>
    </>
  )
}

export default StatisticsTradeFilter
