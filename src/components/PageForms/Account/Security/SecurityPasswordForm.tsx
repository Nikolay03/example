import { ReactElement } from 'react'
import { prop } from 'ramda'
import { Stack } from '@chakra-ui/react'

import * as API from '~/constants/api'
import { useTranslate } from '~/utils/translate'
import { useToast } from '~/hooks/index'
import { useUpdate } from '~/hooks/crud'
import { AccountContainer, AccountSaveButton } from '~/components/PageComponents/Account'
import { HookForm, PasswordInput } from '~/components/HookForm'

interface FormValues {
  confirmPassword: string
  newPassword: string
}

const changePasswordSerializer = (values: FormValues) => ({
  newPassword: prop('newPassword', values)
})

export default function SecurityPasswordForm (): ReactElement {
  const { t } = useTranslate()

  const toast = useToast()

  const { isLoading, ...changePass } = useUpdate(API.CHANGE_PASSWORD)

  function onSubmit (values: FormValues) {
    return changePass.update(changePasswordSerializer(values))
      .then(() => {
        toast({
          status: 'success',
          title: t('reset_password_success_title'),
          description: t('reset_password_success_message')
        })
      })
  }

  return (
    <HookForm onSubmit={onSubmit} resetOnSuccess={true}>
      <AccountContainer>
        <Stack mb={6} spacing={6} w={{ base: 'full', md: '50%' }}>
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
        </Stack>

        <AccountSaveButton isLoading={isLoading} />
      </AccountContainer>
    </HookForm>
  )
}
