import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { Box, Button, Container, Stack } from '@chakra-ui/react'

import { LOGIN_URL } from '~/constants/routes'
import { useTranslate } from '~/utils/translate'
import { useResetPassword } from '~/hooks/form'
import { HookForm, PasswordInput } from '~/components/HookForm'

export default function ResetPassForm (): ReactElement {
  const { t } = useTranslate()

  const { query, ...router } = useRouter()

  function onSuccess () {
    return router.replace(LOGIN_URL)
  }

  const { onSubmit, isLoading } = useResetPassword({
    onSuccess,
    initialValues: { token: query.token }
  })

  return (
    <Container maxW={'xl'}>
      <Box
        bgColor={'white'}
        borderRadius={'xl'}
        px={{ base: 6, sm: 10 }}
        py={{ base: 8, sm: 12 }}>
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
      </Box>
    </Container>
  )
}
