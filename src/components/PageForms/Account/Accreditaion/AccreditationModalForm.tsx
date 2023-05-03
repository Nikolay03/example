import { ReactElement } from 'react'
import { path, prop } from 'ramda'
import { Button, Stack } from '@chakra-ui/react'

import * as API from '~/constants/api'
import * as CONST from '~/constants/constants'
import * as ENUMS from '~/types/enums'
import { numberFormat } from '~/utils/number'
import { innNumberParse } from '~/utils/fieldParsers'
import { useTranslate } from '~/utils/translate'
import { useToast } from '~/hooks/index'
import { useCreate } from '~/hooks/crud'
import { useAuth } from '~/components/AuthProvider'
import { useETPData } from '~/components/Utils/Contexts'
import { ModalDescription } from '~/components/Modal'
import { HookForm, FileUpload, InnInput } from '~/components/HookForm'

function serializer (values) {
  return {
    file: path(['file', 'id'], values),
    inn: prop('inn', values)
  }
}

interface Props {
  onSuccess: () => void
}

export default function AccreditationModalForm (props: Props): ReactElement {
  const { onSuccess } = props

  const { t } = useTranslate()

  const toast = useToast()

  const { user, fetchUserInfo } = useAuth()

  const { isLoading, ...accreditation } = useCreate(API.ACCREDITATION_REQUEST)

  const { configData } = useETPData()

  const accreditationPrice = path<string>(['data', 'ACCREDITATION_PRICE'], configData)
  const isFreeAccreditation = +accreditationPrice === 0
  const accreditationPriceFormed = isFreeAccreditation
    ? t('account_accreditation_price_free')
    : numberFormat(accreditationPrice, CONST.CURRENCY_UZB)

  const userType = prop('registerAs', user)
  const userInn = prop('inn', user)

  const defaultValues = {
    inn: innNumberParse(userInn)
  }

  const passportLabels = {
    [ENUMS.UserTypes.INDIVIDUAL]: t('input_passport_individual_label'),
    [ENUMS.UserTypes.ENTITY]: t('input_passport_entity_label')
  }

  const innLabels = {
    [ENUMS.UserTypes.INDIVIDUAL]: t('input_inn_individual_label'),
    [ENUMS.UserTypes.ENTITY]: t('input_inn_entity_label')
  }

  function onSubmit (values) {
    return accreditation.create(serializer(values))
      .then(onSuccess)
      .then(fetchUserInfo)
      .catch(({ detail }) => {
        toast({
          title: t('error_default_label'),
          description: detail,
          status: 'error'
        })
      })
  }

  return (
    <HookForm
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      render={({ onSubmitForm, watch }) => {
        const file = watch('file')

        return (
          <form onSubmit={onSubmitForm}>
            <Stack spacing={6}>
              <ModalDescription>
                {t('account_accreditation_modal_description')}
                <br />
                {t('account_accreditation_price_label', {
                  price: accreditationPriceFormed
                })}
              </ModalDescription>
              <FileUpload
                name={'file'}
                label={passportLabels[userType]}
                rules={{ required: true }}
                isRequired={true}
                size={'lg'}
              />
              <InnInput
                name={'inn'}
                label={innLabels[userType]}
                isRequired={true}
                size={'xl'}
              />
              <Button
                isDisabled={!file}
                isLoading={isLoading}
                size={'lg'}
                type={'submit'}
                borderRadius={'xl'}>
                {t('button_send')}
              </Button>
            </Stack>
          </form>
        )
      }}
    />
  )
}
