import { ReactElement } from 'react'
import { prop } from 'ramda'
import { Button, Stack } from '@chakra-ui/react'

import * as API from '~/constants/api'
import { useTranslate } from '~/utils/translate'
import { useToast } from '~/hooks/index'
import { useCreate } from '~/hooks/crud'
import { useStepper, useWizard } from '~/components/Utils/Contexts'
import { HookForm, NumberInput } from '~/components/HookForm'

export default function ResetPassStep2 (): ReactElement {
  const { t } = useTranslate()

  const toast = useToast()

  const { toNextStep } = useStepper()

  const { dispatch } = useWizard()

  const { isLoading, ...checkCode } = useCreate(API.CHECK_TOKEN)

  function onSubmit (values) {
    const code = prop('code', values)

    return checkCode.create({ token: code })
      .then(({ detail: success }) => {
        if (success) {
          dispatch(values)
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

  return (
    <HookForm onSubmit={onSubmit}>
      <Stack spacing={6}>
        <NumberInput
          name={'code'}
          label={t('input_confirmation_code_label')}
          isRequired={true}
          size={'xl'}
          rules={{ required: true }}
        />

        <Button
          borderRadius={'xl'}
          isLoading={isLoading}
          size={'lg'}
          type={'submit'}>
          {t('button_continue')}
        </Button>
      </Stack>
    </HookForm>
  )
}
