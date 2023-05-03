import { ReactElement } from 'react'
import { Button, Stack } from '@chakra-ui/react'

import { useTranslate } from '~/utils/translate'
import { useResetPassword } from '~/hooks/form'
import { useWizard } from '~/components/Utils/Contexts'
import { HookForm, PasswordInput } from '~/components/HookForm'

interface Props {
  onClose: () => void
}

export default function ResetPassStep3 (props: Props): ReactElement {
  const { onClose } = props

  const { t } = useTranslate()

  const { state } = useWizard()

  const { isLoading, onSubmit } = useResetPassword({
    initialValues: { token: state.code },
    onSuccess: onClose
  })

  return (
    <HookForm onSubmit={onSubmit}>
      <Stack spacing={6}>
        <PasswordInput
          name={'newPassword'}
          label={t('input_new_password_label')}
          size={'xl'}
        />
        <PasswordInput
          name={'confirmPassword'}
          label={t('input_confirm_password_label')}
          size={'xl'}
          isConfirm={true}
          passwordFieldName={'newPassword'}
        />

        <Button
          borderRadius={'xl'}
          isLoading={isLoading}
          size={'lg'}
          type={'submit'}>
          {t('button_save')}
        </Button>
      </Stack>
    </HookForm>
  )
}
