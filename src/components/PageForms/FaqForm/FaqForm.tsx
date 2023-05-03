import { Fragment, ReactElement } from 'react'
import { Box, Button, Stack } from '@chakra-ui/react'

import { FeedbackTypes } from '~/types/enums'
import { TObject } from '~/types/constants'
import { useTranslate } from '~/utils/translate'
import { useSubmitFeedback } from '~/hooks/form'
import FaqFeedback from '~/icons/FaqFeedback'
import { AsideTitle } from '~/components/Titles'
import { ReCaptcha, ReCaptchaPolicy } from '~/components/ReCaptcha'
import { HookForm, FileUpload, Input, Textarea, useFieldRules } from '~/components/HookForm'

interface Props {
  title: string
  type: FeedbackTypes
  initialValues?: TObject
}

function FaqForm (props: Props): ReactElement {
  const { title, initialValues, type } = props

  const { t } = useTranslate()

  const { onSubmit, isLoading, defaultValues } = useSubmitFeedback(type, {
    initialValues
  })

  const { emailRules } = useFieldRules()

  return (
    <Box
      bgColor={'gray.100'}
      borderRadius={{ base: 'lg', md: '2xl' }}
      p={{ base: 4, md: 8 }}>
      <Box textAlign={'center'}>
        <FaqFeedback />
        <AsideTitle my={4}>{title}</AsideTitle>
      </Box>
      <HookForm
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        resetOnSuccess={true}
        render={({ onSubmitForm }) => (
          <ReCaptcha action={type} onSubmit={onSubmitForm}>
            <Stack spacing={4} mb={6}>
              <Fragment>
                <Input
                  name={'fio'}
                  placeholder={t('input_full_name_label')}
                  isRequired={true}
                  variant={'outline'}
                  rules={{ required: true }}
                />
                <Input
                  name={'email'}
                  placeholder={t('input_email_label')}
                  isRequired={true}
                  type={'email'}
                  variant={'outline'}
                  rules={emailRules}
                />
              </Fragment>
              <Input
                name={'phone'}
                placeholder={t('input_phone_label')}
                isRequired={true}
                type={'tel'}
                variant={'outline'}
                rules={{ required: true }}
              />
              <Input
                name={'theme'}
                placeholder={t('input_email_subject_label')}
                isRequired={true}
                variant={'outline'}
                rules={{ required: true }}
              />
              <Textarea
                name={'message'}
                placeholder={t('faq_form_questions_text')}
                isRequired={true}
                variant={'outline'}
                rules={{ required: true }}
              />
              <FileUpload
                name={'file'}
                bgColor={'gray.200'}
                size={'lg'}
              />
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
    </Box>
  )
}

FaqForm.defultProps = {
  initialValues: {}
}

export default FaqForm
