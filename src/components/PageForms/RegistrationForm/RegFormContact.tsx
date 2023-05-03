import { ReactElement } from 'react'
import { prop } from 'ramda'
import { Button, Stack } from '@chakra-ui/react'

import RegFormElement from './RegFormElement'
import FieldNote from './FieldNote'
import RegButtons from './RegButtons'

import * as API from '~/constants/api'
import { useTranslate } from '~/utils/translate'
import { useToast } from '~/hooks/index'
import { useCreate } from '~/hooks/crud'
import { useStepper, useWizard } from '~/components/Utils/Contexts'
import { HookForm, NumberInput, PhoneInput } from '~/components/HookForm'

function verifyCodeSerializer (values) {
  return {
    phoneNumber: prop('phoneNumber', values),
    code: prop('code', values)
  }
}

export default function RegFormContact (): ReactElement {
  const { t } = useTranslate()

  const toast = useToast({ position: 'top' })
  const { state, dispatch } = useWizard()
  const { toNextStep } = useStepper()

  const { create: send, isLoading: isLoadingSend } = useCreate(API.SEND_CODE)
  const { create: verify, isLoading: isLoadingVerify } = useCreate(API.VERIFY_CODE)

  function onSubmit (values): Promise<void> {
    if (state.verifiedPhone) {
      return new Promise(resolve => {
        dispatch(values)
        toNextStep()
        resolve()
      })
    }
    return verify(verifyCodeSerializer(values))
      .then(({ detail }) => {
        if (detail) {
          dispatch({ ...values, verifiedPhone: true })
          toNextStep()
        }
        else {
          toast({
            title: t('error_default_label'),
            description: t('reg_verify_sms_error_message'),
            status: 'error'
          })
        }
      })
  }

  function sendCode (phoneNumber) {
    return send({ phoneNumber })
      .then(() => {
        toast({
          title: t('reg_send_sms_success_title'),
          description: t('reg_send_sms_success_message'),
          status: 'success'
        })
      })
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
      defaultValues={state}
      onSubmit={onSubmit}
      render={({ onSubmitForm, watch }) => {
        const phoneNumber = watch('phoneNumber')
        const phoneNumberButton = (
          <Button
            bgColor={'gray.300'}
            color={'gray.900'}
            colorScheme={'gray'}
            fontSize={'xs'}
            isDisabled={!phoneNumber}
            isLoading={isLoadingSend}
            h={8}
            px={3}
            _hover={{ bgColor: 'gray.400' }}
            _active={{ bgColor: 'gray.300' }}
            onClick={sendCode.bind(null, phoneNumber)}>
            {t('button_send_code')}
          </Button>
        )

        return (
          <RegFormElement as={'form'} onSubmit={onSubmitForm}>
            <Stack spacing={6}>
              <Stack>
                <PhoneInput
                  name={'phoneNumber'}
                  label={t('input_phone_label')}
                  rightElement={phoneNumberButton}
                  elementProps={{
                    right: 4,
                    height: 'full',
                    width: 'auto'
                  }}
                  isRequired={true}
                  size={'xl'}
                  rules={{ required: true }}
                />
                <FieldNote>{t('input_phone_number_note')}</FieldNote>
              </Stack>
              <Stack>
                <PhoneInput
                  name={'contactNumber'}
                  label={t('input_contact_number_label')}
                  size={'xl'}
                />
                <FieldNote>{t('input_contact_number_note')}</FieldNote>
              </Stack>
              <NumberInput
                name={'code'}
                label={t('input_confirmation_code_label')}
                isRequired={true}
                size={'xl'}
                rules={{ required: true }}
              />
            </Stack>

            <RegButtons isLoading={isLoadingVerify} />
          </RegFormElement>
        )
      }}
    />
  )
}
