import { ReactElement } from 'react'
import { Button, Stack } from '@chakra-ui/react'

import { FeedbackTypes } from '~/types/enums'
import { useTranslate } from '~/utils/translate'
import { useSubmitFeedback } from '~/hooks/form'
import { ReCaptcha, ReCaptchaPolicy } from '~/components/ReCaptcha'
import { FileUpload, HookForm, Input, Textarea, useFieldRules } from '~/components/HookForm'

interface Props {
  onSuccess: () => void
}

export default function ReportOrderForm (props: Props): ReactElement {
  const { onSuccess } = props

  const { t } = useTranslate()

  const { isLoading, onSubmit, defaultValues } = useSubmitFeedback(FeedbackTypes.REPORT_ORDER, {
    onSuccess
  })

  const { emailRules } = useFieldRules()

  return (
    <HookForm
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      resetOnSuccess={true}
      render={({ onSubmitForm }) => (
        <ReCaptcha action={FeedbackTypes.REPORT_ORDER} onSubmit={onSubmitForm}>
          <Stack spacing={4} mb={6}>
            <Input
              name={'fio'}
              label={t('input_full_name_label')}
              isRequired={true}
              rules={{ required: true }}
              size={'xl'}
            />
            <Input
              name={'email'}
              label={t('input_email_label')}
              isRequired={true}
              type={'email'}
              rules={emailRules}
              size={'xl'}
            />
            <Input
              name={'phone'}
              label={t('input_phone_label')}
              isRequired={true}
              type={'tel'}
              rules={{ required: true }}
              size={'xl'}
            />
            <Textarea
              name={'message'}
              label={t('input_message_label')}
              isRequired={true}
              rules={{ required: true }}
              size={'lg'}
            />
            <FileUpload name={'file'} size={'lg'} />
          </Stack>

          <Stack spacing={4}>
            <Button
              type={'submit'}
              isFullWidth={true}
              isLoading={isLoading}
              size={'lg'}>
              {t('button_send')}
            </Button>

            <ReCaptchaPolicy />
          </Stack>
        </ReCaptcha>
      )}
    />
  )
}
