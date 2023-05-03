import { ReactElement } from 'react'
import { path } from 'ramda'
import { Box, SimpleGrid, Stack } from '@chakra-ui/react'

import TradesCreateButtons from './TradesCreateButtons'

import * as CONST from '~/constants/constants'
import { TradeTypes } from '~/types/enums'
import { filterPastDate, filterSelectedEndDate } from '~/utils/datePicker'
import { useTranslate } from '~/utils/translate'
import { useStepper, useWizard } from '~/components/Utils/Contexts'
import {
  DatePicker,
  GeolocationSelect,
  GeoSelectField,
  HookForm,
  Input,
  StaticSelectField,
  Textarea
} from '~/components/HookForm'

export default function StepTransferInfo (): ReactElement {
  const { t } = useTranslate()

  const { state, dispatch } = useWizard()

  const { toNextStep } = useStepper()

  function onSubmit (values) {
    dispatch(values)
    toNextStep()
  }

  const tradeType: TradeTypes = path(['bargainType', 'id'], state)

  return (
    <HookForm
      defaultValues={state}
      isPromise={false}
      onSubmit={onSubmit}
      render={({ onSubmitForm, watch }) => {
        const deliveryStartDate = watch('deliveryStartDate')

        function filterEndDate (date) {
          return filterSelectedEndDate(deliveryStartDate, date)
        }

        return (
          <Box as={'form'} onSubmit={onSubmitForm}>
            <Stack spacing={6}>
              <Textarea
                name={'termsOfPurchase'}
                label={t(`input_trades_${tradeType}_terms_label`)}
                size={'lg'}
                isRequired={true}
                rules={{ required: true }}
              />

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                <DatePicker
                  name={'deliveryStartDate'}
                  label={t(`input_trades_${tradeType}_transfer_start_date_label`)}
                  isRequired={true}
                  rules={{ required: true }}
                  filterDate={filterPastDate}
                  size={'xl'}
                />

                <DatePicker
                  name={'deliveryEndDate'}
                  label={t(`input_trades_${tradeType}_transfer_end_date_label`)}
                  isRequired={true}
                  rules={{ required: true }}
                  filterDate={filterEndDate}
                  size={'xl'}
                />

                <GeoSelectField
                  kind={'country'}
                  name={'deliveryCountry'}
                  label={t(`input_trades_${tradeType}_transfer_country_label`)}
                  isRequired={true}
                  rules={{ required: true }}
                  size={'lg'}
                />

                <GeoSelectField
                  kind={'region'}
                  name={'deliveryRegion'}
                  label={t(`input_trades_${tradeType}_transfer_region_label`)}
                  isRequired={true}
                  rules={{ required: true }}
                  size={'lg'}
                  isChild={true}
                  isDefaultDisabled={true}
                  parentName={'deliveryCountry'}
                />

                <GeoSelectField
                  kind={'district'}
                  name={'deliveryDistrict'}
                  label={t(`input_trades_${tradeType}_transfer_district_label`)}
                  isRequired={true}
                  rules={{ required: true }}
                  size={'lg'}
                  isChild={true}
                  isDefaultDisabled={true}
                  parentName={'deliveryRegion'}
                />

                <StaticSelectField
                  name={'incoterms'}
                  list={CONST.TRADES_INCOTERMS.list}
                  label={t('input_incoterms_label')}
                  isRequired={true}
                  rules={{ required: true }}
                  size={'xl'}
                />
              </SimpleGrid>

              <Input
                name={'deliveryAddress'}
                label={t(`input_trades_${tradeType}_transfer_address_label`)}
                size={'xl'}
                isRequired={true}
                rules={{ required: true }}
              />

              <GeolocationSelect
                name={'deliveryGeo'}
                label={t('input_trades_transfer_geo')}
                size={'xl'}
              />
            </Stack>

            <TradesCreateButtons />
          </Box>
        )
      }}
    />
  )
}
