import { Fragment, ReactElement, useEffect } from 'react'
import { equals, prop } from 'ramda'
import { useFormContext } from 'react-hook-form'
import { Box, Flex, SimpleGrid, Stack } from '@chakra-ui/react'

import TradesCreateButtons from './TradesCreateButtons'

import * as CONST from '~/constants/constants'
import * as ENUMS from '~/types/enums'
import { filterPastDate, filterPastTime, filterSelectedEndDate } from '~/utils/datePicker'
import { useTranslate } from '~/utils/translate'
import { useStepper, useWizard } from '~/components/Utils/Contexts'
import {
  HookForm,
  StaticSelectField,
  DatePicker,
  Checkbox,
  Textarea,
  VatSelectField
} from '~/components/HookForm'
import UsersMultiSelectField from '~/components/HookForm/Custom/UsersMultiSelect'
import { TSelectListItem } from '~/types/constants'

function TradesKindFields () {
  const { t } = useTranslate()

  const {
    watch,
    setValue,
    clearErrors
  } = useFormContext()

  const kind: TSelectListItem<ENUMS.TradeKinds> = watch('kind')
  const kindValue: ENUMS.TradeKinds = kind?.id
  const isCompetition = kindValue === ENUMS.TradeKinds.COMPETITION
  const isAuction = kindValue === ENUMS.TradeKinds.AUCTION

  useEffect(() => {
    if (isCompetition) {
      setValue('position', null)
      clearErrors('position')
    }
  }, [isCompetition])

  return (
    <Fragment>
      <StaticSelectField
        name={'kind'}
        list={CONST.TRADES_KIND.list}
        label={t('input_trades_kind_label')}
        isRequired={true}
        rules={{ required: true }}
        size={'xl'}
      />
      <StaticSelectField
        name={'position'}
        list={CONST.TRADES_POSITION.list}
        label={t('input_trades_position_label')}
        isDisabled={!isAuction}
        isRequired={isAuction}
        rules={{ required: isAuction }}
        size={'xl'}
      />
    </Fragment>
  )
}

function TradesVatFields () {
  const { t } = useTranslate()

  const {
    watch,
    setValue
  } = useFormContext()

  const vat: TSelectListItem<string> = watch('vat')
  const vatValue = prop('id', vat)
  const isVatZero = vatValue === '0'

  useEffect(() => {
    if (isVatZero) {
      setValue('vatIsIncludedInThePrice', false)
    }
  }, [isVatZero])

  return (
    <Flex
      align={'center'}
      gridRowGap={4}
      wrap={{
        base: 'wrap',
        md: 'unset'
      }}>
      <Box minW={48}>
        <VatSelectField
          name={'vat'}
          label={t('input_trades_vat_label')}
          isRequired={true}
          rules={{ required: true }}
          size={'xl'}
        />
      </Box>
      <Checkbox
        name={'vatIsIncludedInThePrice'}
        isDisabled={isVatZero || !vatValue}
        ml={{
          base: 'unset',
          md: 2
        }}
        mt={{
          base: 'unset',
          md: 5
        }}
        size={'lg'}>
        {t('input_trades_vat_included_label')}
      </Checkbox>
    </Flex>
  )
}

export default function StepTradesInfo (): ReactElement {
  const { t } = useTranslate()

  const { state, dispatch } = useWizard()

  const { toNextStep } = useStepper()

  function onSubmit (values) {
    dispatch(values)
    toNextStep()
  }

  return (
    <HookForm
      defaultValues={state}
      isPromise={false}
      onSubmit={onSubmit}
      render={({ onSubmitForm, watch }) => {
        const startDate = watch('bargainStartDatetime')
        const privacy = watch('privacy')
        const privacyValue = prop('id', privacy)
        const isPrivate = equals(ENUMS.TradePrivacies.PRIVATE, privacyValue)

        function filterEndDate (date) {
          return filterSelectedEndDate(startDate, date, { allowSameDay: true })
        }

        function filterEndTime (date) {
          return filterSelectedEndDate(startDate, date)
        }

        function validateEndDate (datetime) {
          const isValid = filterSelectedEndDate(startDate, datetime)
          return isValid ? undefined : t('field_error_end_date')
        }

        return (
          <Box as={'form'} onSubmit={onSubmitForm}>
            <Stack spacing={6}>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                <TradesKindFields />
                <DatePicker
                  name={'bargainStartDatetime'}
                  label={t('input_trades_start_date_label')}
                  isRequired={true}
                  rules={{ required: true }}
                  filterDate={filterPastDate}
                  filterTime={filterPastTime}
                  showTimeSelect={true}
                  size={'xl'}
                />
                <DatePicker
                  name={'bargainEndDatetime'}
                  label={t('input_trades_end_date_label')}
                  isRequired={true}
                  filterDate={filterEndDate}
                  filterTime={filterEndTime}
                  rules={{
                    required: true,
                    validate: validateEndDate
                  }}
                  showTimeSelect={true}
                  size={'xl'}
                />
                <StaticSelectField
                  name={'bargainType'}
                  list={CONST.TRADES_TYPE.list}
                  label={t('input_trades_type_label')}
                  isRequired={true}
                  rules={{ required: true }}
                  size={'xl'}
                />
                <StaticSelectField
                  name={'privacy'}
                  list={CONST.TRADES_PRIVACY.list}
                  label={t('input_trades_privacy_label')}
                  isRequired={true}
                  rules={{ required: true }}
                  size={'xl'}
                />
                <StaticSelectField
                  name={'visibility'}
                  list={CONST.TRADES_VISIBILITY.list}
                  label={t('input_trades_participants_visibility_label')}
                  isRequired={true}
                  rules={{ required: true }}
                  size={'xl'}
                />
                <TradesVatFields />
              </SimpleGrid>

              {isPrivate && (
                <UsersMultiSelectField
                  name={'users'}
                  label={t('input_trades_participants_label')}
                  placeholder={t('input_trades_participants_placeholder')}
                  isRequired={isPrivate}
                  rules={{ required: isPrivate }}
                  size={'xl'}
                />
              )}

              <Textarea
                name={'responsibleContactPerson'}
                label={t('input_trades_responsible_person_label')}
                size={'lg'}
                isRequired={true}
                rules={{ required: true }}
              />
            </Stack>

            <TradesCreateButtons />
          </Box>
        )
      }}
    />
  )
}
