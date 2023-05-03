import { ReactElement } from 'react'
import { Button, SimpleGrid, Stack } from '@chakra-ui/react'

import { FeedbackTypes } from '~/types/enums'
import { useTranslate } from '~/utils/translate'
import { useSubmitFeedback } from '~/hooks/form'
import { ReCaptcha, ReCaptchaPolicy } from '~/components/ReCaptcha'
import { HookForm, FileUpload, Input, Textarea, useFieldRules } from '~/components/HookForm'

export default function FeedbackForm (): ReactElement {
  const { t } = useTranslate()

  const { onSubmit, isLoading, defaultValues } = useSubmitFeedback(FeedbackTypes.BACK_CALL)

  const { emailRules } = useFieldRules()

  return (
    <HookForm
      resetOnSuccess={true}
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      render={({ onSubmitForm }) => {
        return (
          <ReCaptcha action={FeedbackTypes.BACK_CALL} onSubmit={onSubmitForm}>
            <Stack spacing={6}>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                <Input
                  name={'fio'}
                  label={t('input_full_name_label')}
                  isRequired={true}
                  size={'xl'}
                  rules={{ required: true }}
                />
                <Input
                  name={'phone'}
                  label={t('input_phone_label')}
                  isRequired={true}
                  size={'xl'}
                  rules={{ required: true }}
                />
                <Input
                  name={'email'}
                  label={t('input_email_label')}
                  isRequired={true}
                  size={'xl'}
                  rules={emailRules}
                />
                <Input
                  name={'theme'}
                  label={t('input_email_subject_label')}
                  isRequired={true}
                  size={'xl'}
                  rules={{ required: true }}
                />
              </SimpleGrid>

              <Textarea
                name={'message'}
                label={t('input_message_label')}
                isRequired={true}
                size={'lg'}
                rules={{ required: true }}
              />

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                <FileUpload name={'file'} />

                <Stack spacing={4}>
                  <Button isLoading={isLoading} isFullWidth={true} size={'xl'} type={'submit'}>
                    {t('button_send')}
                  </Button>

                  <ReCaptchaPolicy />
                </Stack>
              </SimpleGrid>
            </Stack>
          </ReCaptcha>
        )
      }}
    />
  )
}
