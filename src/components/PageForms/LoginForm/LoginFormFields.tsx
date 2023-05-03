import { ReactElement } from 'react'
import { Button, Stack, useBreakpointValue } from '@chakra-ui/react'

import { useTranslate } from '~/utils/translate'
import { useAuth } from '~/components/AuthProvider'
import { Input, PasswordInput } from '~/components/HookForm'

export default function LoginFormFields (): ReactElement {
  const { t } = useTranslate()

  const { isLoading } = useAuth()

  const buttonSize = useBreakpointValue({ base: 'lg', sm: 'xl' })

  return (
    <Stack spacing={6}>
      <Input
        name={'username'}
        label={t('input_login_email_label')}
        isRequired={true}
        rules={{ required: true }}
        size={'xl'}
      />
      <PasswordInput
        name={'password'}
        label={t('input_password_label')}
        isRequired={true}
        rules={{ required: true }}
        size={'xl'}
      />

      <Button
        isFullWidth={true}
        isLoading={isLoading}
        size={buttonSize}
        type={'submit'}>
        {t('button_sign_in')}
      </Button>
    </Stack>
  )
}
